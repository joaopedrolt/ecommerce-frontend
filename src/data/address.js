import { db, collectionNames } from '../firebase';
import { addDoc, collection, where, query, getDocs, getDoc, doc, setDoc, deleteDoc, updateDoc } from 'firebase/firestore';

export const createAddress = async (addressData) => {
    try {
        await addDoc(collection(db, collectionNames.address), addressData);

        if (addressData.main) {
            await resetMainAddress(addressData.id);
        }

        return true;
    } catch (error) {
        console.error("Error creating order: ", error);
        return false;
    }
};

export const getAddress = async (addressId) => {
    try {
        const docRef = doc(db, collectionNames.address, addressId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const address = docSnap.data();

            return { id: addressId, ...address };
        } else {
            console.log("No such address!");
            return null;
        }
    } catch (error) {
        console.error("Error address: ", error);
    }
};

export const updateAddress = async (addressData) => {
    try {
        const docRef = doc(db, collectionNames.address, addressData.id);
        await setDoc(docRef, addressData, { merge: false });

        return true;
    } catch (error) {
        console.error("Error replacing address document:", error);
        return false;
    }
};

export const setMainAddress = async (addressId) => {
    try {
        const docRef = doc(db, collectionNames.address, addressId);
        await updateDoc(docRef, { main: true });

        await resetMainAddress(addressId);

        return true;
    } catch (error) {
        console.error("Error updating documents:", error);
        return false;
    }
};

export const resetMainAddress = async (excludeAddressId) => {
    try {
        const querySnapshot = await getDocs(collection(db, collectionNames.address));

        const updatePromises = querySnapshot.docs
            .filter(docSnapshot => docSnapshot.id !== excludeAddressId) // Exclude document
            .map(async (docSnapshot) => {
                const docRef = doc(db, collectionNames.address, docSnapshot.id);
                await updateDoc(docRef, { main: false });
            });

        await Promise.all(updatePromises);

        return true;
    } catch (error) {
        console.error("Error updating documents:", error);
        return false;
    }
};

export const deleteAddress = async (addressId) => {
    try {
        const docRef = doc(db, collectionNames.address, addressId);
        await deleteDoc(docRef);

        return true;
    } catch (error) {
        console.error("Error deleting address document:", error);
        return false;
    }
};

export const getUserAddresses = async (userId) => {
    try {
        const addressesCollection = collection(db, collectionNames.address);

        const addressesQuery = query(addressesCollection, where("userId", "==", userId));

        const querySnapshot = await getDocs(addressesQuery);

        const addresses = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        return addresses;
    } catch (error) {
        console.error("Error fetching addresses: ", error);
        return [];
    }
};