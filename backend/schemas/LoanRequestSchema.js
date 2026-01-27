const { Schema } = require("mongoose");

const LoanRequestSchema = new Schema({
  applicantId: {
    type: String,
    required: true,
  },
  loanAmount: {
    type: Number,
    required: true,
  },
  tenureMonths: {
    type: Number,
    required: true,
  },
  purpose: {
    type: String,
    default: "General",
  },
  status: {
    type: String,
    default: "PENDING", // PENDING | APPROVED | REJECTED
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = { LoanRequestSchema };
