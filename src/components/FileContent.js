"use client";
import useGetDataFromDB from "@/hooks/useGetDataFromDB";
import usePostDataToDB from "@/hooks/usePostDataToDB";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoSaveOutline } from "react-icons/io5";
import { useSelector } from "react-redux";

const FileContent = () => {
  const [fileContentData, setFileContentData] = useState("");
  const postDataToDB = usePostDataToDB();
  const getDataFromDB = useGetDataFromDB();
  const data = useSelector((store) => store.fileSlice);
  console.log("uuid check",data.uuid)
  const saveFileContentToDB = async () => {
    const res = await postDataToDB(`file/${data.uuid}`, "POST", {
      fileContent: fileContentData,
    });
    if (res.success) {
      toast.success("saved!");
    } else {
      toast.error("something went wrong");
    }
  };

  useEffect(() => {
    console.log("running...")
    getFileCOntentFromDB();
  }, [data.uuid]);
  const getFileCOntentFromDB = async () => {
    const res = await getDataFromDB(`file/${data.uuid}`);
    setFileContentData(res?.data?.fileContent);
  };

  return (
    <div>
      <div
        className="text-white flex items-center justify-end mr-2 mt-2 "
        onClick={saveFileContentToDB}
      >
        <IoSaveOutline size={25} />
      </div>
      <div className="mt-7 bg-black w-[87vw]  h-[100vh] border border-white ">
        <input
         style={{ verticalAlign: 'top' }}
          className=" text-left text-white  bg-black w-[87vw] focus:outline-none p-2 "
          onChange={(e) => {
            setFileContentData(e.target.value);
          }}
          value={fileContentData}
        />
      </div>
    </div>
  );
};

export default FileContent;
