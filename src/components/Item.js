import { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { FaFolderPlus } from "react-icons/fa6";
import { BsFillFileEarmarkPlusFill } from "react-icons/bs";
import { acceptableExtensions } from "@/utility/constant/constant";
import usePostDataToDB from "@/hooks/usePostDataToDB";
import { IoFolderOpen } from "react-icons/io5";
import { FaFile } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addFolderOrFileReducer, updateUuid } from "@/store/fileData";

const Item = ({ name, children, allFolders }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isShowSuggestion, setIsShowSuggestion] = useState(false);
  const [isshowSuggestionForInput, setIsSuggestionForInput] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const postDataToDB = usePostDataToDB();
  const [isShowError, setIsShowError] = useState("");
  const dispatch=useDispatch()
  const ref = useRef();
  const toggleOpen = async () => {
    setIsOpen(!isOpen);

    if (allFolders.type === "folder") return;
    dispatch(updateUuid(allFolders.uuid))
    console.log("allFolders", allFolders);
  };

  const addNewFolder = () => {
    setIsSuggestionForInput(true);
    setSelectedType("folder");
  };
  const addNewFile = () => {
    setIsSuggestionForInput(true);
    setSelectedType("file");
  };

  const sendDataToDB = (event) => {
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
         dispatch(addFolderOrFileReducer(obj)) 
          setIsSuggestionForInput(false);
          postDataToDB("folder", "POST", obj);
        } else {
          setIsShowError(true);
        }
      } else {
        const obj = {
          name: ref.current.value,
          type: "folder",
          children: Array(0),
          parentUuid: allFolders.uuid,
          uuid: uuidv4(),
        };
        dispatch(addFolderOrFileReducer(obj)) 

        setIsSuggestionForInput(false);

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
        <div
          onClick={() => {
            toggleOpen(allFolders);
          }}
          className="text-sm  font-light flex "
        >
          {allFolders.type === "folder" ? (
            <span className="text-yellow-600 mr-1">
              <IoFolderOpen size={25} />
            </span>
          ) : (
            <span className="text-yellow-600 mr-1">
              <FaFile size={25} />
            </span>
          )}
          <span className="">{name}</span>
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
        <>
          <input
            onKeyDown={sendDataToDB}
            ref={ref}
            className="border text-black text-sm border-none px-1 outline-none bg-white w-36"
          />
          {isShowError && (
            <div className="text-sm text-red-400">Wrong file Format</div>
          )}
        </>
      )}

      <div className=" w-36 pl-1">{isOpen && children}</div>
    </div>
  );
};

export default Item;
