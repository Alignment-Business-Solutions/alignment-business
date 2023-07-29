import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from "react-router-dom";


function SelectWeekForm() {

    // sourcing list of all weeks into this component
    const weeksDropdown = useSelector(store => store.weeksDropdown)
    // state variable created to store value of week selected in dropdown menu - value of each option is id of week being mapped
    const [weekSelected, setWeekSelected] = useState(0)

    // params for page is client_id
    const clientID = useParams();

    // variable set to url path of the Link element in return
    const path = `/singlePL/${clientID.client_id}/${weekSelected}`

    return (
        <div>
            {/* beginning form */}
            <form>
                {/* beginning dropdown menu element */}
                <select
                // value will set value of weekSelected state variable
                    value={weekSelected}
                    onChange={(event) => setWeekSelected(event.target.value)}
                >
                    {/* default setting for dropdown menu */}
                    <option value=""> -- Click to Select a week!</option>
                    {/* beginning map to loop through weeksDropdown varbiable */}
                    {weeksDropdown.map(week => (
                        // for each week, render this dropdown menu option
                        <option key={week.id} value={week.id}>{week.start_date}</option>
                    ))}
                </select>
                {/*linking to week details view for selected week in dropdown menu */}
                <Link to={path}>Go To Week Details</Link>
            </form>
        </div>
    )
}
export default SelectWeekForm;