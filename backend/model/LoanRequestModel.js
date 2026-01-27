const { model } = require("mongoose");
const { LoanRequestSchema } = require("../schemas/LoanRequestSchema");

const LoanRequestModel = new model(
  "loan_requests",
  LoanRequestSchema
);

module.exports = { LoanRequestModel };
