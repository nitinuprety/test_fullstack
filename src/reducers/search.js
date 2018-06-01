import {USER_MARKS, FETCH_CLASSES, FETCH_CLASS_ITEM, FETCH_VULNERABILITY, USER_QUOTA,APPLICATION_NUMBER_SEARCH, APPLICATION_NUMBER_SEARCH_ERROR,RESET_APP_SEARCH_STATE } from '../actions/type';

export default function(state = {}, action) {
	switch(action.type) {
       case USER_MARKS:
          return { ...state, marks: action.payload };   
       case FETCH_CLASSES:
          return { ...state, classes: action.payload };
       case FETCH_CLASS_ITEM:
          return { ...state, class_item: action.payload.data };       
       case FETCH_VULNERABILITY:
          return { ...state, vulnerability: action.payload};     
      case USER_QUOTA:
          return { ...state, quota: action.payload};    
      case APPLICATION_NUMBER_SEARCH:
          return { ...state, application_search_state: action.payload.app_state, application_search_data:action.payload.response.data};
      case APPLICATION_NUMBER_SEARCH_ERROR:
          return { ...state, application_search_state: action.payload};  
      case RESET_APP_SEARCH_STATE:
          return { ...state, application_search_state: null, application_search_data:null};
	}

	return state;
}