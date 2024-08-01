import { ItemT } from "@/app/types/common";
import { firestore } from "@/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
} from "firebase/firestore";

export const getPantryItems = async () => {
  const snapshot = query(collection(firestore, "pantry"));
  const docs = await getDocs(snapshot);
  const pantryList: string[] = [];
  docs.forEach((doc) => {
    // console.log(doc.id, doc.data());
    pantryList.push(doc.id);
  });

  return pantryList;
  // console.log(pantryList);
};

export const postItem = async (item: string) => {
  if (item) {
    const docRef = doc(collection(firestore, "pantry"), item);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      await setDoc(docRef, { quantity: quantity + 1 });
    } else {
      await setDoc(docRef, { quantity: 1 });
    }
  }
  // await firestore.collection("pantry").doc(item).set({})
};

export const deleteItem = async (item: string) => {
  const docRef = doc(collection(firestore, "pantry"), item);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const { quantity } = docSnap.data();
    if (quantity === 1 || quantity == 'NaN') {
      await deleteDoc(docRef);
    } else {
      await setDoc(docRef, { quantity: quantity - 1 });
    }
  }
};
