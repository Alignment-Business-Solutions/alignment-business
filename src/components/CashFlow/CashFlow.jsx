import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { Box } from "@mui/material"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label } from 'recharts';


function CashFlow({width, height}) {

    const dispatch = useDispatch();
    const params = useParams();
    console.log('params is:', params);
    const clientID = params.client_id
    const endBalances = useSelector(store => store.endBalance);
    console.log('Balances is:', endBalances);


    const parsedData = endBalances.map(item => ({
        ending_balance: parseFloat(item.ending_balance_actual.replace(/[^0-9.-]+/g, "")),
        start_date: new Date(item.start_date).toLocaleDateString(),
    }));



    useEffect(() => {
        dispatch({ type: "FETCH_END_BALANCES", payload: clientID });

    }, [])

    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
        >
            <LineChart color='#EB017F' width={width} height={height} data={parsedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="start_date">
                    {/* <Label value="Week Start Date" position="bottom"/> */}
                </XAxis>
                <YAxis label={{value: 'End Week Cash', angle: -90, position: 'insideLeft'}} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="ending_balance" stroke="#EB017F" dot={{ r: 10 }} />
            </LineChart>
        </Box>
    )
}

export default CashFlow;