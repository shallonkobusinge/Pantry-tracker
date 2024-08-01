"use client";
import AddIcon from "@mui/icons-material/Add";
import { firestore } from "@/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
} from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Camera } from "react-camera-pro";
import { classifyImageWithVision } from "@/utils/vision";
import Card from "./components/Card";
import Header from "./components/Header";
import { Search } from "@mui/icons-material";
import { deleteItem, postItem } from "@/utils/functions";

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
  const [pantryList, setPantryList] = useState<string[]>([]);

  const updatePantry = async () => {
    const snapshot = query(collection(firestore, "pantry"));
    const docs = await getDocs(snapshot);
    const pantryList: string[] = [];
    docs.forEach((doc) => {
      pantryList.push(doc.id);
    });
    setPantryList(pantryList);
    // console.log(pantryList);
  };
  useEffect(() => {
    updatePantry();
  }, []);

  const addItem = async (item: string) => {
    postItem(item);
    updatePantry();

    // await firestore.collection("pantry").doc(item).set({})
  };
  const removeItem = async (item: string) => {
    deleteItem(item);
    updatePantry();
  };

  const handleCapture = async (photo: string) => {
    try {
      const itemName = await classifyImageWithVision(photo);
      if (itemName != "Unknown Item") {
        console.log(`Item name: ${itemName}`);
        addItem(itemName);
      }
    } catch (error) {
      console.error(`Error classifying image: ${error}`);
    }
  };

  return (
    <div className=" flex flex-col p-4 bg-pageBg p-12">
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
              {/* <Stack width="100%" height="700px" direction={"row"} spacing={2}> */}
              {/* <TextField
              id="outlined-basic"
              label="Item"
              variant="outlined"
              fullWidth
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            /> */}
              {/* <div className="h-12 w-12"> */}
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
              {/* </div> */}

              <Button
                variant="outlined"
                onClick={() => {
                  setImage(
                    camera.current != null && camera.current.takePhoto()
                  );
                  // console.log(image);
                  handleCapture(image);
                  // addItem(itemName);
                  // setItemName("");
                  handleClose();
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
      {pantryList.map((item, index) => (
        <Card name={item} id={index} removeItemFunc={() => removeItem(item)} />
      ))}
    </div>

    // <div className=" ">
    //   <div className="items-center flex justify-center pt-10">
    //     <Button variant="contained" onClick={handleOpen}>
    //       Add
    //     </Button>
    //   </div>

    //   <Modal
    //     open={open}
    //     onClose={handleClose}
    //     aria-labelledby="modal-modal-title"
    //   >
    //     <Box sx={style}>
    //       <Typography
    //         id="modal-modal-title"
    //         variant="h6"
    //         component="h2"
    //         color={"black"}
    //       >
    //         Add Item
    //       </Typography>
    //       <Stack width="100%" height="700px" direction={"row"} spacing={2}>
    //         {/* <TextField
    //           id="outlined-basic"
    //           label="Item"
    //           variant="outlined"
    //           fullWidth
    //           value={itemName}
    //           onChange={(e) => setItemName(e.target.value)}
    //         /> */}
    //         <Camera
    //           ref={camera}
    //           errorMessages={{
    //             noCameraAccessible: undefined,
    //             permissionDenied: undefined,
    //             switchCamera: undefined,
    //             canvas: undefined,
    //           }}
    //         />
    //         <Button
    //           variant="outlined"
    //           onClick={() => {
    //             setImage(camera.current != null && camera.current.takePhoto());
    //             // console.log(image);
    //             handleCapture(image);
    //             // addItem(itemName);
    //             // setItemName("");
    //             handleClose();
    //           }}
    //         >
    //           Add
    //         </Button>
    //       </Stack>
    //     </Box>
    //   </Modal>
    //   <Typography variant={"h2"} color={"#333"} textAlign={"center"}>
    //     Pantry Items
    //   </Typography>
    //   <Stack width="800px" height="300px" spacing={2} overflow={"auto"}>
    //     {pantryList.map((item) => (
    //       <Box
    //         key={item}
    //         width="100%"
    //         minHeight="150px"
    //         display={"flex"}
    //         justifyContent={"space-between"}
    //         padding={2}
    //         alignItems={"center"}
    //         bgcolor={"#f0f0f0"}
    //         paddingX={5}
    //       >
    //         <Typography variant={"h3"} color={"#333"} textAlign={"center"}>
    //           {item}
    //         </Typography>
    //         <Button variant="contained" onClick={() => removeItem(item)}>
    //           Remove
    //         </Button>
    //       </Box>

    //       // <div
    //       //   className="flex flex-row justify-center items-center mx-auto pt-10 "
    //       //   key={item}
    //       // >
    //       //   <h1>{item}</h1>
    //       // </div>
    //     ))}
    //   </Stack>
    // </div>
  );
}
