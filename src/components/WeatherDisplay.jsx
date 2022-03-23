import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeDegree } from "../redux/slices/degreeSlice";
import {
  addToFavorites,
  removeFromFavorites,
} from "../redux/slices/favoritesSlice";
import DailyWeather from "./DailyWeather";

import "./WeatherDisplay.css";

const WeatherDisplay = ({ todaysWeather, cityData }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(changeDegree());
  };

  const degree = useSelector((state) => state.degree.value);
  const city = useSelector((state) => state.city);
  const weeklyForecast = useSelector(
    (state) => state.forecast.data.DailyForecasts
  );
  const cityKey = useSelector((state) => state.geoposition.data.Key);
  const favorites = useSelector((state) => state.favorites.data);
  const mode = useSelector((state) => state.mode.value);

  const unitDisplay = degree
    ? todaysWeather[0].Temperature.Metric.Value +
      todaysWeather[0].Temperature.Metric.Unit
    : todaysWeather[0].Temperature.Imperial.Value +
      todaysWeather[0].Temperature.Imperial.Unit;

  let iconNum = todaysWeather[0].WeatherIcon;
  if (iconNum < 10) {
    iconNum = "0" + iconNum;
  }

  const favoritePlace = favorites.filter((favorite) => favorite.id === cityKey);

  const toggleFavorite = () => {
    if (favoritePlace.length !== 0) {
      dispatch(removeFromFavorites(cityKey));
    } else {
      const favoriteCity = {
        name: city.value,
        degree: unitDisplay,
        imgSrc: `https://developer.accuweather.com/sites/default/files/${iconNum}-s.png`,
        id: cityKey,
        coords: city.coords,
      };
      dispatch(addToFavorites(favoriteCity));
    }
  };

  return (
    <React.Fragment>
      <div className="homepage-top">
        <img
          src={`https://developer.accuweather.com/sites/default/files/${iconNum}-s.png`}
          alt="weather-description"
          className="weather-description"
        />
        <h1>{city.value}</h1>
        <p>{unitDisplay}</p>
        <div className="favorite" onClick={toggleFavorite}>
          {favoritePlace.length === 1 ? (
            <i className="fas fa-heart"></i>
          ) : (
            <i className="far fa-heart"></i>
          )}
        </div>
        <h4 className={`change-unit-${mode}`} onClick={handleClick}>
          {degree ? "C" : "F"}
        </h4>
      </div>
      <h1>{todaysWeather[0].WeatherText}</h1>
      {weeklyForecast ? (
        <div className="homepage-bot">
          {weeklyForecast.map((daily, idx) => {
            return <DailyWeather daily={daily} key={idx} />;
          })}
        </div>
      ) : (
        <div>LOADING</div>
      )}
    </React.Fragment>
  );
};

export default React.memo(WeatherDisplay);
