import "./App.css";
import React, { Component } from "react";

class App extends Component {
  state = {
    answer: "0",
    sum: "",
    preValue: null,
    currentNumber: "",
    operator: null,
  };

  handleAnswer = (element) => {
    this.setState((prevState) => {
      const { preValue, currentNumber, operator, answer } = prevState;

      const isNumber = !isNaN(element) || element === ".";
      if (isNumber) {
        return {
          currentNumber: currentNumber + element,
          answer: answer === "0" ? element : answer + element,
          sum: prevState.sum + element,
        };
      }

      if (element === "AC") {
        return {
          currentNumber: "",
          preValue: null,
          answer: "0",
          sum: "",
          operator: null,
        };
      }

      if (element === "=") {
        if (operator && preValue !== null && currentNumber !== "") {
          const result = this.calculate(
            operator,
            preValue,
            Number(currentNumber)
          );
          return {
            answer: result,
            preValue: result,
            currentNumber: "",
            operator: null,
          };
        }
        return prevState;
      }

      if (currentNumber !== "") {
        const newPreValue =
          preValue === null
            ? Number(currentNumber)
            : this.calculate(operator, preValue, Number(currentNumber));
        return {
          preValue: newPreValue,
          currentNumber: "",
          operator: element,
          answer: newPreValue,
          sum: prevState.sum + element,
        };
      }

      return { operator: element, sum: prevState.sum + element };
    });
  };

  calculate = (type, a, b) => {
    switch (type) {
      case "+":
        return a + b;
      case "-":
        return a - b;
      case "*":
        return a * b;
      case "/":
        return b !== 0 ? a / b : "Error";
      default:
        return b;
    }
  };

  render() {
    const { answer, sum } = this.state;
    const buttons = [
      "AC",
      "+/-",
      "%",
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
    ];
    return (
      <div className="app">
        <div className="flex">
          <div className="inner-flex">
            <h1 className="answer">{answer}</h1>
          </div>
        </div>
        <div className="inner-flex-1">
          <h1 className="answer">{sum}</h1>
        </div>
        <div className="buttons">
          {buttons.map((btn) => (
            <div key={btn} className={btn === "0" ? "zero" : ""}>
              <h1>
                <button
                  onClick={() => this.handleAnswer(btn)}
                  className={`button ${
                    btn === "0"
                      ? "zero"
                      : btn.match(/[/*\-+]/)
                      ? "yellow"
                      : btn.match(/[789456123]/)
                      ? "dark"
                      : ""
                  }`}
                >
                  {btn}
                </button>
              </h1>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;

// import "./App.css";
// import React, { useState } from "react";

// function App() {
//   const [answer, setAnswer] = useState("0");
//   const [sum, setSum] = useState("");
//   const [preValue, setPreValue] = useState(null);
//   const [currentNumber, setCurrentNumber] = useState("");
//   const [operator, setOperator] = useState(null);

//   const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."];

//   const calculate = (type, a, b) => {
//     switch (type) {
//       case "+":
//         return a + b;
//       case "-":
//         return a - b;
//       case "*":
//         return a * b;
//       case "/":
//         return b !== 0 ? a / b : "Error";
//       default:
//         return b;
//     }
//   };

//   const handleAnswer = (element) => {
//     if (element === "AC") {
//       setCurrentNumber("");
//       setPreValue(null);
//       setAnswer("0");
//       setSum("");
//       setOperator(null);
//       return;
//     }

//     if (element === "=") {
//       if (operator && preValue !== null && currentNumber !== "") {
//         const result = calculate(operator, preValue, Number(currentNumber));
//         setAnswer(result);
//         setPreValue(result);
//         setCurrentNumber("");
//         setOperator(null);
//       }
//       return;
//     }

//     if (numbers.includes(element)) {
//       setCurrentNumber((prev) => prev + element);
//       setAnswer((prev) => (prev === "0" ? element : prev + element));
//     } else {
//       if (currentNumber !== "") {
//         if (preValue === null) {
//           setPreValue(Number(currentNumber));
//         } else if (operator) {
//           const result = calculate(operator, preValue, Number(currentNumber));
//           setPreValue(result);
//           setAnswer(result);
//         }
//         setCurrentNumber("");
//       }
//       setOperator(element);
//     }
//     setSum((prev) => prev + element);
//   };

//   return (
//     <div className="app">
//       <div className="flex">
//         <div className="inner-flex">
//           <h1 className="answer">{answer}</h1>
//         </div>
//       </div>
//       <div className="inner-flex-1">
//         <h1 className="answer">{sum}</h1>
//       </div>
//       <div className="buttons">
//         <div>
//           <h1>
//             <button onClick={() => handleAnswer("AC")} className="button">
//               AC
//             </button>
//           </h1>
//         </div>
//         <div>
//           <h1>
//             <button onClick={() => handleAnswer("+/-")} className="button">
//               +/-
//             </button>
//           </h1>
//         </div>
//         <div>
//           <h1>
//             <button onClick={() => handleAnswer("%")} className="button">
//               %
//             </button>
//           </h1>
//         </div>
//         <div>
//           <h1>
//             <button onClick={() => handleAnswer("/")} className="button yellow">
//               /
//             </button>
//           </h1>
//         </div>
//         <div>
//           <h1>
//             <button onClick={() => handleAnswer("7")} className="button dark">
//               7
//             </button>
//           </h1>
//         </div>
//         <div>
//           <h1>
//             <button onClick={() => handleAnswer("8")} className="button dark">
//               8
//             </button>
//           </h1>
//         </div>
//         <div>
//           <h1>
//             <button onClick={() => handleAnswer("9")} className="button dark">
//               9
//             </button>
//           </h1>
//         </div>
//         <div>
//           <h1>
//             <button onClick={() => handleAnswer("*")} className="button yellow">
//               *
//             </button>
//           </h1>
//         </div>
//         <div>
//           <h1>
//             <button onClick={() => handleAnswer("4")} className="button dark">
//               4
//             </button>
//           </h1>
//         </div>
//         <div>
//           <h1>
//             <button onClick={() => handleAnswer("5")} className="button dark">
//               5
//             </button>
//           </h1>
//         </div>
//         <div>
//           <h1>
//             <button onClick={() => handleAnswer("6")} className="button dark">
//               6
//             </button>
//           </h1>
//         </div>
//         <div>
//           <h1>
//             <button onClick={() => handleAnswer("-")} className="button yellow">
//               -
//             </button>
//           </h1>
//         </div>
//         <div>
//           <h1>
//             <button onClick={() => handleAnswer("1")} className="button dark">
//               1
//             </button>
//           </h1>
//         </div>
//         <div>
//           <h1>
//             <button onClick={() => handleAnswer("2")} className="button dark">
//               2
//             </button>
//           </h1>
//         </div>
//         <div>
//           <h1>
//             <button onClick={() => handleAnswer("3")} className="button dark">
//               3
//             </button>
//           </h1>
//         </div>
//         <div>
//           <h1>
//             <button onClick={() => handleAnswer("+")} className="button yellow">
//               +
//             </button>
//           </h1>
//         </div>
//         <div>
//           <h1>
//             <button onClick={() => handleAnswer("0")} className="button">
//               0
//             </button>
//           </h1>
//         </div>
//         <div>
//           <h1>
//             <button onClick={() => handleAnswer(".")} className="button dark">
//               .
//             </button>
//           </h1>
//         </div>
//         <div>
//           <h1>
//             <button onClick={() => handleAnswer("=")} className="button">
//               =
//             </button>
//           </h1>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;

// import "./App.css";
// import React, { useState } from "react";

// function App() {
//   const [answer, setAnswer] = useState("0");
//   const [sum, setSum] = useState("");
//   const [preValue, setPreValue] = useState(0);
//   const [currentNumber, setcurrentNumber] = useState("");
//   let numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."];

//   const Cal = function (type, a, b) {
//     if (type === "+") {
//       console.log(a + b);
//       return a + b;
//     } else if (type === "-") {
//       console.log(type, a, b);
//       console.log(a - b);
//       return a - b;
//     } else if (type === "*") {
//       console.log(a * b);
//       return a * b;
//     } else if (type === "/") {
//       return a / b;
//     } else {
//       return a / 100;
//     }
//   };

//   const handleAnswer = function (element) {
//     setSum((pre) => !(pre === "=") && pre + element);
//     if (element === "AC") {
//       setcurrentNumber("");
//       setPreValue(0);
//       setAnswer("0");
//       setSum("0");
//       return 0;
//     }
//     if (element === "=") {
//       setAnswer(preValue);
//       setcurrentNumber("");
//       setPreValue(0);
//       return 1;
//     }

//     const exists = numbers.includes(element);
//     if (exists) {
//       setcurrentNumber((pre) => pre + element);
//     } else {
//       calVal(currentNumber, element);
//     }
//   };

//   const calVal = async function (currentNumber, element) {
//     const val = Cal(element, preValue, Number(currentNumber));
//     setPreValue(val);
//     setcurrentNumber("0");
//   };

//   return (
//     <div className="app">
//       <div className="flex">
//         <div className="inner-flex">
//           <h1 className="answer">{answer}</h1>
//         </div>
//       </div>
//       <div className="inner-flex-1">
//         <h1 className="answer">{sum}</h1>
//       </div>
//       {/* prettier-ignore */}
//       <div className="buttons">
//         <div className=""><h1><button onClick={() => handleAnswer('AC')} className="button">AC</button></h1></div>
//         <div className=""><h1><button onClick={() => handleAnswer('N')}className="button">+/-</button></h1></div>
//         <div className=""><h1><button onClick={() => handleAnswer('%')} className="button">%</button></h1></div>
//         <div className=""><h1><button onClick={() => handleAnswer('/')} className="button yellow">/</button></h1></div>
//         <div className=""><h1><button onClick={() => handleAnswer('7')} className="button dark">7</button></h1></div>
//         <div className=""><h1><button onClick={() => handleAnswer('8')} className="button dark">8</button></h1></div>
//         <div className=""><h1><button onClick={() => handleAnswer('9')} className="button dark">9</button></h1></div>
//         <div className=""><h1><button onClick={() => handleAnswer('*')} className="button yellow">*</button></h1></div>
//         <div className=""><h1><button onClick={() => handleAnswer('4')} className="button dark">4</button></h1></div>
//         <div className=""><h1><button onClick={() => handleAnswer('5')} className="button dark">5</button></h1></div>
//         <div className=""><h1><button onClick={() => handleAnswer('6')} className="button dark">6</button></h1></div>
//         <div className=""><h1><button onClick={() => handleAnswer('-')} className="button yellow">-</button></h1></div>
//         <div className=""><h1><button onClick={() => handleAnswer('1')} className="button dark">1</button></h1></div>
//         <div className=""><h1><button onClick={() => handleAnswer('2')} className="button dark">2</button></h1></div>
//         <div className=""><h1><button onClick={() => handleAnswer('3')} className="button dark">3</button></h1></div>
//         <div className=""><h1><button onClick={() => handleAnswer('+')} className="button yellow">+</button></h1></div>
//         <div className=""><h1><button onClick={() => handleAnswer('0')} className="button">0</button></h1></div>
//         <div className=""><h1><button onClick={() => handleAnswer('.')} className="button dark">.</button></h1></div>
//         <div className=""><h1><button onClick={() => handleAnswer('=')} className="button">=</button></h1></div>
//       </div>
//     </div>
//   );
// }

// export default App;
