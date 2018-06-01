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


class SignUp extends Component {

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
      userMail:'',
      userPass1:'',
      userPass2:'',
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

    showAlert = (message, type) => {
    this.msg.show(message, {
      time: 3000,
      type: type
    })
  }
  
  componentWillMount() {
    setTimeout(()=>{
         this.setState({sliding:true});
       }, 1000);
  }

  handleSubmit() {
    if(this.state.userName.length>0) {
       this.props.casesAction.signupUser ({ name:this.refs.user_name.value, email:this.refs.user_email.value, password1:this.refs.user_pass1.value, password2:this.refs.user_pass2.value })
    }


       this.setState({validate:true})
      

   setTimeout(()=>{
         if(this.props.error) {
    if(this.props.error.email) {
      this.showAlert(this.props.error.email[0], 'error')
    }
  };

  if(this.props.error) {
    if(this.props.error.password1) {
      this.showAlert(this.props.error.password1[0], 'error')
    }
  };
      }, 500);

   
  }

  handleUserName() {
  this.setState({userName:this.refs.user_name.value});
  }
  
  handleUserMail() {
   this.setState({userMail:this.refs.user_email.value});
  }

  handleUserPass1() {
   this.setState({userPass1:this.refs.user_pass1.value});
  }

  handleUserPass2() {
   this.setState({userPass2:this.refs.user_pass2.value});
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
         
            <div style={{marginBottom:'1% !important'}} className="sign-up-form col-sm-3 col-sm-offset-4">
            
             <form data-toggle="validator" class="form-horizontal">
              <div class="form-group">
                <div class="col-sm-12">
                  <input ref="user_name" onChange={this.handleUserName.bind(this)} type="text" class="form-control" id="username" placeholder="Username" />
                </div>

                {!this.state.userName.length>0 && this.state.validate && <Popover
                                  id="popover-basic"
                                  placement="bottom"
                                  positionLeft={50}
                                  positionTop={90}
                                >
                                  Please Enter Your Username
                                </Popover>}
              </div>
              <div class="form-group">
                <div class="col-sm-12">
                  <input ref="user_email" onChange={this.handleUserMail.bind(this)} type="email" class="form-control" id="email" placeholder="E-mail" />
                </div>
                {this.state.userName.length>0 && !this.state.userMail.length>0 && this.state.validate &&
                <Popover
                  id="popover-basic"
                  placement="bottom"
                  positionLeft={50}
                  positionTop={155}
                >
                  Please Enter Your email
                </Popover>
              }
              </div>
              <div class="form-group">
                <div class="col-sm-12">
                  <input ref="user_pass1" onChange={this.handleUserPass1.bind(this)} type="password" class="form-control" id="pass" placeholder="Password(Min. 8 characters)" />
                </div>
                {this.state.userName.length>0 && this.state.userMail.length>0 && !this.state.userPass1.length>0 && this.state.validate &&
                <Popover
                  id="popover-basic"
                  placement="bottom"
                  positionLeft={50}
                  positionTop={210}
                >
                  Please Enter Your Password
                </Popover>
              }
              </div>
              <div class="form-group">
                <div class="col-sm-12">
                  <input ref="user_pass2" onChange={this.handleUserPass2.bind(this)} type="password" class="form-control" id="pass2" placeholder="Confirm Password" />
                </div>
                {this.state.userName.length>0 && this.state.userMail.length>0 && this.state.userPass1.length>0 && !this.state.userPass2.length>0 && this.state.validate &&
                <Popover
                  id="popover-basic"
                  placement="bottom"
                  positionLeft={50}
                  positionTop={265}
                >
                  Please Enter the Password Again
                </Popover>
              }
              </div>
              <div class="form-group">
                <div class="col-sm-12">
                  <input ref="user_firm" type="text" class="form-control" id="firm" placeholder="Firm Name(Optional)" />
                </div>
              </div>
              <div class="form-group">
                <div class="col-sm-offset-2 col-sm-10">
                  <Button onClick={this.handleSubmit.bind(this)} class="btn btn-primary">Sign Up</Button>
                </div>
              </div>
              <div class="form-group">
                <div class="col-sm-offset-2 col-sm-10">
                  <p>Already have an account?<Link to="/signin">Sign in</Link></p>
                </div>
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
   return ({error:state.error.error });
}

function mapDispatchToProps(dispatch) {
  return  {
      casesAction: bindActionCreators(casesAction, dispatch)
    };
  
}
export default connect(mapStateToProps,mapDispatchToProps)(SignUp);