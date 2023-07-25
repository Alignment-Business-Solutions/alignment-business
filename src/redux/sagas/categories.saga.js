import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchCat() {

    try {
        const results = yield axios.get('/api/cat');
        yield put({type:"SET_CAT", payload: results.data});
    }
    catch {
        console.log('error with fetching categories from the server');
    }
}


function* categoriesSaga() {
    yield takeLatest("FETCH_CAT", fetchCat);
}

export default categoriesSaga;
