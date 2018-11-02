import firebase from 'firebase/app';
import 'firebase/auth'
import 'firebase/database'

const config = {
    apiKey: "AIzaSyDbTByQdQSqS6MwkwrUrPuItJbyRshwqno",
    authDomain: "book-react.firebaseapp.com",
    databaseURL: "https://book-react.firebaseio.com",
    projectId: "book-react",
    storageBucket: "book-react.appspot.com",
    messagingSenderId: "829524326393"
  };

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

const db = firebase.database();
const auth = firebase.auth();

export {
    db,
    auth,
};