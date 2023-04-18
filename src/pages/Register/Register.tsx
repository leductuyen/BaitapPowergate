import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { IntlProvider } from 'react-intl'
import CustomButton from '../../components/CustomButton'
import CustomInput from '../../components/CustomInput'
import Api from '../../constants/Api'
import logo from '../../img/logo-420-x-108.png'
import sendRequest from '../../services/ApiService'
import { validate } from '../../utils/validateAuth'
import {
    ICityOptions,
    ICountryOptions,
    IValues_Register,
    formInput_Register,
    initialValues_Register,
} from './Config'
import './Register.scss'

import CustomSelect from '../../components/CustomSelect'

import { ToastContainer } from 'react-toastify'
import ToastMsg from '../../components/ToastMsg'
import { getDataGender } from '../../services/mockApi'
import messages from '../../translations/messages'

const Register = () => {
    //! State
    const [showToast, setShowToast] = useState<boolean>(false)
    const [locale, setLocale] = useState('vn')

    const [countryOptions, setCountryOptions] = useState<ICountryOptions[]>([])

    const [cityOptions, setCityOptions] = useState<ICityOptions[]>([])

    const [formValues, setFormValues] = useState<IValues_Register>({
        ...initialValues_Register,
    })

    //! methods
    const methods = useForm<IValues_Register>({
        defaultValues: formValues,
        resolver: validate,
    })

    //! Function
    const handleLocaleChange = () => {
        setLocale(locale === 'en' ? 'vn' : 'en')
    }
    const getDataCountryOptions = async () => {
        try {
            const result = await sendRequest(Api.location)
            setCountryOptions(result?.data)
        } catch (error) {
            console.log(error)
        }
    }
    const getDataCityOptions = async (selectedCountry: any) => {
        try {
            const resulut = await sendRequest(
                Api.location,
                {},
                {},
                { pid: selectedCountry }
            )
            setCityOptions(resulut?.data)
        } catch (error) {
            console.log(error)
        }
    }
    const handleCountryChange = (value: number) => {
        getDataCityOptions(value)
    }

    const onSubmit = async (data: any) => {
        setShowToast(true)
        setFormValues(data)
        try {
            const response = await sendRequest(Api.auth.register, {
                email: formValues.email,
                password: formValues.password,
                name: formValues.name,
                repeat_password: formValues.repeat_password,
            })
            if (response.error === true) {
                const toastProps = {
                    message: response?.messages,
                    type: 'success',
                }
                ToastMsg(toastProps)
            }
            console.log(response)
        } catch (error: any) {
            const toastProps = {
                message:
                    error.response?.data?.result?.messages || error.message,
                type: 'error',
            }
            ToastMsg(toastProps)
        }
    }

    //! Effect
    useEffect(() => {
        getDataCountryOptions()
    }, [])

    //! Return
    return (
        <IntlProvider locale={locale} messages={messages[locale]}>
            <div className="container">
                <div className="register">
                    <img src={logo} alt="" />

                    <FormProvider {...methods}>
                        <form onSubmit={methods.handleSubmit(onSubmit)}>
                            <div className="form">
                                <CustomInput
                                    name={
                                        formInput_Register.login_email.attrs
                                            .name
                                    }
                                    label={messages[locale].email}
                                    type={
                                        formInput_Register.login_email.attrs
                                            .type
                                    }
                                />
                            </div>
                            <div className="form">
                                <CustomInput
                                    name={
                                        formInput_Register.login_password.attrs
                                            .name
                                    }
                                    label={messages[locale].password}
                                    type={
                                        formInput_Register.login_password.attrs
                                            .type
                                    }
                                />
                            </div>
                            <div className="form">
                                <CustomInput
                                    name={
                                        formInput_Register.repeat_password.attrs
                                            .name
                                    }
                                    label={messages[locale].repeat_password}
                                    type={
                                        formInput_Register.repeat_password.attrs
                                            .type
                                    }
                                />
                            </div>
                            <div className="form">
                                <CustomInput
                                    name={formInput_Register.name.attrs.name}
                                    label={messages[locale].name}
                                    type={formInput_Register.name.attrs.type}
                                />
                            </div>
                            <div className="form">
                                <CustomSelect
                                    label={messages[locale].gender}
                                    options={getDataGender}
                                    onChange={() => {}}
                                />
                            </div>
                            <div className="form">
                                <CustomSelect
                                    label={messages[locale].country}
                                    options={countryOptions}
                                    onChange={handleCountryChange}
                                />
                            </div>
                            <div className="form">
                                <CustomSelect
                                    label={messages[locale].city}
                                    options={cityOptions}
                                    onChange={() => {}}
                                />
                            </div>

                            <div className="layout-btn-register">
                                <CustomButton
                                    label={messages[locale].register}
                                    className="button"
                                />
                            </div>
                        </form>
                    </FormProvider>
                    {showToast && <ToastContainer />}
                </div>
                <div className="layout-btn-translations">
                    <CustomButton
                        onClick={handleLocaleChange}
                        className="button"
                        label={locale}
                    />
                </div>
            </div>
        </IntlProvider>
    )
}

export default Register
