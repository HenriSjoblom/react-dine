import DishList from "../components/dines/DishList"
import OrderCartButton from "../components/dines/OrderCartButton";

import './PageStyles.css'


const Menu = () => {

  return(
    <div className="page__background">
      <h1 className="page__header">Menu</h1>
      <OrderCartButton />
      <DishList />
      <OrderCartButton />
    </div>
  )
};

export default Menu;