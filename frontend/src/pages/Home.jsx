import { useNavigate } from "react-router-dom";
import Button from "../components/shared/Button";

import "./PageStyles.css";

const Home = () => {
  const navigate = useNavigate();

  const navigateHandler = () => {
    navigate("/menu");
  };

  return (
    <>
      <h1 className="page__header">ReactDine</h1>
      <p className="page__text">
        ReactDine - Your Digital Gateway to React Diner&apos;s Kitchen
      </p>
      <Button onClick={navigateHandler}>Go To Menu</Button>
    </>
  );
};

export default Home;
