import { FormattedMessage } from 'react-intl'
interface ITranslations {
    [key: string]: {
        [key: string]:
            | any
            | {
                  id: string
                  defaultMessage: string
              }
    }
}

export const translations: ITranslations = {
    en: {
        email: {
            id: 'email',
            defaultMessage: 'Address Email',
        },
    },
    vn: {
        email: {
            id: 'email',
            defaultMessage: 'Địa chỉ Email',
        },
    },
}
