import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import styled from 'styled-components';

const DivCopyright = styled.div`
  margin-top: 50px;
`;

const Copyright = () => {
  return (
    <DivCopyright>
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
          FWC Tecnologia
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </DivCopyright>
  );
};

export default Copyright;
