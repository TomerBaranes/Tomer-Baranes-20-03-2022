import { configureStore } from "@reduxjs/toolkit";
import degreeReducer from "./slices/degreeSlice";
import favoritesReducer from "./slices/favoritesSlice";
import modeReducer from "./slices/modeSlice";
import geopositionReducer from "./slices/geopositionSlice";
import weatherReducer from "./slices/weatherSlice";
import forecastReducer from "./slices/forecastSlice";
import autocompleteReducer from "./slices/locationAutocompleteSlice";
import cityReducer from "./slices/citySlice";

export const store = configureStore({
  reducer: {
    degree: degreeReducer,
    favorites: favoritesReducer,
    mode: modeReducer,
    geoposition: geopositionReducer,
    weather: weatherReducer,
    forecast: forecastReducer,
    autocomplete: autocompleteReducer,
    city: cityReducer,
  },
});
