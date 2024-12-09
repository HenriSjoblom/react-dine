import CheckoutForm from "../components/dines/CheckoutForm";
import DishList from "../components/dines/DishList";
import Button from "../components/shared/Button";
import { useNavigate } from "react-router-dom";

import "./PageStyles.css";

const Checkout = () => {
  let navigate = useNavigate();

  const navigateCartHandler = () => {
    navigate("/checkout");
  };

  return (
    <>
      <h1 className="page__header">Checkout</h1>
      <div className="button-container">
        <Button onClick={navigateCartHandler}>Back To Order Cart</Button>
      </div>
      <CheckoutForm />
      <h1 className="page__header">Order</h1>
      <DishList quantityLimit={1} allowChange={false} />
    </>
  );
};

export default Checkout;
