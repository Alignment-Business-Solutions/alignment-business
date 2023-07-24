import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';



function* fetchWeekData(action) {
    const params = {week: action.payload.week, client: action.payload.client};
    try {
        const results = yield axios.get(`/api/single`, {params});
        yield put({type:"SET_WEEK_DATA", payload:results.data});
    }
    catch {
        console.log('error with fetching week data from  server');
    }
}

function* updateItemData(action) {
    const data = action.payload.data;
    const week = action.payload.week;
    const client = action.payload.client;
    try {
        yield axios.put(`/api/single/${action.payload.data.id}`, {data});
        yield put({type:"FETCH_WEEK", payload: {week, client}}); 
    }
    catch {
        console.log('error with updating item data on server');
    }
}




function* singlePLSaga() {
    yield takeLatest("FETCH_WEEK", fetchWeekData);
    yield takeLatest("UPDATE_ITEM", updateItemData);


}

export default singlePLSaga;
