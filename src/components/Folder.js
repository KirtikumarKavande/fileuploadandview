import Item from "./Item";
import { v4 as uuidv4 } from "uuid";

const Folder = ({ data }) => {
  return (
    <div>
      {data.map((item, index) => (
        <div className="flex  cursor-pointer text-white" key={index}>
          <div>
            <Item allFolders={item} name={item.name}>
              <div> {item.children && <Folder data={item.children} />}</div>
            </Item>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Folder;
