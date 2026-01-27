const { model } = require("mongoose");
const { CreditDecisionSchema } = require("../schemas/CreditDecisionSchema");

const CreditDecisionModel = new model(
  "credit_decision",
  CreditDecisionSchema
);

module.exports = { CreditDecisionModel };
