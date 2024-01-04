import {Routes, Route} from "react-router-dom"
import React, {useContext} from "react";
import Home from "./pages/Home";
import Navbar from './components/Navbar'
import NavbarLogged from './components/NavbarLogged'
import {UserContext} from "./context/userContext"

import SignUpModal from "./components/SignUpModal";
import SignInModal from "./components/SignInModal"
import Private from "./pages/Private/Private"
import PrivateHome from "./pages/Private/PrivateHome/PrivateHome";
import UserProfile from "./pages/Private/PrivateHome/Profil";
import Wallpaper from "./components/wallpaper";

function App() {

  const {currentUser} = useContext(UserContext)

  
  
    return (
      <>
        {currentUser ? (''):(<Navbar />)}
        
        <SignUpModal />
        <SignInModal />
        
        {currentUser ? (
            <div className="main-container">
              {/*<Outlet />*/}
            <main>
                <p>Wait for the news ! Everything will begin soon ...</p>
            </main>
            <UserProfile/>
        </div>
        ):(
          ''
          )}

          <Wallpaper/>
      </>
    );
  }
  
  export default App;