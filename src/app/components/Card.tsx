import React from "react";
import { CardPropsT } from "../types/common";
import { Button } from "@mui/material";

export default function Card({ id, name, quantity }: CardPropsT) {
  return (
    <div className="flex bg-white w-2/4 rounded-md justify-center gap-3 justify-around items-center mx-auto h-16 mb-3">
      <h1>{`${id + 1}`}</h1>
      <h1 className="w-1/3">{name}</h1>
      <h1>{quantity ? quantity : 12}</h1>
      <div className="flex gap-4">
        <Button
          variant="outlined"
          style={{
            borderColor: "#F59C1F",
            color: "#000000",
          }}
        >
          Edit
        </Button>
        <Button
          variant="contained"
          style={{
            backgroundColor: "#F59C1F",
          }}
        >
          Remove
        </Button>
      </div>
    </div>
  );
}
