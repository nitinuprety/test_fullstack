import React, { Component } from 'react';
import {FormGroup,Modal, FormControl, Col, ControlLabel, DropdownButton, MenuItem, Checkbox, Navbar, Nav, NavItem, Button, ButtonGroup} from 'react-bootstrap';
import * as casesAction  from '../actions/index';
import { browserHistory, Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


class SideBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			sideNav:false
		}
	}
	  closeNav() {
    this.setState({sideNav: false});
  }
  handleSignOut() {
      this.props.casesAction.signoutUser();
    }

	render() {
		return (
         <div id={this.state.sideNav ? "mySidenav-active" : "mySidenav"} className="sidenav">
          <span style={{background:'none', color:'#FFF', textAlign:'center', padding:'0', paddingTop:'18px',paddingBottom:'12px', paddingLeft:'60px',fontSize:'20px' ,display:'flex'}} href="#">MikeLegal<span style={{color:'#FFF',fontSize:'20px', cursor:'pointer', padding:'0',marginLeft:'40px', border:'none', boxShadow:'none', backgroundColor:'none'}} href="#" className="fa fa-times" onClick={this.closeNav.bind(this)}></span></span>
          <hr style={{width:'80%', marginTop:'10px'}} size="5" />
          <Link to="/profile_page"><i href="#">Profile</i></Link>
          <Link to="/report_set"><i href="#">Reports</i></Link>
          <i href="#">Mike TM Watch</i>
          <i href="#">Mike TM Manager</i>
          <i href="#">Mike Litigation</i>
          <i onClick={this.handleSignOut.bind(this)} href="#">Sign Out</i>
        </div>
			)
	}
}

function mapStateToProps(state) {
  console.log('State search check:', state);
   return ({marks:state.search.marks, result:state.result.result });
}

function mapDispatchToProps(dispatch) {
  return  {
      casesAction: bindActionCreators(casesAction, dispatch)
    };
  
}
export default connect(mapStateToProps,mapDispatchToProps)(SideBar);