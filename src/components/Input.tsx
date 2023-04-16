import { ErrorMessage } from '@hookform/error-message'
import { FC } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import './scss/Input.scss'
type Props = {
    name: string
    label?: string
    type?: string
    required?: string
    min?: number
    max?: number
    pattern?: RegExp
}

const Input: FC<Props> = ({
    name,
    label,
    type,
    required,
    min,
    max,
    pattern,
    ...rest
}) => {
    const {
        control,
        formState: { errors },
    } = useFormContext()

    return (
        <div>
            {label && (
                <label htmlFor={name} className="label">
                    {label}
                </label>
            )}
            <Controller
                control={control}
                name={name}
                rules={{ required, min, max, pattern }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <div>
                        <input
                            type={type}
                            onChange={(e) => {
                                onChange(e.target.value)
                                onBlur()
                            }}
                            onBlur={onBlur}
                            value={value}
                            {...rest}
                        />
                    </div>
                )}
            />
            <ErrorMessage
                errors={errors}
                name={name}
                render={({ message }) => <p className="errors">{message}</p>}
            />
        </div>
    )
}

export default Input
