import './css/styles.css';
import Debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './js/fetchCountries';
import templateCountries from './templates/countries.hbs';
import templateCountry from './templates/country.hbs';

const DEBOUNCE_DELAY = 300;

const inputFill = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

inputFill.addEventListener('input', Debounce(onInputSerch, DEBOUNCE_DELAY));

function onInputSerch(event) {
 

  const inputValue = event.target.value;
  const name = inputValue.trim();
  if (name.length === 0) {
    return Notiflix.Notify.info('This field should not be empty');
  }
  clearContent();

  fetchCountries(name)
    .then(renderContent)
    .catch(error =>
      Notiflix.Notify.failure('Oops, there is no country with that name')
    );
}

function renderCountryList(countries) {
  const murkup = templateCountries(countries);
  countryList.innerHTML = murkup;
}


function renderCountry(countries) {
  countries.languages = Object.values(countries.languages).join(', ');
  const country = templateCountry(countries);
  countryInfo.innerHTML = country;
}

function renderContent(countries) {
  if (countries.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
    return;
  }
  if (countries.length > 1) {
    renderCountryList(countries);
    return;
  }
  renderCountry(countries[0]);
}


