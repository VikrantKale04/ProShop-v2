import { useState } from 'react';
import { Form, Button, FormGroup, FormLabel, FormControl } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import { saveShippingAddress } from '../slices/cartSlice'; 
import CheckoutSteps from '../components/CheckoutSteps';

const ShippingScreen = () => {

    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    const [address, setAddress] = useState(shippingAddress?.address || '');
    const [city, setCity] = useState(shippingAddress?.city || '');
    const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || '');
    const [country, setCountry] = useState(shippingAddress?.country || '');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(saveShippingAddress({address, city, postalCode, country}))
        navigate('/payment')
    }

    
  return (
    <FormContainer>
        <CheckoutSteps step1 step2/>
        <h1>Shipping</h1>
        <Form onSubmit={submitHandler}>
            <FormGroup className='my-2' controlId='address'>
                <FormLabel>Address</FormLabel>
                <FormControl
                    type='text'
                    value={address}
                    placeholder='Enter address'
                    required
                    onChange={(e) => setAddress(e.target.value)}
                >
                </FormControl>
            </FormGroup>

            <FormGroup className='my-2' controlId='city'>
                <FormLabel>City</FormLabel>
                <FormControl
                    type='text'
                    value={city}
                    placeholder='Enter City'
                    required
                    onChange={(e) => setCity(e.target.value)}
                >
                </FormControl>
            </FormGroup>

            <FormGroup className='my-2' controlId='postalCode'>
                <FormLabel>Postal Code</FormLabel>
                <FormControl
                    type='text'
                    value={postalCode}
                    placeholder='Enter Postal Code'
                    required
                    onChange={(e) => setPostalCode(e.target.value)}
                >
                </FormControl>
            </FormGroup>

            <FormGroup className='my-2' controlId='country'>
                <FormLabel>Country</FormLabel>
                <FormControl
                    type='text'
                    value={country}
                    placeholder='Enter Cuntry'
                    required
                    onChange={(e) => setCountry(e.target.value)}
                >
                </FormControl>
            </FormGroup>

            <Button type='submit' variant='primary' className='my-2'>
                Continue
            </Button>
        </Form>

    </FormContainer>
  )
}

export default ShippingScreen