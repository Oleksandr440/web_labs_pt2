import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/actions';
import PrimaryButton from '../components/ui/PrimaryButton';
import FormError from '../components/FormError';
import './Auth.css';

const RegisterPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.user);

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
            retypePassword: ''
        },
        validationSchema: Yup.object({
            username: Yup.string().min(2).required('Username is required'),
            email: Yup.string().email('Invalid email').required('Email is required'),
            password: Yup.string().min(6, 'Password must be at least 6 chars').required('Password is required'),
            retypePassword: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                .required('Retype password is required')
        }),
        onSubmit: (values) => {
            dispatch(loginUser(values.email));
            navigate('/');
        },
    });

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2>Register the new account</h2>
                
                <form onSubmit={formik.handleSubmit}>
                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" className="ui-input" {...formik.getFieldProps('username')} />
                    </div>
                    <div className="form-group">
                        <label>E-mail</label>
                        <input type="email" className="ui-input" {...formik.getFieldProps('email')} />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="ui-input" {...formik.getFieldProps('password')} />
                    </div>
                    <div className="form-group">
                        <label>Retype password</label>
                        <input type="password" className="ui-input" {...formik.getFieldProps('retypePassword')} />
                    </div>

                    <FormError errors={formik.errors} touched={formik.touched} />

                    <div className="auth-footer">
                        <p>Already a member? <Link to="/login">Sign in</Link></p>
                        <PrimaryButton text="SIGN ME UP" type="submit" style={{width: '100%'}} />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;