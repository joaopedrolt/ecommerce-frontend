import { auth } from '../firebase';
import { signInWithEmailAndPassword } from "firebase/auth";

const getSignInMessage = (errorCode) => {
  const errorMessages = {
    "auth/invalid-credential": "E-mail ou senha incorretos! Por favor tente novamente!",
    "auth/user-not-found": "Nenhuma conta encontrada com este e-mail!",
    "auth/wrong-password": "Senha incorreta. Tente novamente!",
    "auth/email-already-in-use": "Este e-mail já está cadastrado!",
    "auth/weak-password": "A senha precisa ser mais forte!",
    "auth/invalid-email": "Digite um endereço de e-mail válido!",
    "auth/network-request-failed": "Verifique sua conexão com a internet!",
    "auth/too-many-requests": "Muitas tentativas falhas. Tente novamente mais tarde!",
    "default": "Ocorreu um erro. Tente novamente!"
  };

  return errorMessages[errorCode] || errorMessages["default"];
};

export default async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user, error: null };
  } catch (error) {
    console.error("Erro ao fazer login:", error); // Log para depuração
    return { user: null, error: getSignInMessage(error.code || error.message) };
  }
};