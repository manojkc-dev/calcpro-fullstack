import ProgrammerCalc from "./components/ProgrammerCalc";
import FinancialCalc from "./components/FinancialCalc";
import ConverterCalc from "./components/ConverterCalc";

import { useState } from "react";
import {
  Calculator,
  FlaskConical,
  Code,
  Landmark,
  ArrowRightLeft,
} from "lucide-react";
import * as math from "mathjs";

function App() {
  // State to track which calculator is active
  const [activeMode, setActiveMode] = useState("Basic");

  // State for the actual calculator screen
  const [display, setDisplay] = useState("");

  const handleCalculate = () => {
    try {
      // 1. Use mathjs to evaluate the expression safely (handles scientific math like sin/cos)
      const result = math.evaluate(display);
      const finalResult = String(math.format(result, { precision: 14 }));

      // 2. Show the result on the calculator screen
      setDisplay(finalResult);

      // 3. Send the equation and result to the Django database
      fetch("http://127.0.0.1:8000/api/calculations/", {
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

  // The navigation menu items
  const modes = [
    { name: "Basic", icon: <Calculator size={20} /> },
    { name: "Scientific", icon: <FlaskConical size={20} /> },
    { name: "Programmer", icon: <Code size={20} /> },
    { name: "Financial", icon: <Landmark size={20} /> },
    { name: "Converter", icon: <ArrowRightLeft size={20} /> },
  ];

  return (
    <div style={styles.layout}>
      {/* SIDEBAR NAVIGATION */}
      <div style={styles.sidebar}>
        <h2 style={styles.logo}>CalcPro</h2>
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
            <span style={{ marginLeft: "10px" }}>{mode.name}</span>
          </button>
        ))}
      </div>

      {/* MAIN CALCULATOR AREA */}
      <div style={styles.main}>
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
      </div>
    </div>
  );
}

// Updated Styles for Sidebar + Main Area
const styles = {
  layout: {
    display: "flex",
    width: "100vw",
    height: "100vh",
    backgroundColor: "#121212",
    color: "#fff",
  },
  sidebar: {
    width: "250px",
    backgroundColor: "#1a1a1a",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    borderRight: "1px solid #333",
  },
  logo: {
    color: "#00ffcc",
    marginBottom: "20px",
  },
  navButton: {
    display: "flex",
    alignItems: "center",
    padding: "12px 15px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1rem",
    transition: "0.2s",
    textAlign: "left",
  },
  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "40px",
  },
  header: {
    width: "100%",
    maxWidth: "400px",
    marginBottom: "20px",
    color: "#888",
  },
  calculator: {
    width: "100%",
    maxWidth: "400px",
    backgroundColor: "#232323",
    padding: "20px",
    borderRadius: "20px",
    boxShadow: "0px 10px 30px rgba(0,0,0,0.5)",
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
  },
  sciButton: {
    padding: "10px",
    fontSize: "1rem",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#2a2a40",
    color: "#aaddff",
    cursor: "pointer",
  },
  clearButton: { backgroundColor: "#ff5555" },
  equalsButton: { backgroundColor: "#00aa88", gridColumn: "span 2" },
};

export default App;
