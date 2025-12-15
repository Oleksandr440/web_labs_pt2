import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearCart } from '../redux/actions';
import PrimaryButton from '../components/ui/PrimaryButton';
import FormError from '../components/FormError';
import './Checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .matches(/^[a-zA-Zа-яА-ЯіІїЇ]+$/, "First Name must contain only letters")
      .min(2, "First Name is too short")
      .required("First Name is required"),
    
    lastName: Yup.string()
      .matches(/^[a-zA-Zа-яА-ЯіІїЇ]+$/, "Last Name must contain only letters")
      .min(2, "Last Name is too short")
      .required("Last Name is required"),
    
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    
    phone: Yup.string()
      .matches(/^[0-9]+$/, "Phone must contain only numbers")
      .min(10, "Phone number must be at least 10 digits")
      .required("Phone is required"),
      
    address: Yup.string()
      .min(5, "Address is too short")
      .max(100, "Address is too long")
      .required("Address is required"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("Order data:", values);
      dispatch(clearCart());
      navigate('/success');
    },
  });

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      
      <form onSubmit={formik.handleSubmit} className="checkout-form">
        
        <div className="form-row">
            <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                    id="firstName"
                    type="text"
                    className={`ui-input ${formik.touched.firstName && formik.errors.firstName ? 'input-error' : ''}`}
                    {...formik.getFieldProps('firstName')}
                />
            </div>

            <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                    id="lastName"
                    type="text"
                    className={`ui-input ${formik.touched.lastName && formik.errors.lastName ? 'input-error' : ''}`}
                    {...formik.getFieldProps('lastName')}
                />
            </div>
        </div>

        <div className="form-row">
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="email"
                    className={`ui-input ${formik.touched.email && formik.errors.email ? 'input-error' : ''}`}
                    {...formik.getFieldProps('email')}
                />
            </div>

            <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                    id="phone"
                    type="tel"
                    placeholder="0991234567"
                    className={`ui-input ${formik.touched.phone && formik.errors.phone ? 'input-error' : ''}`}
                    {...formik.getFieldProps('phone')}
                />
            </div>
        </div>

        <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
                id="address"
                type="text"
                className={`ui-input ${formik.touched.address && formik.errors.address ? 'input-error' : ''}`}
                {...formik.getFieldProps('address')}
            />
        </div>

        <FormError errors={formik.errors} touched={formik.touched} />

        <div className="form-actions">
            <button type="button" className="secondary-btn" onClick={() => navigate(-1)}>
                Go Back
            </button>
            <PrimaryButton text="Continue" type="submit" />
        </div>

      </form>
    </div>
  );
};

export default Checkout;