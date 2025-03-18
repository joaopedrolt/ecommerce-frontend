import { auth } from '../firebase';
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
};