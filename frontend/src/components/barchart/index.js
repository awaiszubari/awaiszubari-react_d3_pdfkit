import React, { useState, useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { csv, arc, pie, scaleBand, scaleLinear, max } from 'd3';
import { useData } from './useData';
import { AxisBottom } from './axis_bottom';
import { AxisLeft } from './axis_left';
import { Marks } from './marks';

const width = 960;
const height = 500;
const margin = { top: 20, right: 20, bottom: 20, left: 200 };

const BarChart = (_data) => {
    const data = _data.data;

    console.log("test",data[0])
    // if (!data) {
    //     return <pre>Loading...</pre>;
    // }
    
    const innerHeight = height - margin.top - margin.bottom;
    const innerWidth = width - margin.left - margin.right;

    const yValue = d => d.Date;
    const xValue = d => d.temp;

    const yScale = scaleBand()
        .domain(data.map(yValue))
        .range([0, innerHeight]);

    const xScale = scaleLinear()
        .domain([0, max(data, xValue)])
        .range([0, innerWidth]);

    return (
        <svg width={width} height={height}>
            <g transform={`translate(${margin.left},${margin.top})`}>
                <AxisBottom xScale={xScale} innerHeight={innerHeight} />
                <AxisLeft yScale={yScale} />
                <Marks
                    data={data}
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
