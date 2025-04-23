import { updatePassword } from "firebase/auth";

export default async (user, newPassword) => {
  try {
    await updatePassword(user, newPassword);
    return true;
  } catch (error) {
    console.error("Update Password: ", error);
    return false;
  }
}
