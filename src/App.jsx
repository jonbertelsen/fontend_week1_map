import { useState, useEffect } from 'react';
import './App.css';
import SvgMap from './SvgMap';

function App() {
  const [countryElement, setCountryElement] = useState(null);
  const [countryDetails, setCountryDetails] = useState(null);

  function clickHandler(event) {
    if (countryElement != null) {
      countryElement.style.fill = '#c0c0c0';
    }

    setCountryElement(event.target);
    event.target.style.fill = 'red';
  }

  useEffect(() => {
    if (countryElement != null) {
      fetch('https://restcountries.com/v3.1/alpha/' + countryElement.id)
        .then((response) => response.json())
        .then((data) => {
          const countryObj = {
            name: data[0].name.common,
            area: data[0].area,
            population: data[0].population,
          };
          setCountryDetails(countryObj);
        })
        .catch((error) => console.error('Error fetching joke:', error));
    }
  }, [countryElement]);

  return (
    <div>
      <h1>Country info</h1>
      {countryDetails && (
        <div>
          <p>ID: {countryElement.id}</p>
          <p>Name: {countryDetails.name}</p>
          <p>Population: {countryDetails.population}</p>
          <p>Area: {countryDetails.area}</p>
        </div>
      )}

      <div onClick={clickHandler}>
        <SvgMap />
      </div>
    </div>
  );
}

export default App;
