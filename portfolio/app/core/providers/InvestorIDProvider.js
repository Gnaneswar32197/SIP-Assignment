"use client"
import InvestorIDContext from "../context/InvestorIDContext";
import { useState } from "react";

export default function InvestorIDProvider ({children}){
    const [id, setId] = useState("")
    function storeId(id){
        setId(id)
    }
    return (
        <InvestorIDContext.Provider value={{storeId, id}}>
            {children}
        </InvestorIDContext.Provider>
    )
}