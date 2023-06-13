import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import { useLocation } from 'react-router-dom';

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_KEY);
const Payment = () => {
    const location = useLocation();
    const price = location.state?.price;
    const courseId = location.state?.courseId;
    const cartId = location.state?.cartId;
    const courseName = location.state?.courseName;
    return (
        <div className='w-full'>
            <div className='flex items-center h-screen'>
                <div className='w-[500px] mx-auto'>
                    <Elements stripe={stripePromise}>
                        <CheckoutForm price={price} courseId={courseId} cartId={cartId} courseName={courseName} />
                    </Elements>
                </div>
            </div>
        </div>
    );
};

export default Payment;