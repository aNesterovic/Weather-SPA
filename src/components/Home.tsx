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

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: 'flex',
  },
});

const Home: FC = () => {
  const [weather, setWeather] = useState<any[]>([]);
  const [cityName, setCityName] = useState('');
  const classes = useStyles();
  const savedItems = useAppSelector((state) => state.citiesReducer.forSaveCity);
  const dispatch = useAppDispatch();
  const [titleError, setTitleError] = useState(false);

  useEffect(() => {
    for (let key in localStorage) {
      if (!localStorage.hasOwnProperty(key)) {
        continue; // пропустит такие ключи, как "setItem", "getItem" и так далее
      }
      if (key) {
        console.log(weather);
        const localItems = JSON.parse(localStorage.getItem(key) || '');
        setWeather((old) => [...old, localItems]);
      }
    }
  }, []);

  useEffect(() => {
    if (!Array.isArray(savedItems)) {
      const localName = savedItems.name;
      if (localName) {
        console.log(localName);
        localStorage.setItem(localName, JSON.stringify([savedItems]));
        setWeather([]);
        for (let key in localStorage) {
          if (!localStorage.hasOwnProperty(key)) {
            continue; // пропустит такие ключи, как "setItem", "getItem" и так далее
          }
          if (key) {
            console.log(weather);
            const localItems = JSON.parse(localStorage.getItem(key) || '');
            setWeather((old) => [...old, localItems]);
          }
        }
      }
    }
  }, [savedItems]);

  const handleRequest = () => {
    if (cityName === '') {
      setTitleError(true);
    }
    if (cityName) {
      dispatch(fetchCityWeather(cityName));
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
      <Typography variant="h2" color="textSecondary" component="h2">
        Weather App
      </Typography>
      <div>
        <TextField
          className={classes.field}
          onChange={(e) => setCityName(e.target.value)}
          label="Enter city"
          variant="outlined"
          color="secondary"
          fullWidth
          required
          error={titleError}
        />
        <Button
          type="button"
          onClick={handleRequest}
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
          weather.map((el, index): any =>
            el.length ? (
              <div key={index}>
                <CityCard />
              </div>
            ) : null
          )}
      </Masonry>
    </Container>
  );
};

export default Home;
