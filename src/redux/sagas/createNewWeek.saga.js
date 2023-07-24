import axios from 'axios';
import {put, takeLatest} from 'redux-saga/effects'

function* submitNewWeek (action) {
    console.log('in submitNewWeek saga!')
    try {
        console.log('action.payload for submitNewWeek POST saga is:', action.payload);
        yield axios.post('/api/createNewWeek', action.payload);
    } catch (error) {
        console.log('Error in submitNewWeek saga', error);
    }
}

function* submitNewWeekSaga() {
    yield takeLatest ('SUBMIT_NEW_WEEK', submitNewWeek);
}

export default submitNewWeekSaga;