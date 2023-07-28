import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useParams, Link } from "react-router-dom";


function SelectWeekForm() {

    const dispatch = useDispatch();
    const history = useHistory();

    const weeksDropdown = useSelector(store => store.weeksDropdown)
    const [weekSelected, setWeekSelected] = useState(0)

    const clientID = useParams();

    const path = `/singlePL/${clientID.client_id}/${weekSelected}`

    // console.log('clientID is:', clientID)

    function goToWeek(event) {
        event.preventDefault();
        console.log('weekSelected is:', weekSelected);
        // dispatch({ type: 'FETCH_WEEK', payload: weekSelected});
        // history.push('/one');
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
                <Link to={path}>Go To Week Details</Link>
            </form>
        </div>
    )
}
export default SelectWeekForm;