import { firestore } from "@/firebase";
import {
    collection,
    deleteDoc,
    doc,
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
      await setDoc(docRef, {});
    //   updatePantry();
    }
    // await firestore.collection("pantry").doc(item).set({})
  };

  export const deleteItem = async(item: string) => {
    const docRef = doc(collection(firestore, "pantry"), item);
    await deleteDoc(docRef);
  }