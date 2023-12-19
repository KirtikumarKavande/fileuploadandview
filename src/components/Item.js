import { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { FaFolderPlus } from "react-icons/fa6";
import { BsFillFileEarmarkPlusFill } from "react-icons/bs";
import { acceptableExtensions } from "@/utility/constant/constant";
import usePostDataToDB from "@/hooks/usePostDataToDB";

const Item = ({ name, children, allFolders }) => {
  console.log(allFolders);
  const [isOpen, setIsOpen] = useState(false);
  const [isShowSuggestion, setIsShowSuggestion] = useState(false);
  const [isshowSuggestionForInput, setIsSuggestionForInput] = useState(false);
  const [selectedType,setSelectedType] = useState("");
  const postDataToDB = usePostDataToDB();
  const ref = useRef();
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const addNewFolder = () => {

    setIsSuggestionForInput(true);
    setSelectedType("folder");
  };
  const addNewFile = () => {

    setIsSuggestionForInput(true);
    setSelectedType("file");
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
  const sendDataToDB = (event) => {
    console.log("grate yuvi",allFolders )
    if (event.keyCode === 13) {
      if (selectedType === "file") {
        const inputByUser = ref.current.value;
        if (acceptableExtensions.includes(inputByUser.split(".")[1])) {
          const obj = {
            name: inputByUser,
            type: "file",
            parentUuid: allFolders.uuid,
            uuid: uuidv4(),
          };
          setIsSuggestionForInput(false)
          postDataToDB("folder", "POST", obj);
        } else {
          console.log("wrong format");
        }
      } else {
        const obj = {
          name: ref.current.value,
          type: "folder",
          children: Array(0),
          parentUuid: allFolders.uuid,
          uuid: uuidv4(),
        };
        setIsSuggestionForInput(false)

        postDataToDB("folder", "POST", obj);
      }
    }
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
        {isShowSuggestion && allFolders.type === "folder" && (
          <div className="flex">
            <div onClick={addNewFolder} className=" hover:text-gray-400">
              <FaFolderPlus size={15} />
            </div>
            <div onClick={addNewFile} className="pl-2 hover:text-gray-400">
              <BsFillFileEarmarkPlusFill size={16} />
            </div>
          </div>
        )}
      </div>
      {isshowSuggestionForInput && (
        <input
          onKeyDown={sendDataToDB}
          ref={ref}
          className="border text-black text-sm border-none px-1 outline-none bg-white w-36"
        />
      )}

      <div className=" w-36 pl-1">{isOpen && children}</div>
    </div>
  );
};

export default Item;
