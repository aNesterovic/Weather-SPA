import React, { FC } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutlined from '@material-ui/icons/DeleteOutlined';
import { makeStyles } from '@material-ui/core';

// const useStyles = makeStyles({});

const CityCard: FC = () => {
  const handleDelete = (e: any) => {
    console.log(e.target);
  };
  return (
    <Container>
      <Card elevation={1}>
        <CardHeader
          action={
            <IconButton onClick={handleDelete}>
              <DeleteOutlined />
            </IconButton>
          }
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary">
            Card
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default CityCard;
