/* eslint-disable prettier/prettier */
/* eslint-disable consistent-return */
/* eslint-disable no-await-in-loop */
/* eslint-disable promise/always-return */

const functions = require('firebase-functions');
const database = functions.database;
const admin = require('firebase-admin');
const firestore = admin.firestore;
const FieldValue = firestore.FieldValue;

const enviarNotificacaoPush = (Parms) => {
  console.log('enviarNotificacaoPush');
  let {Token} = Parms;
  let {TipoNotificacao} = Parms;

  console.log('Token : ' + Token);
  console.log('TipoNotificacao : ' + TipoNotificacao);

  let Titulo;
  let Body;
  let Link;

  //AtendimentoID = 15;

  switch (TipoNotificacao) {
    case 'nova_solicitacao_profissional':
      Titulo = 'Nova solicitação de atendimento.';
      Body = 'Toque para ver';
      break;

    default:
      break;
  }

  var message = {
    notification: {
      title: Titulo,
      body: Body,
    },
    data: {
      atendimento_id: AtendimentoID ? AtendimentoID : '',
      solicitacao_id: SolicitacaoID ? SolicitacaoID : '',
    },
    token: Token,
  };

  // Send a message to the device corresponding to the provided
  // registration token.
  admin
    .messaging()
    .send(message)
    .then((response) => {
      // Response is a message ID string.
      console.log('Successfully sent message:', response);
      return true;
    })
    .catch((error) => {
      console.log('Error sending message:', error);
      return false;
    });
};

const atualizarCadClientePago = async function (ClienteID) {
  console.log('atualizarCadClientePago');

  let Dados = {
    conta_paga: true,
    updateAt: FieldValue.serverTimestamp(),
  };
  await firestore().collection('clientes').doc(ClienteID).update(Dados);

  return true;
};

module.exports.enviarNotificacaoPush = enviarNotificacaoPush;
module.exports.atualizarCadClientePago = atualizarCadClientePago;
