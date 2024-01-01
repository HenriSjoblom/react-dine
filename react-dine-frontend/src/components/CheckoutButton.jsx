import { useNavigate } from 'react-router-dom';

import './Button.css'


const CheckoutButton = () => {

  const navigate = useNavigate();

  const navigateHandler = () => {
    navigate('/checkout');
  }

  return (
    <button className='direction__button' onClick={navigateHandler}>Go To Checkout</button>
  )
}

export default CheckoutButton;