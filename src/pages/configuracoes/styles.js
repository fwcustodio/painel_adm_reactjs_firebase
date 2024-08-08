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

export const ContainerImagem = styled.div`
  width: 100%;
  display: flex;
  flex: 1;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

export const DivCheckboxAdmin = styled.div`
  margin-top: 10px;
  margin-bottom: 25px;
  height: 5px;
`;

export const ContainerBotoes = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  flex: 1;
  align-items: center;
  flex-direction: row;
`;

export const TextoLabel = styled.div`
  font-size: 20px;
  padding-top: 15px;
`;

