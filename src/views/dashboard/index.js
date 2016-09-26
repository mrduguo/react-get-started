import React, {Component} from "react";
import CSSModules from "react-css-modules";
import styles from "./Dashboard.scss";
import {LineTooltip,SimpleTooltip} from 'react-d3-tooltip';
import D3  from 'd3';
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
    data = D3.range(n).map(index=>{
        return{index:index,age:random()}
    });


class Dashboard extends React.Component {
    constructor(props){
        super(props);
        console.log(props);
        console.log(this);
        var _this=this;
        setInterval(function() {
            seq++;
            data.shift();
            data.push({index: n+seq, age: random()})
            _this.setState({data: data});
        },1000);
    }
    state = {
        width: 600,
        height: 400,
        series: chartSeries,
        data: data,
    };

    onClick=()=>{
        this.setState({
            width: this.state.width === 600? 400: 600,
            height: this.state.width === 600? 600: 400,
            series: this.state.width === 600? [
                {
                    field: 'age',
                    name: 'Age',
                    color: 'blue'
                }
            ]: chartSeries
        })

    }


    render() {
        return (
            <div>
                <button onClick={this.onClick}>toggle</button>
                <LineTooltip
                    width= {this.state.width}
                    height= {this.state.height}
                    data= {this.state.data}
                    chartSeries= {this.state.series}
                    x= {x}
                >
                    <SimpleTooltip/>
                </LineTooltip>
            </div>
        );
    }
}

export default CSSModules(Dashboard, styles);
