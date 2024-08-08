import styled from 'styled-components';

export const DivContainer = styled.div`
  height: 1px;
  display: flex;
  min-height: 100vh;
  align-items: center;
  flex-direction: column;
  background-size: cover;
  justify-content: flex-start;
  background-image: radial-gradient(
    circle at 50% 14em,
    #ee6263 0%,
    #940305 60%,
    #940305 100%
  );
  background-repeat: no-repeat;
`;
//#940305

export const DivContainerMenor = styled.div`
  min-width: 300px;
  min-height: 300px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 6em;
  background-color: white;
  border-radius: 4px;
  padding: 10px;
`;
export const DivImagensCadeado = styled.div`
  margin: 1em;
  display: flex;
  justify-content: center;
`;
export const ImagensCadeado = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  overflow: hidden;
  position: relative;
  font-size: 1.25rem;
  align-items: center;
  flex-shrink: 0;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  line-height: 1;
  user-select: none;
  border-radius: 50%;
  justify-content: center;
`;
export const DivFormulario = styled.div``;
export const DivBotaoLogar = styled.div`
  display: flex;
  padding: 8px;
  align-items: center;
`;

export const BotaoLogar = styled.button`
  display: flex;
  padding: 8px;
  align-items: center;
  font-weight: 500;
  line-height: 1.75;
  border-radius: 4px;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  color: #fff;
  background-color: #940305;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 25px;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
    border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
`;

export const FormLogin = styled.form`
  width: 400px;
  background: #fff;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 100px;
    margin: 10px 0 40px;
  }
  p {
    color: #ff3333;
    margin-bottom: 15px;
    border: 1px solid #ff3333;
    padding: 10px;
    width: 100%;
    text-align: center;
  }
  input {
    flex: 1;
    height: 46px;
    margin-bottom: 15px;
    padding: 0 20px;
    color: #777;
    font-size: 15px;
    width: 100%;
    border: 1px solid #ddd;
    &::placeholder {
      color: #999;
    }
  }
  button {
    color: #fff;
    font-size: 16px;
    background: #fc6963;
    height: 56px;
    border: 0;
    border-radius: 5px;
    width: 100%;
  }
  hr {
    margin: 20px 0;
    border: none;
    border-bottom: 1px solid #cdcdcd;
    width: 100%;
  }
  a {
    font-size: 16;
    font-weight: bold;
    color: #999;
    text-decoration: none;
  }
`;
