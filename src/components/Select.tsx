import { Controller } from 'react-hook-form'
type Option = {
    name: string
    value?: string
    id: number
}

type SelectProps = {
    name: string
    options: Option[]
    control: any
    label: any
    defaultValue?: any
}

const Select = ({ name, options, control, label, ...rest }: SelectProps) => {
    return (
        <div>
            {label && (
                <label htmlFor={name} className="label">
                    {label}
                </label>
            )}
            <Controller
                name={name}
                control={control}
                render={({ field: { onChange, onBlur, value, ref } }) => (
                    <select
                        onChange={(e) => {
                            onChange(e.target.value)
                            onBlur()
                        }}
                        onBlur={onBlur}
                        value={value}
                        ref={ref}
                        {...rest}
                    >
                        {options.map(({ name, value, id }) => (
                            <option key={id} value={value}>
                                {name}
                            </option>
                        ))}
                    </select>
                )}
            />
        </div>
    )
}
export default Select
