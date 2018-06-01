import {FETCH_REPORT, DELETE_REPORT_RESPONSE,FETCH_REPORT_RE,RESET_REPORT_SET,FETCH_SINGLE_REPORT,IP_INDIA_CHECK } from '../actions/type';

export default function(state = {}, action) {
	switch(action.type) {

       case FETCH_REPORT:
          return { ...state, report: action.payload };
       case FETCH_SINGLE_REPORT:
          return {...state,single_report:action.payload}; 
       case FETCH_REPORT_RE:
           return { ...state, report:action.payload};
       case IP_INDIA_CHECK:
           return { ...state, ipindia:action.payload};   
       case RESET_REPORT_SET:
           return {...state, report:null};
       case DELETE_REPORT_RESPONSE:
          return { ...state, report: state.report.filter(item => item.id !== action.payload.id) };         
	}

	return state;
}