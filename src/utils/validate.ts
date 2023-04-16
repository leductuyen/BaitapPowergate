import { Resolver } from 'react-hook-form'
import { IValues_Login } from '../pages/Login/Config'

export const validate: Resolver<IValues_Login> = async (values) => {
    const errors: Record<string, any> = {}
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
    if (Object.keys(errors).length > 0) {
        return { values, errors }
    } else {
        return { values, errors: {} }
    }
}
