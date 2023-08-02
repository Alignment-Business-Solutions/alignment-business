import axios from 'axios'
import {put, takeLatest} from 'redux-saga/effects'

function* fetchBalance(action) {
    try {
        const balance = yield axios.get(`/api/balance?client_id=${action.payload}`)
        console.log('This is GET results coming from the Balance Server', balance.data)
        yield put({
            type: 'SET_BALANCE',
            payload: balance.data
        })
    } catch(err) {
        console.log('Error with Balance SAGA ', err)
    }
}

function* balanceFetch(){
    yield takeLatest('FETCH_BALANCE', fetchBalance)
}

export default balanceFetch