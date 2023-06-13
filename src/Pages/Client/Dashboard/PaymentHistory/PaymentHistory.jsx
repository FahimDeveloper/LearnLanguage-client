import moment from "moment/moment";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";
import Loader from "../../../../Components/Shared/Loader/Loader";


const PaymentHistory = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [paymentData, setPaymentData] = useState([])
    const [axiosSecure] = useAxiosSecure();
    useEffect(() => {
        setLoading(true)
        axiosSecure(`/paymentData/${user.email}`)
            .then(res => {
                setPaymentData(res.data)
                setLoading(false)
            })
    }, [user, axiosSecure]);
    if (loading) {
        return <Loader />
    }
    return (
        <>
            {
                paymentData.length > 0 ?
                    <div className="overflow-x-auto">
                        <table className="table text-lg">
                            {/* head */}
                            <thead className="bg-primary text-base-100">
                                <tr className="text-base">
                                    <th>#</th>
                                    <th>course Name</th>
                                    <th>Transection ID</th>
                                    <th>Enrolled Date</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    paymentData.map((payment, index) => {
                                        return (
                                            <tr key={payment._id}>
                                                <th>{index + 1}</th>
                                                <td>{payment.courseName}</td>
                                                <td>{payment.transectionId}</td>
                                                <td>{moment(payment.date).format("dddd, MMM Do YYYY, h:mm a")}</td>
                                                <td>${payment.price}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div> :
                    <p className="h-screen flex items-center text-3xl font-bold">You have no Payment Histore</p>
            }
        </>
    )
};

export default PaymentHistory;