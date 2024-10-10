const resultInput = document.getElementById("result");
const buttons = Array.from(document.querySelectorAll(".btn"));

let currentInput = "";
let operator = null;
let displayOperator = null;
let firstOperand = null;

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.id === "clear") {
      currentInput = "";
      resultInput.value = "";
      firstOperand = null;
      operator = null;
    }  else if(button.id === 'delete')
        {
            currentInput = currentInput.slice(0, -1); // Remove the last character
            resultInput.value = currentInput; // Update the display
        } 
    
    else if (button.id === "equal") {
      if (firstOperand !== null && operator) {
        currentInput = operate(
          firstOperand,
          parseFloat(currentInput),
          operator
        );
        resultInput.value = currentInput;
        firstOperand = null;
        operator = null;
      }
    } else if (button.classList.contains("operator")) {
      if (currentInput !== "") {
        if (firstOperand === null) {
          firstOperand = parseFloat(currentInput);
        } else {
          // Calculate the intermediate result if the operator is pressed again
          currentInput = operate(
            firstOperand,
            parseFloat(currentInput),
            operator
          );
          resultInput.value = currentInput; // Show intermediate result
          firstOperand = currentInput; // Update firstOperand to the new result
        }
        operator = button.id;
        displayOperator = button.value;
        currentInput = ""; // Clear current input for the next number
        // Show the updated display
        resultInput.value += " " + displayOperator + " ";
      }
    } else {      
        
        currentInput += button.id;
        resultInput.value += button.id; // Append input to display
      
    }
  });
});

function operate(a, b, op) {
  switch (op) {
    case "add":
      return a + b;
    case "subtract":
      return a - b;
    case "multiply":
      return a * b;
    case "divide":
      return a / b;
    default:
      return b;
  }
}
