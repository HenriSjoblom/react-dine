import { useNavigate } from 'react-router-dom';

import './Button.css'

const OrderCartButton = () => {

  const navigate = useNavigate();

  const navigateHandler = () => {
    navigate('/ordercart');
  }

  return (
      <button className='direction__button' onClick={navigateHandler}>Go To Order Cart</button>
  )
}

export default OrderCartButton;