// World Map Visualization
function renderMap(world, mapdata) {
  var width = 960, height = 500;
  var projection = d3.geo.mercator()
    .translate([width/2, height/2])
    .center([0, 5])
    .scale(150);
  var svg = d3.select("#map").append("svg")
    .attr("width", width)
    .attr("height", height);
  var path = d3.geo.path().projection(projection);
  var g = svg.append("g");

  // Add zoom behavior
  var zoom = d3.behavior.zoom()
    .scaleExtent([0.5, 10])
    .on("zoom", function() {
      g.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
      g.selectAll("path").attr("d", path.projection(projection));
    });
  svg.call(zoom);

  g.selectAll("path")
    .data(world.features)
    .enter().append("path")
    .attr("d", path);

  var tip = d3.tip()
    .attr("class","tooltip")
    .html(function (d) {return "Place: "+d[1].Place+", Type: "+d[1].TypeofMeteorite+", Year: "+d[1].Year;});
  var places = [];
  for(var i=1;i<mapdata.length;i++) {
    var temp = [];
    temp.push([mapdata[i].FIELD7,mapdata[i].FIELD6]);
    temp.push({
      "Fell/found?":mapdata[i].FIELD1,
      "MeteorMassRange":mapdata[i].FIELD2,
      "Place":mapdata[i].FIELD3,
      "TypeofMeteorite":mapdata[i].FIELD4,
      "Year":mapdata[i].FIELD5,
      "SumofMass":mapdata[i].FIELD8
    });
    places.push(temp);
  }
  g.selectAll("circle")
    .data(places)
    .enter().append("circle")
    .attr("cx", function(d) {  return projection(d[0])[0];})
    .attr("cy", function(d) { return projection(d[0])[1];})
    .attr("r", function(d) {
      if(d[1].SumofMass>=1100000) return 15;
      else if(d[1].SumofMass>=500000) return 12;
      else if(d[1].SumofMass>=250000) return 9;
      else if(d[1].SumofMass>=100000) return 7;
      else return 5;
    })
    .attr("class", "point")
    .on("mouseover",tip.show)
    .on("mouseout",tip.hide);
  svg.call(tip);
}
