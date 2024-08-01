import { firestore } from "@/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";

export const getPantryItems = async () => {
  const snapshot = query(collection(firestore, "pantry"));
  const docs = await getDocs(snapshot);
  const pantryList: string[] = [];
  docs.forEach((doc) => {
    pantryList.push(doc.id);
  });
  return pantryList;
};

export const postItem = async (item: string) => {
  if (item) {
    const docRef = doc(collection(firestore, "pantry"), item);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { quantity, createdAt } = docSnap.data();
      await setDoc(docRef, {
        quantity: quantity + 1,
        createdAt: createdAt,
        updatedAt: serverTimestamp(),
      });
    } else {
      await setDoc(docRef, { quantity: 1, createdAt: serverTimestamp() });
    }
  }
  // await firestore.collection("pantry").doc(item).set({})
};

export const deleteItem = async (item: string) => {
  const docRef = doc(collection(firestore, "pantry"), item);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const { quantity } = docSnap.data();
    if (quantity === 1 || quantity == "NaN") {
      await deleteDoc(docRef);
    } else {
      const { quantity, createdAt } = docSnap.data();
      await setDoc(docRef, { quantity: quantity - 1, createdAt: createdAt });
    }
  }
};

export const putItem = async (item: string, newQuantity: number) => {
  const docRef = doc(collection(firestore, "pantry"), item);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const { createdAt } = docSnap.data();
    await updateDoc(docRef, {
      quantity: newQuantity,
      createdAt: createdAt,
      updatedAt: serverTimestamp(),
    });
  }
};
