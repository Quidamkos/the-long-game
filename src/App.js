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

function App() {

  const {currentUser} = useContext(UserContext)
  console.log(currentUser)

    return (
      <>
        <SignUpModal />
        <SignInModal />
        {currentUser ? ( <NavbarLogged />):(<Navbar />)} 
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/private" element={<Private />}>
            <Route path="/private/private-home" element={<PrivateHome />} />
          </Route>
        </Routes>
      </>
    );
  }
  
  export default App;