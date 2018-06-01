import {FETCH_PROFILE } from '../actions/type';

export default function(state = {}, action) {
	switch(action.type) {

       case FETCH_PROFILE:
          return { ...state, profile: action.payload };          
	}

	return state;
}