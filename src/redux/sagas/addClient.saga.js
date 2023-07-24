import axios from 'axios'
import {put, takeLatest} from 'redux-saga/effects';


function* addClient(action) {
    try{
        console.log('PUT Add Client action.payload ===>', action.payload)
        yield axios.put('/api/client/add', action.payload)
        yield ({
            type: 'FETCH_MY_CLIENTS'
        })
    } catch(err) {
        console.log('Error with Add Client PUT saga', err)
    }
}

function* addClientSaga(){
    yield takeLatest('ADD_CLIENT', addClient)
}