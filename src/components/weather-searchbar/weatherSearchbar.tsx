import React, { FC } from "react";
import classes from "./searchbar.module.scss";

interface IWeatherSearchbarProps {
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const WeatherSearchbar: FC<IWeatherSearchbarProps> = ({ onKeyDown }) => {
  return (
    <div className={classes.search__box}>
      <button className={classes.btn__search}>
        <i className="fas fa-search" />
      </button>
      <input
        type="text"
        className={classes.search__input}
        placeholder="Search the city..."
        onKeyDown={onKeyDown}
      />
    </div>
  );
};

WeatherSearchbar.defaultProps = {
  onKeyDown: undefined,
};

export default React.memo(WeatherSearchbar);
