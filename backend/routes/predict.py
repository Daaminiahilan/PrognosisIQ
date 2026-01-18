from flask import Blueprint, request, jsonify
import pandas as pd
import os

from models.ml_model import predict_ml
from models.dl_model import predict_dl
from rag.rag_engine import retrieve_patient_context, rag_prediction

predict_bp = Blueprint("predict", __name__)

def load_dataset(filename="brain.csv"):
    dataset_path = os.path.join(os.path.dirname(__file__), '..', 'datasets', filename)
    if not os.path.exists(dataset_path):
        raise FileNotFoundError(f"{dataset_path} not found!")
    return pd.read_csv(dataset_path)

@predict_bp.route("/predict", methods=["POST"])
def predict():
    try:
        dataset = load_dataset()  # loads CSV safely
    except FileNotFoundError as e:
        return jsonify({"error": str(e)}), 500

    data = request.json
    organ = data.get("organ")
    age = data.get("age")
    bp = data.get("bp")
    cholesterol = data.get("cholesterol", 200)
    diabetes = data.get("diabetes", 0)
    patient_id = data.get("patient_id")

    ml_result = predict_ml(organ, age, bp, cholesterol, diabetes)
    dl_result = predict_dl(None)
    context = retrieve_patient_context(patient_id)
    final_result = rag_prediction(dl_result, context)

    return jsonify({
        "organ": organ,
        "ml_prediction": ml_result,
        "dl_prediction": dl_result,
        "final_prediction": final_result
    })
