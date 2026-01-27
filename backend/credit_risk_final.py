import pandas as pd
import joblib

MODEL_PATH = "backend/models/credit_risk_model.pkl"
rf_model = joblib.load(MODEL_PATH)

FEATURES = [
    "age",
    "months_employed",
    "monthly_income",
    "monthly_expenses",
    "savings_rate",
    "expense_volatility",
    "past_emi_delays",
    "income_to_emi_ratio",
    "cashflow_surplus",
    "behavior_consistency_score"
]

def credit_decision(user_input: dict):
    """
    user_input: dictionary with required FEATURES
    returns explainable credit decision
    """

    user_df = pd.DataFrame([user_input])[FEATURES]

    high_risk_prob = rf_model.predict_proba(user_df)[0][1]


    if high_risk_prob >= 0.6:
        return {
            "risk": "High",
            "decision": "Reject",
            "confidence": round(high_risk_prob, 2),
            "reason": "High predicted default risk based on financial behavior"
        }

    behavior_score = user_df["behavior_consistency_score"].iloc[0]

    if behavior_score >= 0.65:
        return {
            "risk": "Low",
            "decision": "Approve",
            "confidence": round(1 - high_risk_prob, 2),
            "reason": "Strong behavioral consistency and cashflow stability"
        }
    else:
        return {
            "risk": "Medium",
            "decision": "Review",
            "confidence": round(1 - high_risk_prob, 2),
            "reason": "Moderate risk due to inconsistent behavior or limited surplus"
        }
