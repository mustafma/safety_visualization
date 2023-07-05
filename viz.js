// Set up the SVG container
const svgWidth = 1650 // Increase the SVG width as needed
const svgHeight = 1000; // Increase the SVG height as needed
const svg = d3.select("#svgContainer")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Define a banner as a rectangle with outlining with specific thickness that spans all along top of the screen
const banner = svg
    .append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", svgWidth)
    .attr("height", 50)
    .attr("fill", "white")
    .attr("stroke", "black")
    .attr("stroke-width", 2);

// Define a sidebar as a rectangle with outlining with specific thickness that spans all along left of the screen
const sidebar = svg
    .append("rect")
    .attr("x", 0)
    .attr("y", 50)
    .attr("width", 200)
    .attr("height", svgHeight - 50)
    .attr("fill", "white")
    .attr("stroke", "black")
    .attr("stroke-width", 2);

// Define the banner button labels
const bannerbuttonLabels = ["Robot", "HDS", "Motor", "LOGS"];

// Append buttons inside the banner
const bannerbuttonWidth = svgWidth / bannerbuttonLabels.length;
const bannerbuttonHeight = 40;

const buttons = svg.selectAll(".button")
  .data(bannerbuttonLabels)
  .enter()
  .append("g")
  .attr("class", "button")
  .attr("transform", (d, i) => `translate(${bannerbuttonWidth * i}, 5)`)
  .on("click", handleClick); // Add click event handler if needed

buttons
  .append("rect")
  .attr("width", bannerbuttonWidth)
  .attr("height", bannerbuttonHeight)
  .attr("fill", "lightgray")
  .attr("stroke", "black")
  .attr("stroke-width", 1);

buttons
  .append("text")
  .attr("x", bannerbuttonWidth / 2)
  .attr("y", bannerbuttonHeight / 2)
  .attr("text-anchor", "middle")
    // make the text be a little bit lower than the middle of the button
    .attr("dy", "0.35em")
  .text(d => d)
  .attr("font-size", 20);

// Click event handler for the buttons
function handleClick(d) {
  console.log(`Button "${d}" clicked`);
}

// Define the sidebar button labels
const sidebarbuttonLabels = ["Settings", "Specs Definition"];

// Append buttons inside the sidebar
const sidebarbuttonWidth = 200;
const sidebarbuttonHeight = (svgHeight - 50) / sidebarbuttonLabels.length;

const buttons2 = svg.selectAll(".button2") 
    .data(sidebarbuttonLabels)
    .enter()
    .append("g")
    .attr("class", "button2")
    .attr("transform", (d, i) => `translate(0, ${sidebarbuttonHeight * i + 50})`)
    .on("click", handleClick); // Add click event handler if needed

buttons2
    .append("rect")
    .attr("width", sidebarbuttonWidth)
    .attr("height", sidebarbuttonHeight)
    .attr("fill", "lightgray")
    .attr("stroke", "black")
    .attr("stroke-width", 1);

buttons2
    .append("text")
    .attr("x", sidebarbuttonWidth / 2)
    .attr("y", sidebarbuttonHeight / 2)
    .attr("text-anchor", "middle")
    // make the text be a little bit lower than the middle of the button
    .attr("dy", "0.35em")
    .text(d => d)
    .attr("font-size", 20);

// Click event handler for the buttons
function handleClick(d) {
    console.log(`Button "${d}" clicked`);
}


