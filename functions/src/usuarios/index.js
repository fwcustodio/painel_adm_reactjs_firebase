/* eslint-disable prefer-arrow-callback */
/* eslint-disable consistent-return */
/* eslint-disable no-await-in-loop */
/* eslint-disable promise/always-return */

const functions = require('firebase-functions');
const admin = require('firebase-admin');

cadastrarUsuario = functions.https.onCall(async (Parms) => {
  const {Dados} = Parms;
  let User = null;

  console.log('Dados : ' + JSON.stringify(Dados));

  await admin
    .auth()
    .createUser(Dados)
    .then(function (userRecord) {
      console.log('Successfully created new user:', userRecord.uid);
      User = userRecord;

      return User;
    })
    .catch(function (error) {
      console.log('Error creating new user:', error);
    });

  return User;
});

getUsuarios = functions.https.onCall(async (Parms) => {
  let Usuarios = [];
  await admin
    .auth()
    .listUsers()
    .then(function (listUsersResult) {
      listUsersResult.users.forEach(function (userRecord) {
        userRecord.Id = userRecord.uid;
        userRecord.ID = userRecord.uid;
        userRecord.id = userRecord.uid;

        Usuarios.push(userRecord);
      });
    })
    .catch(function (error) {
      console.log('Error listing users:', error);
    });

  //console.log('Usuarios : ' + Usuarios);
  return Usuarios;
});

module.exports = getUsuarios;

getUsuario = functions.https.onCall(async (Parms) => {
  const {Uid} = Parms;
  let Usuario;

  await admin
    .auth()
    .getUser(Uid)
    .then(function (userRecord) {
      userRecord.Id = userRecord.uid;
      userRecord.ID = userRecord.uid;
      userRecord.id = userRecord.uid;

      Usuario = userRecord;
    })
    .catch(function (error) {
      console.log('Error fetching user data:', error);
    });

  //console.log('Usuario : ' + Usuario);
  return Usuario;
});

atualizarUsuario = functions.https.onCall(async (Parms) => {
  const {Uid} = Parms;
  const {Dados} = Parms;

  await admin
    .auth()
    .updateUser(Uid, Dados)
    .catch(function (error) {
      console.log('Error updating user:', error);
    });

  return true;
});

excluirUsuario = functions.https.onCall(async (Parms) => {
  const {Uid} = Parms;

  await admin
    .auth()
    .deleteUser(Uid)
    .catch(function (error) {
      console.log('Error deleting user:', error);
    });

  return true;
});

module.exports.cadastrarUsuario = cadastrarUsuario;
module.exports.getUsuario = getUsuario;
module.exports.getUsuarios = getUsuarios;
module.exports.atualizarUsuario = atualizarUsuario;
module.exports.excluirUsuario = excluirUsuario;
