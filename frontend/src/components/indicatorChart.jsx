import {useEffect, useState} from "react";
import {Line} from 'react-chartjs-2';
import { Chart, LinearScale, CategoryScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register the required components
Chart.register(LinearScale, CategoryScale, PointElement, LineElement, Title, Tooltip, Legend);


const IndicatorChart = ({ indicator}) => {
  const [chartData, setChartData] = useState(null);

  const setIndicatorData = async (indicatorKey) =>
  {
    const response = await fetch('http://localhost:8000/indicators/' + indicatorKey);
    const data = await response.json();

    const allYears = Array.from(new Set(Object.values(data).flatMap(country => country.Year))).sort();

    const datasets = Object.keys(data).map(country => {
        const countryData = data[country];
        const yearValueMap = new Map(countryData.Year.map((year, i) => [year, countryData.Value[i]]));

        return {
            label: country,
            data: allYears.map(year => yearValueMap.get(year) || null), // Fills gaps with null
            fill: false,
            tension: 0.1
        };
    });
    console.log('datasets', datasets);
    console.log('allYears', allYears);
    setChartData({
      labels: allYears,
      datasets: datasets
    })
  }

  useEffect(() => {
    setIndicatorData(indicator);
  }, [indicator]);

  const options = {
    responsive: true,
    scales: {
        y: {
            beginAtZero: true
        }
    }
  };


  return (
    <div className="App">
      {chartData && <Line key={indicator} data={chartData} options={options} />}
    </div>
  );
}

export default IndicatorChart;