import { useState } from "react";
import { Link } from "react-router-dom";
// import './register.css'; //esta puxando do login
import NavBar from "../../components/Navbar";

import { auth } from "../../firebaseConnection";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import { handleFirebaseError, isValidEmail } from "../../utils/GlobalFunctions";

import { useNavigate } from "react-router-dom";

export default function Register() {

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confSenha, setConfSenha] = useState('');

    const notifyErrorEmail = () => toast.error("E-mail inserido é invalido!");
    const notifyErrorPassword = () => toast.warning("As senhas não estão iguais, ou não preenchidas!");
    const notifyErrorsFirebase = (msg) => toast.error(msg);

    const redirect = useNavigate();


    async function handleRegister(e) {
        e.preventDefault();

        if (isValidEmail(email)) {
            if (senha === confSenha && senha !== "" && confSenha !== "") {
                // console.log('entrei senha CERTAS')
                await createUserWithEmailAndPassword(auth, email, senha)
                    .then(() => {
                        redirect('/dashboard', { replace: true })
                    })
                    .catch((e) => {
                        // console.log(handleFirebaseError(e))
                        notifyErrorsFirebase(handleFirebaseError(e))
                    })
            } else {
                //senhas diferetens
                // console.log('entrei senha erradas')
                notifyErrorPassword();
            }
        } else {
            //email invalido
            notifyErrorEmail();
        }


    }

    return (
        <div>
            <NavBar />
            <div className="containerLogin">
                <div className="box">
                    <h2>Crie sua Conta!</h2>
                    <span className="spanForm">Será que vai ser sua vez de ganhar?💲</span>
                    <form className="form" onSubmit={handleRegister}>
                        <input type="text" placeholder="Digite seu e-mail..." value={email} onChange={(v) => { setEmail(v.target.value) }} />
                        <input type="password" placeholder="**********" value={senha} onChange={(v) => { setSenha(v.target.value) }} />
                        <input type="password" placeholder="Confirme sua senha" value={confSenha} onChange={(v) => { setConfSenha(v.target.value) }} />
                        <button type="submit">Cadastrar</button>

                        <Link to='/login' className="spantLogin">
                            <span>Já possui conta? Clique aqui!</span>
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




