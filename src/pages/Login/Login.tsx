import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import CustomButton from '../../components/CustomButton'
import Input from '../../components/CustomInput'
import ToastMsg from '../../components/ToastMsg'
import Api from '../../constants/Api'
import { Router } from '../../constants/Router'
import logo from '../../img/logo-420-x-108.png'
import sendRequest from '../../services/ApiService'
import { validate } from '../../utils/validateAuth'
import { IValues_Login, formInput_Login, initialValues_Login } from './Config'
import './Login.scss'
const Login = () => {
    //! navigate
    const navigate = useNavigate()

    //! State
    const [showToast, setShowToast] = useState<boolean>(false)
    const [formValues, setFormValues] =
        useState<IValues_Login>(initialValues_Login)

    const methods = useForm<IValues_Login>({
        defaultValues: formValues,
        resolver: validate,
    })

    //! Function
    const onSubmit = async (data: IValues_Login) => {
        setFormValues(data)
        setShowToast(true)

        try {
            const response = await sendRequest(Api.auth.login, {
                login_email: data.email,
                login_password: data.password,
            })

            if (response?.status === true) {
                const toastProps = {
                    message: response?.result?.messages,
                    type: 'success',
                }
                ToastMsg(toastProps)
            }
        } catch (error: any) {
            const toastProps = {
                message:
                    error.response?.data?.result?.messages || error.message,
                type: 'error',
            }
            ToastMsg(toastProps)
        }
        navigate(Router.home.home)
    }
    const navigateRegister = () => {
        navigate(Router.auth.signup)
    }

    //! Return
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
                        <CustomButton label="Đăng nhập" className="button" />
                    </div>
                </form>
            </FormProvider>
            <CustomButton
                label="Đăng kí"
                onClick={navigateRegister}
                className="btn-navigate-register"
            />
            {showToast && <ToastContainer />}
        </div>
    )
}

export default Login
