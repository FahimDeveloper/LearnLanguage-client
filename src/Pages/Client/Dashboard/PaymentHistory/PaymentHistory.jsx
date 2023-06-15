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
                    <div className="p-10 w-full">
                        <h2 className="text-center text-3xl font-medium mb-5">Your Payment History</h2>
                        <div className="overflow-x-auto">
                            <table className="table">
                                <thead className="bg-primary text-sm text-base-100 text-center">
                                    <tr>
                                        <th>#</th>
                                        <th>course Name</th>
                                        <th>Price</th>
                                        <th>Enrolled Date</th>
                                        <th>Transection ID</th>
                                    </tr>
                                </thead>
                                <tbody className="text-center text-base">
                                    {
                                        paymentData.map((payment, index) => {
                                            return (
                                                <tr key={payment._id}>
                                                    <th>{index + 1}</th>
                                                    <td>{payment.courseName}</td>
                                                    <td>${payment.price}</td>
                                                    <td>{moment(payment.date).format("ddd, MMM Do YY, hA")}</td>
                                                    <td className="italic">{payment.transectionId}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    : <p className="h-screen flex items-center text-3xl font-bold">You have no Payment Histore</p>
            }
        </>
    )
};

export default PaymentHistory;