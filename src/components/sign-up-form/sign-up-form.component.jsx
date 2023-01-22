import { useState, useContext } from "react"
import { UserContext } from "../../contexts/user.context"
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

const SignUpForm = ({ toggleAuthentication }) => {
    const [formFields, setFormFields] = useState(defaultFormFields)
    const { displayName, email, password, confirmPassword } = formFields

    const {setCurrentUser} = useContext(UserContext)

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
            setCurrentUser(user)
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
            <div className="buttons-container">
                <Button children='Sign Up' type='submit'>Sign Up</Button>
                <Button children='I have an account.' type='button' buttonType='link' onClick={toggleAuthentication}/>
            </div>
        </form> 
    </div>
  )
}

export default SignUpForm