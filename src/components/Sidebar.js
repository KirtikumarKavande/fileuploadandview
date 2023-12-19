"use client";

import React, { useEffect, useState } from "react";
import Folder from "./Folder";
const Sidebar = () => {
  const [getFolder, setGetFolder] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const data = await fetch("http://localhost:3000/api/folder", {
      method: "GET",
    });
    const res = await data.json();
    setGetFolder(res);
  };

  return (
    <div className="w-40 bg-black min-h-screen">
      <Folder data={getFolder} />
    </div>
  );
};

export default Sidebar;
