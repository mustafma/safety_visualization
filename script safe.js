// Set up the SVG container
const svgWidth = 1520; // Increase the SVG width as needed
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
  .attr("fill", "#f5e9dc")
  .attr("stroke", "black")
  .attr("stroke-width", 0);

// Define a sidebar as a rectangle with outlining with specific thickness that spans all along left of the screen
const sidebar = svg
  .append("rect")
  .attr("x", 0)
  .attr("y", 50)
  .attr("width", 200)
  .attr("height", svgHeight - 50)
  .attr("fill", "#f5e9dc")
  .attr("stroke", "black")
  .attr("stroke-width", 0);

// Define the button labels
const bannerButtonLabels = ["Robot", "HDS", "Motor", "LOGS"];
const sidebarButtonLabels = ["Settings", "Specs Definition"];

// Append buttons inside the banner
const bannerButtonWidth = svgWidth / bannerButtonLabels.length;
const bannerButtonHeight = 40;

const bannerButtons = svg.selectAll(".banner-button")
  .data(bannerButtonLabels)
  .enter()
  .append("g")
  .attr("class", "banner-button")
  .attr("transform", (d, i) => `translate(${bannerButtonWidth * i}, 5)`);

bannerButtons
  .append("rect")
  .attr("width", bannerButtonWidth)
  .attr("height", bannerButtonHeight)
  .attr("fill", "lightpink")
  .attr("stroke", "black")
  .attr("stroke-width", 1)
  .on("click", handleClick); // Move the click event handler here

bannerButtons
  .append("text")
  .attr("x", bannerButtonWidth / 2)
  .attr("y", bannerButtonHeight / 2)
  .attr("text-anchor", "middle")
  .attr("dy", "0.35em")
  .text(d => d)
  .attr("font-size", 20);

// Append buttons inside the sidebar
const sidebarButtonWidth = 180;
const sidebarButtonHeight = 40;
const sidebarButtonMargin = 10;

const sidebarButtons = svg.selectAll(".sidebar-button")
  .data(sidebarButtonLabels)
  .enter()
  .append("g")
  .attr("class", "sidebar-button")
  .attr("transform", (d, i) => `translate(10, ${50 + sidebarButtonMargin + (sidebarButtonHeight + sidebarButtonMargin) * i})`)
  .on("click", handleClick); // Add click event handler if needed

sidebarButtons
  .append("rect")
  .attr("width", sidebarButtonWidth)
  .attr("height", sidebarButtonHeight)
  .attr("fill", "lightpink")
  .attr("stroke", "black")
  .attr("stroke-width", 1);

// Add hover effect to the sidebarbuttons
sidebarButtons
  .on("mouseover", function() {
    d3.select(this).select("rect").attr("fill", "lightgreen");
  })
  .on("mouseout", function() {
    d3.select(this).select("rect").attr("fill", "lightpink");
  });

// Add hover effect to the bannerbuttons
bannerButtons
  .on("mouseover", function() {
    d3.select(this).select("rect").attr("fill", "lightgreen");
  })
  .on("mouseout", function() {
    d3.select(this).select("rect").attr("fill", "lightpink");
  });

sidebarButtons
  .append("text")
  .attr("x", sidebarButtonWidth / 2)
  .attr("y", sidebarButtonHeight / 2)
  .attr("text-anchor", "middle")
  .attr("dy", "0.35em")
  .text(d => d)
  .attr("font-size", 20);

// Click event handler for the buttons
function handleClick(d) {
  // Hide all the SVGs
  if (d === "Robot") {
    // Show the elliptical SVGs
    d3.selectAll(".elliptical-svg").style("display", "block");
  } else {
    // Handle other button clicks here
  }
}

// Constant ellipse parameters for radii
const ellipseRadiusX = 100;
const ellipseRadiusY = 50;

// Get the center coordinates of ellipse1 and ellipse2
const ellipse1CenterX = svgWidth / 2 - 200; // Update to move ellipses
const ellipse1CenterY = svgHeight / 2 + 100; // Update to move ellipses
const ellipse2CenterX = svgWidth / 2 + 200; // Update to move ellipses
const ellipse2CenterY = svgHeight / 2 - 100; // Update to move ellipses

// Calculate the difference in coordinates between the ellipse centers
const xDiff = ellipse2CenterX - ellipse1CenterX;
const yDiff = ellipse2CenterY - ellipse1CenterY;

// Calculate control points for the curve based on ellipse positions and radii
const controlPoint1X = ellipse1CenterX + ellipseRadiusX;
const controlPoint1Y = ellipse1CenterY - yDiff / 2;

const controlPoint2X = ellipse2CenterX - ellipseRadiusX;
const controlPoint2Y = ellipse2CenterY - yDiff / 2;

// Add lightblue ellipse SVG in the middle of the screen, that is wider than it is tall
const ellipse1 = svg
  .append("ellipse")
  .attr("cx", ellipse1CenterX)
  .attr("cy", ellipse1CenterY)
  .attr("rx", ellipseRadiusX)
  .attr("ry", ellipseRadiusY)
  .attr("fill", "lightpink")
  .attr("stroke", "black")
  .attr("stroke-width", 1);

svg
  .append("text")
  .text("UV treatment")
  .attr("x", ellipse1CenterX)
  .attr("y", ellipse1CenterY)
  .attr("text-anchor", "middle")
  .attr("dominant-baseline", "central")
  .attr("font-size", 24);

// Add another ellipse at the same height as the first one, but to the right of it
const ellipse2 = svg
  .append("ellipse")
  .attr("cx", ellipse2CenterX)
  .attr("cy", ellipse2CenterY)
  .attr("rx", ellipseRadiusX)
  .attr("ry", ellipseRadiusY)
  .attr("fill", "lightpink")
  .attr("stroke", "black")
  .attr("stroke-width", 1);

svg
  .append("text")
  .text("UV stop")
  .attr("x", ellipse2CenterX)
  .attr("y", ellipse2CenterY)
  .attr("text-anchor", "middle")
  .attr("dominant-baseline", "central")
  .attr("font-size", 24);

// Add link between the two ellipses
const link = svg
  .append("line")
  .attr("x1", ellipse1CenterX + ellipseRadiusX)
  .attr("y1", ellipse1CenterY)
  .attr("x2", ellipse2CenterX - ellipseRadiusX)
  .attr("y2", ellipse2CenterY)
  .attr("stroke", "black")
  .attr("stroke-width", 1);

// Add label that lays along the link
const label = svg
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
const linkStraight1 = svg
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
const curve = svg
  .append("path")
  .attr("d", `M ${ellipse1CenterX} ${ellipse1CenterY - ellipseRadiusY} A ${ellipseRadiusX} ${ellipseRadiusY} 0 0 1 ${ellipse2CenterX} ${ellipse2CenterY - ellipseRadiusY}`)
  .attr("fill", "none")
  .attr("stroke", "black")
  .attr("stroke-width", 1);

/*
// Add label that is slightly above the curve
svg
  .append("text")
  .text("event 1")
  .attr("x", svgWidth / 2)
  .attr("y", svgHeight / 2 - 200)
  .attr("text-anchor", "middle")
  .attr("dominant-baseline", "central")
  .attr("font-size", 24);
*/