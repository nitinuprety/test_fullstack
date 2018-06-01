import React, { Component } from 'react';
import {FormGroup, Modal,  Tooltip, OverlayTrigger, FormControl, Col, ControlLabel, DropdownButton, MenuItem, Checkbox, Navbar, Nav, NavItem, Button, ButtonGroup} from 'react-bootstrap';
import  _  from 'lodash';
import Select from 'react-select';
import * as casesAction  from '../actions/index';
import { browserHistory, Link } from 'react-router';
import { bindActionCreators } from 'redux'; 
import { connect } from 'react-redux';
import {Timeline, TimelineEvent} from 'react-event-timeline'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import GlobalSearch from './search';
import AlertContainer from 'react-alert';
import ImagesUploader from 'react-images-uploader';


class ProfilePage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      
      global_search: false,
      sideNav: false,
      alertOptions:{
                  offset: 14,
                  position: 'top right',
                  theme: 'dark',
                  time: 3000,
                  transition: 'scale'
                },
      uploadModal:false,
      uploaded_logo:false,         
      previewModal:false,
      file:''
     
    }

  }

  alertOptions = {
    offset: 14,
    position: 'top right',
    theme: 'dark',
    time: 3000,
    transition: 'scale'
  }

  showAlert = (message, type) => {
    this.msg.show(message, {
      time: 3000,
      type: type
    })
  }

  componentWillMount() {
    this.props.casesAction.fetchCases();
    this.props.casesAction.fetchReportSet();
    this.props.casesAction.fetchProfile();
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


    handleSearch() {
    this.setState({global_search:true});
  }

  handleCloseSearch() {
    this.setState({global_search:false})
  }

  handleDownload(cell) {
  // console.log('Handle Downloads');
}

  downloadFormatter(cell,row){
    
     return <Link><i onClick={()=>{this.handlePdfDownload(row)}} className="fa fa-download" aria-hidden="true"></i></Link>;
}

mailFormatter(cell,row){
     return <Link><i className="fa fa-envelope" aria-hidden="true"></i></Link>;
}



handleContactUs() {
 this.showAlert('Thank you! Our team has been notified','success');
 this.props.casesAction.contactUs('Tried to contact team MikeLegal');
}

handlePdfDownload(data) {
  // console.log('function called download', data);
    this.props.casesAction.reportDownload(data.id, data.title);
  }

  handleUpload() {
  this.setState({uploadModal:true});
}

closeUpload() {
  this.setState({uploadModal:false});
}

logoUploadFile(e) {
     e.preventDefault();
      let reader = new FileReader();
    let file = e.target.files[0];
  if(file.size>5000000) {
           this.showAlert('Total size should not exceed 5 MB','error');
        } 

  else {

    this.setState({file:file});

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(file)

      setTimeout(()=>{
       this.setState({uploadModal:false, previewModal:true})
      }, 1500);
  }      
  }

    closePreview() {
    this.setState({uploadModal:false,previewModal:false});
  }

  handleConfirmLogo() {
    // console.log('this.state.file:',this.state.file);
    
    setTimeout(()=>{
      this.setState({uploadModal:false,previewModal:false});
      }, 1000);
      this.props.casesAction.uploadLogo(this.state.file);
  }

   handleBackLogo() {
    this.setState({uploadModal:true,previewModal:false});
  }
  
  render() {
    const tooltip = (
  <Tooltip id="tooltip">Remove from report</Tooltip>
);
     var products;
            
    const {marks} = this.props;        
    const {profile} = this.props;
    const MarkSet=this.props.marks;

    if(this.props.report) {
      products = _.map(this.props.report,function(p){
        return {title: p.title, created: new Date(p.created).getDate()+'/' +( new Date(p.created).getMonth()+1)+'/'+ new Date(p.created).getFullYear(), id:p.id }
      })
    }     

    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img style={{maxWidth:'200px',maxHeight:'250px',height:'auto',width:'auto'}} src={imagePreviewUrl} />);
}     
    
    return (
      <div>
       {this.props.marks &&
        <div>
        <div id={this.state.sideNav ? "mySidenav-active" : "mySidenav"} className="sidenav">
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
      {!this.state.global_search && <div className="mark-profile">
              <div className="row prop-top-panel">
                    <div className="col-sm-12">
                      <i onClick={this.openNav.bind(this)} className="fa fa-bars pull-left" aria-hidden="true"></i>
                      <Link to="/search" ><i className="fa fa-search pull-right" aria-hidden="true"></i></Link>
                    </div>
                  </div>
              <div className="wrapper">
                  <div className="container-fluid">
                      <div className="row">
                          <div className="col-sm-12">
                              <div className="page-title-box">
                                  <h4 className="page-title">MikeLegal</h4> 
                                  {this.props.profile && this.props.profile.picture && <img style={{paddingTop:'30px',maxWidth:'200px', maxHeight:'240px',height:'auto', width:'auto'}} src={this.props.profile.picture} />}
                                  {this.props.profile && !this.props.profile.picture && <img style={{paddingTop:'30px',maxWidth:'200px', maxHeight:'240px',height:'auto', width:'auto'}} src="../../images/no-image-found.gif" />}
                                  <br/>
                                  <div style={{display:'flex', paddingTop:'10px'}} >
                                  
                                  {this.props.profile && this.props.profile.picture && <Button onClick={this.handleUpload.bind(this)}  ><i style={{padding:'5px 5px', color:'#FFF', fontSize:'18px', cursor:'pointer'}} className="fa fa-upload" aria-hidden="true"></i>Change</Button>}
                                  {this.props.profile && !this.props.profile.picture && <Button onClick={this.handleUpload.bind(this)}  ><i style={{padding:'5px 5px', color:'#FFF', fontSize:'18px', cursor:'pointer'}} className="fa fa-upload" aria-hidden="true"></i>Upload</Button>}
                                  </div>
                              </div>
                          </div>
                      </div> 
      
              <div className="row report-element-area-mark">
                  <div className="col-sm-12 mark-docs-table widget">
                         <div className="documents-area-mark">
                         <div className="row">
                           <div className="col-sm-12">
                           <div className="col-sm-5"><h4>Your Added Marks</h4></div>
                                                                             
                           </div>
                         </div>

                         <hr />
                         <div style={{maxHeight:'300px',overflowY:'scroll'}} className="col-sm-12 profile-mark">
                            {this.props.marks && this.props.marks.map(mark => 
                            <p>{mark.term}</p>)}
                         </div>
                </div>
              </div>
                   </div> 

                   <div className="row report-element-area-mark">
               
                  <div className="col-sm-12 report-table">
                    <div className="report-area-profile">
                    <div className="row">
                           <div className="col-sm-12 report-table-header">
                           <h4>Your Reports</h4>                  
                           </div>
                         </div>
                      <BootstrapTable data={ products }>
                          <TableHeaderColumn dataField='title' isKey>Report Name</TableHeaderColumn>
                          <TableHeaderColumn dataField='created'>Date of Download</TableHeaderColumn>
                          <TableHeaderColumn dataFormat={this.downloadFormatter.bind(this)}>Download</TableHeaderColumn>
                      </BootstrapTable>
                    </div>
                  </div>
                   </div>  
                   </div>  

                   <Modal style={{marginTop:'-6%'}} show={this.state.uploadModal} onHide={this.closeUpload.bind(this)}>
                    <Modal.Body style={{paddingTop:'0'}}>
                   
                      <div className="row">
                        <div style={{height:'auto', background:'#4285f4', color:'white',borderTopRightRadius:'6px', borderTopLeftRadius:'6px'}} className="col-sm-12 TmWatchTop">
                         <div className="row">
                     <div className="col-sm-12">
                        <div className="col-sm-6 pull-right">
                          <i onClick={this.closeUpload.bind(this)} style={{color:'#FFF', fontSize:'20px', paddingRight:'10px', cursor:'pointer'}} className="fa fa-times pull-right" aria-hidden="true"></i>
                        </div>
                     </div>
                    </div>
                          <h2 style={{textAlign:'center', paddingBottom:'20px'}}>Upload Your Logo Here</h2>
                        </div>
                      {/*<ImagesUploader
                                            url="http://13.127.81.203/api/me/profile/"
                                            optimisticPreviews
                                            multiple={false}
                                            onLoadEnd={(err) => {
                                                if (err) {
                                                    console.error(err);
                                                }
                                            }}
                                            />*/}
                         <input onChange={this.logoUploadFile.bind(this)} className="btn btn-primary" type="file" style={{width:'300px', margin: '22% 0px 25px 27%'}} accept="image/png,image/jpg,image/jpeg" />
                         <br/>

                      </div>

                    </Modal.Body>
                </Modal>

                <Modal style={{marginTop:'-6%'}} show={this.state.previewModal} onHide={this.closePreview.bind(this)}>
                    <Modal.Body style={{paddingTop:'0', textAlign:'center'}}>

                     <div className="row">
                     <div className="col-sm-12 pull-right">
                        
                          <i onClick={this.closePreview.bind(this)} style={{color:'#4285f4', fontSize:'20px', paddingRight:'10px', cursor:'pointer'}} className="fa fa-times pull-right" aria-hidden="true"></i>
                        
                     </div>
                    </div>
                   
                      <div className="row">
                        <div style={{paddingTop:'4%'}} className="col-sm-12">
                          {$imagePreview}
                        </div>
                      </div>
                       <div className="row">
                        <div className="col-sm-12 mark-delete" style={{textAlign:'center'}} >
                    <button onClick={this.handleConfirmLogo.bind(this)} style={{borderRadius:'0'}} className="btn btn-primary">
                        Confirm
                     </button>
                      <br />
                      <button style={{background:'#FFF', border:'none', color:'#4285f4', backgroundImage:'none'}} onClick={this.handleBackLogo.bind(this)} className="btn btn-default">Go Back</button>
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


            </div>
            <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
            </div>}</div>}
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
  console.log('State check:', state);
   return ({marks: state.search.marks, report: state.report.report, profile:state.profile.profile });
}

function mapDispatchToProps(dispatch) {
  return  {
      casesAction: bindActionCreators(casesAction, dispatch)
    };
  
}
export default connect(mapStateToProps,mapDispatchToProps)(ProfilePage);