import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
import {useSelector, useDispatch} from 'react-redux'
import {logout, reset} from '../features/auth/authSlice'
import {useNavigate} from 'react-router-dom'

function PreMenu() {
    return <>
        <li>
            <a href="/register">
                <FaUser /> Register
            </a>
        </li>
        <li>
            <a href="/login">
                <FaSignInAlt /> Login 
            </a>
        </li>
    </>
}

function PostMenu() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const onLogout = (e) => {
        dispatch(logout())   
        dispatch(reset())
        navigate('/dashboard')
    }

    return <>
        <li>
            <a onClick={onLogout}>
                <FaSignOutAlt /> Logout
            </a>
        </li>
    </>
}

function Header() {
    const {user} = useSelector(state => state.auth)

    return (
    <div className='header'>
        <div className="logo">
            <a href="/">Dashboard</a>
        </div>
        <ul>
            {user ? <PostMenu /> : <PreMenu /> }
        </ul>
    </div>
    )
}

export default Header