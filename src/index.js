import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory, applyRouterMiddleware } from 'react-router';
import Search from './components/search';
import Result from './components/result';
import FlashResult from './components/flash_result';
import Report from './components/report';
import PropTheme from './components/prop_theme';
import MarkProfile from './components/mark_profile';
import SignUp from './components/signup';
import SignIn from './components/signin';
import { useScroll } from 'react-router-scroll';
import ProfilePage from './components/profile_page';
import RequireAuth from './components/auth';
import { AUTH_USER } from './actions/type';
import ReportSet from './components/report_set';
import Test from'./components/test';
import Intro from './components/intro';
import Maintenance from './components/maintenance';

import { loadState, saveState } from './localStorage';
import reduxThunk from 'redux-thunk';
import App from './components/app';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const persistedState = loadState();
const store = createStoreWithMiddleware(reducers, persistedState);

const token = localStorage.getItem('token');

if(token) {
   store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} render={applyRouterMiddleware(useScroll())}>
      <Route path="/" component={App}>
      <IndexRoute component={SignIn} />
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="search" component={RequireAuth(Search)} />
      <Route path="result/:text" component={RequireAuth(Result)} />
      <Route path="flash_result/:text" component = {RequireAuth(FlashResult)} />
      <Route path="report/:text" component={RequireAuth(Report)} />
      <Route path="proprietor/:text" component={RequireAuth(PropTheme)} />
      <Route path="mark_profile/:text" component={RequireAuth(MarkProfile)} />
      <Route path="profile_page" component={RequireAuth(ProfilePage)} />
      <Route path="report_set" component={RequireAuth(ReportSet)} />
      <Route path="intro" component = {RequireAuth(Intro)} />
      <Route path="test" component={Test} />
      <Route path="maintenance" component={Maintenance} />
      </Route>
    </Router>  
  </Provider>
  , document.querySelector('.mike'));
