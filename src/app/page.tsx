"use client";
import AddIcon from "@mui/icons-material/Add";
import { firestore } from "@/firebase";
import { collection, getDocs, query } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { Camera } from "react-camera-pro";
import { classifyImageWithVision } from "@/utils/vision";
import Card from "./components/Card";
import Header from "./components/Header";
import { getPantryItems, postItem } from "@/utils/functions";
import { ItemT } from "./types/common";
import { useGetPantryItems } from "@/hooks/items";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  flexDirection: "column",
  gap: 3,
};

export default function Home() {
  const { pantryItems } = useGetPantryItems();
  const camera = useRef<any>(null);
  const [image, setImage] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState<string>("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [searchName, setSearchName] = useState<string>();
  const [filteredPantryList, setFilteredPantryList] = useState<ItemT[]>([]);

  useEffect(() => {
    if (Object.keys(pantryItems).length > 0) {
      setFilteredPantryList(pantryItems);
    }
  }, [pantryItems]);

  const addItem = async (item: string) => {
    postItem(item);
  };

  const handleCapture = async (photo: string) => {
    try {
      const itemName = await classifyImageWithVision(photo);
      if (itemName != "Unknown Item" && itemName != "undefined") {
        addItem(itemName);
        handleClose();
      }
    } catch (error) {
      console.error(`Error classifying image: ${error}`);
    }
  };

  const handleSearchChange = async (searchItem: string) => {
    setSearchName(searchItem);
    const results = pantryItems.filter((item) =>
      item.name.toLowerCase().includes(searchItem.toLowerCase())
    );
    setFilteredPantryList(results);
    // getPantryItems();
  };

  return (
    <div className=" flex flex-col p-4 p-12">
      <h1 className="text-justify mx-48 font-bold text-button text-xl">PT</h1>
      <div className="flex items-center justify-center justify-evenly mb-8">
        <h1 className="text-center uppercase">Pantry Items</h1>
        <div className="flex gap-4">
          <div className=" h-8">
            <TextField
              id="outlined-basic"
              label="Search"
              placeholder="Search by name"
              variant="outlined"
              value={searchName}
              size="small"
              onChange={(e) => {
                handleSearchChange(e.target.value);
              }}
            />
          </div>

          <Button
            variant="contained"
            style={{
              backgroundColor: "#F59C1F",
              gap: 4,
            }}
            onClick={handleOpen}
          >
            <AddIcon />
            Add Product
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
                Capture Item
              </Typography>
              <Camera
                ref={camera}
                errorMessages={{
                  noCameraAccessible: undefined,
                  permissionDenied: undefined,
                  switchCamera: undefined,
                  canvas: undefined,
                }}
                aspectRatio={4 / 3}
              />

              <Button
                variant="outlined"
                onClick={() => {
                  setImage(
                    camera.current != null && camera.current.takePhoto()
                  );
                  handleCapture(image);
                }}
                style={{
                  marginTop: "12px",
                  borderColor: "#F59C1F",
                  color: "#000000",
                  width: "10rem",
                }}
              >
                Add
              </Button>
            </Box>
          </Modal>
        </div>
      </div>

      <Header />
      {filteredPantryList.length <= 0 ? (
        <div className="flex opacity-[0.9] w-2/4  justify-start mx-auto pl-8">
          <h1 className="text-sm text-button">
            Stock is empty, try adding a new product...
          </h1>
        </div>
      ) : (
        filteredPantryList.map((item, index) => <Card item={item} id={index} />)
      )}
    </div>
  );
}
