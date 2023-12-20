"use client";

import React, { useEffect, useRef, useState } from "react";
import Folder from "./Folder";
import useGetDataFromDB from "@/hooks/useGetDataFromDB";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const getDataFromDB = useGetDataFromDB();
  const [getFolder, setGetFolder] = useState([]);
  const fileOrFolderData = useSelector((store) => store.fileSlice);
  const initialRenderRef = useRef(true);
  // useEffect(() => {
  //   fetchData();
  // }, []);
  const fetchData = async () => {
    const data = await getDataFromDB("folder");
    setGetFolder(data);
  };
  console.log("fileOrFolderData", fileOrFolderData);

  useEffect(() => {
    if (initialRenderRef.current) {
      fetchData();
      initialRenderRef.current = false;
      return;
    }
    const updateDataByUUID = (data, incomingData, parentUuid) => {
      for (let i = 0; i < data?.length; i++) {
        if (data[i].uuid === parentUuid) {
          data[i].children.push({
            name: incomingData.name,
            type: incomingData.type,
            uuid: incomingData.uuid,
            children: [],
          });
          return data;
        } else if (data[i].children && data[i].children.length > 0) {
          const updatedChildren = updateDataByUUID(
            data[i].children,
            incomingData,
            parentUuid
          );
          if (updatedChildren) {
            data[i].children = updatedChildren;
            return data;
          }
        }
      }
    };

    const updatedFolders = updateDataByUUID(
      getFolder,
      fileOrFolderData?.createFileOrFolder,
      fileOrFolderData?.createFileOrFolder?.parentUuid
    );
    setGetFolder(updatedFolders);
  }, [fileOrFolderData?.createFileOrFolder]);
  console.log("getFolder",getFolder)
  return (
    <div className="w-40 cursor-ns-resize pt-3 bg-black min-h-screen pl-1 border border-y-black border-l-black border-t-white border-r-white">
      <Folder data={getFolder} />
    </div>
  );
};

export default Sidebar;
