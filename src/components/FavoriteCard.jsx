import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCoords, setCity } from "../redux/slices/citySlice";
import { setDataKey } from "../redux/slices/geopositionSlice";
import { Link } from "react-router-dom";

import "./FavoriteCard.css";

const FavoriteCard = (props) => {
  const { name, imgSrc, degree, id, coords } = props.data;
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(setCity(name));
    dispatch(setDataKey(id));
    dispatch(setCoords(coords));
  };
  const mode = useSelector((state) => state.mode.value);

  return (
    <Link
      to={"/"}
      className={`favorite-container ${mode}-mode`}
      onClick={handleClick}
    >
      <h1>{name}</h1>
      <img src={imgSrc} alt="weather-display" />
      <p>{degree}</p>
    </Link>
  );
};

export default React.memo(FavoriteCard);
