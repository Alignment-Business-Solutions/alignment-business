import axios from 'axios';
import {put, takeLatest} from 'redux-saga/effects'

function* fetchRecentPL () {
    console.log('in fetchRecentPL saga!')
    try {
        const recentPL = yield axios.get ('/api/recentPL');
        console.log( 'data received from fetchRecentPL GET:', recentPL.data);
        yield put ({ type: 'SET_RECENT_PL', payload: recentPL.data});
    } catch (error) {
        console.log('Error in fetchRecent PL saga', error);
    }
}

function* fetchRecentSaga() {
    yield takeLatest ('FETCH_RECENT_PL', fetchRecentPL);
}

export default fetchRecentSaga;