import { useRef, useContext } from "react";
import { useMutation } from "react-query";
import { useNavigate } from 'react-router-dom';

import Input from "../components/shared/Input";
import Button from "../components/shared/Button";
import { addDine } from "../api/dines";
import { AuthContext } from '../context/auth-context';

import './PageStyles.css';



const AddDine = () => {
  const navigate = useNavigate();

  const nameRef = useRef();
  const priceRef = useRef();
  const descriptionRef = useRef();
  const imageRef = useRef();

  const auth = useContext(AuthContext);

  const createCityMutation = useMutation({
    mutationFn: addDine
  });

  const citySubmitHandler = async (event) => {
    event.preventDefault();
    createCityMutation.mutate({
      name: nameRef.current.value,
      price: priceRef.current.value,
      description: descriptionRef.current.value,
      image: imageRef.current.value,
      token: auth.token
    })
    navigate('/');
  };

  return (
    <form onSubmit={citySubmitHandler}>
      <Input ref={nameRef} type="text" label="Name" />
      <Input ref={priceRef} type="text" label="Price" />
      <Input ref={descriptionRef} type="text" label="Description" />
      <Input ref={imageRef} type="text" label="Image Link" />
      <Button type="submit">
        Add Dine
      </Button>
    </form>
  )
};

export default AddDine;