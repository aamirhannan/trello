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
          boardID: "board-001",
          title: "Project Alpha",
          lists: [
            {
              columnID: "list-001",
              title: "To Do",
              cards: [
                {
                  itemID: "card-001",
                  title: "Implement user authentication",
                  description: "Set up JWT-based authentication system",
                  status: "TODO",
                  createdOn: "2023-06-15",
                  priority: "HIGH",
                },
                {
                  itemID: "card-002",
                  title: "Design database schema",
                  description: "Create ERD for the new inventory module",
                  status: "TODO",
                  createdOn: "2023-06-16",
                  priority: "MEDIUM",
                },
              ],
            },
            {
              columnID: "list-002",
              title: "In Progress",
              cards: [
                {
                  itemID: "card-003",
                  title: "Refactor API endpoints",
                  description: "Optimize existing API for better performance",
                  status: "IN_PROGRESS",
                  createdOn: "2023-06-14",
                  priority: "HIGH",
                },
              ],
            },
            {
              columnID: "list-003",
              title: "Done",
              cards: [
                {
                  itemID: "card-004",
                  title: "Set up CI/CD pipeline",
                  description: "Implement automated testing and deployment",
                  status: "DONE",
                  createdOn: "2023-06-10",
                  priority: "HIGH",
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
          key={activeBoard.boardID}
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
