import {useDispatch} from 'react-redux'
import {deleteObjective} from '../features/objective/objectiveSlice'

function Objective({objective}) {
  const dispatch = useDispatch()

  return <div className="objective">
      <div>
          <h2>{objective.text}</h2>          
          {new Date(objective.createdAt).toLocaleString('en-US')}
          <button onClick={() => dispatch(deleteObjective(objective._id))} className="close">X</button>
      </div>
  </div>
}

export default Objective