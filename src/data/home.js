import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

export const getFeaturedProducts = async () => {
    const querySnapshot = await getDocs(collection(db, 'featuredProducts'));

    console.log(querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
    })))

    return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
    }));
};