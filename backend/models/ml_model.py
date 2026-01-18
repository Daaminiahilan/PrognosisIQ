import pandas as pd
from sklearn.ensemble import RandomForestRegressor
import os

DATA_DIR = os.path.join(os.path.dirname(__file__), "../datasets")

models = {}

# Load each organ dataset and train a simple model
for organ in ["brain", "liver", "stomach", "kidney", "heart", "lungs"]:
    path = os.path.join(DATA_DIR, f"{organ}.csv")
    if os.path.exists(path):
        df = pd.read_csv(path)
        X = df[["age","bp","cholesterol","diabetes"]]
        y = df["progression_score"]
        model = RandomForestRegressor()
        model.fit(X, y)
        models[organ] = model
    else:
        models[organ] = None  # fallback

def predict_ml(organ, age, bp, cholesterol, diabetes):
    model = models.get(organ)
    if model:
        X = [[age, bp, cholesterol, diabetes]]
        pred = model.predict(X)[0]
        return round(pred, 2)
    else:
        return None
