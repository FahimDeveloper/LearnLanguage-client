import {
    createBrowserRouter,
} from "react-router-dom";
import App from "../App";
import Home from "../Pages/Client/Home/Home";
import Instructors from "../Pages/Client/Instructors/Instructors";
import Clasess from "../Pages/Client/Classes/Clasess";
import Authentication from "../Pages/Authentication/Authentication";
import AuthPrivetRoute from "./AuthPrivetRoute";
import Dashboard from "../Layouts/Dashboard";
import PrivetRoute from "./PrivetRoute";
import MySelectedClass from "../Pages/Client/Dashboard/MySelectedClasses/MySelectedClass";
import MyEnrolledClass from "../Pages/Client/Dashboard/MyEnrolledClasses/MyEnrolledClass";
import PaymentHistory from "../Pages/Client/Dashboard/PaymentHistory/PaymentHistory";
import ManageClasses from "../Pages/Admin/ManageClasses/ManageClasses";
import ManageUsers from "../Pages/Admin/ManageUsers/ManageUsers";
import AddClass from "../Pages/Instructor/AddClass/AddClass";
import MyClass from "../Pages/Instructor/MyClass/MyClass";
import StudentDashboardPrivet from "./StudentDashboardPrivet";
import AdminDashboardPrivet from "./AdminDashboardPrivet";
import IntructorDashboardPrivet from "./IntructorDashboardPrivet";
import Payment from "../Pages/Client/Dashboard/Payment/payment";
import Error from "../Pages/Error/Error";
import Blogs from "../Pages/Client/Blogs/Blogs";
export const router = createBrowserRouter([
    {
        path: '/', element: <App />,
        errorElement: <Error />,
        children: [
            { path: "/", element: <Home /> },
            { path: "/instructors", element: <Instructors /> },
            { path: "/courses", element: <Clasess /> },
            { path: "/blogs", element: <Blogs /> },
            { path: "/authentication", element: <AuthPrivetRoute><Authentication /></AuthPrivetRoute> }
        ]
    },
    {
        path: '/dashboard', element: <PrivetRoute><Dashboard /></PrivetRoute>,
        errorElement: <Error />,
        children: [
            { path: "selectedClasses", element: <StudentDashboardPrivet><MySelectedClass /></StudentDashboardPrivet> },
            { path: "enrolledClasses", element: <StudentDashboardPrivet><MyEnrolledClass /></StudentDashboardPrivet> },
            { path: "payment", element: <StudentDashboardPrivet><Payment /></StudentDashboardPrivet> },
            { path: "paymentHistory", element: <StudentDashboardPrivet><PaymentHistory /></StudentDashboardPrivet> },
            { path: "admin/manageClasses", element: <AdminDashboardPrivet><ManageClasses /></AdminDashboardPrivet> },
            { path: "admin/manageUsers", element: <AdminDashboardPrivet><ManageUsers /></AdminDashboardPrivet> },
            { path: "instructor/addClass", element: <IntructorDashboardPrivet><AddClass /></IntructorDashboardPrivet> },
            { path: "instructor/myClasses", element: <IntructorDashboardPrivet><MyClass /></IntructorDashboardPrivet> }
        ]
    },
])