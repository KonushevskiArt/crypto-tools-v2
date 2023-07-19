import { IPurchase } from "../shareTypes";

export const averagePrice = (listOfPurchase: IPurchase[]) => {
  return parseFloat((totalCosts(listOfPurchase) / totalQuantity(listOfPurchase)).toFixed(4));
};

export const totalQuantity = (listOfPurchase: IPurchase[]) => {
  return listOfPurchase.reduce(
    (acc, currency) => acc + Number(currency.quantity),
    0
  );
};

export const totalCosts = (listOfPurchase: IPurchase[]) => {
  const arrOfCosts = listOfPurchase
    .map((currency) => currency.price * currency.quantity)
    .reduce((acc, cost) => acc + cost, 0);
  return parseFloat(arrOfCosts.toFixed(4));
};
