import { Link, Outlet } from "react-router-dom"
import { Fragment } from "react"

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'

import './navigation.styles.scss'
import { useContext } from "react"
import { UserContext } from "../../contexts/user.context"
import { signOutUser } from "../../utils/firebase/firebase.utils"

const Navigation = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext)

  const signOutHandler = async () => {
    await signOutUser()
    setCurrentUser(null)
  }

  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to='/'>
          <div>
            <CrwnLogo className='logo' />
          </div>
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to='/shop'>
            SHOP
          </Link>
          {currentUser ? (
            <Link onClick={signOutHandler} className="nav-link" to='/'>
              LOG OUT
            </Link>
          ) : (
            <Link className="nav-link" to='/auth'>
              SIGN UP
            </Link>
          )}
        </div>
      </div>
      <Outlet />
    </Fragment>
  )
}

export default Navigation