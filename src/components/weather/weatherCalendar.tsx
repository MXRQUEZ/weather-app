import React, { FC } from "react";
import classes from "./weather.module.scss";

const WeatherCalendar: FC = () => {
  return (
    <aside className={classes.calendar}>
      <div className={classes.calendar__event}>
        <time className={classes.daytime}>8:00</time>
        <span className={classes.event__name}>Check calendar event</span>
      </div>
      <div className={classes.calendar__event}>
        <time className={classes.daytime}>12:00</time>
        <span className={classes.event__name}>Being awesome</span>
      </div>
      <div className={classes.calendar__event}>
        <time className={classes.daytime}>15:00</time>
        <span className={classes.event__name}>Celebrating</span>
      </div>
    </aside>
  );
};

export default React.memo(WeatherCalendar);
