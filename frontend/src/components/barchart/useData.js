import React, { useState, useEffect } from 'react';
import { csv } from 'd3';
import moment from 'moment';

// import csv_data from '../../assets/data.csv';

const csvUrl = 'https://gist.githubusercontent.com/awaiszubari/c5f4924ba25cb2f53528165120a3d616/raw/68dbcc3b6d36555df41e27d93b56be9133cd18d6/awa_horti_gist.csv';

export const useData = () => {
    const [data, setData] = useState(null);
    useEffect(() => {
        const row = d => {
            d.signal_one = +d['Signal_137522'];
            d.temperature_one = +d['Temperature_137522'];
            d.humitidy_one = +d['Humitidy_137522'];
            d.carbondioxide_one = +d['CarbonDioxide_137522'];
            d.signal_two = +d['Signal_2'];
            d.temperature_two = +d['Temperature_2'];
            d.humitidy_two = +d['Humitidy_2'];
            d.carbondioxide_two = +d['CarbonDioxide_2'];
            d.date_d = moment(d['Date']).format("YYYY-MM-DD");
            return d;
        };
        csv(csvUrl, row).then(data => {
            setData(data);
        });
        // csv(csvUrl).then(data => {
        //     // setData(data.slice(0, 10));
        // });
    }, []);
    return data;
};