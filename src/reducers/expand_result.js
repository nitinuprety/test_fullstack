import {
  EXPAND_ID_RESULTS } from '../actions/type';

export default function(state = {}, action) {
  switch(action.type) {
       case EXPAND_ID_RESULTS:
          return { ...state, expand_result:action.payload, page_end: false };   
       }

  return state;
}