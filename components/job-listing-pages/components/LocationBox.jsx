"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addLocation } from "../../../features/filter/filterSlice";

const LocationBox = () => {
  const { jobList } = useSelector((state) => state.filter);
  const [getLocation, setLocation] = useState(jobList.location);
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

  // Đồng bộ hóa với store
  useEffect(() => {
    setLocation(jobList.location || "");
  }, [jobList.location]);

  return (
    <>
      <input
        type="text"
        name="listing-search"
        placeholder="City or postcode"
        value={getLocation}
        onChange={locationHandler}
      />
      <span className="icon flaticon-map-locator"></span>
    </>
  );
};

export default LocationBox;
