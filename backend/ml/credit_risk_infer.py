import sys
import json
import joblib
import pandas as pd

MODEL_PATH = "models/credit_risk_model.pkl"

FEATURES = [
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

def sanitize(x):
    x["savings_rate"] = min(max(x["savings_rate"], 0), 0.8)
    x["expense_volatility"] = min(max(x["expense_volatility"], 0), 1)
    x["income_to_emi_ratio"] = max(x["income_to_emi_ratio"], 0.1)
    return x

def main():
    user_input = json.loads(sys.stdin.read())
    user_input = sanitize(user_input)

    df = pd.DataFrame([user_input])[FEATURES]

    model = joblib.load(MODEL_PATH)
    prob = model.predict_proba(df)[0][1]

    if prob >= 0.6:
        result = {
            "risk": "High",
            "decision": "Reject",
            "confidence": round(prob, 2),
            "reason": "High predicted default risk"
        }
    elif user_input["behavior_consistency_score"] >= 0.65:
        result = {
            "risk": "Low",
            "decision": "Approve",
            "confidence": round(1 - prob, 2),
            "reason": "Strong financial behavior"
        }
    else:
        result = {
            "risk": "Medium",
            "decision": "Review",
            "confidence": round(1 - prob, 2),
            "reason": "Moderate behavioral risk"
        }

    print(json.dumps(result))

if __name__ == "__main__":
    main()
