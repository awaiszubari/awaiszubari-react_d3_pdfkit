import logo from './logo.svg';
import './App.css';
import BarChart from './components/barchart/index.js';
import { useData } from './components/barchart/useData';

function App() {
  const data = useData();

  if (!data) {
    return <pre>Loading...</pre>;
  } else {
    return (
      <div>
        {/* {loadChart(data)} */}
         <BarChart data={data} />
      </div>

    );
  }
}

export default App;
