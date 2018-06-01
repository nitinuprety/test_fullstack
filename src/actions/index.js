import axios from 'axios';
import { browserHistory } from 'react-router';
import {
        FETCH_PROFILE, 
        SEARCH_RESULTS_FLASH_WILD,
        SEARCH_RESULTS_FLASH_WILD_PAGI ,
        SEARCH_RESULTS_FLASH_CONTEXT,
        SEARCH_RESULTS_FLASH_CONTEXT_PAGI,
        SEARCH_RESULTS_FLASH_FUZZY,
        SEARCH_RESULTS_FLASH_FUZZY_PAGI,
        SEARCH_RESULTS_FLASH_INITIALS,
        SEARCH_RESULTS_FLASH_INITIALS_PAGI,
        FETCH_REPORT_RE,
        RESET_REPORT_SET,
        IP_INDIA_CHECK, 
        FETCH_SINGLE_REPORT,
        SEARCH_RESULTS_PAGI,
        PAGI_ERROR,
        USER_QUOTA, 
        FETCH_VULNERABILITY,
        DELETE_REPORT_RESPONSE, 
        FETCH_DATA,
        AUTH_USER, 
        UNAUTH_USER,
        USER_MARKS, 
        SEARCH_RESULTS, 
        TRADEMARK_SINGLE, 
        FETCH_REPORT, 
        PROPRIETOR_RESULT,
        PROPRIETOR_MARKS, 
        FETCH_CLASSES, 
        FETCH_CLASS_ITEM, 
        PROPRIETOR_FILTERED_RESULT, 
        PROPRIETOR_OPPOSED_MARK, 
        FETCH_ADDED_REPORT,
        FETCH_ERROR,
        PAGI_ERROR_CONTEXT,
        PAGI_ERROR_WILD,
        PAGI_ERROR_FUZZY,
        RESET_APP_SEARCH_STATE,
        APPLICATION_NUMBER_SEARCH,
        APPLICATION_NUMBER_SEARCH_ERROR,
        RESET_MARK_PROFILE,
        RESET_SEARCH_RESULTS } from './type';
import fileDownload from 'react-file-download';
import FileSaver from 'file-saver';

import { ROOT_URL } from '../../config';
import _ from 'lodash';


/*----------------------------------------
        UPDATE PROFILE DATA
------------------------------------------*/
export function fetchCases() {
	// console.log('Function');
  return function(dispatch) {
    axios.get(`${ROOT_URL}/api/me/marks/ `, {
      headers: {Authorization:'Token '+ localStorage.getItem('token')}
    })
    .then(response => {
       // console.log('Response fetch cases:',response);
       dispatch({type: USER_MARKS , payload: response.data});
    })
       // .catch(error => );
  }
}

/*----------------------------------------
        CHECK IP INDIA
------------------------------------------*/
export function checkIpIndia() {
  // console.log('Function');
  return function(dispatch) {
    axios.get(`${ROOT_URL}/api/ipindia_status/ `)
    .then(response => {
      dispatch({type: IP_INDIA_CHECK , payload: response.data.status});
       // console.log('Response IP india',response);
       // if(response.status==200) {
       //  dispatch({type: IP_INDIA_CHECK , payload: true});
       // }

       // else {
       //  dispatch({type: IP_INDIA_CHECK , payload: false});
       // }
       
    })
       .catch(error => {
        console.log('error IP India:',error);
       } );
  }
}

/*----------------------------------------
        CHECK IP INDIA
------------------------------------------*/
export function checkSearchApi() {
  // console.log('Function');
  return function(dispatch) {
    axios.get(`https://tmsearchapi.mikelegal.com/`)
    .then(response => {
      // dispatch({type: IP_INDIA_CHECK , payload: response.data.status});
       // console.log('Response IP india',response);
       // if(response.status==200) {
       //  dispatch({type: IP_INDIA_CHECK , payload: true});
       // }

       // else {
       //  dispatch({type: IP_INDIA_CHECK , payload: false});
       // }
       
    })
       .catch(error => {
        console.log('error IP India:',error);
       } );
  }
}


/*----------------------------------------
        FETCH QUOTA
------------------------------------------*/
export function fetchQuota() {
  // console.log('Function');
  return function(dispatch) {
    axios.get(`${ROOT_URL}/api/me/quota/ `, {
      headers: {Authorization:'Token '+ localStorage.getItem('token')}
    })
    .then(response => {
       // console.log('Response fetch cases:',response);
       dispatch({type: USER_QUOTA , payload: response.data});
    })
      // .catch(error => );
  }
}

/*----------------------------------------
           SIGNIN USER ACTION 
------------------------------------------*/
export function signinUser ({ username, password }) {
  // console.log({ username, password })
   return function(dispatch) {
         axios.post(`${ROOT_URL}/api/token-auth/`, { username, password })
            .then(response => {
              // console.log('Token came:', response);
              dispatch({ type: AUTH_USER });
              localStorage.setItem('token', response.data.token);
              browserHistory.push('/intro');          
            })
            .catch((err) => {
                // console.log('err signin:', err);
                dispatch({type:FETCH_ERROR, payload:err.response.data});
            });
   }
}

/*----------------------------------------
           SIGNUP USER ACTION 
------------------------------------------*/
export function signupUser ({ name, email, password1, password2 }) {
  // console.log({ name, email, password1, password2 })
   return function(dispatch) {
         axios.post(`${ROOT_URL}/api/registration/`, { name, email, password1, password2 })
            .then(response => {
              // console.log('Token came:', response);
              dispatch({ type: AUTH_USER });
              localStorage.setItem('token', response.data.token);
              browserHistory.push('/search');          
            })
            .catch((err) => {
                // console.log('err registration:', err);
                dispatch({type:FETCH_ERROR, payload:err.response.data});
            });
   }
}

/*----------------------------------------
           ADD MARK 
------------------------------------------*/
export function addMark ({ mark}) {
  // console.log('localStorage.getItem(token)',localStorage.getItem('token'))
   return function(dispatch) {
         axios.post(`${ROOT_URL}/api/me/marks/`, {mark},{

      headers: {Authorization: 'Token '+ localStorage.getItem('token')}
    })
            .then(response => {
              // console.log('add mark:', response);  
               dispatch({type: USER_MARKS , payload: response.data});
            })
            .catch(() => {
                
            });
   }
}


/*----------------------------------------
           ADD MARK 
------------------------------------------*/
export function fetchMark () {
  // console.log('localStorage.getItem(token)',localStorage.getItem('token'))
   return function(dispatch) {
         axios.post(`${ROOT_URL}/api/me/marks/`, {
      headers: {Authorization:'Token '}
    })
            .then(response => {
              // console.log('Token came:', response);       
            })
            .catch(() => {
                
            });
   }
}

/*----------------------------------------
           ADD MARK 
------------------------------------------*/
export function fetchProprietor ({query, search_base}) {
  // console.log('Prop Name:',{query, search_base});
   return function(dispatch) {
         axios.post(`${ROOT_URL}/api/search/`,{query, search_base}, {
      headers: {Authorization:'Token '+ localStorage.getItem('token')}
    })
            .then(response => {
              // console.log('Proprietor came:', response);       
            })
            .catch(() => {
                
            });
   }
}

/*----------------------------------------
           ADD MARK 
------------------------------------------*/
export function fetchProfile () {
  // console.log('Prop Name:',{query, search_base});
   return function(dispatch) {
         axios.get(`${ROOT_URL}/api/me/profile/`, {
      headers: {Authorization:'Token '+ localStorage.getItem('token')}
    })
            .then(response => {
              console.log('Profile came:', response); 
              dispatch({type: FETCH_PROFILE , payload: response.data});      
            })
            .catch(() => {
                
            });
   }
}


/*----------------------------------------
           ADD TO REPORT Patch
------------------------------------------*/
export function uploadLogo (file) {
  console.log('Prop request came',file)
  var formData = new FormData();
  formData.append('picture', file);
  console.log('formData:',formData);
   return function(dispatch) {
         axios.patch(`${ROOT_URL}/api/me/profile/`,formData, {
      headers: {Authorization:'Token '+ localStorage.getItem('token'),'content-type':'multipart/form-data'}
    })
            .then(response => {
              console.log('Add logo:', response);  
              // browserHistory.push('/report_set');    
              dispatch({type: FETCH_PROFILE , payload: response.data}); 
            })
            .catch(() => {
                
            });
   }
}

/*----------------------------------------
           SIGNOUT ACTION 
------------------------------------------*/
export function signoutUser() {
  localStorage.clear();
  // browserHistory.push('/signin');
  return { type: UNAUTH_USER };
}

export function redirectToFlash(arg){
  console.log('arg:',arg);
  var fuz;
  var flash;
  if(arg=='fuzzy'){
    fuz='fuzzy';
  }
  else if(arg='flash') {
    flash='flash';
  }

  if(fuz=='fuzzy' && flash=='flash') {
    browserHistory.push('/flash_result/'+localStorage.getItem('mark_term'));
    setTimeout(()=>{
     fuz='';
     flash='';
      }, 1000);
  }
}

/*----------------------------------------
           ADD MARK 
------------------------------------------*/
export function new_filter ({search_type, query, mark, search_base, search_classes, fuzzy_depth, page,flash_flag,filter_flag,filter_classes}) {

  // console.log('request came',{search_type, query, mark, page})
   return function(dispatch) {
         axios.get(`${ROOT_URL}/api/new_search/`,{params: {search_type:search_type, query:query, mark:mark, search_base:search_base, fuzzy_depth:fuzzy_depth, page:page, search_classes:search_classes,flash_flag:flash_flag,filter_flag:filter_flag,filter_classes:filter_classes}, 
      headers: {Authorization:'Token '+ localStorage.getItem('token')}
    })
            .then(response => {
              console.log('New filter:', response);
              // if(response.data.proprietors) {
              //   browserHistory.push('/proprietor/'+response.data.proprietors[0].id);
              // } 
              // else {
              //   dispatch({type: SEARCH_RESULTS , payload: response.data}); 
                
              //   localStorage.setItem('flash_result_flash',true);
              //   if(localStorage.getItem('fuzzy_result_flash')=='true'){
              //     browserHistory.push('/flash_result/'+localStorage.getItem('mark_term'));
              //   }
              // }   
              
            })
            .catch(() => {
                
            });
   }
}


/*----------------------------------------
           ADD MARK 
------------------------------------------*/
export function GlobalFlashSearch ({search_type, query, mark, search_base, search_classes, fuzzy_depth, page,flash_flag,filter_flag,filter_classes}) {

  // console.log('request came',{search_type, query, mark, page})
   return function(dispatch) {
         axios.get(`${ROOT_URL}/api/new_search/`,{params: {search_type:search_type, query:query, mark:mark, search_base:search_base, fuzzy_depth:fuzzy_depth, page:page, search_classes:search_classes,flash_flag:flash_flag,filter_flag:filter_flag,filter_classes:filter_classes}, 
      headers: {Authorization:'Token '+ localStorage.getItem('token')}
    })
            .then(response => {
              console.log('Search flash wild response:', response);
              if(response.data.proprietors) {
                browserHistory.push('/proprietor/'+response.data.proprietors[0].id);
              } 
              else {
                dispatch({type: SEARCH_RESULTS , payload: response.data}); 
                
                localStorage.setItem('flash_result_flash',true);
                if(localStorage.getItem('fuzzy_result_flash')=='true'){
                  browserHistory.push('/flash_result/'+localStorage.getItem('mark_term'));
                }
              }   
              
            })
            .catch(() => {
                
            });
   }
}

/*----------------------------------------
           ADD MARK 
------------------------------------------*/
export function GlobalFlashSearchPagi ({search_type, query, mark, search_base, search_classes, fuzzy_depth, page,flash_flag}) {

  // console.log('request came',{search_type, query, mark, page})
   return function(dispatch) {
         axios.get(`${ROOT_URL}/api/new_search/`,{params: {search_type:search_type, query:query, mark:mark, search_base:search_base, fuzzy_depth:fuzzy_depth, page:page, search_classes:search_classes,flash_flag:flash_flag}, 
      headers: {Authorization:'Token '+ localStorage.getItem('token')}
    })
            .then(response => {
              console.log('Search flash wild response:', response);
              if(response.data.proprietors) {
                browserHistory.push('/proprietor/'+response.data.proprietors[0].id);
              } 
              else {
                dispatch({type: SEARCH_RESULTS_PAGI , payload: response.data}); 
                // browserHistory.push('/flash_result/'+localStorage.getItem('mark_term'));
              }   
              
            })
            .catch(err => {
                // console.log('result pagination err:', err)
                if(err.response.status==404) {
                  dispatch({type: PAGI_ERROR , payload: true});
                }
            });
   }
}

/*----------------------------------------
           ADD MARK 
------------------------------------------*/
export function flashFuzzySearch ({query,search_base, mark, search_type, fuzzy_depth, search_classes, page,flash_flag,filter_flag,filter_classes}) {

  console.log('request came',{fuzzy_depth})
   return function(dispatch) {
         axios.get(`${ROOT_URL}/api/new_search/`,{params: {search_type:search_type, query:query, mark:mark, search_base:search_base, fuzzy_depth:fuzzy_depth, page:page, search_classes:search_classes,flash_flag:flash_flag,filter_flag:filter_flag,filter_classes:filter_classes}, 
      headers: {Authorization:'Token '+ localStorage.getItem('token')}
    })
            .then(response => {
              console.log('Search flash wild response:', response);
              if(response.data.proprietors) {
                browserHistory.push('/proprietor/'+response.data.proprietors[0].id)
              } 
              else {
                dispatch({type: SEARCH_RESULTS_FLASH_FUZZY , payload: response.data}); 
                if(localStorage.getItem('flash_result_flash')=='true'){
                  browserHistory.push('/flash_result/'+localStorage.getItem('mark_term'));
                }
                else {
                  localStorage.setItem('fuzzy_result_flash',true);
                }
               
              }   
              
            })
            .catch(() => {
                
            });
   }
}

/*----------------------------------------
           ADD MARK 
------------------------------------------*/
export function flashFuzzySearchFilter ({search_query,query,search_base, mark, search_type, fuzzy_depth, search_classes, page,flash_flag,filter_flag, filter_classes, filter_trademark_status, filter_trademark_type, filter_states, filter_similarity, filter_usage_date, filter_application_date}) {

  if(search_query && search_query.length==0) {
    search_query=null
  }
  else {
    search_query = search_query;
  }
  if(filter_trademark_status && filter_trademark_status.length==0) {
    filter_trademark_status=null
  }
  else {
    filter_trademark_status = filter_trademark_status.toString();
  }
  if(filter_trademark_type && filter_trademark_type.length==0) {
    filter_trademark_type=null
  }
  else {
    filter_trademark_type = filter_trademark_type.toString();
  }
  if(filter_classes && filter_classes.length==0) {
    filter_classes=null
  }
  else {
    filter_classes = filter_classes.toString();
  }

  if(filter_states && filter_states.length==0) {
    filter_states=null
  }
  else {
    filter_states = filter_states.toString();
  }

  console.log('request came',{fuzzy_depth})
   return function(dispatch) {
         axios.get(`${ROOT_URL}/api/new_search/`,{params: {search_term:search_query,search_type:search_type, query:query, mark:mark, search_base:search_base, fuzzy_depth:fuzzy_depth, page:page, search_classes:search_classes,flash_flag:flash_flag,filter_trademark_status:filter_trademark_status,filter_trademark_type:filter_trademark_type, filter_flag:filter_flag,filter_classes:filter_classes, filter_states:filter_states, filter_similarity:filter_similarity, filter_usage_date:filter_usage_date, filter_application_date}, 
      headers: {Authorization:'Token '+ localStorage.getItem('token')}
    })
            .then(response => {
              console.log('Search flash wild response:', response);
              if(response.data.proprietors) {
                browserHistory.push('/proprietor/'+response.data.proprietors[0].id)
              } 
              else {
                dispatch({type: SEARCH_RESULTS_FLASH_FUZZY , payload: response.data}); 
                if(localStorage.getItem('flash_result_flash')=='true'){
                  browserHistory.push('/flash_result/'+localStorage.getItem('mark_term'));
                }
                else {
                  localStorage.setItem('fuzzy_result_flash',true);
                }
               
              }   
              
            })
            .catch(() => {
                
            });
   }
}

/*----------------------------------------
           ADD MARK 
------------------------------------------*/
export function flashContextualSearch ({search_type, query, mark, search_base, search_classes, fuzzy_depth, page}) {

  // console.log('request came',{search_type, query, mark, page})
   return function(dispatch) {
         axios.get(`${ROOT_URL}/api/new_search/`,{params: {search_type:search_type, query:query, mark:mark, search_base:search_base, fuzzy_depth:fuzzy_depth, page:page, search_classes:search_classes}, 
      headers: {Authorization:'Token '+ localStorage.getItem('token')}
    })
            .then(response => {
              console.log('Search flash wild response:', response);
              if(response.data.proprietors) {
                browserHistory.push('/proprietor/'+response.data.proprietors[0].id)
              } 
              else {
                dispatch({type: SEARCH_RESULTS_FLASH_CONTEXT , payload: response.data}); 
                // browserHistory.push('/result/'+localStorage.getItem('mark_term'));
              }   
              
            })
            .catch(() => {
                
            });
   }
}

/*----------------------------------------
           ADD MARK 
------------------------------------------*/
export function flashWildSearchFilterPagi ({search_type, query, mark, search_base, search_classes, fuzzy_depth, page,flash_flag, filter_flag, filter_classes, filter_trademark_status, filter_trademark_type, filter_states, filter_similarity, filter_usage_date, filter_application_date}) {

  if(filter_trademark_status && filter_trademark_status.length==0) {
    filter_trademark_status=null
  }
  else {
    filter_trademark_status = filter_trademark_status.toString();
  }
  if(filter_trademark_type && filter_trademark_type.length==0) {
    filter_trademark_type=null
  }
  else {
    filter_trademark_type = filter_trademark_type.toString();
  }
  if(filter_classes && filter_classes.length==0) {
    filter_classes=null
  }
  else {
    filter_classes = filter_classes.toString();
  }

  if(filter_states && filter_states.length==0) {
    filter_states=null
  }
  else {
    filter_states = filter_states.toString();
  }
  // console.log('request came',{search_type, query, mark, page})
   return function(dispatch) {
         axios.get(`${ROOT_URL}/api/new_search/`,{params: {search_type:search_type, query:query, mark:mark, search_base:search_base, fuzzy_depth:fuzzy_depth, page:page, search_classes:search_classes,flash_flag:flash_flag, filter_trademark_status:filter_trademark_status,filter_trademark_type:filter_trademark_type, filter_flag:filter_flag,filter_classes:filter_classes, filter_states:filter_states, filter_similarity:filter_similarity, filter_usage_date:filter_usage_date, filter_application_date}, 
      headers: {Authorization:'Token '+ localStorage.getItem('token')}
    })
            .then(response => {
              console.log('Search flash wild response:', response);
              if(response.data.proprietors) {
                browserHistory.push('/proprietor/'+response.data.proprietors[0].id)
              } 
              else {
                dispatch({type: SEARCH_RESULTS_FLASH_WILD_PAGI , payload: response.data}); 
                // browserHistory.push('/result/'+localStorage.getItem('mark_term'));
              }   
              
            })
            .catch(err => {
                // console.log('result pagination err:', err)
                if(err.response.status==404) {
                  dispatch({type: PAGI_ERROR_WILD , payload: true});
                }
            });
   }
}


/*----------------------------------------
           ADD MARK 
------------------------------------------*/
export function flashWildSearchPagi ({search_type, query, mark, search_base, search_classes, fuzzy_depth, page,flash_flag}) {

  // console.log('request came',{search_type, query, mark, page})
   return function(dispatch) {
         axios.get(`${ROOT_URL}/api/new_search/`,{params: {search_type:search_type, query:query, mark:mark, search_base:search_base, fuzzy_depth:fuzzy_depth, page:page, search_classes:search_classes,flash_flag:flash_flag}, 
      headers: {Authorization:'Token '+ localStorage.getItem('token')}
    })
            .then(response => {
              console.log('Search flash wild response:', response);
              if(response.data.proprietors) {
                browserHistory.push('/proprietor/'+response.data.proprietors[0].id)
              } 
              else {
                dispatch({type: SEARCH_RESULTS_FLASH_WILD_PAGI , payload: response.data}); 
                // browserHistory.push('/result/'+localStorage.getItem('mark_term'));
              }   
              
            })
            .catch(err => {
                // console.log('result pagination err:', err)
                if(err.response.status==404) {
                  dispatch({type: PAGI_ERROR_WILD , payload: true});
                }
            });
   }
}

/*----------------------------------------
           ADD MARK 
------------------------------------------*/
export function flashContextualSearchPagi ({search_type, query, mark, search_base, search_classes, fuzzy_depth, page}) {

  // console.log('request came',{search_type, query, mark, page})
   return function(dispatch) {
         axios.get(`${ROOT_URL}/api/new_search/`,{params: {search_type:search_type, query:query, mark:mark, search_base:search_base, fuzzy_depth:fuzzy_depth, page:page, search_classes:search_classes}, 
      headers: {Authorization:'Token '+ localStorage.getItem('token')}
    })
            .then(response => {
              console.log('Search flash wild response:', response);
              if(response.data.proprietors) {
                browserHistory.push('/proprietor/'+response.data.proprietors[0].id)
              } 
              else {
                dispatch({type: SEARCH_RESULTS_FLASH_CONTEXT_PAGI , payload: response.data}); 
                // browserHistory.push('/result/'+localStorage.getItem('mark_term'));
              }   
              
            })
            .catch(err => {
                // console.log('result pagination err:', err)
                if(err.response.status==404) {
                  dispatch({type: PAGI_ERROR_CONTEXT , payload: true});
                }
            });
   }
}

/*----------------------------------------
           ADD MARK 
------------------------------------------*/
export function flashFuzzySearchFilterPagi ({search_type, query, mark, search_base, search_classes, fuzzy_depth, page, flash_flag, filter_flag, filter_classes, filter_trademark_status, filter_trademark_type, filter_states, filter_similarity, filter_usage_date, filter_application_date}) {
  if(filter_trademark_status && filter_trademark_status.length==0) {
    filter_trademark_status=null
  }
  else {
    filter_trademark_status = filter_trademark_status.toString();
  }
  if(filter_trademark_type && filter_trademark_type.length==0) {
    filter_trademark_type=null
  }
  else {
    filter_trademark_type = filter_trademark_type.toString();
  }
  if(filter_classes && filter_classes.length==0) {
    filter_classes=null
  }
  else {
    filter_classes = filter_classes.toString();
  }

  if(filter_states && filter_states.length==0) {
    filter_states=null
  }
  else {
    filter_states = filter_states.toString();
  }
  // console.log('request came',{search_type, query, mark, page})
   return function(dispatch) {
         axios.get(`${ROOT_URL}/api/new_search/`,{params: {search_type:search_type, query:query, mark:mark, search_base:search_base, fuzzy_depth:fuzzy_depth, page:page, search_classes:search_classes, flash_flag:flash_flag, filter_trademark_status:filter_trademark_status,filter_trademark_type:filter_trademark_type, filter_flag:filter_flag,filter_classes:filter_classes, filter_states:filter_states, filter_similarity:filter_similarity, filter_usage_date:filter_usage_date, filter_application_date}, 
      headers: {Authorization:'Token '+ localStorage.getItem('token')}
    })
            .then(response => {
              console.log('Search flash wild response:', response);
              if(response.data.proprietors) {
                browserHistory.push('/proprietor/'+response.data.proprietors[0].id)
              } 
              else {
                dispatch({type: SEARCH_RESULTS_FLASH_FUZZY_PAGI , payload: response.data}); 
                // browserHistory.push('/result/'+localStorage.getItem('mark_term'));
              }   
              
            })
            .catch(err => {
                // console.log('result pagination err:', err)
                if(err.response.status==404) {
                  dispatch({type: PAGI_ERROR_FUZZY , payload: true});
                }
            });
   }
}

/*----------------------------------------
           ADD MARK 
------------------------------------------*/
export function flashFuzzySearchPagi ({search_type, query, mark, search_base, search_classes, fuzzy_depth, page, flash_flag}) {

  // console.log('request came',{search_type, query, mark, page})
   return function(dispatch) {
         axios.get(`${ROOT_URL}/api/new_search/`,{params: {search_type:search_type, query:query, mark:mark, search_base:search_base, fuzzy_depth:fuzzy_depth, page:page, search_classes:search_classes, flash_flag:flash_flag}, 
      headers: {Authorization:'Token '+ localStorage.getItem('token')}
    })
            .then(response => {
              console.log('Search flash wild response:', response);
              if(response.data.proprietors) {
                browserHistory.push('/proprietor/'+response.data.proprietors[0].id)
              } 
              else {
                dispatch({type: SEARCH_RESULTS_FLASH_FUZZY_PAGI , payload: response.data}); 
                // browserHistory.push('/result/'+localStorage.getItem('mark_term'));
              }   
              
            })
            .catch(err => {
                // console.log('result pagination err:', err)
                if(err.response.status==404) {
                  dispatch({type: PAGI_ERROR_FUZZY , payload: true});
                }
            });
   }
}

/*----------------------------------------
           ADD MARK 
------------------------------------------*/
export function flashWildcardSearch ({search_type, query, mark, search_base, search_classes, fuzzy_depth, page, flash_flag,filter_flag,filter_classes}) {

  // console.log('request came',{search_type, query, mark, page})
   return function(dispatch) {
         axios.get(`${ROOT_URL}/api/new_search/`,{params: {search_type:search_type, query:query, mark:mark, search_base:search_base, fuzzy_depth:fuzzy_depth, page:page, search_classes:search_classes,flash_flag:flash_flag,filter_flag:filter_flag,filter_classes:filter_classes}, 
      headers: {Authorization:'Token '+ localStorage.getItem('token')}
    })
            .then(response => {
              console.log('Search flash wild response:', response);
              if(response.data.proprietors) {
                browserHistory.push('/proprietor/'+response.data.proprietors[0].id)
              } 
              else {
                dispatch({type: SEARCH_RESULTS_FLASH_WILD , payload: response.data}); 
                // browserHistory.push('/result/'+localStorage.getItem('mark_term'));
              }   
              
            })
            .catch(() => {
                
            });
   }
}

/*----------------------------------------
           ADD MARK 
------------------------------------------*/
export function flashWildcardSearchFilter ({search_query,search_type, query, mark, search_base, search_classes, fuzzy_depth, page, flash_flag,filter_flag, filter_classes, filter_trademark_status, filter_trademark_type, filter_states, filter_similarity, filter_usage_date, filter_application_date}) {
  
  if(search_query && search_query.length==0) {
    search_query=null
  }
  else {
    search_query = search_query;
  }
  if(filter_trademark_status && filter_trademark_status.length==0) {
    filter_trademark_status=null
  }
  else {
    filter_trademark_status = filter_trademark_status.toString();
  }
  if(filter_trademark_type && filter_trademark_type.length==0) {
    filter_trademark_type=null
  }
  else {
    filter_trademark_type = filter_trademark_type.toString();
  }
  if(filter_classes && filter_classes.length==0) {
    filter_classes=null
  }
  else {
    filter_classes = filter_classes.toString();
  }

  if(filter_states && filter_states.length==0) {
    filter_states=null
  }
  else {
    filter_states = filter_states.toString();
  }

  // console.log('request came',{search_type, query, mark, page})
   return function(dispatch) {
         axios.get(`${ROOT_URL}/api/new_search/`,{params: {search_term:search_query,search_type:search_type, query:query, mark:mark, search_base:search_base, fuzzy_depth:fuzzy_depth, page:page, search_classes:search_classes,flash_flag:flash_flag,filter_trademark_status:filter_trademark_status,filter_trademark_type:filter_trademark_type, filter_flag:filter_flag,filter_classes:filter_classes, filter_states:filter_states, filter_similarity:filter_similarity, filter_usage_date:filter_usage_date, filter_application_date}, 
      headers: {Authorization:'Token '+ localStorage.getItem('token')}
    })
            .then(response => {
              console.log('Search flash wild response:', response);
              if(response.data.proprietors) {
                browserHistory.push('/proprietor/'+response.data.proprietors[0].id)
              } 
              else {
                dispatch({type: SEARCH_RESULTS_FLASH_WILD , payload: response.data}); 
                // browserHistory.push('/result/'+localStorage.getItem('mark_term'));
              }   
              
            })
            .catch(() => {
                
            });
   }
}
/*----------------------------------------
           ADD MARK 
------------------------------------------*/
export function flashInitialsSearchFilter ({search_query,search_type, query, mark, search_base, search_classes, fuzzy_depth, page, flash_flag,filter_flag, filter_classes, filter_trademark_status, filter_trademark_type, filter_states, filter_similarity, filter_usage_date, filter_application_date}) {
  
  if(search_query && search_query.length==0) {
    search_query=null
  }
  else {
    search_query = search_query;
  }
  if(filter_trademark_status && filter_trademark_status.length==0) {
    filter_trademark_status=null
  }
  else {
    filter_trademark_status = filter_trademark_status.toString();
  }
  if(filter_trademark_type && filter_trademark_type.length==0) {
    filter_trademark_type=null
  }
  else {
    filter_trademark_type = filter_trademark_type.toString();
  }
  if(filter_classes && filter_classes.length==0) {
    filter_classes=null
  }
  else {
    filter_classes = filter_classes.toString();
  }

  if(filter_states && filter_states.length==0) {
    filter_states=null
  }
  else {
    filter_states = filter_states.toString();
  }

  // console.log('request came',{search_type, query, mark, page})
   return function(dispatch) {
         axios.get(`${ROOT_URL}/api/new_search/`,{params: {search_term:search_query,search_type:search_type, query:query, mark:mark, search_base:search_base, fuzzy_depth:fuzzy_depth, page:page, search_classes:search_classes, flash_flag:flash_flag,filter_trademark_status:filter_trademark_status,filter_trademark_type:filter_trademark_type, filter_flag:filter_flag,filter_classes:filter_classes, filter_states:filter_states, filter_similarity:filter_similarity, filter_usage_date:filter_usage_date, filter_application_date}, 
      headers: {Authorization:'Token '+ localStorage.getItem('token')}
    })
            .then(response => {
              console.log('Search flash wild response:', response);
              if(response.data.proprietors) {
                browserHistory.push('/proprietor/'+response.data.proprietors[0].id)
              } 
              else {
                dispatch({type: SEARCH_RESULTS_FLASH_INITIALS , payload: response.data}); 
                // browserHistory.push('/result/'+localStorage.getItem('mark_term'));
              }   
              
            })
            .catch(() => {
                
            });
   }
}

/*----------------------------------------
           ADD MARK 
------------------------------------------*/
export function flashInitialsSearch ({search_type, query, mark, search_base, search_classes, fuzzy_depth, page, flash_flag,filter_flag,filter_classes}) {

  // console.log('request came',{search_type, query, mark, page})
   return function(dispatch) {
         axios.get(`${ROOT_URL}/api/new_search/`,{params: {search_type:search_type, query:query, mark:mark, search_base:search_base, fuzzy_depth:fuzzy_depth, page:page, search_classes:search_classes, flash_flag:flash_flag,filter_flag:filter_flag,filter_classes:filter_classes}, 
      headers: {Authorization:'Token '+ localStorage.getItem('token')}
    })
            .then(response => {
              console.log('Search flash wild response:', response);
              if(response.data.proprietors) {
                browserHistory.push('/proprietor/'+response.data.proprietors[0].id)
              } 
              else {
                dispatch({type: SEARCH_RESULTS_FLASH_INITIALS , payload: response.data}); 
                // browserHistory.push('/result/'+localStorage.getItem('mark_term'));
              }   
              
            })
            .catch(() => {
                
            });
   }
}

/*----------------------------------------
           ADD MARK 
------------------------------------------*/
export function flashInitialsSearchFilterPagi ({search_type, query, mark, search_base, search_classes, fuzzy_depth, page, flash_flag, filter_flag, filter_classes, filter_trademark_status, filter_trademark_type, filter_states, filter_similarity, filter_usage_date, filter_application_date}) {
  if(filter_trademark_status && filter_trademark_status.length==0) {
    filter_trademark_status=null
  }
  else {
    filter_trademark_status = filter_trademark_status.toString();
  }
  if(filter_trademark_type && filter_trademark_type.length==0) {
    filter_trademark_type=null
  }
  else {
    filter_trademark_type = filter_trademark_type.toString();
  }
  if(filter_classes && filter_classes.length==0) {
    filter_classes=null
  }
  else {
    filter_classes = filter_classes.toString();
  }

  if(filter_states && filter_states.length==0) {
    filter_states=null
  }
  else {
    filter_states = filter_states.toString();
  }
  // console.log('request came',{search_type, query, mark, page})
   return function(dispatch) {
         axios.get(`${ROOT_URL}/api/new_search/`,{params: {search_type:search_type, query:query, mark:mark, search_base:search_base, fuzzy_depth:fuzzy_depth, page:page, search_classes:search_classes,flash_flag:flash_flag, filter_trademark_status:filter_trademark_status,filter_trademark_type:filter_trademark_type, filter_flag:filter_flag,filter_classes:filter_classes, filter_states:filter_states, filter_similarity:filter_similarity, filter_usage_date:filter_usage_date, filter_application_date}, 
      headers: {Authorization:'Token '+ localStorage.getItem('token')}
    })
            .then(response => {
              console.log('Search flash wild response:', response);
              if(response.data.proprietors) {
                browserHistory.push('/proprietor/'+response.data.proprietors[0].id)
              } 
              else {
                dispatch({type: SEARCH_RESULTS_FLASH_INITIALS_PAGI , payload: response.data}); 
                // browserHistory.push('/result/'+localStorage.getItem('mark_term'));
              }   
              
            })
            .catch(err => {
                // console.log('result pagination err:', err)
                if(err.response.status==404) {
                  dispatch({type: PAGI_ERROR_INITIALS , payload: true});
                }
            });
   }
}

/*----------------------------------------
           ADD MARK 
------------------------------------------*/
export function flashInitialsSearchPagi ({search_type, query, mark, search_base, search_classes, fuzzy_depth, page, flash_flag}) {

  // console.log('request came',{search_type, query, mark, page})
   return function(dispatch) {
         axios.get(`${ROOT_URL}/api/new_search/`,{params: {search_type:search_type, query:query, mark:mark, search_base:search_base, fuzzy_depth:fuzzy_depth, page:page, search_classes:search_classes,flash_flag:flash_flag}, 
      headers: {Authorization:'Token '+ localStorage.getItem('token')}
    })
            .then(response => {
              console.log('Search flash wild response:', response);
              if(response.data.proprietors) {
                browserHistory.push('/proprietor/'+response.data.proprietors[0].id)
              } 
              else {
                dispatch({type: SEARCH_RESULTS_FLASH_INITIALS_PAGI , payload: response.data}); 
                // browserHistory.push('/result/'+localStorage.getItem('mark_term'));
              }   
              
            })
            .catch(err => {
                // console.log('result pagination err:', err)
                if(err.response.status==404) {
                  dispatch({type: PAGI_ERROR_INITIALS , payload: true});
                }
            });
   }
}


/*----------------------------------------
           EXPAND ID SEARCH
------------------------------------------*/
export function ExpandIdSearch ({stack, search_type, query, mark, search_base, search_classes, fuzzy_depth, page}) {

  console.log('request came',{stack})
   return function(dispatch) {
         axios.get(`${ROOT_URL}/api/search/`,{params: {stack:stack, search_type:search_type, query:query, mark:mark, search_base:search_base, fuzzy_depth:fuzzy_depth, page:page, search_classes:search_classes}, 
      headers: {Authorization:'Token '+ localStorage.getItem('token')}
    })
            .then(response => {
              console.log('Search response:', response.data);
                dispatch({type: EXPAND_ID_RESULTS , payload: response.data}); 
                browserHistory.push('/result/'+localStorage.getItem('mark_term'));
              
            })
            .catch(() => {
                
            }
            );
   }
}



/*----------------------------------------
           GLOBAL SEARCH
------------------------------------------*/
export function GlobalSearch ({search_type, query, mark, search_base, search_classes, fuzzy_depth, page}) {

   // if(filter_similarity){
   //  filter_similarity=filter_similarity.replace('-','to');
   // }
  // console.log('request came',{search_type, query, mark, page})
   return function(dispatch) {
         axios.get(`${ROOT_URL}/api/search/`,{params: {search_type:search_type, query:query, mark:mark, search_base:search_base, fuzzy_depth:fuzzy_depth, page:page, search_classes:search_classes}, 
      headers: {Authorization:'Token '+ localStorage.getItem('token')}
    })
            .then(response => {
              // console.log('Search response:', response.data);
                dispatch({type: SEARCH_RESULTS , payload: response.data}); 
                browserHistory.push('/result/'+localStorage.getItem('mark_term'));
              
            })
            .catch(() => {
                
            });
   }
}

/*----------------------------------------
           ADD MARK 
------------------------------------------*/
export function GlobalSearchRe ({search_type, query, mark, search_base,fuzzy_depth, search_classes,page}) {
  
  // console.log('request came',{search_type, query, mark})
   return function(dispatch) {
         axios.get(`${ROOT_URL}/api/new_search/`,{params: {search_type:search_type, query:query, mark:mark, search_base:search_base, fuzzy_depth:fuzzy_depth, page:page, search_classes:search_classes}, 
      headers: {Authorization:'Token '+ localStorage.getItem('token')}
    })
            .then(response => {
              
              dispatch({type: SEARCH_RESULTS , payload: response.data}); 
            })
            .catch(() => {
                
            });
   }
}

/*----------------------------------------
           ADD MARK 
------------------------------------------*/
export function GlobalSearchFilterPagi ({search_type, query, mark, search_base, search_classes, fuzzy_depth, page, filter_flag, filter_classes, filter_trademark_status, filter_trademark_type, filter_states, filter_similarity, filter_usage_date, filter_application_date}) {
  if(filter_trademark_status && filter_trademark_status.length==0) {
    filter_trademark_status=null
  }
  else {
    filter_trademark_status = filter_trademark_status.toString();
  }
  if(filter_trademark_type && filter_trademark_type.length==0) {
    filter_trademark_type=null
  }
  else {
    filter_trademark_type = filter_trademark_type.toString();
  }
  if(filter_classes && filter_classes.length==0) {
    filter_classes=null
  }
  else {
    filter_classes = filter_classes.toString();
  }

  if(filter_states && filter_states.length==0) {
    filter_states=null
  }
  else {
    filter_states = filter_states.toString();
  }
  // console.log('request came',{search_type, query, mark, page})
   return function(dispatch) {
         axios.get(`${ROOT_URL}/api/new_search/`,{params: {search_type:search_type, query:query, mark:mark, search_base:search_base, fuzzy_depth:fuzzy_depth, page:page, search_classes:search_classes,filter_trademark_status:filter_trademark_status,filter_trademark_type:filter_trademark_type, filter_flag:filter_flag,filter_classes:filter_classes, filter_states:filter_states, filter_similarity:filter_similarity, filter_usage_date:filter_usage_date, filter_application_date}, 
      headers: {Authorization:'Token '+ localStorage.getItem('token')}
    })
            .then(response => {
             // console.log('result pagination:', response);  
              dispatch({type: SEARCH_RESULTS_PAGI , payload: response.data}); 
            })
            .catch(err => {
                // console.log('result pagination err:', err)
                if(err.response.status==404) {
                  dispatch({type: PAGI_ERROR , payload: true});
                }
            });
   }
}

/*----------------------------------------
           GLOBAL SEARCH PAGI 
------------------------------------------*/
export function GlobalSearchPagi ({search_type, query, mark, search_base, search_classes, fuzzy_depth, page}) {
  
  // console.log('request came',{search_type, query, mark, page})
   return function(dispatch) {
         axios.get(`${ROOT_URL}/api/new_search/`,{params: {search_type:search_type, query:query, mark:mark, search_base:search_base, fuzzy_depth:fuzzy_depth, page:page, search_classes:search_classes}, 
      headers: {Authorization:'Token '+ localStorage.getItem('token')}
    })
            .then(response => {
             // console.log('result pagination:', response);  
              dispatch({type: SEARCH_RESULTS_PAGI , payload: response.data}); 
            })
            .catch(err => {
                // console.log('result pagination err:', err)
                if(err.response.status==404) {
                  dispatch({type: PAGI_ERROR , payload: true});
                }
            });
   }
}


/*----------------------------------------
           PROPRIETOR Mark SEARCH
------------------------------------------*/
export function ProprietorMarkSearch (id) {
  // console.log('Prop request came',id)
   return function(dispatch) {
         axios.get(`${ROOT_URL}/api/proprietors/${id}/marks/`,{
      headers: {Authorization:'Token '+ localStorage.getItem('token')}  
    })
            .then(response => {
              // console.log('Proprietor Mark Search response:', response);      
              dispatch({type: PROPRIETOR_MARKS , payload: response.data}); 
            })
            .catch(() => {
                
            });
   }
}

/*----------------------------------------
           PROPRIETOR Mark SEARCH
------------------------------------------*/
export function ProprietorFilterSearch ({query}) {
  // console.log('Prop request came',{query})
   return function(dispatch) {
         axios.get(`${ROOT_URL}/api/proprietors/`,{params: {query:query}, 
      headers: {Authorization:'Token '+ localStorage.getItem('token')}
    })
            .then(response => {
              // console.log('Proprietor Filter Search response:', response);      
              dispatch({type: PROPRIETOR_FILTERED_RESULT , payload: response.data}); 
            })
            .catch(() => {
                
            });
   }
}


/*----------------------------------------
           PROPRIETOR SEARCH
------------------------------------------*/
export function ProprietorSearch (id) {
  // console.log('Prop request came',id)
   return function(dispatch) {
         axios.get(`${ROOT_URL}/api/proprietors/${id}/`,{
      headers: {Authorization:'Token '+ localStorage.getItem('token')}  
    })
            .then(response => {
              // console.log('Proprietor Search response:', response);      
              dispatch({type: PROPRIETOR_RESULT , payload: response.data});
             
            })
            .catch(() => {
                
            });
   }
}

/*----------------------------------------
           PROPRIETOR SEARCH
------------------------------------------*/
export function RedirectToProprietor (id) {
 window.open('/proprietor/'+id, '_blank')
   
}

/*----------------------------------------
           PROPRIETOR OPPOSED SEARCH
------------------------------------------*/
export function ProprietorOpposedMark (id) {
  // console.log('Prop request came',id)
   return function(dispatch) {
         axios.get(`${ROOT_URL}/api/proprietors/${id}/marks_opposed/`,{
      headers: {Authorization:'Token '+ localStorage.getItem('token')}  
    })
            .then(response => {
              // console.log('Proprietor Opposed response:', response);      
              dispatch({type: PROPRIETOR_OPPOSED_MARK , payload: response.data}); 
            })
            .catch(() => {
                
            });
   }
}


/*----------------------------------------
           APPLICATION SEARCH
------------------------------------------*/
export function application_search (application_number) {
  // console.log('Prop request came',id)
   return function(dispatch) {
         axios.get(`${ROOT_URL}/api/trademark/search/${application_number}/`,{
      headers: {Authorization:'Token '+ localStorage.getItem('token')}  
    })
            .then(response => {
              // console.log('Mark profile response:', response);
                    
              dispatch({type: APPLICATION_NUMBER_SEARCH , payload:{response:response.data,app_state:true}}); 
            })
            .catch((error) => {
              console.log('error pk:',error.response);
              
                  dispatch({type: APPLICATION_NUMBER_SEARCH_ERROR , payload: false});
          
            });
   }
}

/*----------------------------------------
          RESET STATE
------------------------------------------*/
export function ResetAppSearch() {
    return {
      type: RESET_APP_SEARCH_STATE
   }
}

/*----------------------------------------
          RESET STATE
------------------------------------------*/
export function ResetSearchResults() {
    return {
      type: RESET_SEARCH_RESULTS
   }
}




/*----------------------------------------
          RESET STATE
------------------------------------------*/
export function reset_mark_profile() {
    return {
      type: RESET_MARK_PROFILE
   }
}



/*----------------------------------------
           PROPRIETOR SEARCH
------------------------------------------*/
export function TrademarkDetail (id, realtime) {
  // console.log('Prop request came',id)
   return function(dispatch) {
         axios.get(`${ROOT_URL}/api/trademarks/${id}/?realtime=yes`,{
      headers: {Authorization:'Token '+ localStorage.getItem('token')}  
    })
            .then(response => {
              // console.log('Mark profile response:', response);
                    
              dispatch({type: TRADEMARK_SINGLE , payload: response.data}); 
            })
            .catch(() => {
                
            });
   }
}

/*----------------------------------------
           PROPRIETOR OLD SEARCH
------------------------------------------*/
export function TrademarkOldData (id) {
  // console.log('Prop request came',id)
   return function(dispatch) {
         axios.get(`${ROOT_URL}/api/trademarks/${id}/`,{
      headers: {Authorization:'Token '+ localStorage.getItem('token')}  
    })
            .then(response => {
              // console.log('Mark profile response:', response);      
              dispatch({type: TRADEMARK_SINGLE , payload: response.data}); 
            })
            .catch(() => {
                
            });
   }
}

/*----------------------------------------
           ADD TO REPORT
------------------------------------------*/
export function addToReport ({mark, selected_marks,urgent}) {
  // console.log('Prop request came',{mark, selected_marks})
   return function(dispatch) {
         axios.post(`${ROOT_URL}/api/reports/`,{mark, selected_marks,urgent}, {
      headers: {Authorization:'Token '+ localStorage.getItem('token')}
    })
            .then(response => {
              // console.log('Add report response:', response);
              browserHistory.push('/report_set');
              // dispatch({type: FETCH_REPORT , payload: response.data}); 
            })
            .catch(() => {
                
            });
   }
}

/*----------------------------------------
           ADD TO REPORT Patch
------------------------------------------*/
export function appendReport ({id, selected_marks, selection_type,urgent}) {
  // console.log('Prop request came',{selected_marks})
   return function(dispatch) {
         axios.patch(`${ROOT_URL}/api/reports/${id}/`,{selected_marks, selection_type,urgent}, {
      headers: {Authorization:'Token '+ localStorage.getItem('token')}
    })
            .then(response => {
              // console.log('Add report patch response:', response);  
              browserHistory.push('/report_set');    
              // dispatch({type: FETCH_REPORT , payload: response.data}); 
            })
            .catch(() => {
                
            });
   }
}

/*----------------------------------------
           ADD TO REPORT
------------------------------------------*/
export function deleteReportMark ({id, selected_marks, selection_type}) {
  // console.log('Prop request came',{selected_marks})
   return function(dispatch) {
         axios.patch(`${ROOT_URL}/api/reports/${id}/`,{selected_marks, selection_type}, {
      headers: {Authorization:'Token '+ localStorage.getItem('token')}
    })
            .then(response => {
              // console.log('Delete report response:', response);  
              // browserHistory.push('/report_set');    
              dispatch({type: FETCH_SINGLE_REPORT , payload: response.data}); 
            })
            .catch(() => {
                
            });
   }
}


// /*----------------------------------------
//            DELETE Report
// ------------------------------------------*/
// export function deleteReportMark ({mark, selected_marks}) {
//   console.log('Prop request came',{mark, selected_marks})
//    return function(dispatch) {
//          axios.get(`${ROOT_URL}/api/reports/`,{params: {mark:mark, selected_marks:selected_marks}, 
//       headers: {Authorization:'Token '+ localStorage.getItem('token')}
//     })
//             .then(response => {
//               console.log('Add report response:', response);      
//               dispatch({type: FETCH_REPORT , payload: response.data}); 
//             })
//             .catch(() => {
                
//             });
//    }
// }


/*----------------------------------------
           GET REPORT
------------------------------------------*/
export function fetchReport (id) {
  // console.log('id rep:',id)
   return function(dispatch) {
         axios.get(`${ROOT_URL}/api/reports/${id}/`, {
      headers: {Authorization:'Token '+ localStorage.getItem('token')}  
    })
            .then(response => {
              // console.log('Delete mark report response:', response);      
              dispatch({type: FETCH_REPORT , payload: response.data}); 
              browserHistory.push('/report/'+response.data.id);
            })
            .catch(() => {
                
            });
   }
}

/*----------------------------------------
           GET REPORT
------------------------------------------*/
export function fetchSingleReport (id) {
  // console.log('id rep:',id)
   return function(dispatch) {
         axios.get(`${ROOT_URL}/api/reports/${id}/`, {
      headers: {Authorization:'Token '+ localStorage.getItem('token')}  
    })
            .then(response => {
              // console.log('Delete mark report response:', response);      
              dispatch({type: FETCH_SINGLE_REPORT , payload: response.data}); 
              browserHistory.push('/report/'+response.data.id);
            })
            .catch(() => {
                
            });
   }
}

/*----------------------------------------
           GET REPORT
------------------------------------------*/
export function fetchReportRe (id) {
  // console.log('id rep:',id)
   return function(dispatch) {
         axios.get(`${ROOT_URL}/api/reports/${id}/`, {
      headers: {Authorization:'Token '+ localStorage.getItem('token')}  
    })
            .then(response => {
              // console.log('Delete mark report response:', response);      
              dispatch({type: FETCH_SINGLE_REPORT , payload: response.data}); 
              // browserHistory.push('/report/'+response.data.id);
            })
            .catch(() => {
                
            });
   }
}


/*----------------------------------------
           GET REPORT
------------------------------------------*/
export function fetchReportSet () {
  // console.log('fetchReportSet called');
   return function(dispatch) {
         axios.get(`${ROOT_URL}/api/reports/`, {
          headers: {Authorization:'Token '+ localStorage.getItem('token')}  
        })
            .then(response => {
              // console.log('Fetch report response:', response);      
              dispatch({type: FETCH_REPORT , payload: response.data}); 
                  // fetchReportSetPoll();
            })
            .catch(() => {
                
            });
   }
}



/*----------------------------------------
           GET REPORT
------------------------------------------*/
export function fetchClasses () {

   return function(dispatch) {
         axios.get(`${ROOT_URL}/api/trademark_classes/`, {
      headers: {Authorization:'Token '+ localStorage.getItem('token')}
    })
            .then(response => {
              // console.log('Fetch class response:', response);      
              dispatch({type: FETCH_CLASSES , payload: response.data.classes}); 
            })
            .catch(() => {
                
            });
   }
}


/*----------------------------------------
           CONTACT US
------------------------------------------*/
export function contactUs (message) {
   return function(dispatch) {
         axios.post(`${ROOT_URL}/api/contact_us/`,{message}, {
      headers: {Authorization:'Token '+ localStorage.getItem('token')}
    })
            .then(response => {
              // console.log('Add report response:', response);      
            })
            .catch(() => {
                
            });
   }
}




/*----------------------------------------
           PDF DOWNLOAD
------------------------------------------*/
export function reportDownload (id,title) {
   return function(dispatch) {
         axios.post(`${ROOT_URL}/api/reports/${id}/pdf/`, {id}, {
      headers: {Authorization:'Token '+ localStorage.getItem('token')}
    })
            .then(response => {
              console.log('dowload report response:', response);  
            // FileSaver.saveAs(response.data, optional DOMString filename, optional Boolean disableAutoBOM)
              // var link = document.createElement("a");
              // link.download = title+'.pdf';
              // link.href = response.data;
              // link.click();
              // console.log('link:',link);
              // fileDownload(response.data,title+'.pdf' ); 
              // var blob = new Blob(response.data, {type: "text/plain;charset=utf-8"}); 
              var file = new File([response.data],title+'.pdf' , {type: "application/octet-stream"});
              FileSaver.saveAs(file);
            })
            .catch(() => {
                
            });
   }
}

/*----------------------------------------
           PDF DOWNLOAD
------------------------------------------*/
export function downloadExcel (id,title) {
   return function(dispatch) {
         axios.get(`${ROOT_URL}/api/reports/${id}/excel/`, {id}, {
      headers: {Authorization:'Token '+ localStorage.getItem('token')}
    })
            .then(response => {
              console.log('dowload report response:', response);  
            // FileSaver.saveAs(response.data, optional DOMString filename, optional Boolean disableAutoBOM)
              // var link = document.createElement("a");
              // link.download = title+'.pdf';
              // link.href = response.data;
              // link.click();
              // console.log('link:',link);
              //fileDownload(response.data,title+'.xlsx' ); 
              // var blob = new Blob(response.data, {type: "text/plain;charset=utf-8"});  
              // window.open(`https://tmsearchapi.mikelegal.com/api/reports/${id}/excel/`, '_blank');
              // var file = new File([response.data],title+'.xlsx',{type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
              // // saveAs(file, "Report.xlsx");
              // FileSaver.saveAs(file);
            })
            .catch(() => {
                
            });
   }
}



// /*----------------------------------------
//            GET REPORT
// ------------------------------------------*/
// export function classItem ({query}) {

//    return function(dispatch) {
//          axios.get(`${ROOT_URL}/api/trademark_classes/`, {
//       headers: {Authorization:'Token '+ localStorage.getItem('token')}
//     })
//             .then(response => {
//               console.log('Fetch class response:', response);      
//               dispatch({type: FETCH_CLASSES , payload: response.data.classes}); 
//             })
//             .catch(() => {
                
//             });
//    }
// }

/*----------------------------------------
           PROPRIETOR SEARCH
------------------------------------------*/
export function classItem ({query}) {
  // console.log('Prop request came',{query})
   return function(dispatch) {
         axios.get(`${ROOT_URL}/api/trademark_class_items/`,{params: {query:query}, 
      headers: {Authorization:'Token '+ localStorage.getItem('token')}
    })
            .then(response => {
              // console.log('Class Item response:', response);      
              dispatch({type: FETCH_CLASS_ITEM , payload: response.data}); 
            })
            .catch(() => {
                
            });
   }
}



/*----------------------------------------
           GET REPORT
------------------------------------------*/
export function deleteReport ({id}) {
  // console.log('delete report:', {id});
   return function(dispatch) {
         axios.delete(`${ROOT_URL}/api/reports/${id}/`, {data: {id:id}, 
      headers: {Authorization:'Token '+ localStorage.getItem('token')}
    })
            .then(response => {
              // console.log('Delete report response:', response);      
              dispatch({type: DELETE_REPORT_RESPONSE , payload: {response:response.data, id:id}}); 
            })
            .catch(() => {
                
            });
   }
}

/*----------------------------------------
           GET vulnerability
------------------------------------------*/
export function vulnerability (id) {
  // console.log('id rep:',id)
   return function(dispatch) {
         axios.get(`${ROOT_URL}/api/marks/${id}/vulnerability/ `, {
      headers: {Authorization:'Token '+ localStorage.getItem('token')}  
    })
            .then(response => {
              // console.log('Fetch vulnerability response:', response);      
              dispatch({type: FETCH_VULNERABILITY , payload: response.data}); 
            })
            .catch(() => {
                
            });
   }
}


/*----------------------------------------
           GET specific mark
------------------------------------------*/
// export function searchForMark ({search}) {

//   console.log('request came',{search});
//    return function(dispatch) {
//         axios.get(`${ROOT_URL}/api/new_search/`,{params: {search:search}, 
//         headers: {Authorization:'Token '+ localStorage.getItem('token')}
//     })
//             // .then(response => {
//             //   console.log('Search flash wild response:', response);
//             //   if(response.data.proprietors) {
//             //     browserHistory.push('/proprietor/'+response.data.proprietors[0].id)
//             //   } 
//             //   else {
//             //     dispatch({type: SEARCH_RESULTS_FLASH_INITIALS_PAGI , payload: response.data}); 
//             //     // browserHistory.push('/result/'+localStorage.getItem('mark_term'));
//             //   }   
              
//             // })
//             // .catch(err => {
//             //     // console.log('result pagination err:', err)
//             //     if(err.response.status==404) {
//             //       dispatch({type: PAGI_ERROR_INITIALS , payload: true});
//             //     }
//             // });
//    }
// }

/*----------------------------------------
           GLOBAL SEARCH FILTER 
------------------------------------------*/
export function GlobalSearchFilter ({search_query,search_type, query, mark, search_base, search_classes, fuzzy_depth, page, filter_flag, filter_classes, filter_trademark_status, filter_trademark_type, filter_states, filter_similarity, filter_usage_date, filter_application_date}) {
  // console.log('filter_similarity:',filter_classes);  
  if(search_query && search_query.length==0) {
    search_query=null
  }
  else {
    search_query = search_query;
  }
  if(filter_trademark_status && filter_trademark_status.length==0) {
    filter_trademark_status=null
  }
  else {
    filter_trademark_status = filter_trademark_status.toString();
  }
  if(filter_trademark_type && filter_trademark_type.length==0) {
    filter_trademark_type=null
  }
  else {
    filter_trademark_type = filter_trademark_type.toString();
  }
  if(filter_classes && filter_classes.length==0) {
    filter_classes=null
  }
  else {
    filter_classes = filter_classes.toString();
  }

  if(filter_states && filter_states.length==0) {
    filter_states=null
  }
  else {
    filter_states = filter_states.toString();
  }


   // if(filter_similarity){
   //  filter_similarity=filter_similarity.replace('-','to');
   // }
  console.log('request came',{search_query,search_type, query, mark, page})
   return function(dispatch) {
         axios.get(`${ROOT_URL}/api/new_search/`,{params: {search_term:search_query,search_type:search_type, query:query, mark:mark, search_base:search_base, fuzzy_depth:fuzzy_depth, page:page, search_classes:search_classes,filter_trademark_status:filter_trademark_status,filter_trademark_type:filter_trademark_type, filter_flag:filter_flag,filter_classes:filter_classes, filter_states:filter_states, filter_similarity:filter_similarity, filter_usage_date:filter_usage_date, filter_application_date}, 
      headers: {Authorization:'Token '+ localStorage.getItem('token')}
    })
            .then(response => {
              // console.log('Search response:', response.data.class_dist);
              if(response.data.proprietors) {
                browserHistory.push('/proprietor/'+response.data.proprietors[0].id)
              } 
              else {
                dispatch({type: SEARCH_RESULTS , payload: response.data}); 
                browserHistory.push('/result/'+localStorage.getItem('mark_term'));
              }   
              
            })
            .catch(() => {
                
            });
   }
}


/*----------------------------------------
           GLOBAL FLASH SEARCH FILTER 
------------------------------------------*/
export function GlobalFlashSearchFilter ({search_query,search_type, query, mark, search_base, search_classes, fuzzy_depth, page,flash_flag,filter_flag, filter_classes, filter_trademark_status, filter_trademark_type, filter_states, filter_similarity, filter_usage_date, filter_application_date}) {

  if(search_query && search_query.length==0) {
    search_query=null
  }
  else {
    search_query = search_query;
  }
  if(filter_trademark_status && filter_trademark_status.length==0) {
    filter_trademark_status=null
  }
  else {
    filter_trademark_status = filter_trademark_status.toString();
  }
  if(filter_trademark_type && filter_trademark_type.length==0) {
    filter_trademark_type=null
  }
  else {
    filter_trademark_type = filter_trademark_type.toString();
  }
  if(filter_classes && filter_classes.length==0) {
    filter_classes=null
  }
  else {
    filter_classes = filter_classes.toString();
  }

  if(filter_states && filter_states.length==0) {
    filter_states=null
  }
  else {
    filter_states = filter_states.toString();
  }

  // console.log('request came',{search_type, query, mark, page})
   return function(dispatch) {
         axios.get(`${ROOT_URL}/api/new_search/`,{params: {search_term:search_query,search_type:search_type, query:query, mark:mark, search_base:search_base, fuzzy_depth:fuzzy_depth, page:page, search_classes:search_classes,flash_flag:flash_flag,filter_trademark_status:filter_trademark_status,filter_trademark_type:filter_trademark_type, filter_flag:filter_flag,filter_classes:filter_classes, filter_states:filter_states, filter_similarity:filter_similarity, filter_usage_date:filter_usage_date, filter_application_date}, 
      headers: {Authorization:'Token '+ localStorage.getItem('token')}
    })
            .then(response => {
              console.log('Search flash wild response:', response);
              if(response.data.proprietors) {
                browserHistory.push('/proprietor/'+response.data.proprietors[0].id);
              } 
              else {
                dispatch({type: SEARCH_RESULTS , payload: response.data}); 
                
                localStorage.setItem('flash_result_flash',true);
                if(localStorage.getItem('fuzzy_result_flash')=='true'){
                  browserHistory.push('/flash_result/'+localStorage.getItem('mark_term'));
                }
              }   
              
            })
            .catch(() => {
                
            });
   }
}




// export function searchForMark ({search_query,page,search_type,search_base,mark,search_classes,filter_flag, filter_classes, filter_trademark_status, filter_trademark_type, filter_states, filter_similarity}) {

//    if(filter_trademark_status && filter_trademark_status.length==0) {
//     filter_trademark_status=null
//   }
//   else {
//     filter_trademark_status = filter_trademark_status.toString();
//   }
//   if(filter_trademark_type && filter_trademark_type.length==0) {
//     filter_trademark_type=null
//   }
//   else {
//     filter_trademark_type = filter_trademark_type.toString();
//   }
//   if(filter_classes && filter_classes.length==0) {
//     filter_classes=null
//   }
//   else {
//     filter_classes = filter_classes.toString();
//   }

//   if(filter_states && filter_states.length==0) {
//     filter_states=null
//   }
//   else {
//     filter_states = filter_states.toString();
//   }
//   console.log('request came',{search_query,page,search_type,search_base,mark,search_classes,filter_flag, filter_classes, filter_trademark_status, filter_trademark_type, filter_states, filter_similarity});
//    return function(dispatch) {
//         axios.get(`${ROOT_URL}/api/new_search/`,{params: {search_term:search_query,page:page,search_type:search_type,search_base:search_base,mark:mark,search_classes:search_classes,filter_trademark_status:filter_trademark_status,filter_trademark_type:filter_trademark_type, filter_flag:filter_flag,filter_classes:filter_classes, filter_states:filter_states, filter_similarity:filter_similarity}, 
//         headers: {Authorization:'Token '+ localStorage.getItem('token')}
//     })
//             .then(response => {
//               // console.log('check response', response.data);
//               dispatch({type: SEARCH_RESULTS , payload: response.data}); 
//             })
//             .catch(() => {
                
//             });
//    }
// }



export function searchForMarkWildcard ({search_query,page,search_type,search_base,mark,search_classes}) {

  console.log('request came2',{search_query,page,search_type,search_base,mark,search_classes});
   return function(dispatch) {
        axios.get(`${ROOT_URL}/api/new_search/`,{params: {search_term:search_query,page:page,search_type:search_type,search_base:search_base,mark:mark,search_classes:search_classes}, 
        headers: {Authorization:'Token '+ localStorage.getItem('token')}
    })
            .then(response => {
              // console.log('check response', response.data);
              dispatch({type: SEARCH_RESULTS_FLASH_WILD , payload: response.data}); 
            })
            .catch(() => {
                
            });
   }
}


export function searchForMarkFuzzy ({search_query,page,fuzzy_depth,search_type,search_base,mark,search_classes}) {

  console.log('request came3',{search_query,page,search_type,search_base,mark,search_classes});
   return function(dispatch) {
        axios.get(`${ROOT_URL}/api/new_search/`,{params: {search_term:search_query,fuzzy_depth:fuzzy_depth,page:page,search_type:search_type,search_base:search_base,mark:mark,search_classes:search_classes}, 
        headers: {Authorization:'Token '+ localStorage.getItem('token')}
    })
            .then(response => {
              // console.log('check response', response.data);
              dispatch({type: SEARCH_RESULTS_FLASH_FUZZY , payload: response.data}); 
            })
            .catch(() => {
                
            });
   }
}


export function searchForMarkInitial ({search_query,page,search_type,search_base,mark,search_classes}) {

  console.log('request came4',{search_query,page,search_type,search_base,mark,search_classes});
   return function(dispatch) {
        axios.get(`${ROOT_URL}/api/new_search/`,{params: {search_term:search_query,page:page,search_type:search_type,search_base:search_base,mark:mark,search_classes:search_classes}, 
        headers: {Authorization:'Token '+ localStorage.getItem('token')}
    })
            .then(response => {
              // console.log('check response', response.data);
              dispatch({type: SEARCH_RESULTS_FLASH_INITIALS , payload: response.data}); 
            })
            .catch(() => {
                
            });
   }
}