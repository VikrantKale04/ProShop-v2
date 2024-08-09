import {useState, useEffect} from 'react';
import { Form, Button, Col, FormGroup, FormFloating } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import {savePaymentMethod} from "../slices/cartSlice"
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const PaymentScreen = () => {
    const cart = useSelector((state) => state.cart );
    const  { shippingAddress } = cart;

    const [paymentMethod, setPaymentMethod] = useState('PayPal');
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

   useEffect(()=>{
    if(!shippingAddress.address) {
        navigate('/shipping')
    }
   },[shippingAddress, navigate])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        navigate('/placeorder')
        
    }
  return (
    <FormContainer>
        <CheckoutSteps step1 step2 step3 />
        <h1>Payment</h1>

        <Form onSubmit={submitHandler}>
            <FormGroup>
                <Form.Label as='legend'>Select Method</Form.Label>
                <Col>
                    <Form.Check
                        type='radio'
                        className='py-3'
                        value='PayPal'
                        id='PayPal'
                        label= 'PayPal or Credit Card'
                        checked
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                    </Form.Check>
                </Col>
            </FormGroup>
            <Button type='submit' variant='primary'>
                Continue
            </Button>

        </Form>
    </FormContainer>
  )
}

export default PaymentScreen