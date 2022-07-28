import {useState, useEffect} from 'react'
import {FaSignInAlt} from 'react-icons/fa'
import {useSelector, useDispatch} from 'react-redux'
import {login, reset} from '../features/auth/authSlice'
import {toast} from 'react-toastify'
import Spinner from '../components/Spinner'

function Login() {
  const dispatch = useDispatch()
  const {user, isError, isSuccess, isLoading, message} = useSelector(state => state.auth)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user) {
      window.location.href = '/dashboard'
    }

    return () => {
      dispatch(reset())
    }
  }, [user, isError, isSuccess, message, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    const user = {
      email,
      password,
    }

    dispatch(login(user))
  }

  if (isLoading) return <Spinner />

  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Login to create objectives</p>
      </section>
      <section className="form">
        <form action="" onSubmit={onSubmit}>
          <div className="form-group">
            <input 
              type="email" 
              name="email" 
              value={email} 
              id="email" 
              className="form-control"
              placeholder="Enter your email" 
              onChange={onChange}
              required />
          </div>
          <div className="form-group">
            <input 
              type="password" 
              name="password" 
              value={password} 
              id="password" 
              className="form-control"
              placeholder="Enter your password" 
              onChange={onChange}
              required />
          </div>
          <div className="form-group">
            <button className='btn btn-block' type="submit">Submit</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Login