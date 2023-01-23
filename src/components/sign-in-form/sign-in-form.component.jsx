import { useState } from "react"
import { createUserDocumentFromAuth, signInWithGooglePopup, signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils"
import Button from "../button/button.component"
import FormInput from "../form-input/form-input.component"

import './sign-in-form.styles.scss'

const defaultFormFields = {
        email: '',
        password: '',
    }

const SignInForm = ({ toggleAuthentication }) => {
    const [formFields, setFormFields] = useState(defaultFormFields)
    const { email, password } = formFields

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    const signInWithGoogle = async () => {
        await signInWithGooglePopup()
    }

    const handleChange = (e) => {
        const { name, value } = e.target

        setFormFields({...formFields, [name]: value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            await signInAuthUserWithEmailAndPassword(email, password)
            
            resetFormFields()
        } catch (error) {
            if(error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
                alert('Something about the credentials are incorrect')
            }
            console.log(error)
        }
    }

  return (
    <div className="sign-up-container">
        <h2>Welcome Back!</h2>
        <span>Sign In</span>
        <form onSubmit={handleSubmit}>
            <FormInput 
                label='Email'
                required 
                type="email" 
                onChange={handleChange} 
                name='email' 
                value={email}
            />
            <FormInput 
                label='Password'
                required 
                type="password" 
                onChange={handleChange} 
                name='password' 
                value={password}
            />
            <div className="tri-buttons-container">
            <div className="buttons-container">
                <Button children={'Sign In'} type='submit'/>
                <Button type='button' onClick={signInWithGoogle} children={'Google Sign In'} buttonType='google'/>
            </div>
            <Button children='I need an account' buttonType='link' onClick={toggleAuthentication} />
            </div>
        </form> 
    </div>
  )
}

export default SignInForm