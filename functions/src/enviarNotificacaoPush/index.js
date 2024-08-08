const functions = require('firebase-functions');
const {enviarNotificacaoPush: enviarNotificacaoPushF} = require('../core');

enviarNotificacaoPush = functions.https.onCall(Parms => {
  enviarNotificacaoPushF(Parms);
});

module.exports = enviarNotificacaoPush;
