import axios from 'axios'
import {put, takeLatest} from 'redux-saga/effects';



function* addBalance(action) {
    try{
        console.log('POST Add Balance action.payload ===>', action.payload.balance)
        yield axios.post('/api/balance/', action.payload.balance)
        yield put({
            type: 'FETCH_BALANCE'
        })
    } catch(err) {
        console.log('Error with Add Balance POST saga', err)
    }
}

function* addBalanceSaga(){
    yield takeLatest('ADD_BALANCE', addBalance)
}

export default addBalanceSaga