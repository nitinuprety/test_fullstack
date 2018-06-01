import {PROPRIETOR_RESULT, PROPRIETOR_MARKS, PROPRIETOR_OPPOSED_MARK, PROPRIETOR_FILTERED_RESULT } from '../actions/type';

export default function(state = {}, action) {
	switch(action.type) {

       case PROPRIETOR_RESULT:
          return { ...state, proprietor: action.payload };     
       case PROPRIETOR_MARKS:
          return { ...state, proprietor_marks: action.payload };       
       case PROPRIETOR_OPPOSED_MARK:
          return { ...state, proprietor_opposed_marks: action.payload };   
       case PROPRIETOR_FILTERED_RESULT:
          return { ...state, proprietor_filtered: action.payload };     

	}

	return state;
}