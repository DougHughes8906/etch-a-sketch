
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
		gridNodes[i].addEventListener("mouseover", function() { darken(i); });
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
		gridNodes[i].addEventListener("mouseover", function() { randColor(i); });
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
		for (let i = 0; i < gridNodes.length; i++)
		{
			gridNodes[i].removeEventListener("mouseover", function() { darken(i); });
		}
	}
	else
	{
		for (let i = 0; i < gridNodes.length; i++)
		{
			gridNodes[i].removeEventListener("mouseover", 
				function() { randColor(i); });
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

// the container that will hold the grid
const container = document.querySelector("#container");

// array that will hold each node of the grid
let gridNodes = [];
// array that holds a value from 0 to 10 representing the corresponding
// "black" value of the same node index (in the gridNodes array)
// ex. value of 10 represents 100% black and 4 represents 40% black
let nodeDarkness = [];

// length / width of grid by # of nodes (square grid)
const SIDE_LEN = 70;

// set max / min side-lengths for the program
const MIN_LEN = 1;
const MAX_LEN = 400;

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


