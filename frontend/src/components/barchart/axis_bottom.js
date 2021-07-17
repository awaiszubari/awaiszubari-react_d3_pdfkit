import * as d3 from 'd3';

export const AxisBottom = ({ xScale, innerHeight }) =>
  xScale.ticks().map(tickValue => (
    <g  className="tick" key={tickValue} transform={`translate(${xScale(tickValue)},0)`}>
      <line y2={innerHeight} stroke="grey" />
      <text style={{ textAnchor: 'middle' }} dy=".71em" y={innerHeight + 3}>
        {tickValue}
      </text>
    </g>
  ));