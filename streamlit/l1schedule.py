import streamlit as st
import pandas as pd
import matplotlib.pyplot as plt
import numpy as np

# Load and process the CSV file
@st.cache
def load_data(file_path):
    df = pd.read_csv(file_path)
    if 'No. of Trucks' not in df.columns:
        st.error("Error: Column 'No. of Trucks' does not exist in the CSV file.")
        return None
    if 'Truck Load Capacity' not in df.columns or 'Route Density' not in df.columns:
        st.error("Error: Required columns ('Truck Load Capacity' or 'Route Density') are missing.")
        return None
    return df

def adjust_frequency(current_freq, density, baseline_density, weight):
    if density > baseline_density:
        return decrease_frequency(current_freq, density, baseline_density, weight)
    elif density < baseline_density:
        return increase_frequency(current_freq, density, baseline_density, weight)
    else:
        return current_freq

def decrease_frequency(current_freq, density, baseline_density, weight):
    change_factor = (density - baseline_density) / baseline_density
    adjustment = int(current_freq * (1 - change_factor * weight))
    return max(1, adjustment)  # Ensure frequency doesn't drop below 1

def increase_frequency(current_freq, density, baseline_density, weight):
    change_factor = (baseline_density - density) / baseline_density
    adjustment = int(current_freq * (1 + change_factor * weight))
    return adjustment

def plot_comparison(initial_df, adjusted_df):
    fig, ax = plt.subplots(figsize=(12, 6))
    routes = initial_df['Route No.']
    
    for i in range(5):
        ax.plot(routes, initial_df['Frequency'], label=f'Initial Frequency (Time Slot {i+1})', linestyle='--')
        ax.plot(routes, adjusted_df[f'Adjusted_Frequency_{i+1}'], label=f'Adjusted Frequency (Time Slot {i+1})')
    
    ax.set_xlabel('Route No.')
    ax.set_ylabel('Truck Frequency')
    ax.set_title('Comparison of Initial and Adjusted Truck Frequencies')
    ax.legend()
    st.pyplot(fig)

st.title("Truck Frequency Adjustment and Visualization")

# Upload and process the CSV file
uploaded_file = st.file_uploader("Upload your CSV file", type=["csv"])
if uploaded_file is not None:
    df = load_data(uploaded_file)
    
    if df is not None:
        st.subheader("Initial Data")
        st.write(df.head())

        # Processing
        baseline_density = df['Route Density'].mean()
        weights = [0.25, 0.5, 1, 1.25, 1.5]  # Varying adjustment factors

        for i, weight in enumerate(weights):
            df[f'Adjusted_Frequency_{i+1}'] = df.apply(lambda row: adjust_frequency(row['Frequency'], row['Route Density'], baseline_density, weight), axis=1)
            df[f'Truck_Requirement_{i+1}'] = df[f'Adjusted_Frequency_{i+1}'] * df['No. of Trucks']

        st.subheader("Adjusted Data")
        st.write(df.head())

        # Plot comparison
        st.subheader("Frequency Comparison")
        plot_comparison(df, df)  # Adjust to plot initial vs adjusted frequencies

        # Download link for adjusted CSV files
        for i in range(5):
            adjusted_csv = df[['Route No.', 'Frequency', f'Adjusted_Frequency_{i+1}', f'Truck_Requirement_{i+1}']].copy()
            csv_data = adjusted_csv.to_csv(index=False)
            st.download_button(
                label=f"Download Adjusted Data for Time Slot {i+1}",
                data=csv_data,
                file_name=f'adjusted_truck_data_timeslot_{i+1}.csv',
                mime='text/csv'
            )