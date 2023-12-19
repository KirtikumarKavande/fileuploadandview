import Item from "./Item";
import { v4 as uuidv4 } from "uuid";

const Folder = ({ data }) => {
  // const addNewFolder = async (item, index) => {
  //   const data = await fetch("http://localhost:3000/api/folder", {
  //     method: "POST",
  //     body: JSON.stringify({
  //       name: "Kirtikumar",
  //       type: "folder",
  //       children: Array(0),
  //       parentUuid: item.uuid,
  //       uuid: uuidv4(),
  //     }),
  //   });
  //   const res = await data.json();
  // };
  return (
    <div>
      {data.map((item, index) => (
        <div className="flex  cursor-pointer text-white" key={index}>
          <div>
            <Item allFolders={item} name={item.name}>
              <div>{item.children && <Folder data={item.children} />}</div>
            </Item>
          </div>
          {/* <div>
            {item.type === "folder" && (
              <div
                onClick={() => {
                  addNewFolder(item, index);
                }}
              >
                add folder
              </div>
            )}
          </div> */}
        </div>
      ))}
    </div>
  );
};

export default Folder;
