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
  .attr("fill", "#e8c671")
  .attr("stroke", "black")
  .attr("stroke-width", 0);

// Define a sidebar as a rectangle with outlining with specific thickness that spans all along left of the screen
const sidebar = svg
  .append("rect")
  .attr("x", 0)
  .attr("y", 50)
  .attr("width", 200)
  .attr("height", svgHeight - 50)
  .attr("fill", "#e8c671")
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
  .attr("fill", "lightblue")
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
  .attr("fill", "lightblue")
  .attr("stroke", "black")
  .attr("stroke-width", 1);

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
  // Remove any existing SVG elements
  svg.selectAll(".ellipses").remove();
  svg.selectAll(".arrow").remove();

  if (d === "Robot") {
    // Create SVG elements for Robot button
    const centerX = svgWidth / 2;
    const centerY = svgHeight / 2;
    const radiusX = 100;
    const radiusY = 50;

    const ellipses = svg
      .append("g")
      .attr("class", "ellipses");

    ellipses
      .append("ellipse")
      .attr("cx", centerX - 200)
      .attr("cy", centerY)
      .attr("rx", radiusX)
      .attr("ry", radiusY)
      .attr("fill", "lightblue")
      .attr("stroke", "black")
      .attr("stroke-width", 2);

    ellipses
      .append("ellipse")
      .attr("cx", centerX + 200)
      .attr("cy", centerY)
      .attr("rx", radiusX)
      .attr("ry", radiusY)
      .attr("fill", "lightblue")
      .attr("stroke", "black")
      .attr("stroke-width", 2);

    svg
      .append("path")
      .attr("class", "arrow")
      .attr("d", `M ${centerX - 200 + radiusX} ${centerY} L ${centerX + 200 - radiusX} ${centerY}`)
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("stroke-width", 2)
      .attr("marker-end", "url(#arrowhead)");
  }
}

// Define the marker for the arrowhead
svg
  .append("defs")
  .append("marker")
  .attr("id", "arrowhead")
  .attr("refX", 6)
  .attr("refY", 2)
  .attr("markerWidth", 6)
  .attr("markerHeight", 4)
  .attr("orient", "auto")
  .append("path")
  .attr("d", "M 0,0 V 4 L6,2 Z")
  .attr("fill", "black");
