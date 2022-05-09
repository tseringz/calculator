// build my on fuction to evaluate expression 

function add (a, b) {

    return  a + b;

}

function subtract(a, b) {

    return a - b;
}

function multiply(a, b) {

    return  a * b;
}

function divide(a, b) {

    if ( b === 0 ) {

        return "Hi Dump!";
        
    }

    let num = a / b;

    if (Number.isInteger(num)) {

        return num;
    }

    else {

    return num.toFixed(3);
 }
    
}

function operate(operator, a, b) {

    if(operator === "+") {
        return add(a, b);
    }
    else if(operator === "-") {
       return  subtract(a, b);
    }
    else if(operator === "*") {

       return  multiply(a, b);

    }
    else if (operator === "/") {

       return  divide(a, b);

    }
    else if (operator === "=") {

        return a;
    }
}


function displayOnScreen() {

    let firstNumber = [];
    let secondNumber = [];
    let result = 0;
    let operator = "";
    let counter = 0;
    let dotCounter = 0;
    // selecting every html tag that will usable on the calculator function
    const screen = document.querySelector('.screen');
    const numberButtons = document.querySelectorAll('.number-wrapper > button');
    screen.innerText = "0";
    const buttonClear = document.querySelector('#button-clear');
    const buttonDelete = document.querySelector('#button-delete');

    // function to clear the screen when click on the clear button
    buttonClear.addEventListener('click', (e) => {

        firstNumber = [];
        secondNumber = [];
        result = 0;
        operator = "";
        counter = 0;
        screen.innerText = "0";

    });


    // walk through each butttons on the calculator accept clear and delete button
    numberButtons.forEach( element => {
         element.addEventListener('click', (e) => {

            if (e.target.value !== '+' && e.target.value !== '-' && e.target.value !== '=' &&
              e.target.value !== "*" && e.target.value !== '/') {

                 if (counter <= 0) {

                  firstNumber.push(e.target.value);
                  if(e.target.value === ".") {
                      dotCounter++;
                        if(dotCounter > 1)
                        {
                            firstNumber.pop();
                        }
                  }

                         screen.innerText = firstNumber.join("");

                   }

                  if(counter >= 1) {
                    
                   secondNumber.push(e.target.value);
                   screen.innerText = +secondNumber.join("");

                    }

        }

        if (e.target.value === "+" || e.target.value === "-" || e.target.value === "/" 
            || e.target.value === "=" || e.target.value === "*") {

                if (counter <= 0) {

                    if (e.target.value === '*' || e.target.value === '/') {

                        operator = e.target.value; 
                        secondNumber = [1];
                        result =  operate(operator, +firstNumber.join(""), +secondNumber.join(""));
                        screen.innerText = result; 
                        counter++;

                    }
                
                    else if (e.target.value === "=") {

                        result = 0;
                        
                    } 

                    else {

                        operator = e.target.value; 
                        result =  operate(operator, +firstNumber.join(""), +secondNumber.join(""));
                        screen.innerText = result; 
                        counter++;

                    }
                }
                
                if (counter >= 1) {

                        firstNumber = [result];
                        result =  operate(operator, +firstNumber.join(""), +secondNumber.join(""));
                        screen.innerText = result; 
                        operator = e.target.value;
                        secondNumber = [];

               }
         }
           

       });
            
   });

   // Function to delete the numbers when they click the delete button
    buttonDelete.addEventListener('click', (e) => {
   
    const numberDelete =  screen.innerText.split('');
                      numberDelete.pop();
                      screen.innerText = numberDelete.join("");
                      firstNumber = numberDelete;
                      result = numberDelete.join("");
                      console.log(numberDelete);

   });

}
displayOnScreen();


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
