import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const path = "todos"

const firebaseConfig = {
    apiKey: "AIzaSyCde7T1vgzHJCycqiFjtHl9zYgr_yfUkao",
    authDomain: "todoapp-ea6f5.firebaseapp.com",
    projectId: "todoapp-ea6f5",
    storageBucket: "todoapp-ea6f5.appspot.com",
    messagingSenderId: "562699202604",
    appId: "1:562699202604:web:1bb9b503122e0904bfe189"
  };

firebase.initializeApp(firebaseConfig);

export const authorize = firebase.auth();

// Configure FirebaseUI.
export const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: '/',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
  };

export const getDocs = async () => {
    const ref = await firebase.firestore().collection(path).get()
    return ref.docs.map(doc => {return {...doc.data(), "key": doc.id}});
}

export const clearDocs = async () => {
    const ref = firebase.firestore().collection(path)
    ref.get().then((data)=>{
        data.docs.forEach(doc => {
            ref.doc(doc.id).delete()
        })
    })
}

export const setDocs = async (items) => {
    items.forEach(item => {
        firebase.firestore().collection(path).doc(item.key).set({text: item.text, done: item.done})
    })
}