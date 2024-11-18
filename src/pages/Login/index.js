import { useState } from "react";
import { Link } from "react-router-dom";
import './login.css';
import NavBar from "../../components/Navbar";

import { auth } from '../../firebaseConnection';
import { signInWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import { handleFirebaseError, isValidEmail } from "../../utils/GlobalFunctions";

import { useNavigate } from "react-router-dom";

export default function Login() {

    const redirect = useNavigate();
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const notifyErrorEmail = () => toast.error("E-mail inserido é invalido!");
    const notifyErrorPassword = () => toast.error("Insira uma senha, ela deve conter 6 caracteres!");
    const notifyErrorsFirebase = (msg) => toast.error(msg);


    async function handleLogin(e) {
        e.preventDefault();

        if (isValidEmail(email)) {
            if (senha !== "") {
                await signInWithEmailAndPassword(auth, email, senha)
                    .then(() => {
                        redirect('/dashboard', { replace: true })//faz o redirecionamento e o replace da o refresh na tela
                    })
                    .catch((e) => {
                        // console.log(e.code)
                        notifyErrorsFirebase(handleFirebaseError(e))
                    })
            } else {
                notifyErrorPassword();
            }
        } else {
            notifyErrorEmail();
        }
    }

    return (
        <div>
            <NavBar />
            <div className="containerLogin">
                <div className="box">
                    <h2>Bem-vindo</h2>
                    <span className="spanForm">Faça o login para entrar na All Pote!💰</span>
                    <form className="form" onSubmit={handleLogin}>
                        <input type="text" placeholder="Digite seu e-mail..." value={email} onChange={(v) => { setEmail(v.target.value) }} />
                        <input type="password" placeholder="**********" value={senha} onChange={(v) => { setSenha(v.target.value) }} />
                        <button type="submit">Acessar</button>
                        <Link to='/register' className="spantLogin">
                            <span>Não possui conta? Clique aqui!</span>
                        </Link>
                    </form>
                </div>
            </div>

            <ToastContainer
                position="top-right"
                autoClose={10000}       // Fecha automaticamente após 3 segundos
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    )
}