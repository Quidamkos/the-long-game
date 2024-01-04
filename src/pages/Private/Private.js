import React, {useContext} from 'react'
import {UserContext} from "../../context/userContext"
import {Outlet, useLocation, Navigate} from "react-router-dom"
import UserProfile from './PrivateHome/Profil'

export default function Private() {

  const {currentUser} = useContext(UserContext)
  console.log("PRIVATE", currentUser);

  if(!currentUser) {
    return <Navigate to="/" />
  }

  return (
    <div className="main-container">
              {/*<Outlet />*/}
            <main>
                <p>Wait for the news ! Everything will begin soon ...</p>
            </main>
            <UserProfile/>
        </div>
  )
}