import { AUTH_USER, UNAUTH_USER } from '../actions/type';

export default function(state = {}, action) {
	switch(action.type) {
       case AUTH_USER:
          return { ...state, error:'', authenticated: true };
       case UNAUTH_USER:
          return { ...state, authenticated: false };
	}

	return state;
}