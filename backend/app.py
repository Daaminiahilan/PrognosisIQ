from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
import os

app = Flask(__name__)
CORS(app)

DATASET_DIR = "datasets"

# -----------------------------
# Root route (health check)
# -----------------------------
@app.route("/")
def home():
    return "Backend is running"

# -----------------------------
# Get available CSV files
# -----------------------------
@app.route("/api/csvs")
def get_csvs():
    files = [f for f in os.listdir(DATASET_DIR) if f.endswith(".csv")]
    return jsonify(files)

# -----------------------------
# Fetch CSV data
# -----------------------------
@app.route("/api/data")
def get_data():
    organ = request.args.get("organ")
    if not organ:
        return jsonify([])

    path = os.path.join(DATASET_DIR, organ)
    df = pd.read_csv(path)

    return jsonify(df.to_dict(orient="records"))

# -----------------------------
# ML/DL Prediction (Dummy)
# -----------------------------
@app.route("/predict", methods=["POST"])
def predict():
    data = request.json

    result = {
        "organ": data["organ"],
        "risk_level": "Medium",
        "probabilities": {
            "Low": 0.25,
            "Medium": 0.50,
            "High": 0.25
        }
    }
    return jsonify(result)

# -----------------------------
# RAG Explanation (Dummy)
# -----------------------------
@app.route("/rag/explain", methods=["POST"])
def rag_explain():
    data = request.json

    explanation = (
        f"Based on similar historical records retrieved from the {data['organ']} dataset, "
        f"patients with age {data['age']} and cholesterol level {data['cholesterol']} "
        "typically fall under a medium risk category. "
        "This explanation is generated using a retrieval-augmented approach."
    )

    return jsonify({"rag_explanation": explanation})

if __name__ == "__main__":
    app.run(debug=True)
