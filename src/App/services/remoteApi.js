import { doc, setDoc, getDoc } from "firebase/firestore"; 
import { db } from "../../firebase";

export const remoteApi = {
  getUserData: async (id) => {
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);

    const downloadedData = docSnap.data();
    return downloadedData;
  },
  updateUserData: async (id, email) => {
    const localCurrencies = JSON.parse(localStorage.getItem('currencies')) || {};
    const localProfitTables = JSON.parse(localStorage.getItem('profitTables')) || {};

    const data = {
      currencies: {...localCurrencies},
      email: email,
      profitTables: {...localProfitTables}
    };

    await setDoc(doc(db, "users", id), data);
  }
}