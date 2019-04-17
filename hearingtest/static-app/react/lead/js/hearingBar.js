import d3 from 'd3';
/**
d3 chart of the hearing status
**/
var hearingBar = function(id, percent) {

  var range = 96 * percent;
  var svg = d3.select(id)
  .append("svg")
  .attr("width", 768)
  .attr("height", 60);

  var g = svg.selectAll("g")
  .data(d3.range(96))
  .enter().append("g")
  .attr("transform", function() {
    return "translate(0,30)";
  });

  g.append("rect")
  .attr("rx", 1)
  .attr("ry", 4)
  .attr("x", 0)
  .attr("y", 0)
  .attr("width", 6)
  .attr("height", 24)
  .attr("transform", function(d, i) {
    return "translate(" + (d * 8) + ")";
  }).style("fill", function(d, i) {
    return "#e7e7e7";
  });

  var g2 = svg.selectAll("g2")
  .data(d3.range(range))
  .enter().append("g")
  .attr("transform", function() {
    return "translate(0,30)";
  });
  g2.append("rect")
  .attr("rx", 1)
  .attr("ry", 4)
  .attr("x", 0)
  .attr("y", 0)
  .attr("width", 6)
  .attr("height", 24)
  .style("fill", function(d, i) {
    if(range < 32) {
      return "#ef4036";
    } else if(range >= 32 && range < 73) {
      return "#fccd09";
    }
    return "#8dc63f";
  })
  .attr("transform", function(d, i) {
    return "translate(" + (i * 0) + ")";
  }).transition()
  .delay(500)
  .duration(750)
  .ease("bounce")
  .attr("transform", function(d, i) {
    return "translate(" + (i * 8) + ")";
  });

  svg.append("rect")
  .attr("rx", 1)
  .attr("ry", 4)
  .attr("x", 0)
  .attr("y", 0)
  .attr("width", 8)
  .attr("height", 40)
  .style("fill", function(d, i) {
    if(range < 32) {
      return "#ef4036";
    } else if(range >= 32 && range < 73) {
      return "#fccd09";
    }
    return "#8dc63f";
  })
  .attr("transform", function(d, i) {
    return "translate(" + (range * 0) + ", 20)";
  }).transition()
  .delay(500)
  .duration(1000)
  .ease("bounce")
  .attr("transform", function(d, i) {
    // if(range == 96) {
    //   return "translate(" + ((range-3) * 8) + ", 20)";
    // }
    return "translate(" + ((range-1) * 8) + ", 20)";
  });

  svg.append("text")
  .attr("x", function() {
    if(range == 96) {
      return (((range - 3) * 8) + 5);
    }
    return ((range * 8) + 5);
  })
  .attr("y", 8)
  .style("text-anchor", "middle")
  .style("fill", "white")
  .attr("dy", ".35em")
  .style("font-size", "16px")
  .attr( "fill-opacity", 0 ).transition().delay(500)
  .attr( "fill-opacity", 1 ).text(function(d) {
    return Math.round(percent * 100) + "%";
  });
}

export default hearingBar
