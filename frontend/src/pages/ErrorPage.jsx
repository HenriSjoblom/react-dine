import MainNavigation from "../components/shared/MainNavigation";
import Button from '../components/shared/Button';

import { useNavigate } from 'react-router-dom';

import './RootLayout.css'
import './PageStyles.css'

const ErrorPage = () => {

  const navigate = useNavigate();

  const navigateHandler = () => {
    navigate('/');
  }
  return (
    <>
      <MainNavigation />
      <div className="content-layout">
        <div className="error-container">
          <h1 className="page__header">Oops, something went wrong!</h1>
          <p className="page__text">Not finding that page you are looking for.</p>
          <div className="button-container">
            <Button onClick={navigateHandler}>Back To Home</Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ErrorPage;