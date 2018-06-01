import React, { Component } from 'react';
import {FormGroup,Modal, FormControl, Col, ControlLabel, DropdownButton, MenuItem, Checkbox, Navbar, Nav, NavItem, Button, ButtonGroup} from 'react-bootstrap';
import _ from 'lodash';
import Select from 'react-select';
import * as casesAction  from '../actions/index';
import { browserHistory, Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import GlobalSearch from './search';
import AlertContainer from 'react-alert';
import animateScrollTo from 'animated-scroll-to';



class ReportSet extends Component {

 componentWillMount() {
  localStorage.setItem('pollingState',0);
  if(parseInt(localStorage.getItem('pollingState'))==0) {
  localStorage.setItem('pollingState',1);
    var poll = setInterval(this.props.casesAction.fetchReportSet,480000);
  setTimeout(()=>{
    clearInterval(poll);
    localStorage.setItem('pollingState',0);
      }, 960000);
  }
  this.props.casesAction.fetchReportSet();
  // this.props.casesAction.startPolling();
  window.removeEventListener('scroll', this.handleScrollElement);

  this.setState({loader:true});

  setTimeout(()=>{
    this.setState({loader:false})
  }, 500);

      this.props.casesAction.checkIpIndia();

 }

 componentDidMount() {
  window.addEventListener('scroll', this.handleScrollElement);
 }
  

    constructor(props) {
    super(props);

    this.state = {
      global_search:false,
      sideNav:false,
      showModal2:false,
      menuOpen:false,
      startDate:'',
      endDate:'',
      deleteReport:'',
      showTmWatch: false,
      showTmManager:false,
      showTmLitigation: false,
      interested:false,
      alertOptions:{
                  offset: 14,
                  position: 'top right',
                  theme: 'dark',
                  time: 3000,
                  transition: 'scale'
                },
      loader:false,
      showRT:false,
      ipIndiaCheck:false 
    }

  }
  alertOptions = {
    offset: 14,
    position: 'top right',
    theme: 'dark',
    time: 3000,
    transition: 'scale'
  }

  open2(item) {
    // console.log('data delete:', item.id);
  this.setState({showModal2:true, deleteReport:item.id});
}

close2() {
  this.setState({showModal2:false});
}

handleSeeReport(item) {
  console.log('item:',item);
  if(item.available==false) {
    this.showAlert('Report is being processed, it may take some time. Please visit later', 'info',3000);
  }
  else if(item.selected_marks.length==0){
    this.showAlert('There is no mark in this report','error',3000);
  }

  else {
    this.props.casesAction.fetchSingleReport(item.id);
    localStorage.setItem('report_term',item.title);
    this.setState({loader:true});
    // browserHistory.push('/report/'+item.id);
  }
}


handleSignOut() {
    this.props.casesAction.signoutUser();
  }

openNav() {
  this.setState({sideNav: true});
}

closeNav() {
  this.setState({sideNav: false});
}
 handleSearch() {
  this.setState({global_search:true});
}

handleCloseSearch() {
  this.setState({global_search:false})
}


handleReportDelete() {
  this.setState({showModal2:false});
  this.props.casesAction.deleteReport({id:this.state.deleteReport});
  setTimeout(()=>{
    if(this.props.delete_res && this.props.delete_res.deleted) {
      this.showAlert('Report Deleted Successfully','error',3000);
    }        
      }, 500);
}

showAlert = (message, type,time) => {
    this.msg.show(message, {
      time: time,
      type: type  
    })
}


openTmWatch() {
  this.setState({showTmWatch:true});
}

closeTmWatch() {
  this.setState({showTmWatch:false});
}

openTmManager() {
  this.setState({showTmManager:true});
}

closeTmManager() {
  this.setState({showTmManager:false});
}

openTmLitigation() {
  this.setState({showTmLitigation:true});
}

closeTmLitigation() {
  this.setState({showTmLitigation:false});
}
closeInterested() {
this.setState({showInterested:false});
}

openInterested() {
  this.setState({showInterested:true, showTmLitigation:false, showTmManager: false, showTmWatch: false})
}

handleGetRealtimeReport(item) {
var ts = Math.round((new Date(item.modified)).getTime() / 1000);
var ts2 = Math.round((new Date()).getTime() / 1000);


//   console.log('time stamp:',ts2-ts);

    if(item.selected_marks.length==0) {
      this.showAlert('There no mark in this report','error',3000);
    }

    else if(ts2-ts<14400 && item.type=='Realtime') {
      var minutes = (ts2-ts)/60;
      var min = Math.round(minutes);
      var fin = 240-min;
      // console.log('minutes:',fin);
       this.showAlert('You can regenerate the realtime report in '+fin+' minutes', 'info',10000);
    }

    else  {
    this.props.casesAction.appendReport({id:item.id, selected_marks:item.selected_marks, selection_type:'append'});
    setTimeout(()=>{
      this.props.casesAction.fetchReportSet();
      this.setState({showRT:true});
       localStorage.setItem('pollingState',0);
    if(parseInt(localStorage.getItem('pollingState'))==0) {
      localStorage.setItem('pollingState',1);
        var poll = setInterval(this.props.casesAction.fetchReportSet,300000);
      setTimeout(()=>{
        clearInterval(poll);
        localStorage.setItem('pollingState',0);
          }, 1800000);
    }
    this.showAlert('Report is being processed for realtime. You will be notified via e-mail.', 'info',10000);
      }, 500);

 //  $('#dots').html('');  
 // localStorage.setItem('dotState',0);
 //  var dots=0;
 //  if(parseInt(localStorage.getItem('dotState'))==0){
 //  var poll2 = setInterval(function(){
 //    localStorage.setItem('dotState',1);
 //   if(dots < 4)
 //        {
 //            $('#dots'+item.id).append('.');
 //            dots++;
 //        }
 //        else
 //        {
 //            $('#dots'+item.id).html('');
 //            dots = 0;
 //        }
 //  },800)
 //  }
     
  }
}

closeRT() {
  this.setState({showRT:false});
}

fetchReportSet() {
  this.props.casesAction.fetchReportSet();
}

hadleScrollTop() {
  animateScrollTo(0);
}

handleScrollElement() {

  // console.log('scroll function called',window.pageYOffset);
  if(window.pageYOffset>200) {
    // console.log('visible ho');
   document.getElementById("scrollt").style.visibility='visible';
  }
  else if(window.pageYOffset<200) {
    // console.log('visible mat ho');
    document.getElementById("scrollt").style.visibility='hidden';
  }
}

IPIndiaDown() {
  this.showAlert('It seems IP India is down so the realtime won\'t work for the time being','info',18000);
  this.setState({ipIndiaCheck:true});
}
  
  render() {


   const {report} = this.props;
   const {delete_res} = this.props;

   var reports=[];

   setTimeout(()=>{
   if(this.props.report && !this.props.ipindia && this.state.ipIndiaCheck==false) {
     this.IPIndiaDown();
   }
  }, 3000);

    
    return (
      <div>
       <div style={{background:'#F1F2F1'}} >
        {!this.props.report || this.state.loader &&
          <div className="col-sm-12" style={{textAlign:'center', background:'#F1F2F1', paddingTop:'10%', paddingBottom:'8%', height:'100vh'}} >
        <img src="../../images/loading.gif" style={{display:"block",left:'50%',marginLeft:"auto",marginRight:"auto", width:'40%'}}/>
        <br/>
        <p style={{fontSize:'18px', color:'#525252'}}>Crunching latest trademark data for you. Hang on... </p>
        </div>
        }
    </div>
     <div style={{visibility:'hidden'}} id="scrollt" ><i style={{color:'#4285f4', position:'fixed',right:'10px',fontSize:'40px',zIndex:'999',bottom:'10px',cursor:'pointer'}} onScroll={this.handleScrollElement.bind(this)} onClick={this.hadleScrollTop.bind(this)}  className="fa fa-chevron-circle-up"></i></div>
    { this.props.report && !this.state.loader && <div> <div id={this.state.sideNav ? "mySidenav-active" : "mySidenav"} className="sidenav">
          <span style={{background:'none', color:'#FFF', textAlign:'center', padding:'0', paddingTop:'18px',paddingBottom:'12px', paddingLeft:'60px',fontSize:'20px' ,display:'flex'}}
           href="#">MikeLegal<span style={{color:'#FFF',fontSize:'20px', cursor:'pointer', padding:'0',marginLeft:'40px', border:'none', boxShadow:'none', backgroundColor:'none'}} href="#" className="fa fa-times" onClick={this.closeNav.bind(this)}>
           </span></span>
          <hr style={{width:'80%', marginTop:'10px'}} size="5" />
          <Link to="/profile_page"><i href="#">Profile</i></Link>
          <Link to="/report_set"><i href="#">Reports</i></Link>
          <Link to="/search"><i href="#">Search Dashboard</i></Link>
          <i onClick={this.openTmWatch.bind(this)} href="#">Mike TM Watch</i>
          <i onClick={this.openTmManager.bind(this)} href="#">Mike TM Manager</i>
          <i onClick={this.openTmLitigation.bind(this)} href="#">Mike Litigation</i>
          <i onClick={this.handleSignOut.bind(this)} href="#">Sign Out</i>
        </div>
      {!this.state.global_search && <div className="col-sm-12">
          <div className="row prop-top-panel">
                    <div className="col-sm-12">
                      <i onClick={this.openNav.bind(this)} className="fa fa-bars pull-left" aria-hidden="true"></i>
                      <Link to="/search" ><i className="fa fa-search pull-right" aria-hidden="true"></i></Link>
                    </div>
                  </div>
           <div className="row">
           <div className="col-sm-12" style={{textAlign:'center'}}>
           <h3>Hi, welcome to your report section</h3>
           </div>
           </div>
           <div className="row">
           <div className="col-sm-12" style={{paddingTop:'50px'}}>

           {this.props.report && this.props.report.length>0 && this.props.report.map(item=> 
             <div className="col-sm-3 report-block" style={{textAlign:'center', height:'auto', border:'1px solid #DDD', marginRight:'3%', marginLeft:'4%',marginBottom:'10px'}}>
                <div className="row">
                  <div style={{textAlign:'right',paddingRight:'10px !important',paddingTop:'10px'}} className="col-sm-12">
                    <i style={{color:'#4285f4', cursor:'pointer',fontSize:'18px',paddingRight:'10px !important', padding:'0 !important',textAlign:'right'}} onClick={() => {this.open2(item)}} className="fa fa-trash"></i>
                  </div>
                </div>
                 <h3>{item.title}</h3>
                 <br />
                 <h4 style={{marginTop:'0'}} >{item.selected_marks.length} marks in report</h4>
                 <br />
                 <Link style={{color:'#FFF'}} className="btn btn-primary" onClick={()=> {this.handleSeeReport(item)}}>See report</Link>
                 <br />
                 {item.available==true && <button onClick={() => {this.handleGetRealtimeReport(item)}} disabled={this.state.ipIndiaCheck} className="btn btn-default">Get Realtime Report</button>}
                 {item.available==false && <button style={{cursor:'context-menu !important'}} className="btn btn-default">Processing...</button>}
               </div>              
        )}

           {this.props.report && this.props.report.length==0 &&  
            <div style={{textAlign:'center'}} >
              <p style={{fontSize:'25px !important'}} ><i style={{color:'#F1D000 !important', marginRight:'10px'}} className="fa fa-exclamation-triangle"></i>No Reports Found</p>
            </div>        
            }
           </div>
           </div>

           <Modal show={this.state.showModal2} onHide={this.close2.bind(this)} >
                 <Modal.Body>    
                      <div className="row">
                        <div style={{paddingTop:'20px', textAlign:'center'}} className="col-sm-12">
                           <h3>Are you sure you want to delete this report?</h3>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-12 mark-delete" style={{textAlign:'center'}} >
                    <button onClick={this.handleReportDelete.bind(this)} style={{borderRadius:'0'}} className="btn btn-primary">
                        Delete
                     </button>
                      <br />
                      <button style={{background:'#FFF', border:'none', color:'#4285f4', backgroundImage:'none'}} onClick={this.close2.bind(this)} className="btn btn-default">Cancel</button>
                        </div>
                      </div>
                    </Modal.Body>
                  </Modal> 

                  <Modal style={{marginTop:'-6%'}} show={this.state.showTmWatch} onHide={this.closeTmWatch.bind(this)}>
                    <Modal.Body style={{paddingTop:'0'}}>
                   
                      <div className="row">
                        <div style={{height:'auto', background:'#4285f4', color:'white',borderTopRightRadius:'6px', borderTopLeftRadius:'6px'}} className="col-sm-12 TmWatchTop">
                         <div className="row">
                     <div className="col-sm-12">
                        <div className="col-sm-6 pull-right">
                          <i onClick={this.closeTmWatch.bind(this)} style={{color:'#FFF', fontSize:'20px', paddingRight:'10px', cursor:'pointer'}} className="fa fa-times pull-right" aria-hidden="true"></i>
                        </div>
                     </div>
                    </div>
                          <h2 style={{textAlign:'center', paddingBottom:'20px'}}>Introducing MikeTM Watch</h2>
                          <ul>
                            <li style={{background:'#4285f4', color:'white', fontSize:'16px', marginBottom:'10px'}} >One of world's most advanced watch tools</li>
                            <li style={{background:'#4285f4', color:'white', fontSize:'16px', marginBottom:'10px'}}>Know potentially infringing marks with higher accuracy and efficiency</li>
                            <li style={{background:'#4285f4', color:'white', fontSize:'16px', marginBottom:'30px'}}>Easy to access dashboard with report generation</li>
                          </ul>
                        </div>
                      </div>

                      <div style={{paddingLeft:'15px !important', paddingRight:'15px !important'}} className="row">
                        <div className="col-sm-12 TmWatchBottom">
                           <div style={{height:'auto', background:'#FFF', color:'#4285f4', paddingLeft:'0!important', paddingRight:'15px !important'}} className="col-sm-12 TmWatchTop">
                         <div className="row">
                     <div className="col-sm-12">
                         <h3 style={{textAlign:'center', paddingBottom:'0px', color:'#FFF', paddingLeft:'15px !important', paddingRight:'15px !important'}}>Interested in trying MikeTM Watch?</h3>
                         <div className="row">
                     <div style={{textAlign:'center', paddingTop:'20px', paddingBottom:'30px', paddingLeft:'0 !important', paddingRight:'15px !important'}} className="col-sm-12">
                       
                          <button onClick={this.openInterested.bind(this)} style={{paddingTop:'10px', paddingBottom:'10px'}} className="btn btn-primary">I am Interested</button>
                        
                     </div>
                    </div>
                     </div>
                    </div>
                          
                        </div>
                        </div>
                      </div>
                    </Modal.Body>
                </Modal>

                <Modal style={{marginTop:'-6%'}} show={this.state.showTmManager} onHide={this.closeTmManager.bind(this)}>
                    <Modal.Body style={{paddingTop:'0'}}>
                   
                      <div className="row">
                        <div style={{height:'auto', background:'#4285f4', color:'white',borderTopRightRadius:'6px', borderTopLeftRadius:'6px'}} className="col-sm-12 TmWatchTop">
                         <div className="row">
                     <div className="col-sm-12">
                        <div className="col-sm-6 pull-right">
                          <i onClick={this.closeTmManager.bind(this)} style={{color:'#FFF', fontSize:'20px', paddingRight:'10px', cursor:'pointer'}} className="fa fa-times pull-right" aria-hidden="true"></i>
                        </div>
                     </div>
                    </div>
                          <h2 style={{textAlign:'center', paddingBottom:'20px'}}>Introducing MikeTM Manager</h2>
                          <ul>
                            <li style={{background:'#4285f4', color:'white', fontSize:'16px', paddingBottom:'20px'}} > MikeTM Manager is one of kind automated solution to manage all your marks</li>
                            <li style={{background:'#4285f4', color:'white', fontSize:'16px', paddingBottom:'20px'}}>Get a detailed, holistic view of your marks based on status segregation, date of application, upcoming hearing and much more</li>
                            <li style={{background:'#4285f4', color:'white', fontSize:'16px', paddingBottom:'30px'}}>MikeTM Manager is in sync with the Trademark registry so always be updated with the changes to your marks</li>
                          </ul>
                        </div>
                      </div>

                      <div style={{paddingLeft:'15px !important', paddingRight:'15px !important'}} className="row">
                        <div className="col-sm-12 TmWatchBottom">
                           <div style={{height:'auto', background:'#FFF', color:'#4285f4', paddingLeft:'0!important', paddingRight:'15px !important'}} className="col-sm-12 TmWatchTop">
                         <div className="row">
                     <div className="col-sm-12">
                         {!this.state.interested && <h3 style={{textAlign:'center', paddingBottom:'0px', color:'#FFF', paddingLeft:'15px !important', paddingRight:'15px !important'}}>Interested in trying MikeTM Watch?</h3>}
                         <div className="row">
                     <div style={{textAlign:'center', paddingTop:'20px', paddingBottom:'30px', paddingLeft:'0 !important', paddingRight:'15px !important'}} className="col-sm-12">
                       
                          <button onClick={this.openInterested.bind(this)} style={{paddingTop:'10px', paddingBottom:'10px'}} className="btn btn-primary">I am Interested</button>
                        
                     </div>
                    </div>
                     </div>
                    </div>
                          
                        </div>
                        </div>
                      </div>
                    </Modal.Body>
                </Modal>

                <Modal style={{marginTop:'-6%'}} show={this.state.showTmLitigation} onHide={this.closeTmLitigation.bind(this)}>
                    <Modal.Body style={{paddingTop:'0'}}>
                   
                      <div className="row">
                        <div style={{height:'auto', background:'#4285f4', color:'white',borderTopRightRadius:'6px', borderTopLeftRadius:'6px'}} className="col-sm-12 TmWatchTop">
                         <div className="row">
                     <div className="col-sm-12">
                        <div className="col-sm-6 pull-right">
                          <i onClick={this.closeTmLitigation.bind(this)} style={{color:'#FFF', fontSize:'20px', paddingRight:'10px', cursor:'pointer'}} className="fa fa-times pull-right" aria-hidden="true"></i>
                        </div>
                     </div>
                    </div>
                          <h2 style={{textAlign:'center', paddingBottom:'20px'}}>Introducing Mike Litigation</h2>
                          <ul>
                            <li style={{background:'#4285f4', color:'white', fontSize:'16px', paddingBottom:'20px'}} >Mike is built using NLP and deep learning to help lawyers cut down on research time.</li>
                            <li style={{background:'#4285f4', color:'white', fontSize:'16px', paddingBottom:'20px'}}>Mike allows lawyers to ask questions in simple english and it understands the context of the question.</li>
                            <li style={{background:'#4285f4', color:'white', fontSize:'16px', paddingBottom:'30px'}}> Mike shows lawyers highly relevant passages of law along with analytical tools such as judge analytics, counsel analytics and much more.</li>
                          </ul>
                        </div>
                      </div>

                      <div style={{paddingLeft:'15px !important', paddingRight:'15px !important'}} className="row">
                        <div className="col-sm-12 TmWatchBottom">
                           <div style={{height:'auto', background:'#FFF', color:'#4285f4', paddingLeft:'0!important', paddingRight:'15px !important'}} className="col-sm-12 TmWatchTop">
                         <div className="row">
                     <div className="col-sm-12">
                         <h3 style={{textAlign:'center', paddingBottom:'0px', color:'#FFF', paddingLeft:'15px !important', paddingRight:'15px !important'}}>Interested in trying MikeTM Watch?</h3>
                         <div className="row">
                     <div style={{textAlign:'center', paddingTop:'20px', paddingBottom:'30px', paddingLeft:'0 !important', paddingRight:'15px !important'}} className="col-sm-12">
                       
                          <button onClick={this.openInterested.bind(this)} style={{paddingTop:'10px', paddingBottom:'10px'}} className="btn btn-primary">I am Interested</button>
                        
                     </div>
                    </div>
                     </div>
                    </div>
                          
                        </div>
                        </div>
                      </div>
                    </Modal.Body>
                </Modal>

                <Modal show={this.state.showInterested} onHide={this.closeInterested.bind(this)}>
                    <Modal.Body>
                    <div className="row">
                      <div className="col-sm-12">
                        <i onClick={this.closeInterested.bind(this)} style={{color:'#4285f4', fontSize:'20px', paddingRight:'10px', cursor:'pointer'}} className="fa fa-times pull-right" aria-hidden="true"></i>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-12 search-modal">
                        <h3 style={{textAlign:'center', paddingBottom:'30px', color:'#FFF', paddingLeft:'15px !important', paddingRight:'15px !important'}}><img style={{height: '25px'}} src="../../images/checked.png" />Thank you for showing your interest</h3>
                      </div>
                    </div>
                    </Modal.Body>
                </Modal>

                <Modal show={this.state.showRT} onHide={this.closeRT.bind(this)}>
                    <Modal.Body>
                    <div className="row">
                      <div className="col-sm-12">
                        <i onClick={this.closeRT.bind(this)} style={{color:'#4285f4', fontSize:'20px', paddingRight:'10px', cursor:'pointer'}} className="fa fa-times pull-right" aria-hidden="true"></i>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-12 search-modal">
                        <h3 style={{textAlign:'center', paddingBottom:'30px', color:'#525252', paddingLeft:'15px !important', paddingRight:'15px !important'}}><img style={{height: '25px'}} src="../../images/checked.png" />Report for mark has been queued for realtime processing, it will be available soon.</h3>
                        <br/>
                        <button onClick={this.closeRT.bind(this)} style={{borderRadius:'0'}} className="btn btn-primary">Close</button>
                      </div>
                    </div>
                    </Modal.Body>
                </Modal>

                  <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
                  
        </div>}</div>}
         {this.state.global_search &&
            
    <div className="global_result_search container-fluid">
     
      <div className="row">
      <i className="fa fa-times pull-right" onClick={this.handleCloseSearch.bind(this)} aria-hidden="true"></i>
        <GlobalSearch />
      </div>
    </div> 

            }

        </div>
        

          );
  }
}

function mapStateToProps(state) {
  console.log('Report State check:', state);
   return ({report: state.report.report, delete_res: state.report.delete_response, ipindia:state.report.ipindia });
}

function mapDispatchToProps(dispatch) {
  return  {
      casesAction: bindActionCreators(casesAction, dispatch)
    };
  
}
export default connect(mapStateToProps,mapDispatchToProps)(ReportSet);

     // <ButtonGroup className="btn-grp">
    //      <Button className="nav-btn float-left">
    //        Workspace
    //      </Button>
    //      <Button className="nav-btn float-left">
    //        Logout
    //      </Button>
    //      </ButtonGroup>

            //   {this.props.report && !this.props.report.length &&
            // <div style={{textAlign:'center'}} >
            // <img style={{width:'20%'}} src="../../images/no-result.png" />
            // </div>              
            //  }