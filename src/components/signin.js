import React, { Component } from 'react';
import {FormGroup, Modal, Popover, Tooltip, OverlayTrigger, FormControl, Col, ControlLabel, DropdownButton, MenuItem, Checkbox, Navbar, Nav, NavItem, Button, ButtonGroup} from 'react-bootstrap';
import  _  from 'lodash';
import Select from 'react-select';
import { browserHistory, Link } from 'react-router';
import * as casesAction  from '../actions/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Highcharts from 'highcharts/highstock';
var ReactHighcharts = require('react-highcharts');
var Highlight = require('react-highlight');
var HighchartsMore = require('highcharts-more');
HighchartsMore(ReactHighcharts.Highcharts);
import AlertContainer from 'react-alert';


class SignIn extends Component {

  alertOptions = {
    offset: 14,
    position: 'top right',
    theme: 'dark',
    time: 3000,
    transition: 'scale'
  }


  constructor(props) {
    super(props);

    this.state = {
      userName:'',
      userPass:'',
      validate: false,
      sliding:false,
      alertOptions:{
                  offset: 14,
                  position: 'top right',
                  theme: 'dark',
                  time: 3000,
                  transition: 'scale'
                }
    }
  }

  componentWillMount() {
    setTimeout(()=>{
         this.setState({sliding:true});
       }, 1000);

    this.props.casesAction.checkSearchApi();
  }

  handleUserName() {
  this.setState({userName:this.refs.user_email.value});
  // console.log('this.refs.user_email.value:',this.refs.user_email.value.length);
  }

   handleUserPass() {
   this.setState({userPass:this.refs.user_password.value});
  }



  
  handleSubmit() {
    // console.log('email:', this.refs.user_email.value);
    if(this.refs.user_email.value.length>0 && this.refs.user_password.value.length>0) {
        this.props.casesAction.signinUser({username:this.refs.user_email.value, password:this.refs.user_password.value});
      }
    this.setState({validate:true});
     setTimeout(()=>{
       if(this.props.error) {
    if(this.props.error.non_field_errors[0]) {
      this.showAlert(this.props.error.non_field_errors[0], 'error')
    }
  };
      }, 500);
    
  }

  handleKeyDown(e) {
    if(e.keyCode==13) {
      if(this.refs.user_email.value.length>0 && this.refs.user_password.value.length>0) {
        this.props.casesAction.signinUser({username:this.refs.user_email.value, password:this.refs.user_password.value});
      }
      
       this.setState({validate:true});
       setTimeout(()=>{
       if(this.props.error) {
    if(this.props.error.non_field_errors[0]) {
      this.showAlert(this.props.error.non_field_errors[0], 'error')
    }
  };
      }, 500);
    }
  }

  showAlert = (message, type) => {
    this.msg.show(message, {
      time: 3000,
      type: type
    })
  }

  handleForgotPassword() {
    window.open('https://tmwatchapi.mikelegal.com/accounts/password/reset/', '_blank');
  }

  render() {

    
 
    return (
      <div className="container-fluid signup">
       <div className="row">
        <div className="col-sm-12 text-center">
          <div className="row">
            <div className="col-sm-12 signup-heading">
              <h4>Welcome to the future of trademark search</h4>
            </div>
          </div>
         
            <div className="sign-up-form col-sm-3 col-sm-offset-4">
             <form class="form-horizontal">
              <div class="form-group">
                <div class="col-sm-12">
                  <input ref="user_email" onKeyDown={this.handleKeyDown.bind(this)} onChange={this.handleUserName.bind(this)} type="text" class="form-control" id="email" placeholder="Email" />
                </div>
                {!this.state.userName.length>0 && this.state.validate && <Popover
                                  id="popover-basic"
                                  placement="bottom"
                                  positionLeft={50}
                                  positionTop={90}
                                >
                                  Please Enter Your Email
                                </Popover>}
              </div>
              <div class="form-group">
                <div class="col-sm-12">
                  <input ref="user_password" onKeyDown={this.handleKeyDown.bind(this)} onChange={this.handleUserPass.bind(this)} type="password" class="form-control" id="pass" placeholder="Password" />
                </div>
                {this.state.userName.length>0 && !this.state.userPass.length>0 && this.state.validate && <Popover
                                  id="popover-basic"
                                  placement="bottom"
                                  positionLeft={50}
                                  positionTop={155}
                                >
                                  Please Enter Your Password
                                </Popover>}
              </div>
              <div class="form-group">
                <div class="col-sm-offset-2 col-sm-10">
                  <Button onClick={this.handleSubmit.bind(this)} class="btn btn-primary">Sign in</Button>
                </div>
              </div>
              <div style={{textAlign:'right'}} >
                <p onClick={()=> {this.handleForgotPassword()}} style={{color:'#4285f4',cursor:'pointer',marginTop:'10px'}} >Forgot Password?</p>
              </div>
              <div>
                <p>Don't have an account?<Link to="/signup"> Sign up</Link></p>
              </div>
            </form> 
         </div>
         <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
         <div className="row">
          <div style={{textAlign:'center',height:'10px', bottom:'0 !import'}}>
              <h4 style={{background:''}} className={this.state.sliding?"col-sm-12 signin-bottom":"col-sm-12 signin-bottom-nav"} >Supported browsers are: Google Chrome, Mozilla Firefox, Safari 10.0+</h4>
          </div>
         </div>
       </div>
      </div>
     </div> 
  	)
}
}

function mapStateToProps(state) {
  // console.log('State check:', state);
   return ({ error:state.error.error});
}

function mapDispatchToProps(dispatch) {
  return  {
      casesAction: bindActionCreators(casesAction, dispatch)
    };
  
}
export default connect(mapStateToProps,mapDispatchToProps)(SignIn);