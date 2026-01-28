import sys
import json
import joblib
import pandas as pd
import os
import traceback

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "credit_risk_model.pkl")

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

def safe_float(x, default=0):
    try:
        return float(x)
    except:
        return default

def main():
    try:
        raw = sys.stdin.read()
        if not raw:
            raise ValueError("No input received")

        user = json.loads(raw)

        # Derive missing features
        user["cashflow_surplus"] = safe_float(user.get("monthly_income")) - safe_float(user.get("monthly_expenses"))
        user["income_to_emi_ratio"] = max(safe_float(user.get("monthly_income")) / 10000, 0.1)

        # Sanitize
        user["savings_rate"] = min(max(safe_float(user.get("savings_rate")), 0), 0.8)
        user["expense_volatility"] = min(max(safe_float(user.get("expense_volatility")), 0), 1)
        user["behavior_consistency_score"] = min(max(safe_float(user.get("behavior_consistency_score")), 0), 1)
        user["past_emi_delays"] = safe_float(user.get("past_emi_delays"))

        df = pd.DataFrame([[user.get(f, 0) for f in FEATURES]], columns=FEATURES)

        model = joblib.load(MODEL_PATH)
        prob = float(model.predict_proba(df)[0][1])

        if prob >= 0.6:
            result = {
                "risk": "High",
                "decision": "Reject",
                "confidence": round(prob, 2),
                "explanation": "High predicted default risk based on financial behavior"
            }
        elif user["behavior_consistency_score"] >= 0.65:
            result = {
                "risk": "Low",
                "decision": "Approve",
                "confidence": round(1 - prob, 2),
                "explanation": "Strong income stability and consistent financial behavior"
            }
        else:
            result = {
                "risk": "Medium",
                "decision": "Review",
                "confidence": round(1 - prob, 2),
                "explanation": "Moderate risk due to expense volatility or limited surplus"
            }

        print(json.dumps(result))
        sys.stdout.flush()

    except Exception as e:
        error_result = {
            "risk": "Error",
            "decision": "Error",
            "confidence": 0,
            "explanation": str(e)
        }
        print(json.dumps(error_result))
        sys.stdout.flush()

if __name__ == "__main__":
    main()
