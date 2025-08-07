import { db, collectionNames } from "@/firebase";
import { doc, getDoc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';

import { getProduct } from './product';

const createUserCart = async (userId) => {
    try {
        await setDoc(doc(db, collectionNames.carts, userId), { items: [] });
        console.log("User's cart created!");
        return true;
    } catch (error) {
        console.error("Error creating cart: ", error);
        return false;
    }
};

export const clearUserCart = async (userId) => {
    try {
        const docRef = doc(db, collectionNames.carts, userId);
        await deleteDoc(docRef);

        return true;
    } catch (error) {
        console.error("Error clearing creating cart: ", error);
        return false;
    }
};

export const getUserCart = async (userId) => {
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

        return getProductsDetails(items);
    } catch (error) {
        console.error("Error fetching cart:", error);
        return [];
    }
};

export const getProductsDetails = async (basicProductList) => {
    if (!basicProductList) return [];

    try {
        return await Promise.all(basicProductList.map(async (cartProduct) => {
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
    }
    catch (error) {
        console.error("Error fetching products details:", error);
        return [];
    }
}

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

// melhorar essa funcao

export const addProductToCart = async (userId, productId, quantity) => {
    try {
        if (!userId || !productId || !quantity) return false;

        const cartRef = doc(db, collectionNames.carts, userId);
        var cartDoc = await getDoc(cartRef);

        if (!cartDoc.exists()) {
            console.warn(`No cart found for user ID: ${userId}`);

            if (await createUserCart(userId)) {
                cartDoc = await getDoc(doc(db, collectionNames.carts, userId));
            }
            else {
                return false;
            }
        }

        const items = cartDoc.data()?.items || [];
        const product = items.find(item => item.productId === productId);

        var updatedItems = [];

        if (!product) {
            const cartItem = {
                productId,
                quantity
            }

            updatedItems = [...items, cartItem];
        }
        else {
            quantity = (product.quantity + quantity) >= 10 ? 10 : product.quantity + quantity;

            updatedItems = items.map(item =>
                item.productId === productId
                    ? { ...item, quantity }
                    : item
            );
        }

        await updateDoc(cartRef, { items: updatedItems });
        return true;
    } catch (error) {
        console.error("Error adding product to cart quantity:", error);
        return false;
    }
};