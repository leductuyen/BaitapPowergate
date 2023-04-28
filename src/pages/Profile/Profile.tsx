import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import Upload from './UploadImage/Upload'
import './Profile.scss'

const Profile = () => {
    const { userLogin, logout } = useContext(AuthContext)

    //! State

    return (
        <div className="container">
            <Upload />

            <div className="email">
                <span className="title">Email : </span>
                <span className="content">{userLogin?.email}</span>
            </div>
            <div className="user">
                <span className="title">User Name :</span>
                <span className="content">{userLogin?.name}</span>
            </div>
            <div className="state">
                <span className="title">State :</span>
                <span className="content">{userLogin?.state}</span>
            </div>
            <div className="region">
                <span className="title">Region :</span>
                <span className="content">{userLogin?.region}</span>
            </div>
            <button onClick={logout}>Logout</button>
        </div>
    )
}

export default Profile
