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
    const [disabled, setDisabled] = useState(false)
    useEffect(() => {
        axiosSecure.post('/create-payment-intent', { price })
            .then(res => {
                setClientSecret(res.data.clientSecret)
            })
    }, [axiosSecure, price]);
    const handleSubmit = async (event) => {
        setDisabled(true);
        event.preventDefault();
        if (!stripe || !elements) {
            setDisabled(false)
            return;
        }
        const card = elements.getElement(CardElement);
        if (card == null) {
            setDisabled(false)
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });
        if (error) {
            setDisabled(false)
            console.log('[error]', error);
        } else {
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
            setDisabled(false)
            console.log(confirmError)
        }
        console.log('[PaymentIntent]', paymentIntent);
        setLoader(true);
        if (paymentIntent.status === 'succeeded') {
            const payment = {
                userEmail: user?.email,
                courseName: courseName,
                courseId: courseId,
                transectionId: paymentIntent.id,
                date: new Date(),
                price: price,
            }
            axiosSecure.post(`/payment?email=${user.email}&cartId=${cartId}`, payment)
                .then(res => {
                    if (res.data.result.insertedId) {
                        axiosSecure.patch(`/updateCourseInfo/${courseId}`)
                            .then(res => {
                                if (res.data.result1.modifiedCount > 0) {
                                    refetch();
                                    navigate('/dashboard/paymentHistory')
                                    setLoader(false);
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
            <button type="submit" className='btn btn-primary' disabled={!stripe || !clientSecret || disabled}>
                Pay
            </button>
        </form>
    );
};

export default CheckoutForm;