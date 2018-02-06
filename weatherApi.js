const rootUrl = 'http://api.openweathermap.org/data/2.5/weather?appid=6ffab93007d5986c459cb3d145779e96&units=imperial';

export const fetchWeather = (lat,lon) => {
  const url = rootUrl+'&lat='+lat+'&lon='+lon;
  console.log("DANNNNN",url);

  return fetch(url)
    .then(res => res.json())
    .then(json => {
      console.log(json);
      return ({
        temp: json.main.temp,
        weather: json.weather[0].main
      });
     });
};