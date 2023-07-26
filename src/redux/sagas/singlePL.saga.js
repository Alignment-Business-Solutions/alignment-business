import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';



function* fetchWeekData(action) {
    const params = {week: action.payload.week, client: action.payload.client};
    try {        
        const resultCats = yield axios.get('/api/cat');
        yield put({type:"SET_CAT", payload: resultCats.data});
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

function* deleteItemData(action) {
    const idToDel = action.payload.data;
    const week = action.payload.week;
    const client = action.payload.client;
    try {
        yield axios.delete(`/api/single/${idToDel}`);
        yield put({type:"FETCH_WEEK", payload: {week, client}}); 
    }
    catch {
        console.log('error with deleting item data on server');
    }
}

function* postItemData(action) {
    const item = action.payload;
    try {
        yield axios.post(`/api/single`, item);
    }
    catch {
        console.log('error with deleting item data on server');
    }
}

function* handleImportData(action) {
    const importData = action.payload.data;
    const week_id = action.payload.week_id;
    const client_id = action.payload.client_id;
    const transformedData = [];
    
    for (let item of importData) {
        console.log(item); 
        if (item.SPENT !== "") { 
            transformedData.push({
                    amount: item.SPENT,
                    category_id: 2,
                    client_id: client_id,
                    date: item.DATE,
                    paid: true,
                    payee: item.Payee,
                    week_id: week_id
            });
        } else {
            transformedData.push({
                    amount: item.RECEIVED,
                    category_id: 1,
                    client_id: client_id,
                    date: item.DATE,
                    paid: true,
                    payee: item.Payee,
                    week_id: week_id
            });
        }
    }
    
    try {
        yield put({type:"SET_IMPORT_DATA", payload: transformedData}); 
    }
    catch {
        console.log('error with setting import data reducer');
    }
}




function* singlePLSaga() {
    yield takeLatest("FETCH_WEEK", fetchWeekData);
    yield takeLatest("UPDATE_ITEM", updateItemData);
    yield takeLatest("DELETE_ITEM", deleteItemData);
    yield takeLatest("POST_ITEM", postItemData);
    yield takeLatest("IMPORT_DATA", handleImportData);
}

export default singlePLSaga;
