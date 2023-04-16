export interface IValues_Login {
    email: string
    password: string
}

export interface IFormInput_Login {
    [key: string]: {
        attrs: {
            name: string
            label: string
            type: string
        }
    }
}

export const initialValues_Login: IValues_Login = {
    email: '',
    password: '',
}

export const formInput_Login: IFormInput_Login = {
    login_email: {
        attrs: {
            name: 'email',
            label: 'Email',
            type: 'email',
        },
    },
    login_password: {
        attrs: {
            name: 'password',
            label: 'Password',
            type: 'password',
        },
    },
}
