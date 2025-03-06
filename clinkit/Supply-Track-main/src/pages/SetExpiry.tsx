import React, { useState } from "react";
import { Inputs, Result } from "../types/Expiry";
import { calculateDiscount } from "../logic/calculations";
import NFCScanner from "../components/NFCscanner";

const SetExpiry: React.FC = () => {
  // Initialize state locally
  const [inputs, setInputs] = useState<Inputs>({
    shelfLifeType: "FSL",
    lefoFraction: 0,
    profitMargin: 0,
    weeklyDemand: 0,
    originalPrice: 0,
    currentInventory: 0,
    remainingDays: 0,
    totalShelfLife: 8,
    currentMicro: 0,
  });

  const [result, setResult] = useState<Result>({});

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: name === "shelfLifeType" ? value : Number(value),
    }));
  };

  // Calculate discount using the imported business logic
  const handleCalculateDiscount = () => {
    const results = calculateDiscount(inputs);
    setResult(results);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "2rem",
        fontFamily: "monospace",
      }}
    >
      <div
        style={{
          maxWidth: "600px",
          width: "100%",
          backgroundColor: "#FFEB3B",
          borderRadius: "4px",
          border: "4px solid #000000",
          boxShadow: "8px 8px 0px #000000",
          padding: "2rem",
          marginBottom: "2rem",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            textTransform: "uppercase",
            marginBottom: "1.5rem",
            fontWeight: "bold",
            letterSpacing: "1px",
            borderBottom: "3px solid black",
            paddingBottom: "0.5rem",
          }}
        >
          Set Expiry Date
        </h2>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "1rem",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "fit-content",
              padding: "10px 20px",
              backgroundColor: "beige",
              border: "3px solid black",
              borderRadius: "12px",
              boxShadow: "3px 3px 10px rgba(0, 0, 0, 0.2)",
              cursor: "pointer",
              transition: "all 0.3s ease-in-out",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <NFCScanner onData={(data) => console.log(data)} />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            marginBottom: "1.5rem",
          }}
        >
          <div>
            <label
              style={{
                display: "block",
                fontWeight: "bold",
                marginBottom: "0.5rem",
              }}
            >
              Shelf Life Type:
            </label>
            <select
              name="shelfLifeType"
              value={inputs.shelfLifeType}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "3px solid black",
                backgroundColor: "white",
                fontFamily: "monospace",
                fontSize: "1rem",
              }}
            >
              <option value="FSL">Fixed Shelf Life (FSL)</option>
              <option value="DSL">Dynamic Shelf Life (DSL)</option>
            </select>
          </div>

          <div>
            <label
              style={{
                display: "block",
                fontWeight: "bold",
                marginBottom: "0.5rem",
              }}
            >
              LEFO Fraction (0-1):
            </label>
            <input
              name="lefoFraction"
              type="number"
              step="0.1"
              min="0"
              max="1"
              value={inputs.lefoFraction}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "3px solid black",
                backgroundColor: "white",
                fontFamily: "monospace",
                fontSize: "1rem",
              }}
            />
          </div>

          <div>
            <label
              style={{
                display: "block",
                fontWeight: "bold",
                marginBottom: "0.5rem",
              }}
            >
              Profit Margin (%):
            </label>
            <input
              name="profitMargin"
              type="number"
              step="0.5"
              value={inputs.profitMargin}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "3px solid black",
                backgroundColor: "white",
                fontFamily: "monospace",
                fontSize: "1rem",
              }}
            />
          </div>

          <div>
            <label
              style={{
                display: "block",
                fontWeight: "bold",
                marginBottom: "0.5rem",
              }}
            >
              Weekly Demand:
            </label>
            <input
              name="weeklyDemand"
              type="number"
              min="0"
              value={inputs.weeklyDemand}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "3px solid black",
                backgroundColor: "white",
                fontFamily: "monospace",
                fontSize: "1rem",
              }}
            />
          </div>

          <div>
            <label
              style={{
                display: "block",
                fontWeight: "bold",
                marginBottom: "0.5rem",
              }}
            >
              Original Price (₹):
            </label>
            <input
              name="originalPrice"
              type="number"
              step="0.01"
              min="0"
              value={inputs.originalPrice}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "3px solid black",
                backgroundColor: "white",
                fontFamily: "monospace",
                fontSize: "1rem",
              }}
            />
          </div>

          <div>
            <label
              style={{
                display: "block",
                fontWeight: "bold",
                marginBottom: "0.5rem",
              }}
            >
              Current Inventory:
            </label>
            <input
              name="currentInventory"
              type="number"
              min="0"
              value={inputs.currentInventory}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "3px solid black",
                backgroundColor: "white",
                fontFamily: "monospace",
                fontSize: "1rem",
              }}
            />
          </div>

          {inputs.shelfLifeType === "FSL" && (
            <>
              <div>
                <label
                  style={{
                    display: "block",
                    fontWeight: "bold",
                    marginBottom: "0.5rem",
                  }}
                >
                  Remaining Shelf Life (days):
                </label>
                <input
                  name="remainingDays"
                  type="number"
                  min="0"
                  value={inputs.remainingDays}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "3px solid black",
                    backgroundColor: "white",
                    fontFamily: "monospace",
                    fontSize: "1rem",
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontWeight: "bold",
                    marginBottom: "0.5rem",
                  }}
                >
                  Total Shelf Life (days, default 8):
                </label>
                <input
                  name="totalShelfLife"
                  type="number"
                  min="1"
                  value={inputs.totalShelfLife}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    border: "3px solid black",
                    backgroundColor: "white",
                    fontFamily: "monospace",
                    fontSize: "1rem",
                  }}
                />
              </div>
            </>
          )}

          {inputs.shelfLifeType === "DSL" && (
            <div>
              <label
                style={{
                  display: "block",
                  fontWeight: "bold",
                  marginBottom: "0.5rem",
                }}
              >
                Current Microbiological Count (log cfu/g):
              </label>
              <input
                name="currentMicro"
                type="number"
                step="0.1"
                value={inputs.currentMicro}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: "3px solid black",
                  backgroundColor: "white",
                  fontFamily: "monospace",
                  fontSize: "1rem",
                }}
              />
            </div>
          )}
        </div>

        <button
          onClick={handleCalculateDiscount}
          style={{
            width: "100%",
            padding: "0.75rem",
            backgroundColor: "#FFC107",
            border: "3px solid black",
            boxShadow: "4px 4px 0px #000000",
            fontWeight: "bold",
            fontSize: "1rem",
            cursor: "pointer",
            textTransform: "uppercase",
            fontFamily: "monospace",
            transition: "0.2s all",
            marginTop: "1rem",
          }}
        >
          Calculate
        </button>

        {result.recommendedDiscount !== undefined && (
          <div
            style={{
              marginTop: "1.5rem",
              backgroundColor: "white",
              border: "3px solid black",
              padding: "1rem",
              boxShadow: "4px 4px 0px #000000",
            }}
          >
            <h3
              style={{
                textAlign: "center",
                textTransform: "uppercase",
                marginBottom: "1rem",
                fontWeight: "bold",
                letterSpacing: "1px",
                borderBottom: "2px solid black",
                paddingBottom: "0.5rem",
              }}
            >
              Results
            </h3>
            <p style={{ fontSize: "1.1rem", margin: "0.5rem 0" }}>
              <span style={{ fontWeight: "bold" }}>Original price:</span> ₹
              {inputs.originalPrice.toFixed(2)}
            </p>
            <p style={{ fontSize: "1.1rem", margin: "0.5rem 0" }}>
              <span style={{ fontWeight: "bold" }}>Recommended discount:</span>{" "}
              {result.recommendedDiscount?.toFixed(1)}%
            </p>
            <p style={{ fontSize: "1.1rem", margin: "0.5rem 0" }}>
              <span style={{ fontWeight: "bold" }}>Discounted price:</span> ₹
              {result.discountedPrice?.toFixed(2)}
            </p>
            <p style={{ fontSize: "1.1rem", margin: "0.5rem 0" }}>
              <span style={{ fontWeight: "bold" }}>
                Profit margin after discount:
              </span>{" "}
              {result.finalProfitMargin?.toFixed(1)}%
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SetExpiry;
