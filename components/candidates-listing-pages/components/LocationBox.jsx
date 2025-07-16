"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addLocation } from "../../../features/filter/candidateFilterSlice";

const LocationBox = () => {
  const { location } = useSelector((state) => state.candidateFilter) || {};
  const [getLocation, setLocation] = useState(location);
  const dispatch = useDispatch();

  // location handler
  const locationHandler = (e) => {
    // dispath(addLocation(e.target.value));
    setLocation(e.target.value);
  };

  // Debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(addLocation(getLocation));
    }, 500);

    return () => clearTimeout(timer);
  }, [getLocation]);

  return (
    <>
      <input
        type="text"
        name="listing-search"
        placeholder="City or postcode"
        value={location}
        onChange={locationHandler}
      />
      <span className="icon flaticon-map-locator"></span>
    </>
  );
};

export default LocationBox;
