import streamlit as st
import pandas as pd
import plotly.express as px
import geopy.distance

# Set up the page
st.set_page_config(page_title="Inventory/Order Management", layout="wide")
st.title("📦 Inventory Management")

# Styling
st.markdown(
    """
    <style>
    .stButton>button {
        width: 100%;
        background-color: #0073e6;
        color: white;
        font-weight: bold;
        border-radius: 8px;
        height: 40px;
    }
    .stButton>button:hover {
        background-color: #005bb5;
    }
    .card {
        background-color: #f4f4f9;
        padding: 25px;
        border-radius: 10px;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
        margin-bottom: 20px;
    }
    h1, h3 {
        color: white;
    }
    .header {
        background-color: #f8f9fa;
        padding: 10px;
        border-radius: 8px;
        margin-bottom: 30px;
    }
    .section-title {
        font-size: 18px;
        color: #005bb5;
    }
    </style>
    """,
    unsafe_allow_html=True,
)

# Coordinates for NCR Region (Delhi)
ncr_location = (28.6139, 77.2090)  # Latitude, Longitude for New Delhi

# Static weather data dictionary
static_weather_data = {
    "Delhi": {
        "temperature": 18,
        "description": "Clear sky",
        "humidity": 60
    },
    "Mumbai": {
        "temperature": 22,
        "description": "Few clouds",
        "humidity": 80
    },
    "Bengaluru": {
        "temperature": 23,
        "description": "Light rain",
        "humidity": 85
    },
    "Kolkata": {
        "temperature": 21,
        "description": "Scattered clouds",
        "humidity": 70
    },
    "Chennai": {
        "temperature": 27,
        "description": "Sunny",
        "humidity": 65
    }
}

# Static Weather API function
def get_weather(city):
    # Return static weather information from the dictionary
    if city in static_weather_data:
        weather_info = static_weather_data[city]
        return f"Weather in {city}: {weather_info['temperature']}°C, {weather_info['description']}, Humidity: {weather_info['humidity']}%"
    else:
        return "Weather data unavailable for this city."

# Function to calculate distance between two cities
def calculate_distance(lat1, lon1, lat2, lon2):
    return geopy.distance.distance((lat1, lon1), (lat2, lon2)).km

# Add a Navigation Sidebar
with st.sidebar:
    st.header("Navigation")
    section = st.radio("Go to Section", options=["Create Item", "Transfer Ownership", "Update Item State", "View Item Details", "Inventory Overview"])

# Add some dummy data for inventory overview with locations
inventory_data = {
    "Item Name": ["Item A", "Item B", "Item C", "Item D", "Item E"],
    "Stock Level": [100, 150, 75, 120, 60],
    "State": ["Shipped", "Received", "Manufactured", "Delivered", "Created"],
    "Location": ["Delhi", "Mumbai", "Bengaluru", "Kolkata", "Chennai"],  # Sample locations from different cities
    "Latitude": [28.6139, 19.0760, 12.9716, 22.5726, 13.0827],  # Latitudes for locations in India
    "Longitude": [77.2090, 72.8777, 77.5946, 88.3639, 80.2707],  # Longitudes for locations in India
}

df_inventory = pd.DataFrame(inventory_data)

# Overview: Inventory Stock Chart
if section == "Inventory Overview":
    st.markdown("### 📊 Inventory Stock Overview")
    st.write("Stock levels of various items in the supply chain.")
    fig = px.bar(df_inventory, x="Item Name", y="Stock Level", color="State", title="Inventory Stock Overview")
    st.plotly_chart(fig)

    # Map View of Stock Locations
    st.markdown("### 🗺️ Stock Locations Map (India Only)")
  
    # Plot Map focused on India
    fig_map = px.scatter_geo(
        df_inventory,
        lat='Latitude',
        lon='Longitude',
        hover_name='Item Name',
        size='Stock Level',
        template="plotly",
        projection="mercator",  # Use Mercator projection for India
        scope="asia",  # Focus the map on Asia (specifically India)
        geojson=None,  # Remove geojson for custom regions
    )
    
    # Add city labels to the map
    fig_map.update_traces(marker=dict(symbol="circle"), selector=dict(mode='markers'))
    fig_map.update_layout(
        geo=dict(
            projection_scale=5,
            center={"lat": 20.5937, "lon": 78.9629},  # Center map on India
            visible=True,
            showland=True
        ),
        annotations=[dict(
                x=df_inventory['Longitude'][i],
                y=df_inventory['Latitude'][i],
                text=df_inventory['Location'][i],
                showarrow=True,
                font=dict(size=12, color="black"),
                arrowhead=2
            ) for i in range(len(df_inventory))]
    )
    st.plotly_chart(fig_map)

    # City selection for weather
    city_name = st.selectbox("Select a City", df_inventory['Location'])
    if city_name:
        weather_info = get_weather(city_name)
        st.markdown(f"### 🌤️ {weather_info}")

    # City selection for distance calculation
    city1 = st.selectbox("Select First City", df_inventory['Location'])
    city2 = st.selectbox("Select Second City", df_inventory['Location'])
    
    if city1 and city2:
        # Get lat, lon for both cities
        city1_data = df_inventory[df_inventory['Location'] == city1].iloc[0]
        city2_data = df_inventory[df_inventory['Location'] == city2].iloc[0]
        
        # Calculate distance
        distance = calculate_distance(city1_data['Latitude'], city1_data['Longitude'], city2_data['Latitude'], city2_data['Longitude'])
        
        # Assume average speed to calculate time (this is a placeholder)
        average_speed_kmh = 60  # km/h
        time = distance / average_speed_kmh  # in hours
        
        st.markdown(f"### 🚗 Distance between {city1} and {city2}: {distance:.2f} km")
        st.markdown(f"Estimated travel time (at {average_speed_kmh} km/h): {time:.2f} hours")

# Create Item Section
if section == "Create Item":
    st.markdown("### Create New Item 🏷️")
    with st.form("create_item_form"):
        item_name = st.text_input("Item Name", placeholder="Enter item name")
        item_details = st.text_area("Item Details", placeholder="Enter item details")
        create_item_submit = st.form_submit_button("Create Item")

        if create_item_submit:
            if item_name and item_details:
                st.success(f"Item Created: {item_name}, Details: {item_details}")
            else:
                st.error("Please fill in both the item name and details.")

# Transfer Ownership Section
if section == "Transfer Ownership":
    st.markdown("### Transfer Ownership 🛠️")
    with st.form("transfer_ownership_form"):
        item_id_transfer = st.number_input("Item ID", step=1)
        new_owner_address = st.text_input("New Owner Address", placeholder="Enter new owner address")
        transfer_ownership_submit = st.form_submit_button("Transfer Ownership")

        if transfer_ownership_submit:
            if item_id_transfer and new_owner_address:
                st.success(f"Ownership Transferred: Item ID {item_id_transfer}, New Owner {new_owner_address}")
            else:
                st.error("Please fill in both item ID and new owner address.")

# Update Item State Section
if section == "Update Item State":
    st.markdown("### Update Item State 🔄")
    with st.form("update_state_form"):
        item_id_state = st.number_input("Item ID", step=1)
        item_state = st.selectbox("State", ["Created", "Manufactured", "Shipped", "Received", "Delivered"])
        item_location = st.text_input("Location", placeholder="Enter location")
        update_state_submit = st.form_submit_button("Update State")

        if update_state_submit:
            if item_id_state and item_state and item_location:
                st.success(f"State Updated: Item ID {item_id_state}, State {item_state}, Location {item_location}")
            else:
                st.error("Please fill in all fields.")

# View Item Details Section
if section == "View Item Details":
    st.markdown("### View Item Details 🔍")
    with st.form("view_item_form"):
        view_item_id = st.number_input("Item ID", step=1)
        view_item_submit = st.form_submit_button("View Details")

        if view_item_submit:
            if view_item_id:
                # Mock data for demonstration
                mock_data = {
                    "id": view_item_id,
                    "name": "Sample Item",
                    "state": "Shipped",
                    "location": "Distribution Center",
                    "owner": "0x123456789abcdef",
                }
                st.markdown(
                    f"""
                    **ID:** {mock_data['id']}  
                    **Name:** {mock_data['name']}  
                    **State:** {mock_data['state']}  
                    **Location:** {mock_data['location']}  
                    **Owner:** {mock_data['owner']}
                    """
                )
            else:
                st.error("Please enter a valid item ID.")