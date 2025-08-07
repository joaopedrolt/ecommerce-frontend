import { db, collectionNames } from "@/firebase";
import { doc, getDoc, getDocs, addDoc, collection, query, orderBy, startAt, endAt, where } from 'firebase/firestore';
import getRandomListItens from "@/utils/getRandomListItens";

export const getProduct = async (productId) => {
    try {
        const docRef = doc(db, collectionNames.products, productId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const product = docSnap.data();

            if (product.sections?.length) {
                product.sections.sort((a, b) => a.sectionPosition - b.sectionPosition);
            }

            return { id: productId, ...product };
        } else {
            console.log("No such Product!");
            return null;
        }
    } catch (error) {
        console.error("Error Product: ", error);
    }
};

export const getProductsByName = async (queryString, limit = null) => {
    try {
        const productsRef = collection(db, collectionNames.products);
        const querySnapshot = await getDocs(productsRef);

        let results = [];
        const lowerSearch = queryString.toLowerCase();

        querySnapshot.forEach((doc) => {
            let name = doc.data().name;
            if (name.toLowerCase().includes(lowerSearch)) {

                if (limit) {
                    if (results.length < limit) {
                        results.push({ id: doc.id, ...doc.data() });
                    }
                }
                else {
                    results.push({ id: doc.id, ...doc.data() });
                }
            }
        });

        return results;
    } catch (error) {
        console.error("Error fetching Recomended Products: ", error);
        return [];
    }
}

export const getRecomendedProducts = async (currentProductId) => {
    try {
        const querySnapshot = await getDocs(collection(db, collectionNames.products));
        var productIDs = querySnapshot.docs.map(doc => doc.id);

        if (!productIDs.length)
            return [];

        if (currentProductId) {
            const filteredProductIDs = productIDs.filter(id => id !== currentProductId);

            if (filteredProductIDs.length) {
                productIDs = filteredProductIDs;
            } else {
                return [];
            }
        }

        const productIDsRandomized = getRandomListItens(productIDs, 4);

        const productPromises = productIDsRandomized.map((id) => {
            const docRef = doc(db, collectionNames.products, id);
            return getDoc(docRef);
        });

        const productSnapshots = await Promise.all(productPromises);

        return productSnapshots.map((snapshot) => ({
            id: snapshot.id,
            ...snapshot.data(),
        }));
    } catch (error) {
        console.error("Error fetching Recomended Products: ", error);
        return [];
    }
};

export const duplicateDocument = async () => {
    try {
        const docRef = doc(db, collectionNames.products, "GaAp5SyjPCTC7ufuEPWG");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const documentData = docSnap.data(); // Extract document data

            const newDocRef = await addDoc(collection(db, "products"), documentData);

            console.log(`Document duplicated to new ID: ${newDocRef.id}`);
        } else {
            console.log('No such document!');
        }
    } catch (error) {
        console.error('Error duplicating document:', error);
    }
};

export const createProduct = async (productData) => {
    try {
        const docRef = await addDoc(collection(db, collectionNames.products), productData);
        return docRef.id;
    } catch (error) {
        console.error("Error creating product: ", error);
        return null;
    }
};