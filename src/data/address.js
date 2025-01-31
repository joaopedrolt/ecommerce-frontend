import { db, collectionNames } from '../firebase';
import { addDoc, collection } from 'firebase/firestore';

export const createAddress = async (userId) => {
    try {
        await addDoc(collection(db, collectionNames.orders), orderData);
        return true;
    } catch (error) {
        console.error("Error creating order: ", error);
        return false;
    }
};