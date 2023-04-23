/* eslint-disable @typescript-eslint/no-explicit-any */
export type IOption = {
    key: string
    name: string
}
export type ISelectProps = {
    id?: string
    value?: string
    name?: string
    onChange?: any
    onBlur?: any
    className?: string | any
    selects: IOption[]
    defaultValue?: IOption
    errMessageList?: string[]
    disabled?: boolean
}

const Select = (props: ISelectProps) => {
    const { selects, defaultValue, ...select } = props
    return (
        <select {...select}>
            {!!defaultValue && (
                <option value={defaultValue.key}>{defaultValue.name}</option>
            )}
            {!!selects &&
                selects.map((item, key) => (
                    <option value={item.key} key={key}>
                        {item.name}
                    </option>
                ))}
        </select>
    )
}

export default Select
