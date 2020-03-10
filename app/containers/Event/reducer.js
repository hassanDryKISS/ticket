// import produce from 'immer';
// import {
//   DEFAULT_ACTION,
//   LOGIN_FAILED,
//   LOGIN,
//   LOGIN_SUCCESS,
// } from './constants';

// export const initialState = {
//   token: localStorage.getItem('token'),
//   user: {},
//   error: '',
// };

// /* eslint-disable default-case, no-param-reassign */
// const loginReducer = (state = initialState, action) =>
//   produce(state, draft => {
//     switch (action.type) {
//       case LOGIN:
//         break;
//       case LOGIN_SUCCESS:
//         draft.token = action.data.token;
//         draft.user = action.data.user;
//         localStorage.setItem('token', action.data.token);
//         break;
//       case LOGIN_FAILED:
//         draft.error = 'Email and password is invalid.';
//         break;
//       case DEFAULT_ACTION:
//         break;
//     }
//   });

// export default loginReducer;
