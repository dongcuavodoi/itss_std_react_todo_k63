import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'

const path = "todos"

const firebaseConfig = {
  apiKey: "AIzaSyDidnFaGVG3wfhBZczITR964OC3-m5Yn-g",
  authDomain: "itsstodoapp.firebaseapp.com",
  projectId: "itsstodoapp",
  storageBucket: "itsstodoapp.appspot.com",
  messagingSenderId: "577263897045",
  appId: "1:577263897045:web:1d9ab89d1647ced48e555c",
  measurementId: "G-RBDGH6FZRY"
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
    return ref.docs.map(doc => { return { ...doc.data(), "key": doc.id } });
}

export const clearDocs = async () => {
    const ref = firebase.firestore().collection(path)
    ref.get().then((data) => {
        data.docs.forEach(doc => {
            ref.doc(doc.id).delete()
        })
    })
}

export const setDocs = async (items) => {
    items.forEach(item => {
        firebase.firestore().collection(path).doc(item.key).set({ text: item.text, done: item.done })
    })
}

export const uploadImage = async (image) => {
    const ref = firebase.storage().ref().child(`/images/${image.name}`);
    let url = "";
    try {
        await ref.put(image);
        url = await ref.getDownloadURL();
    } catch (err) {
        console.log(err);
    }
    return url;
};


export const storeUser = async (user) => {
    const { uid } = user;
    const userDoc = await firebase.firestore().collection("users").doc(uid).get();
    if (!userDoc.exists) {
        await firebase.firestore().collection("users").doc(uid).set({ name: user.displayName });
        return {
            name: user.displayName,
            avatar: "",
            id: uid,
        };
    } else {
        return {
            id: uid,
            ...userDoc.data(),
        };
    }
}

export const updateAvatar = async (user, image) => {
    try {
        const userDoc = await firebase.firestore().collection("users").doc(user.id).get();
        if (userDoc.exists) {
            await firebase.firestore().collection("users").doc(user.id).update({ ...userDoc.data(), avatar: image });
            return {
                ...user,
                avatar: image
            }
        }
return {
    err: true
}
    } catch (err) {
    return {
        err: true
    }
}
}