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
  .attr("fill", "beige")
  .attr("stroke", "black")
  .attr("stroke-width", 0);

// Define a sidebar as a rectangle with outlining with specific thickness that spans all along left of the screen
const sidebar = svg
  .append("rect")
  .attr("x", 0)
  .attr("y", 50)
  .attr("width", 200)
  .attr("height", svgHeight - 50)
  .attr("fill", "beige")
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

// Add hover effect to the sidebarbuttons
sidebarButtons
  .on("mouseover", function() {
    d3.select(this).select("rect").attr("fill", "lightgreen");
  })
  .on("mouseout", function() {
    d3.select(this).select("rect").attr("fill", "lightblue");
  });

// Add hover effect to the bannerbuttons
bannerButtons
  .on("mouseover", function() {
    d3.select(this).select("rect").attr("fill", "lightgreen");
  })
  .on("mouseout", function() {
    d3.select(this).select("rect").attr("fill", "lightblue");
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

// Add lightblue ellipse SVG in the middle of the screen, that is wider than it is tall
const ellipse1 = svg
  .append("ellipse")
  .attr("cx", svgWidth / 2 - 200)
  .attr("cy", svgHeight / 2 - 100)
  .attr("rx", 100)
  .attr("ry", 50)
  .attr("fill", "lightblue")
  .attr("stroke", "black")
  .attr("stroke-width", 1);

svg
  .append("text")
  .text("UV treatment")
  .attr("x", svgWidth / 2 - 200)
  .attr("y", svgHeight / 2 - 100)
  .attr("text-anchor", "middle")
  .attr("dominant-baseline", "central")
  .attr("font-size", 24);

// Add another ellipse at the same height as the first one, but to the right of it
const ellipse2 = svg
  .append("ellipse")
  .attr("cx", svgWidth / 2 + 200)
  .attr("cy", svgHeight / 2 - 100)
  .attr("rx", 100)
  .attr("ry", 50)
  .attr("fill", "lightblue")
  .attr("stroke", "black")
  .attr("stroke-width", 1);

svg
  .append("text")
  .text("UV stop")
  .attr("x", svgWidth / 2 + 200)
  .attr("y", svgHeight / 2 - 100)
  .attr("text-anchor", "middle")
  .attr("dominant-baseline", "central")
  .attr("font-size", 24);

// Add link between the two ellipses
const link = svg
  .append("line")
  .attr("x1", svgWidth / 2 - 100)
  .attr("y1", svgHeight / 2 - 100)
  .attr("x2", svgWidth / 2 + 100)
  .attr("y2", svgHeight / 2 - 100)
  .attr("stroke", "black")
  .attr("stroke-width", 1);

// Add label that is slightly above the line
svg
  .append("text")
  .text("Restart")
  .attr("x", svgWidth / 2)
  .attr("y", svgHeight / 2 - 120)
  .attr("text-anchor", "middle")
  .attr("dominant-baseline", "central")
  .attr("font-size", 24);

// Add link that curves smoothly over the top of the ellipses, from the top of the ellipses
const curve = svg
  .append("path")
  .attr("d", `M ${svgWidth / 2 - 180} ${svgHeight / 2 - 150} C ${svgWidth / 2 - 100} ${svgHeight / 2 - 200}, ${svgWidth / 2 + 100} ${svgHeight / 2 - 200}, ${svgWidth / 2 + 100} ${svgHeight / 2 - 150}`)
  .attr("fill", "none")
  .attr("stroke", "black")
  .attr("stroke-width", 1);

