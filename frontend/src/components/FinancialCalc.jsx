import { useState } from "react";

function FinancialCalc() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState(""); // Annual interest rate
  const [years, setYears] = useState("");
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(years);

    if (p && r && t) {
      const total = p * Math.pow(1 + r, t);
      const interest = total - p;
      setResult({
        total: total.toFixed(2),
        interest: interest.toFixed(2),
      });
    }
  };

  const handleClear = () => {
    setPrincipal("");
    setRate("");
    setYears("");
    setResult(null);
  };

  return (
    <div style={styles.container}>
      {/* Input Fields */}
      <div style={styles.inputGroup}>
        <label style={styles.label}>Principal Amount (Rs.)</label>
        <input
          type="number"
          style={styles.input}
          value={principal}
          onChange={(e) => setPrincipal(e.target.value)}
          placeholder="e.g. 5000"
        />
      </div>

      <div style={styles.inputGroup}>
        <label style={styles.label}>Annual Interest Rate (%)</label>
        <input
          type="number"
          style={styles.input}
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          placeholder="e.g. 5.5"
        />
      </div>

      <div style={styles.inputGroup}>
        <label style={styles.label}>Time (Years)</label>
        <input
          type="number"
          style={styles.input}
          value={years}
          onChange={(e) => setYears(e.target.value)}
          placeholder="e.g. 10"
        />
      </div>

      {/* Action Buttons */}
      <div style={styles.buttonRow}>
        <button
          style={{ ...styles.button, ...styles.clearBtn }}
          onClick={handleClear}
        >
          Clear
        </button>
        <button
          style={{ ...styles.button, ...styles.calcBtn }}
          onClick={handleCalculate}
        >
          Calculate
        </button>
      </div>

      {/* Results Display */}
      {result && (
        <div style={styles.resultBox}>
          <div style={styles.resultRow}>
            <span>Total Interest:</span>
            <span>Rs. {result.interest}</span>
          </div>
          <div style={styles.resultRow}>
            <span>Total Amount:</span>
            <span style={styles.finalAmount}>Rs. {result.total}</span>
          </div>
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
  inputGroup: { display: "flex", flexDirection: "column", gap: "5px" },
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
  buttonRow: { display: "flex", gap: "10px", marginTop: "10px" },
  button: {
    flex: 1,
    padding: "15px",
    border: "none",
    borderRadius: "8px",
    fontSize: "1.1rem",
    cursor: "pointer",
    color: "#fff",
  },
  calcBtn: { backgroundColor: "#00aa88" },
  clearBtn: { backgroundColor: "#ff5555" },
  resultBox: {
    marginTop: "15px",
    padding: "15px",
    backgroundColor: "#1a1a1a",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  resultRow: {
    display: "flex",
    justifyContent: "space-between",
    color: "#ccc",
    fontSize: "1.1rem",
  },
  finalAmount: { color: "#00ffcc", fontWeight: "bold", fontSize: "1.3rem" },
};

export default FinancialCalc;
