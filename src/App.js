import React, { useState, useEffect } from 'react'
import { authorize, uploadImage, storeUser, updateAvatar } from "./lib/firebase"

/* スタイルシート */
import './styles/main.css';

/* コンポーネント */
import Todo from './components/Todo';
import Login from './components/Login';

function App() {
  const [isModal, setIsModal] = useState(false);
  const active = isModal ? "is-active" : "";
  const [user, setUser] = useState([]); // Local signed-in state.

  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unregisterAuthObserver = authorize.onAuthStateChanged(async user => {
      let newUser = null;
      if (user) {
        newUser = await storeUser(user);
      }
      setUser(newUser);
    });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  const handleClick = () => {
    setIsModal(!isModal);
  };

  const handleUpload = async (e) => {
    const image = e.target.files[0]
    const imageUrl = await uploadImage(image);

    await updateAvatar(user, imageUrl).then(data => {
      if (!data.err) {
        setUser(data)
      }
      setIsModal(false)
    })
  }

  if (!user) {
    return (
      <Login />
    );
  } else {
    return (
      <div>
        <div className={`modal ${active}`}>
          <div className="modal-background" onClick={handleClick}></div>
          <div className="modal-content">
            <div className="file is-boxed is-large is-centered" >
              <label className="file-label">
                <input className="file-input" type="file" name="resume" accept='image/*' onChange={handleUpload} />
                <span className="file-cta">
                  <span className="file-icon">
                    <i className="fas fa-upload"></i>
                  </span>
                  <span className="file-label">画像を選択してください</span>
                </span>
              </label>
            </div>
          </div>
        </div>
        <div className="navbar-end">
          <div className='navbar-item'>
            <div className='icon is-rouded'>
              <img className="image is-rounded" src={user.avatar} alt='Avatar'
                onClick={handleClick}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "default.png";
                }}></img>
            </div>
            <p><b>{user.name}</b></p>
          </div>
          <div className='navbar-item'>
            <button className="button is-danger" onClick={() => authorize.signOut()}>Sign-out</button>
          </div>
        </div>
        <div className="container is-fluid">
          <Todo />
        </div>
      </div>
    );
  }
}

export default App;
