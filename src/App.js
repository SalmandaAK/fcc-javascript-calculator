import Container from 'react-bootstrap/Container';
import { useState } from 'react';
import calculate from './utility';

import './App.css';

function App() {
  const [input, setInput] = useState("");
  const [calcData, setCalcData] = useState("");
  const [nextIsFirstNumber, setNextIsFirstNumber] = useState(true);
  const [allowDecimal, setAllowDecimal] = useState(true);
  const [allowZero, setAllowZero] = useState(true);
  const [allowSwitchOperator, setAllowSwitchOperator] = useState(false);
  const [isSubtractAfterOperator, setIsSubtractAfterOperator] = useState(false);
  const [lastInputIsNumber, setLastInputIsNumber] = useState(true);
  const [isAfterCalculation, setIsAfterCalculation] = useState(false);

  function resetStateExceptAfterCalculation() {
    setNextIsFirstNumber(true);
    setAllowDecimal(true);
    setAllowZero(true);
    setAllowSwitchOperator(false);
    setIsSubtractAfterOperator(false);
    setLastInputIsNumber(true);
  }

  function handleInputNumber(e) {
    if (isAfterCalculation) {
      setCalcData("");
      setIsAfterCalculation(false);
    }
    if (isSubtractAfterOperator && nextIsFirstNumber) {
      setInput(i => i + e.target.value);
      setCalcData(cd => cd + e.target.value);
      setNextIsFirstNumber(false);
      setAllowDecimal(true);
      setAllowZero(true);
      setAllowSwitchOperator(false);
      setIsSubtractAfterOperator(false);
    } else if (nextIsFirstNumber) {
      setInput(e.target.value);
      setCalcData(cd => cd + e.target.value);
      setNextIsFirstNumber(false);
      setAllowDecimal(true);
      setAllowZero(true);
      setAllowSwitchOperator(false);
      //(!allowZero state is when zero is the first number)
    } else if (!allowZero) {
      setInput(e.target.value);
      setCalcData(cd => cd.slice(0, cd.length - 1) + e.target.value);
      setAllowZero(true);
    } else {
      setInput(i => i + e.target.value);
      setCalcData(cd => cd + e.target.value);
    }
    setLastInputIsNumber(true);
  }

  function handleInputZero(e) {
    if (!allowZero) {
      return;
    }
    if (isAfterCalculation) {
      setCalcData("");
      setIsAfterCalculation(false);
    }
    if (nextIsFirstNumber) {
      setInput(e.target.value);
      setNextIsFirstNumber(false);
      setAllowDecimal(true);
      setAllowZero(false);
      setAllowSwitchOperator(false);
      setIsSubtractAfterOperator(false);
    } else {
      setInput(i => i + e.target.value);
    }
    setCalcData(cd => cd + e.target.value);
    setLastInputIsNumber(true);
  }

  function handleInputDecimal(e) {
    if (!allowDecimal) {
      return;
    }
    if (isAfterCalculation) {
      setCalcData("");
      setIsAfterCalculation(false);
    }
    if (nextIsFirstNumber) {
      setInput("0" + e.target.value);
      setCalcData(cd => cd + "0" + e.target.value);
      setNextIsFirstNumber(false);
    } else {
      setInput(i => i + e.target.value);
      setCalcData(cd => cd + e.target.value);
    }
    setAllowDecimal(false);
    setAllowZero(true);
    setAllowSwitchOperator(false);
    setIsSubtractAfterOperator(false);
    setLastInputIsNumber(true);
  }

  function handleInputOperator(e) {
    if (calcData === "") {
      setCalcData("0" + e.target.value);
    } else if (isAfterCalculation) {
      setCalcData(input + e.target.value);
      setIsAfterCalculation(false);
    } else if (isSubtractAfterOperator) {
      setCalcData(cd => cd.slice(0, cd.length - 2) + e.target.value);
      setIsSubtractAfterOperator(false);
    } else if (allowSwitchOperator) {
      setCalcData(cd => cd.slice(0, cd.length - 1) + e.target.value);
    } else {
      setCalcData(cd => cd + e.target.value);
    }
    setInput(e.target.value);
    setNextIsFirstNumber(true);
    setAllowDecimal(true);
    setAllowZero(true);
    setAllowSwitchOperator(true);
    setLastInputIsNumber(false);
  }

  function handleInputSubtract(e) {
    if (isAfterCalculation) {
      setCalcData(input);
      setIsAfterCalculation(false);
    }
    if (isSubtractAfterOperator) {
      return;
    }
    if (allowSwitchOperator) {
      setIsSubtractAfterOperator(true);
    }
    setCalcData(cd => cd + e.target.value);
    setInput(e.target.value);
    setNextIsFirstNumber(true);
    setAllowDecimal(true);
    setAllowZero(true);
    setAllowSwitchOperator(true);
    setLastInputIsNumber(false);
  }

  function handleCalculate(e) {
    if (!lastInputIsNumber || calcData === "") {
      return
    }
    const calcResult = calculate(calcData);
    setCalcData(cd => cd + e.target.value + calcResult);
    setInput(calcResult);
    setIsAfterCalculation(true);
    resetStateExceptAfterCalculation();
  }

  function handleClear() {
    setInput("");
    setCalcData("");
    setIsAfterCalculation(false);
    resetStateExceptAfterCalculation();
  }

  return (
    <Container className="App-background">
      <div className="calculator-container bg-secondary bg-gradient bg-opacity-25 p-3 rounded">
        <div className="display-container bg-success bg-opacity-25 rounded text-end custom-font py-1 p-2">
          <div id="calculation-data" className="fs-6 text-dark">{calcData}</div>
          <div id="display" className="fs-4 text-dark">{input ? input : 0}</div>
        </div>
        <div className="buttons-wrapper pt-5">
          <button id="clear" onClick={handleClear} className="buttons text-bg-danger bg-opacity-75">AC</button>
          <button id="divide" onClick={handleInputOperator} className="buttons text-bg-secondary bg-opacity-75" value="/">/</button>
          <button id="multiply" onClick={handleInputOperator} className="buttons text-bg-secondary bg-opacity-75" value="×">×</button>
          <button id="seven" onClick={handleInputNumber} className="buttons text-bg-light bg-opacity-75" value="7">7</button>
          <button id="eight" onClick={handleInputNumber} className="buttons text-bg-light bg-opacity-75" value="8">8</button>
          <button id="nine" onClick={handleInputNumber} className="buttons text-bg-light bg-opacity-75" value="9">9</button>
          <button id="subtract" onClick={handleInputSubtract} className="buttons text-bg-secondary bg-opacity-75" value="-">-</button>
          <button id="four" onClick={handleInputNumber} className="buttons text-bg-light bg-opacity-75" value="4">4</button>
          <button id="five" onClick={handleInputNumber} className="buttons text-bg-light bg-opacity-75" value="5">5</button>
          <button id="six" onClick={handleInputNumber} className="buttons text-bg-light bg-opacity-75" value="6">6</button>
          <button id="add" onClick={handleInputOperator} className="buttons text-bg-secondary bg-opacity-75" value="+">+</button>
          <button id="one" onClick={handleInputNumber} className="buttons text-bg-light bg-opacity-75" value="1">1</button>
          <button id="two" onClick={handleInputNumber} className="buttons text-bg-light bg-opacity-75" value="2">2</button>
          <button id="three" onClick={handleInputNumber} className="buttons text-bg-light bg-opacity-75" value="3">3</button>
          <button id="equals" onClick={handleCalculate} className="buttons text-bg-primary bg-opacity-75" value="=">=</button>
          <button id="zero" onClick={handleInputZero} className="buttons text-bg-light bg-opacity-75" value="0">0</button>
          <button id="decimal" onClick={handleInputDecimal} className="buttons text-bg-light bg-opacity-75" value=".">.</button>
        </div>
      </div>
      <footer className="text-center mt-3"><a className="link-dark" href="https://github.com/SalmandaAK/fcc-javascript-calculator">View Code in GitHub</a></footer>
    </Container>
  );
}

export default App;
