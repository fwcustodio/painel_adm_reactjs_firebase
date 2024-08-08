/* eslint-disable prettier/prettier */
/* eslint-disable no-unreachable */
'use strict';

const admin = require('firebase-admin');
const auth = admin.auth;
let serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: serviceAccount.databaseURL,
});

//const cors = require('cors')({origin: true});
//exports.enviarEmail = functions.https.onRequest((req, res) => {

const enviarEmail = require('./src/enviar_email');
const enviarNotificacaoPush = require('./src/enviarNotificacaoPush');
const {
  cadastrarUsuario,
  getUsuario,
  getUsuarios,
  atualizarUsuario,
  excluirUsuario,
} = require('./src/usuarios');

exports.enviarEmail = enviarEmail;
exports.enviarNotificacaoPush = enviarNotificacaoPush;
exports.cadastrarUsuario = cadastrarUsuario;
exports.getUsuario = getUsuario;
exports.getUsuarios = getUsuarios;
exports.atualizarUsuario = atualizarUsuario;
exports.excluirUsuario = excluirUsuario;
