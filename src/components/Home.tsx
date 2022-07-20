import React, { FC, useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Masonry from 'react-masonry-css';
import CityCard from './CityCard/CityCard';
import Button from '@material-ui/core/Button';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { makeStyles } from '@material-ui/core/styles';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import fetchCityWeather from '../store/citiesReducer/ActionFetchData';
import { TextField } from '@material-ui/core';
import { NavLink, useNavigate } from 'react-router-dom';
import IWeatherData from './types/types';

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: 'flex',
  },
  homeLogo: {
    textDecoration: 'none',
  },
});

const Home: FC = () => {
  const [weather, setWeather] = useState<any[]>([]);
  const [cityName, setCityName] = useState('');
  const classes = useStyles();
  const savedItems = useAppSelector((state) => state.citiesReducer.forSaveCity);
  const dispatch = useAppDispatch();
  const [titleError, setTitleError] = useState(false);
  const history = useNavigate();

  useEffect(() => {
    for (let key in localStorage) {
      if (!localStorage.hasOwnProperty(key)) {
        continue; // пропустит такие ключи, как "setItem", "getItem" и так далее
      }
      if (key) {
        const localItems = JSON.parse(localStorage.getItem(key) || '');
        setWeather((old) => [...old, localItems]);
      }
    }
  }, []);

  useEffect(() => {
    if (!Array.isArray(savedItems)) {
      const localName = savedItems.name;
      if (localName) {
        localStorage.setItem(localName, JSON.stringify([savedItems]));
        setWeather([]);
        for (let key in localStorage) {
          if (!localStorage.hasOwnProperty(key)) {
            continue; // пропустит такие ключи, как "setItem", "getItem" и так далее
          }
          if (key) {
            const localItems = JSON.parse(localStorage.getItem(key) || '');
            setWeather((old) => [...old, localItems]);
          }
        }
      }
    }
  }, [savedItems]);

  const handleRequest = (name: string) => {
    if (name === '') {
      setTitleError(true);
    }
    if (name) {
      dispatch(fetchCityWeather(name));
      setCityName('');
    }
  };

  const breakpoints = {
    default: 3,
    1100: 2,
    700: 1,
  };

  return (
    <Container>
      <NavLink to="/" className={classes.homeLogo}>
        <Typography variant="h2" color="textSecondary" component="h2">
          Weather App
        </Typography>
      </NavLink>
      <div>
        <TextField
          className={classes.field}
          onChange={(e) => setCityName(e.target.value)}
          label="Enter city"
          value={cityName}
          variant="outlined"
          color="secondary"
          fullWidth
          required
          error={titleError}
        />
        <Button
          type="button"
          onClick={() => handleRequest(cityName)}
          color="secondary"
          variant="contained"
          endIcon={<KeyboardArrowRightIcon />}
        >
          Get info
        </Button>
      </div>
      <Masonry
        breakpointCols={breakpoints}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {weather.length &&
          weather.map((el: [IWeatherData], index: number) =>
            el.length ? (
              <div key={index}>
                <CityCard
                  data={el[0]}
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    history('/cityWeather/' + el[0].name);
                  }}
                  handleRequest={handleRequest}
                  setWeather={setWeather}
                />
              </div>
            ) : null
          )}
      </Masonry>
    </Container>
  );
};

export default Home;
