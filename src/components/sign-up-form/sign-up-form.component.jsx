import { useState } from "react"
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils"
import Button from "../button/button.component"
import FormInput from "../form-input/form-input.component"

import './sign-up-form.styles.scss'

const defaultFormFields = {
        displayName: '',
        email: '',
        password: '',
        confirmPassword: '',
    }

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields)
    const { displayName, email, password, confirmPassword } = formFields

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    const handleChange = (e) => {
        const { name, value } = e.target

        setFormFields({...formFields, [name]: value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(password !== confirmPassword) {
            alert('passwords need to match')
            return
        }

        try {
            const {user} = await createAuthUserWithEmailAndPassword(email, password)
            
            await createUserDocumentFromAuth(user, { displayName })
            resetFormFields()
        } catch (error) {
            if(error.code === 'auth/email-already-in-use') {
                alert('Email already in use')
            } else {
                console.log('user creation encountered error', error)
            }
        }
    }

  return (
    <div className="sign-up-container">
        <h2>Don't have an account?</h2>
        <span>Sign Up</span>
        <form onSubmit={handleSubmit}>
            <FormInput
                label='Display Name'
                required
                type="text"
                onChange={handleChange} 
                name='displayName' 
                value={displayName} 
                
            />
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
            <FormInput 
                label='Confirm Password'
                required 
                type="password" 
                onChange={handleChange} 
                name='confirmPassword' 
                value={confirmPassword}
            />
            <Button children={'Sign Up'} type='submit' />
        </form> 
    </div>
  )
}

export default SignUpForm