import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  titulo: {
    marginTop: 20,
    marginBottom: 20,
    // width: 200,
    //float: 'left',
    borderTopWidth: 2,
    borderTopColor: '#3f51b5',
    borderTopStyle: 'solid',
  },
}));

export default function Title(props) {
  const classes = useStyles();

  return (
    <div className={classes.titulo} {...props} color="primary">
      {props.children}
    </div>
  );
}

Title.propTypes = {
  children: PropTypes.node,
};
