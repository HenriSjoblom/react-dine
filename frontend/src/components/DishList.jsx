import { useSelector } from 'react-redux';
import { useState, useCallback, useEffect } from 'react';

import DishItem from './DishItem';

/*
  This component fetches dish data from the API.
  - Returns: A list of dishes or an error message string in case of empty dishes list or error.
  - QuantityLimit: This parameter sets a limit to filter out dishes with a quantity less than the specified limit.
  - Usage: This component is used in the menu, order cart, and checkout pages of the application.
*/
const DishList = ({ quantityLimit=0 }) => {

  const [dishes, setDishes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDishes = useCallback( async() => {
    try {
      setError(null)
      setIsLoading(true);

      const response = await fetch('http://localhost:5000/api/dines');
      if(!response.ok) {
        throw new Error('Something went wrong!');
      }
      const data = await response.json();
      console.log(data);
      setDishes(data);
    } catch (error) {
      setError(error.message);
      console.error('Error: ', error);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchDishes();
  }, [fetchDishes]);

  const quantities = useSelector(state => state.dishes);

  let content = <p>No dishes data found</p>;
  if (error) {
    content = <p>{error}</p>;
  }
  if (isLoading) {
    content = <p>Fetching data... </p>;
  }
  if (dishes != null) {
    if (quantityLimit == 0) {
      content = dishes?.map(d => <DishItem key={d.id} id={d.id} name={d.name} price={d.price} description={d.description} image={d.image} />)
    }
    else  {
      content= dishes?.filter(d => quantities[d.id] >= quantityLimit).map(d =>
                <DishItem key={d.id} id={d.id} name={d.name} price={d.price} description={d.description} image={d.image} />)}
      if ( content.length === 0 ) {
        content = <p>Your cart is waiting for you to fill it. Discover our variety of dishes and make your selection!</p>
      }
    }

  return (<>
            {content}
          </>
  )
};

export default DishList;