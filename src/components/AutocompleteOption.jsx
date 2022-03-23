import React from "react";
import { useDispatch } from "react-redux";
import { setCity, getCoordsFromAddress } from "../redux/slices/citySlice";
import { resetAutocompleteData } from "../redux/slices/locationAutocompleteSlice";

import "./AutocompleteOption.css";

const AutocompleteOption = ({ option }) => {
  const dispatch = useDispatch();
  const fullName = option.LocalizedName + ", " + option.Country.LocalizedName;
  const handleClick = () => {
    dispatch(setCity(option.LocalizedName));
    dispatch(getCoordsFromAddress(fullName));
    dispatch(resetAutocompleteData());
  };

  return (
    <div className="autocomplete-option" onClick={handleClick}>
      <p>
        {option.LocalizedName}, {option.Country.LocalizedName}
      </p>
    </div>
  );
};

export default AutocompleteOption;
