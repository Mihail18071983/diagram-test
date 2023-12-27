import { useState, ChangeEvent } from "react";
import styles from "./index.module.scss";

import { ArrowUp } from "../ArrowUp";


import { ArrowDown } from "../ArrowDown";

import {ReactComponent as IconCheck} from "../../images/svg/check.svg";
interface Option {
  id: number;
  label: string;
}

interface IProps {
  onChange: (items: number[]) => void;
  savedValues: number[];
}

const Dropdown = ({ onChange, savedValues }: IProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const options: Option[] = [
    { id: 1, label: "Варіант 1" },
    { id: 2, label: "Варіант 2" },
    { id: 3, label: "Варіант 3" },
    { id: 4, label: "Варіант 4" },
    { id: 5, label: "Варіант 5" },
    { id: 6, label: "Варіант 6" },
  ];

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { checked, id } = event.target;

    if (checked) {
      onChange([...savedValues, Number(id)]);
    } else {
      onChange(savedValues.filter((item) => item !== Number(id)));
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.dropdown}>
      <button className={styles.dropdownToggle} onClick={toggleDropdown}>
        Вибрати значення {savedValues?.join("-") || ""}
        {isOpen ? <ArrowUp /> : <ArrowDown />}
      </button>
      {isOpen && (
        <div className={styles.dropdownMenu}>
          {options.map((option) => (
            <label key={option.id} className={styles.checkboxText}>
              <input
                className={styles.checkbox}
                type="checkbox"
                value={option.label}
                id={option.id.toString()}
                checked={savedValues?.includes(option.id)}
                onChange={handleCheckboxChange}
              />
              {option.label}
              <span className={styles.icon_check_wrapper}>
                <IconCheck className={styles.icon_check } />
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
