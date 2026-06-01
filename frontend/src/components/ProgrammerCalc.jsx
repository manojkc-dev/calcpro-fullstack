import { useState } from "react";

function ProgrammerCalc() {
  const [input, setInput] = useState("");

  // Convert the input string (assumed decimal for now) into other bases safely
  const getConvertedValues = () => {
    const num = parseInt(input, 10);
    if (isNaN(num)) {
      return { hex: "0", dec: "0", oct: "0", bin: "0" };
    }
    return {
      hex: num.toString(16).toUpperCase(),
      dec: num.toString(10),
      oct: num.toString(8),
      bin: num.toString(2),
    };
  };

  const values = getConvertedValues();

  const handleBtnClick = (value) => {
    if (value === "C") {
      setInput("");
    } else if (value === "<<") {
      const num = parseInt(input, 10);
      if (!isNaN(num)) setInput(String(num << 1));
    } else if (value === ">>") {
      const num = parseInt(input, 10);
      if (!isNaN(num)) setInput(String(num >> 1));
    } else {
      // Only allow numbers for decimal input mode right now
      if (/^[0-9]$/.test(value)) {
        setInput(input + value);
      }
    }
  };

  const buttons = [
    "C",
    "<<",
    ">>",
    "7",
    "8",
    "9",
    "4",
    "5",
    "6",
    "1",
    "2",
    "3",
    "0",
  ];

  return (
    <div style={styles.container}>
      {/* Real-time Base Conversion Display */}
      <div style={styles.baseDisplayContainer}>
        <div style={styles.baseRow}>
          <span style={styles.baseLabel}>HEX</span>{" "}
          <span style={styles.baseValue}>{values.hex}</span>
        </div>
        <div style={styles.baseRow}>
          <span style={styles.baseLabel}>DEC</span>{" "}
          <span style={styles.baseValue}>{values.dec}</span>
        </div>
        <div style={styles.baseRow}>
          <span style={styles.baseLabel}>OCT</span>{" "}
          <span style={styles.baseValue}>{values.oct}</span>
        </div>
        <div style={styles.baseRow}>
          <span style={styles.baseLabel}>BIN</span>{" "}
          <span style={styles.baseValue}>{values.bin}</span>
        </div>
      </div>

      {/* Keypad */}
      <div style={styles.grid}>
        {buttons.map((btn) => (
          <button
            key={btn}
            onClick={() => handleBtnClick(btn)}
            style={{
              ...styles.button,
              ...(btn === "C" ? styles.clearButton : {}),
              ...(btn === "0" ? styles.zeroButton : {}),
            }}
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: { width: "100%" },
  baseDisplayContainer: {
    backgroundColor: "#1a1a1a",
    padding: "15px",
    borderRadius: "10px",
    marginBottom: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  baseRow: {
    display: "flex",
    justifyContent: "space-between",
    fontFamily: "monospace",
  },
  baseLabel: { color: "#00ffcc", fontWeight: "bold" },
  baseValue: { color: "#fff", wordBreak: "break-all" },
  grid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" },
  button: {
    padding: "15px",
    fontSize: "1.2rem",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#333",
    color: "#fff",
    cursor: "pointer",
  },
  clearButton: { backgroundColor: "#ff5555" },
  zeroButton: { gridColumn: "span 3" },
};

export default ProgrammerCalc;
