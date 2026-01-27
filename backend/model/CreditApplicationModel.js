const { model } = require("mongoose");
const { CreditApplicationSchema } = require("../schemas/CreditApplicationSchema");

const CreditApplicationModel = new model(
  "credit_application",
  CreditApplicationSchema
);

module.exports = { CreditApplicationModel };
