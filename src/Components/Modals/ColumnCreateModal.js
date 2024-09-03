import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "./index.css";
import SecondaryBtn from "../Buttons/SecondaryButton";
import PurpleBtn from "../Buttons/PurpleButton";
import { uuid } from "uuidv4";
import { CircularProgress } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,

  bgcolor: "background.paper",
  //   border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
  outline: "none",
  border: "none",
};

export default function AddNewColumnModal({
  open,
  setOpen,
  handleClose,
  handleOpen,
  addNewColumn,
  setColumnCreationLoading,
  columnCreationLoading,
}) {
  const [userInput, setUserInput] = useState({
    title: "",
  });

  const [error, setError] = useState({
    title: "",
  });

  const validateInput = () => {
    let isValid = true;
    setError({ title: "" });

    if (userInput.title.trim() === "") {
      setError({ title: "Title is required" });
      isValid = false;
    }
    return isValid;
  };

  const handleAddItemToRowCreation = () => {
    console.log("add new item to row");
    // console.log(columnID, boardID);
    const newColumn = {
      columnID: uuid(),
      title: userInput.title,
      createdOn: new Date().toISOString().slice(0, 10),
      cards: [],
    };

    const isvalid = validateInput();

    if (isvalid) {
      setColumnCreationLoading(true);
      addNewColumn(newColumn);

      setTimeout(() => {
        handleClose();
        setColumnCreationLoading(false);
        setUserInput({ title: "" });
      }, 1000);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="row-item-container">
          <h1 className="row-creation-header">Create New Column</h1>
          <div className="row-creation-title">
            <label className="creation-label">Title</label>
            <input
              className="creation-input"
              type="text"
              placeholder="Enter title"
              value={userInput.title}
              name="label"
              onChange={(e) => {
                setUserInput({ ...userInput, title: e.target.value });
                setError({ title: "" });
              }}
            />
            {error.title.length > 0 && <p>{`*${error.title}`}</p>}
          </div>

          {/* <div className="row-creation-status">
            <label className="row-select">Status</label>
            <select
              className="row-select-dropdown"
              value={userInput.status}
              onChange={(e) => {
                setUserInput({ ...userInput, status: e.target.value });
              }}
            >
              <option value="default">Select Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div className="row-creation-title">
            <label className="creation-label">Description</label>
            <span
              className="creation-input text-box"
              onBlur={(e) => {
                console.log(e.target.innerText);
                setUserInput({ ...userInput, description: e.target.innerText });
                setError({ title: "" });
              }}
              contentEditable={true}
            ></span>
          </div> */}
          <div className="row-action-container">
            <SecondaryBtn btnText={"Cancel"} btnClick={handleClose} />
            {columnCreationLoading ? (
              <CircularProgress color="primary" size={24} />
            ) : (
              <PurpleBtn
                btnText={"Create"}
                btnClick={handleAddItemToRowCreation}
              />
            )}
          </div>
        </div>
      </Box>
    </Modal>
  );
}
