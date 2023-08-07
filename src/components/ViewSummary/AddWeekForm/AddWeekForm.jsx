import { useState } from "react";
import { useDispatch } from 'react-redux';
import { Button, TextField, OutlinedInput, InputLabel, Box } from "@mui/material";
import './AddWeekForm.css'




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
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            // sx={{ border: 1}}
        >
            {
                addClicker ?
                    <form onSubmit={(event) => submitNewWeek(event)}>
                        <InputLabel
                            htmlFor="new-week-input"
                        >
                            Starting Date
                        </InputLabel>
                        <OutlinedInput
                            placeholder="Example: 12/12/2023"
                            value={start_date}
                            onChange={(event) => setStartDate(event.target.value)}
                            required
                            id="new-week-input"
                        />
                        <br />
                        <Box sx={{ paddingLeft: 2}}>
                        <Button
                            variant="contained"
                            type="submit"
                        >
                            Submit New Week!
                        </Button>
                        </Box>
                        <Box sx={{ paddingLeft: 2.3}}>
                        <Button
                            
                            variant="contained"
                            color="success"
                            onClick={() => setAddClicker(false)}
                        >
                            Cancel Add Week
                        </Button>
                        </Box>
                    </form>
                    :
                    <Box>
                    <Button
                        variant="contained"
                        onClick={() => setAddClicker(true)}
                    >
                        Create New Week
                    </Button>
                    </Box>
            }
        </Box>
    )
}

export default AddWeekForm;