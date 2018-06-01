import React, { Component } from 'react';
import {FormGroup, Modal,  Tooltip, OverlayTrigger, FormControl, Col, ControlLabel, DropdownButton, MenuItem, Checkbox, Navbar, Nav, NavItem, Button, ButtonGroup} from 'react-bootstrap';
import  _  from 'lodash';
import Select from 'react-select';
import * as casesAction  from '../actions/index';
import { bindActionCreators } from 'redux';
import { browserHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import Highcharts from 'highcharts/highstock';
var ReactHighcharts = require('react-highcharts');
var Highlight = require('react-highlight');
var HighchartsMore = require('highcharts-more');
HighchartsMore(ReactHighcharts.Highcharts);
import GlobalSearch from './search';
import AlertContainer from 'react-alert';
import fileDownload from 'react-file-download';
import animateScrollTo from 'animated-scroll-to';
import {default as ExcelFile, ExcelSheet,ExcelColumn} from "react-data-export";
import {CSVLink} from 'react-csv';

class Report extends Component {

componentWillMount() {
   // this.setState({SelectedValue:this.state.customValue});
   this.props.casesAction.fetchReportRe(this.props.params.text);
   this.props.casesAction.fetchProfile();
   window.removeEventListener('scroll', this.handleScrollElement);
   setTimeout(()=>{
        this.showAlert('Choose multiple marks using the checkbox to delete them','info',10000);  
      }, 2000);
   
 }

 componentDidMount() {
    var selectedReport;
    var report_id = this.props.params.text;
    window.addEventListener('scroll', this.handleScrollElement);
// setTimeout(()=>{
//         selectedReport = _.filter(this.props.report, function(o) { return o.id==report_id; });
//         console.log('selectedReport:', selectedReport);
//       }, 1000);
 
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



  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      showModal2:false,
      SelectedValue:[],
      deleteId:'',
      mark_id:'',
      customValue: [{label:'Trademark owner', value:'trademark_owner'},
                           {label:'Similarity', value:'similarity'},
                           {label:'Application', value:'application'},
                           {label:'Opposition period', value:'opposition_period'},
                           {label:'Classes', value:'classes'},
                           {label:'Closest Mark', value:'closest_mark'}
                           ],
      global_search:false,
      sideNav:false,
      showDownloadModal:false,
      selected_report:'',
      showTmWatch: false,
      showTmManager:false,
      showTmLitigation: false,
      interested:false,
      uploadModal:false,
      uploaded_logo:false,
      previewModal:false,
      file:'',
      delete_mark:[],
      delete_mark_id:[],
      showMultiMark:false
    }
  }

  alertOptions = {
    offset: 14,
    position: 'top right',
    theme: 'dark',
    time: 3000,
    transition: 'scale'
  }

deleteMultipleMarks() {

  // console.log('deleteID:', deleteID);
   // newArr = _.filter(newArr, function(element){return element.id!=deleteID;});
   // var newArrId=[];
   // _.map(newArr, function(arr){
   //  newArrId.push(arr.id)
   // })
  // this.props.casesAction.deleteReportMark({id:this.props.params.text, selected_marks:this.state.delete_mark_id, selection_type:'remove'});
  //  // console.log('newArr:', newArr);
  // this.showAlert('Mark Deleted Successfully','error');
  this.setState({showMultiMark:true});
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


showAlert = (message, type,time) => {
    this.msg.show(message, {
      time: time,
      type: type
    })
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

  close() {
  this.setState({ showModal : false });
}

open() {

  this.setState({ showModal : true });
  
}

open2(data, mark_id) {
  // console.log('data:', data);
  this.setState({showModal2:true, deleteId:data.id, mark_id:mark_id });
}

close2() {
  this.setState({showModal2:false});
}

handleSelectChange(value) {

    this.setState({SelectedValue: value});
      // console.log('You have selected: ', this.state.SelectedValue);
}

 handleSearch() {
    this.setState({global_search:true});
  }

  handleCloseSearch() {
    this.setState({global_search:false})
  }

  openDownloadModal() {
    if(this.props.profile && !this.props.profile.picture) {
      this.setState({uploadModal:true});
    }
    else {
      this.setState({showDownloadModal:true});
    }
    
  }

  closeDownload() {
    this.setState({showDownloadModal:false, uploadModal:false});
  }

  handlePdfDownload() {
    this.props.casesAction.reportDownload(this.props.params.text, this.props.report.title);
  }

 handleProprietorClick(data) {
      if(data){
        this.props.casesAction.RedirectToProprietor(data.id);
      }
        
        this.setState({loaderState:true});
      // browserHistory.push('/proprietor/'+data.proprietor[0].id);
    }

   handleUpload() {
  this.setState({uploadModal:true});
}

closeUpload() {
  this.setState({uploadModal:false});
}

logoUploadFile(e) {
  //   e.preventDefault();
  // let file = e.target.files[0];
  // // const camp_id = this.props.params.id;
  // console.log('Params ID',file);
  // this.props.casesAction.uploadLogo(file);
  // // this.props.siteActions.uploadSites(file,camp_id);
  // this.setState({uploaded_logo:true});
     e.preventDefault();
      let reader = new FileReader();
    let file = e.target.files[0];
  if(file.size>5000000) {
           this.showAlert('Total size should not exceed 5 MB','error',3000);
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
       this.setState({uploadModal:false, previewModal:true, showDownloadModal:false })
      }, 1500);
  }      

  }   

  handleSkip() {
    this.setState({uploadModal:false,showDownloadModal:true});
  }

closePreview() {
  this.setState({uploadModal:false,previewModal:false,showDownloadModal:false});
}

handleConfirmLogo() {
  // console.log('this.state.file:',this.state.file);
  this.setState({uploadModal:false,previewModal:false,showDownloadModal:true});
    this.props.casesAction.uploadLogo(this.state.file);
}

handleBackLogo() {
  this.setState({uploadModal:true,previewModal:false,showDownloadModal:false});
}

openUploadModal() {
  this.setState({uploadModal:true,previewModal:false,showDownloadModal:false});
}

handleMultiMarkDelete(data) {
    var data;
    var data2;
     var a = _.filter(this.state.delete_mark_id, function(o) {
         return (o==data.id)
     })
     if(a.length>0) {
        data = _.filter(this.state.delete_mark_id, function(o) {
            return !(o==data.id)
        })
        
        data2=_.filter(this.state.delete_mark,function(p){
          return  !(a==p.id)
        })
        this.setState({delete_mark_id:data, delete_mark:data2});
     } else {
         var mark_id = this.state.delete_mark_id;
        mark_id.push(data.id);
        var marks = this.state.delete_mark;
        marks.push(data);

        this.setState({delete_mark_id:mark_id,delete_mark:marks});
     }
  }

handleConfirmMulti() {
  this.props.casesAction.deleteReportMark({id:this.props.params.text, selected_marks:this.state.delete_mark_id, selection_type:'remove'});
   // console.log('newArr:', newArr);
  this.setState({showMultiMark:false,delete_mark:[],delete_mark_id:[]});
  setTimeout(()=>{
     this.showAlert('Mark Deleted Successfully','error',3000);
    }, 500);
}

handleReportDelete() {

  var newArr=this.props.report.selected_marks;
  var deleteID=[];
  deleteID.push(this.state.deleteId);
  this.props.casesAction.deleteReportMark({id:this.props.params.text, selected_marks:deleteID, selection_type:'remove'});
  this.setState({showModal2:false});
  this.showAlert('Mark Deleted Successfully','error',3000);  


    var data;
    var data2;
    var delId=this.state.deleteId;

        data = _.filter(this.state.delete_mark_id, function(o) {
            return !(o==delId)
        })
        
        data2=_.filter(this.state.delete_mark,function(p){
          return  !(p.id==delId)
        })
        this.setState({delete_mark_id:data, delete_mark:data2});
}


  closeMultiMark() {
    this.setState({showMultiMark:false});
  }

  DownloadExcel() {
    // var importantStuff = window.open('', '_blank');
    // window.open(`https://tmsearchapi.mikelegal.com/api/reports/${this.props.params.text}/excel/`, '_blank');
    this.props.casesAction.downloadExcel(this.props.params.text,this.props.report.title);
    setTimeout(()=>{
     window.open(`https://tmsearchapi.mikelegal.com/api/reports/${this.props.params.text}/excel/`, '_blank');
    }, 1000);
     
  }

  
  render() {
    console.log('This.state:', this.state);

    if(this.props.report) {
      // console.log('sadasdsadsa');
    }

   const {report} = this.props;

    var config = {
   chart: {
        type: 'gauge',
        plotBackgroundColor: null,
        plotBackgroundImage: null,
        plotBorderWidth: 0,
        plotShadow: false,
        plotBands: { // mark the weekend
            color: '#4285f4'
            
        }
    },

    title: {
        text: ''
    },

    pane: {
        startAngle: -90,
        endAngle: 90,
        background: '#4285f4',
        background: [{
            backgroundColor: {
                linearGradient: { x1: 1, y1: 1, x2: 0, y2: 1 },
                stops: [
                    [0, '#4285f4'],
                    [1, '#4285f4']
                ]
            },
            borderWidth: 0,
            outerRadius: '109%'
        }, {
            backgroundColor: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                stops: [
                    [0, '#4285f4'],
                    [1, '#4285f']
                ]
            },
            borderWidth: 1,
            outerRadius: '100%'
        }, {
            // default background
        }, {
            backgroundColor: '#4285f4 !important',
            borderWidth: 0,
            outerRadius: '90%',
            innerRadius: '90%'
        }]
    },

    // the value axis
    yAxis: {
        min: 0,
        max: 6,

        minorTickInterval: 'auto',
        minorTickWidth: 0,
        minorTickLength: 0,
        minorTickPosition: 'outside',
        minorTickColor: '#4',

        tickPixelInterval: 30,
        tickWidth: 0,
        tickPosition: 'outside',
        tickLength: 0,
        tickColor: '#FFF',
        labels: {
            step: 100,
            rotation: 'auto'
        },
        title: {
            text: ''
        },
        plotBands: [{
            from: 0,
            to: 2,
            color: '#DF5353'
        }, {
            from: 2,
            to: 4,
            color: '#DDDF0D' // yellow
        }, {
            from: 4,
            to: 6,
            color: '#55BF3B' // red
        }]
    },

    series: [{
        name: 'Safety Level',
        data: [1],
        tooltip: {
            valueSuffix: ''
        }
    }]

};



    const dummy_data= [
    {company_name: 'Jonda' ,trademark_owner:'honda' , similarity: '78%' ,application: '435TH4/13' ,opposition_period:'Sep,2017-Oct,2017' ,classes:'23,31,32' , date_usage:'24/11/2003', date_application:'1/9/2003', validity:'8/10/2022'},
    {company_name: 'Reepok' ,trademark_owner:'honda' , similarity: '78%' ,application: '435TH4/13' ,opposition_period:'Sep,2017-Oct,2017' ,classes:'23,31,32' , date_usage:'24/11/2003', date_application:'1/9/2003', validity:'8/10/2022' },
    {company_name: 'Pomo' ,trademark_owner:'honda' , similarity: '78%' ,application: '435TH4/13' ,opposition_period:'Sep,2017-Oct,2017' ,classes:'23,31,32' , date_usage:'24/11/2003', date_application:'1/9/2003', validity:'8/10/2022' },
    {company_name: 'Coke' ,trademark_owner:'honda' , similarity: '78%' ,application: '435TH4/13' ,opposition_period:'Sep,2017-Oct,2017' ,classes:'23,31,32' , date_usage:'24/11/2003', date_application:'1/9/2003', validity:'8/10/2022' },
    {company_name: 'Abidas' ,trademark_owner:'honda' , similarity: '78%' ,application: '435TH4/13' ,opposition_period:'Sep,2017-Oct,2017' ,classes:'23,31,32' , date_usage:'24/11/2003', date_application:'1/9/2003', validity:'8/10/2022' },
    {company_name: 'CMW' ,trademark_owner:'honda' , similarity: '78%' ,application: '435TH4/13' ,opposition_period:'Sep,2017-Oct,2017' ,classes:'23,31,32' , date_usage:'24/11/2003', date_application:'1/9/2003', validity:'8/10/2022' },
    {company_name: 'Maudi' ,trademark_owner:'honda' , similarity: '78%' ,application: '435TH4/13' ,opposition_period:'Sep,2017-Oct,2017' ,classes:'23,31,32' , date_usage:'24/11/2003', date_application:'1/9/2003', validity:'8/10/2022' }
    ];

     const paramArray = [{label:'Trademark owner', value:'trademark_owner'},
                           {label:'Similarity', value:'similarity'},
                           {label:'Application', value:'application'},
                           {label:'Opposition period', value:'opposition_period'},
                           {label:'Classes', value:'classes'},
                           {label:'Closest Mark', value:'closest_mark'}
                           ];

     const tooltip = (
  <Tooltip id="tooltip">Remove from report</Tooltip>
);

     // var selectedMarks;
     // if(actualData.length==0){
     //  selectedMarks=0;
     // }
     var mark_id;
     if(this.props.report && this.props.report.selected_marks && this.props.report.selected_marks.length>0) {
       mark_id= this.props.report.mark;
     }
    // console.log('actualData:', actualData);

    if(this.props.report && this.props.report.selected_marks && this.props.report.selected_marks.length==0) {
      browserHistory.push('/report_set')
    }

     let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img style={{maxWidth:'200px',maxHeight:'250px',height:'auto',width:'auto'}} src={imagePreviewUrl} />);
}

const multiDataSet = [
    {
        columns: ["Name", "Salary", "Sex"],
        data: [
            ["Johnson", 30000, "Male"],
            ["Monika", 355000, "Female"],
            ["Konstantina", 20000, "Female"],
            ["John", 250000, "Male"],
            ["Josef", 450500, "Male"],
        ]
    },
    {
        xSteps: 1, // Will start putting cell with 1 empty cell on left most
        ySteps: 5, //will put space of 5 rows,
        columns: ["Name", "Department"],
        data: [
            ["Johnson", "Finance"],
            ["Monika", "IT"],
            ["Konstantina", "IT Billing"],
            ["John", "HR"],
            ["Josef", "Testing"],
        ]
    }
];

     var actualData=[];
     var csvData= [];

     if(this.props.report && this.props.report.selected_marks && this.props.report.selected_marks.length>0) {
      actualData = this.props.report.selected_marks;
      _.map(this.props.report.selected_marks,function(m){
        if(m.date_of_usage) {
         csvData.push({'TRADEMARK NAME':m.applied_for,'APPLICATION NO.':m.application_number,CLASSES:m.associated_class.toString(),STATUS:m.status,'TRADEMARK TYPE':m.type.name,'DATE OF APPLICATION':new Date(m.application_date).getDate()+'/' + (new Date(m.application_date).getMonth()+1)+'/'+ new Date(m.application_date).getFullYear(),'DATE OF USAGE':new Date(m.date_of_usage).getDate()+'/' + (new Date(m.date_of_usage).getMonth()+1)+'/'+ new Date(m.date_of_usage).getFullYear(),'VALID UPTO':new Date(m.valid_upto).getDate()+'/' + (new Date(m.application_date).getMonth()+1)+'/'+ new Date(m.application_date).getFullYear(),'PROPRIETOR NAME':m.proprietor[0].name,DESCRIPTION:m.description})
        }
        else {
         csvData.push({'TRADEMARK NAME':m.applied_for,'APPLICATION NO.':m.application_number,CLASSES:m.associated_class.toString(),STATUS:m.status,'TRADEMARK TYPE':m.type.name,'DATE OF APPLICATION':new Date(m.application_date).getDate()+'/' + (new Date(m.application_date).getMonth()+1)+'/'+ new Date(m.application_date).getFullYear(),'DATE OF USAGE':'Proposed to be used','VALID UPTO':new Date(m.valid_upto).getDate()+'/' + (new Date(m.application_date).getMonth()+1)+'/'+ new Date(m.application_date).getFullYear(),'PROPRIETOR NAME':m.proprietor[0].name,DESCRIPTION:m.description})
        }
      })

      console.log('csvData:',csvData);
     }
    
    return (
      <div>
      <div style={{background:'#F1F2F1'}} >
        {!this.props.report && 
        <div className="col-sm-12" style={{textAlign:'center', background:'#F1F2F1', paddingTop:'10%', paddingBottom:'8%',height:'100vh'}} >
        <img src="../../images/loading.gif" style={{display:"block",left:'50%',marginLeft:"auto",marginRight:"auto", width:'40%'}}/>
        <br/>
        <p style={{fontSize:'18px', color:'#525252'}}>Crunching latest trademark data for you. Hang on... </p>
        </div>
        }
    </div>

      {this.props.report &&  
      <div> <div id={this.state.sideNav ? "mySidenav-active" : "mySidenav"} className="sidenav">
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
      {!this.state.global_search && 
        <div className="container-fluid report">
        <div className="row prop-top-panel">
          <div className="col-sm-12">
              <div className="col-sm-4">
              <i  onClick={this.openNav.bind(this)} className="fa fa-bars pull-left" aria-hidden="true"></i>
              </div>
              <div className="col-sm-4" style={{textAlign:'center'}}>
              <h3>Report of {localStorage.getItem('report_term')}</h3>
              <br />
              {this.props.report && this.props.report.selected_marks && <h4>{this.props.report.selected_marks.length} marks in this report</h4>}
              </div>
              <div className="col-sm-4">
              <Link to="/search" ><i className="fa fa-search pull-right" aria-hidden="true"></i></Link>
              </div>    
          </div>
        </div>
         <div className="row btn-row">
          <div className="col-sm-12">
          <div className="col-sm-6">
          <div className="report-btn-group pull-left">
             <ButtonGroup className="report-page-button" >
               <button onClick={this.openDownloadModal.bind(this)} style={{color:'#4285f4'}} className="btn btn-success">Download</button>
               {this.props.profile && this.props.profile.picture && <button style={{color:'#4285f4',marginLeft:'0 !important'}} className="btn btn-success" onClick={this.openUploadModal.bind(this)}>Change Logo</button>}
               {this.state.delete_mark_id.length>0 && <button onClick={this.deleteMultipleMarks.bind(this)} style={{color:'#4285f4'}} className="btn btn-success">Delete {this.state.delete_mark_id.length} mark(s)</button>}
             </ButtonGroup>
          </div>
          </div>
          
          </div>
          </div>

                <Modal show={this.state.showDownloadModal} onHide={this.closeDownload.bind(this)}>
                    <Modal.Body>
                    <div className="row">
                      <div className="col-sm-12">
                        <i onClick={this.closeDownload.bind(this)} style={{color:'#4285f4', fontSize:'20px', paddingRight:'10px', cursor:'pointer'}} className="fa fa-times pull-right" aria-hidden="true"></i>
                      </div>
                    </div>
                      <h3 style={{textAlign:'center'}}>Report once downloaded can't be changed, please confirm your download</h3>
                      <div className="row">
                        <div style={{paddingTop:'20px', paddingBottom:'20px'}} className="col-sm-12">
                          <div style={{textAlign:'center', cursor:'pointer',borderRight:'1px solid #DDD'}} className="downloadbtn col-sm-6">
                          <button style={{backgroundColor:'#4285f4',backgroundImage:'none !important'}} onClick={this.handlePdfDownload.bind(this)} className="btn btn-primary" ><i style={{color:'#FFF',paddingRight:'5px'}} className="fa fa-file"></i>Download Pdf</button>
                          </div>
                          <div style={{textAlign:'center', cursor:'pointer'}} className="downloadbtn col-sm-6">
                          <button style={{backgroundColor:'#4285f4',backgroundImage:'none !important'}} onClick={this.DownloadExcel.bind(this)} className="btn btn-primary" ><i style={{color:'#FFF',paddingRight:'5px'}} className="fa fa-table"></i>Download Excel</button>
                          </div>
                        </div>
                      </div>

                    </Modal.Body>
                </Modal>

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
                      
                         <input onChange={this.logoUploadFile.bind(this)} className="btn btn-primary" type="file" style={{width:'300px', margin: '22% 0px 25px 27%'}} accept="image/png,image/jpg,image/jpeg" />


                      </div>
                      <div className="row">
                      <div className="col-sm-12" >
                      <div className="col-sm-2 col-sm-offset-5" >
                        <button onClick={this.handleSkip.bind(this)} style={{backgroundColor:'#FFF !important',color:'#4285f4 !important',textAlign:'center !important',border:'none !important'}} className="btn btn-default" >Skip</button>
                      </div>
                       
                      </div>
                        
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

                <Modal show={this.state.showModal2} onHide={this.close2.bind(this)} >
                 <Modal.Body>
                    
                      <div className="row">
                        <div style={{paddingTop:'20px', textAlign:'center'}} className="col-sm-12">
                           <h3>Are you sure you want to delete this mark?</h3>
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

                  <Modal show={this.state.showMultiMark} onHide={this.closeMultiMark.bind(this)} >
                 <Modal.Body>
                    
                      <div className="row">
                        <div style={{paddingTop:'20px', textAlign:'center'}} className="col-sm-12">
                           <h3>Are you sure you want to delete the following marks?</h3>
                        </div>
                      </div>

                      <ul style={{listStyle:'none',maxHeight:'300px',overflowY:'scroll'}} >
                      <li style={{background:"#FFF"}} ><div style={{paddingLeft:'0px', borderBottom:'1.5px solid #4285f4',marginBottom:'15px',paddingBottom:'10px'}} className="col-sm-12"><div className="col-sm-4 pull-left"><p4 style={{fontSize:'15px'}} >Mark Name</p4></div><div className="col-sm-4" style={{textAlign:'center', fontSize:'15px'}} > <p2>Application Number</p2></div><div className="col-sm-4 pull-right" style={{textAlign:'right'}} ><p3>Trademark Type</p3></div></div></li>
                        {this.state.delete_mark && this.state.delete_mark.map(rep => <li style={{background:"#FFF"}} ><div style={{paddingLeft:'0px', borderBottom:'1px solid #DDD',marginBottom:'15px',paddingBottom:'10px'}} className="col-sm-12"><div className="col-sm-4 pull-left"><p4 style={{fontSize:'15px'}} >{rep.applied_for}</p4></div><div className="col-sm-4" style={{textAlign:'center', fontSize:'15px'}} > <p2>{rep.application_number}</p2></div><div style={{textAlign:'right'}} className="col-sm-4"><p3>{rep.type.name}</p3></div></div></li>)}
                      </ul>
                      <div className="row">
                        <div className="col-sm-12 mark-delete" style={{textAlign:'center'}} >
                    <button onClick={this.handleConfirmMulti.bind(this)} style={{borderRadius:'0'}} className="btn btn-primary">
                        Delete
                     </button>
                      <br />
                      <button style={{background:'#FFF', border:'none', color:'#4285f4', backgroundImage:'none'}} onClick={this.closeMultiMark.bind(this)} className="btn btn-default">Cancel</button>
                        </div>
                      </div>
                    </Modal.Body>
                  </Modal> 

        <div className="row report-element-area">
          <div className="col-sm-12">
          { this.props.report && this.props.report.selected_marks && this.props.report.selected_marks.map(data =>
            <div className="col-sm-12 report-single widget">
            <div className="row">
              <div className="col-sm-12">
                <input onClick={()=> {this.handleMultiMarkDelete(data)}} checked={this.state.delete_mark_id.indexOf(data.id)!=-1} type="checkbox" />
              </div>
            </div>
                   <div className="parameter-area">
                      <div className="col-sm-6 parameter"> 
                      <table className="table">
                        <tbody>
                          <tr >
                            {data.applied_for && <td style={{width:'35%'}}>Name of Trademark:</td>}
                            {data.applied_for && <td>{data.applied_for}</td>}
                          </tr>
                          <tr style={{textAlign:'left !important'}}>
                            {data.application_number && <td>Application No.:</td>}
                            {data.application_number && <td>{data.application_number}</td>}
                          </tr>
                          <tr style={{textAlign:'left !important'}}>
                            {data.associated_class && <td>Classes:</td>}
                            {data.associated_class && <td>{data.associated_class.sort((a,b) => a - b).toString()}</td>}
                          </tr>
                          <tr style={{textAlign:'left !important'}}>
                            {data.status && <td>Status: </td>}
                            {data.status && <td>{data.status}</td>}
                          </tr>
                          <tr style={{textAlign:'left !important'}}>
                            {data.type && data.type.name && <td>Trademark Type: </td>}
                            {data.type && data.type.name && <td>{data.type.name}</td>}
                          </tr>
                          <tr style={{textAlign:'left !important'}}>
                            {data.application_date && <td>Date of Application: </td>}
                            {data.application_date && <td>{new Date(data.application_date).getDate()+'/' + (new Date(data.application_date).getMonth()+1)+'/'+ new Date(data.application_date).getFullYear()}</td>}
                          </tr>
                          <tr style={{textAlign:'left !important'}}>
                            <td>Date of Usage: </td>
                            {data.date_of_usage && <td>{new Date(data.date_of_usage).getDate()+'/' + (new Date(data.date_of_usage).getMonth()+1)+'/'+ new Date(data.date_of_usage).getFullYear()}</td>}
                            {!data.date_of_usage && <td>Proposed to be used</td>}
                          </tr>
                          <tr style={{textAlign:'left !important'}}>
                            {data.valid_upto && <td>Valid Upto: </td>}
                            {data.valid_upto && <td>{new Date(data.valid_upto).getDate()+'/' + (new Date(data.valid_upto).getMonth()+1)+'/'+ new Date(data.valid_upto).getFullYear()}</td>}
                          </tr>
                          <tr style={{textAlign:'left !important'}}>
                            {data.proprietor && data.proprietor[0] && <td>Proprietor Name:</td>}
                            {data.proprietor && data.proprietor.length>0 && <td className={data.proprietor.length>1?"single_proprietor":"multiple_proprietor"} ><ul style={{paddingLeft: '4%'}} >
                             {data.proprietor.map(propr=> <li style={{cursor:'pointer', color:'#4285f4',background:'#FFF'}} onClick={()=> {this.handleProprietorClick(propr)}} >{propr.name}</li>) 
                            }</ul> </td> }
                          </tr>
                          <tr style={{textAlign:'left !important'}}>
                            {data.description && <td>Description: </td>}
                            {data.description && <td>{data.description}</td>}
                          </tr>
                        </tbody>
                      </table>
                      </div>
                      <div style={{textAlign:'center'}} className="col-sm-5  mark-image">
                            {!data.associated_image && <img style={{maxHeight:'225px', maxWidth:'350px', height:'auto',width:'auto'}} src="../../images/no-image-found.gif" />}
                            {data.associated_image && <img  style={{maxHeight:'250px', maxWidth:'300px', height:'auto',width:'auto'}} src={data.associated_image} /> }
                      </div>
                      </div>
                      <div className="col-sm-1 report-action-btn">
                      <OverlayTrigger placement="left" overlay={tooltip}>
                        <i className="fa fa-trash pull-right" onClick={() => {this.open2(data, mark_id)}} aria-hidden="true"></i>
                      </OverlayTrigger>
                      </div>
                           
                         </div>
          )}

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
        
      </div>}<AlertContainer ref={a => this.msg = a} {...this.alertOptions} /> </div>}
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
  // console.log('State check:', state);
   return ({report: state.report.single_report, profile:state.profile.profile });
}

function mapDispatchToProps(dispatch) {
  return  {
      casesAction: bindActionCreators(casesAction, dispatch)
    };
  
}
export default connect(mapStateToProps,mapDispatchToProps)(Report);