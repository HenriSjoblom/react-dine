import CheckoutForm from "../components/dines/CheckoutForm";
import DishList from "../components/dines/DishList";
import Button from '../components/shared/Button';

import './PageStyles.css'

const navigateCartHandler = () => {
  navigate('/checkout');
}

const Checkout = () => {

  return (
    <>
      <h1 className="page__header">Checkout</h1>
      <div className="button-container">
        <Button onClick={navigateCartHandler}>Back To Order Cart</Button>
      </div>
      <CheckoutForm />
      <h1 className="page__header">Order</h1>
      <DishList quantityLimit={1} allowChange={false}/>
    </>
  );
};

export default Checkout;