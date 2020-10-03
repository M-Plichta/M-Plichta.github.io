//Main algorithm cavas
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

//Canvas to display the chosen colour
var canvasColour = document.getElementById("startColour");
var canvasColourContext = canvasColour.getContext("2d");

//Declaring all the sliders and displaying their value
var gridNum = document.getElementById("gridRange");
var gridNumOutput = document.getElementById("gridNumValue");
gridNumOutput.innerHTML = gridNum.value + "x" + gridNum.value;

var colourNum = document.getElementById("colourRange");
var colourNumOutput = document.getElementById("colourRangeValue");
colourNumOutput.innerHTML = colourNum.value;

var speedNum = document.getElementById("speed");
var speedOutput = document.getElementById("speedValue");
showSpeed();


var replacementColour = document.querySelector('input[name="colourPicker"]:checked').value;

//Test output DELETE:
var consoleOut = document.getElementById("console");

var mousePos;
var selectedColour = null;
var selectedSquareX = null;
var selectedSquareY = null;
let colourMap = [];
var errorMessage = "";
var errorOut = document.getElementById("er_message");

// Update the current slider value (each time you drag the slider handle)
gridNum.oninput = function () {
    gridNumOutput.innerHTML = this.value + "x" + this.value;
    boxLength = c.width / gridNum.value;
    ctx.clearRect(0, 0, c.width, c.height);
    makeGrid();

    //Resetting values, because the grid has changed
    resetValues();
}

colourNum.oninput = function () {
    colourNumOutput.innerHTML = this.value;
}

speedNum.oninput = function () {
    showSpeed();
}

function setReplacementColour() {
    replacementColour = document.querySelector('input[name="colourPicker"]:checked').value;
}

function showSpeed() {
    if (speedNum.value == 0) {
        speedOutput.innerHTML = 'Instant';
    } else if (speedNum.value == 1) {
        speedOutput.innerHTML = 'Medium';
    } else if (speedNum.value == 2) {
        speedOutput.innerHTML = 'Slow';
    }
}

function resetValues() {
    makeGrid();
    colourMap = [];

    selectedColour = null;
    selectedSquareX = null;
    selectedSquareY = null;

    canvasColourContext.beginPath();
    canvasColourContext.fillStyle = "white";
    canvasColourContext.fillRect(0, 0, canvasColour.width, canvasColour.height);
    canvasColourContext.stroke();
}

c.onclick = function () {
    for (var i = 0; i < gridNum.value; i++) {
        for (var x = 0; x < gridNum.value; x++) {
            relativeX = x * boxLength;
            relativeY = i * boxLength;

            if (mousePos.x > relativeX && mousePos.x < relativeX + boxLength && mousePos.y > relativeY && mousePos.y < relativeY + boxLength) {
                if (selectedColour == null) {
                    //Selects first square
                    ctx.beginPath();
                    ctx.lineWidth = "4";
                    ctx.strokeStyle = "red";
                    ctx.rect(relativeX, relativeY, boxLength, boxLength);
                    ctx.stroke();

                    selectedSquareX = x;
                    selectedSquareY = i;

                    updateColourCanvas(colourMap[(x * gridNum.value) + i])

                    //Sets the value of the selected square
                    selectedColour = colourMap[(x * gridNum.value) + i];
                } else {
                    //Removes the previously selected square
                    ctx.beginPath();
                    ctx.lineWidth = "4";
                    ctx.strokeStyle = "black";
                    ctx.rect(selectedSquareX * boxLength, selectedSquareY * boxLength, boxLength, boxLength);
                    ctx.stroke();

                    selectedSquareX = x;
                    selectedSquareY = i;

                    //Selects the new square
                    ctx.beginPath();
                    ctx.lineWidth = "4";
                    ctx.strokeStyle = "red";
                    ctx.rect(relativeX, relativeY, boxLength, boxLength);
                    ctx.stroke();

                    updateColourCanvas(colourMap[(x * gridNum.value) + i])

                    //Sets the value of the selected square
                    selectedColour = colourMap[(x * gridNum.value) + i];
                }
            }
        }
    }
}

function generateCanvas() {
    resetValues();
    var num = colourNum.value;
    //Creating a 2D array, first dimension stores multiple arrays, and those store the colour. 
    var colour = new Array(num);
    for (var i = 0; i < num; i++) {
        colour[i] = randomColour();
    }

    //Makes sure the the colours are not too similar
    //A user-friendly feature so that the algorithm can be displayed clearly.
    for (var i = 0; i < num; i++) {
        if (i + 1 != num) {
            if (Math.abs(colour[i][0] - colour[i + 1][0]) < 150) {
                colour[i][0] = 255;
                colour[i + 1][0] = 0;
            } else if (Math.abs(colour[i][1] - colour[i + 1][1]) < 150) {
                colour[i][1] = 255;
                colour[i + 1][1] = 0;
            } else if (Math.abs(colour[i][2] - colour[i + 1][2]) < 150) {
                colour[i][2] = 255;
                colour[i + 1][2] = 0;
            }
        }
    }

    for (var x = 0; x < c.width; x = x + boxLength) {
        for (var y = 0; y < c.height; y = y + boxLength) {
            var i = Math.floor(Math.random() * num);
            ctx.beginPath();
            ctx.fillStyle = 'rgb(' + colour[i][0] + ', ' + colour[i][1] + ', ' + colour[i][2] + ')';
            ctx.fillRect(x + 2, y + 2, boxLength - 4, boxLength - 4);
            ctx.stroke();

            colourMap.push('rgb(' + colour[i][0] + ', ' + colour[i][1] + ', ' + colour[i][2] + ')');
        }
    }

}


// Function returns and array of three numbers from 0-255, representing a colour
function randomColour() {
    var arr = new Array(3);
    for (var j = 0; j < 3; j++) {
        arr[j] = Math.floor(Math.random() * 256);
    }

    return arr;
}

function updateColourCanvas(col) {

    //Fill in the smaller canvas with the selected colour 
    canvasColourContext.beginPath();
    canvasColourContext.fillStyle = col;
    canvasColourContext.fillRect(0, 0, canvasColour.width, canvasColour.height);
    canvasColourContext.stroke();
}

function getMousePos(c, evt) {
    var rect = c.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function makeGrid() {

    for (var x = 0; x < c.width + 1; x = x + boxLength) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, c.width);
        ctx.lineWidth = 4;
        ctx.strokeStyle = "black";
        ctx.stroke();
    }

    for (var x = 0; x < c.width + 1; x = x + boxLength) {
        ctx.beginPath();
        ctx.moveTo(0, x);
        ctx.lineTo(c.width, x);
        ctx.lineWidth = 4;
        ctx.strokeStyle = "black";
        ctx.stroke();
    }
}

c.addEventListener('mousemove', function (evt) {
    mousePos = getMousePos(c, evt);
}, false);

function floodFillValidation() {
    errorMessage = "";

    if (selectedSquareX == null || selectedSquareY == null || selectedColour == null) {
        errorMessage = "Select the target colour first <br>(Left click on a square on the grid)";
    }

    if (colourMap.length == 0) {
        errorMessage = "Generate the grid first before running the algorithm <br>(by selecting the desired paramiters and clicking 'Run Algorithm' button)";
    }

    if (errorMessage == "") {
        errorOut.innerHTML = "";

        floodFill(selectedSquareX, selectedSquareY, selectedColour, replacementColour);

        //Updates the changed square
        updateColourCanvas(replacementColour);
        selectedColour = replacementColour;
    } else {
        errorOut.innerHTML = errorMessage;
    }
}

async function floodFill(nodeX, nodeY, target, replacement) {

    if (nodeY < 0 || nodeY >= gridNum.value) { return; }
    if (nodeX < 0 || nodeX >= gridNum.value) { return; }
    if (getColour(nodeX, nodeY) != target) { return; }

    setColour(nodeX, nodeY, replacement);
    await sleep(1000 * speedNum.value);

    floodFill(nodeX, nodeY - 1, target, replacement);
    floodFill(nodeX, nodeY + 1, target, replacement);
    floodFill(nodeX - 1, nodeY, target, replacement);
    floodFill(nodeX + 1, nodeY, target, replacement);

    return;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getColour(destX, destY) {
    return colourMap[destX * gridNum.value + destY];
}

function setColour(destX, destY, col) {
    colourMap[destX * gridNum.value + destY] = col;

    ctx.beginPath();
    ctx.fillStyle = col;
    ctx.fillRect(destX * boxLength + 2, destY * boxLength + 2, boxLength - 4, boxLength - 4);
    ctx.stroke();
}

//Sort of main...
boxLength = c.width / gridNum.value;
makeGrid();
generateCanvas();