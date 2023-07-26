import axios from 'axios';
import {put, takeLatest} from 'redux-saga/effects'

function* fetchAllWeeks () {
    console.log('in fetchAllWeeks saga!')
    try {
        const allWeeks = yield axios.get ('/api/allPL');
        console.log( 'data received from fetchAllWeeks GET:', allWeeks.data);
        yield put ({ type: 'SET_ALL_WEEKS', payload: allWeeks.data});
    } catch (error) {
        console.log('Error in fetchAllWeeks saga', error);
    }
}

function* fetchAllWeeksSaga() {
    yield takeLatest ('FETCH_ALL_WEEKS', fetchAllWeeks);
}

export default fetchAllWeeksSaga;