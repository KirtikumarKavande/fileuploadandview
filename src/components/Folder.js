import Item from "./Item";
import { v4 as uuidv4 } from 'uuid';

const Folder = ({ data }) => {
  const addNewFolder = async (item, index) => {
    const data = await fetch("http://localhost:3000/api/folder", {
      method: "POST",
      body: JSON.stringify({
        name: 'new one', type: 'folder', children: Array(0),
        parentUuid:item.uuid,
        uuid:uuidv4()
      }),
    });
    const res = await data.json();
    console.log("selected folder", item, index);
  };
  console.log("id",uuidv4())
  return (
    <div>
      {data.map((item, index) => (
        <div className="flex ">
          <Item key={index} name={item.name}>
            <div className="pl-4">
              {item.children && <Folder data={item.children} />}
            </div>
          </Item>
          {item.type === "folder" && (
            <div
              onClick={() => {
                addNewFolder(item, index);
              }}
            >
              add folder
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Folder;
