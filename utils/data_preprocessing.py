import pandas as pd
from pymongo import MongoClient
import config

def load_data_from_mongo():
    """Loads product data from MongoDB into a DataFrame."""
    client = MongoClient(config.MONGO_URI)
    db = client[config.DATABASE_NAME]
    collection = db[config.COLLECTION_NAME]
    data = list(collection.find({}, {"_id": 0}))  # Exclude MongoDB ID field
    return pd.DataFrame(data)

def save_to_mongo(df):
    """Saves DataFrame to MongoDB."""
    client = MongoClient(config.MONGO_URI)
    db = client[config.DATABASE_NAME]
    collection = db[config.COLLECTION_NAME]
    collection.insert_many(df.to_dict(orient="records"))

if __name__ == "__main__":
    df = pd.read_csv(config.DATA_PATH)
    save_to_mongo(df)
    print("✅ Data successfully inserted into MongoDB")
