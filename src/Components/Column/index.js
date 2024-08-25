import React, { useEffect, useState } from "react";
import "./column.css";
import PrimaryBtn from "../Buttons/PrimaryButton";
import PurpleBtn from "../Buttons/PurpleButton";

const Column = ({ column }) => {
  const [item, setItem] = useState([]);

  useEffect(() => {
    setItem(column.cards);
  }, []);

  const addItem = () => {
    // const newItem = {
    //   id: item.length + 1,
    //   title: "Context",
    //   status: "active",
    //   createdOn: "12/12/2001",
    // };
    // setItem([...item, newItem]);
  };

  return (
    <div className="column-outer-container">
      <h1>{column.title}</h1>
      <Item item={item} />
      <AddItemToColumn addItem={addItem} />
    </div>
  );
};

export default Column;

function AddItemToColumn({ addItem }) {
  return (
    <div className="add-item">
      <PurpleBtn className="full" btnText={"Add New Item"} btnClick={addItem} />
    </div>
  );
}

function Item({ item }) {
  return (
    <>
      {item.map((element, index) => {
        return (
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
        );
      })}
    </>
  );
}

// { id: 1, title: "Context", status: "active", createdOn: "12/12/2001" },
