import { ItemT } from "@/app/types/common";
import { getPantryItems } from "@/utils/functions";
import { useEffect, useState } from "react";

export const useGetPantryItems = () => {
  const [pantryItems, setPantryItems] = useState<ItemT[]>([]);

  useEffect(() => {
    const getItems = async () => {
      setPantryItems(await getPantryItems());
    };
    getItems();
  }, []);
  return { pantryItems };
};
