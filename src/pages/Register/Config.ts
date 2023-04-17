export interface IValues_Register {
    email: string
    password: string
    repeat_password?: string
    name?: string
    gender?: string
    country?: any
}

export interface IFormInput_Register {
    [key: string]: {
        attrs: {
            name: string
            label: string
            type: string
        }
    }
}

export const initialValues_Register: IValues_Register = {
    email: '',
    password: '',
    repeat_password: '',
    name: '',
}

export const formInput_Register: IFormInput_Register = {
    login_email: {
        attrs: {
            name: 'email',
            label: 'Địa chỉ Email',
            type: 'email',
        },
    },
    login_password: {
        attrs: {
            name: 'password',
            label: 'Mật khẩu',
            type: 'password',
        },
    },
    repeat_password: {
        attrs: {
            name: 'repeat_password',
            label: 'Nhập lại Mật khẩu',
            type: 'password',
        },
    },
    name: {
        attrs: {
            name: 'name',
            label: 'Họ và tên',
            type: 'text',
        },
    },
}
