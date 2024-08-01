import { MouseEventHandler } from "react";

export type ItemT = {
  name: string;
  quantity: number;
};

type removeItem = (
  item: string
) => MouseEventHandler<HTMLAnchorElement> | Promise<void> | undefined;
export type CardPropsT = {
  id: number;
  item: ItemT;
  removeItemFunc: removeItem;
};
