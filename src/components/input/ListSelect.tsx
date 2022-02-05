import React from "react";
import SelectiveButton from "./SelectiveButton";
import "./scss/input.css";

type Props = {
  data: string[];
  setData(data: string[]): void;
  toSelect: string[];
};

const ListSelect: React.FC<Props> = ({ data, setData, toSelect }) => {
  const update = (item: string) => {
    if (data.includes(item)) {
      setData(data.filter((el) => el !== item));
    } else setData([...data, item]);
  };

  return (
    <div className="list-select">
      {toSelect.map((el) => (
        <SelectiveButton
          onClick={update}
          isSelected={data.includes(el)}
          label={el}
          key={el}
        />
      ))}
    </div>
  );
};

export default ListSelect;
