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

export default function AddItemToRowModal({
  open,
  setOpen,
  handleClose,
  handleOpen,
  setActiveBoard,
  setAllBoardList,
  columnID,
  boardID,
  addItemToColumn,
  setRowCreationLoading,
  rowCreationLoading,
  selectedItemData,
  updateActiveBoardCard,
}) {
  const [userInput, setUserInput] = useState({
    title: "",
    status: "",
    description: "",
  });

  const [error, setError] = useState({
    title: "",
    status: "",
  });

  const validateInput = () => {
    let isValid = true;
    setError({ title: "", status: "" });

    if (userInput.title.trim() === "") {
      setError({ title: "Title is required" });
      isValid = false;
    }
    return isValid;
  };

  const handleUpdateExistingItem = () => {
    if (!selectedItemData) {
      console.error("No item selected for update");
      return;
    }

    const updatedItem = {
      ...selectedItemData,
      title: userInput.title,
      status: userInput.status,
      description: userInput.description,
    };

    console.log("updatedItem", updatedItem);

    // return;

    updateActiveBoardCard(selectedItemData.itemID, updatedItem);
    handleClose();
    resetUserInput();
  };

  const resetUserInput = () => {
    setUserInput({ title: "", status: "", description: "" });
  };
  const handleAddItemToRowCreation = () => {
    console.log("add new item to row");
    // console.log(columnID, boardID);

    const newItem = {
      itemID: uuid(),
      title: userInput.title,
      status: userInput.status,
      createdOn: new Date().toISOString().slice(0, 10),
      description: userInput.description,
      priority: "HIGH",
    };

    console.log("newItem", newItem);

    const isvalid = validateInput();

    if (isvalid) {
      setRowCreationLoading(true);
      addItemToColumn(newItem, columnID, boardID);
      resetUserInput();
      setTimeout(() => {
        setRowCreationLoading(false);
        handleClose();
      }, 1000);
    }
  };

  console.log("selectedItemData", selectedItemData);

  useEffect(() => {
    if (selectedItemData) {
      setUserInput({
        title: selectedItemData.title,
        status: selectedItemData.status,
        description: selectedItemData.description,
      });
    }
  }, [selectedItemData]);

  useEffect(() => {
    console.log("userInput updated:", userInput);
  }, [userInput]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
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
          <h1
            className="row-creation-header"
            onClick={() => console.log(userInput)}
          >
            {selectedItemData ? "Update Ticket" : "Create New Ticket"}
          </h1>
          <div className="row-creation-title">
            <label className="creation-label">Title</label>
            <input
              className="creation-input"
              type="text"
              placeholder="Enter title"
              value={userInput.title}
              name="title"
              onChange={handleInputChange}
            />
            {error.title.length > 0 && <p>{`*${error.title}`}</p>}
          </div>

          <div className="row-creation-status">
            <label className="row-select">Status</label>
            <select
              className="row-select-dropdown"
              value={userInput.status}
              name="status"
              onChange={handleInputChange}
            >
              <option value="default">Select Status</option>
              <option value="TODO">Todo</option>
              <option value="IN_PROGRESS">Inprogress</option>
              <option value="DONE">Done</option>
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
              dangerouslySetInnerHTML={{ __html: userInput.description }}
            ></span>
          </div>
          <div className="row-action-container">
            <SecondaryBtn
              btnText={"Cancel"}
              btnClick={() => {
                handleClose();
                resetUserInput();
              }}
            />
            {selectedItemData ? (
              <PurpleBtn btnText="Update" btnClick={handleUpdateExistingItem} />
            ) : (
              <PurpleBtn
                btnText="Create"
                btnClick={handleAddItemToRowCreation}
                isLoading={rowCreationLoading}
              />
            )}
          </div>
        </div>
      </Box>
    </Modal>
  );
}
