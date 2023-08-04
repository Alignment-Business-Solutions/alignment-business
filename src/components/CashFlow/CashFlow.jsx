import { LineChart } from '@mui/x-charts';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';


function CashFlow() {

    const dispatch = useDispatch();
    const params = useParams();
    console.log('params is:', params);

    useEffect(() => {
        
    }, [])

    return (
        <div>
            {/* <LineChart>

            </LineChart> */}
        </div>
    )
}

export default CashFlow;