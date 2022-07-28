import {useState} from 'react'
import {useDispatch} from 'react-redux'
import {createObjective} from '../features/objective/objectiveSlice'

function ObjectiveForm() {
    const [objective, setObjective] = useState('');
    const dispatch = useDispatch();

    const onSubmit = (e) => {
        e.preventDefault()

        dispatch(createObjective({text: objective}))
        setObjective('')
    }

    return (
        <section className="form">
            <form action="" onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="objective">Objective</label>
                    <input 
                        name='objective'
                        value={objective}
                        id="objective"
                        onChange={(e) => setObjective(e.target.value)}
                        type="text" 
                        placeholder='Enter your objective'/>
                </div>
                <div className="form-group">
                    <button className="btn btn-block" type='submit'>Submit</button>
                </div>
            </form>
        </section>
    )
}

export default ObjectiveForm