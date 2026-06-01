import { useState } from "react";

function ConverterCalc() {
  const [conversionType, setConversionType] = useState("weight"); // 'weight' or 'temperature'
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState("");

  const handleConvert = () => {
    const val = parseFloat(inputValue);
    if (isNaN(val)) {
      setResult("Invalid Input");
      return;
    }

    if (conversionType === "weight") {
      // Kilograms to Pounds
      const lbs = val * 2.20462;
      setResult(`${val} KG = ${lbs.toFixed(2)} Lbs`);
    } else {
      // Celsius to Fahrenheit
      const fahrenheit = (val * 9) / 5 + 32;
      setResult(`${val}°C = ${fahrenheit.toFixed(2)}°F`);
    }
  };

  const handleToggleType = (type) => {
    setConversionType(type);
    setInputValue("");
    setResult("");
  };

  return (
    <div style={styles.container}>
      {/* Type Toggle Tabs */}
      <div style={styles.tabRow}>
        <button
          style={{
            ...styles.tab,
            backgroundColor:
              conversionType === "weight" ? "#333" : "transparent",
            color: conversionType === "weight" ? "#00ffcc" : "#aaa",
          }}
          onClick={() => handleToggleType("weight")}
        >
          Weight (KG to Lbs)
        </button>
        <button
          style={{
            ...styles.tab,
            backgroundColor: conversionType === "temp" ? "#333" : "transparent",
            color: conversionType === "temp" ? "#00ffcc" : "#aaa",
          }}
          onClick={() => handleToggleType("temp")}
        >
          Temp (°C to °F)
        </button>
      </div>

      {/* Input Group */}
      <div style={styles.inputGroup}>
        <label style={styles.label}>
          Enter Value in{" "}
          {conversionType === "weight" ? "Kilograms (KG)" : "Celsius (°C)"}:
        </label>
        <input
          type="number"
          style={styles.input}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="e.g. 100"
        />
      </div>

      {/* Action Button */}
      <button style={styles.convertBtn} onClick={handleConvert}>
        Convert
      </button>

      {/* Result Display */}
      {result && (
        <div style={styles.resultBox}>
          <span style={styles.resultText}>{result}</span>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  tabRow: {
    display: "flex",
    backgroundColor: "#1a1a1a",
    borderRadius: "8px",
    padding: "4px",
  },
  tab: {
    flex: 1,
    padding: "10px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "0.9rem",
    transition: "0.2s",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    marginTop: "10px",
  },
  label: { color: "#aaa", fontSize: "0.9rem" },
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#1a1a1a",
    color: "#fff",
    fontSize: "1.1rem",
    outline: "none",
  },
  convertBtn: {
    padding: "15px",
    border: "none",
    borderRadius: "8px",
    fontSize: "1.1rem",
    cursor: "pointer",
    backgroundColor: "#00aa88",
    color: "#fff",
    fontWeight: "bold",
    marginTop: "5px",
  },
  resultBox: {
    marginTop: "10px",
    padding: "15px",
    backgroundColor: "#1a1a1a",
    borderRadius: "10px",
    textAlign: "center",
  },
  resultText: { color: "#00ffcc", fontWeight: "bold", fontSize: "1.2rem" },
};

export default ConverterCalc;
