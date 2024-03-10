import MainNavigation from "../components/MainNavigation";

import './PageStyles.css'

const ErrorPage = () => {
  return (
    <>
      <MainNavigation/> 
      <h1 className="page__header">Oops, something went wrong!</h1>
      <p className="page__text">Not finding that page you are looking for.</p>
    </>
  )
}

export default ErrorPage;