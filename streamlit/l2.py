import streamlit as st
import matplotlib.pyplot as plt
import numpy as np
from collections import deque

def print_queue(q):
    """Format the queue for display."""
    return ' '.join(map(str, q))

def visualize_queues(times, active_states, rest_states):
    """Visualize the number of active and resting trucks over time."""
    fig, ax = plt.subplots(figsize=(12, 6))
    time_ticks = np.arange(0, max(times) + 1, 60)

    ax.step(times, active_states, where='post', label='Active Trucks (In Transit)', linestyle='-', marker='o', color='blue')
    ax.step(times, rest_states, where='post', label='Resting Trucks (Loading/Unloading)', linestyle='--', marker='x', color='red')

    ax.set_xlabel('Time (minutes)')
    ax.set_ylabel('Number of Trucks')
    ax.set_title('Active and Resting Trucks Over Time')
    ax.set_xticks(time_ticks)
    ax.set_xticklabels([str(t) for t in time_ticks])
    ax.legend()
    plt.grid(True)
    st.pyplot(fig)

def main():
    st.title("Crew Management")

    # Input for the number of trucks
    num_trucks = st.slider("Number of Trucks", min_value=1, max_value=100, value=10)
    max_time = 480  # Total simulation time in minutes
    transit_duration = 120  # Time trucks spend in transit (in minutes)
    rest_duration = 60  # Time trucks spend loading/unloading (in minutes)

    # Initialize active (in-transit) and rest (loading/unloading) queues
    active = deque()
    rest = deque()

    # Initialize trucks
    for i in range(1, num_trucks + 1):
        active.append(i)

    # Track time and states
    times = []
    active_states = []
    rest_states = []

    # Form for adding a truck to the rest queue manually
    with st.form(key='add_truck_form'):
        truck_id = st.number_input("Truck ID to Add to Rest Queue", min_value=1, max_value=num_trucks, value=1)
        submit_button = st.form_submit_button(label='Add Truck to Rest Queue')

        if submit_button:
            if truck_id in active:
                active.remove(truck_id)
                rest.append(truck_id)
                st.success(f"Truck {truck_id} moved to Rest Queue.")
            else:
                st.warning(f"Truck {truck_id} is not currently active.")

    # Simulation loop
    current_time = 0
    while current_time <= max_time:
        times.append(current_time)
        active_states.append(len(active))
        rest_states.append(len(rest))

        st.write(f"Time: {current_time} minutes")
        st.write(f"Active trucks (In Transit): {print_queue(active)}")
        st.write(f"Resting trucks (Loading/Unloading): {print_queue(rest)}")
        st.write("=====================")

        # Transition logic: Move trucks between active and resting states
        if active:
            # After transit duration, the first truck in the active queue goes to the rest queue
            if current_time % transit_duration == 0 and len(active) > 0:
                rest.append(active.popleft())

        if rest:
            # After rest duration, the first truck in the rest queue goes back to the active queue
            if current_time % (transit_duration + rest_duration) == 0 and len(rest) > 0:
                active.append(rest.popleft())

        current_time += 30  # Increment time in 30-minute steps (adjustable)

    # Capture the final state at the end of the simulation
    times.append(current_time)
    active_states.append(len(active))
    rest_states.append(len(rest))

    st.write("Final State:")
    st.write(f"Active trucks (In Transit): {print_queue(active)}")
    st.write(f"Resting trucks (Loading/Unloading): {print_queue(rest)}")

    # Visualization of the simulation results
    visualize_queues(times, active_states, rest_states)

if __name__ == "__main__":
    main()