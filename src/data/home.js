import { db } from "@/firebase";
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

export const getFeaturedProductsOrdered = async () => {
    try {
        const q = query(collection(db, 'featuredProducts'), orderBy("sectionPosition", "asc"));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
    } catch (error) {
        console.error('Error loading featured products:', error);
        return [];
    }
};