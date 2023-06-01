import { User, signOut } from "firebase/auth";
import { auth } from "./AppFirebase";

export function isUserAVendor(id: string) {
  return;
}

export function logout() {
  return signOut(auth);
}

export function isUserLoggedIn(user: User | null) {
  return user !== null;
}
