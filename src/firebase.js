import { initializeApp } from 'firebase/app';
import { collection, getFirestore } from 'firebase/firestore';
import AddressForm from './components/Account/AddressForm.vue';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

const app = initializeApp(firebaseConfig);

export const collectionNames = {
  carts: "carts",
  products: "products",
  orders: "orders",
  users: "users",
  address: "address"
}

export const db = getFirestore(app); 