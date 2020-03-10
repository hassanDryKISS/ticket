import { createSelector } from 'reselect';
import { initialState } from './reducer';


const selectHomeDomain = state => state.home || initialState;


const makeSelectHome = () =>
  createSelector(
    selectHomeDomain,
    substate => substate,
  );
const selectEventList = () =>
  createSelector(
    selectHomeDomain,
    substate => substate.eventList,
  );

const selectLoading = () =>
  createSelector(
    selectHomeDomain,
    substate => substate.loading,
  );
export default makeSelectHome;
export { selectHomeDomain, selectEventList, selectLoading };
