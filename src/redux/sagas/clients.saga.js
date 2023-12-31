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
        console.log('Error with CLients SAGA ', err)
    }
}

function * fetchClientInfo () {
    try {
        console.log('in fetchClientInfo saga');
        const clientInfo = yield axios.get('/api/client/info')
        yield put({ type: 'SET_CLIENT_INFO', payload: clientInfo.data[0]})
    } catch (error) {
        console.log('error in fetchClientInfo saga:', error);
    }
}

function* fetchSelectedClient (action) {
    console.log(action.payload);
    try {
        const clientInfo = yield axios.get(`/api/client/selected/${action.payload.client_id}`)
        console.log(clientInfo);
        yield put({ type: 'SET_SELECTED_CLIENT', payload: clientInfo.data[0]})

    } catch (error) {
        console.log('error in fetchSelectedClient saga:', error);
    }


}


function* clientsFetch(){
    yield takeLatest('FETCH_ALL_CLIENTS', fetchAllClients)
    yield takeLatest('FETCH_CLIENT_INFO', fetchClientInfo)
    yield takeLatest('FETCH_SELECTED_CLIENT', fetchSelectedClient)
}

export default clientsFetch
