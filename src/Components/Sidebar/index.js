import React, { useState } from "react";
import "./sidebar.css";
import Image from "next/image";
import { IconList } from "@/UtilFunctions/icons";

const SideBar = () => {
  const title = ["Home", "Home", "Home", "Home", "Home", "Home"];
  const [activeItem, setActiveItem] = useState(0);

  const handleActiveItem = (index) => {
    setActiveItem(index);
  };
  return (
    <main className="sidebar-outer-container">
      <header className="sidebar-header">
        <Image
          src={"https://upload.wikimedia.org/wikipedia/en/8/8c/Trello_logo.svg"}
          alt="logo"
          width={120}
          height={44}
        />
      </header>
      <section className="sidebar-body">
        {title.map((item, index) => (
          <div
            key={index}
            onClick={() => handleActiveItem(index)}
            className={`sidebar-item ${
              activeItem === index ? "active-item" : ""
            }`}
          >
            {IconList.HomeIcon} {item}
          </div>
        ))}
      </section>
      <footer className="sidebar-footer">
        <p>Version 1.0.0</p>
        <p>�� 2022 Trello, Inc.</p>
      </footer>
    </main>
  );
};

export default SideBar;
