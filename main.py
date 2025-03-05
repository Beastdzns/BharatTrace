import os
from utils.data_preprocessing import save_to_mongo
from src.train_model import train_model
import pandas as pd
import config

if __name__ == "__main__":
    print("🚀 Starting the Dynamic Pricing System...")

    # Load dataset into MongoDB
    if not os.path.exists(config.DATA_PATH):
        print("❌ Dataset file missing!")
    else:
        df = pd.read_csv(config.DATA_PATH)
        save_to_mongo(df)
        print("✅ Dataset loaded into MongoDB!")

    # Train the model
    train_model()

    # Start Flask API
    print("🚀 Starting Flask API...")
    os.system("python app.py")
