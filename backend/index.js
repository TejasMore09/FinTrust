require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { spawn } = require("child_process");
const path = require("path");
const axios = require("axios");

const { CreditApplicationModel } = require("./model/CreditApplicationModel");
const { LoanRequestModel } = require("./model/LoanRequestModel");

const app = express();
const PORT = process.env.PORT || 3000;
const uri = process.env.MONGO_URL;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("FinTrust Backend Running");
});

/* ================= CREDIT APPLICATION (ML + SAFE FALLBACK) ================= */

app.post("/credit-application", async (req, res) => {
  try {
    // 1. Save raw application
    const application = await CreditApplicationModel.create(req.body);

    // 2. Run Python ML
    const pythonPath = path.join(__dirname, "venv", "Scripts", "python.exe");
    const python = spawn(pythonPath, [
      path.join(__dirname, "ml", "credit_risk_infer.py"),
    ]);

    python.stdin.write(JSON.stringify(req.body));
    python.stdin.end();

    let output = "";

    python.stdout.on("data", (data) => {
      output += data.toString();
    });

    python.stderr.on("data", (err) => {
      console.error("🐍 Python error:", err.toString());
    });

    python.on("close", async () => {
      let decision;

      // 3. Parse ML output
      try {
        decision = JSON.parse(output);
      } catch {
        decision = null;
      }

      // 4. FORCE FALLBACK IF ML FAILS LOGICALLY
      if (
        !decision ||
        decision.risk === "Error" ||
        decision.decision === "Error"
      ) {
        decision = {
          risk: "Medium",
          decision: "Review",
          confidence: 0.5,
          explanation:
            "Fallback decision applied due to ML feature mismatch (safe policy)",
        };
      }

      // 5. UPDATE SAME APPLICATION DOCUMENT
      const updated = await CreditApplicationModel.findByIdAndUpdate(
        application._id,
        {
          risk: decision.risk,
          decision: decision.decision,
          confidence: decision.confidence,
          explanation: decision.explanation,
          status: "PROCESSED",
        },
        { new: true }
      );

      console.log("✅ UPDATED APPLICATION:", updated);

      return res.json(updated);
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Credit processing failed" });
  }
});

/* ================= CREDIT APPLICATIONS (DASHBOARD) ================= */

app.get("/credit-applications", async (req, res) => {
  const applications = await CreditApplicationModel.find({}).lean();

  res.json(
    applications.map((app) => ({
      _id: app._id,
      risk: app.risk || "Pending",
      decision: app.decision || "Pending",
      confidence: app.confidence || 0,
      explanation: app.explanation || "",
    }))
  );
});

/* ================= REPAYMENT SIMULATION ================= */

app.post("/repayment-simulation", async (req, res) => {
  const { amount, tenure, interestRate, scenario, applicantId } = req.body;

  const application = await CreditApplicationModel.findById(applicantId);
  if (!application) {
    return res.status(404).json({ error: "Application not found" });
  }

  const income = application.monthly_income;
  const expenses = application.monthly_expenses;
  const risk = application.risk;
  const confidence = application.confidence;

  const r = interestRate / 12 / 100;
  const emi =
    (amount * r * Math.pow(1 + r, tenure)) /
    (Math.pow(1 + r, tenure) - 1);

  const surplus = income - expenses;
  const affordabilityRatio = surplus / emi;

  let response = {
    baseEmi: Math.round(emi),
    surplus,
    affordabilityRatio: affordabilityRatio.toFixed(2),
  };

  // 🔥 REAL REASONING STARTS HERE
  if (scenario === "job_loss") {
    if (risk === "High" || confidence < 0.6) {
      response.strategy = "EMI Moratorium";
      response.monthsPaused = 6;
      response.reason =
        "High default risk detected by ML model. Moratorium reduces forced default during unemployment.";
    } else {
      response.strategy = "Short Moratorium + Restructure";
      response.monthsPaused = 3;
      response.reason =
        "Borrower historically reliable. Short relief provided with restructuring.";
    }
  }

  else if (scenario === "income_drop") {
    if (affordabilityRatio < 1) {
      response.strategy = "Reduced EMI";
      response.revisedEmi = Math.round(emi * affordabilityRatio);
      response.reason =
        "ML indicates moderate stress. EMI adjusted to match reduced cashflow.";
    } else {
      response.strategy = "Normal EMI";
      response.reason =
        "Despite income drop, borrower remains financially stable.";
    }
  }

  else {
    response.strategy = "Normal Repayment";
    response.reason =
      "No financial stress detected. Standard repayment applied.";
  }

  res.json(response);
});

/* ================= EXPLAINABILITY ================= */

app.get("/explainability", async (req, res) => {
  const applications = await CreditApplicationModel.find({
    status: "PROCESSED",
  }).lean();

  const explained = applications.map(app => {
    const surplus = app.monthly_income - app.monthly_expenses;

    let keyFactors = [];

    if (surplus > 0) keyFactors.push("Positive monthly cashflow");
    else keyFactors.push("Negative monthly cashflow");

    if (app.past_emi_delays > 0)
      keyFactors.push("History of EMI delays");

    if (app.behavior_consistency_score >= 0.8)
      keyFactors.push("Consistent financial behavior");
    else
      keyFactors.push("Irregular financial behavior");

    return {
      applicantId: app._id,
      decision: app.decision,
      risk: app.risk,
      confidence: app.confidence,
      surplus,
      keyFactors,
      explanation: app.explanation,
      humanReviewRequired: app.risk === "Medium",
    };
  });

  res.json(explained);
});

/* ================= LLM EXPLAINABILITY ================= */

app.post("/llm-explain", async (req, res) => {
  const {
    risk,
    confidence,
    surplus,
    past_emi_delays,
    behavior_score
  } = req.body;

  // -------- RULE-BASED FALLBACK (ALWAYS AVAILABLE)
  const fallbackExplanation = `
The applicant is assessed as ${risk} risk with a confidence of ${Math.round(
    confidence * 100
  )}%.
Monthly surplus is ₹${surplus}, indicating ${
    surplus > 0 ? "positive" : "negative"
  } cashflow.
${
    past_emi_delays > 0
      ? "Previous EMI delays increase repayment risk."
      : "No history of EMI delays observed."
  }
Financial behavior consistency score is ${behavior_score}.
`;

  try {
    const response = await axios.post(
      "https://api.mistral.ai/v1/chat/completions",
      {
        model: "mistral-small",
        messages: [
          {
            role: "system",
            content:
              "You are a financial AI assistant. Explain a credit decision clearly and ethically. Do not change the decision."
          },
          {
            role: "user",
            content: `
Risk level: ${risk}
Confidence: ${confidence}
Monthly surplus: ${surplus}
Past EMI delays: ${past_emi_delays}
Behavior score: ${behavior_score}

Explain the decision in simple language for a non-technical user.
`
          }
        ],
        temperature: 0.2
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.MISTRAL_API_KEY}`,
          "Content-Type": "application/json"
        },
        timeout: 2000
      }
    );

    return res.json({
      source: "LLM",
      explanation: response.data.choices[0].message.content
    });
  } catch (err) {
    return res.json({
      source: "Rule-based",
      explanation: fallbackExplanation.trim()
    });
  }
});




/* ================= RISK BREAKDOWN ================= */

app.get("/risk-breakdown", async (req, res) => {
  const applications = await CreditApplicationModel.find({
    status: "PROCESSED",
  }).lean();

  const breakdown = {
    Low: 0,
    Medium: 0,
    High: 0,
  };

  applications.forEach(app => {
    if (breakdown[app.risk] !== undefined) {
      breakdown[app.risk]++;
    }
  });

  res.json({
    total: applications.length,
    breakdown,
  });
});

/* ================= LOAN REQUEST ================= */

app.post("/loan-request", async (req, res) => {
  try {
    const loan = await LoanRequestModel.create(req.body);
    res.json(loan);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/loan-requests", async (req, res) => {
  res.json(await LoanRequestModel.find({}));
});

/* ================= SERVER ================= */

async function startServer() {
  try {
    await mongoose.connect(uri);
    console.log("✅ MongoDB connected");
    app.listen(PORT, () =>
      console.log(`🚀 FinTrust server running on port ${PORT}`)
    );
  } catch (err) {
    console.error("❌ MongoDB error:", err.message);
    process.exit(1);
  }
}

startServer();
