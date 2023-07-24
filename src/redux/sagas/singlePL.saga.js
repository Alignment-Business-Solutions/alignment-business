import axios from 'axios';
import { put, takeLatest, takeLeading } from 'redux-saga/effects';



function* fetchWeekData() {
    
    try {
        const results = yield axios.get('/api/single');
        yield put({type:"SET_WEEK_DATA", payload:results.data});
    }
    catch {
        console.log('error with fetching week data from  server');
    }
}





function* singlePLSaga() {
    yield takeLatest("FETCH_WEEK", fetchWeekData);



}

export default singlePLSaga;
