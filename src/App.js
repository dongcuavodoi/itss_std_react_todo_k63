import React, { useState, useEffect } from 'react'
import { authorize } from "./lib/firebase"

/* スタイルシート */
import './styles/main.css';

/* コンポーネント */
import Todo from './components/Todo';
import Login from './components/Login';

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.

  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unregisterAuthObserver = authorize.onAuthStateChanged(user => {
      setIsSignedIn(!!user);
    });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  if (!isSignedIn) {
    return (
      <Login />
    );
  } else {
    return (
      <div>
        <div class="navbar-end">
          <p class="navbar-item">Welcome <span>{authorize.currentUser.displayName}</span></p>
          <div class="panel-block">
            <button className="button is-danger" onClick={() => authorize.signOut()}>Sign-out</button></div>
        </div>
        <div className="container is-fluid">
          <Todo />
        </div>
      </div>
    );
  }
}

export default App;
