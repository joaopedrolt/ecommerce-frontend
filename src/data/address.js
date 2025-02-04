import { db, collectionNames } from '../firebase';
import { addDoc, collection } from 'firebase/firestore';

export const createAddress = async (addressData) => {
    try {
        await addDoc(collection(db, collectionNames.orders), addressData);
        return true;
    } catch (error) {
        console.error("Error creating order: ", error);
        return false;
    }
};  