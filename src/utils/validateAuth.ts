import { Resolver } from 'react-hook-form'
import { IValues_Register } from '../pages/Register/Config'

type IValues = IValues_Register

export const validate: Resolver<IValues> = async (values) => {
    const errors: Record<string, any> = {}

    if (!values.name) {
        errors.name = {
            type: 'required',
            message: 'Name is required',
        }
    }

    if (!values.email) {
        errors.email = {
            type: 'required',
            message: 'Email is required',
        }
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = {
            type: 'pattern',
            message: 'Invalid email address',
        }
    }

    if (!values.password) {
        errors.password = {
            type: 'required',
            message: 'Password is required',
        }
    } else if (values.password.length < 8) {
        errors.password = {
            type: 'minLength',
            message: 'Password must be at least 8 characters',
        }
    }

    if (!values.repeat_password) {
        errors.repeat_password = {
            type: 'required',
            message: 'Repeat password is required',
        }
    } else if (values.repeat_password !== values.password) {
        errors.repeat_password = {
            type: 'validate',
            message: 'Passwords do not match',
        }
    }

    if (Object.keys(errors).length > 0) {
        return { values, errors }
    } else {
        return { values, errors: {} }
    }
}
