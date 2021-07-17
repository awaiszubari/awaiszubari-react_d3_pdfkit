import React, { useState, useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { csv, arc, pie, scaleBand, scaleLinear, scaleTime, max, timeParse, extent } from 'd3';
import { useData } from './useData';
import { AxisBottom } from './axis_bottom';
import { AxisLeft } from './axis_left';
import { Marks } from './marks';
// import * as d3 from 'd3';
import moment from 'moment';

const width = 960;
const height = 500;
const margin = { top: 20, right: 40, bottom: 65, left: 220 };
const xAxisLabelOffset = 50;

const BarChart = (props) => {
    const _data = props.data;
    var dates = [];
    console.log("d2", _data);

    const yValue = d => d.Date;
    const xValue = d => d.signal_one;
    if (_data.length === 0) {
        return <div className="text-center"><h3>No Data Available</h3></div>;
      }
    var parseTime = timeParse("%b %d, %Y");
    // const formatted_dates = ["2021-05-13", "2021-05-14", "2021-05-15", "2021-05-16", "2021-05-17", "2021-05-18"]
    // var maxVal = 0;
    // for (let dateObj of formatted_dates) {
    //     console.log("d2", dateObj);

    //     for (let obj of _data) {
    //         // console.log("d1",obj.Date);
    //         // console.log("d2",dateObj);
    //         var d1 = Date.parse(moment(obj.Date).format("YYYY-MM-DD"));
    //         var d2 = Date.parse(dateObj);
    //         // console.log("d1", d1);
    //         // console.log("d2", d2);
    //         if (d1 === d2) {

    //             if (maxVal < parseInt(obj.signal_one)) {
    //                 maxVal = parseInt(obj.signal_one);
    //             }

    //             // dates.push(xValue);
    //         }
    //     }
    //     dates.push(maxVal);
    //     maxVal = 0;
    // }



    // console.log("dates", dates);

    // const dateBegin = moment(props.dateBegin).format("YYYY-MM-DD HH:mm");
    // const dateEnd = moment(props.dateEnd).format("YYYY-MM-DD HH:mm");
    // console.log("startDate", dateBegin);
    // console.log("endDate", dateEnd);
    // if (!data) {
    //     return <pre>Loading...</pre>;
    // }
    // var domain = extent(dates);
    // console.log("domain", domain);
    const innerHeight = height - margin.top - margin.bottom;
    const innerWidth = width - margin.left - margin.right;


    const yScale = scaleBand()
        .domain(props.formattedDates)
        .range([0, innerHeight])
        .paddingInner(0.1);

    const xScale = scaleLinear()
        .domain([0, max(_data, xValue)])
        .range([0, innerWidth]);
    // max(formattedData, function(d) { return d.y; });
    return (
        <svg width={width} height={height}>
            <g transform={`translate(${margin.left},${margin.top})`}>
                <AxisBottom xScale={xScale} innerHeight={innerHeight} />
                <AxisLeft yScale={yScale} />
                <text
                    className="axis-label"
                    x={innerWidth / 2}
                    y={innerHeight + xAxisLabelOffset}
                    textAnchor="middle"
                >
                    Signals
                </text>
                <Marks
                    data={_data}
                    xScale={xScale}
                    yScale={yScale}
                    xValue={xValue}
                    yValue={yValue}
                />
            </g>
        </svg>
    );
};
export default BarChart;
