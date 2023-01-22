import './button.styles.scss'


//We have 3 types of buttons: default, inverted, google sign in
const BUTTON_TYPES_CLASSES = {
    google: 'google-sign-in',
    inverted: 'show-inverted',
    link: 'link-button'
}


const Button = ({children, buttonType, ...otherProps}) => {
  return (
    <button className={`button-container ${BUTTON_TYPES_CLASSES[buttonType]}`} {...otherProps}>{children}</button>
  )
}

export default Button