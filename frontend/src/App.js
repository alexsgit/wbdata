import './App.css';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import IndicatorChart from './components/indicatorChart';
import {useEffect, useState} from "react";

const getIndicators = () => {
  return fetch('http://localhost:8000/indicators')
    .then(response => response.json());
}


function App() {
  const [indicators, setIndicators] = useState([]);
  const [key, setKey] = useState(0);
  useEffect(() => {
    getIndicators().then(setIndicators);
  }, []);


  return (
    <div className="App">
      <h1>Indicator Charts</h1>
       <Tabs
        defaultActiveKey="profile"
        id="uncontrolled-tab-example"
        className="mb-3"
        activeKey={key}
        onSelect={(k) => setKey(k)}
      >
         {indicators.map((indicator, idx) => {
        return (
          <Tab eventKey={idx} title={indicator}>
            <IndicatorChart indicator={indicator} />
          </Tab>
        );
      })}
    </Tabs>
    </div>
  );
}

export default App;
