import { useRef, useState, useContext } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../context/auth-context";
import Card from "../components/shared/Card";
import Input from "../components/shared/Input";
import Button from "../components/shared/Button";
import { signUpUser, loginUser } from "../api/users";

import "./Authenticate.css";

const Authenticate = () => {
  let navigate = useNavigate();

  const auth = useContext(AuthContext);
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const [isLoginMode, setLoginMode] = useState(true);

  const switchModeHanlder = (event) => {
    event.preventDefault();
    setLoginMode((prevMode) => !prevMode);
  };

  const signUpUserMutation = useMutation(
    {
      mutationFn: signUpUser,
      onSuccess: (data) => {
        // Will execute only once, for the last mutation,
        // regardless which mutation resolves first
        auth.login(data.id, data.token);
        navigate("/");
      },
      onError: (error) => {
        console.error(error);
      },
    },
    []
  );

  const loginUserMutation = useMutation(
    {
      mutationFn: loginUser,
      onSuccess: (data) => {
        // Will execute only once, for the last mutation,
        // regardless which mutation resolves first
        auth.login(data.id, data.token);
        navigate("/");
      },
      onError: (error) => {
        console.error(error);
      },
    },
    []
  );

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (isLoginMode) {
      loginUserMutation.mutate({
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
    } else {
      signUpUserMutation.mutate({
        name: nameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
    }
  };

  return (
    <Card className="authentication">
      {!isLoginMode ? <h2>Sign Up</h2> : <h2>Login</h2>}
      <form onSubmit={onSubmitHandler}>
        {!isLoginMode && (
          <Input id="name" ref={nameRef} type="text" label="Name" />
        )}
        <Input id="email" ref={emailRef} type="text" label="Email" />
        <Input
          id="password"
          ref={passwordRef}
          type="password"
          label="Password"
          autcomplete="password"
        />
        <Button type="submit" disable={signUpUserMutation.isLoading}>
          {isLoginMode ? "Login" : "Sign Up"}
        </Button>
        <Button inverse onClick={switchModeHanlder}>
          {isLoginMode ? "Sign Up" : "Login"} instead?
        </Button>
      </form>
    </Card>
  );
};

export default Authenticate;
