import { db } from '../firebase';
import { doc, getDoc, getDocs, addDoc, collection, query } from 'firebase/firestore';
import getRandomListItens from "@/utils/getRandomListItens";

const cartsCollectionName = "carts";
productsCollectionName

export const getUserCart = async (userId) => {
    try {
        const docRef = doc(db, cartsCollectionName, userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const cart = docSnap.data();

            const cartProductsPromises = cart.items.map((item) => {
                const docRef = doc(db, "products", item.productId);
                return getDoc(docRef);
            });

            const productSnapshots = await Promise.all(cartProductsPromises);

            var products = productSnapshots.map((snapshot) => ({
                id: snapshot.id,
                ...snapshot.data(),
            }));

            products.map(()) 

            cart.items.find(() => pro)

            // solve nas promise
            // retornar filtrado pro array do cart

            return cart;
        } else {
            console.log("No such Cart Found!");
            return null;
        }
    } catch (error) {
        console.error("Error Cart: ", error);
    }
};