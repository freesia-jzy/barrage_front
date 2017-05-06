/**
 * Created by stonehx on 16-11-17.
 */
import React from 'react';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import App from '../components/Main';
import Auth from '../components/auth';
import Login from '../components/auth/content/login'
import Register from '../components/auth/content/register';
import ForgetPass from '../components/auth/content/forgetPass';
import ReSendEmail from '../components/auth/content/reSendEmail';
import EmailSendSuccess from '../components/auth/content/emailSendSuccess';
import Home from '../components/home';
import Select from '../components/home/content/select';
import BulletScreen from '../components/home/content/bulletScreen';
import Wall from '../components/home/content/wall';
import RevisePass from '../components/home/content/revisePass';

function RouterApp() {
  return (
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route path="auth" component={Auth}>
          <Route path="login" component={Login}/>
          <Route path="register" component={Register}/>
          <Route path="forgetPass" component={ForgetPass}/>
          <Route path="reSendEmail" component={ReSendEmail}/>
          <Route path="emailSendSuccess" components={EmailSendSuccess}/>
        </Route>
        <Route path="home" component={Home}>
          <Route path="select" component={Select}/>
          <Route path="bulletScreen" component={BulletScreen}/>
          <Route path="wall" component={Wall}/>
          <Route path="revisePass" components={RevisePass}/>
        </Route>
      </Route>
    </Router>
  )
}

export default RouterApp;
