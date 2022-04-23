import React from "react";
import classes from "./searchbar.module.scss";

const WeatherSearchbar = () => {
  return (
    <div className={classes.search__box}>
      <button className={classes.btn__search}>
        <i className="fas fa-search" />
      </button>
      <input
        type="text"
        className={classes.search__input}
        placeholder="Search the city..."
      />
    </div>
  );
};

export default React.memo(WeatherSearchbar);
