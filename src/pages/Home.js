import React, {useContext} from 'react'
import {UserContext} from "../context/userContext"

export default function Home() {

  const {currentUser} = useContext(UserContext)

  return (
    <>
    </>
  )
}