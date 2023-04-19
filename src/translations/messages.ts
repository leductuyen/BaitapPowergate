type IMessages = {
    [key: string]: {
        [key: string]: string
    }
}

const messages: IMessages = {
    vn: {
        email: 'Địa chỉ Email',
        password: 'Mật khẩu',
        repeat_password: 'Nhập lại mật khẩu',
        name: 'Họ tên',
        gender: 'Giới tính',
        country: 'Quốc gia',
        city: 'Thành phố',
        register: 'Đăng kí',
        login: 'Đăng nhập',
    },
    en: {
        email: 'Address Email',
        password: 'Pasword',
        repeat_password: 'Repeat password',
        name: 'Name',
        gender: 'Gender',
        country: 'Country',
        city: 'City',
        register: 'Register',
        login: 'Login',
    },
}

export default messages
