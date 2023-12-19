import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { FaFolderPlus } from "react-icons/fa6";
import { BsFillFileEarmarkPlusFill } from "react-icons/bs";

const Item = ({ name, children, allFolders }) => {
  console.log(allFolders);
  const [isOpen, setIsOpen] = useState(false);
  const [isShowSuggestion, setIsShowSuggestion] = useState(false);
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const addNewFolder = async () => {
    const data = await fetch("http://localhost:3000/api/folder", {
      method: "POST",
      body: JSON.stringify({
        name: "gautam",
        type: "folder",
        children: Array(0),
        parentUuid: allFolders.uuid,
        uuid: uuidv4(),
      }),
    });
    const res = await data.json();
    console.log("addNewFolder", allFolders);
  };

  const addFile = async () => {
    const data = await fetch("http://localhost:3000/api/folder", {
      method: "POST",
      body: JSON.stringify({
        name: "file",
        type: "file",
        parentUuid: allFolders.uuid,
        uuid: uuidv4(),
      }),
    });
    const res = await data.json();
    console.log("addNewFolder", allFolders);
  };

  return (
    <div>
      <div
        onMouseEnter={() => {
          setIsShowSuggestion(true);
        }}
        onMouseLeave={() => setIsShowSuggestion(false)}
        className="flex items-center justify-between pt-[2px]"
      >
        <div onClick={toggleOpen} className="text-sm  font-light">
          {name}
        </div>
        {isShowSuggestion && allFolders.type==="folder"&&(
          <div className="flex">
          <div onClick={addNewFolder} className=" hover:text-gray-400">
            <FaFolderPlus size={15} />
          </div>
          <div onClick={addFile} className="pl-2 hover:text-gray-400">
            <BsFillFileEarmarkPlusFill size={16} />
          </div>
          </div>
        )}
      </div>

      <div className=" w-36 pl-1">{isOpen && children}</div>
    </div>
  );
};

export default Item;
