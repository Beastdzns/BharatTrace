import pandas as pd
import numpy as np
from src.dynamic_pricing_agent import QLearningAgent
from utils.data_preprocessing import load_data_from_mongo
import config

def train_model():
    df = load_data_from_mongo()
    num_states = len(df)
    num_actions = len(config.DISCOUNTS)

    agent = QLearningAgent(state_size=num_states, action_size=num_actions)

    num_episodes = 1000
    for _ in range(num_episodes):
        for index, row in df.iterrows():
            state = index
            action = agent.choose_action(state)
            discount = config.DISCOUNTS[action]

            new_sales = row["daily_sales"] * (1 + discount / 100)
            stock_left = row["stock_available"] - new_sales
            expiry_factor = 1 - (row["days_to_expiry"] / 30)
            reward = (new_sales / row["daily_sales"]) * 10 - expiry_factor * 5

            next_state = min(state + 1, num_states - 1)

            agent.update_q_table(state, action, reward, next_state)

    agent.save_model()
    print("✅ Model training completed and saved!")

if __name__ == "__main__":
    train_model()
