import { MouseEventHandler } from "react";

type removeItem = (item: string) => MouseEventHandler<HTMLAnchorElement> | Promise<void> | undefined;
export type CardPropsT = {
  id: number;
  name: string;
  quantity?: number;
  removeItemFunc: removeItem;
};
