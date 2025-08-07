import { auth } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import setUserState from "@/store/setUserState";

export default async () => {
    return new Promise((resolve, reject) => {
        onAuthStateChanged(auth, (user) => {
            setUserState(user)

                if (user) {
                    resolve(true);
                } else {
                    resolve(false);
                }
        });
    });
};