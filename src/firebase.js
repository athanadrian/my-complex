import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

import { config } from './config';

firebase.initializeApp(config);

const firebaseDB = firebase.database();
const firebaseFees = firebaseDB.ref('fees');
const firebaseResidences = firebaseDB.ref('residences');
const firebaseNewsLetters = firebaseDB.ref('newsletters');

export {
    firebase,
    firebaseFees,
    firebaseResidences,
    firebaseNewsLetters
}