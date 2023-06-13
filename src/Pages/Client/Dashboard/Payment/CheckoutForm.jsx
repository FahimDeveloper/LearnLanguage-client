import { useEffect, useState } from "react";
import useAuth from "../../../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import './checkout.css'
import Swal from "sweetalert2";
import Loader from "../../../../Components/Shared/Loader/Loader";
import useCart from "../../../../Hooks/useCart";


const CheckoutForm = ({ price, courseId, cartId, courseName }) => {
    const [loader, setLoader] = useState(false);
    const { user } = useAuth();
    const [, refetch] = useCart();
    const [clientSecret, setClientSecret] = useState();
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();
    const [axiosSecure] = useAxiosSecure();
    useEffect(() => {
        axiosSecure.post('/create-payment-intent', { price })
            .then(res => {
                setClientSecret(res.data.clientSecret)
            })
    }, [axiosSecure, price]);
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);
        if (card == null) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });
        if (error) {
            console.log('[error]', error);
        } else {
            setLoader(true)
            console.log('[PaymentMethod]', paymentMethod);
        }
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: user?.displayName || 'anonymous user',
                        email: user?.email || 'anonymous user'
                    },
                },
            },
        );
        if (confirmError) {
            console.log(confirmError)
        }
        console.log('[PaymentIntent]', paymentIntent);
        if (paymentIntent.status === 'succeeded') {
            const payment = {
                userEmail: user?.email,
                courseName: courseName,
                courseId: courseId,
                transactionId: paymentIntent.id,
                date: new Date(),
                price: price,
            }
            axiosSecure.post(`/payment?email=${user.email}&cartId=${cartId}`, payment)
                .then(res => {
                    if (res.data.result.insertedId) {
                        refetch();
                        navigate('/dashboard/paymentHistory')
                        setLoader(false)
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Payment success',
                            showConfirmButton: false,
                            timer: 1000
                        })
                    }
                })
        }
    };
    if (loader) {
        return (
            <Loader />
        )
    }
    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button type="submit" className='btn btn-primary' disabled={!stripe || !clientSecret}>
                Pay
            </button>
        </form>
    );
};

export default CheckoutForm;