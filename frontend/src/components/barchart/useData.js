import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';
import { csv} from 'd3';

// import csv_data from '../../assets/data.csv';

const csvUrl = 'https://gist.githubusercontent.com/awaiszubari/c5f4924ba25cb2f53528165120a3d616/raw/68dbcc3b6d36555df41e27d93b56be9133cd18d6/awa_horti_gist.csv';

export const useData = () => {
    const [data, setData] = useState(null);
    useEffect(() => {
        const row = d => {
            d.temp = +d['Temperature_137522'];
            return d;
        };
        csv(csvUrl,row).then(data => {
            setData(data.slice(0, 10));
        });
        // csv(csvUrl).then(data => {
        //     // setData(data.slice(0, 10));
        // });
    }, []);
            console.log(data);

    return data;
};