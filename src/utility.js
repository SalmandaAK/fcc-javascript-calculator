export default function calculate(calcData) {
    let processedData = calcData
      .replaceAll("--", "+")
      .match(/(|-)\d+(\.\d+|)|×|\//g); //match positive numbers, negative numbers, decimal numbers, multiply symbol, and division symbol.

    while (/×|\//.test(processedData)) {
      let result;
      let index;
      if (/×/.test(processedData)) {
        index = processedData.indexOf("×");
        result = parseFloat(processedData[index - 1]) * parseFloat(processedData[index + 1]);
      } else {
        index = processedData.indexOf("/");
        result = parseFloat(processedData[index - 1]) / parseFloat(processedData[index + 1]);
      }
      processedData.splice(index - 1, 3, result);
    }

    const calcResult = processedData.reduce((accumulator, currentValue) => {
      return accumulator + parseFloat(currentValue)
    }, 0);
    
    return calcResult;
}