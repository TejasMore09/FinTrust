require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const { spawn } = require("child_process");
const path = require("path");

const { CreditApplicationModel } = require("./model/CreditApplicationModel");
const { CreditDecisionModel } = require("./model/CreditDecisionModel");
const { LoanRequestModel } = require("./model/LoanRequestModel");

const app = express();
const PORT = process.env.PORT || 3000;
const uri = process.env.MONGO_URL;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("FinTrust Backend Running ✅");
});

app.post("/credit-application", async (req, res) => {
  try {
    const application = await CreditApplicationModel.create(req.body);
    res.json(application);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/credit-applications", async (req, res) => {
  const data = await CreditApplicationModel.find({});
  res.json(data);
});

app.post("/credit-decision", async (req, res) => {
  try {
    const python = spawn("python", [
      path.join(__dirname, "credit_risk_infer.py"),
    ]);

    python.stdin.write(JSON.stringify(req.body));
    python.stdin.end();

    let output = "";

    python.stdout.on("data", (data) => {
      output += data.toString();
    });

    python.stderr.on("data", (err) => {
      console.error("Python error:", err.toString());
    });

    python.on("close", async () => {
      const decision = JSON.parse(output);

      const savedDecision = await CreditDecisionModel.create({
        ...decision,
        applicantId: req.body.applicantId || null,
      });

      res.json(savedDecision);
    });
  } catch (err) {
    res.status(500).json({ error: "Credit decision failed" });
  }
});

app.get("/credit-decisions", async (req, res) => {
  const data = await CreditDecisionModel.find({});
  res.json(data);
});

app.post("/loan-request", async (req, res) => {
  try {
    const loan = await LoanRequestModel.create(req.body);
    res.json(loan);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/loan-requests", async (req, res) => {
  const data = await LoanRequestModel.find({});
  res.json(data);
});

async function startServer() {
  try {
    await mongoose.connect(uri);
    console.log("✅ MongoDB connected");

    app.listen(PORT, () => {
      console.log(`🚀 FinTrust server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  }
}

startServer();
