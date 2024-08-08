import React from 'react';
import styled from 'styled-components';
import {makeStyles} from '@material-ui/core/styles';
import {dimen} from 'react';
import {getWindowDimensions} from '~/core';

const {width, height} = getWindowDimensions();
console.log('width : ' + width);

export const DivConteudoFormulario = styled.div`
  margin: 50px;
  margin-left: auto;
  margin-right: auto;
  width: 70%;
  min-width: 300px;
`;
export const Formulario = styled.form`
  margin-top: 20px;
  margin-bottom: 50px;
`;

export const DivBotao = styled.div`
  margin-top: 40px;

  width: 48%;
  float: left;
  margin-bottom: 15px;
`;

export const DivBotaoVoltar = styled(DivBotao)`
  margin-right: 10px;
`;
export const Label = styled.label`
  font-size: 14px;
  margin-bottom: -5px;
`;

export const ClassesBase = makeStyles((theme) => ({
  Formulario: {
    padding: 20,
  },
}));

export const DivPermissoesAcesso = styled.div`
  margin-top: 40px;
  margin-bottom: 25px;

  padding: 10px;
  padding-left: 5px;
  border: 1px solid rgb(195, 195, 195);

  border-radius: 5px;
`;

export const DivLabelPermissoesAcesso = styled.div`
  margin-bottom: 25px;
`;
