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

export const DivCheckbox = styled.div`
  margin-top: 10px;
  margin-bottom: 25px;
  height: 5px;
`;

export const DivCheckboxAdmin = styled.div`
  margin-top: 10px;
  margin-bottom: 25px;
  height: 5px;
`;
export const DivLabelPermissoesAcesso = styled.div`
  margin-bottom: 25px;
`;

export const DivPermissoesAcesso = styled.div`
  margin-top: 40px;
  margin-bottom: 25px;

  padding: 10px;
  padding-left: 5px;
  border: 1px solid rgb(195, 195, 195);

  border-radius: 5px;
`;

export const DivRotasPermissoes = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
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

export const LabelText = styled.div`
  margin: 5px;
  font-weight: bold;
`;
