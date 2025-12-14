import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, increaseQuantity, decreaseQuantity } from '../redux/actions';
import PrimaryButton from '../components/ui/PrimaryButton';
import { useNavigate } from 'react-router-dom';
import './CartPage.css';

const CartPage = () => {
  const cartItems = useSelector(state => state.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="cart-page-wrapper">

      <h1>Your Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <p className="empty-cart-msg">Your cart is empty. Go buy some games!</p>
      ) : (
        <div className="cart-content">
          <div className="cart-items-list">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <div className="cart-img-wrapper">
                   <img src={`/images/${item.image}`} alt={item.title} />
                </div>
                
                <div className="cart-item-info">
                    <h3>{item.title}</h3>
                    <p>Price: ${item.price}</p>
                </div>

                <div className="cart-controls">
                    <button className="qty-btn" onClick={() => dispatch(decreaseQuantity(item.id))}>-</button>
                    <span className="qty-value">{item.quantity}</span>
                    <button className="qty-btn" onClick={() => dispatch(increaseQuantity(item.id))}>+</button>
                </div>

                <div className="cart-item-total">
                    ${(item.price * item.quantity).toFixed(2)}
                </div>

                <button 
                    className="remove-btn" 
                    onClick={() => dispatch(removeFromCart(item.id))}
                >
                    ✕
                </button>
              </div>
            ))}

          </div>

          <div className="cart-summary">
             <h2>Total: ${totalAmount.toFixed(2)}</h2>
             <PrimaryButton text="Checkout" onClick={() => alert("Checkout logic coming soon!")} />
          </div>
        </div>
      )}

        <button 
            className="secondary-btn" 
            onClick={() => navigate(-1)}
            style={{ marginTop: '20px' }}
        >
            ← Go Back
        </button>

    </div>
  );
};

export default CartPage;