import React, {Component} from "react";
import CSSModules from "react-css-modules";
import styles from "./Dashboard.scss";
import d3 from "d3";

class ChartRealTime extends React.Component {
    state = {
        width: 600,
        height: 400,
    };

    componentDidMount() {
        this.renderChart();
    }
    componentDidUpdate() {
        this.renderChart();
    }

    renderChart = ()=> {

        var limit = 120 * 1,
            duration = 750,
            now = new Date(Date.now() - duration)

        var margin = {top: 20, right: 40, bottom: 20, left: 40};

        var width = 500,
            height = 200;
        var latestValue=0;
        var ramdomValue=function(){
            latestValue= Math.random() * 50;
            return latestValue;
        }

        var groups = {
            current: {
                value: 0,
                color: 'orange',
                data: d3.range(limit).map(function() {
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
            .x(function(d, i) {
                return x(now - (limit - 1 - i) * duration)
            })
            .y(function(d) {
                return y(d)
            })

        var svg = d3.select(this.graph).append('svg')
            .attr('class', 'chart')
            .attr('width', width+margin.left+margin.right)
            .attr('height', height + margin.top+margin.bottom)

        svg = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

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
            .call(y.axis = d3.svg.axis().scale(y).tickValues([10,20,30, 40, 50]).orient('right'))


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

        function tick() {
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

        tick()
    }


    render() {
        return (
            <div styleName="realtime-line"  ref={(ref) => this.graph = ref}></div>
        );
    }
}

export default CSSModules(ChartRealTime, styles);
