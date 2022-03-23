import React from "react";
import { useSelector } from "react-redux";
import FavoriteCard from "./FavoriteCard";

import "./Favorites.css";

const Favorites = () => {
  const favorites = useSelector((state) => state.favorites);
  return (
    <div className="favorites-container">
      <h1>Favorites</h1>
      {favorites.data.length === 0 ? (
        <p>You don't have any favorites yet</p>
      ) : (
        <div className="favorite-card-container">
          {favorites.data.map((favorite, idx) => {
            return <FavoriteCard data={favorite} key={idx} />;
          })}
        </div>
      )}
    </div>
  );
};

export default React.memo(Favorites);
