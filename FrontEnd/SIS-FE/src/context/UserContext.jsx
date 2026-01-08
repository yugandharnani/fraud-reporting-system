import { createContext, useState } from "react";

export const UserContext = createContext();
export const UserProvider = ({children})=>{
    const [user,setUser]=useState(null)
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [caseId, setCaseId] = useState("");
    return(
        <UserContext.Provider value={{user,setUser,isLoggedIn, setIsLoggedIn,caseId, setCaseId}}>
            {children}
        </UserContext.Provider>
    )
    
}