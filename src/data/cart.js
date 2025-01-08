import { db, collectionNames } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export const getUserCart = async (userId) => {
    try {
        if (!userId) {
            console.error("User ID is required");
            return [];
        }

        const cartDoc = await getDoc(doc(db, collectionNames.carts, userId));
        if (!cartDoc.exists()) {
            console.warn(`No cart found for user ID: ${userId}`);
            return [];
        }

        const { items = [] } = cartDoc.data();
        if (!items.length) {
            console.warn("Empty Cart");
            return [];
        }

        const productSnapshots = await Promise.all(
            items.map(({ productId }) => getDoc(doc(db, collectionNames.products, productId)))
        );

        return productSnapshots.map((snapshot) => {
            const product = snapshot.data();
            const { quantity } = items.find(({ productId }) => productId === snapshot.id);

            return {
                id: snapshot.id,
                image: product.displayImage,
                price: product.price,
                title: product.name,
                quantity
            };
        });
    } catch (error) {
        console.error("Error fetching cart:", error);
        return [];
    }
};

export const updateCartProduct = async (userId, productId, operation) => {
    try {
        if (!userId || !productId || !operation) return false;

        const cartRef = doc(db, collectionNames.carts, userId);
        const cartDoc = await getDoc(cartRef);

        if (!cartDoc.exists()) return false;

        const items = cartDoc.data()?.items || [];
        const product = items.find(item => item.productId === productId);

        if (!product) return false;

        if (operation === "subtraction" && product.quantity === 1) {
            operation = "remove";
        } else if (operation === "sum" && product.quantity >= 10) {
            return false; 
        }

        const updatedItems = operation === "remove"
            ? items.filter(item => item.productId !== productId)
            : items.map(item =>
                item.productId === productId
                    ? { ...item, quantity: item.quantity + (operation === "subtraction" ? -1 : 1) }
                    : item
            );

        await updateDoc(cartRef, { items: updatedItems });
        return true;
    } catch (error) {
        console.error("Error updating product quantity:", error);
        return false;
    }
};