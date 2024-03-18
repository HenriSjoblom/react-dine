import { useDispatch, useSelector } from 'react-redux';
import { increaseQuantity, decreaseQuantity } from '../../utilities/dishesSlice';

import './DishItem.css';


const DishItem = ({id, name, price, description, image}) => {

  const dispatch = useDispatch();
  const quantity = useSelector(state => state.dishes[id] || 0);

  const handleIncrease = () => {
    dispatch(increaseQuantity(id));
  };

  const handleDecrease = () => {
    dispatch(decreaseQuantity(id));
  };

  return (
    <li className="dish__list-item">
      <img className="dish__list-item__image" src={image}></img>
      <section className='dish__list-item__section'>
        <h2>{name}</h2>
        <p>{description}</p>
        <h4> Price:  {price}$</h4>
        <div className='dish__quantity'>
          {quantity > 0 && <button className='dish__button' onClick={handleDecrease}>-</button>}
          <span className='quantity__box'> {quantity} </span>
          <button className='dish__button' onClick={handleIncrease}>+</button>
        </div>
      </section>
    </li>
  )
};

export default DishItem;