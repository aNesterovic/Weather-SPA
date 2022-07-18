import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

export default function mapResponseProperties(value) {
  const mapped = {
    location: value.name,
    condition: value.cod,
    country: value.sys.country,
    date: value.dt,
    description: value.weather[0].description,
    feels_like: Math.round(value.main.feels_like),
    humidity: value.main.humidity,
    icon_id: value.weather[0].icon,
    image: value.image,
    sunrise: value.sys.sunrise,
    sunset: value.sys.sunset,
    temperature: Math.round(value.main.temp),
    timezone: value.timezone / 3600, // convert from seconds to hours
    wind_speed: Math.round(value.wind.speed * 3.6), // convert from m/s to km/h
    currentTime: '',
    max: 0,
    isDay: false,
    min: 0,
  };

  if (mapped.sunset || mapped.sunrise) {
    mapped.currentTime = dayjs
      .utc(dayjs.unix(mapped.date))
      .utcOffset(mapped.timezone)
      .format();
    mapped.sunrise = dayjs
      .utc(dayjs.unix(mapped.sunrise))
      .utcOffset(mapped.timezone)
      .format();
    mapped.sunset = dayjs
      .utc(dayjs.unix(mapped.sunset))
      .utcOffset(mapped.timezone)
      .format();
    mapped.isDay =
      mapped.currentTime > mapped.sunrise && mapped.currentTime < mapped.sunset
        ? true
        : false;
  }

  if (value.weather[0].description) {
    mapped.description =
      value.weather[0].description.charAt(0).toUpperCase() +
      value.weather[0].description.slice(1);
  }

  if (value.main.temp_min && value.main.temp_max) {
    mapped.max = Math.round(value.main.temp_max);
    mapped.min = Math.round(value.main.temp_min);
  }

  return mapped;
}
