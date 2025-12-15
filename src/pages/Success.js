import React from 'react';
import { useNavigate } from 'react-router-dom';
import PrimaryButton from '../components/ui/PrimaryButton';

const Success = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', padding: '100px 20px', color: 'white' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>Success!</h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '40px' }}>
        Your order has been placed successfully. Thank you for buying games with us!
      </p>

      <PrimaryButton text="Back to Catalog" onClick={() => navigate('/catalog')} />
    </div>
  );
};

export default Success;