import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  titulo: {
    padding: 15,
    width: 100,
    float: 'left',
  },
}));

export default function Title(props) {
  const classes = useStyles();

  return (
    <Typography
      className={classes.titulo}
      {...props}
      component="h2"
      variant="h6"
      color="primary"
      gutterBottom>
      {props.children}
    </Typography>
  );
}

Title.propTypes = {
  children: PropTypes.node,
};
