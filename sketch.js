
// create a grid with the given side length as a paramter. The side
// length represents the number of nodes in the grid per side. The 
// grid is set up as a square grid. Returns 0 if the grid was 
// successfully set up and returns -1 if not (the requested side length
// was not within the MIN_LEN and MAX_LEN constants)

function createGrid(sideLength) {
	// make sure side length is within min / max
	if (sideLength < MIN_LEN || sideLength > MAX_LEN)
	{
		return -1;
	}

	// build the attribute string that will be used to set the # of rows
	// and columns in the grid	
	let sideAttStr = "";
	for (let i = 0; i < sideLength - 1; i++)
	{
		sideAttStr += "1fr ";	
	}
	sideAttStr += "1fr;";

	// set the full row / column attribute strings for the grid
	const rowsAtt = "grid-template-rows: " + sideAttStr;
	const colsAtt = "grid-template-columns: " + sideAttStr;
	// update the attributes for the grid container
	container.setAttribute("style", rowsAtt);
	container.setAttribute("style", colsAtt);

	// create each of the grid cells and add to the grid
	const numCells = sideLength * sideLength;
	for (let i = 0; i < numCells; i++)
	{
		let newCell = document.createElement("DIV");
		newCell.classList.add("cell");
		gridNodes.push(newCell);
		// note the initial darkness for each cell as 0 (white)
		nodeDarkness.push(0);
		// add the cell to the grid container			
		container.appendChild(newCell);
	}
	
	return 0; 	
}



// adds the darkening event listeners for every node in the 
// grid (black and white color scheme)
function addBWListeners() {
	for (let i = 0; i < gridNodes.length; i++)
	{
		handlers.push(function() { darken(i); });
		gridNodes[i].addEventListener("mouseover", handlers[i]);
	}
}

// darkens the specified node by 10%. The node is specified
// by its index in the gridNodes array. If the node is already
// 100% black, then nothing is done.
function darken(index) {
	if (nodeDarkness[index] < MAX_DARK)
	{
		nodeDarkness[index]++;	
		let percent = (MAX_DARK - nodeDarkness[index]) * 10;
		percent = percent.toString();
		percent += "%";	
		let attString = "background-color: rgb(" + percent + ", " + percent + ", "
			+ percent + ");";
		gridNodes[index].setAttribute("style", attString);	
	}	
}

// adds the random color event listeners for every node in the grid
// (the rainbow color scheme)
function addRBListeners() {
	for (let i = 0; i < gridNodes.length; i++)
	{
		handlers.push(function() { randColor(i); });
		gridNodes[i].addEventListener("mouseover", handlers[i]);
	}
}

// Generates a random background color for the specified node. The node
// is specified by its index in the gridNodes array.
function randColor(index) {
	// build up the string that will be used to update the node's 
	// background-color attribute
	let attString = "background-color: rgb(";
	let percent = Math.floor(Math.random() * 101);
	percent = percent.toString() + "%";
	attString += percent + ", ";
	
	percent = Math.floor(Math.random() * 101);
	percent = percent.toString() + "%";
	attString += percent + ", ";

	percent = Math.floor(Math.random() * 101);
	percent = percent.toString() + "%";
	attString += percent + ");";

	gridNodes[index].setAttribute("style", attString);
}

// clears all event listeners for the nodes in the gridNodes
// array
function clearListeners() {
	if (isBandW)
	{
		for (let i = gridNodes.length - 1; i >=  0; i--)
		{
			gridNodes[i].removeEventListener("mouseover", handlers[i]);
			handlers.pop();
		}
	}
	else
	{	
		for (let i = gridNodes.length - 1; i >= 0; i--)
		{
			gridNodes[i].removeEventListener("mouseover", handlers[i]);
			handlers.pop();	
		}
	}
} 

// resets the background-color of every node in the gridNodes array
// to white
function resetWhite() {
	const whiteAtt = "background-color: rgb(100%, 100%, 100%);";
	for (let i = 0; i < gridNodes.length; i++)
	{
		gridNodes[i].setAttribute("style", whiteAtt);
		nodeDarkness[i] = 0;
	}	
}

// outputs an error message indicating the # of cells entered (for the
// # of cells per side) is not valid
function outputError() {
	const errorMsg = `Error: must enter an integer value between ${MIN_LEN}` +
		` and ${MAX_LEN}.`;
	errorBar.textContent = errorMsg;
}

// clears the current error message (if any)
function clearError() {
	errorBar.textContent = "";
}

// deletes all of the current nodes in the grid (i.e. nodes within 
// the gridNodes array)
function deleteNodes() {
	for (let i = gridNodes.length - 1; i >= 0; i--)
	{
		gridNodes[i].parentNode.removeChild(gridNodes[i]);
		gridNodes.pop();
	}
}

// the container that will hold the grid
const container = document.querySelector("#container");

// array that will hold each node of the grid
let gridNodes = [];
// array that holds a value from 0 to 10 representing the corresponding
// "black" value of the same node index (in the gridNodes array)
// ex. value of 10 represents 100% black and 4 represents 40% black
let nodeDarkness = [];
// an array that holds the event handler function objects for each
// of the nodes
let handlers = [];

// length / width of grid by # of nodes (square grid)
const SIDE_LEN = 70;

// set max / min side-lengths for the program
const MIN_LEN = 1;
const MAX_LEN = 100;

// represent the minimum and maximum darkness values in the nodeDarkness array
const MIN_DARK = 0;
const MAX_DARK = 10;

createGrid(SIDE_LEN);
// add event listeners for each cell in the grid (black and white)
addBWListeners();

// holds true if the current color scheme is black and white and false
// otherwise
let isBandW = true;

// add event listeners for each of the color scheme buttons
const bAndWBtn = document.querySelector("#BandW");
const rainbowBtn = document.querySelector("#Rainbow");

bAndWBtn.addEventListener("click", function() { 
	if (!isBandW)
	{	
		clearListeners();
		resetWhite();
		addBWListeners();
		isBandW = true;
	}
});

rainbowBtn.addEventListener("click", function() {
	if (isBandW)
	{
		clearListeners();
		resetWhite();
		addRBListeners();
		isBandW = false;
	}
});

// text bar that is used to enter in a # of nodes for each side
// of the grid
const inputBar = document.querySelector("input");

// paragraph element that is used to display error messages
const errorBar = document.querySelector("#errorMsg");

// add event listener for the reset button. This button is supposed
// to reset the side length (i.e. # of nodes per side) of the grid
// based on the value in the text box
const resetBtn = document.querySelector("#reset");
resetBtn.addEventListener("click", function() {
	// get the value in the text bar
	let newSideLen = inputBar.value;
	// make sure value entered is a number
	if (isNaN(newSideLen))
	{
		outputError();
	}
	else
	{
		// make sure the number entered is an integer and within the
		// valid range
		newSideLen = +newSideLen;
		if (!(Number.isInteger(newSideLen)) || newSideLen < MIN_LEN ||
			newSideLen > MAX_LEN)
		{
			outputError();
		}
		
		// integer has been entered within the valid range	
		else
		{
			// clear out previous error (if there was one)
			clearError();
			clearListeners();
			deleteNodes();
			createGrid(newSideLen);
			if (isBandW)
			{
				addBWListeners();
			}
			else
			{
				addRBListeners();
			}
		}
	}
});
