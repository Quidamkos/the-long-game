import React, {useContext} from 'react'
import {UserContext} from "../context/userContext"
import {Link} from "react-router-dom"
import {signOut} from "firebase/auth"
import { useNavigate } from 'react-router-dom'
import {auth} from "../firebase-config"

export default function Navbar() {

  const {toggleModals} = useContext(UserContext)

  const navigate = useNavigate()

  const logOut = async () => {
    try {
      await signOut(auth)
      navigate("/")
    } catch {
      alert("For some reasons we can't deconnect, please check your internet connexion and retry.")
    }
  }

  return (
    <nav className="bar-container">
      <Link to="/" className='navLink'>
        The Long Game
      </Link>

      <div>
        <button 
        onClick={logOut}
        className="btn btn-danger ms-2">
          Log Out
        </button>
      </div>
    </nav>
  )
}