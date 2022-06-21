import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCde7T1vgzHJCycqiFjtHl9zYgr_yfUkao",
    authDomain: "todoapp-ea6f5.firebaseapp.com",
    projectId: "todoapp-ea6f5",
    storageBucket: "todoapp-ea6f5.appspot.com",
    messagingSenderId: "562699202604",
    appId: "1:562699202604:web:1bb9b503122e0904bfe189"
  };

firebase.initializeApp(firebaseConfig);