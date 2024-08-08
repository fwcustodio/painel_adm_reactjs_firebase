import firebase from 'firebase/app';

const firebaseConfig = {
  apiKey: '',
  authDomain: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
  databaseURL: '',
};

export const init = () => {
  firebase.initializeApp(firebaseConfig);
};
