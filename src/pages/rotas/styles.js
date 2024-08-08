import React from 'react';
import styled from 'styled-components';
import {makeStyles} from '@material-ui/core/styles';

export const DivConteudoFormulario = styled.div`
  margin: 50px;
  margin-left: auto;
  margin-right: auto;
  width: 30%;
  min-width: 400px;
`;
export const Formulario = styled.form`
  margin-top: 20px;
  margin-bottom: 50px;
`;

export const DivBotao = styled.div`
  margin-top: 60px;

  width: 48%;
  float: left;
  margin-bottom: 25px;
`;

export const DivBotaoVoltar = styled(DivBotao)`
  margin-right: 10px;
`;
export const Label = styled.label`
  font-size: 16px;
  margin-bottom: -5px;
`;
