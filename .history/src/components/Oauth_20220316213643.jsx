import { useLocation, useNavigate } from 'react-router-dom'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'

function OAuth() {
    return (
        <div>
            Google
        </div>
    )
}

export default OAuth
