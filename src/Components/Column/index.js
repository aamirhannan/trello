import React, { useEffect, useState } from "react";
import "./column.css";
import PrimaryBtn from "../Buttons/PrimaryButton";
import PurpleBtn from "../Buttons/PurpleButton";
import { CircularProgress } from "@mui/material";
import { uuid } from "uuidv4";
import SecondaryBtn from "../Buttons/SecondaryButton";

const Column = ({
  activeBoard,
  setAllBoardList,
  setActiveBoard,
  allBoardList,
}) => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const addNewColumn = () => {
    const newColumn = {
      id: uuid(),
      title: "New Column",
      cards: [],
    };
    // setItems([...items, newColumn]);
    // update activeBoard

    setActiveBoard({
      ...activeBoard,
      lists: [...activeBoard.lists, newColumn],
    });

    setAllBoardList(
      allBoardList.map((board) =>
        board.id === activeBoard.id
          ? { ...board, lists: [...board.lists, newColumn] }
          : board
      )
    );
  };

  useEffect(() => {
    setIsLoading(true);

    setTimeout(() => {
      setItems(activeBoard.lists);
      setIsLoading(false);
    }, 500);

    console.log("activeBoard25", activeBoard);
    console.log("allBoardList26", allBoardList);
  }, [activeBoard]);

  if (items?.length === 0 || isLoading) {
    return <CircularProgress />;
  }

  return (
    <div className="board-container">
      <h1 className="board-title">{activeBoard.title}</h1>
      <div className="board">
        <div className="columns-outer-container" style={{ display: "flex" }}>
          {items.map((item, index) => (
            <div className="column-container" key={index}>
              <h2>{item.title}</h2>
              <Item item={item} />
              <AddItemToColumn
                columnID={item.id}
                boardID={activeBoard.id}
                setAllBoardList={setAllBoardList}
                setActiveBoard={setActiveBoard}
                allBoardList={allBoardList}
              />
            </div>
          ))}
        </div>
        <div style={{ textWrap: "nowrap" }}>
          <SecondaryBtn btnClick={addNewColumn} btnText={"Add new Column"} />
        </div>
      </div>
    </div>
  );
};

export default Column;

function AddItemToColumn({
  columnID,
  boardID,
  setAllBoardList,
  setActiveBoard,
  allBoardList,
}) {
  const addItemToColumn = () => {
    console.log(columnID, boardID);
    const newItem = {
      id: uuid(),
      title: "New Item",
      status: "active",
      createdOn: new Date().toISOString().slice(0, 10),
    };

    setActiveBoard((prev) => {
      const updatedLists = prev.lists.map((list) => {
        if (list.id === columnID) {
          return {
            ...list,
            cards: [...list.cards, newItem],
          };
        }
        return list;
      });
      return {
        ...prev,
        lists: updatedLists,
      };
    });

    setAllBoardList((prev) =>
      prev.map((board) =>
        board.id === boardID
          ? {
              ...board,
              lists: [
                ...board.lists.map((list) =>
                  list.id === columnID
                    ? { ...list, cards: [...list.cards, newItem] }
                    : list
                ),
              ],
            }
          : board
      )
    );
  };

  return (
    <div className="add-item">
      <PurpleBtn
        className="full"
        btnText={"Add New Item"}
        btnClick={addItemToColumn}
      />
    </div>
  );
}

function Item({ item }) {
  return (
    <>
      {item?.cards?.map((element, index) => (
        <div key={`item-${index}`} draggable className="item">
          <div className="item-top-section">
            <p>{element.id}</p>
            <p>{element.title}</p>
          </div>
          <div className="item-bottom-section">
            <p>{element.status}</p>
            <p>{element.createdOn}</p>
          </div>
        </div>
      ))}
    </>
  );
}
