import { createContext, useState } from 'react'
import { IntlProvider } from 'react-intl'
import messages from '../translations/messages'
type TranslationsContextType = {
    handleLocaleChange: () => void
    locale: string
}
export const TranslationsContext = createContext<TranslationsContextType>({
    handleLocaleChange: () => {},
    locale: 'vn',
})

export const TranslationsProvider = ({ children }: any) => {
    const [locale, setLocale] = useState<string>('vn')
    const handleLocaleChange = () => {
        setLocale(locale === 'en' ? 'vn' : 'en')
    }
    const value = { handleLocaleChange, locale }

    return (
        <IntlProvider locale={locale} messages={messages[locale]}>
            <TranslationsContext.Provider value={value}>
                {children}
            </TranslationsContext.Provider>
        </IntlProvider>
    )
}
