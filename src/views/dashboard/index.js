import React, {Component} from "react";
import CSSModules from "react-css-modules";
import styles from "./Dashboard.scss";
import {LineTooltip,SimpleTooltip} from 'react-d3-tooltip';
import d3  from 'd3';
import ChartRealTime   from './ChartRealTime';
import {randomNormal as D3RandomNormal} from 'd3-random';
import generalChartData from './user.json'
// var generalChartData2 = require('json!./user.json');

var seq = 0;
var chartSeries = [
        {
            field: 'age',
            name: 'Age',
            color: '#ff7f0e'
        }
    ],
    x = function(d) {
        return d.index-seq;
    }

var n = 40,
    random = D3RandomNormal(0, 0.2),
    data = d3.range(n).map(index=>{
        return{index:index,age:Math.random() * 100}
    });


class Dashboard extends React.Component {
    render() {
        var width=window.innerWidth;
        return (
            <div>
                <ChartRealTime width={width}/>
                <LineTooltip
                    width= {width}
                    height= {400}
                    data= {data}
                    chartSeries= {chartSeries}
                    x= {x}
                >
                    <SimpleTooltip/>
                </LineTooltip>
            </div>
        );
    }
}

export default CSSModules(Dashboard, styles);
