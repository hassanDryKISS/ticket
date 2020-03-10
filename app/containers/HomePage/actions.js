import { EVENT_LIST } from './constants';





export function getEventListAction() {
  console.log('action')
  return {
    type: EVENT_LIST,
  };
}
