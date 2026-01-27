const { Schema } = require("mongoose");

const CreditApplicationSchema = new Schema(
  {
    name: String,
    age: Number,
    months_employed: Number,
    monthly_income: Number,
    monthly_expenses: Number,
    savings_rate: Number,
    expense_volatility: Number,
    past_emi_delays: Number,
  },
  { timestamps: true }
);

module.exports = { CreditApplicationSchema };
