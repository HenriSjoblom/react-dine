import DishList from "../components/DishList"
import CheckoutButton from "../components/CheckoutButton"
import MenuButton from "../components/MenuButton"

const OrderCart = () => {  
  
  return(
    <div className="page__background">    
      <h1 className="page__header">Order Cart</h1>
        <div className="direction__button__container">  
          <MenuButton text={'Back To Menu'} />
          <CheckoutButton />
        </div>    
        <DishList quantityLimit={1}/>
        <div className="direction__button__container">  
          <MenuButton text={'Back To Menu'} />
          <CheckoutButton />
      </div>  
    </div>
  )
};

export default OrderCart;