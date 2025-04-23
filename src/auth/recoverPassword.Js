import { auth } from '../firebase';
import { sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";

export async function recoverPasswordOut(email) {
  try {
    await sendSignInLinkToEmail(auth, email, {
      url: `http://localhost:3000/c/entrar/criarsenha?type=recover&email=${encodeURIComponent(email)}`, 
      handleCodeInApp: true
    });

    return true;
  } catch (error) {
    console.error("Recover Password: ", error);
    return false;
  }
}

export async function recoverPasswordIn(url, email) {
  if (isSignInWithEmailLink(auth, url)) {

    try {
      const result = await signInWithEmailLink(auth, email, url);
      const user = result.user;

      return { success: true, user };
    } catch (error) {
      console.error("Sign In With Email Link: ", error);
      return { success: false, error: error.message };
    }
  } else {
    console.error("Invalid sign-in link.");
    return { success: false, error: "Invalid sign-in link." };
  }
}