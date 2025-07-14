// Bar Graph Visualization
function renderBarGraph(countrange1) {
  var margin = {top: 40, right: 20, bottom: 60, left: 60};
  var width = 1500 - margin.left - margin.right;
  var height = 400 - margin.top - margin.bottom;
  var names = countrange1.map(function(d) { return d.key; });
  var max = d3.max(countrange1, function(d) { return d.values; });
  var x = d3.scale.ordinal().domain(names).rangeRoundBands([0, width], 0.1);
  var y = d3.scale.linear().domain([0, max]).range([height, 0]);
  var svgBar = d3.select("#bargraph1").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  var xAxis = d3.svg.axis().scale(x).orient("bottom");
  var yAxis = d3.svg.axis().scale(y).orient("left");
  svgBar.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
    .selectAll("text")
    .style("font-size", "12px");
  svgBar.append("g")
    .attr("class", "y axis")
    .call(yAxis);
  svgBar.append("text")
    .attr("class", "x label")
    .attr("x", width / 2)
    .attr("y", height + 50)
    .attr("text-anchor", "middle")
    .attr("font-size", "18px")
    .text("Mass Range (kg)");
  svgBar.append("text")
    .attr("class", "y label")
    .attr("transform", "rotate(-90)")
    .attr("x", -height / 2)
    .attr("y", -45)
    .attr("text-anchor", "middle")
    .attr("font-size", "18px")
    .text("Number of Meteorites");
  var tip = d3.tip()
    .attr("class", "tooltip")
    .html(function(d) { return "There are total of " + d.values + " meteorites with mass range of " + d.key; });
  svgBar.selectAll("rect")
    .data(countrange1)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", function(d) { return x(d.key); })
    .attr("width", x.rangeBand())
    .attr("y", function(d) { return y(d.values); })
    .attr("height", function(d) { return height - y(d.values); })
    .attr("fill", "steelblue")
    .on("mouseover", tip.show)
    .on("mouseout", tip.hide);
  svgBar.call(tip);
}
