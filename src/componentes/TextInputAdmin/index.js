import React from 'react';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import CurrencyInput from 'react-currency-masked-input';
import {makeStyles} from '@material-ui/core/styles';

import styled from 'styled-components';
import {Label} from '~/styles_base';

export const DivMargin = styled.form`
  margin-bottom: 10px;
`;

export const DivMarginSelect = styled.form`
  margin-top: 15px;
  margin-bottom: 15px;
`;

export const DivMarginSelectOrcamentos = styled.form`
  margin-top: 15px;
  margin-bottom: 15px;
`;

export const TextInputAdmin = (props) => (
  <DivMargin>
    <TextField variant="outlined" fullWidth size="small" {...props} />
  </DivMargin>
);

export const TextInputAdminOrcamentos = ({tamanho, ...props}) => (
  <DivMargin style={{marginBottom: 10, width: tamanho == 'menor' ? 250 : 650}}>
    <TextField
      variant="outlined"
      fullWidth
      margin="none"
      size="small"
      {...props}
    />
  </DivMargin>
);

export const SelectInputAdmin = (props) => (
  <DivMarginSelect style={{flexDirection: 'row'}}>
    {props.label && <Label style={{}}>{props.label}</Label>}

    <Select
      variant="outlined"
      margin="normal"
      fullWidth
      size="small"
      {...props}>
      {props.children}
    </Select>
  </DivMarginSelect>
);

export const SelectInputAdminOrcamentos = (props) => (
  <>
    <div style={{marginTop: 0}}>
      {props.label && <Label style={{fontSize: 12}}>{props.label}</Label>}
      <DivMarginSelect style={{flexDirection: 'row', width: 500, marginTop: 0}}>
        <Select variant="outlined" margin="none" size="small" {...props}>
          {props.children}
        </Select>
      </DivMarginSelect>
    </div>
  </>
);

export const MoneyInputAdmin = (props) => (
  <DivMarginSelect>
    <CurrencyInput name="myInput" required {...props} />
  </DivMarginSelect>
);

//export default TextInputAdmin;
