import axios from 'axios'
import {put, takeLatest} from 'redux-saga/effects';



function* addBalance(action) {
    try{
        console.log('POST Add Balance action.payload ===>', action.payload)
        yield axios.put('/api/balance', action.payload)
        yield put({
            type: 'FETCH_BALANCE'
        })
    } catch(err) {
        console.log('Error with Add Balance POST saga', err)
    }
}