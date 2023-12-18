import { useState } from "react";

const Item = ({ name, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div onClick={toggleOpen}>{name}</div>

      <div className="bg-orange-400">{isOpen && children}</div>
    </div>
  );
};

export default Item;
