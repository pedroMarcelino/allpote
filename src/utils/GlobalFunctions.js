export const handleFirebaseError = (error) => {
    switch (error.code) {
        case "auth/email-already-in-use":
            return "Este e-mail já está em uso. Tente outro.";
        case "auth/invalid-email":
            return "O e-mail fornecido é inválido.";
        case "auth/weak-password":
            return "A senha deve ter pelo menos 6 caracteres.";
        case "auth/invalid-credential":
            return "E-mail ou senha incorretas!";
        default:
            return "Ocorreu um erro inesperado. Tente novamente.";
    }
};

export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}