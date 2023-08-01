import axios from 'axios';
import {put, takeLatest} from 'redux-saga/effects';

function* deleteBalanceItem(action){
    try{
        const id = action.payload.id
        console.log('what is the payload.', action.payload.id)
        yield axios.delete(`/api/balance/${id}`)
        yield put({
            type: 'FETCH_BALANCE',
            payload: action.payload.client_id
        });
    } catch(err) {
        console.log('DELETE ERROR ===>', err)
    }
}

function* deleteBalanceSaga(){
    yield takeLatest('DELETE_BALANCE', deleteBalanceItem)
}

export default deleteBalanceSaga