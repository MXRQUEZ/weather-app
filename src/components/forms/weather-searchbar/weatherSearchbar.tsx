import React, { FC } from "react";
import classes from "./searchbar.module.scss";

interface IWeatherSearchbarProps {
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
}

const WeatherSearchbar: FC<IWeatherSearchbarProps> = ({
  onKeyDown,
  onClick,
}) => {
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
        onClick={onClick}
      />
    </div>
  );
};

WeatherSearchbar.defaultProps = {
  onKeyDown: undefined,
  onClick: undefined,
};

export default React.memo(WeatherSearchbar);
