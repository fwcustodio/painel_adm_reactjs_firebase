import React, {createContext, useState, useEffect} from 'react';
import {firebaseSingOut} from '~/servicos/firebase_api';
import firebase from 'firebase/app';
import {getUsuarioAutenticado} from '~/servicos/auth';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [User, setUser] = useState(getUsuarioAutenticado());
  const [NovaMensagem, setNovaMensagem] = useState(false);

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged((UserParm) => {
      setUser(UserParm);
      //console.log('UserParm : ' + UserParm);
    });
    subscriber(); // unsubscribe on unmount
    getUsuarioAutenticado();
  }, []);

  async function signInContext(User) {
    setUser(User);
  }

  async function setNovaMensagemDados(MSG_RESULTADO, MSG_TIPO_ACAO) {
    localStorage.setItem('@MSG_RESULTADO', MSG_RESULTADO.toString());
    localStorage.setItem('@MSG_TIPO_ACAO', MSG_TIPO_ACAO);

    setNovaMensagem(true);
  }

  async function signOutContext() {
    localStorage.clear();
    await firebaseSingOut();
    setUser(null);
    //setTipoUsuario(null);
  }

  const getURLBase = () => {
    let Dominio = window.location.hostname;

    let URLBase =
      Dominio.indexOf('localhost') >= 0
        ? 'http://localhost:3000'
        : `https://${Dominio}`;
    console.log('Dominio : ' + Dominio);
    console.log('URLBase : ' + URLBase);

    return URLBase;
  };

  return (
    <AuthContext.Provider
      value={{
        User: User,
        setUser,
        signInContext,
        signOutContext,
        NovaMensagem,
        setNovaMensagem,
        setNovaMensagemDados,
        getURLBase,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
