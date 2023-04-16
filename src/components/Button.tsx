interface Props {
    type?: any
    variant?: any
    className?: any
    size?: any
    disabled?: boolean
    hidden?: boolean
    label: string
    onClick?: any
}
const Button = ({ label, ...prop }: Props) => {
    return <button {...prop}>{label}</button>
}

export default Button
