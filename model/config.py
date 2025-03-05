import os

# MongoDB Settings
MONGO_URI = ""
DATABASE_NAME = "xion"
COLLECTION_NAME = "products"

# Q-Learning Parameters
ALPHA = 0.1  # Learning rate
GAMMA = 0.9  # Discount factor
EPSILON = 0.1  # Exploration rate

# Discount options
DISCOUNTS = [0, 5, 10, 15, 20, 25, 30]

# Paths
DATA_PATH = "data/dynamic_pricing_dataset.csv"
MODEL_PATH = "models/q_learning_model.pkl"
