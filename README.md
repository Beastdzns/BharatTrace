# Xion Hackron - CLINKIT

## Solution Overview

Our solution, **CLINKIT**, is a comprehensive logistics and inventory management system that leverages cutting-edge technology to optimize sales, reduce waste, and enhance efficiency. This system is designed to offer dynamic solutions for managing product inventory, crew schedules, and carbon footprints, making it the perfect tool for businesses seeking to streamline their logistics operations.

### 1. Expiry-Based Dynamic Discounting  
We have implemented a set of mathematical algorithms that dynamically adjust discounts based on product expiry dates. By doing so, we optimize sales and minimize waste, ensuring that products nearing expiration are sold off quickly at a discount. This solution not only boosts sales but also improves sustainability by reducing product wastage.

### 2. Cargo Truck, Crew, and Carbon Footprint Management  
This part of the system is designed to manage cargo truck operations, optimize crew scheduling, and track the carbon footprints of logistics activities. By ensuring that operations are efficient, we contribute to eco-friendly logistics practices while maintaining a balance between cost efficiency and environmental responsibility.

### 3. NFC-Based Model Implementation  
We’ve integrated **NFC (Near Field Communication)** technology to seamlessly track products, authenticate transactions, and transfer real-time data in logistics and inventory management. This technology enables smooth data exchange and real-time tracking of product movement, ensuring that all actions are securely logged and monitored.

### 4. Interactive Inventory Management & Calculations  
Using interactive maps and advanced algorithms, we provide real-time inventory tracking. Our platform helps businesses make informed decisions regarding product stocks, placements, and logistics, ensuring that the supply chain remains efficient and responsive to dynamic changes.

---

## Key Features

1. **Dynamic Discounts**  
   - Automatically adjust discounts based on expiry dates.
   
2. **Efficient Logistics**  
   - Optimize cargo truck operations and crew scheduling.
   
3. **Carbon Tracking**  
   - Monitor and reduce the carbon footprint of logistics activities.
   
4. **NFC Integration**  
   - Real-time tracking and authentication via NFC technology.
   
5. **Inventory Optimization**  
   - Interactive maps for better stock management and supply chain optimization.
   
6. **Crew Management**  
   - Optimized scheduling for better resource management.
   
7. **Real-Time Monitoring**  
   - Continuous monitoring of inventory and logistics operations.
   
8. **Data-Driven Insights**  
   - Analytics and insights that empower decision-making.

---

## Formulas Used

The mathematical formulas used in the system help optimize inventory management, carbon footprint calculations, and dynamic discounting. Below are the main formulas implemented:
![Screenshot 2025-03-06 070130](https://github.com/user-attachments/assets/f5acf82c-dd4c-41d0-a89d-31083b20d52a)

### 1. **Dynamic Discounting Formula**  
The discount rate \(D\) is calculated based on the number of days until a product expires, as follows:

\[
D = \frac{E - t}{E} \times \text{Base Discount Rate}
\]![Screenshot 2025-03-06 070219](https://github.com/user-attachments/assets/05510b3e-41fa-4234-93e5-fc5b2ced3ed6)
![Screenshot 2025-03-06 070633](https://github.com/user-attachments/assets/17febcf0-c87a-486d-9f0b-788f2d4a528c)
![Screenshot 2025-03-06 070746](https://github.com/user-attachments/assets/4f28e000-4db9-4b00-b66e-da0a40804875)
![Screenshot 2025-03-06 070903](https://github.com/user-attachments/assets/ebf8db0b-d0a8-423b-8fa4-05ebde52306a)


Where:![Screenshot 2025-03-06 070434](https://github.com/user-attachments/assets/c244f709-9006-4298-9e59-2781851948ca)

- \(E\) = Expiry date of the product.
- \(t\) = Current time.
- \(D\) = Discount to be applied.

### 2. **Carbon Footprint Formula**  
Carbon emissions per truck are calculated using:

\[
C = \frac{T \times F}{D}
\]

Where:
- \(C\) = Carbon footprint (in kg).
- \(T\) = Total distance travelled (in km).
- \(F\) = Fuel consumption rate (in liters per km).
- \(D\) = Fuel density (in kg per liter).

### 3. **Inventory Optimization Formula**  
We use a variant of the Economic Order Quantity (EOQ) formula to optimize inventory:

\[
EOQ = \sqrt{\frac{2DS}{H}}
\]

Where:
- \(D\) = Demand rate (units per period).
- \(S\) = Ordering cost per order.
- \(H\) = Holding cost per unit per period.

---

## Setup Instructions

Follow the steps below to get the **Supply-Track** system up and running on your local machine:

### 1. Clone the Repository
Clone the repository from GitHub using the following command:

```bash
git clone https://github.com/Beastdzns/xion_hackron.git
cd xion_hackron/clinkit/Supply-Track-main
```

### 2. Install Dependencies
Install all required dependencies by running:

```bash
npm install
```

### 3. Run the Development Server
Start the development server using:

```bash
npm run dev
```

The server will now be running at `http://localhost:3000` where you can access the frontend of the system.

---

## Running the Python Models

We also have Python-based models for dynamic discounting, carbon footprint tracking, and inventory optimization. These models are designed to run via Streamlit for easy interaction.

### 1. Install Streamlit
First, make sure you have Streamlit installed:

```bash
pip install streamlit
```

### 2. Run the Python Models
Navigate to the directory containing the Python script and run the following command:

```bash
streamlit run L2.py
```

This will start a Streamlit application, where you can interact with the models and see how the calculations are made based on different inputs.

---

## Contribute or Interact

We welcome contributions to the **Supply-Track** system! Feel free to fork the repository, submit pull requests, or create issues for any improvements you suggest. You can also interact with the deployed site and explore its functionalities in real-time.
![Screenshot 2025-03-06 071103](https://github.com/user-attachments/assets/3d69c439-5b1c-4c5f-8ccc-9b360b08ce48)

### Contributing
To contribute, follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes and push them to your forked repository.
4. Open a pull request with a detailed description of your changes.

---

## Conclusion

The **Supply-Track** system combines real-time logistics tracking, carbon footprint management, dynamic discounting, and NFC integration to provide a comprehensive solution for modern supply chain and inventory management. With a focus on efficiency, sustainability, and user engagement, this system is designed to streamline operations, reduce waste, and enhance decision-making.

---

For more details or to ask questions, please feel free to open an issue or contact us through the GitHub repository. Happy coding!
