import { createContext, useEffect, useState } from 'react'

interface AuthContextType {
    userLogin: any
    setUserLogin: any
    accessToken: string | undefined
    setAccessToken: React.Dispatch<React.SetStateAction<string | undefined>>
    logout: any
}

export const AuthContext = createContext<AuthContextType>({
    userLogin: undefined,
    setUserLogin: () => {},
    accessToken: undefined,
    setAccessToken: () => {},
    logout: () => {},
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    //! State
    const [userLogin, setUserLogin] = useState<string | null>(() => {
        const savedUser = sessionStorage.getItem('user')
        return savedUser ? JSON.parse(savedUser) : null
    })
    const [accessToken, setAccessToken] = useState<string>()
    console.log('context', accessToken)
    //! Function

    const logout = () => {
        sessionStorage.removeItem('user')
        setAccessToken(undefined)
        setUserLogin(null)
        document.cookie =
            'access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    }

    //! context
    const value = {
        userLogin,
        setUserLogin,
        accessToken,
        setAccessToken,
        logout,
    }

    //! Lưu thông tin user vào sessionStorage
    useEffect(() => {
        sessionStorage.setItem('user', JSON.stringify(userLogin))
    }, [userLogin])

    useEffect(() => {
        if (accessToken) {
            const expires = new Date()
            expires.setDate(expires.getDate() + 1) // Thời gian sống của cookie là 1 ngày
            document.cookie = `access_token=${accessToken}; expires=${expires.toUTCString()}; path=/`
        }
    }, [accessToken])
    useEffect(() => {
        // lấy giá trị của cookie access_token
        const cookieToken = document.cookie.replace(
            /(?:(?:^|.*;\s*)access_token\s*=\s*([^;]*).*$)|^.*$/,
            '$1'
        )
        if (cookieToken) {
            // set giá trị của state accessToken từ cookie
            setAccessToken(cookieToken)
        }
    }, [])

    //! Return
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
