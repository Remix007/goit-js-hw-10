export const fetchCountries = name => {
  const countryPromise = fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  );

  return countryPromise.then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
};
