import {
    createBrowserRouter,
} from "react-router-dom";
import App from "../App";
import Home from "../Pages/Client/Home/Home";
import Instructors from "../Pages/Client/Instructors/Instructors";
import Clasess from "../Pages/Client/Classes/Clasess";
import Authentication from "../Pages/Authentication/Authentication";
export const router = createBrowserRouter([
    {
        path: '/', element: <App />,
        children: [
            { path: "/", element: <Home /> },
            {
                path: "/instructors", element: <Instructors />,
                loader: () => fetch('http://localhost:5000/instructors')
            },
            {
                path: "/allClasses", element: <Clasess />,
                loader: () => fetch('http://localhost:5000/courses')
            },
            { path: "/authentication", element: <Authentication /> }
        ]
    }
])