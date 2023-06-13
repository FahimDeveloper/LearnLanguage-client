import moment from "moment/moment";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";
import Loader from "../../../../Components/Shared/Loader/Loader";
import { useQuery } from "react-query";


const PaymentHistory = () => {
    const { user, loading } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const { data: paymentData = [], isLoading } = useQuery({
        queryKey: ["payment", user?.email],
        enabled: !loading && !!user && !!localStorage.getItem('access-token'),
        queryFn: async () => {
            const res = await axiosSecure(`/paymentData/${user.email}`)
            return res.data
        }
    })
    if (isLoading) {
        return <Loader />
    }
    return (
        <>
            {
                paymentData.length > 0 ?
                    <div className="overflow-x-auto">
                        <table className="table text-lg">
                            {/* head */}
                            <thead className="bg-primary text-base-100 text-center">
                                <tr className="text-base">
                                    <th>#</th>
                                    <th>course Name</th>
                                    <th>Price</th>
                                    <th>Enrolled Date</th>
                                    <th>Transection ID</th>
                                </tr>
                            </thead>
                            <tbody className="text-center">
                                {
                                    paymentData.map((payment, index) => {
                                        return (
                                            <tr key={payment._id}>
                                                <th>{index + 1}</th>
                                                <td>{payment.courseName}</td>
                                                <td>${payment.price}</td>
                                                <td>{moment(payment.date).format("dddd, MMM Do YY, hA")}</td>
                                                <td>{payment.transectionId}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    : <p className="h-screen flex items-center text-3xl font-bold">You have no Payment Histore</p>
            }
        </>
    )
};

export default PaymentHistory;