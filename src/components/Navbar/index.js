import React, { useState, useEffect } from "react";
import "./Navbar.css";
import imgLogo from '../../img/logo_Allpote.png';
import { Link } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function Navbar() {

  const [userIsLog, setUser] = useState('carregando');

  useEffect(() => {
    const auth = getAuth();
    async function unsubscribe() {
      await onAuthStateChanged(auth, (currentUser) => {
        console.log(currentUser)
        if (currentUser !== null) {
          //esta logado
          setUser('logado');
        } else {
          setUser('naologado');
        }
      });
    }

    unsubscribe();
  }, []);

  function handleLogout() { }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link to="/" className="navbar-brand">
          <img src={imgLogo} className="logo" alt="Logo" width="30" height="30" />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {/* fazemos uma verificacao para saber se o usuario esta logado ou nao */}

            {/* nao utilizeo boolean pois enquando a funcao carregava ele mostrava 
            os <li`s> login register mesmo o usuario logado   */}
            {userIsLog === 'logado' ? (
              <>
                <li className="nav-item">
                  <Link to='/sair' className="btn btn-outline-danger btn-sair">
                    Sair
                  </Link>
                </li>
              </>
            ) : userIsLog === 'naologado' ? (
              <>
                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" className="nav-link">
                    Register
                  </Link>
                </li>
              </>
            ) : (<></>)}
          </ul>
        </div>
      </div>
    </nav>
  )
}