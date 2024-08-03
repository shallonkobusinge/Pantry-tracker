import React, { useState } from "react";
import { CardPropsT } from "../types/common";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { deleteItem, putItem } from "@/utils/functions";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  flexDirection: "column",
  gap: 3,
  height: 400,
};

export default function Card({ id, item }: CardPropsT) {
  const removeItem = async (item: string) => {
    deleteItem(item);
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [newQuantity, setNewQuantity] = useState<number>(item.quantity);

  const updateItem = async (item: string, quantity: number) => {
    putItem(item, quantity);
    handleClose();
  };
  return (
    <div className="flex bg-white w-8/12 rounded-md justify-center gap-3 justify-around items-center mx-auto h-16 mb-3">
      <h1>{`${id + 1}`}</h1>
      <h1 className="w-1/3">{item.name}</h1>
      <h1>{item.quantity}</h1>

      <h1> {item.createdAt?.toLocaleString()}</h1>
      <div className="flex gap-4">
        <Button
          variant="outlined"
          style={{
            borderColor: "#F59C1F",
            color: "#000000",
          }}
          onClick={handleOpen}
        >
          Edit
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          sx={{ border: "none", borderRadius: "10px", outline: "none" }}
          disableAutoFocus={true}
        >
          <Box sx={style}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              color={"black"}
            >
              Update Item
            </Typography>
            <TextField
              id="outlined-basic"
              label="Item Name"
              variant="outlined"
              fullWidth
              value={item.name}
              style={{ marginTop: "20px" }}
              disabled
            />
            <TextField
              id="outlined-basic"
              label="Item Quantity"
              variant="outlined"
              type="number"
              fullWidth
              value={newQuantity}
              style={{ marginTop: "30px" }}
              onChange={(e) => setNewQuantity(parseInt(e.target.value))}
            />
            <Button
              variant="contained"
              style={{
                marginTop: "15px",
                backgroundColor: "#F59C1F",
                color: "#FFFFFF",
                width: "10rem",
              }}
              onClick={() => {
                updateItem(item.name, newQuantity);
              }}
            >
              Update
            </Button>
          </Box>
        </Modal>
        <Button
          variant="contained"
          style={{
            backgroundColor: "#F59C1F",
          }}
          onClick={() => removeItem(item.name)}
        >
          Remove
        </Button>
      </div>
    </div>
  );
}
