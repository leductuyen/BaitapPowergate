import React, { useEffect, useState } from 'react'

type Option = {
    id: number
    name: string
}

type SelectProps = {
    label: string
    options: Option[]
    onChange: (value: number) => void
}

const CustomSelect: React.FC<SelectProps> = ({
    label,
    options,
    onChange,
    ...rest
}) => {
    const [selectedOption, setSelectedOption] = useState<number | ''>('')

    useEffect(() => {
        if (options.length > 0) {
            setSelectedOption(options[0].id)
            onChange(options[0].id)
        }
    }, [options])

    const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = parseInt(e.target.value, 10)
        setSelectedOption(value)
        onChange(value)
    }

    return (
        <>
            <label className="label">{label}</label>
            <select
                value={selectedOption}
                onChange={handleOptionChange}
                {...rest}
            >
                {options.map((option) => (
                    <option key={option.id} value={option.id}>
                        {option.name}
                    </option>
                ))}
            </select>
        </>
    )
}

export default CustomSelect
