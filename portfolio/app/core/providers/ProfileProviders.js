"use client"
import ProfileContext from "../context/ProfileContext";
import { useState } from "react";

export default function ProfileProvider ({children}){
    const [email, setEmail] = useState("")
    const [password,setPassword]= useState("")
    function storeDetails(email, password){
        setEmail(email)
        setPassword(password)
    }
    return (
        <ProfileContext.Provider value={{storeDetails, email}}>
            {children}
        </ProfileContext.Provider>
    )
}