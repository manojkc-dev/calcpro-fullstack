import { useState } from "react"; // Fixed Line 1 warning
import ProgrammerCalc from "./components/ProgrammerCalc";
import FinancialCalc from "./components/FinancialCalc";
import ConverterCalc from "./components/ConverterCalc";
import {
  Calculator,
  FlaskConical,
  Code,
  Landmark,
  ArrowRightLeft,
} from "lucide-react";
import * as math from "mathjs";

function App() {
  const [activeMode, setActiveMode] = useState("Basic");
  const [display, setDisplay] = useState("");

  const handleCalculate = () => {
    try {
      const result = math.evaluate(display);
      const finalResult = String(math.format(result, { precision: 14 }));
      setDisplay(finalResult);

      // Fixed the typos on body and stringify here
      const API_BASE_URL =
        import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
      fetch(`${API_BASE_URL}/api/calculations/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          equation: display,
          result: finalResult,
        }),
      })
        .then((res) => res.json())
        .then((data) => console.log("Database save success:", data))
        .catch((err) => console.error("Database save error:", err));
    } catch (error) {
      console.error(error);
      setDisplay("Error");
    }
  };

  const handleButtonClick = (value) => {
    if (value === "C") setDisplay("");
    else if (value === "=") handleCalculate();
    else setDisplay(display + value);
  };

  const modes = [
    { name: "Basic", icon: <Calculator size={18} /> },
    { name: "Scientific", icon: <FlaskConical size={18} /> },
    { name: "Programmer", icon: <Code size={18} /> },
    { name: "Financial", icon: <Landmark size={18} /> },
    { name: "Converter", icon: <ArrowRightLeft size={18} /> },
  ];

  return (
    <div style={styles.layout}>
      {/* TOP NAVIGATION BAR */}
      <nav style={styles.navbar}>
        <h2 style={styles.logo}>CalcPro</h2>
        <div style={styles.navLinks}>
          {modes.map((mode) => (
            <button
              key={mode.name}
              onClick={() => setActiveMode(mode.name)}
              style={{
                ...styles.navButton,
                backgroundColor:
                  activeMode === mode.name ? "#333" : "transparent",
                color: activeMode === mode.name ? "#00ffcc" : "#aaa",
              }}
            >
              {mode.icon}
              <span style={{ marginLeft: "8px", display: "inline-block" }}>
                {mode.name}
              </span>
            </button>
          ))}
        </div>
      </nav>

      {/* MAIN CALCULATOR AREA */}
      <main style={styles.main}>
        <div style={styles.header}>
          <h3>{activeMode} Mode</h3>
        </div>

        <div style={styles.calculator}>
          {activeMode === "Programmer" ? (
            <ProgrammerCalc />
          ) : activeMode === "Financial" ? (
            <FinancialCalc />
          ) : activeMode === "Converter" ? (
            <ConverterCalc />
          ) : (
            <>
              <div style={styles.display}>{display || "0"}</div>
              <div style={styles.grid}>
                {activeMode === "Scientific" && (
                  <>
                    <button
                      style={styles.sciButton}
                      onClick={() => handleButtonClick("sin(")}
                    >
                      sin
                    </button>
                    <button
                      style={styles.sciButton}
                      onClick={() => handleButtonClick("cos(")}
                    >
                      cos
                    </button>
                    <button
                      style={styles.sciButton}
                      onClick={() => handleButtonClick("tan(")}
                    >
                      tan
                    </button>
                    <button
                      style={styles.sciButton}
                      onClick={() => handleButtonClick("sqrt(")}
                    >
                      √
                    </button>
                    <button
                      style={styles.sciButton}
                      onClick={() => handleButtonClick("^")}
                    >
                      x^y
                    </button>
                    <button
                      style={styles.sciButton}
                      onClick={() => handleButtonClick("pi")}
                    >
                      π
                    </button>
                    <button
                      style={styles.sciButton}
                      onClick={() => handleButtonClick("e")}
                    >
                      e
                    </button>
                    <button
                      style={styles.sciButton}
                      onClick={() => handleButtonClick("log(")}
                    >
                      log
                    </button>
                  </>
                )}

                {[
                  "C",
                  "(",
                  ")",
                  "/",
                  "7",
                  "8",
                  "9",
                  "*",
                  "4",
                  "5",
                  "6",
                  "-",
                  "1",
                  "2",
                  "3",
                  "+",
                  "0",
                  ".",
                  "=",
                ].map((btn) => (
                  <button
                    key={btn}
                    onClick={() => handleButtonClick(btn)}
                    style={{
                      ...styles.button,
                      ...(btn === "=" ? styles.equalsButton : {}),
                      ...(btn === "C" ? styles.clearButton : {}),
                    }}
                  >
                    {btn}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

const styles = {
  layout: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    width: "100%",
    maxWidth: "100vw", // Forces layout to not exceed screen width
    overflowX: "hidden", // Prevents the entire page from sliding side-to-side
    backgroundColor: "#121212",
    color: "#fff",
    boxSizing: "border-box",
  },
  navbar: {
    display: "flex",
    alignItems: "center",
    padding: "15px 20px",
    backgroundColor: "#1a1a1a",
    borderBottom: "1px solid #333",
    width: "100%", // Ensures navbar stays within layout bounds
    boxSizing: "border-box",
  },
  logo: {
    color: "#00ffcc",
    margin: "0 20px 0 0",
    fontSize: "1.3rem",
    fontWeight: "bold",
    flexShrink: 0,
  },
  navLinks: {
    display: "flex",
    gap: "8px",
    overflowX: "auto",
    scrollbarWidth: "none",
    msOverflowStyle: "none",
    flex: 1,
    paddingBottom: "2px",
    overscrollBehaviorX: "contain", // THIS stops the calculator from moving when you swipe!
  },
  navButton: {
    display: "flex",
    alignItems: "center",
    padding: "8px 12px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "0.9rem",
    whiteSpace: "nowrap",
    transition: "0.2s",
  },
  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    boxSizing: "border-box",
  },
  header: {
    width: "100%",
    maxWidth: "400px",
    marginBottom: "20px",
    color: "#888",
    textAlign: "center",
  },
  calculator: {
    width: "100%",
    maxWidth: "400px",
    backgroundColor: "#232323",
    padding: "20px",
    borderRadius: "20px",
    boxShadow: "0px 10px 30px rgba(0,0,0,0.5)",
    boxSizing: "border-box",
  },
  display: {
    backgroundColor: "#1a1a1a",
    color: "#00ffcc",
    fontSize: "2rem",
    textAlign: "right",
    padding: "15px",
    borderRadius: "10px",
    marginBottom: "20px",
    overflowX: "auto",
    minHeight: "40px",
    boxSizing: "border-box",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "8px",
  },
  button: {
    padding: "15px",
    fontSize: "1.2rem",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#333333",
    color: "#fff",
    cursor: "pointer",
    touchAction: "manipulation",
  },
  sciButton: {
    padding: "10px",
    fontSize: "1rem",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#2a2a40",
    color: "#aaddff",
    cursor: "pointer",
    touchAction: "manipulation",
  },
  clearButton: { backgroundColor: "#ff5555" },
  equalsButton: { backgroundColor: "#00aa88", gridColumn: "span 2" },
};

export default App;
