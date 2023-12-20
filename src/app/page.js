"use client";
import FileContent from "@/components/FileContent";
import Sidebar from "@/components/Sidebar";

const Home = () => {
  return (
    <div className="flex">
      <div>
       <div className="text-white m-4 text-lg font-bold">File Explore</div> 
        <Sidebar />
      </div>
      <div className="bg-black">
      <FileContent/>

      </div>
    </div>
  );
};

export default Home;
