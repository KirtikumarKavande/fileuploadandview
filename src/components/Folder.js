import Item from "./Item";

const Folder = ({ data }) => {
  console.log("data",data)
  return (
    <div>
      {data?.map((item, index) => (
        <div className="flex  cursor-pointer text-white" key={item.uuid}>
          <div>
            <Item allFolders={item} name={item.name}>
              {console.log("children",item.children)}
              <div> {item.children && <Folder data={item.children} />}</div>
            </Item>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Folder;
