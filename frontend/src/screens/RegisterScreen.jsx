import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col, FormGroup, FormLabel, FormControl } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import { useRegisterMutation } from "../slices/userApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";

const LoginScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [register, { isLoading }] = useRegisterMutation();

    const userInfo = useSelector((state) => state.auth.userInfo);

    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/'

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [userInfo, redirect, navigate]);


    const sumbitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Password do not match")
            return;
        } else {
            try {
                const res = await register({ name, email, password }).unwrap();
                dispatch(setCredentials({ ...res }));
                navigate(redirect)
            } catch (err) {
                toast.error(err?.data?.message || err?.error)
            }
        }

    }

    return (
        <FormContainer>

            <h1>Sign Up</h1>

            <Form onSubmit={sumbitHandler}>
                <FormGroup controlId="name" className="my-3">

                    <FormLabel>Name</FormLabel>
                    <FormControl
                        type="text"
                        value={name}
                        placeholder="Enter name"
                        onChange={(e) => setName(e.target.value)}>
                    </FormControl>
                </FormGroup>

                <FormGroup controlId="email" className="my-3">
                    <FormLabel>Email Address</FormLabel>
                    <FormControl
                        type="email"
                        value={email}
                        placeholder="Enter email"
                        onChange={(e) => setEmail(e.target.value)}>
                    </FormControl>
                </FormGroup>

                <FormGroup controlId="password" className="my-3">
                    <FormLabel>Password</FormLabel>
                    <FormControl
                        type="password"
                        value={password}
                        placeholder="Enter password"
                        onChange={(e) => setPassword(e.target.value)}>
                    </FormControl>
                </FormGroup>

                <FormGroup controlId="confirmPassword" className="my-3">
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl
                        type="password"
                        value={confirmPassword}
                        placeholder="Confirm password"
                        onChange={(e) => setConfirmPassword(e.target.value)}>
                    </FormControl>
                </FormGroup>

                <Button type="submit" variant="primary" className="mt-2">
                    Sign Up
                </Button>

                {isLoading && <Loader />}
            </Form>

            <Row className="py-3">
                <Col>
                    Already have account? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Login</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default LoginScreen