import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/database';

import { config } from './config';

firebase.initializeApp(config);

const firebaseDB = firebase.database();
const firebaseFees = firebaseDB.ref('fees');
const firebaseResidences = firebaseDB.ref('residences');

export {
    firebase,
    firebaseFees,
    firebaseResidences
}