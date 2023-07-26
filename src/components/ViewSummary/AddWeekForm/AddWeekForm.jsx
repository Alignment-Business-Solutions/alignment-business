import { useState } from "react";
import { useDispatch } from 'react-redux';


function AddWeekForm() {

    const dispatch = useDispatch();
    const [addClicker, setAddClicker] = useState(false);
    const [start_date, setStartDate] = useState('')

    function submitNewWeek(event) {
        event.preventDefault();
        let newWeek = {
            start_date
        };
        console.log('newWeek being submitted is:', newWeek);
        dispatch({ type: 'SUBMIT_NEW_WEEK', payload: newWeek });
        setAddClicker(false);
    }

    return (
        <div>
            {
                addClicker ?
                    <form onSubmit={(event) => submitNewWeek(event)}>
                        <label>Starting Date</label>
                        <input
                            placeholder="Example: 12/12/2023"
                            value={start_date}
                            onChange={(event) => setStartDate(event.target.value)}
                            required
                        />
                        <button type="submit">Submit New Week!</button>
                        <button onClick={() => setAddClicker(false)}>Cancel Add Week</button>
                    </form>
                    :
                    <button onClick={() => setAddClicker(true)}>Create New Week</button>
            }
        </div>
    )
}

export default AddWeekForm;