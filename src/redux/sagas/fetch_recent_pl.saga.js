import axios from 'axios';
import {put, takeLatest} from 'redux-saga/effects'

function* fetchRecentPL (action) {
    console.log('in fetchRecentPL saga!')
    console.log('action.payload is:', action.payload)
    const clientID = action.payload.client
    console.log('clientID is:', clientID);
    try {
        const recentPL = yield axios.get (`/api/viewSummary/?clientID=${clientID}`);
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