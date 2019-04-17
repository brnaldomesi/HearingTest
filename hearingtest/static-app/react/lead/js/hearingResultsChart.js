import d3 from 'd3';
/**
d3 chart of the hearing charts
**/
import { RIGHT_EAR, LEFT_EAR } from '../Constants.js';

var hearingChart = function hearingChart(id, results, callback) {

   var width = 800;
   var height = 280;

   this.currentSelected = null;

   this.nextChartData = function() {
     if(this.currentSelected == null) {
       d3.selectAll(".row-row").style({opacity:'0.4'});
       d3.select(".high-row").style({opacity:'1.0'});
       this.currentSelected = 0;
       callback(0);
     } else if(this.currentSelected == 0) {
        d3.selectAll(".row-row").style({opacity:'0.4'});
        d3.select(".mid-row").style({opacity:'1.0'});
        this.currentSelected = 1;
        callback(1);
     } else if(this.currentSelected == 1) {
        d3.selectAll(".row-row").style({opacity:'0.4'});
        d3.select(".low-row").style({opacity:'1.0'});
        this.currentSelected = 2;
        callback(2);
     } else if(this.currentSelected == 2) {
        d3.selectAll(".row-row").style({opacity:'1.0'});
        this.currentSelected = null;
        callback(null);
     }
   }

   var data = [[results[LEFT_EAR][4000], results[RIGHT_EAR][4000]], [results[LEFT_EAR][2000], results[RIGHT_EAR][2000], results[LEFT_EAR][1000], results[RIGHT_EAR][1000]], [results[LEFT_EAR][500], results[RIGHT_EAR][500]]];

   var svg = d3.select(id)
  .append("div")

   .classed("svg-container", true) //container class to make it responsive
   .append("svg")
   .style("width", 900)
   .style("height", 280)
   //responsive SVG needs these 2 attributes and no width and height attr
  //  .attr("preserveAspectRatio", "xMinYMin meet")
  //  .attr("viewBox", "0 0 900 280")
  //  .classed("svg-content-responsive", true);

   var _this = this;

   var hb = svg.selectAll(".hb")
     .data(data)

     .enter().append("g")
     .attr("class", function(d, i) {
       if(i  == 0) {
         return "high-row row-row";
       } else if(i == 1) {
         return "mid-row row-row";
       } else {
         return "low-row row-row";
       }
      })
     .attr("transform", function(d, i) {
       var x = 0;
       var y = (i == 2) ? 150 : i * 50;
       return "translate("+ x +","+ y +")";
     })
     .on("click", function(d, i){
       d3.selectAll(".row-row").style({opacity:'0.4'});
       d3.select(this).style({opacity:'1.0'});
        d3.event.stopPropagation();
           _this.currentSelected = i;
           callback(i);
			});

    var ha = hb.append("g");
     var hg = ha.selectAll(".hg")
     .data(function(d, i) {
       return d;
     })
     .enter().append("g")
     .attr("class", "bar-row")
     .attr("transform", function(d, i) {
      //  console.log("d: ", d);
      //  console.log("i: ", i);
       var x = ((i%2) != 0) ? 504 : 386;
       var y = (i > 1) ? 50 : 0;
       if((i%2) == 0) {
         return "translate("+ x +","+ y +") scale(-1, 1)";
       } else {
         return "translate("+ x +","+ y +")";
       }
     })

     hg.append("rect")
     .attr("rx", 1)
     .attr("ry", 4)
     .attr("x", 0)
     .attr("y", 10)
     .attr("width", 336)
     .attr("height", 4)
      .style("fill", function(d, i) {
        return "#e7e7e7";
      });

      hg.append("text")
      .attr("x", 0)
      .attr("y", 0)
      .style("text-anchor", "left")
      .attr("dy", ".35em")
      .style("font-size", "14px")
      .text(function(d,i) {
        var output = 100;
        if(d <= 30) {
          output = 100;
        } else if(d == 35) {
          output = 85;
        } else if(d == 40) {
          output = 75;
        } else if (d == 45) {
          output = 65;
        } else if (d == 50) {
          output = 55;
        } else if (d == 55) {
          output = 45;
        } else {
          output = 30;
        }
        return output + "%";
      }) .attr("transform", function(d, i) {
         var x = 346;
         var y = 10;
         if((i%2) == 0) {
           x = x + 40;
           return "translate("+ x +","+ y +") scale(-1, 1)";
         } else {
           return "translate("+ x +","+ y +")";
         }
       })

  var sd = hg.append("g");
  var vs = sd.selectAll(".hb-b")
  .data(function(d) {
    var datum = [];
    for(var i = 0; i < 48; i++) {
      datum.push({value:d, active:true});
    }
    return datum
  })
  .enter().append("g")
  .attr("class", "bar-in")
  .attr("transform", function(d, i) {
    return "translate(0,0)";
  });


   var re = vs.append("rect")
   .attr("class", "bar-up")
     .attr("rx", 1)
     .attr("ry", 3)
     .attr("x", 0)
     .attr("y", 0)
     .attr("width", 4.5)
     .attr("height", 24)

     .style("fill", function(dd, i) {
       var d = dd.value;
       var range = 0;
       var output = 100;
       if(d <= 30) {
         output = 100;
       } else if(d == 35) {
         output = 85;
       } else if(d == 40) {
         output = 75;
       } else if (d == 45) {
         output = 65;
       } else if (d == 50) {
         output = 55;
       } else if (d == 55) {
         output = 45;
       } else {
         output = 30;
       }

       range = (47 * (output * .01))

       var color = "none";
       if(i > range) {
         color = "none";
       }
       else if(range < 16) {
         color = "#ef4036";
       } else if(range >= 16 && range < 36) {
          color = "#fccd09";
       } else {
         color = "#8dc63f";
       }
       return color;

     })  .attr("transform", function(d, i) {
         return "translate(" + (i * 2) + ")";
       })     .transition()
          .delay(500)
          .duration(750)
          .ease("bounce")
          .attr("transform", function(d, i) {
            return "translate(" + (i * 7) + ")";
          });

      var normal = svg.append("text")
      .attr("x", 645)
      .attr("y", 220)
      .style("text-anchor", "middle")
      .style("text-decoration", "underline")
      .attr("dy", ".35em")
      .style("font-size", "16px")
      .text(function(d) {
        return "Normal";
      });
      var needwork = svg.append("text")
      .attr("x", 445)
      .attr("y", 220)
      .style("text-anchor", "middle")
      .style("text-decoration", "underline")
      .attr("dy", ".35em")
      .style("font-size", "16px")
      .text(function(d) {
        return "Needs Work";
      });
      var outshape = svg.append("text")
      .attr("x", 245)
      .attr("y", 220)
      .style("text-anchor", "middle")
      .style("text-decoration", "underline")
      .attr("dy", ".35em")
      .style("font-size", "16px")
      .text(function(d) {
        return "Out of Shape";
      });
      var normalbar = svg.append("rect")
      .attr("rx", 1)
      .attr("ry", 4)
      .attr("x", 300)
      .attr("y", 220)
      .attr("width", 30)
      .attr("height", 4)
      .style("fill", function(d, i) {
        return "#e7e7e7";
      });
      var nworkbar = svg.append("rect")
      .attr("rx", 1)
      .attr("ry", 4)
      .attr("x", 500)
      .attr("y", 220)
      .attr("width", 30)
      .attr("height", 4)
      .style("fill", function(d, i) {
        return "#e7e7e7";
      });
      var outshapebar = svg.append("rect")
      .attr("rx", 1)
      .attr("ry", 4)
      .attr("x", 680)
      .attr("y", 220)
      .attr("width", 30)
      .attr("height", 4)
      .style("fill", function(d, i) {
        return "#e7e7e7";
      });


                var vsa = svg.selectAll(".sample-bar")
                .data(d3.range(9))
                .enter().append("g")
                .attr("class", "sample-bar")
                .attr("transform", function(d, i) {
                var x = 0;
                // console.log(i);
                var y = 210;
                if(i < 3) {
                  x = 305;
                } else if(i >= 3 && i < 6) {
                  x = 505;
                } else {
                  x = 685;
                }
                return "translate("+ x +","+ y +")";
                });


                 var rea = vsa.append("rect")
                 .attr("class", "bar-up")
                   .attr("rx", 1)
                   .attr("ry", 3)
                   .attr("x", 0)
                   .attr("y", 0)
                   .attr("width", 4.5)
                   .attr("height", 24)

                   .style("fill", function(d, i) {
                     if(i < 3) {
                       return "#ef4036";
                     } else if(i >= 3 && i < 6) {
                        return "#fccd09";
                     } else {
                       return "#8dc63f";
                     }
                   })  .attr("transform", function(d, i) {
                        var x = 0;

                        if(i < 3) {
                          x = i;
                        } else if(i >= 3 && i < 6) {
                          x = i - 3;
                        } else {
                          x = i - 6;
                        }
                       return "translate(" + (x * 7) + ")";
                     });


    var high = svg.append("text")
    .attr("x", 445)
    .attr("y", 15)
    .style("text-anchor", "middle")
    .style("text-decoration", "underline")
    .attr("dy", ".35em")
    .style("font-size", "16px")
    .text(function(d) {
      return "High Tones";
    }).on("click", function(){
      d3.selectAll(".row-row").style({opacity:'0.4'});
      d3.select(".high-row").style({opacity:'1.0'});
      _this.currentSelected = 0;
      callback(0);

     });
    var mid = svg.append("text")
    .attr("x", 445)
    .attr("y", 90)
    .style("text-anchor", "middle")
    .style("text-decoration", "underline")
    .attr("dy", ".35em")
    .style("font-size", "16px")
    .text(function(d) {
      return "Mid Tones";
    }).on("click", function(){
      d3.selectAll(".row-row").style({opacity:'0.4'});
      d3.select(".mid-row").style({opacity:'1.0'});
      _this.currentSelected = 1;
      callback(1);

     });
    var low = svg.append("text")
    .attr("x", 445)
    .attr("y", 165)
    .style("text-anchor", "middle")
    .style("text-decoration", "underline")
    .attr("dy", ".35em")
    .style("font-size", "16px")
    .text(function(d) {
      return "Low Tones";
    }).on("click", function(){
      d3.selectAll(".row-row").style({opacity:'0.4'});
      d3.select(".low-row").style({opacity:'1.0'});
       _this.currentSelected = 2;
      callback(2);
     });
}

export default hearingChart
