import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase-config";

export const saveUserData = async (userId, userData) => {
  const userDocRef = doc(db, "users", userId);
  await setDoc(userDocRef, {
    ...userData,
    lastUpdated: serverTimestamp(),
  });
};

const auth = getAuth();
signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // L'utilisateur est connecté
    const user = userCredential.user;
    // Vous pouvez obtenir l'ID de l'utilisateur avec user.uid
  })
  .catch((error) => {
    // Gérer les erreurs ici
  });