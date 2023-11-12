import './App.css';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

function App() {

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Sales for 2023 (M)',
        data: [3, 2, 2, 1, 5, 4],
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <div className="App">
      <Line data={data} options={options} />
    </div>
  );
}

export default App;
