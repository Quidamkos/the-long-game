import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../../firebase-config';
import NavbarLogged from '../../../components/NavbarLogged';


const initialUserData = {
  birthDate: '',
  gender: '',
  nickname: '',
  experience: 0,
  money: 0
};

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState(initialUserData);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        getDoc(docRef).then((docSnap) => {
          if (docSnap.exists()) {
            setUserProfile(docSnap.data());
          } else {
            setDoc(docRef, initialUserData).then(() => {
              setUserProfile(initialUserData);
            }).catch(error => {
              console.error("Erreur lors de la création des données:", error);
            });
          }
          setIsLoaded(true);
        }).catch(error => {
          console.error("Erreur lors de la récupération des données:", error);
          setIsLoaded(true); // Assurez-vous de définir isLoaded même en cas d'erreur
        });
      } else {
        // Si aucun utilisateur n'est connecté, définissez également isLoaded
        setIsLoaded(true);
      }
    });
  
    // Nettoyer l'écouteur d'événement
    return () => unsubscribe();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserProfile(prevProfile => ({ ...prevProfile, [name]: value }));
  };

  const saveUserData = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const docRef = doc(db, 'users', user.uid);
      try {
        await setDoc(docRef, userProfile);
        alert('User data saved!');
      } catch (error) {
        console.error("Erreur lors de la sauvegarde des données:", error);
      }
    }
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <main className='profil'>
      <h1>User Profile</h1>
      <form>
        {/* Champs de formulaire */}
        <div>
          <label>Date of Birth:</label>
          <input
            type="date"
            name="birthDate"
            value={userProfile.birthDate}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Gender:</label>
          <select name="gender" value={userProfile.gender} onChange={handleInputChange}>
            <option value="">Select Gender</option>
            <option value="Homme">Homme</option>
            <option value="Femme">Femme</option>
            <option value="Autre">Autre</option>
          </select>
        </div>
        <div>
          <label>Nickname:</label>
          <input
            type="text"
            name="nickname"
            value={userProfile.nickname}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Experience:</label>
          <input
            type="number"
            name="experience"
            value={userProfile.experience}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Money:</label>
          <input
            type="number"
            name="money"
            value={userProfile.money}
            onChange={handleInputChange}
          />
        </div>
        <button type="button" onClick={saveUserData}>Save Changes</button>
        <NavbarLogged />
      </form>
    </main>
  );
};

export default UserProfile;
