const { Schema } = require("mongoose");

const CreditDecisionSchema = new Schema({
  applicantId: String,
  risk: String,
  decision: String,
  confidence: Number,
  reason: String,
  riskProbability: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = { CreditDecisionSchema };
