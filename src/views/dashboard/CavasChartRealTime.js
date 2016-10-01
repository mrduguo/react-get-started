import React, {Component} from "react"
import CSSModules from "react-css-modules"
import {SmoothieChart, TimeSeries} from "smoothie"
import styles from "./Dashboard.scss"
import d3 from "d3"


function renderChart (windowWidth, holder) {

  //
  // DialChart
  //
  var NBXDialChart = function () {

    var w = 256,
      h = 256,
      m = [0, 0, 0, 0], // top right bottom left
      domain = [0, 1],
      range = [-135, 135],
      minorTicks = 4,
      minorMark = 'line',
      dial = [1.00, 0.95, 0.92, 0.85],
      scale = [0.71, 0.75, 0.76],
      needle = [0.83, 0.05],
      pivot = [0.10, 0.05];

    function dialchart (g) {
      g.each(function (d, i) {

        var wm = w - m[1] - m[3],
          hm = h - m[0] - m[2],
          a = d3.scale.linear().domain(domain).range(range);

        var r = Math.min(wm / 2, hm / 2);

        var g = d3.select(this).select('g');
        if (g.empty()) {

          g = d3.select(this).append('svg:g')
            .attr('transform', 'translate(' + (m[3] + wm / 2) + ',' + (m[0] + hm / 2) + ')');

          createDefs(g.append('svg:defs'));

          // face

          g.append('svg:circle')
            .attr('r', r * dial[0])
            .style('fill', 'url(#outerGradient)')
            .attr('filter', 'url(#dropShadow)');

          g.append('svg:circle')
            .attr('r', r * dial[1])
            .style('fill', 'url(#innerGradient)');

          g.append('svg:circle')
            .attr('r', r * dial[2])
            .style('fill', 'url(#faceGradient)');

          // scale

          var major = a.ticks(10);
          var minor = a.ticks(10 * minorTicks).filter(function (d) {
            return major.indexOf(d) == -1;
          });

          g.selectAll('text.label')
            .data(major)
            .enter().append('svg:text')
            .attr('class', 'label')
            .attr('x', function (d) {
              return Math.cos((-90 + a(d)) / 180 * Math.PI) * r * scale[1];
            })
            .attr('y', function (d) {
              return Math.sin((-90 + a(d)) / 180 * Math.PI) * r * scale[1];
            })
            .attr('text-anchor', 'middle')
            .attr('dy', '0.5em')
            .text(a.tickFormat());

          g.append('svg:text')
            .text('new')
            .attr("dy", "-2em")
            .attr("text-anchor", "middle")
            .style("fill", "#555")
            .style("font-family", "Arial")
            .style("font-size", 15);

          g.append('svg:text')
            .text('visitors')
            .attr("dy", "-1em")
            .attr("text-anchor", "middle")
            .style("fill", "#555")
            .style("font-family", "Arial")
            .style("font-size", 15);

          g.append('svg:text')
            .text(function (d) {
              return d
            })
            .attr('class', 'speed')
            .attr("dy", "2.5em")
            .transition().ease('elastic')
            .attr("text-anchor", "middle")

          if (minorMark == 'circle') {
            g.selectAll('circle.label')
              .data(minor)
              .enter().append('svg:circle')
              .attr('class', 'label')
              .attr('cx', function (d) {
                return Math.cos((-90 + a(d)) / 180 * Math.PI) * (r * scale[1]);
              })
              .attr('cy', function (d) {
                return Math.sin((-90 + a(d)) / 180 * Math.PI) * (r * scale[1]);
              })
              .attr('r', 2);
          }

          if (minorMark == 'line') {
            g.selectAll('line.label')
              .data(minor)
              .enter().append('svg:line')
              .attr('class', 'label')
              .attr('x1', function (d) {
                return Math.cos((-90 + a(d)) / 180 * Math.PI) * (r * scale[0]);
              })
              .attr('y1', function (d) {
                return Math.sin((-90 + a(d)) / 180 * Math.PI) * (r * scale[0]);
              })
              .attr('x2', function (d) {
                return Math.cos((-90 + a(d)) / 180 * Math.PI) * (r * scale[2]);
              })
              .attr('y2', function (d) {
                return Math.sin((-90 + a(d)) / 180 * Math.PI) * (r * scale[2]);
              });
          }

          var rdial3 = r * dial[3];
          g.append('svg:path')
            .attr('class', 'dial-glare')
            .attr('d', 'M ' + (-rdial3) + ',0 A' + rdial3 + ',' + rdial3 + ' 0 0,1 ' + rdial3 + ',0 A' + (rdial3 * 5) + ',' + (rdial3 * 5) + ' 0 0,0 ' + (-rdial3) + ',0')
            .style('fill', 'url(#glareGradient)');

          // needle

          var n = g.append('svg:g')
            .attr('class', 'needle')
            .attr('filter', 'url(#dropShadow)')
            .attr('transform', function (d) {
              return 'rotate(' + a(d) + ')';
            });

          n.append('svg:path')
            .attr('d', 'M ' + (-r * needle[1]) + ',0 L0,' + (-r * needle[0]) + ' L' + r * needle[1] + ',0');

          n.append('svg:circle')
            .attr('r', r * pivot[0])
            .style('fill', 'url(#outerGradient)');

          n.append('svg:circle')
            .attr('r', r * pivot[1])
            .style('fill', 'url(#innerGradient)');

        } else {

          g.select('g.needle')
            .transition().ease('elastic')
            .attr('transform', function (d) {
              return 'rotate(' + a(d) + ')';
            });

          g.select('text.speed')
            .text(function (d) {
              return Math.floor(d)
            });

        }

      });
      d3.timer.flush();
    }

    function createDefs (defs) {

      var outerGradient = defs.append('svg:linearGradient')
        .attr('id', 'outerGradient')
        .attr('x1', '0%').attr('y1', '0%')
        .attr('x2', '0%').attr('y2', '100%')
        .attr('spreadMethod', 'pad');

      outerGradient.selectAll('stop')
        .data([{o: '0%', c: '#ffffff'}, {o: '100%', c: '#d0d0d0'}])
        .enter().append('svg:stop')
        .attr('offset', function (d) {
          return d.o;
        })
        .attr('stop-color', function (d) {
          return d.c;
        })
        .attr('stop-opacity', '1');

      var innerGradient = defs.append('svg:linearGradient')
        .attr('id', 'innerGradient')
        .attr('x1', '0%').attr('y1', '0%')
        .attr('x2', '0%').attr('y2', '100%')
        .attr('spreadMethod', 'pad');

      innerGradient.selectAll('stop')
        .data([{o: '0%', c: '#d0d0d0'}, {o: '100%', c: '#ffffff'}])
        .enter().append('svg:stop')
        .attr('offset', function (d) {
          return d.o;
        })
        .attr('stop-color', function (d) {
          return d.c;
        })
        .attr('stop-opacity', '1');

      var faceGradient = defs.append('svg:linearGradient')
        .attr('id', 'faceGradient')
        .attr('x1', '0%').attr('y1', '0%')
        .attr('x2', '0%').attr('y2', '100%')
        .attr('spreadMethod', 'pad');

      faceGradient.selectAll('stop')
        .data([{o: '0%', c: '#000000'}, {o: '100%', c: '#494949'}])
        .enter().append('svg:stop')
        .attr('offset', function (d) {
          return d.o;
        })
        .attr('stop-color', function (d) {
          return d.c;
        })
        .attr('stop-opacity', '1');

      var glareGradient = defs.append('svg:linearGradient')
        .attr('id', 'glareGradient')
        .attr('x1', '0%').attr('y1', '0%')
        .attr('x2', '0%').attr('y2', '100%')
        .attr('spreadMethod', 'pad');

      glareGradient.selectAll('stop')
        .data([{o: '0%', c: '#ffffff', op: 0.60}, {o: '100%', c: '#ffffff', op: 0.00}])
        .enter().append('svg:stop')
        .attr('offset', function (d) {
          return d.o;
        })
        .attr('stop-color', function (d) {
          return d.c;
        })
        .attr('stop-opacity', function (d) {
          return d.op;
        });

      var dropShadowFilter = defs.append('svg:filter')
        .attr('id', 'dropShadow');
      dropShadowFilter.append('svg:feGaussianBlur')
        .attr('in', 'SourceAlpha')
        .attr('stdDeviation', 3);
      dropShadowFilter.append('svg:feOffset')
        .attr('dx', 2)
        .attr('dy', 2)
        .attr('result', 'offsetblur');
      var feMerge = dropShadowFilter.append('svg:feMerge');
      feMerge.append('svg:feMergeNode');
      feMerge.append('svg:feMergeNode')
        .attr('in', "SourceGraphic");

    }

    dialchart.width = function (d) {
      if (!arguments.length) return w;
      w = d;
      return dialchart;
    };

    dialchart.height = function (d) {
      if (!arguments.length) return h;
      h = d;
      return dialchart;
    };

    dialchart.margin = function (d) {
      if (!arguments.length) return m;
      m = d;
      return dialchart;
    };

    dialchart.domain = function (d) {
      if (!arguments.length) return domain;
      domain = d;
      return dialchart;
    };

    dialchart.range = function (d) {
      if (!arguments.length) return range;
      range = d;
      return dialchart;
    };

    dialchart.scale = function (d) {
      if (!arguments.length) return scale;
      scale = d;
      return dialchart;
    };

    dialchart.minorTicks = function (d) {
      if (!arguments.length) return minorTicks;
      minorTicks = d;
      return dialchart;
    };

    dialchart.minorMark = function (d) {
      if (!arguments.length) return minorMark;
      minorMark = d;
      return dialchart;
    };

    return dialchart;

  };
  var duration = 750,
    now = new Date(Date.now() - duration)

  var margin = {top: 20, right: 230, bottom: 20, left: 20};

  var width = windowWidth - margin.left - margin.right,
    height = 150;
  var limit = 40 * (Math.round(width / 250));


  var ramdomValue = function () {
    return Math.random() * 50;
  }

  var groups = {
    current: {
      value: 0,
      color: 'orange',
      data: d3.range(limit).map(function () {
        return ramdomValue();
      })
    }
  }

  var x = d3.time.scale()
    .domain([now - (limit - 2), now - duration])
    .range([0, width])

  var y = d3.scale.linear()
    .domain([0, 50])
    .range([height, 0])

  var line = d3.svg.line()
    .interpolate('basis')
    .x(function (d, i) {
      return x(now - (limit - 1 - i) * duration)
    })
    .y(function (d) {
      return y(d)
    })

  var svgRoot = d3.select(holder).append('svg')
    .attr('class', 'chart')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)

  var svg = svgRoot.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  svg = svg.append("g")
    .attr('width', width)
    .attr('height', height);

  var axis = svg.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0,' + height + ')')
    .call(x.axis = d3.svg.axis().scale(x).orient('bottom'))

  var axisY = svg.append('g')
    .attr("class", "axis axis--y")
    .attr("transform", "translate(" + (width) + ",0)")
    .call(y.axis = d3.svg.axis().scale(y).tickValues([10, 20, 30, 40, 50]).orient('right'))


  svg.append("defs").append("clipPath")
    .attr("id", "clip")
    .append("rect")
    .attr("width", width)
    .attr("height", height);


  var paths = svg.append('g').attr("clip-path", "url(#clip)").append('g')

  for (var name in groups) {
    var group = groups[name]
    group.path = paths.append('path')
      .data([group.data])
      .attr('class', name + ' group')
      .style('stroke', group.color)
  }

  function tick () {
    now = new Date()

    // Add new values
    for (var name in groups) {
      var group = groups[name]
      //group.data.push(group.value) // Real values arrive at irregular intervals
      group.data.push(ramdomValue())
      group.path.attr('d', line)
    }

    // Shift domain
    x.domain([now - (limit - 2) * duration, now - duration])

    // Slide x-axis left
    axis.transition()
      .duration(duration)
      .ease('linear')
      .call(x.axis)

    // Slide paths left
    paths.attr('transform', null)
      .transition()
      .duration(duration)
      .ease('linear')
      .attr('transform', 'translate(' + x(now - (limit - 1) * duration) + ')')
      .each('end', tick)

    // Remove oldest data point from each group
    for (var name in groups) {
      var group = groups[name]
      group.data.shift()
    }
  }

  tick();


  var w = 960,
    h = 500;

  var layout = [
    {x: windowWidth - 110, y: 95, r: 80, m: 50, ticks: 0, mark: 'circle'}
  ];
  var charts = layout.map(function (d) {
    return NBXDialChart()
      .width(d.r * 2)
      .height(d.r * 2)
      .domain([0, d.m])
      .range([-150, 150])
      .minorTicks(d.ticks)
      .minorMark(d.mark);
  });


  var dials = svgRoot.selectAll('g.dial')
    .data(layout)
    .enter().append('svg:g')
    .attr('class', 'dial')
    .attr('id', function (d, i) {
      return 'dial-' + i;
    })
    .attr('transform', function (d) {
      return 'translate(' + (d.x - d.r) + ',' + (d.y - d.r) + ')';
    });

  dials.each(function (d, i) {
    d3.select(this).data([20]).call(charts[i]);
  });

  var vari = 0;
  var transition = function () {
    dials.each(function (d, i) {
      d3.select(this)
        .data([groups.current.data[limit - 3]])
        .call(charts[i]);
    });
    vari++;
    console.log('transition triggered', vari);
  };

  setInterval(transition, duration)

};


var seriesOptions = [
  {strokeStyle: 'rgba(255, 0, 0, 1)', fillStyle: 'rgba(255, 0, 0, 0.1)', lineWidth: 3},
  {strokeStyle: 'rgba(0, 255, 0, 1)', fillStyle: 'rgba(0, 255, 0, 0.1)', lineWidth: 3},
  {strokeStyle: 'rgba(0, 0, 255, 1)', fillStyle: 'rgba(0, 0, 255, 0.1)', lineWidth: 3},
  {strokeStyle: 'rgba(255, 255, 0, 1)', fillStyle: 'rgba(255, 255, 0, 0.1)', lineWidth: 3}
];

function renderCavas (windowWidth, holder) {

  // Initialize an empty TimeSeries for each CPU.
  var cpuDataSets = [new TimeSeries(), new TimeSeries(), new TimeSeries(), new TimeSeries()];

  var now = new Date().getTime();
  for (var t = now - 1000 * 50; t <= now; t += 1000) {
    addRandomValueToDataSets(t, cpuDataSets);
  }
  // Every second, simulate a new set of readings being taken from each CPU.
  setInterval(function () {
    addRandomValueToDataSets(new Date().getTime(), cpuDataSets);
  }, 1000);

  // Build the timeline
  var timeline = new SmoothieChart({
    millisPerPixel: 20,
    grid: {strokeStyle: '#555555', lineWidth: 1, millisPerLine: 5000, verticalSections: 5},
    timestampFormatter:SmoothieChart.timeFormatter,
  });
  for (var i = 0; i < cpuDataSets.length; i++) {
    timeline.addTimeSeries(cpuDataSets[i], seriesOptions[i]);
  }
  timeline.streamTo(holder, 1000);
}

function addRandomValueToDataSets (time, dataSets) {
  for (var i = 0; i < dataSets.length; i++) {
    dataSets[i].append(time, Math.random());
  }
}


class ChartRealTime extends React.Component {
  componentDidMount () {
    this.renderChartx();
  }

  componentDidUpdate () {
    this.renderChartx();
  }

  renderChartx = ()=> {
    renderChart(this.props.width, this.graph);
    renderCavas(this.props.width, this.cavas);
  }


  render () {
    return (
      <div>
        <div styleName="realtime-line" ref={(ref) => this.graph = ref}></div>
        <canvas ref={(ref) => this.cavas = ref} width="1000" height="200"/>
      </div>
    );
  }
}

export default CSSModules(ChartRealTime, styles);
