module.exports = (body) => {
    const { login_email, login_password } = body
    const result =
        login_email === 'test@gmail.com' && login_password === '12345678'
    if (result) {
        return {
            status: 200,
            json: {
                status: true,
                result: {
                    login_info: {
                        login_email: 'admin',
                        branch_cd: 'branchCd',
                        customer_cd: 'customerCd',
                        permission_list: [100],
                    },
                    access_token: 'accessToken',
                    messages: 'Đăng nhập thành công',
                },
            },
        }
    }

    return {
        status: 500,
        json: {
            status: false,
            result: {
                messages: 'Đăng nhập thất bại',
            },
        },
    }
}
