
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
// grid
function addListeners() {
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
// add event listeners for each cell in the grid
addListeners();
