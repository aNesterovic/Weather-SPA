import React, { FC, useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutlined from '@material-ui/icons/DeleteOutlined';
import UpdateIcon from '@material-ui/icons/Update';

import { makeStyles } from '@material-ui/core';
import IWeatherData, { IModifyWeatherData } from '../types/types';
import mapResponseProperties from '../../hooks/mapResponseProperties';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

const useStyles = makeStyles({
  card: {
    cursor: 'pointer',
  },
  iconData: {
    display: 'flex',
    alignItems: 'center',
  },
  mainInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
  },
  cityImage: {
    width: '100%',
    borderRadius: '20%',
  },
});

interface CityCardProps {
  data: IWeatherData;
  onClick: (e: React.MouseEvent) => void;
  handleRequest: (name: any) => void;
  setWeather: React.Dispatch<React.SetStateAction<any[]>>;
}

const CityCard: FC<CityCardProps> = ({
  data,
  onClick,
  handleRequest,
  setWeather,
}) => {
  const classes = useStyles();
  const [weatherData, setWeatherData] = useState<
    IModifyWeatherData | undefined
  >();
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    localStorage.removeItem(data.name);
    setWeather([]);
    for (let key in localStorage) {
      if (!localStorage.hasOwnProperty(key)) {
        continue; // пропустит такие ключи, как "setItem", "getItem" и так далее
      }
      if (key) {
        const localItems = JSON.parse(localStorage.getItem(key) || '');
        setWeather((old: any[]) => [...old, localItems]);
      }
    }
  };

  useEffect(() => {
    if (data) {
      setWeatherData(mapResponseProperties(data));
    }
  }, [data]);

  return (
    <Container onClick={onClick} className={classes.card}>
      <Card elevation={1}>
        <CardHeader
          action={
            <>
              <IconButton onClick={handleDelete}>
                <DeleteOutlined />
              </IconButton>
              <IconButton
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  handleRequest(weatherData?.location);
                }}
              >
                <UpdateIcon />
              </IconButton>
            </>
          }
        />
        <CardContent>
          <img className={classes.cityImage} src={weatherData?.image} alt="" />
          <div className={classes.mainInfo}>
            <div>
              <Typography variant="body1" color="textSecondary">
                {weatherData?.location}, {weatherData?.country}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {dayjs(weatherData?.date).format('dddd')},{' '}
                {dayjs.utc(weatherData?.date).format('h:mm A')},{' '}
                {weatherData?.description}
              </Typography>
            </div>
            <div className={classes.iconData}>
              <img
                src={`http://openweathermap.org/img/w/${weatherData?.icon_id}.png`}
                alt=""
              />
              <Typography variant="h3" color="textSecondary">
                {weatherData?.temperature}&deg;
              </Typography>
            </div>
          </div>
        </CardContent>
      </Card>
    </Container>
  );
};

export default CityCard;
