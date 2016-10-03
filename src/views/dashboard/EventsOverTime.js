import React, {Component} from "react";
import CSSModules from "react-css-modules";
import moment from "moment";
import styles from "./Dashboard.scss";
import d3 from "d3";
import {BarChart} from "react-d3-components";

var data = [
    {
        label: 'ERROR',
        values: [
            {x: '1/9', y: 10},
            {x: '2/9', y: 4},
            {x: '3/9', y: 3},
            {x: '4/9', y: 7},
        ]
    },
    {
        label: 'WARN',
        values: [
            {x: '1/9', y: 6},
            {x: '2/9', y: 8},
            {x: '3/9', y: 5},
            {x: '4/9', y: 3},
            ]
    },
    {
        label: 'INFO',
            values: [
        {x: '1/9', y: 4},
        {x: '2/9', y: 7},
        {x: '3/9', y: 9},
        {x: '4/9', y: 9},
        ]
    },
];

var generateData=function(limit){
    var errorValues=[];
    var warnValues=[];
    var infoValues=[];
    var d = [
        {
            label: 'ERROR',
            values: errorValues
        },
        {
            label: 'WARN',
            values: warnValues
        },
        {
            label: 'INFO',
            values: infoValues
        },
    ]
    for(var i=(limit);i>0;i--){
        var infoValue=Math.random();
        var warnValue=Math.random()*(1-infoValue);
        var errorValue=1-infoValue-warnValue;
        var date = moment().subtract(i,'hours').format('ddd H');
        // var date = moment().subtract(i,'days').toDate();
        errorValues.push({x: date,y:errorValue})
        warnValues.push({x:date,y:warnValue})
        infoValues.push({x:date,y:infoValue})
    }
    return d;
}



var labelAccessor = function(stack) { return stack.customLabel; };

var tooltipScatter = function(x, y,z) {
    return x +": "+ (Math.floor(z*100));
};

var colorScale = d3.scale.ordinal().range(["GREEN", "orange",'RED']);

// var xScale= d3.time.scale().domain([new Date(2016, 9, 5), new Date(2016, 10, 3)]).range([0, 20]);

class EventsOverTime extends React.Component {
    render() {
        var limit = 6 * (Math.round(this.props.width / 250));
        data=generateData(limit);
        return (
            <div styleName="darkBackgroud">
                <h2 styleName="sectionTitle">
                    <span styleName="eventsOverTimeLegend">
                        <span style={{backgroundColor:'green'}}>INFO</span>
                        <span style={{backgroundColor:'orange'}}>WARN</span>
                        <span style={{backgroundColor:'red'}}>ERROR</span>
                    </span>
                    Events Over Time
                </h2>
                <div>
                    <BarChart
                        data={data}
                        colorScale={colorScale}
                        width={this.props.width}
                        tooltipHtml={tooltipScatter}
                        tooltipContained ={true}
                        tooltipOffset ={{top: -18, left: 0}}
                        tooltipMode='element'
                        height={200}
                        yAxis={{label: "Percent %",tickValues: [0,0.2,0.4,0.6,0.8,1],tickFormat: (d)=> Math.floor(d*100)}}
                        xAxis={{tickFormat: (d)=> (d.endsWith(' 0')||(d.endsWith(' 12')))?d:d.substring(d.indexOf(' ')+1)}}
                        margin={{top: 10, bottom: 50, left: 50, right: 20}}/>
                </div>
            </div>
        );
    }
}


export default CSSModules(EventsOverTime, styles);
