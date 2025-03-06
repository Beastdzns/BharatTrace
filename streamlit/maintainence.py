import streamlit as st
import pandas as pd
import random
from io import StringIO

# Load the dataset into a DataFrame
data = """Truck ID,City,Engine Temp (°C),Oil Pressure (psi),RPM (x1000),Fuel Consumption (L/100km),Battery Voltage (V),Battery Temp (°C),Brake Pad Thickness (mm),Brake Fluid Level (%),Tire Tread Depth (mm),Tire Pressure (psi),Tire Temp (°C),Shock Absorber Condition (%),Ride Height (mm),Transmission Fluid Level (%),Gear Shifts (Count),CO2 Emission (g/km),NOx Emission (ppm),Coolant Level (%),Radiator Condition (%),DTC Count,Electrical System Voltage (V),Last Maintenance Date
Truck_1,Pune,90,40,2.5,12.5,13.0,30,8,90,7,32,35,85,140,95,150,120,50,95,90,3,14.0,2025-09-01
Truck_2,Nashik,85,38,2.7,13.0,12.8,28,9,85,6,30,33,80,142,90,160,115,55,90,88,2,13.8,2025-09-02
Truck_3,Nagpur,92,42,2.8,14.0,13.1,32,7,87,8,31,34,82,138,88,155,125,52,92,89,4,14.1,2025-09-01
Truck_4,Mumbai,88,39,2.4,12.0,12.9,29,6,88,6.5,33,31,78,139,92,148,118,53,93,87,1,13.9,2025-09-03
Truck_5,Surat,89,41,2.6,13.5,13.2,31,8,89,7.2,32,36,83,141,94,153,122,51,96,91,3,14.2,2025-09-01
Truck_6,solapur,91,40,2.9,13.2,13.0,30,7.5,86,6.8,29,34,81,137,89,152,117,56,91,90,2,14.0,2025-09-02
Truck_7,Kolhapur,87,37,2.3,11.8,12.7,28,9,84,6.2,31,32,77,140,91,150,113,54,88,86,1,13.7,2025-09-03
Truck_8,Amravati,93,43,3.0,14.2,13.3,33,7,90,8,34,37,86,142,96,158,126,50,97,92,4,14.3,2025-09-01
Truck_9,vadodara,86,36,2.2,12.3,12.6,27,8.5,83,6.4,30,33,79,139,87,149,116,55,89,87,2,13.6,2025-09-02
Truck_10,thane,94,44,3.1,14.5,13.4,34,6.8,92,7.8,35,38,88,143,97,160,128,49,98,93,5,14.4,2025-09-01"""

df = pd.read_csv(StringIO(data))

# Add Weather Data
def get_weather(city):
    """Simulate weather based on Indian locations."""
    if city in ["Delhi", "Gurugram", "Noida", "Faridabad"]:
        return random.randint(10, 15)  # Cooler due to winter smog
    elif city in ["Agra", "Mathura", "Jaipur"]:
        return random.randint(12, 18)  # Moderate
    elif city in ["Haridwar", "Dehradun", "Chandigarh"]:
        return random.randint(15, 20)  # Slightly warmer hill areas
    else:
        return random.randint(10, 20)  # Default range

df["Weather (°C)"] = df["City"].apply(get_weather)

# Title and Header of the App
st.title("Cargo Truck Maintenance Predictor")
st.markdown("""
    This app helps predict when a cargo truck will require maintenance based on its operational data and real-world conditions.
""")

# Sidebar Input Fields for Truck Data
st.sidebar.header("Input Data")
truck_id = st.sidebar.selectbox("Select Truck ID", df['Truck ID'].unique())
selected_truck = df[df['Truck ID'] == truck_id].iloc[0]

# Display selected truck data
st.sidebar.subheader("Selected Truck Data")
st.sidebar.write(selected_truck)

# Extract parameters from the selected truck
fuel_efficiency_kmpl = 100 / selected_truck['Fuel Consumption (L/100km)']  # Calculate fuel efficiency (kmpl)
fuel_consumed = selected_truck['Fuel Consumption (L/100km)'] / 10  # Simulated fuel consumption in liters
random_multiplier = random.uniform(0.9, 1.2)  # Random factor to differentiate mileage
mileage = fuel_efficiency_kmpl * fuel_consumed * random_multiplier  # Total mileage in km

# Additional Truck Parameters
truck_weight = 25  # Example fixed weight (tons)
cargo_load = st.sidebar.slider("Cargo Load (tons)", min_value=1, max_value=25, value=15)
oil_level = st.sidebar.slider("Engine Oil Level (%)", min_value=0, max_value=100, value=75)
tire_pressure = selected_truck['Tire Pressure (psi)']

# Truck data inputted by user
truck_data = {
    "mileage": round(mileage, 2),
    "fuel_efficiency_kmpl": round(fuel_efficiency_kmpl, 2),
    "truck_weight": float(truck_weight),
    "cargo_load": int(cargo_load),
    "oil_level": int(oil_level),
    "tire_pressure": int(tire_pressure),
    "weather": selected_truck['Weather (°C)']
}

# Button to simulate the maintenance prediction
if st.sidebar.button("Predict Maintenance"):
    st.success(f"🛠️ Maintenance needed in **{random.randint(500, 2000)} km**.")
    st.info(f"🌡️ Weather: {truck_data['weather']}°C in {selected_truck['City']}.")

# Displaying the inputted data
st.subheader("Truck Data Summary")
st.write(f"Mileage: {mileage:.2f} km")
st.write(f"Fuel Efficiency: {fuel_efficiency_kmpl:.2f} kmpl")
st.write(f"Truck Weight: {truck_weight} tons")
st.write(f"Cargo Load: {cargo_load} tons")
st.write(f"Engine Oil Level: {oil_level}%")
st.write(f"Tire Pressure: {tire_pressure} psi")
st.write(f"Weather: {truck_data['weather']}°C in {selected_truck['City']}")

# Improved Data Visualization
st.subheader("Distance Traveled vs Maintenance Predictions")

# Generate synthetic data for mileage over time
chart_data = pd.DataFrame({
    'Truck ID': df['Truck ID'],
    'Distance Traveled (km)': [random.uniform(500, 2000) for _ in range(len(df))],
    'Maintenance Prediction (km)': [random.randint(500, 2000) for _ in range(len(df))]
})

# Create a bar chart
st.bar_chart(chart_data.set_index('Truck ID'))

# Optional: Display the data table for reference
st.dataframe(chart_data)