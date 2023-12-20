"use client";
import React from "react";
import { IoSaveOutline } from "react-icons/io5";

const FileContent = () => {
  return (
    <div>
      <div className="text-white flex items-center justify-end mr-2 mt-2 ">
        <IoSaveOutline size={25} />
      </div>
      <div className="mt-6 bg-black">
        <input className="w-[87vw]  h-[93vh] text-left text-white border bg-black border-white" />
      </div>
    </div>
  );
};

export default FileContent;
