export const averagePrice = (listOfPurchase) => {
  // const sum = listOfPurchase.reduce(
  //   (acc, currency) => acc + Number(currency.price),
  //   0
  // );
  // totalCosts(listOfPurchase)
  // totalQuantity(listOfPurchase)
  return parseFloat((totalCosts(listOfPurchase) / totalQuantity(listOfPurchase)).toFixed(4));
};

export const totalQuantity = (listOfPurchase) => {
  return listOfPurchase.reduce(
    (acc, currency) => acc + Number(currency.quantity),
    0
  );
};

export const totalCosts = (listOfPurchase) => {
  const arrOfCosts = listOfPurchase
    .map((currency) => currency.price * currency.quantity)
    .reduce((acc, cost) => acc + cost, 0);
  return parseFloat(arrOfCosts.toFixed(4));
};
