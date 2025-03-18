import { auth } from "../firebase";

export default () => auth.currentUser || null;