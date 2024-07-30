import { useEffect, useState } from "react";
import styles from "./States.module.css";
const AllCountyStates = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectCountry, setSelectCountry] = useState("");
  const [selectStates, setSelectStates] = useState("");
  const [selectCities, setSelectCities] = useState("");
  useEffect(() => {
    fetchAllCountry();
  }, []);

 
  const fetchAllCountry = async () => {
    try {
      const allCountryResponse = await fetch(
        `https://crio-location-selector.onrender.com/countries`
      );
      if (!allCountryResponse.ok)
        throw new Error("Network response was not ok");
      const resultcountry = await allCountryResponse.json();
      console.log("All country", resultcountry);
      setCountries(resultcountry);
    } catch (e) {
      console.error("fetching allCountry error", e.message);
      setCountries([]);
    }
  };

  const fetchState = async (country) => {
    try {
      const allState = await fetch(
        `https://crio-location-selector.onrender.com/country=${country}/states`
      );

      const stateResult = await allState.json();
      
      setStates(stateResult);
    } catch (e) {
      console.error("fetching state error", e.message);
      setStates([]);
    }
  };
 
  const fetchCities = async (country, states) => {
    try {
      const allCities = await fetch(
        `https://crio-location-selector.onrender.com/country=${country}/state=${states}/cities`
      );

      const citiesResult = await allCities.json();
      setCities(citiesResult);
    } catch (e) {
      
      setCities([]);
    }
  };
  const handleCountries = (e) => {
    const country = e.target.value;
    setSelectCountry(country);
    setSelectStates("");
    setSelectCities("");
    setStates([]);
    setCities([]);
    if (country) {
      fetchState(country);
    }
  };
  const handleStates = (e) => {
    const state = e.target.value;
    setSelectStates(state);
    setSelectCities("");
    setCities([]);
    if (state) {
      fetchCities(selectCountry, state);
    }
  };
  const handleCities = (e) => {
    setSelectCities(e.target.value);
  };
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Select Location</h1>
      <div className={styles.box}>
        <select
          className={styles.inputBox}
          value={selectCountry}
          onChange={handleCountries}
        >
          <option>Select Country</option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>{" "}
        <select
          className={styles.inputBox}
          value={selectStates}
          onChange={handleStates}
          disabled={!selectCountry}
        >
          <option>Select State</option>
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>{" "}
        <select
          className={styles.inputBox}
          value={selectCities}
          onChange={handleCities}
          disabled={!selectStates}
        >
          <option>Select City</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>
      {selectCities && selectStates && selectCountry && (
        <div>
          <span>
            <h4 style={{ display: "inline" }}>You selected</h4>
            <h2 style={{ display: "inline" }}> {selectCities}</h2>,{" "}
            <span style={{ color: "#cccccc" }}>
              {selectStates}, {selectCountry}
            </span>
          </span>
        </div>
      )}
    </div>
  );
};

export default AllCountyStates;