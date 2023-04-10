
let a  = null;
let b = null;
let result;
let screenDisplay = '';
let operator = '';
let deletedNumber;

const numberBtns = document.querySelectorAll('#number');
const screen = document.getElementById('screen');
const operateSigns = document.querySelectorAll('#operator');
const clearBtn = document.querySelector('#button-clear');
const deleteBtn = document.querySelector('#button-delete');


function addNumber() {
    return a + b;
}

function subtractNumber() {
    return a - b;
}

function divideNumber() {
    return (b === 0) ? "Your math sucks!" : a / b;
}

function multiplyNumber() {
    return a * b;
}


function UpdateOperate(operator) {
    if (operator === '+') {
        return addNumber();
    } else if (operator === '-') {
        return subtractNumber();
    } else if (operator === '*') {
        return multiplyNumber();
    } else if (operator === '/') {
        return divideNumber();
    }
}

// **** Clear the screen **** 
function clearScreen() {
   a  = null;
   b = null;
   result;
   screenDisplay = '';
   operator = '';
   operatorTwo = '';
   screen.innerText = '0';
}
clearBtn.addEventListener('click', clearScreen);

// **** Delete numbers **** 
function deleteScreen() {  
        screenDisplay = screenDisplay === '' ? result.toString() : screenDisplay;
        screenDisplay = screenDisplay.slice(0, screenDisplay.length - 1);
        screen.innerText = (screenDisplay !== '') ? screenDisplay : 0;
}

deleteBtn.addEventListener('click', deleteScreen);


function displayScreen(displayValue) {
    screenDisplay = screenDisplay + displayValue;
    screen.innerText = screenDisplay;
}


numberBtns.forEach(numberBtn => {
    numberBtn.addEventListener('click', (e) => {
    displayScreen(e.target.value.toString());
    console.log(e.target.value);
    });
});


operateSigns.forEach(operateSign => {
    operateSign.addEventListener('click', (e) => {
        if (a === null) {
            b = (e.target.value === '*' || e.target.value === '/') ? 1 : 0; // Avoid errors when multiply and divide by zero
            a = Number(screenDisplay);
            operator = e.target.value; 
            result = UpdateOperate(operator);
            screen.innerText = result.toString();
            screenDisplay = '';    
            
        } else {
            a = result;
            b = Number(screenDisplay);
            result = UpdateOperate(operator);
            screen.innerText = result.toString();
            operator = e.target.value; 
            b = '';
            screenDisplay = '';
        }
        
    })
});


function updateClocks() {
    // international timezone
  const clocks = document.getElementsByClassName("clock");
  for (let clock of clocks) {
    let timezone = clock.dataset.timezone;
    let time = new Date().toLocaleTimeString("en-US", {
      hour: '2-digit',
      minute:'2-digit',
      timeZone: timezone
    });
    clock.textContent = time;
  }
}
// Update every minute:
setInterval(updateClocks, 60000);
updateClocks();

