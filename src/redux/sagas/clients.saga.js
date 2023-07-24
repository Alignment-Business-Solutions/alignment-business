import axios from 'axios'
import {put, takeLatest} from 'redux-saga/effects'

function* fetchAllClients() {
    try {
        const clients = yield axios.get('/api/client')
        console.log('This is GET results coming from the client Server', clients.data)
        yield put({
            type: 'SET_ALL_CLIENTS',
            payload: clients.data
        })
    } catch(err) {
        console.log('Error with MyCLients SAGA ', err)
    }
}

function* clientsFetch(){
    yield takeLatest('FETCH_ALL_CLIENTS', fetchAllClients)
}

export default clientsFetch