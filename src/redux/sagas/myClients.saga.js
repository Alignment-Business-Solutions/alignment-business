import axios from 'axios'
import {put, takeLatest} from 'redux-saga/effects'

function* fetchMyClients() {
    try {
        const myClients = yield axios.get('/api/client/myClients')
        console.log('This is GET results coming from the myClients request', myClients.data)
        yield put({
            type: 'SET_MY_CLIENTS',
            payload: myClients.data
        })
    } catch(err) {
        console.log('Error with MyCLients SAGA ', err)
    }
}


function* myClientsFetch(){
    yield takeLatest('FETCH_MY_CLIENTS', fetchMyClients)
}

export default myClientsFetch