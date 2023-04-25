import { useContext } from 'react'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import { AuthContext } from './context/AuthContext'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Profile from './pages/Profile/Profile'
import SignUp from './pages/SignUp/SignUp'

const ProtectedRoute = ({ children }: any) => {
    const { accessToken } = useContext(AuthContext)

    if (!accessToken) {
        return <Navigate to="/login" />
    }
    return children
}

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <ProtectedRoute>
                <Home />
            </ProtectedRoute>
        ),
    },
    {
        path: '/profile',
        element: <Profile />,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/signup',
        element: <SignUp />,
    },
])

export const SwitchRoutes = () => {
    return <RouterProvider router={router} />
}
