import { useEffect, useState } from "react"
import { getAuth, onAuthStateChanged } from 'firebase/auth'

export const useAuthStatus = () => {
    const [loggedIn, setLoggedIn] = useState(false)
    const [checkingStatus, setChecking]

    return <div></div>
}