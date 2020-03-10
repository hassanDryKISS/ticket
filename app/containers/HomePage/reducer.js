import produce from 'immer';
import { EVENT_LIST_SUCCESS, EVENT_LIST_FAILE, EVENT_LIST } from './constants';

export const initialState = {
  eventList: [],
  loading: false,
  error: '',
};

/* eslint-disable default-case, no-param-reassign */
const homeReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case EVENT_LIST:
        draft.loading = true;
        break;
      case EVENT_LIST_SUCCESS:
        draft.eventList = action.data;
        draft.loading = false;
        break;
      case EVENT_LIST_FAILE:
        draft.loading = false;
        draft.error = action.data;
        break;
    }
  });

export default homeReducer;
