import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import Select from 'react-select';
import { Box } from '@mui/material';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Line Chart',
    },
  },
};


export const CurrencyLineChart = ({ listOfPurchases }) => {
  const inputLabels = listOfPurchases.map(el => new Date(el.date).toLocaleDateString("ru-RU"));
  const inputData = listOfPurchases.map(el => el.price);

  const [chartData, setChartData] = useState(inputData);
  
  
  const selectOptions = [
    { value: 'price', label: 'Price' },
    { value: 'quantity', label: 'Quantity' },
    { value: 'costs', label: 'Costs' },
  ];

  const handleSelectChange = (data) => {
    setSelectedOption(data.label);
    if (data.value === 'price') {
      setChartData(listOfPurchases.map(el => el.price));
    }
    if (data.value === 'quantity') {
      setChartData(listOfPurchases.map(el => el.quantity));
    }
    if (data.value === 'costs') {
      setChartData(listOfPurchases.map(el => parseFloat((el.price * el.quantity).toFixed(4))));
    }
  }
  

  const [selectedOption, setSelectedOption] = useState(selectOptions[0].label);


  const data = {
    labels: inputLabels,
    datasets: [
      {
        label: selectedOption,
        data: chartData,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return (
    <>
      <Box sx={{width: '150px', pl: '20px', pt: '20px'}}>
        <Select
          defaultValue={selectedOption}
          onChange={handleSelectChange}
          options={selectOptions}
        />
      </Box>
      <Line options={options} data={data} />
    </>
  )
};

