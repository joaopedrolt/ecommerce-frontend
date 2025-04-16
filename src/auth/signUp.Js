/* import { auth } from '../firebase';
import { createUser } from "@/data/user"
import { createUserWithEmailAndPassword } from "firebase/auth";

export default async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        if (user.uid) {
            await createUser(user.uid, user.email, password);
        }
        else {
            throw new Error("Credentials not returned");
        }

        return true;
    } catch (error) {
        console.error("Error registering user: ", error);
        return false;
    }
}; */

import { auth } from '../firebase';
import { createUser } from "@/data/user";
import { createUserWithEmailAndPassword } from "firebase/auth";

const getAuthErrorMessage = (errorCode) => {
    const errorMessages = {
        "auth/invalid-credential": "E-mail ou senha incorretos! Por favor tente novamente!",
        "auth/user-not-found": "Nenhuma conta encontrada com este e-mail!",
        "auth/wrong-password": "Senha incorreta. Tente novamente!",
        "auth/email-already-in-use": "Este e-mail já está cadastrado!",
        "auth/weak-password": "A senha precisa ser mais forte!",
        "auth/missing-email": "E-mail não foi fornecido corretamente!",
        "auth/invalid-email": "Digite um endereço de e-mail válido!",
        "auth/network-request-failed": "Verifique sua conexão com a internet!",
        "auth/too-many-requests": "Muitas tentativas falhas. Tente novamente mais tarde!",
        "default": "Ocorreu um erro. Tente novamente!"
    };

    return errorMessages[errorCode] || errorMessages["default"];
};

export default async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        if (user.uid) {
            await createUser(user.uid, user.email, password);
        } else {
            throw new Error("Credentials not returned");
        }

        return {
            success: true,
            error: null
        };
    } catch (error) {
        console.error("Erro ao registrar usuário: ", error);

        return {
            success: false,
            error: getAuthErrorMessage(error.code || error.message)
        };
    }
}
