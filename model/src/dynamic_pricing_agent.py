import numpy as np
import pickle
import config

class QLearningAgent:
    def __init__(self, state_size, action_size):
        self.state_size = state_size
        self.action_size = action_size
        self.alpha = config.ALPHA
        self.gamma = config.GAMMA
        self.epsilon = config.EPSILON
        self.q_table = np.zeros((state_size, action_size))  # Initialize Q-table

    def choose_action(self, state):
        """Epsilon-greedy strategy for action selection"""
        if np.random.rand() < self.epsilon:
            return np.random.randint(self.action_size)  # Explore
        return np.argmax(self.q_table[state])  # Exploit best known action

    def update_q_table(self, state, action, reward, next_state):
        """Q-Learning update rule"""
        best_next_action = np.argmax(self.q_table[next_state])
        self.q_table[state, action] += self.alpha * (
            reward + self.gamma * self.q_table[next_state, best_next_action] - self.q_table[state, action]
        )

    def save_model(self):
        """Save trained Q-table"""
        with open(config.MODEL_PATH, "wb") as f:
            pickle.dump(self.q_table, f)

    def load_model(self):
        """Load pre-trained Q-table"""
        with open(config.MODEL_PATH, "rb") as f:
            self.q_table = pickle.load(f)
