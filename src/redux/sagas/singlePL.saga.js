import axios from 'axios';
import { put, takeEvery, takeLatest } from 'redux-saga/effects';



function* fetchWeekData(action) {
    const params = {week: action.payload.week, client: action.payload.client};
    console.log( 'action.payload is:', action.payload);
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

function* addToAllPL(action) {
    const params = {week: action.payload.week, client: action.payload.client};
    console.log( 'action.payload is:', action.payload);
    try {        
        const resultCats = yield axios.get('/api/cat');
        yield put({type:"SET_CAT", payload: resultCats.data});
        const results = yield axios.get(`/api/single`, {params});
        yield put({type:"SET_ALLPL", payload: results.data}); 
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

function* handleImportQBData(action) {
    const importData = action.payload.data;
    const week_id = action.payload.week_id;
    const client_id = action.payload.client_id;
    const transformedData = [];
    
    for (let item of importData) {
        const date = new Date(item.DATE);
        const newDate = date.toISOString();
        if (item.SPENT !== "") { 
            transformedData.push({
                    amount: item.SPENT,
                    category_id: 2,
                    client_id: client_id,
                    date: newDate,
                    paid: true,
                    payee: item.Payee,
                    week_id: week_id,
                    id: undefined
            });
        } else {
            transformedData.push({
                    amount: item.RECEIVED,
                    category_id: 1,
                    client_id: client_id,
                    date: newDate,
                    paid: true,
                    payee: item.Payee,
                    week_id: week_id,
                    id: undefined
            });
        }
    }
    
    try {
        yield put({type:"SET_QB_IMPORT_DATA", payload: transformedData}); 
    }
    catch {
        console.log('error with setting import data reducer');
    }
}

function* handleImportRegData(action) {
    const importData = action.payload.data;
    const week_id = action.payload.week_id;
    const client_id = action.payload.client_id;
    const transformedData = [];
    console.log(importData);
    for (let i = 1; i< importData.length; i++) {
        const item = importData[i];
        if (item[0].includes('/')) {
            // console.log(item);
            const date = new Date(item[0]);
            const newDate = date.toISOString();
            if ( item[4] !== "") {
                // console.log('expense');
                transformedData.push({
                        amount: `$${item[4]}`,
                        category_id: 2,
                        client_id: client_id,
                        date: newDate,
                        paid: true,
                        payee: item[2],
                        week_id: week_id,
                        id: undefined
                });
            } else {
                // console.log('income');
                transformedData.push({
                    amount: `$${item[5]}`,
                    category_id: 1,
                    client_id: client_id,
                    date: newDate,
                    paid: true,
                    payee: item[2],
                    week_id: week_id,
                    id: undefined
                });
            }
        }
    }
    
    try {
        yield put({type:"SET_REG_IMPORT_DATA", payload: transformedData}); 
    }
    catch {
        console.log('error with setting import data reducer');
    }

}


function* singlePLSaga() {
    yield takeEvery("FETCH_WEEK", fetchWeekData);
    yield takeLatest("UPDATE_ITEM", updateItemData);
    yield takeLatest("DELETE_ITEM", deleteItemData);
    yield takeLatest("POST_ITEM", postItemData);
    yield takeLatest("ADD_TO_ALLPL", addToAllPL);
    yield takeLatest("IMPORT_QB_DATA", handleImportQBData);
    yield takeLatest("IMPORT_REG_DATA", handleImportRegData);

}

export default singlePLSaga;
