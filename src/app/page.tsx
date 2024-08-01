"use client";
import AddIcon from "@mui/icons-material/Add";
import { firestore } from "@/firebase";
import { collection, getDocs, query } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { Camera } from "react-camera-pro";
import { classifyImageWithVision } from "@/utils/vision";
import Card from "./components/Card";
import Header from "./components/Header";
import { postItem } from "@/utils/functions";
import { ItemT } from "./types/common";

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
  const camera = useRef<any>(null);
  const [image, setImage] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [pantryList, setPantryList] = useState<ItemT[]>([]);

  const updatePantry = async () => {
    const snapshot = query(collection(firestore, "pantry"));
    const docs = await getDocs(snapshot);
    const pantryList: ItemT[] = [];
    docs.forEach((doc) => {
      pantryList.push({
        name: doc.id,
        quantity: doc.data().quantity,
        createdAt: doc.data().createdAt?.toDate(),
        updatedAt: doc.data().updatedAt,
      });
    });
    setPantryList(pantryList);
  };
  useEffect(() => {
    updatePantry();
  }, []);

  const addItem = async (item: string) => {
    postItem(item);
    updatePantry();

    // await firestore.collection("pantry").doc(item).set({})
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
              value={itemName}
              size="small"
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
              {/* </Stack> */}
            </Box>
          </Modal>
        </div>
      </div>

      <Header />
      {pantryList.length <= 0 ? (
        <div className="flex opacity-[0.9] w-2/4  justify-start mx-auto pl-8">
          <h1 className="text-sm text-button">
            Stock is empty, try adding a new product...
          </h1>
        </div>
      ) : (
        pantryList.map((item, index) => (
          <Card item={item} id={index} updatePantry={updatePantry()} />
        ))
      )}
    </div>
  );
}
