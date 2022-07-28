import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {toast} from 'react-toastify'
import {register, reset} from '../features/auth/authSlice'
import {FaUser} from 'react-icons/fa'
import Spinner from '../components/Spinner'

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData
  
  const dispatch = useDispatch()

  const {user, isLoading, isError, isSuccess, message} = useSelector(state => state.auth)

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
  }, [user, isError, isSuccess,message, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if (password !== password2) {
      return toast.error(`Password didn't match`)
    }

    const user = {
      name,
      email,
      password,
    }
    
    dispatch(register(user))
  }

  if (isLoading) return <Spinner />

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Register
        </h1>
        <p>Create an account</p>
      </section>
      <section className="form">
        <form action="" onSubmit={onSubmit}>
          <div className="form-group">
            <input 
              type="text" 
              name="name" 
              value={name} 
              id="name" 
              className="form-control"
              placeholder="Enter your name" 
              onChange={onChange}
              required />
          </div>
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
            <input 
              type="password" 
              name="password2" 
              value={password2} 
              id="password2" 
              className="form-control"
              placeholder="Confirm password" 
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

export default Register