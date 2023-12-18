"use client";
import Folder from "@/components/Folder";
import React, { useEffect, useState } from "react";

const Home = () => {

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
    console.log(res);
  };

  return (
    <div>
    <Folder data={getFolder} />
  </div>
  );
};

export default Home;