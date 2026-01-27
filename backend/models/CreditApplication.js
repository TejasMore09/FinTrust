const mongoose = require("mongoose");

const CreditApplicationSchema = new mongoose.Schema({
  applicantId: String,

  profile: {
    ageRange: String,
    employmentType: String,
    monthsEmployed: Number,
    cityTier: Number
  },

  behavior: {
    monthlyIncome: Number,
    monthlyExpenses: Number,
    savingsRate: Number,
    expenseVolatility: Number,
    pastEmiDelays: Number,
    digitalTxnFreq: Number
  },

  loan: {
    amount: Number,
    tenure: Number
  },

  result: {
    creditScore: Number,
    risk: String,
    decision: String,
    confidence: Number,
    explanation: {
      positives: [String],
      risks: [String]
    }
  },

  status: {
    type: String,
    default: "PENDING"
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model(
  "CreditApplication",
  CreditApplicationSchema
);
