import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGeoposition } from "../redux/slices/geopositionSlice";
import { getWeather } from "../redux/slices/weatherSlice";
import { getForecast } from "../redux/slices/forecastSlice";
import { getLocationAutocomplete } from "../redux/slices/locationAutocompleteSlice";
import AutocompleteOption from "./AutocompleteOption";
import useDebounce from "../hooks/useDebounce";

import WeatherDisplay from "./WeatherDisplay";

import "./HomePage.css";

const HomePage = () => {
  const dispatch = useDispatch();
  const degree = useSelector((state) => state.degree.value);
  const geoposition = useSelector((state) => state.geoposition);
  const city = useSelector((state) => state.city);
  const cityCoords = city.coords.lat + ", " + city.coords.lng;
  const todaysWeather = useSelector((state) => state.weather);
  const autocompleteOptions = useSelector((state) => state.autocomplete);
  const forecast = useSelector((state) => state.forecast);

  useEffect(() => {
    dispatch(getGeoposition(cityCoords));
    dispatch(
      getWeather({ locationKey: geoposition.data.Key || "215854", degree })
    );
    dispatch(
      getForecast({ locationKey: geoposition.data.Key || "215854", degree })
    );
  }, [dispatch, degree, cityCoords, geoposition.data.Key]);

  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 1500);
  const [displayAutocomplete, setDisplayAutocomplete] = useState(false);

  useEffect(() => {
    if (debouncedQuery) {
      dispatch(getLocationAutocomplete(debouncedQuery));
    }
  }, [dispatch, debouncedQuery]);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const closeAutocompleteHandler = () => {
    setDisplayAutocomplete(false);
    setQuery("");
  };

  const checkLoading =
    geoposition.status === "loading" ||
    todaysWeather.status === "loading" ||
    forecast.status === "loading" ||
    forecast.status === null
      ? true
      : false;

  const checkError =
    geoposition.status === "failed" ||
    todaysWeather.status === "failed" ||
    autocompleteOptions.status === "failed" ||
    forecast.status === "failed"
      ? true
      : false;

  return (
    <div className="homepage-container">
      <div className="search-bar">
        <input
          placeholder="Search..."
          onChange={handleChange}
          value={query}
          onClick={() => setDisplayAutocomplete(true)}
        />
        {displayAutocomplete && autocompleteOptions.data.length > 0 && (
          <div className="autocomplete" onClick={closeAutocompleteHandler}>
            {autocompleteOptions.data.map((option, idx) => {
              return <AutocompleteOption option={option} key={idx} />;
            })}
          </div>
        )}
      </div>

      {checkLoading ? (
        <div className="lds-dual-ring"></div>
      ) : checkError ? (
        <div>Api call limit exceeded for today :(</div>
      ) : (
        <WeatherDisplay
          todaysWeather={todaysWeather.data}
          cityData={geoposition}
        />
      )}
    </div>
  );
};

export default React.memo(HomePage);
