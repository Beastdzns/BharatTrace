from flask import Flask, request, jsonify
import pickle
import numpy as np
from utils.data_preprocessing import load_data_from_mongo
import config

app = Flask(__name__)

with open(config.MODEL_PATH, "rb") as f:
    q_table = pickle.load(f)

@app.route("/get_discount", methods=["POST"])
def get_discount():
    data = request.json
    product_id = data.get("product_id")

    df = load_data_from_mongo()
    
    if product_id not in df["product_id"].values:
        return jsonify({"error": "Invalid product ID"}), 400

    state = df[df["product_id"] == product_id].index[0]
    optimal_action = np.argmax(q_table[state])
    predicted_discount = config.DISCOUNTS[optimal_action]
    
    return jsonify({"discount": predicted_discount})

if __name__ == "__main__":
    app.run(debug=True)
