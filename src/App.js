import {Routes, Route} from "react-router-dom"
import React, {useContext} from "react";
import Home from "./pages/Home";
import Navbar from './components/Navbar'
import NavbarLogged from './components/NavbarLogged'
import {UserContext} from "./context/userContext"
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebase-config';

import SignUpModal from "./components/SignUpModal";
import SignInModal from "./components/SignInModal";
import Private from "./pages/Private/Private";
import PrivateHome from "./pages/Private/PrivateHome/PrivateHome";
import UserProfile from "./pages/Private/PrivateHome/Profil";
import  { userProfile } from "./pages/Private/PrivateHome/Profil";
import Wallpaper from "./components/wallpaper";
import Starter from './pages/Private/Starter'

function App() {

  const { currentUser, userProfile, isLoading } = useContext(UserContext);

  /*const shouldShowStarter = () => {
    return userProfile && userProfile.chapitre === 0;
  };
 
  if (!userProfile) {
    return <div>Loading...</div>;
  }*/

    return (
      <>
      {!currentUser && <Navbar />}
      <SignUpModal />
      <SignInModal />
      <Wallpaper/>
      {currentUser && 
        <div className="container2">
          <p>Wait for the news.</p>
          <p>Everything will begin soon !</p>
          <p className="wait">(or not, i want to sleep now)</p>
          <NavbarLogged />
        </div>
      }
      {/*currentUser && (
        <div className="main-container">
          {shouldShowStarter() ? (
              <div className="main-container">
              <main>
                  <p>Wait for the news ! Everything will begin soon ...</p>
              </main>
              <UserProfile/>
            </div>
          ) : (
            <Starter />
          )}
        </div>
          )*/}
      </>
    );
  }
  
  export default App;