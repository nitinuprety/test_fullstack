import React, { Component } from 'react';
import {FormGroup, Modal,  Tooltip, OverlayTrigger, FormControl, Col, ControlLabel, DropdownButton, MenuItem, Checkbox, Navbar, Nav, NavItem, Button, ButtonGroup} from 'react-bootstrap';
import  _  from 'lodash';
import Select from 'react-select';
import * as casesAction  from '../actions/index';
import { browserHistory, Link } from 'react-router';
import { bindActionCreators } from 'redux'; 
import { connect } from 'react-redux';
import {Timeline, TimelineEvent, DynamicTimeline} from 'react-event-timeline'
import GlobalSearch from './search';
import AlertContainer from 'react-alert';
import animateScrollTo from 'animated-scroll-to';

class MarkProfile extends Component {


    alertOptions = {
    offset: 14,
    position: 'top right',
    theme: 'dark',
    time: 3000,
    transition: 'scale',
   
  }

  constructor(props) {
    super(props);

    this.state = {
      
      global_search: false,
      sideNav: false,
      mark_data:'',
       pdf:'',
       realTime: true,
      alertOptions:{
                  offset: 14,
                  position: 'top right',
                  theme: 'dark',
                  time: 3000,
                  transition: 'scale'
                },
      ipIndiaCheck:false 
     
    }
    this.handlePdfClick = this.handlePdfClick.bind(this);
  }

  componentWillMount() {
    this.props.casesAction.TrademarkDetail(this.props.params.text, 'realtime');
    this.props.casesAction.checkIpIndia();
    window.removeEventListener('scroll', this.handleScrollElement);
  
  }

   componentDidMount() {

    window.addEventListener('scroll', this.handleScrollElement);
     setTimeout(()=>{
        this.setState({realTime:false})
      }, 10000);
 
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


   openNav() {
    this.setState({sideNav: true});
  }

  closeNav() {
    this.setState({sideNav: false});
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

    showAlert = (message, type, time) => {
    this.msg.show(message, {
      time: time,
      type: type
    })
  }

    handleSignOut() {
      this.props.casesAction.signoutUser();
    }

    handlePdfClick(data) {
      const url = data.url;
      window.open(url, '_blank');
      
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
  handleReload() {
    window.location.reload();
  }

  handleOldData() {
    this.props.casesAction.TrademarkOldData(this.props.params.text);
  }

  handleProprietorClick(data) {
      if(data){
        this.props.casesAction.RedirectToProprietor(data.id);
      }
        
        this.setState({loaderState:true});
      // browserHistory.push('/proprietor/'+data.proprietor[0].id);
    }

  IPIndiaDown() {
  this.showAlert('It seems IP India is down so the realtime won\'t work for the time being','info',18000);
  this.setState({ipIndiaCheck:true});
  }

  render() {
   setTimeout(()=>{
   if(this.props.mark_data && !this.props.ipindia && this.state.ipIndiaCheck==false) {
     this.IPIndiaDown();
   }
  }, 3000);
    // console.log(this.state);

    var mark; 
    // if(this.props.mark_data) {
    //   mark=this.props.mark_data
    // }
    const tooltip = (
  <Tooltip id="tooltip">Remove from report</Tooltip>
);
    const {mark_data} = this.props;
    return (
      <div>
      <div style={{background:'#F1F2F1'}} >
        {!this.props.mark_data && 
          <div className="col-sm-12" style={{textAlign:'center', background:'#F1F2F1', paddingTop:'10%', paddingBottom:'8%', height:'100vh'}} >
        <img src="../../images/loading.gif" style={{display:"block",left:'50%',marginLeft:"auto",marginRight:"auto", width:'40%'}}/>
        <br/>
        {this.state.realTime && <p style={{fontSize:'18px', color:'#525252'}}>Please wait, grabbing realtime trademark data...</p>}
        {!this.state.realTime &&<p style={{fontSize:'18px', color:'#525252'}}>It may take some time, hang on or <Link style={{cursor:'pointer'}} onClick={this.handleOldData.bind(this)}>See last updated data</Link></p>}
        </div>
        }
    </div>

      {this.props.mark_data &&
       <div>  <div id={this.state.sideNav ? "mySidenav-active" : "mySidenav"} className="sidenav">
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
        <div style={{visibility:'hidden'}} id="scrollt" ><i style={{color:'#4285f4', position:'fixed',right:'10px',fontSize:'40px',zIndex:'999',bottom:'10px',cursor:'pointer'}} onScroll={this.handleScrollElement.bind(this)} onClick={this.hadleScrollTop.bind(this)}  className="fa fa-chevron-circle-up"></i></div>
      {!this.state.global_search && <div className="mark-profile">
              <div className="row prop-top-panel">
                    <div className="col-sm-12">
                      <i  onClick={this.openNav.bind(this)} className="fa fa-bars pull-left" aria-hidden="true"></i>
                      <Link to="/search" ><i className="fa fa-search pull-right" aria-hidden="true"></i></Link>
                    </div>
                  </div>
              <div className="wrapper">
                  <div className="container-fluid">
                      <div className="row">
                          <div className="col-sm-12">
                              <div className="page-title-box col-sm-6 pull-left">
                                  {this.props.mark_data && <h4 className="page-title">Mark Name: {this.props.mark_data.data.applied_for}</h4> }
                              </div>
                          </div>
                      </div> 
      
                      <div className="row">
                       <div className="col-md-6 col-lg-6 col-xl-3 prop-theme-top-stats">
                              <div className="widget-bg-color-icon card-box fadeInDown animated">
                                  <div className="bg-icon pull-left">
                                      <img src="../../images/curriculum.png" />
                                  </div>
                                  <div className="text-right">
                                     {this.props.mark_data &&  <h3 className="text-dark"><b className="counter">{this.props.mark_data.data.opposition_count}</b></h3>}
                                      <p className="text-dark mb-0">Oppositions Filed</p>
                                  </div>
                                  <div className="clearfix"></div>
                              </div>
                          </div>
      
                          <div className="col-md-6 col-lg-6 col-xl-3 prop-theme-top-stats">
                              <div className="widget-bg-color-icon card-box">
                                  <div className="bg-icon pull-left">
                                      <img src="../../images/tag.png" />
                                  </div>
                                  <div className="text-right">
                                      {this.props.mark_data && <h3 className="text-dark"><b className="counter">{this.props.mark_data.data.type.name}</b></h3>}
                                      <p className="text-dark mb-0">Trademark Type</p>
                                  </div>
                                  <div className="clearfix"></div>
                              </div>
                          </div>
      
                          <div className="col-md-6 col-lg-6 col-xl-3 prop-theme-top-stats">
                              <div className="widget-bg-color-icon card-box">
                                  <div className="bg-icon pull-left">
                                      <img src="../../images/calendar.png" />
                                  </div>
                                  <div className="text-right">
                                      {this.props.mark_data && <h3  className="text-dark"><b className="counter">{this.props.mark_data.data.status}</b></h3>}
                                      <p className="text-dark mb-0">Trademark Status</p>
                                  </div>
                                  <div className="clearfix"></div>
                              </div>
                          </div>
                      </div>
              <div className="row report-element-area-mark">
              {!this.props.mark_data &&
                                <div className="col-sm-12" style={{textAlign:'center'}} >
                              <img src="../../images/loader.gif" style={{display:"block",left:'50%',marginLeft:"auto",marginRight:"auto",width:'10%', height:'55%'}}/>
                              <br/>
                              <p>Fetching data...</p>
                              </div>
                              }
               
                  {this.props.mark_data && <div className="col-sm-12 report-single-mark widget">
                         <div className="parameter-area-mark">
                         <div className="row">
                           <div className="col-sm-12">
                           <div className="col-sm-6">
                               <h4>Information</h4> 
                           </div>
                             <div className="col-sm-6 pull-right">
                                  {this.props.mark_data && !this.props.mark_data.real_time && <p style={{textAlign:'right', color:'red', fontSize:'17px', paddingTop:'5px', paddingRight:'10px'}} className="page-title">*The data might have changed<br/><p2 onClick={this.handleReload.bind(this)} style={{textDecoration:'underlined', color:'#4285f4', cursor:'pointer'}} >Retry for realtime</p2></p> }
                                  {this.props.mark_data && this.props.mark_data.real_time && <p style={{textAlign:'right', color:'green', fontSize:'17px', paddingTop:'5px', paddingRight:'10px'}} className="page-title">*The data is realtime</p> }
                              </div>
                           </div>
                         </div>
                         
                         <hr />
                            <div className="col-sm-6 parameter"> 
                             <table className="table">
                        <tbody>
                          <tr >
                            {this.props.mark_data.data.applied_for && <td style={{width:'35%'}}>Name of Trademark:</td>}
                            {this.props.mark_data.data.applied_for && <td>{this.props.mark_data.data.applied_for}</td>}
                          </tr>
                          <tr style={{textAlign:'left !important'}}>
                            {this.props.mark_data.data.application_number && <td>Application No.:</td>}
                            {this.props.mark_data.data.application_number && <td>{this.props.mark_data.data.application_number}</td>}
                          </tr>
                          <tr style={{textAlign:'left !important'}}>
                            {this.props.mark_data.data.associated_class && <td>Classes:</td>}
                            {this.props.mark_data.data.associated_class && <td>{this.props.mark_data.data.associated_class.sort((a,b) => a - b).toString()}</td>}
                          </tr>
                          <tr style={{textAlign:'left !important'}}>
                            {this.props.mark_data.data.status && <td>Status: </td>}
                            {this.props.mark_data.data.status && <td>{this.props.mark_data.data.status}</td>}
                          </tr>
                          <tr style={{textAlign:'left !important'}}>
                            {this.props.mark_data.data.type && this.props.mark_data.data.type.name && <td>Trademark Type: </td>}
                            {this.props.mark_data.data.type && this.props.mark_data.data.type.name && <td>{this.props.mark_data.data.type.name}</td>}
                          </tr>
                          <tr style={{textAlign:'left !important'}}>
                            {this.props.mark_data.data.application_date && <td>Date of Application: </td>}
                            {this.props.mark_data.data.application_date && <td>{new Date(this.props.mark_data.data.application_date).getDate()+'/' + (new Date(this.props.mark_data.data.application_date).getMonth()+1)+'/'+ new Date(this.props.mark_data.data.application_date).getFullYear()}</td>}
                          </tr>
                          <tr style={{textAlign:'left !important'}}>
                            <td>Date of Usage: </td>
                            {this.props.mark_data.data.date_of_usage && <td>{new Date(this.props.mark_data.data.date_of_usage).getDate()+'/' + (new Date(this.props.mark_data.data.date_of_usage).getMonth()+1)+'/'+ new Date(this.props.mark_data.data.date_of_usage).getFullYear()}</td>}
                            {!this.props.mark_data.data.date_of_usage && <td>Proposed to be used</td>}
                          </tr>
                          <tr style={{textAlign:'left !important'}}>
                            {this.props.mark_data.data.valid_upto && <td>Valid Upto: </td>}
                            {this.props.mark_data.data.valid_upto && <td>{new Date(this.props.mark_data.data.valid_upto).getDate()+'/' + (new Date(this.props.mark_data.data.valid_upto).getMonth()+1)+'/'+ new Date(this.props.mark_data.data.valid_upto).getFullYear()}</td>}
                          </tr>
                          <tr style={{textAlign:'left !important'}}>
                            {this.props.mark_data.data.proprietor && this.props.mark_data.data.proprietor[0] && <td>Proprietor Name:</td>}
                            {this.props.mark_data.data.proprietor && this.props.mark_data.data.proprietor.length>0 && <td className={this.props.mark_data.data.proprietor.length>1?"single_proprietor":"multiple_proprietor"} ><ul style={{paddingLeft: '4%'}} >
                             {this.props.mark_data.data.proprietor.map(propr=> <li style={{cursor:'pointer', color:'#4285f4',background:'#FFF'}} onClick={()=> {this.handleProprietorClick(propr)}} >{propr.name}</li>) 
                            }</ul> </td> }
                          </tr>
                          <tr style={{textAlign:'left !important'}}>
                            {this.props.mark_data.data.description && <td>Description: </td>}
                            {this.props.mark_data.data.description && <td>{this.props.mark_data.data.description}</td>}
                          </tr>
                        </tbody>
                      </table>
                            </div>
            
                            <div className="col-sm-6  mark-image">
      
                            {!this.props.mark_data.data.associated_image && <img style={{height:'225px', width:'350px'}} src="../../images/no-image-found.gif" />}
                            {this.props.mark_data.data.associated_image && <img  style={{height:'250px', width:'300px'}} src={this.props.mark_data.data.associated_image} /> }
      
                            </div>
                            </div>
                               </div>}
              </div>
      
              <div className="row report-element-area-mark">
               
                  <div className="col-sm-12 report-single-mark widget">
                         <div className="timeline-area-mark">
                         <h4>Timeline</h4>
                         <hr />
                         {this.props.mark_data && 
                          <Timeline>

                          {this.props.mark_data.data.documents.map(doc =>
                          <TimelineEvent
                            title={doc.description}
                            createdAt={new Date(doc.date).getDate()+'/' + (new Date(doc.date).getMonth()+1)+'/'+ new Date(doc.date).getFullYear()}
                            icon={<i className="fa fa-pencil-square-o" aria-hidden="true" />}
                            iconColor="#6fba1c"
                          >
                          
                          </TimelineEvent>
                          
                          )}

                          </Timeline>
                          
                         }
                         
                            
                            </div>
                               </div>
              </div>
      
              <div className="row report-element-area-mark">
               
                  <div className="col-sm-12 mark-docs-table widget">
                         <div className="documents-area-mark">
                         <h4>Documents</h4>
                         <hr />
                         <div className="col-sm-6 doc-link">
                         {this.props.mark_data && this.props.mark_data.data.documents.map(doc => {
                        return   <p onClick={() => {this.handlePdfClick(doc)}} ><i className="fa fa-download" aria-hidden="true"></i>{doc.description}</p>
                        
                         })}
                         </div>
                         <div className="col-sm-6 pull-right doc-date">
                         {this.props.mark_data && this.props.mark_data.data.documents.map(doc => {
                          return  <p>{new Date(doc.date).getDate()+'/' + (new Date(doc.date).getMonth()+1)+'/'+ new Date(doc.date).getFullYear()}</p>
                         
                         })}
                         </div>
                    </div>
              </div>
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

                   </div> 
                   </div>  
            </div>
            <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
            </div>} </div> }
          { this.state.global_search &&
            
    <div className="global_result_search container-fluid">
     
      <div className="row">
      <i className="fa fa-times pull-right" onClick={this.handleCloseSearch.bind(this)} aria-hidden="true"></i>
        <GlobalSearch />
      </div>
    </div>
            
            }
      </div>
    )
}
}


function mapStateToProps(state) {
  // console.log('Mark Profile check:', state);
   return ({ mark_data: state.mark_single.mark_single, ipindia:state.report.ipindia });
}

function mapDispatchToProps(dispatch) {
  return  {
      casesAction: bindActionCreators(casesAction, dispatch)
    };
  
}
export default connect(mapStateToProps,mapDispatchToProps)(MarkProfile);




// <Timeline>
// <TimelineEvent
//   title="John Doe sent a SMS"
//   createdAt="2016-09-12 10:06 PM"
//   icon={<i />}
//   iconColor="#6fba1c"
// >
// I received the payment for $543. Should be shipping the item within a couple of hours. Thanks for the order!
// </TimelineEvent>
// <TimelineEvent
//   title="You sent an email to John Doe"
//   createdAt="2016-09-11 09:06 AM"
//   icon={<i />}
//   iconColor="#03a9f4"
// >
// <p>
// Subject: Any updates?
// </p>
// <p>
// Like we talked, you said that you would share the shipment details? This is an urgent order and so I am losing patience. Can you expedite the process and pls do share the details asap. Consider this a gentle reminder if you are on track already!
// </p>
// <p>
// - Maya
// </p>
// </TimelineEvent>
// </Timeline>