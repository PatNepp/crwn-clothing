import { useState } from "react"
import SignInForm from "../../components/sign-in-form/sign-in-form.component"
import SignUpForm from "../../components/sign-up-form/sign-up-form.component"

import './authentication.styles.scss'

const Authentication = () => {
  const [ hasAccount, setHasAccount ] = useState(false)

  const toggleAuthentication = () => {
    hasAccount ? setHasAccount(false) : setHasAccount(true)
  }

  return (
    <div className="authentication-container">
      {hasAccount ? (
        <SignInForm toggleAuthentication={toggleAuthentication}/>
      ) : (
        <SignUpForm toggleAuthentication={toggleAuthentication}/>
      )}
    </div>
  )
}

export default Authentication