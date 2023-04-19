import { Route, Routes, Navigate } from 'react-router-dom'
import { Router } from './constants/Router'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Home from './pages/Home/Home'

const SwitchRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to={Router.auth.signup} />} />
            <Route path={Router.auth.signup} element={<Register />} />
            <Route path={Router.auth.login} element={<Login />} />
            <Route path={Router.home.home} element={<Home />} />
        </Routes>
    )
}

export default SwitchRoutes
