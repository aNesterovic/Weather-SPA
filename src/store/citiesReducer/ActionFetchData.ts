import axios from 'axios';
import { AppDispatch } from '..';
import {
  forSaveCityFetching,
  forSaveCitySuccess,
  forSaveCityError,
} from './citiesReducer';

const fetchCityWeather =
  (cityName: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(forSaveCityFetching());
      const API_key = 'fc341543b020fb49164d8280a67986ab';
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_key}&units=metric`
      );
      dispatch(forSaveCitySuccess(response.data));
    } catch (e: any) {
      dispatch(forSaveCityError(e.message));
    }
  };

export default fetchCityWeather;
