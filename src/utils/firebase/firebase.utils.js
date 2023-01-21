import { initializeApp } from 'firebase/app'
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore, doc, getDoc,
setDoc } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyClMGmiXYcaVHoVE4Un88dLBWXs7k-lTd4",
  authDomain: "crwn-clothing-db-7a382.firebaseapp.com",
  projectId: "crwn-clothing-db-7a382",
  storageBucket: "crwn-clothing-db-7a382.appspot.com",
  messagingSenderId: "947862869941",
  appId: "1:947862869941:web:9f5777e5c0ac86ec736bfc"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider()
provider.setCustomParameters({
    prompt: 'select_account'
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)
export const signInWithGoogleRedirect = () => signInWithGoogleRedirect(auth, provider)

export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid)

    console.log(userDocRef)

    const userSnapshot = await getDoc(userDocRef)
    console.log(userSnapshot.exists())

    if(!userSnapshot.exists()) {
        const {displayName, email} = userAuth
        const createdAt = new Date()

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            })
        } catch (error) {
            console.log('Error', error.message)
        }
    }

    return userDocRef
}