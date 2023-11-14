import {useEffect, useState} from "react";
import {Line} from 'react-chartjs-2';
import {Chart, LinearScale, CategoryScale, PointElement, LineElement, Title, Tooltip, Legend} from 'chart.js';

// Register the required components
Chart.register(LinearScale, CategoryScale, PointElement, LineElement, Title, Tooltip, Legend);

function getRandomColor() {
  // Generate a random color. You might want to replace this with a predefined set of colors
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const IndicatorChart = ({indicator, indicatorName}) => {
  const [chartData, setChartData] = useState(null);

  const setIndicatorData = async (indicatorKey) => {
    const response = await fetch(process.env.REACT_APP_BACKEND_URL + '/indicators/' + indicatorKey);
    const data = await response.json();
    const historicalData = data.historical_data;
    const predictedData = data.predicted_data;

    const allYears = Array.from(
      new Set([].concat(
        ...Object.values(historicalData).map(country => country.Year),
        ...Object.values(predictedData).map(country => country.Year)))
    ).sort();


    console.log(allYears);

    const datasets = Object.keys(historicalData).flatMap(country => {
      const countryData = historicalData[country];
      const predictedCountryData = predictedData[country];

      const color = getRandomColor(); // Use the same color for both historical and predicted data

      const historicalYearValueMap = new Map(countryData.Year.map((year, i) => [year, countryData.Value[i]]));
      const predictedYearValueMap = new Map(predictedCountryData.Year.map((year, i) => [year, predictedCountryData.Value[i]]));

      const historicalDataset = {
        label: country + ' - Historical',
        data: allYears.map(year => historicalYearValueMap.get(year) || null),
        fill: false,
        borderColor: color,
        tension: 0.1,
        pointRadius: 2,
        pointHoverRadius: 4,
      };

      const predictedDataset = {
        label: country + ' - Predicted',
        data: allYears.map(year => predictedYearValueMap.get(year) || null),
        fill: false,
        borderColor: color,
        borderDash: [5, 5],
        tension: 0.1,
        pointRadius: 2,
        pointHoverRadius: 4,
        pointBackgroundColor: 'rgba(0, 0, 0, 0)',
      };

      return [historicalDataset, predictedDataset];
    });

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
    <div className="chart-container">
      <h3>{indicatorName}</h3>
      {chartData && <Line key={indicator} data={chartData} options={options}/>}
    </div>
  );
}

export default IndicatorChart;