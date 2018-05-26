let numOfSquares = 6;
let colours = [];
let goalColour;

let htmlBodyBgColour = window.getComputedStyle(document.body).backgroundColor;
let htmlGoalColourDisplay = document.querySelector("#goalColourDisplay");
let htmlH1 = document.querySelector("h1");
let htmlResult = document.querySelector("#result");
let htmlSquares = document.querySelectorAll(".square");
let htmlResetButton = document.querySelector("#reset");
let htmlGameModeButtons = document.querySelectorAll(".gameMode");

init();

function init() {
    //gameMode button ELs
    createButtonListeners();
    //square ELs
    createSquareListeners();
    //reset page to defaults
    reset();
}

function createButtonListeners() {
    for (let i = 0; i < htmlGameModeButtons.length; i++) {
        htmlGameModeButtons[i].addEventListener("click", function() {
            //remove class from all buttons
            for (let j = 0; j < htmlGameModeButtons.length; j++) {
                htmlGameModeButtons[j].classList.remove("selected");
            }
            //apply class to clicked button
            this.classList.add("selected");
            this.textContent === "Easy"
                ? (numOfSquares = 3)
                : (numOfSquares = 6);
            reset();
        });
    }
}

function createSquareListeners() {
    for (let i = 0; i < htmlSquares.length; i++) {
        //add click listeners
        htmlSquares[i].addEventListener("click", function() {
            //get colour of clicked square
            let currentColour = this.style.backgroundColor;
            if (currentColour === goalColour) {
                htmlResult.textContent = "Correct!";
                changeColours(currentColour);
                htmlResetButton.textContent = "Play Again?";
                htmlH1.style.backgroundColor = currentColour;
            } else {
                //make square 'disappear' by matching background colour
                this.style.backgroundColor = htmlBodyBgColour;
                htmlResult.textContent = "Try again";
            }
        });
    }
}

function reset() {
    colours = generateRandomColours(numOfSquares);
    goalColour = generateGoalColour();
    htmlGoalColourDisplay.textContent = goalColour;
    htmlResult.textContent = "";

    //reset button can be set to 'play again' when winning, so change the button's text to 'New Colours'
    htmlResetButton.textContent = "New Colours";

    for (let i = 0; i < htmlSquares.length; i++) {
        //assign colours to each square
        if (colours[i]) {
            //make everything visibile first
            htmlSquares[i].style.display = "block";
            htmlSquares[i].style.backgroundColor = colours[i];
        } else {
            //set display:none for any square without a colour
            htmlSquares[i].style.display = "none";
        }
    }
    htmlH1.style.backgroundColor = "steelblue";
}

//generates a new set of colours, picks a goal colour and updates the goalDisplay span
htmlResetButton.addEventListener("click", function() {
    reset();
});

//changes all htmlSquares to match the goal colour when you win
function changeColours(colour) {
    for (let i = 0; i < htmlSquares.length; i++) {
        htmlSquares[i].style.backgroundColor = colour;
    }
}

//returns a random colour from the colours array
function generateGoalColour() {
    //random number between 0 and the colours array length
    let rnd = Math.floor(Math.random() * colours.length);
    return colours[rnd];
}

//generate random number of colours specified by arg
//returns an array of colours from the randomColour fn
function generateRandomColours(num) {
    var arr = [];
    for (let i = 0; i < num; i++) {
        arr.push(randomColour());
    }
    return arr;
}

//generate a random colour for the generateRandomColours fn
function randomColour() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return "rgb(" + r + ", " + g + ", " + b + ")";
}
