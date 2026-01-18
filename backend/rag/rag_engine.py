def retrieve_patient_context(patient_id):
    return "Patient has diabetes history and high BP"

def rag_prediction(base_prediction, context):
    return f"{base_prediction} | Context Used: {context}"
