import { useContext } from 'react'
import { CartContext } from '../../contexts/cart.context'
import './checkout.styles.scss'

const CheckoutItem = ({ cartItem }) => {
    const {removeItemFromCart, addItemToCart, clearItemFromCart} = useContext(CartContext)
    const {imageUrl, name, quantity, price } = cartItem

    const clearItemHandler = () => {
        clearItemFromCart(cartItem)
    }

    const increaseHandler = () => {
        addItemToCart(cartItem)
    }

    const decreaseHandler = () => {
        removeItemFromCart(cartItem)
    }

    return (
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={imageUrl} alt={`${name}`} />
            </div>
            <span className='name'> {name} </span>
            <span className='quantity'>
                <div className='arrow' onClick={decreaseHandler}>
                &#10094;
                </div>
                <span className='value'>{quantity}</span>
                <div className='arrow' onClick={increaseHandler}>
                &#10095;
                </div>
            </span>
            <span className='price'> {price}</span>
            <div className='remove-button' onClick={clearItemHandler}>
                &#10005;
            </div>
        </div>
    )
}

export default CheckoutItem