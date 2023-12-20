"use client";

import React, { useEffect, useState } from "react";
import Folder from "./Folder";
import useGetDataFromDB from "@/hooks/useGetDataFromDB";
const Sidebar = () => {
 const getDataFromDB= useGetDataFromDB()
  const [getFolder, setGetFolder] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
   const data=await getDataFromDB('folder')
    setGetFolder(data);
  };

  return (
    <div className="w-40 mt- bg-black min-h-screen pl-1">
      <Folder data={getFolder} />
    </div>
  );
};

export default Sidebar;
