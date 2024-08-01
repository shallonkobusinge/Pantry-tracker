import { Timestamp } from "firebase/firestore";
import { JSXElementConstructor, MouseEventHandler, ReactElement, ReactNode, ReactPortal } from "react";

export type ItemT = {
  name: string;
  quantity: number;
  createdAt: string | number | bigint | boolean | Timestamp | Date | ReactElement<any, string | JSXElementConstructor<any>> | ReactPortal ;
  updatedAt?: Timestamp | Date | string | number;
};

type removeItem = (
  item: string
) => MouseEventHandler<HTMLAnchorElement> | Promise<void> | undefined;

export type CardPropsT = {
  id: number;
  item: ItemT;
  updatePantry: Promise<void>;
};
