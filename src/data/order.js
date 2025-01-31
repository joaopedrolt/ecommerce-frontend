import { db, collectionNames } from '../firebase';
import { addDoc, collection, query, where } from 'firebase/firestore';

export const createOrder = async (orderData) => {
    try {
        await addDoc(collection(db, collectionNames.orders), orderData);
        return true;
    } catch (error) {
        console.error("Error creating order: ", error);
        return false;
    }
};

export const getOrders = async (orderId) => {
    try {
        const docRef = doc(db, collectionNames.orders, orderId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const order = docSnap.data();

            return { id: orderId, ...order };
        } else {
            console.log("No such order!");
            return null;
        }
    } catch (error) {
        console.error("Error Order: ", error);
    }
};

export const getUserOrders = async (userId) => {
    try {
        const ordersCollection = collection(db, collectionNames.orders);

        const ordersQuery = query(ordersCollection, where("userId", "==", userId));

        const querySnapshot = await getDocs(ordersQuery);

        const orders = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        return orders;
    } catch (error) {
        console.error("Error fetching orders: ", error);
        return [];
    }
};