"use client";
import SideBar from "@/Components/Sidebar";
import HomePage from "@/Compositions/Home Page";
import { useRouter, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import "./slug.css";
const Home = () => {
  const currentPath = usePathname();
  console.log("currentPath", currentPath);
  const [route, setRoute] = useState();

  const [overViewContent, setOverViewContent] = useState(<></>);

  useEffect(() => {
    switch (currentPath) {
      case "/Home":
        setOverViewContent(<HomePage />);
        break;
      default:
        setOverViewContent(<div>Page not found</div>);
        break;
    }
  }, [currentPath]);
  return (
    <div className="slug-container">
      <SideBar />
      {overViewContent}
    </div>
  );
};

export default Home;
