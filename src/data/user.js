import { db, collectionNames } from '../firebase';
import { collection, query, where, getDocs, doc, setDoc, updateDoc } from "firebase/firestore";

export const createUser = async (userdId, email, password) => {
    try {
        const userDocRef = doc(db, collectionNames.users, userdId);
        await setDoc(userDocRef, { email, password });

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

export const updatePassword = async (email, password) => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
        console.log("User not found");
        return false;
    }

    const userDoc = querySnapshot.docs[0];

    await updateDoc(doc(db, "users", userDoc.id), {
        password
    });

    try {
        const usersRef = collection(db, collectionNames.users);
        const q = query(usersRef, where("email", "==", email));

        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error duplicating document:', error);
        return false;
    }
}