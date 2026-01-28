const mongoose = require("mongoose");

const CreditApplicationSchema = new mongoose.Schema(
  {
    // ---- INPUT DATA (from New Credit Application form)
    months_employed: Number,
    monthly_income: Number,
    monthly_expenses: Number,
    savings_rate: Number,
    expense_volatility: Number,
    past_emi_delays: Number,
    income_to_emi_ratio: Number,
    cashflow_surplus: Number,
    behavior_consistency_score: Number,

    // ---- ML OUTPUT (THIS IS WHAT WAS MISSING)
    risk: {
      type: String,
      default: "Pending",
    },
    decision: {
      type: String,
      default: "Pending",
    },
    confidence: {
      type: Number,
      default: 0,
    },
    explanation: {
      type: String,
    },

    // ---- STATUS
    status: {
      type: String,
      default: "SUBMITTED",
    },
  },
  { timestamps: true }
);

module.exports = { CreditApplicationSchema };
