import React from 'react';
import styled from 'styled-components';
import {Spinner, Dots} from 'react-activity';
import 'react-activity/dist/react-activity.css';

export const DivLoading = styled.div`
  z-index: 9999;
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.7);
`;

export const DivLoadingMenor = styled.div`
  left: 50%;
  top: ${(props) => (props.login ? '36%' : '43%')};
  position: relative;
  margin-left: -42px;
  margin-top: -40px;
`;

export const DivLoadingMenorDots = styled.div`
  left: 50%;
  top: ${(props) => (props.login ? '45%' : '47%')};
  position: relative;
  margin-left: -54px;
  margin-top: -40px;
`;

export default function Loading(props) {
  return (
    <DivLoading>
      {props.tipo == 'dots' ? (
        <DivLoadingMenorDots {...props}>
          <Dots size={40} />
        </DivLoadingMenorDots>
      ) : (
        <DivLoadingMenor {...props}>
          <Spinner size={60} />
        </DivLoadingMenor>
      )}
    </DivLoading>
  );
}
