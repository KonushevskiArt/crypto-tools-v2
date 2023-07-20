import React from 'react';
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import {
  averagePrice,
  totalCosts,
  totalQuantity,
} from "../../../../Utils/calculations";
import { ICurrencies } from '../../../../shareTypes';

interface IAdditionalInfoProps {
  currencies: ICurrencies,
  currencyId: string
}

const AdditionalInfo: React.FC<IAdditionalInfoProps> = ({ currencies, currencyId }) => {
  const listOfPurchase = currencies[currencyId].listOfPurchases;
  
  return (
    <Box
      sx={{
        border: "1px solid black",
        padding: "5px 20px",
        borderRadius: "10px",
        marginRight: "40px",
      }}
    >
      <Typography
        sx={{
          borderRight: "1px solid black",
          marginRight: "20px",
          paddingRight: "20px",
        }}
        component="span"
      >
        {averagePrice(listOfPurchase) || 0}
      </Typography>
      <Typography
        sx={{
          borderRight: "1px solid black",
          marginRight: "20px",
          paddingRight: "20px",
        }}
        component="span"
      >
        {totalQuantity(listOfPurchase) || 0}
      </Typography>
      <Typography component="span">
        {totalCosts(listOfPurchase) || 0}
      </Typography>
    </Box>
  );
};

export default AdditionalInfo;