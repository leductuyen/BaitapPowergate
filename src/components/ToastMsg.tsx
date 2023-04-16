import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
interface Props {
    message: string
    type: string
}

const ToastMsg = ({ message, type }: Props) => {
    const toastProps = {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
    }

    switch (type) {
        case 'success':
            toast.success(message, toastProps)
            break
        case 'error':
            toast.error(message, toastProps)
            break
        default:
            break
    }

    return <ToastContainer />
}

export default ToastMsg
