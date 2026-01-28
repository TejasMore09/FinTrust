const mongoose = require("mongoose");

const LoanRequestSchema = new mongoose.Schema(
  {
    applicantId: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    tenure: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: "SUBMITTED",
    },
  },
  { timestamps: true }
);

module.exports = {
  LoanRequestModel: mongoose.model("LoanRequest", LoanRequestSchema),
};
