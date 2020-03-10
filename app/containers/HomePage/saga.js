import { takeLatest, call, put } from 'redux-saga/effects';
import request from '../../utils/request';
import { EVENT_LIST, EVENT_LIST_SUCCESS, EVENT_LIST_FAILE } from './constants';

function* getEventList() {
  console.log('sagaaa')
  try {
    const data = yield call(request.get, 'backend/events/list',);

    yield put({
      type: EVENT_LIST_SUCCESS,
      data: data.data,
    });
    // yield put(push('/users'));
  } catch (error) {
    yield put({
      type: EVENT_LIST_FAILE,
      data: error,
    });
  }
}
// Individual exports for testing
export default function* homeSaga() {
  yield takeLatest(EVENT_LIST, getEventList);
}
