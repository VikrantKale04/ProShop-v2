import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col, FormGroup, FormLabel, FormControl } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import { useLoginMutation } from "../slices/userApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, {isLoading}] = useLoginMutation();

  const userInfo = useSelector((state) => state.auth.userInfo);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/'

  useEffect(()=> {
    if(userInfo){
      navigate(redirect)
    }
  }, [userInfo, redirect, navigate]);


  const sumbitHandler = async(e) => {
    e.preventDefault();
    try {
      const res = await login({email, password}).unwrap();
      dispatch(setCredentials({...res}));
      navigate(redirect)
    } catch (err) {
      toast.error(err?.data?.message || err?.error)
    }
  }

  return (
    <FormContainer>

      <h1>Sign In</h1>

      <Form onSubmit={sumbitHandler}>
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

        <Button type="submit" variant="primary" className="mt-2">
          Sign In
        </Button>

        {isLoading && <Loader/>}
      </Form>

      <Row className="py-3">
        <Col>
          New Customer? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default LoginScreen