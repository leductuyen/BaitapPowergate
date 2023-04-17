import { useEffect, useState } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { IntlProvider, FormattedMessage } from 'react-intl'

import Select from '../../components/Select'
import Api from '../../constants/Api'
import sendRequest from '../../services/ApiService'
import logo from '../../img/logo-420-x-108.png'
import Input from '../../components/Input'
import {
    IValues_Register,
    formInput_Register,
    initialValues_Register,
} from './Config'
import Button from '../../components/Button'
import './Register.scss'
import { validate } from '../../utils/validateAuth'
import { translations } from '../../translations/translations'
import CustomFormattedMessage from '../../components/CustomFormattedMessage'

const Register = () => {
    //! Fake Data
    const getDataGender = [
        { id: 1, name: 'Nam' },
        { id: 2, name: 'Nữ' },
    ]

    //! State
    const [locale, setLocale] = useState('en')
    const [selectOptions, setSelectOptions] = useState([])

    const [formValues, setFormValues] = useState<IValues_Register>({
        ...initialValues_Register,
        gender: 'Nam',
        country: '',
    })

    console.log(formValues)
    //! methods
    const methods = useForm<IValues_Register>({
        defaultValues: formValues,
        // resolver: validate,
    })

    //! Function
    const handleLocaleChange = () => {
        setLocale(locale === 'en' ? 'vn' : 'en')
    }
    const getDataOptions = async () => {
        try {
            const result = await sendRequest(Api.location)
            setSelectOptions(result?.data)
        } catch (error) {
            console.log(error)
        }
    }

    const onSubmit = (data: any) => {
        setFormValues(data)
    }

    //! Effect
    useEffect(() => {
        getDataOptions()
    }, [])

    //! Return
    return (
        <IntlProvider locale={locale} messages={translations[locale]}>
            <div className="register">
                <img src={logo} alt="" />

                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)}>
                        <div className="form">
                            <Input
                                name={formInput_Register.login_email.attrs.name}
                                label={
                                    formInput_Register.login_email.attrs.label
                                }
                                type={formInput_Register.login_email.attrs.type}
                            />
                        </div>
                        <div className="form">
                            <Input
                                name={
                                    formInput_Register.login_password.attrs.name
                                }
                                label={
                                    formInput_Register.login_password.attrs
                                        .label
                                }
                                type={
                                    formInput_Register.login_password.attrs.type
                                }
                            />
                        </div>
                        <div className="form">
                            <Input
                                name={
                                    formInput_Register.repeat_password.attrs
                                        .name
                                }
                                label={
                                    formInput_Register.repeat_password.attrs
                                        .label
                                }
                                type={
                                    formInput_Register.repeat_password.attrs
                                        .type
                                }
                            />
                        </div>
                        <div className="form">
                            <Input
                                name={formInput_Register.name.attrs.name}
                                label={
                                    <CustomFormattedMessage
                                        id={translations[locale].email.id}
                                        defaultMessage={
                                            translations[locale].email
                                                .defaultMessage
                                        }
                                    />
                                }
                                type={formInput_Register.name.attrs.type}
                            />
                        </div>
                        <Select
                            label="Giới tính"
                            name="gender"
                            options={getDataGender}
                            control={methods.control}
                        />
                        <Select
                            label="Quốc gia"
                            name="country"
                            options={selectOptions}
                            control={methods.control}
                        />
                        <div className="layutBtn">
                            <Button label="Đăng nhập" className="button" />
                            <div>
                                <button onClick={handleLocaleChange}>
                                    {locale}
                                </button>
                            </div>
                        </div>
                    </form>
                </FormProvider>
            </div>
        </IntlProvider>
    )
}

export default Register
