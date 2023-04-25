import { useContext, useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Button from '../../components/Button'
import Input from '../../components/Input'
import ToastMsg from '../../components/ToastMsg'
import Api from '../../constants/Api'
import logo from '../../img/logo-420-x-108.png'
import sendRequest from '../../services/ApiService'
import { validate } from '../../utils/validate'
import { IValues_Login, formInput_Login, initialValues_Login } from './Config'
import { useNavigate } from 'react-router-dom'

import './Login.scss'

import { AuthContext } from '../../context/AuthContext'
const Login = () => {
    const navigate = useNavigate()

    const { setAccessToken, setUserLogin } = useContext(AuthContext)

    const [showToast, setShowToast] = useState<boolean>(false)
    const [formValues, setFormValues] =
        useState<IValues_Login>(initialValues_Login)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const methods = useForm<IValues_Login>({
        defaultValues: formValues,
        resolver: validate,
    })

    const onSubmit = async (data: IValues_Login) => {
        setFormValues(data)
        setShowToast(true)

        try {
            const response = await sendRequest(Api.auth.login, {
                email: data.email,
                password: data.password,
            })

            setUserLogin(response.data)
            setAccessToken(response.data.token)
            // // set giá trị của cookie access_token
            // const expires = new Date()
            // expires.setDate(expires.getDate() + 1) // set cookie tồn tại trong 1 ngày
            // document.cookie = `access_token=${
            //     response.data.token
            // }; expires=${expires.toUTCString()}; path=/`
            setIsLoggedIn(true)
        } catch (error: any) {
            const toastProps = {
                message:
                    error.response?.data?.result?.messages || error.message,
                type: 'error',
            }
            ToastMsg(toastProps)
        }
    }
    useEffect(() => {
        if (isLoggedIn) {
            navigate('/')
        }
    }, [isLoggedIn, navigate])
    return (
        <div className="login">
            <img src={logo} alt="" />
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <div className="form">
                        <Input
                            name={formInput_Login.login_email.attrs.name}
                            label={formInput_Login.login_email.attrs.label}
                            type={formInput_Login.login_email.attrs.type}
                        />
                    </div>
                    <div className="form">
                        <Input
                            name={formInput_Login.login_password.attrs.name}
                            label={formInput_Login.login_password.attrs.label}
                            type={formInput_Login.login_password.attrs.type}
                        />
                    </div>
                    <div className="layutBtn">
                        <Button label="Đăng nhập" className="button" />
                    </div>
                </form>
            </FormProvider>
            {showToast && <ToastContainer />}
        </div>
    )
}

export default Login
