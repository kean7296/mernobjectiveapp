import {useEffect} from  'react'
import {useSelector, useDispatch} from 'react-redux'
import ObjectiveForm from '../components/ObjectiveForm'
import {getObjectives, reset} from '../features/objective/objectiveSlice'
import Spinner from '../components/Spinner'
import Objective from '../components/Objective'

function Dashboard() {
  const dispatch = useDispatch()
  const {user} = useSelector(state => state.auth)
  const {objectives, isLoading, isError, isSuccess, message} = useSelector(state => state.objectives)

  useEffect(() => {
    if (!user) {
      window.location.href = '/login'
    }

    if (isError) {
      console.log(message)
    }

    dispatch(getObjectives())

    return () => {
      dispatch(reset())
    }
  }, [user, isError, message, dispatch])

  if (isLoading) return <Spinner />

  return (
    <>
      <div className="heading">
        <h1>Hello {user && user.name}</h1>
        <p>Objectives</p>
      </div>

      <ObjectiveForm />

      <section className="content">
        {objectives.length ? objectives.map(objective => (<Objective key={objective._id} objective={objective} />)) : <h3>No Objective here</h3>}
      </section>
    </>
  )
}

export default Dashboard