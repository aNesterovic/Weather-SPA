import React, { FC } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

const NotFound: FC = () => {
  return (
    <Container>
      <Typography variant="h2" color="textSecondary" component="h2">
        Not Found any information
      </Typography>
    </Container>
  );
};

export default NotFound;
