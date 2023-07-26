import axios from 'axios'
import {put, takeLatest} from 'redux-saga/effects'

function* fetchBalance() {
    try {
        const balance = yield axios.get('/api/balance')
        console.log('This is GET results coming from the Balance Server', balance.data)
        yield put({
            type: 'SET_BALANCE',
            payload: balance.data
        })
    } catch(err) {
        console.log('Error with Balance SAGA ', err)
    }
}