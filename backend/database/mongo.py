from pymongo import MongoClient
from config import MONGO_URI, DB_NAME

client = MongoClient(MONGO_URI)
db = client[DB_NAME]

patients_collection = db["patients"]
predictions_collection = db["predictions"]
