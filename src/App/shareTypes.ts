

export interface IPurchase {
  date: number,
  id: string,
  price: number,
  quantity: number
}

export interface ICurrency {
  id: string,
  listOfPurchases: IPurchase[],
  name: string
}

export interface ICurrencies {
  [key: string]: ICurrency;
}

export interface IRowOfProfitTable {
  coinName: string,
  entryPrice: number, 
  rowId: string,
  exitPrice: number,
  sl: number,
  by: number,
  tp1: number,
  tp2: number,
  tp3: number
}

export interface IProfitTable {
  table: IRowOfProfitTable[],
  date: number,
  name: string
}

export interface IProfitTables {
  [key: string]: IProfitTable
}