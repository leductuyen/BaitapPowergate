import { FormattedMessage } from 'react-intl'
interface Props {
    id: string
    defaultMessage: string
    values?: any
}
const CustomFormattedMessage = ({ id, defaultMessage, values }: Props) => {
    return (
        <FormattedMessage
            id={id}
            defaultMessage={defaultMessage}
            values={values}
        />
    )
}

export default CustomFormattedMessage
