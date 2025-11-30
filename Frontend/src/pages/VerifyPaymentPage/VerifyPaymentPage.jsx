import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useCart } from '../../CartContext/CartContext'
import axios from 'axios';

const VerifyPaymentPage = () => {

  const { clearCart } = useCart();
  const { search } = useLocation();
  const navigate = useNavigate();
  const [statusMsg, setStatusMsg] = useState('Verifying Payment, Please wait...');

  useEffect(() => {
    const params = new URLSearchParams(search);
    const success = params.get('success');
    const session_id = params.get('session_id');

    // token inside effect to avoid stale/unstable deps
    const token = localStorage.getItem('authToken');
    const authHeaders = token ? { 'Authorization': `Bearer ${token}` } : {};

    // Missing or concelled payment
    if (success !== 'true' && session_id) {
      if (success === 'false') {
        navigate('/checkout', { replace: true });
        return;
      }
      setStatusMsg('Payment was not successful. Please try again.');
      return;
    }

    // Stripe suceess
    axios.get('http://localhost:4000/api/orders/confirm', {
      params: { session_id },
      headers: authHeaders
    })
      .then(() => {
        clearCart();
        navigate('/myorder', { replace: true });
      })
      .catch((err) => {
        console.error('Error confirming order:', err);
        setStatusMsg('There was an error confirming your order. Please contact support.');
        // attempt to clear cart (no args expected)
        try { clearCart(); } catch (e) { /* ignore */ }
      })
  }, [search, clearCart, navigate]);


  return (
    <div className='min-h-screen flex items-center justify-center text-white'>
      <p>{statusMsg}</p>
    </div>
  )
}

export default VerifyPaymentPage