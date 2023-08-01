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
import Select, { GroupBase, OptionsOrGroups } from 'react-select';
import { Box } from '@mui/material';
import { IPurchase } from '../../../../../shareTypes';



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
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Line Chart',
    },
  },
};

type OptionType = { label: string, value: string };

type OptionsType = Array<OptionType>;

interface ICurrencyLineChartProps {
  listOfPurchases: IPurchase[],
}


export const CurrencyLineChart: React.FC<ICurrencyLineChartProps> = ({ listOfPurchases }) => {
  const inputLabels = listOfPurchases.map(el => new Date(el.date).toLocaleDateString("ru-RU"));
  const inputData = listOfPurchases.map(el => el.price);

  console.log('input---------', inputData);
  
  const [chartData, setChartData] = useState(inputData);
  // there is a problem after addition new value in chart it did not update 
  console.log('chart-----', chartData);
  
  const selectOptions: OptionsType = [
    { value: 'price', label: 'Price' },
    { value: 'quantity', label: 'Quantity' },
    { value: 'costs', label: 'Costs' },
  ];


  const handleSelectChange = (newValue: unknown) => {
    const data = newValue as OptionType;
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
          onChange={(newValue: unknown) => handleSelectChange(newValue)}
          options={selectOptions as OptionsOrGroups<unknown, GroupBase<unknown>>}
        />
      </Box>
      <Line options={options} data={data} />
    </>
  )
};

