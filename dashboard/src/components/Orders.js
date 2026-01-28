import React, { useState } from "react";
import axios from "axios";

const Orders = () => {
  const [form, setForm] = useState({
    applicantId: "",
    months_employed: "",
    monthly_income: "",
    monthly_expenses: "",
    savings_rate: "",
    expense_volatility: "",
    past_emi_delays: "",
    behavior_consistency_score: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:3000/credit-application", {
       /* applicantId: form.applicantId,*/
        months_employed: Number(form.months_employed),
        monthly_income: Number(form.monthly_income),
        monthly_expenses: Number(form.monthly_expenses),
        savings_rate: Number(form.savings_rate),
        expense_volatility: Number(form.expense_volatility),
        past_emi_delays: Number(form.past_emi_delays),
        behavior_consistency_score: Number(form.behavior_consistency_score),
      },
        {withCredentials: true}
      );

      alert("Credit application submitted & evaluated");

      setForm({
        applicantId: "",
        months_employed: "",
        monthly_income: "",
        monthly_expenses: "",
        savings_rate: "",
        expense_volatility: "",
        past_emi_delays: "",
        behavior_consistency_score: "",
      });
    } catch (err) {
      console.error(err);
      alert("Submission failed");
    }
  };

  return (
    <div className="card">
      <h3>New Credit Application</h3>

      {Object.keys(form).map((key) => (
        <input
          key={key}
          name={key}
          placeholder={key.replaceAll("_", " ")}
          value={form[key]}
          onChange={handleChange}
        />
      ))}

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Orders;
