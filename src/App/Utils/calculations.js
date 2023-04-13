export const averagePrice = (currencyData) => {
  const sum = currencyData.reduce(
    (acc, currency) => acc + Number(currency.price),
    0
  );
  return parseFloat((sum / currencyData.length).toFixed(4));
};

export const totalQuantity = (currencyData) => {
  return currencyData.reduce(
    (acc, currency) => acc + Number(currency.quantity),
    0
  );
};

export const totalCosts = (currencyData) => {
  const arrOfCosts = currencyData
    .map((currency) => currency.price * currency.quantity)
    .reduce((acc, cost) => acc + cost, 0);
  return parseFloat(arrOfCosts.toFixed(4));
};
