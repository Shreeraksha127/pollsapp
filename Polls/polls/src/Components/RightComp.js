import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';

function RightComp({ questionNumber }) {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchData();
  }, [questionNumber]);

  const fetchData = () => {
    const apiUrl = `http://192.168.141.35:8000/polls/api5/polls/${questionNumber}/`;
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        processChartData(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const processChartData = data => {
    const { OptionVote } = data;
    const chartData = [['Choice', 'Votes'], ...Object.entries(OptionVote)];
    setChartData(chartData);
  };

  const chartOptions = {
    chartArea: { width: '100%', height: '100%' },
  };

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: '1', marginLeft: '550px',marginTop: '50px' }}>
        {chartData.length > 0 ? (
          <Chart chartType="PieChart" data={chartData} options={chartOptions} />
        ) : (
          <p>Loading chart...</p>
        )}
      </div>
      <div style={{ flex: '1' }}>
       
        
        
      </div>
      
    </div>
   
  );
}

export default RightComp;
