import { useNavigate } from 'react-router-dom';

import '../shared/Button.css'

const MenuButton = ( { text='Go to menu' } ) => {

  const navigate = useNavigate();

  const navigateHandler = () => {
    navigate('/menu');
  }

  return (
    <button className='direction__button' onClick={navigateHandler}>{text}</button>
  )
}

export default MenuButton;