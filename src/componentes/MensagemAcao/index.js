import React, {useEffect, useState, useContext} from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {makeStyles} from '@material-ui/core/styles';
import {getMensagemAcao} from '~/core';
import AuthContext from '~/contexts/auth';

const MensagemAcao = (props) => {
  const [MostrarMensagemAcao, setMostrarMensagemAcao] = useState(false);
  const [MensagemAcao, setMensagemAcao] = useState();
  const [MensagemSucesso, setMensagemSucesso] = useState(true);
  const {Carregando} = props;
  const {NovaMensagem, setNovaMensagem} = useContext(AuthContext);

  useEffect(() => {
    verificarNovaMensagem();
  }, [NovaMensagem]);

  const verificarNovaMensagem = () => {
    let MSGTipoAcao = localStorage.getItem('@MSG_TIPO_ACAO');
    let MSGResultado = localStorage.getItem('@MSG_RESULTADO');

    //console.log('MSGTipoAcao : ' + MSGTipoAcao);
    //console.log('MSGResultado : ' + MSGResultado);

    if (MSGTipoAcao && MSGResultado) {
      localStorage.removeItem('@MSG_TIPO_ACAO');
      localStorage.removeItem('@MSG_RESULTADO');

      let MensagemAcaoAux = getMensagemAcao(MSGTipoAcao, MSGResultado);

      let MensagemSucessoAux =
        MSGResultado === 'true' || MSGResultado === true ? true : false;

      setMensagemAcao(MensagemAcaoAux);
      setMensagemSucesso(MensagemSucessoAux);
      setMostrarMensagemAcao(true);
      setNovaMensagem(false);
    }
  };

  const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  };
  return (
    <div>
      {MostrarMensagemAcao && MensagemAcao && !Carregando ? (
        <Snackbar
          anchorOrigin={{vertical: 'top', horizontal: 'center'}}
          open={MostrarMensagemAcao}
          autoHideDuration={6000}
          onClose={() => {
            //console.log('fechou');
            setMostrarMensagemAcao(false);
          }}>
          <Alert
            onClose={() => {
              setMostrarMensagemAcao(false);
            }}
            severity={MensagemSucesso ? 'success' : 'error'}>
            {MensagemAcao}
          </Alert>
        </Snackbar>
      ) : (
        <></>
      )}
    </div>
  );
};

export default MensagemAcao;
