import axios from 'axios';
import {put, takeLatest} from 'redux-saga/effects'

function* fetchWeeksDropdown () {
    console.log('in fetchWeeksDropdown saga!')
    try {
        const weeks = yield axios.get ('/api/viewSummary/weeks');
        console.log( 'data received from fetchWeeksDropdown GET:', weeks.data);
        yield put ({ type: 'SET_WEEKS_DROPDOWN', payload: weeks.data});
    } catch (error) {
        console.log('Error in fetchWeeksDropdown saga', error);
    }
}

function* fetchWeeksDropdownSaga() {
    yield takeLatest ('FETCH_WEEKS_DROPDOWN', fetchWeeksDropdown);
}

export default fetchWeeksDropdownSaga;