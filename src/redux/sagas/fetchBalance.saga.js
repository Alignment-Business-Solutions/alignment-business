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

function* fetchRecentBalance(action) {
    console.log('in fetchRecentBalance saga!')
    console.log('action.payload is:', action.payload)
    const clientID = action.payload.client
    console.log('clientID is:', clientID);
    try {
        const recentBalance = yield axios.get (`/api/balance/recent/?clientID=${clientID}`);
        console.log( 'data received from fetchRecentBalance GET:', recentBalance.data);
        yield put ({ type: 'SET_RECENT_BALANCE', payload: recentBalance.data});
    } catch (error) {
        console.log('Error with RecentBalance SAGA', error)
    }
}

function* fetchEndBalance(action) {
    console.log('in endBalance saga!')
    console.log('action.payload is:', action.payload)
    const clientID = action.payload.client
    try {
        const endBalances = yield axios.get (`/api/balance/end/?clientID=${action.payload}`);
        console.log('data received from fetchEndBalance get:', endBalances.data);
        yield put({ type: 'SET_END_BALANCE', payload: endBalances.data})
    } catch (error) {
        console.log('Error in fetchEndBalance Saga:', error);

    }
}

function* balanceFetch(){
    yield takeLatest('FETCH_BALANCE', fetchBalance)
    yield takeLatest('FETCH_RECENT_BALANCE', fetchRecentBalance)
    yield takeLatest('FETCH_END_BALANCES', fetchEndBalance)
}

export default balanceFetch