import axios from 'axios';

const API_key = 'fc341543b020fb49164d8280a67986ab';
const lon = -121.96;
const lat = 37.35;
const WeatherAPIRequest = () => {
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}`
    )
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};

export default WeatherAPIRequest;
