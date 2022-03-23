import React from "react";
import dateBuilder from "../functions/DateBuilder";

import "./DailyWeather.css";

const DailyWeather = ({ daily }) => {
  let iconNum = daily.Day.Icon;
  if (iconNum < 10) {
    iconNum = "0" + iconNum;
  }

  const d = new Date(0);
  const fixDate = d.setUTCSeconds(daily.EpochDate);
  const { day, date, month, year } = dateBuilder(new Date(fixDate));

  return (
    <div className="weather-display">
      <h1>{day}</h1>
      <img
        src={`https://developer.accuweather.com/sites/default/files/${iconNum}-s.png`}
        alt="today's weather"
      />
      <p>
        {daily.Temperature.Minimum.Value}
        {daily.Temperature.Minimum.Unit} - {daily.Temperature.Maximum.Value}
        {daily.Temperature.Maximum.Unit}
      </p>
      <p>
        {date} {month} {year}
      </p>
    </div>
  );
};

export default React.memo(DailyWeather);
