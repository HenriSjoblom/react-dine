import MenuButton from '../components/dines/MenuButton';
import './PageStyles.css'


const Home = () => {

  return (
    <div className="page__background">
      <h1 className='page__header'>ReactDine</h1>
      <p className='page__text'>ReactDine - Your Digital Gateway to React Diner's Kitchen</p>
      <MenuButton />
    </div>
  )
};

export default Home;