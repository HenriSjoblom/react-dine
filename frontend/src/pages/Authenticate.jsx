import { useRef, useState} from "react"
import { useMutation } from "react-query";

import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/Button";
import { signUpUser, loginUser } from "../api/users";

import './Authenticate.css';

const Authenticate = props => {

    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const [isLoginMode, setLoginMode] = useState(true);

    const switchModeHanlder = () => {
        setLoginMode(prevMode => !prevMode);
    }

    const signUpUserMutation = useMutation({
        mutationFn: signUpUser,
        onSuccess: (data) => {
        // Will execute only once, for the last mutation,
        // regardless which mutation resolves first
            console.log(data);
        },
        onError: (error) => {
        // An error happened!
            console.log(error);
        }
    });

    const loginUserMutation = useMutation({
        mutationFn: loginUser,
        onSuccess: (data) => {
          // Will execute only once, for the last mutation,
          // regardless which mutation resolves first
          console.log(data);
        },
        onError: (error) => {
          // An error happened!
          console.log(error);
        }
    });

    const onSubmitHandler = event => {

        event.preventDefault();
        if (isLoginMode) {
        loginUserMutation.mutate({
            email: emailRef.current.value,
            password: passwordRef.current.value
        })
        } else {
        signUpUserMutation.mutate({
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value
        })
        }
    }


    return(
    <Card className="authentication">
        {!isLoginMode? <h2>Sign Up</h2> : <h2>Login</h2>}
        <form onSubmit={onSubmitHandler}>
            {!isLoginMode &&
                <Input id="name" ref={nameRef} type="text" label="Name"
            />}
            <Input id="email" ref={emailRef} type="text" label="Email" />
            <Input id="password" ref={passwordRef} type="password" label="Password" />
            <Button type="submit" disable={signUpUserMutation.isLoading}>
                {isLoginMode? 'LOGIN' : 'SIGNUP'}
            </Button>
            <Button inverse onClick={switchModeHanlder}>
                {isLoginMode? 'SignUp' : 'Login'} instead?
            </Button>
        </form>
    </Card>
    )
};

export default Authenticate;