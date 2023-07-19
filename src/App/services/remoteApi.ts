import { doc, setDoc, getDoc } from "firebase/firestore"; 
import { db } from "../../firebase";
import { ICurrencies, IProfitTables } from "../shareTypes";

interface IUserData {
  email: string,
  currencies: ICurrencies,
  profitTables: IProfitTables
}

export const remoteApi = {
  getUserData: async (id: string) => {
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);

    const downloadedData = docSnap.data();
    return downloadedData as IUserData;
  },
  updateUserData: async (id: string, email: string) => {
    const localCurrencies = JSON.parse(localStorage.getItem('currencies') as string) as ICurrencies || {};
    const localProfitTables = JSON.parse(localStorage.getItem('profitTables') as string) as IProfitTables || {};

    const data: IUserData = {
      currencies: {...localCurrencies},
      email: email,
      profitTables: {...localProfitTables}
    };

    await setDoc(doc(db, "users", id), data);
  }
}