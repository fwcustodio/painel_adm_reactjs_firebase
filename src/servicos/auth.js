import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import {
  getPermissaoAcessoUsuarioFirestore,
  getUsuarioFirestore,
} from '~/servicos/firebase_api';

export const autenticarUsuario = async (Email, Password) => {
  try {
    let Retorno = await firebase
      .auth()
      .signInWithEmailAndPassword(Email, Password);

    let UsuarioFirestore = await getUsuarioFirestore(Retorno.user.uid);
    //console.log('UsuarioFirestore : ' + JSON.stringify(UsuarioFirestore));

    if (!UsuarioFirestore.paths) return null;

    let Usuario = new Object();
    Usuario.ID = Retorno.user.uid;
    Usuario.Nome = Retorno.user.displayName;
    Usuario.Email = Retorno.user.email;
    Usuario.Telefone = Retorno.user.phoneNumber;
    Usuario.Paths = UsuarioFirestore.paths;
    Usuario.TokenGIT = UsuarioFirestore.token_git;
    Usuario.Favoritos = UsuarioFirestore.favoritos;

    setUsuarioAutenticado(Usuario);
    setPermissoesAcessoUsuario(UsuarioFirestore.paths);

    return Usuario;
  } catch (error) {
    console.log(error.code);
    console.log(error.message);

    return error;
  }
};

export const setUsuarioAutenticado = (User) => {
  if (!User) {
    console.log('User inválido - setUsuarioAutenticado');
    return false;
  }
  User.data = Date.now();
  localStorage.setItem('@usuario', JSON.stringify(User));
  return true;
};

export const getUsuarioAutenticado = () => {
  let UsuarioString = localStorage.getItem('@usuario');

  //console.log('UsuarioString : ' + UsuarioString);

  if (UsuarioString) {
    return JSON.parse(UsuarioString);
  }

  return false;
};

export const setPermissoesAcessoUsuario = (Permissoes) => {
  localStorage.setItem('@usuario_permissoes', JSON.stringify(Permissoes));
  return true;
};

export const getPermissoesAcessoUsuario = () => {
  let PermissoesString = localStorage.getItem('@usuario_permissoes');

  if (PermissoesString) {
    //console.log(' PermissoesString : ' + PermissoesString);
    return JSON.parse(PermissoesString);
  }

  return null;
};

export const getPermissaoAcessoUsuario = (Path) => {
  let Permissoes = getPermissoesAcessoUsuario();
  let PathBase = getPathBase(Path);

  return Permissoes.hasOwnProperty(PathBase) ? Permissoes[PathBase] : null;
};

export const getPathBase = (Path) => {
  let PosInicial = 1; // 0 é a barra (/)
  let PosFinal = Path.indexOf('/', 1) > 0 ? Path.indexOf('/', 1) : Path.length;

  //console.log('PosFinal : ' + PosFinal);
  return Path.substring(PosInicial, PosFinal);
};
