import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/actions';
import PrimaryButton from '../components/ui/PrimaryButton';
import FormError from '../components/FormError';
import './Auth.css';

const LoginPage = () => {
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
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email').required('Email is required'),
            password: Yup.string().required('Password is required')
        }),
        onSubmit: (values) => {
            dispatch(loginUser(values.email));
            navigate('/');
        },
    });

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2>Submit the form to sign in</h2>
                
                <form onSubmit={formik.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">E-mail</label>
                        <input
                            id="email"
                            type="email"
                            className={`ui-input ${formik.touched.email && formik.errors.email ? 'input-error' : ''}`}
                            {...formik.getFieldProps('email')}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            className={`ui-input ${formik.touched.password && formik.errors.password ? 'input-error' : ''}`}
                            {...formik.getFieldProps('password')}
                        />
                    </div>

                    <FormError errors={formik.errors} touched={formik.touched} />

                    <div className="auth-footer">
                        <p>Not a member? <Link to="/register">Sign up</Link></p>
                        <PrimaryButton text="LOGIN ME" type="submit" style={{width: '100%'}} />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;