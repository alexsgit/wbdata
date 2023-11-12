import './App.css';
import IndicatorChart from './components/indicatorChart';

function App() {
  return (
    <div className="App">
      <h1>Indicator Chart</h1>
      <IndicatorChart indicator="BX.KLT.DINV.CD.WD" />
    </div>
  );
}

export default App;
