import React, {useContext} from 'react';
import {
  getUsuarioAutenticado,
  getPermissaoAcessoUsuario,
} from '~/servicos/auth';
import {Route, Redirect} from 'react-router-dom';
import AuthContext from '~/contexts/auth';

export function PrivateRoute({path: Path, component: Component, ...rest}) {
  const {User} = useContext(AuthContext);
  let Expirado = false;

  if (User) {
    //console.log('User : ' + JSON.stringify(User));

    let Data = User.data;

    if (!Data) {
      Expirado = true;
    } else {
      let DataAtual = Date.now();
      let DataResult = DataAtual - parseInt(Data);

      //console.log('Data : ' + Data);
      //console.log('DataAtual : ' + DataAtual);
      //console.log('DataResult : ' + DataResult);

      if (DataResult > 604800000) {
        // 1 semana
        Expirado = true;
      }
    }
  }

  //console.log('Path : ' + Path);
  //console.log('User : ' + JSON.stringify(User));

  //let UserPermission =
  return (
    <Route
      path={Path}
      {...rest}
      render={(props) =>
        //User && getPermissaoAcessoUsuario(Path) !== null ? (
        User && !Expirado ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: !User || Expirado ? '/login' : '/sem-permissao',
              state: {from: props.location},
            }}
          />
        )
      }
    />
  );
}
