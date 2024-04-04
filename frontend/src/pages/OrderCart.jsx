import DishList from "../components/dines/DishList"
import { useNavigate } from 'react-router-dom';
import Button from '../components/shared/Button';

import { useSelector } from 'react-redux';
import { useEffect, useState } from "react";

const OrderCart = () => {

  const [isEmpty, setIsEmpty] = useState(false);
  const navigate = useNavigate();

  const navigateMenuHandler = () => {
    navigate('/menu');
  }

  const navigateCheckoutHandler = () => {
    navigate('/checkout');
  }

  const dishes = useSelector(state => state.dishes);

  useEffect(() => {
    setIsEmpty(Object.keys(dishes).length === 0);
  }, [dishes]);


  return(
    <>
      <h1 className="page__header">Order Cart</h1>
      <div className="direction-button-container">
        <Button onClick={navigateMenuHandler}>Back To Menu</Button>
        <Button onClick={navigateCheckoutHandler} disabled={isEmpty}>Checkout</Button>
      </div>
      <DishList quantityLimit={1}/>
      <div className="direction-button-container">
        <Button onClick={navigateMenuHandler}>Back To Menu</Button>
        <Button onClick={navigateCheckoutHandler} disabled={isEmpty}>Checkout</Button>
      </div>
    </>
  )
};

export default OrderCart;