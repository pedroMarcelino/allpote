import React from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

export default function Sair() {
    const navigate = useNavigate(); // Hook para redirecionamento
    const auth = getAuth();

    const handleLogout = async () => {
        try {
            await signOut(auth); // Faz o logout no Firebase
            localStorage.removeItem("authToken"); // Limpa tokens ou informações do usuário, se necessário
            localStorage.removeItem("@detailsUser");
            navigate("/"); // Redireciona para a página de login
        } catch (error) {
            console.error("Erro ao fazer logout:", error.message);
        }
    };
    handleLogout();
}


