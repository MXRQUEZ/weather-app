import React, { FC } from "react";
import classes from "./select.module.scss";

interface ISelectProps {
  defaultValue?: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
}

const Select: FC<ISelectProps> = ({ options, defaultValue, onChange }) => (
  <div className={classes.select__container}>
    <select
      className={classes.select}
      defaultValue={defaultValue}
      onChange={onChange}
    >
      {options.map((value) => (
        <option key={value} value={value}>
          {value}
        </option>
      ))}
    </select>
  </div>
);

Select.defaultProps = {
  defaultValue: undefined,
};

export default Select;
