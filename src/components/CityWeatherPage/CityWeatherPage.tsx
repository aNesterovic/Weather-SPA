import React, { FC, useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { Card, CardContent, makeStyles } from '@material-ui/core';
import { IModifyWeatherData } from '../types/types';
import { useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import mapResponseProperties from '../../hooks/mapResponseProperties';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

const useStyles = makeStyles({
  homeLogo: {
    textDecoration: 'none',
  },
  mainInfo: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
  },
  degreeInfo: {
    display: 'flex',
    alignItems: 'center',
  },
});

const CityWeatherPage: FC = () => {
  const [weatherDataProps, setWeatherDataProps] = useState<
    IModifyWeatherData | undefined
  >();
  const classes = useStyles();
  const params = useParams();

  useEffect(() => {
    const localItems = JSON.parse(localStorage.getItem(params.id || '') || '');
    setWeatherDataProps(mapResponseProperties(localItems[0]));
  }, []);

  return (
    <Container>
      <NavLink to="/" className={classes.homeLogo}>
        <Typography variant="h2" color="textSecondary" component="h2">
          Weather App
        </Typography>
      </NavLink>
      <Card elevation={2}>
        <CardContent>
          <div>
            {weatherDataProps?.location ? (
              <>
                <div className={classes.mainInfo}>
                  <Typography variant="h4" color="textSecondary" component="h4">
                    {weatherDataProps?.location}, {weatherDataProps?.country}
                  </Typography>
                </div>
                <div className={classes.degreeInfo}>
                  <img
                    src={`http://openweathermap.org/img/w/${weatherDataProps?.icon_id}.png`}
                    alt=""
                  />
                  <Typography variant="h4" color="textSecondary">
                    {weatherDataProps?.temperature}&deg;
                  </Typography>
                </div>
                <Typography variant="body2" color="textSecondary">
                  {dayjs(weatherDataProps?.date).format('dddd')},{' '}
                  {dayjs.utc(weatherDataProps?.date).format('h:mm A')},{' '}
                  {weatherDataProps?.description}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Feels like {weatherDataProps.feels_like}&deg;
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {weatherDataProps.wind_speed} km/h
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {weatherDataProps.humidity}% humidity
                </Typography>
              </>
            ) : null}
          </div>
        </CardContent>
      </Card>
    </Container>
  );
};

export default CityWeatherPage;
