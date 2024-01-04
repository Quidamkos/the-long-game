import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../../firebase-config';
import NavbarLogged from '../../../components/NavbarLogged';
import personna from '../../../assets/Pictures/personna.png';
import BarreExperience from '../../../components/ExpBar';


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
  const [isSettings, setIsSettings] = useState(false);

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
          setIsLoaded(true);
        });
      } else {
        setIsLoaded(true);
      }
    });
  
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


  const viewSettings = () => {
    setIsSettings(!isSettings);
  };

  return (
    <main className='profil'>

      {!isSettings ? (
        <div className='player'>
          <img src={personna}/>
          <div className='name-profil'>
            <p>lvl</p>
            <p>rank</p>
            <p>{userProfile.nickname}</p>
          </div>
          <BarreExperience experience={userProfile.experience}/>
          <p>money : {userProfile.money}</p>
          <button onClick={viewSettings}>change settings</button>
          <NavbarLogged />
        </div>
      ):(

      <form>
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
        <button onClick={viewSettings}>change settings</button>

      </form>
      )}
    </main>
  );
};

export default UserProfile;
