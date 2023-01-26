import { initializeApp } from 'firebase/app'
import { 
    getAuth, 
    signInWithPopup, 
    GoogleAuthProvider, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged,
} from 'firebase/auth'
import { getFirestore, doc, getDoc,
setDoc, collection, writeBatch, query, getDocs } from 'firebase/firestore'

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

export const db = getFirestore()

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd, field) => {
    const collectionRef = collection(db, collectionKey)
    const batch = writeBatch(db)

    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object[field].toLowerCase())
        batch.set(docRef, object)
    })

    await batch.commit()
}

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories')
    const q = query(collectionRef)

    const querySnapshot = await getDocs(q)
    const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
        const {title, items} = docSnapshot.data()
        acc[title.toLowerCase()] = items;
        return acc
    }, {})

    return categoryMap
}

export const createUserDocumentFromAuth = async (userAuth, additionalInformation) => {
    const userDocRef = doc(db, 'users', userAuth.uid)

    const userSnapshot = await getDoc(userDocRef)

    if(!userSnapshot.exists()) {
        const {displayName, email} = userAuth
        const createdAt = new Date()

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            })
        } catch (error) {
            console.log('Error', error.message)
        }
    }

    return userDocRef
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password)
}

export const signOutUser = async () => await signOut(auth)

//builds out actual listener model for us
//can add more error, complete callbacks to onAuthStateChanged
export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback)