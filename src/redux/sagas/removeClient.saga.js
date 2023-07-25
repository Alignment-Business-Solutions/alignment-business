import axios from 'axios'
import {put, takeLatest} from 'redux-saga/effects';


function* removeClient(action) {
    try{
        console.log('PUT REMOVE Client action.payload ===>', action.payload)
        yield axios.put('/api/client/remove', action.payload)
        yield ({
            type: 'FETCH_MY_CLIENTS'
        })
    } catch(err) {
        console.log('Error with REMOVE Client PUT saga', err)
    }
}

function* removeClientSaga(){
    yield takeLatest('REMOVE_CLIENT', removeClient)
}

export default removeClientSaga