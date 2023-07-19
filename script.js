// Click event handler for the buttons
function handleClick(buttonLabel) {
  const visualisation = d3.select("#visualisation");

  if (buttonLabel === "Robot") {
    // Toggle visibility of the visualisation SVG
    const isHidden = visualisation.style("display") === "none";
    visualisation.style("display", isHidden ? "block" : "none");
  } else {
    // Handle other button clicks here
  }
}

// Hover function for the buttons to make them green
function handleMouseOver(button) {
  d3.select(button).style("background-color", "lightgreen");
}

function onMouseOut(button) {
  d3.select(button).style("background-color", "lightblue");
}

var RobotContainer = d3.select('#visualisation');

var HDSContainer = d3.select('#hdsContainer');
var videoElement = HDSContainer.select('#videoElement').node();

setInterval(function() {
  videoElement.src = "/stream?" + new Date().getTime();
}, 50);


// Constant ellipse parameters for radii
const ellipseRadiusX = 75;
const ellipseRadiusY = 40;

// Get the center coordinates of ellipse1 and ellipse2 based on the center of the RobotContainer svg
const ellipse1CenterX = RobotContainer.attr("width") / 2 - 200;
const ellipse1CenterY = RobotContainer.attr("height") / 2 - 200;
const ellipse2CenterX = RobotContainer.attr("width") / 2 + 200;
const ellipse2CenterY = RobotContainer.attr("height") / 2 - 200;

// Calculate the difference in coordinates between the ellipse centers
const xDiff = ellipse2CenterX - ellipse1CenterX;
const yDiff = ellipse2CenterY - ellipse1CenterY;

// Calculate control points for the curve based on ellipse positions and radii
const controlPoint1X = ellipse1CenterX + ellipseRadiusX;
const controlPoint1Y = ellipse1CenterY - yDiff / 2;

const controlPoint2X = ellipse2CenterX - ellipseRadiusX;
const controlPoint2Y = ellipse2CenterY - yDiff / 2;

// Add lightblue ellipse SVG in the middle of the screen, that is wider than it is tall
const ellipse1 = RobotContainer
  .append("ellipse")
  .attr("cx", ellipse1CenterX)
  .attr("cy", ellipse1CenterY)
  .attr("rx", ellipseRadiusX)
  .attr("ry", ellipseRadiusY)
  .attr("fill", "lightblue")
  .attr("stroke", "black")
  .attr("stroke-width", 1);

RobotContainer
  .append("text")
  .text("UV treatment")
  .attr("x", ellipse1CenterX)
  .attr("y", ellipse1CenterY)
  .attr("text-anchor", "middle")
  .attr("dominant-baseline", "central")
  .attr("font-size", 24);

// Add another ellipse at the same height as the first one, but to the right of it
const ellipse2 = RobotContainer
  .append("ellipse")
  .attr("cx", ellipse2CenterX)
  .attr("cy", ellipse2CenterY)
  .attr("rx", ellipseRadiusX)
  .attr("ry", ellipseRadiusY)
  .attr("fill", "lightblue")
  .attr("stroke", "black")
  .attr("stroke-width", 1);

RobotContainer
  .append("text")
  .text("UV stop")
  .attr("x", ellipse2CenterX)
  .attr("y", ellipse2CenterY)
  .attr("text-anchor", "middle")
  .attr("dominant-baseline", "central")
  .attr("font-size", 24);

// Add link between the two ellipses
const link = RobotContainer
  .append("line")
  .attr("x1", ellipse1CenterX + ellipseRadiusX)
  .attr("y1", ellipse1CenterY)
  .attr("x2", ellipse2CenterX - ellipseRadiusX)
  .attr("y2", ellipse2CenterY)
  .attr("stroke", "black")
  .attr("stroke-width", 1);

// Add label that lays along the link
const label = RobotContainer
  .append("text")
  .text("Restart")
  .attr("font-size", 24)
  .attr("text-anchor", "middle")
  .attr("dominant-baseline", "central")
  .attr("dy", "-0.5em"); // Adjust the vertical position of the label upwards

// Create a text path along the link using <textPath> element
const textPath = label
  .append("textPath")
  .attr("href", "#link") // Reference the link by its id
  .attr("startOffset", "50%") // Start the label at the middle of the link
  .text("Label");

// Add the link between the two ellipses
const linkStraight1 = RobotContainer
  .append("line")
  .attr("id", "link") // Give the link an id for referencing in textPath
  .attr("x1", ellipse1CenterX + ellipseRadiusX)
  .attr("y1", ellipse1CenterY)
  .attr("x2", ellipse2CenterX - ellipseRadiusX)
  .attr("y2", ellipse2CenterY)
  .attr("stroke", "black")
  .attr("stroke-width", 1);

// Update the label's position and orientation based on the link's slope
function updateLabelPosition() {
  const x1 = parseFloat(link.attr("x1"));
  const y1 = parseFloat(link.attr("y1"));
  const x2 = parseFloat(link.attr("x2"));
  const y2 = parseFloat(link.attr("y2"));

  const labelX = (x1 + x2) / 2; // Position the label at the middle of the link
  const labelY = (y1 + y2) / 2;

  const labelAngle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI); // Calculate the angle of the link

  label.attr("transform", `translate(${labelX}, ${labelY}) rotate(${labelAngle})`);
}

// Call the updateLabelPosition function initially and whenever the link positions change
updateLabelPosition();


// Add link that curves smoothly over the top of the ellipses, forming a half-circle
const curve = RobotContainer
  .append("path")
  .attr("d", `M ${ellipse1CenterX} ${ellipse1CenterY - ellipseRadiusY} A ${ellipseRadiusX} ${ellipseRadiusY} 0 0 1 ${ellipse2CenterX} ${ellipse2CenterY - ellipseRadiusY}`)
  .attr("fill", "none")
  .attr("stroke", "black")
  .attr("stroke-width", 1);

// Add label that is slightly above the curve
RobotContainer
  .append("text")
  .text("event 1")
  .attr("x", (ellipse1CenterX + ellipse2CenterX) / 2)
  .attr("y", ellipse1CenterY - ellipseRadiusY - xDiff/3.5)
  .attr("text-anchor", "middle")
  .attr("dominant-baseline", "bottom")
  .attr("font-size", 24);
