import axios from 'axios'
import {put, takeLatest} from 'redux-saga/effects';


function* editBalance(action){
    try{
        console.log('PUT EDIT BALANCE action.payload ===>', action.payload)
        yield axios.put('/api/balance/edit', action.payload)
        yield put({
            type: 'FETCH_BALANCE'
        })
    } catch(err){
        console.log('ERROR with CLIENT SAVING SAGA')
    }
}

function* editBalanceSaga(){
    yield takeLatest('EDIT_BALANCE', editBalance)
}

export default editBalanceSaga