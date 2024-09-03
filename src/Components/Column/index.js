import React, { useEffect, useState } from "react";
import "./column.css";
import PrimaryBtn from "../Buttons/PrimaryButton";
import PurpleBtn from "../Buttons/PurpleButton";
import { CircularProgress } from "@mui/material";
import { uuid } from "uuidv4";
import SecondaryBtn from "../Buttons/SecondaryButton";
import AddItemToRowModal from "../Modals/AddItemToRowModal";
import AddNewColumnModal from "../Modals/ColumnCreateModal";

const Column = ({
  activeBoard,
  setAllBoardList,
  setActiveBoard,
  allBoardList,
}) => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [rowModalOpen, setRowModalOpen] = useState(false);

  const [columnModalOpen, setColumnModalOpen] = useState(false);

  const [columnID, setColumnID] = useState(null);
  const [boardID, setBoardID] = useState(null);

  const [rowCreationLoading, setRowCreationLoading] = useState(false);
  const [columnCreationLoading, setColumnCreationLoading] = useState(false);
  const [selectedItemData, setSelectedItemData] = useState(null);

  const handleColumnModalOpen = () => {
    setColumnModalOpen(true);
  };

  const handleColumnModalClose = () => {
    setColumnModalOpen(false);
  };

  const handleRowModalOpen = () => {
    setRowModalOpen(true);
  };

  const handleRowModalClose = () => {
    setRowModalOpen(false);
    setSelectedItemData(null);
  };

  const addNewColumn = (newColumn) => {
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

  // const addItemToColumn = () => {
  //   console.log(columnID, boardID);
  //   const newItem = {
  //     id: uuid(),
  //     title: "New Item",
  //     status: "active",
  //     createdOn: new Date().toISOString().slice(0, 10),
  //   };

  //   setActiveBoard((prev) => {
  //     const updatedLists = prev.lists.map((list) => {
  //       if (list.id === columnID) {
  //         return {
  //           ...list,
  //           cards: [...list.cards, newItem],
  //         };
  //       }
  //       return list;
  //     });
  //     return {
  //       ...prev,
  //       lists: updatedLists,
  //     };
  //   });

  //   setAllBoardList((prev) =>
  //     prev.map((board) =>
  //       board.id === boardID
  //         ? {
  //             ...board,
  //             lists: [
  //               ...board.lists.map((list) =>
  //                 list.id === columnID
  //                   ? { ...list, cards: [...list.cards, newItem] }
  //                   : list
  //               ),
  //             ],
  //           }
  //         : board
  //     )
  //   );
  // };

  useEffect(() => {
    setIsLoading(true);

    setTimeout(() => {
      setItems(activeBoard.lists);
      setIsLoading(false);
    }, 500);

    console.log("activeBoard25", activeBoard);
    console.log("allBoardList26", allBoardList);
  }, [activeBoard]);

  if (items?.length === 0) {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          // alignContent: "center",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <CircularProgress />;
      </div>
    );
  }

  const updateActiveBoardCard = (cardId, updatedCardDetails) => {
    setActiveBoard((prevBoard) => {
      const updatedLists = prevBoard.lists.map((list) => {
        const updatedCards = list.cards.map((card) => {
          if (card.itemID === cardId) {
            return { ...card, ...updatedCardDetails };
          }
          return card;
        });
        return { ...list, cards: updatedCards };
      });
      return { ...prevBoard, lists: updatedLists };
    });

    setAllBoardList((prevBoards) => {
      return prevBoards.map((board) => {
        if (board.boardID === activeBoard.boardID) {
          const updatedLists = board.lists.map((list) => {
            const updatedCards = list.cards.map((card) => {
              if (card.itemID === cardId) {
                return { ...card, ...updatedCardDetails };
              }
              return card;
            });
            return { ...list, cards: updatedCards };
          });
          return { ...board, lists: updatedLists };
        }
        return board;
      });
    });

    setSelectedItemData(null);
  };

  const handleItemCreation = (columnID, boardID) => {
    console.log("columnID", columnID);
    console.log("boardID", boardID);
    setColumnID(columnID);
    setBoardID(boardID);
    setSelectedItemData(null);
    handleRowModalOpen();
  };

  const addItemToColumn = (newItem, columnID, boardID) => {
    console.log("newItem", newItem, columnID, boardID);

    setActiveBoard((prev) => {
      const updatedLists = prev.lists.map((list) => {
        if (list.columnID === columnID) {
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
      prev.map((board) => {
        if (board.boardID === boardID) {
          const updatedLists = board.lists.map((list) => {
            if (list.columnID === columnID) {
              return { ...list, cards: [...list.cards, newItem] };
            }
            return list;
          });
          return {
            ...board,
            lists: updatedLists,
          };
        }
        return board;
      })
    );
  };

  return (
    <div className="board-container">
      <AddItemToRowModal
        open={rowModalOpen}
        setOpen={setRowModalOpen}
        handleOpen={handleRowModalOpen}
        handleClose={handleRowModalClose}
        setActiveBoard={setActiveBoard}
        setAllBoardList={setAllBoardList}
        columnID={columnID}
        boardID={boardID}
        addItemToColumn={addItemToColumn}
        setRowCreationLoading={setRowCreationLoading}
        rowCreationLoading={rowCreationLoading}
        selectedItemData={selectedItemData}
        updateActiveBoardCard={updateActiveBoardCard}
      />
      <AddNewColumnModal
        open={columnModalOpen}
        setOpen={setColumnModalOpen}
        handleClose={handleColumnModalClose}
        handleOpen={handleColumnModalOpen}
        addNewColumn={addNewColumn}
        setColumnCreationLoading={setColumnCreationLoading}
        columnCreationLoading={columnCreationLoading}
      />
      <h1 className="board-title">{activeBoard.title}</h1>
      <div className="board">
        <div className="columns-outer-container" style={{ display: "flex" }}>
          {items.map((item, index) => (
            <div
              className="column-container"
              // onClick={() => {
              //   handleRowModalOpen();
              //   setSelectedItemData(item.cards[index]);
              // }}
              key={index}
            >
              <h2 className="column-title" contentEditable={true}>
                {item.title}
              </h2>
              <Item
                item={item}
                handleRowModalOpen={handleRowModalOpen}
                setSelectedItemData={setSelectedItemData}
              />
              <div className="add-item">
                <PurpleBtn
                  className="full"
                  btnText={"Add New Item"}
                  btnClick={() =>
                    handleItemCreation(item.columnID, activeBoard.boardID)
                  }
                  isLoading={rowCreationLoading}
                />
              </div>
            </div>
          ))}
        </div>
        <div style={{ textWrap: "nowrap" }}>
          <SecondaryBtn
            btnClick={handleColumnModalOpen}
            btnText={"Add new Column"}
          />
        </div>
      </div>
    </div>
  );
};

export default Column;

// function AddItemToColumn({
//   columnID,
//   boardID,
//   setAllBoardList,
//   setActiveBoard,
//   addItemToColumn,
//   allBoardList,
//   handleRowModalOpen,
//   open,
//   setOpen,
//   handleClose,
//   handleOpen,
// }) {
//   return (
//     <div className="add-item">
//       <AddItemToRowModal
//         open={open}
//         setOpen={setOpen}
//         handleOpen={handleOpen}
//         handleClose={handleClose}
//         setActiveBoard={setActiveBoard}
//         setAllBoardList={setAllBoardList}
//         columnID={columnID}
//         boardID={boardID}
//       />
//       <PurpleBtn
//         className="full"
//         btnText={"Add New Item"}
//         btnClick={handleOpen}
//       />
//     </div>
//   );
// }

function Item({ item, setSelectedItemData, handleRowModalOpen }) {
  return (
    <>
      {item?.cards?.map((element, index) => (
        <div
          key={`item-${index}`}
          draggable
          className="item"
          onClick={() => {
            setSelectedItemData(element);
            handleRowModalOpen();
          }}
        >
          <div className="item-top-section">
            <p>{element.itemID}</p>
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
