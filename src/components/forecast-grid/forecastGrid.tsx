import React, { FC } from "react";
import { picture } from "../../constants/constants";
import { IWeather } from "../../types/IWeather";
import classes from "./forecastGrid.module.scss";

interface IWeatherGridProps {
  weather: IWeather;
}

const ForecastGrid: FC<IWeatherGridProps> = ({ weather }) => {
  return (
    <ul className={classes.forecast__grid}>
      <li className={classes.today}>
        <i className={picture[weather.week[0].weather].icon} />
        <div>
          <span className={classes.dayname}>Today</span>
          <p>{weather.week[0].temp}°C</p>
        </div>
      </li>
      {weather.week.slice(1).map((daily) => {
        return (
          <li className={classes.other__days} key={daily.id}>
            <div>
              <span className={classes.dayname}>
                {daily.dayname.slice(0, 3)}
              </span>
            </div>
            <i className={picture[daily.weather].icon} />
            <p>{daily.temp}°C</p>
          </li>
        );
      })}
    </ul>
  );
};

export default React.memo(ForecastGrid);
