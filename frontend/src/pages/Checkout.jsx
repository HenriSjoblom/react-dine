import CheckoutForm from "../components/CheckoutForm";
import DishList from "../components/DishList";

import './PageStyles.css'


const Checkout = () => {

  return (
    <div className="page__background">    
      <h1 className="page__header">Checkout</h1>
      <DishList quantityLimit={1}/>
      <CheckoutForm />
    </div>
  );
};

export default Checkout;