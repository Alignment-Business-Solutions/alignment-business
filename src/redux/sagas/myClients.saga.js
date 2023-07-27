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

function* fetchClientID(action) {
    try {
        // yield put({ type: 'CLEAR_LOGIN_ERROR' });

        const config = {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        };
    
        // send the action.payload as the body
        // the config includes credentials which
        // allow the server session to recognize the user
        yield axios.post('/api/client/singleclient', action.payload, config);
    
        // after the user has logged in
        // get the user information from the server
        yield put({ type: 'FETCH_CLIENT' });
      } catch (error) {
        console.log('Error with client get:', error);      
      }
}

function* myClientsFetch(){
    yield takeLatest('FETCH_MY_CLIENTS', fetchMyClients)
    yield takeLatest('GET_CLIENT_ID', fetchClientID)
}

export default myClientsFetch