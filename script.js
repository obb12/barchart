
  var w = 800;
  var h = 400;
var   barWidth = w/275;

  const padding = 60;
  const svg = d3.select("#svg")
                .append("svg")
                .attr("width", w)
                .attr("height", h);
                d3.json('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json').then(function(data){
                  var years = data.data.map(function(item) {
                    var quarter;
                    var temp = item[0].substring(5, 7);
                    quarter = temp === 'Q1' ? 'Q1' :  temp ===  '04'? 'Q2' :temp === '07' ? 'Q3' : 'Q4'
                    return item[0].substring(0, 4) + ' ' + quarter
                  });

                  var yearsDate = data.data.map(function(item) {
                    return new Date(item[0]);
                  });

                  var x_max = new Date(d3.max(yearsDate));
                  x_max.setMonth(x_max.getMonth() + 3);
                  var xScale = d3.scaleTime()
                    .domain([d3.min(yearsDate), x_max])
                    .range([0, w]);

                  var xAxis = d3.axisBottom()
                    .scale(xScale);

                  var xAxisGroup = svg.append('g')
                    .call(xAxis)
                    .attr('id', 'x-axis')
                    .attr('transform', 'translate(60, 20)');

                  var GDP = data.data.map(function(item) {
                    return item[1]
                  });

                  var scaledGDP = [];

                  var gdpMin = d3.min(GDP);
                  var gdpMax = d3.max(GDP);

                  var linearScale = d3.scaleLinear()
                    .domain([0, gdpMax])
                    .range([0, h]);

                  scaledGDP = GDP.map(function(item) {
                    return linearScale(item);
                  });

                  var yAxisScale = d3.scaleLinear()
                    .domain([0, gdpMax])
                    .range([h, 0]);

                  var yAxis = d3.axisLeft(yAxisScale)

                  var yAxisGroup = svg.append('g')
                    .call(yAxis)
                    .attr('id', 'y-axis')
                    .attr('transform', 'translate(60, 0)');

                  d3.select('svg').selectAll('rect')
                    .data(scaledGDP)
                    .enter()
                    .append('rect')
                    .attr('data-date', function(d, i) {
                      return data.data[i][0]
                    })
                    .attr('data-gdp', function(d, i) {
                      return data.data[i][1]
                    })
                    .attr('class', 'bar')
                    .attr('x', function(d, i) {
                      return xScale(yearsDate[i]);
                    })
                    .attr('y', function(d, i) {
                      return h - d;
                    })
                    .attr('width', barWidth)
                    .attr('height', function(d) {
                      return d;
                    })
                    .style('fill', 'green')
                    .attr('transform', 'translate(60, 0)')
                    .append("title")
                    .text((d) => d)


});
