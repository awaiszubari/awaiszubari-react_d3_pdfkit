import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import BarChart from './components/barchart/index.js';
import { useData } from './components/barchart/useData';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import moment from 'moment';
const yValue = "date_d";
const xValue = "signal_one";

function App() {
  const data = useData();
  const [_data, setDData] = useState([]);
  const [dateBegin, setDateBegin] = useState(new Date())
  const [dateEnd, setDateEnd] = useState(new Date())
  // const formatted_dates = ["2021-05-10", "2021-05-11", "2021-05-12", "2021-05-13", "2021-05-14", "2021-05-15"]
  const [formatted_dates, setFormattedDates] = useState([]);

  useEffect(() => {
    // setDData([]);
  }, [data]);

  const handleChange = (item) => {
    setState([item.selection]);
    const s_date = moment(item.selection.startDate).format("YYYY-MM-DD HH:mm");
    const e_date = moment(item.selection.endDate).format("YYYY-MM-DD HH:mm");
    setDateBegin(s_date);
    setDateEnd(e_date);

    console.log("s_date", dateBegin);
    console.log("e_date", dateEnd);
    if(s_date && e_date){
      filterData(s_date, e_date);
    }
    
  }

  const isDateInArray = (needle, haystack) => {
    for (var i = 0; i < haystack.length; i++) {
      if (Date.parse(needle) === Date.parse(haystack[i])) {
        return true;
      }
    }
    return false;
  }

  const uniqueArray = (array) => {
    var output = [], l = array.length, i;
    console.log("test", array.length);
    for (i = 0; i < l; i++) {
      if (!isDateInArray(array[i].date_d, output)) {
        output.push(array[i].date_d);
      }
    }
    return output;

  }
  const filterDataByDate = (res) => {

    const unique = uniqueArray(res);
    setFormattedDates(unique);
    console.log("uni", unique);
    var maxVal = 0;
    let arr = [];
    let ob = null;
    for (let dateObj of unique) {
      console.log("d2", dateObj);

      for (let obj of res) {
        // console.log("d1",obj.Date);
        // console.log("d2",dateObj);
        var d1 = Date.parse(moment(obj.Date).format("YYYY-MM-DD"));
        var d2 = Date.parse(dateObj);
        // console.log("d1", d1);
        // console.log("d2", d2);
        if (d1 === d2) {

          if (maxVal < parseInt(obj.signal_one)) {
            maxVal = parseInt(obj.signal_one);
            ob = { Date: dateObj, signal_one: obj.signal_one };
          }

          // dates.push(xValue);
        }
      }
      if (ob) {
        arr.push(ob);
      }
      ob = null;
      maxVal = 0;
    }
    setDData([]);

    console.log(arr);
    setDData(arr);
  }

  const filterData = (fromDate, toDate) => {
    const all_data = (data && data.length > 0) ? data : [];
    let res = all_data.filter((item) => (new Date(item.Date)).getTime() > (new Date(fromDate)).getTime() && new Date(item.Date).getTime() < new Date(toDate).getTime());

    filterDataByDate(res)
  }

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);
  if (!data) {
    return <div className="text-center mt-5"><h3>Loading ...</h3></div>;  } else {
    return (
      <div >
        {/* {loadChart(_data)} */}
        <div className="row mt-4 mb-4  text-center">
          <div className="col-12 col-md-12"><div className="page-header">
            <h1>
              Horti Dashboard
              {/* <small>Subtext for header</small> */}
            </h1>
          </div>
          </div>
        </div>
        <div className="row">
          <div className="col-6 col-md-4">
            <DateRangePicker
              onChange={handleChange}
              ranges={state}
            />
          </div>
          <div className="col-12 col-md-8">
            <BarChart data={_data} dateBegin={dateBegin} dateEnd={dateEnd} formattedDates={formatted_dates} />

          </div>

        </div>
      </div>

    );
  }
}

export default App;
