import { storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default async function uploadImage(productId, fileName, file) {
    if (!file) return;  

    const storageRef = ref(storage, 'images/products/' + productId + '/' + fileName); // Optional: customize path
    try {
        const snapshot = await uploadBytes(storageRef, file);
        console.log('Uploaded a file!', snapshot);

        // Get downloadable URL
        const downloadURL = await getDownloadURL(snapshot.ref);
        console.log('File available at', downloadURL);

        return downloadURL;
    } catch (error) {
        console.error('Upload failed', error);
        throw error;
    }
}