import axios from 'axios';
import {put, takeLatest} from 'redux-saga/effects';

function* deleteBalanceItem(action){
    try{

        yield axios.delete(`/api/balance/${action.payload}`)
        yield put({
            type: 'FETCH_BALANCE'
        });
    } catch(err) {
        console.log('DELETE ERROR ===>', err)
    }
}

function* deleteBalanceSaga(){
    yield takeLatest('DELETE_BALANCE', deleteBalanceItem)
}

export default deleteBalanceSaga