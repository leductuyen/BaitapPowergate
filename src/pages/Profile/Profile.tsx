import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
const Profile = () => {
    const { userLogin, logout } = useContext(AuthContext)

    return (
        <div>
            <div>Email</div>
            <div>{userLogin?.email}</div>
            <div>User Name</div>
            <div>{userLogin?.name}</div>
            <div>Descript</div>
            <div>State</div>
            <div>{userLogin?.state}</div>
            <div>Region</div>
            <div>{userLogin?.region}</div>
            <button onClick={logout}>Logout</button>
        </div>
    )
}

export default Profile
