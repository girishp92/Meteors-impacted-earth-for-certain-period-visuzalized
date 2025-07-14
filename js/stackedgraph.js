// Stacked Bar Chart Visualization
function renderStackedGraph(mapdata) {
  var stackedDiv = d3.select("body").append("div").attr("id", "stackedgraph");
  stackedDiv.append("h4").attr("id", "content").text("Number of Meteorites by Year and Type (Stacked)");
  var yearTypeNest = d3.nest()
    .key(function(d) { return d.FIELD5; })
    .key(function(d) { return d.FIELD4; })
    .rollup(function(leaves) { return leaves.length; })
    .entries(mapdata);
  var allYears = yearTypeNest.map(function(d) { return d.key; });
  var allTypes = Array.from(new Set(mapdata.map(function(d) { return d.FIELD4; })));
  var stackedData = yearTypeNest.map(function(yearObj) {
    var row = { year: yearObj.key };
    allTypes.forEach(function(type) {
      var found = yearObj.values.find(function(t) { return t.key === type; });
      row[type] = found ? found.values : 0;
    });
    return row;
  });
  stackedData.sort(function(a, b) { return +a.year - +b.year; });
  var marginS = {top: 40, right: 20, bottom: 60, left: 60},
      widthS = 1200 - marginS.left - marginS.right,
      heightS = 400 - marginS.top - marginS.bottom;
  var svgStacked = d3.select("#stackedgraph").append("svg")
    .attr("width", widthS + marginS.left + marginS.right)
    .attr("height", heightS + marginS.top + marginS.bottom)
    .append("g")
    .attr("transform", "translate(" + marginS.left + "," + marginS.top + ")");
  var xS = d3.scale.ordinal()
    .domain(stackedData.map(function(d) { return d.year; }))
    .rangeRoundBands([0, widthS], 0.1);
  var yS = d3.scale.linear()
    .domain([0, d3.max(stackedData, function(d) {
      return d3.sum(allTypes, function(type) { return d[type]; });
    })])
    .range([heightS, 0]);
  var colorS = d3.scale.category20c().domain(allTypes);
  var stack = d3.layout.stack()
    .values(function(d) { return allTypes.map(function(type) { return {x: d.year, y: d[type], type: type}; }); })
    .x(function(d) { return d.x; })
    .y(function(d) { return d.y; });
  var layers = allTypes.map(function(type) {
    return stackedData.map(function(d) {
      return {x: d.year, y: d[type], type: type};
    });
  });
  var stackData = d3.layout.stack()(layers);
  for (var i = 0; i < stackData.length; i++) {
    svgStacked.selectAll(".bar.stacked.type"+i)
      .data(stackData[i])
      .enter().append("rect")
      .attr("class", "bar stacked type"+i)
      .attr("x", function(d) { return xS(d.x); })
      .attr("width", xS.rangeBand())
      .attr("y", function(d) { return yS(d.y0 + d.y); })
      .attr("height", function(d) { return yS(d.y0) - yS(d.y0 + d.y); })
      .style("fill", colorS(allTypes[i]))
      .on("mouseover", function(d) {
        var tipText = "Year: " + d.x + "<br>Type: " + d.type + "<br>Count: " + d.y;
        d3.select("#stackedgraph").append("div").attr("class", "tooltip").html(tipText).style("position", "absolute").style("left", (d3.event.pageX+10)+"px").style("top", (d3.event.pageY-28)+"px");
      })
      .on("mouseout", function() {
        d3.select("#stackedgraph").selectAll(".tooltip").remove();
      });
  }
  var xAxisS = d3.svg.axis().scale(xS).orient("bottom");
  var yAxisS = d3.svg.axis().scale(yS).orient("left");
  svgStacked.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + heightS + ")")
    .call(xAxisS)
    .selectAll("text")
    .style("font-size", "10px")
    .attr("transform", "rotate(-45)")
    .attr("dx", "-0.8em")
    .attr("dy", "0.15em")
    .style("text-anchor", "end");
  svgStacked.append("g")
    .attr("class", "y axis")
    .call(yAxisS);
  svgStacked.append("text")
    .attr("class", "x label")
    .attr("x", widthS / 2)
    .attr("y", heightS + 50)
    .attr("text-anchor", "middle")
    .attr("font-size", "16px")
    .text("Year");
  svgStacked.append("text")
    .attr("class", "y label")
    .attr("transform", "rotate(-90)")
    .attr("x", -heightS / 2)
    .attr("y", -45)
    .attr("text-anchor", "middle")
    .attr("font-size", "16px")
    .text("Number of Meteorites");
}
