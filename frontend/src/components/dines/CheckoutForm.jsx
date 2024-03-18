import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { reset } from '../../utilities/dishesSlice';

import './CheckoutForm.css';


const validationSchema = Yup.object({
  name: Yup.string().required('Required'),
  email: Yup.string(),
  street: Yup.string().required('Required'),
  postalCode: Yup.string().required('Required'),
  city: Yup.string().required('Required'),
  phoneNumber: Yup.string().required('Required'),
  specialInstructions: Yup.string(),
});

/*
  This component is responsible for creating and handling the checkout form.
  - Form Creation: It generates a form for the checkout process.
  - Validation: It ensures that all required fields are filled before submission.
  - Order Submission: It sends the completed order to the API.
  - Order Confirmation: After submission, it retrieves all orders from the API to verify that the new order
    was successfully added.
*/
const CheckoutForm = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dishesOrder = useSelector(state => state.dishes);

  const postOrder = async (order) => {
    const response = await fetch('http://localhost:5000/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    });

    if (!response.ok) {
      throw new Error('POST request failed');
    }

    const data = await response.json();
    return data;
  };

  const getOrder = async () => {
    const response = await fetch('http://localhost:5000/api/orders');

    if (!response.ok) {
      throw new Error('GET request failed');
    }

    const data = await response.json();
    return data;
  };

  function isOrderInOrders(sentOrder, receivedOrders) {

    const sentOrderString = JSON.stringify(sentOrder.order);

    for (let i = 0; i < receivedOrders.length; i++) {
        // Create a copy of the received order with only the properties present in the sent order
        const receivedOrderCopy = {
        customer: receivedOrders[i].customer,
        items: receivedOrders[i].items,
        };

        const receivedOrderString = JSON.stringify(receivedOrderCopy);

        if (sentOrderString === receivedOrderString) {
        return true;
        }
    }
    return false;
  };

  const submitOrder = async (values, { setSubmitting }) => {
    const items = Object.entries(dishesOrder).map(([id, quantity]) => ({ id, quantity }));

    const order = {
      order: {
        customer: {
          name: values.name,
          email: values.email,
          street: values.street,
          'postal-code': values.postalCode,
          city: values.city,
          'phone-number': values.phoneNumber,
          'special-instructions': values.specialInstructions,
        },
        items,
      },
    };

    try {
      const postData = await postOrder(order);
      console.log('Order submitted:', order);

      const orderData = await getOrder(postData.orderId);
      console.log('Fetched orders:', orderData);
      setSubmitting(false);

      if (isOrderInOrders(order, orderData)) {
        // Display a success notification for 10 seconds, clear store and then open Home page
        console.log('The order was found in the received orders.');
        dispatch(reset());
        toast.success('Order confirmed!', {autoClose: 8000});
        setTimeout(() => {
            navigate('/');
        }, 8000);

      } else {
        console.log('The order was not found in the received orders.');
        toast.error('Failed to confirm order.');
      }

    } catch (error) {
      console.error('Error:', error);
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Formik
        initialValues={{ name: '', email: '',street: '', city: '', postalCode: '', phoneNumber: '', specialInstructions: '' }}
        validationSchema={validationSchema}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={submitOrder}>

        <Form>
          <label htmlFor="name">Name</label>
          <Field name="name" type="text" />
          <ErrorMessage name="name" component="div" />

          <label htmlFor="email">Email</label>
          <Field name="email" type="text" />
          <ErrorMessage name="email" component="div" />

          <label htmlFor="street">Street</label>
          <Field name="street" type="text" />
          <ErrorMessage name="street" component="div" />

          <label htmlFor="city">City</label>
          <Field name="city" type="text" />
          <ErrorMessage name="city" component="div" />

          <label htmlFor="postalCode">Postal Code</label>
          <Field name="postalCode" type="text" />
          <ErrorMessage name="postalCode" component="div" />

          <label htmlFor="phoneNumber">Phone Number</label>
          <Field name="phoneNumber" type="text" />
          <ErrorMessage name="phoneNumber" component="div" />

          <label htmlFor="specialInstructions">Special Instructions</label>
          <Field name="specialInstructions" type="text" />
          <ErrorMessage name="specialInstructions" component="div" />

          <button type="submit">Submit order</button>
        </Form>
      </Formik>
      <ToastContainer />
    </div>
  );
};

export default CheckoutForm;
