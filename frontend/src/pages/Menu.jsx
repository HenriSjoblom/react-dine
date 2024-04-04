import DishList from "../components/dines/DishList"
import { useNavigate } from 'react-router-dom';
import Button from '../components/shared/Button';

import './PageStyles.css'


const Menu = () => {

  const navigate = useNavigate();

  const navigateCartHandler = () => {
    navigate('/ordercart');
  }
  return(
    <>
      <h1 className="page__header">Menu</h1>
      <div className="button-container">
        <Button onClick={navigateCartHandler}>Order Cart</Button>
      </div>
      <DishList />
      <div className="button-container">
        <Button onClick={navigateCartHandler}>Order Cart</Button>
      </div>
    </>
  )
};

export default Menu;