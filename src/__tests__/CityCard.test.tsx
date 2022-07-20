import React from 'react';
import { render, screen } from '@testing-library/react';
import IWeatherData from '../components/types/types';
import CityCard from '../components/CityCard/CityCard';

const data: IWeatherData = {
  base: 'stations',
  clouds: {
    all: 75,
  },
  cod: 200,
  coord: {
    lon: 35.27,
    lat: 0.52,
  },
  dt: 1572517487,
  id: 198629,
  main: {
    temp: 20,
    feels_like: 18,
    pressure: 1026,
    humidity: 49,
    temp_min: 20,
    temp_max: 20,
    grnd_level: 1,
    sea_level: 1,
  },
  name: 'Eldoret',
  sys: {
    country: 'KE',
    id: 2541,
    sunrise: 1572491974,
    sunset: 1572535523,
    type: 1,
  },
  timezone: 10800,
  visibility: 10000,
  weather: [
    {
      id: 803,
      main: 'Clouds',
      description: 'broken clouds',
      icon: '04d',
    },
  ],
  wind: {
    deg: 130,
    speed: 8.2,
    gust: 1,
  },
};
const testProps = {
  data,
  onClick: () => '',
  handleRequest: () => '',
  setWeather: () => '',
};

test('renders the CityCard', () => {
  render(<CityCard {...testProps} />);

  expect(screen.getByText(/eldoret, ke/i)).toBeInTheDocument();
  expect(screen.getByText(/broken clouds/i)).toBeInTheDocument();
  expect(screen.getByText(/20°/i)).toBeInTheDocument();
});
