import { combineReducers } from 'redux';
import expand_result from './expand_result';
import result from './result';
import authReducer from './auth_user';
import search from './search';
import mark_single from './mark_profile';
import report from './report';
import proprietor from './proprietor';
import profile from './profile';
import error from './error';

const rootReducer = combineReducers({
   result: result,
   expand_result: expand_result,
   auth: authReducer,
   search: search,
   mark_single:	mark_single,
   report:report,
   proprietor: proprietor,
   error:error,
   profile:profile
});

export default rootReducer;
