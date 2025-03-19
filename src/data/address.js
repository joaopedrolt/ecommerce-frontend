import { db, collectionNames } from '../firebase';
import { addDoc, collection, where, query, getDocs, getDoc, doc, setDoc, deleteDoc, updateDoc } from 'firebase/firestore';

export const createAddress = async (addressData) => {
    try {
        if (addressData.main) {
            await resetMainAddress(null);
        }

        await addDoc(collection(db, collectionNames.address), addressData);

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
                console.log(docSnapshot.id)

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

export const deleteAddress = async (address, userId) => {
    try {
        const docRef = doc(db, collectionNames.address, address.id);
        await deleteDoc(docRef);

        if (address.main) {
            const addresses = await getUserAddresses(userId);

            if (addresses && addresses.length) {
                const randomIndex = Math.floor(Math.random() * addresses.length);
                await setMainAddress(addresses[randomIndex].id);
            }
        }

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

        const addresses = querySnapshot.docs
            .map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }))
            .sort((a, b) => {
                if (a.main === b.main) {
                    return 0;
                }
                return a.main ? -1 : 1;
            });

        return addresses;
    } catch (error) {
        console.error("Error fetching addresses: ", error);
        return [];
    }
};