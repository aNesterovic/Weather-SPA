export interface IMain {
  feels_like: number;
  grnd_level: number;
  humidity: number;
  pressure: number;
  sea_level: number;
  temp: number;
  temp_max: number;
  temp_min: number;
}

export interface ICoord {
  lat: number;
  lon: number;
}

export interface ISys {
  country: string;
  id: number;
  sunrise: number;
  sunset: number;
  type: number;
}

export interface IWind {
  deg: number;
  gust: number;
  speed: number;
}

export default interface IWeatherData {
  base: string;
  clouds: { all: number };
  cod: number;
  coord: ICoord;
  dt: number;
  id: number;
  main: IMain;
  name: string;
  sys: ISys;
  timezone: number;
  visibility: number;
  weather: [
    {
      description: string;
      icon: string;
      id: number;
      main: string;
    }
  ];
  wind: IWind;
}

export interface IModifyWeatherData {
  condition: number;
  country: string;
  currentTime: string;
  date: number;
  description: string;
  feels_like: number;
  humidity: number;
  icon_id: string;
  isDay: Boolean;
  location: string;
  max: number;
  min: number;
  image?: string;
  sunrise: string;
  sunset: string;
  temperature: number;
  timezone?: number;
  wind_speed: number;
}
