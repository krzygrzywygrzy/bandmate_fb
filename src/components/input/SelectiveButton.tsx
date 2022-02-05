import React from "react";
import "./scss/input.css";

type Props = {
  label: string;
  isSelected: boolean;
  onClick(data: string): void;
};

const SelectiveButton: React.FC<Props> = ({ label, onClick, isSelected }) => {
  return (
    <div
      className={`selective-button ${
        isSelected ? "selective-button-selected" : "selective-button-unselected"
      }`}
      onClick={() => onClick(label)}
    >
      {label}
    </div>
  );
};

export default SelectiveButton;
