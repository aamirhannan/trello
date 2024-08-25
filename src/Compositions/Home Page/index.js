import Column from "@/Components/Column";
import React, { useEffect, useState } from "react";
import "./home-page.css";
import { CircularProgress } from "@mui/material";

const HomePage = () => {
  const [columnList, setColumnList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getAllColumns = () => {
    const kanbanData = {
      boards: [
        {
          id: 1,
          title: "Project Board 1",
          lists: [
            {
              id: 1,
              title: "To Do",
              cards: [
                {
                  id: 1,
                  title: "Task 1",
                  description: "Description of Task 1",
                  status: "to-do",
                  createdOn: "2024-08-01",
                },
                {
                  id: 2,
                  title: "Task 2",
                  description: "Description of Task 2",
                  status: "to-do",
                  createdOn: "2024-08-02",
                },
              ],
            },
            {
              id: 2,
              title: "In Progress",
              cards: [
                {
                  id: 3,
                  title: "Task 3",
                  description: "Description of Task 3",
                  status: "in-progress",
                  createdOn: "2024-08-03",
                },
              ],
            },
            {
              id: 3,
              title: "Done",
              cards: [
                {
                  id: 4,
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
  };

  useEffect(() => {
    setIsLoading(true);
    getAllColumns();
    setIsLoading(false);
  }, []);

  if (columnList.length === 0 || isLoading === true) {
    return <CircularProgress />;
  }

  return (
    <div className="home-page-outer-container">
      <div className="home-page-inner-container">
        {columnList.boards[0]["lists"].map((column) => (
          <Column key={column.id} column={column} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
