import {
  PAGI_ERROR,
  SEARCH_RESULTS_FLASH_WILD,
  SEARCH_RESULTS_FLASH_CONTEXT,
  SEARCH_RESULTS_FLASH_FUZZY,
  SEARCH_RESULTS_FLASH_INITIALS,
  SEARCH_RESULTS_FLASH_INITIALS_PAGI,
  SEARCH_RESULTS_FLASH_FUZZY_PAGI,
  SEARCH_RESULTS_FLASH_WILD_PAGI, 
  SEARCH_RESULTS_FLASH_CONTEXT_PAGI, 
  PAGI_ERROR_WILD,
  PAGI_ERROR_CONTEXT,
  PAGI_ERROR_FUZZY,
  PAGI_ERROR_INITIALS,
  FETCH_DATA, 
  SEARCH_RESULTS,
  FETCH_ADDED_REPORT, 
  FETCH_VULNERABILITY, 
  SEARCH_RESULTS_PAGI, 
  IP_INDIA_CHECK,
  RESET_SEARCH_RESULTS } from '../actions/type';

export default function(state = {}, action) {
  switch(action.type) {
       case FETCH_DATA:
          return { ...state, cases: action.payload };
       case SEARCH_RESULTS:
          return { ...state, result: action.payload, page_end:false };    
       case SEARCH_RESULTS_PAGI:
          return { ...state, result:{...state.result, search_result: state.result.search_result.concat(action.payload.search_result)}, page_end: false };
       case SEARCH_RESULTS_FLASH_CONTEXT:
          return {...state, search_flash_context:action.payload,page_end_context: false};     
       case SEARCH_RESULTS_FLASH_CONTEXT_PAGI:
          return {...state, search_flash_context:{...state.search_flash_context,search_result: state.search_flash_context.search_result.concat(action.payload.search_result)},page_end_context: false};
       case SEARCH_RESULTS_FLASH_WILD:
          return {...state, search_flash_wild: action.payload,page_end_wild: false};        
       case SEARCH_RESULTS_FLASH_WILD_PAGI:
          return {...state, search_flash_wild:{...state.search_flash_wild,search_result: state.search_flash_wild.search_result.concat(action.payload.search_result)},page_end_wild: false};   
       case SEARCH_RESULTS_FLASH_FUZZY:
          return {...state, search_flash_fuzzy: action.payload,page_end_fuzzy: false};        
       case SEARCH_RESULTS_FLASH_FUZZY_PAGI:
          return {...state, search_flash_fuzzy:{...state.search_flash_fuzzy,search_result: state.search_flash_fuzzy.search_result.concat(action.payload.search_result)},page_end_fuzzy: false}; 
       case SEARCH_RESULTS_FLASH_INITIALS:
          return {...state, search_flash_initials: action.payload,page_end_initials: false};        
       case SEARCH_RESULTS_FLASH_INITIALS_PAGI:
          return {...state, search_flash_initials:{...state.search_flash_initials,search_result: state.search_flash_initials.search_result.concat(action.payload.search_result)},page_end_initials: false};          
       case PAGI_ERROR:
          return { ...state, page_end: action.payload }; 
       case PAGI_ERROR_WILD:
          return { ...state, page_end_wild: action.payload };    
       case PAGI_ERROR_CONTEXT:
          return { ...state, page_end_context: action.payload };
       case PAGI_ERROR_FUZZY:
          return { ...state, page_end_fuzzy: action.payload };
       case PAGI_ERROR_INITIALS:
          return { ...state, page_end_initials: action.payload };             
       case FETCH_ADDED_REPORT:
          return { ...state, added_report: action.payload };   
       case FETCH_VULNERABILITY:
          return { ...state, vulnerability: action.payload };    
      case IP_INDIA_CHECK:
           return { ...state, ipindia:action.payload};
      case RESET_SEARCH_RESULTS:
           return {...state,search_flash_context:null,search_flash_initials:null,search_flash_fuzzy:null,search_flash_wild:null, result:null}           
  }

  return state;
}