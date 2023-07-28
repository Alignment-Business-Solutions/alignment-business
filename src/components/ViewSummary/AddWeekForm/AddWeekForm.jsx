import { useState } from "react";
import { useDispatch } from 'react-redux';
import { Button, TextField, OutlinedInput } from "@mui/material";



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
                        <OutlinedInput
                            placeholder="Example: 12/12/2023"
                            value={start_date}
                            onChange={(event) => setStartDate(event.target.value)}
                            required
                        />
                        <Button variant="contained" type="submit">Submit New Week!</Button>
                        <button onClick={() => setAddClicker(false)}>Cancel Add Week</button>
                    </form>
                    :
                    <Button variant="contained" onClick={() => setAddClicker(true)}>Create New Week</Button>
            }
        </div>
    )
}

export default AddWeekForm;