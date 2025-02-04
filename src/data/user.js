import { db, collectionNames } from '../firebase';
import { collection, query, where, getDocs } from "firebase/firestore";

export const createUser = async (userData) => {
    try {
        await addDoc(collection(db, collectionNames.users), userData);
        return true;
    } catch (error) {
        console.error("Error creating user: ", error);
        return false;
    }
};

export const checkEmailExists = async (email) => {
    try {
        const usersRef = collection(db, collectionNames.users);
        const q = query(usersRef, where("email", "==", email));

        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            return true;
        } else {
            return false;
        }

        return false;
    } catch (error) {
        console.error('Error duplicating document:', error);
        return false;
    }
}