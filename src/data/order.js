import { db, collectionNames } from '../firebase';
import { addDoc, doc, collection, query, where, getDocs, getDoc, updateDoc } from 'firebase/firestore';

import { getProduct } from '@/data/product';

import formatDate from "@/utils/formatDate";
import formatPrice from "@/utils/formatPrice";

export const createOrder = async (orderData) => {
    try {
        const docRef = await addDoc(collection(db, collectionNames.orders), orderData);
        return docRef.id; 
    } catch (error) {
        console.error("Error creating order: ", error);
        return null;
    }
};

export const getOrder = async (orderId) => {
    try {
        const docRef = doc(db, collectionNames.orders, orderId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const order = docSnap.data();

            const productsDetails = await Promise.all(order.products.map(async (cartProduct) => {
                const productId = cartProduct.productId;
                const product = await getProduct(productId);

                if (product)
                    return {
                        id: productId,
                        image: product.displayImage,
                        price: product.price,
                        title: product.name,
                        description: product.displayDescription,
                        quantity: cartProduct.quantity
                    };
            }));

            return { ...order, id: orderId, products: productsDetails };
        } else {
            console.log("No such order!");
            return null;
        }
    } catch (error) {
        console.error("Error Order: ", error);
    }
};

export const getProductDetails = async (productId) => {
    try {
        if (!userId) {
            console.error("User ID is required");
            return [];
        }

        var cartDoc = await getDoc(doc(db, collectionNames.carts, userId));
        if (!cartDoc.exists()) {
            console.warn(`No cart found for user ID: ${userId}`);

            if (await createUserCart(userId)) {
                cartDoc = await getDoc(doc(db, collectionNames.carts, userId));
            }
            else {
                return [];
            }
        }

        const { items = [] } = cartDoc.data();
        if (!items.length) {
            console.warn("Empty Cart");
            return [];
        }

        return await Promise.all(items.map(async (cartProduct) => {
            const productId = cartProduct.productId;
            const product = await getProduct(productId);

            if (product)
                return {
                    id: productId,
                    image: product.displayImage,
                    price: product.price,
                    title: product.name,
                    description: product.displayDescription,
                    quantity: cartProduct.quantity
                };
        }));
    } catch (error) {
        console.error("Error fetching cart:", error);
        return [];
    }
};

export const getUserOrders = async (userId) => {
    try {
        const ordersCollection = collection(db, collectionNames.orders);

        const ordersQuery = query(ordersCollection, where("userId", "==", userId));

        const querySnapshot = await getDocs(ordersQuery);

        const orders = querySnapshot.docs.map((doc) => {
            const order = doc.data();

            return {
                id: doc.id,
                date: formatDate(order.createdAt),
                price: formatPrice(order.totalPrice),
                status: order.status,
            }
        });

        return orders;
    } catch (error) {
        console.error("Error fetching orders: ", error);
        return [];
    }
};

export const setOrderStatus = async (orderId, status) => {
    try {
        const docRef = doc(db, collectionNames.orders, orderId);
        await updateDoc(docRef, { status });

        return true;
    } catch (error) {
        console.error("Error updating order status:", error);
        return false;
    }
};
