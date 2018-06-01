import {FETCH_ERROR } from '../actions/type';

export default function(state = {}, action) {
	switch(action.type) {

       case FETCH_ERROR:
          return { ...state, error: action.payload };          
	}

	return state;
}