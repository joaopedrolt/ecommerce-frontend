import { auth } from '../firebase';
import { sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";

import getHost from '@/utils/getHost';

export async function recoverPasswordOut(email) {
  try {
    const host = getHost();

    if (!host)
      throw new Error("Sem url");

    const baseUrl = host;

    console.log(baseUrl)

    const url = `${baseUrl}/c/entrar/criarsenha?type=recover&email=${encodeURIComponent(email)}`;

    console.log("Base URL: ", baseUrl);
    console.log("URL: ", url);

    await sendSignInLinkToEmail(auth, email, {
      url,
      handleCodeInApp: true
    });

    return true;
  } catch (error) {
    console.error("Recover Password: ", error);
    return false;
  }
}

const getRecoverPasswordMessage = (errorCode) => {
  const errorMessages = {
    "auth/invalid-credential": "E-mail ou senha incorretos! Por favor tente novamente!",
    "auth/user-not-found": "Nenhuma conta encontrada com este e-mail!",
    "auth/wrong-password": "Senha incorreta. Tente novamente!",
    "auth/email-already-in-use": "Este e-mail já está cadastrado!",
    "auth/weak-password": "A senha precisa ser mais forte!",
    "auth/invalid-email": "Digite um endereço de e-mail válido!",
    "auth/network-request-failed": "Verifique sua conexão com a internet!",
    "auth/too-many-requests": "Muitas tentativas falhas. Tente novamente mais tarde!",
    "auth/invalid-action-code": "Este link é inválido ou expirou!",
    "default": "Ocorreu um erro. Tente novamente!"
  };

  return errorMessages[errorCode] || errorMessages["default"];
};

export async function recoverPasswordIn(url, email) {
  if (isSignInWithEmailLink(auth, url)) {
    try {
      const result = await signInWithEmailLink(auth, email, url);
      const user = result.user;

      return { success: true, user };
    } catch (error) {
      console.error("Sign In With Email Link: ", error);

      console.log(error.code)
      console.log(error.message)

      const translatedError = getRecoverPasswordMessage(error.code || error.message); // Using error.code instead of error.message
      return { success: false, error: translatedError };
    }
  } else {
    console.error("Invalid sign-in link.");
    return { success: false, error: getRecoverPasswordMessage("default") };
  }
}
