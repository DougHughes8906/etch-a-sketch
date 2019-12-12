
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
		container.appendChild(newCell);
	}
	
	return 0; 	
}



// the container that will hold the grid
const container = document.querySelector("#container");

// array that will hold each node of the grid
let gridNodes = [];

// length / width of grid by # of nodes (square grid)
const SIDE_LEN = 30;

// set max / min side-lengths for the program
const MIN_LEN = 1;
const MAX_LEN = 400;

createGrid(SIDE_LEN);
