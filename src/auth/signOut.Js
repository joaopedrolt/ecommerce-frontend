import { auth } from "@/firebase";
import { signOut } from "firebase/auth";

export default async () => {
    try {
        await signOut(auth);
        return true;
    } catch (error) {
        console.error("Erro ao fazer deslogar:", error); 
        return false;
    }
}