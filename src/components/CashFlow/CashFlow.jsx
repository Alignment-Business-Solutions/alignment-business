import { LineChart } from '@mui/x-charts';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { Box } from "@mui/material"


function CashFlow() {

    const dispatch = useDispatch();
    const params = useParams();
    console.log('params is:', params);
    const clientID = params.client_id
    const endBalances = useSelector(store => store.endBalances);


    useEffect(() => {
        dispatch({ type: "FETCH_END_BALANCES", payload: clientID });

    }, [])

    return (
        <div>
            {/* <Box sx={{ width: '100%', maxWidth: 500 }}>
                <LineChart
                    xAxis={[{ data: endBalances }]}
                    yAxis={[
                        { id: 'linearAxis', scaleType: 'linear' },
                    ]}
                    series={[
                        { yAxisKey: 'linearAxis', label: 'linear' },
                    ]}
                    leftAxis="linearAxis"
                    height={400}
                />
            </Box> */}

        </div>
    )
}

export default CashFlow;