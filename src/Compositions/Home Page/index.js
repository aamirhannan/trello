import Column from "@/Components/Column";
import React, { useEffect, useState } from "react";
import "./home-page.css";
import { CircularProgress } from "@mui/material";

const HomePage = () => {
  const [columnList, setColumnList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [activeBoard, setActiveBoard] = useState();
  const [allBoardList, setAllBoardList] = useState();

  const getAllColumns = () => {
    const kanbanData = {
      boards: [
        {
          id: 1,
          title: "Project Board 1",
          lists: [
            {
              id: 101,
              title: "To Do",
              cards: [
                {
                  id: 1001,
                  title: "Task 1",
                  description: "Description of Task 1",
                  status: "to-do",
                  createdOn: "2024-08-01",
                },
                {
                  id: 1002,
                  title: "Task 2",
                  description: "Description of Task 2",
                  status: "to-do",
                  createdOn: "2024-08-02",
                },
              ],
            },
            {
              id: 102,
              title: "In Progress",
              cards: [
                {
                  id: 1003,
                  title: "Task 3",
                  description: "Description of Task 3",
                  status: "in-progress",
                  createdOn: "2024-08-03",
                },
              ],
            },
            {
              id: 103,
              title: "Done",
              cards: [
                {
                  id: 1004,
                  title: "Task 4",
                  description: "Description of Task 4",
                  status: "done",
                  createdOn: "2024-08-04",
                },
              ],
            },
          ],
        },
      ],
    };

    setColumnList(kanbanData);
    setActiveBoard(kanbanData.boards[0]);
    setAllBoardList(kanbanData.boards);
  };

  useEffect(() => {
    setIsLoading(true);
    getAllColumns();
    setIsLoading(false);
  }, []);

  if (columnList.length === 0 || isLoading === true) {
    return <CircularProgress />;
  }

  const handleClick = () => {
    console.log("activeBoard", activeBoard);
    console.log("allBoardList", allBoardList);
  };

  return (
    <div className="home-page-outer-container">
      {/* <button onClick={handleClick}> click me</button> */}
      <div className="home-page-inner-container">
        <Column
          key={activeBoard.id}
          activeBoard={activeBoard}
          allBoardList={allBoardList}
          setActiveBoard={setActiveBoard}
          setAllBoardList={setAllBoardList}
        />
      </div>
    </div>
  );
};

export default HomePage;
