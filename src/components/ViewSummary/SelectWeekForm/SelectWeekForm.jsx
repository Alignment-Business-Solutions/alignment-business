import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';


function SelectWeekForm() {

    const dispatch = useDispatch();
    const history = useHistory();

    const weeksDropdown = useSelector(store => store.weeksDropdown)
    const [weekSelected, setWeekSelected] = useState(0)

    function goToWeek(event) {
        event.preventDefault();
        console.log('weekSelected is:', weekSelected);
        dispatch({ type: 'FETCH_WEEK', payload: weekSelected});
        history.push('/one');
    }

    return (
        <div>
            <form onSubmit={(event) => goToWeek(event)}>
                <select
                    value={weekSelected}
                    onChange={(event) => setWeekSelected(event.target.value)}
                >
                    <option value=""> -- Click to Select a week!</option>
                    {weeksDropdown.map(week => (
                        <option key={week.id} value={week.id}>{week.start_date}</option>
                    ))}
                </select>
                <button type="submit">Go To Week Details</button>
            </form>
        </div>
    )
}
export default SelectWeekForm;