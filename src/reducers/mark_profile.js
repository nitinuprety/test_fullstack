import {TRADEMARK_SINGLE, IP_INDIA_CHECK,RESET_MARK_PROFILE } from '../actions/type';

export default function(state = {}, action) {
	switch(action.type) {

       case TRADEMARK_SINGLE:
          return { ...state, mark_single: action.payload };
       case IP_INDIA_CHECK:
           return { ...state, ipindia:action.payload};     
       case RESET_MARK_PROFILE:
           return { ...state, mark_single: null };
	} 

	return state;
}