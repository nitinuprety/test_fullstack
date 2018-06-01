import React, { Component } from 'react';
import {FormGroup,Tooltip, OverlayTrigger, Modal, FormControl, Col, ControlLabel, DropdownButton, MenuItem, Checkbox,Navbar, Nav, NavItem,NavDropdown, Button, ButtonGroup} from 'react-bootstrap';
import  _  from 'lodash';
import Select from 'react-select';
import update from 'react-addons-update';
import * as casesAction  from '../actions/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Highcharts from 'highcharts/highstock';
var ReactHighcharts = require('react-highcharts');
var Highlight = require('react-highlight');
var HighchartsMore = require('highcharts-more');
HighchartsMore(ReactHighcharts.Highcharts);
import {Collapsible, CollapsibleItem, Tag} from 'react-materialize';
import { browserHistory, Link } from 'react-router';
import { Scrollbars } from 'react-custom-scrollbars';
import FlipCard from 'react-flipcard';
import GlobalSearch from './search';
import AlertContainer from 'react-alert';
import LazyLoad from 'react-lazyload';
import fuzzyFilterFactory from 'react-fuzzy-filter';
const {InputFilter, FilterResults} = fuzzyFilterFactory();
import StickyBox from "react-sticky-box";
import ReactInterval from 'react-interval';
import animateScrollTo from 'animated-scroll-to';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import InputRange from 'react-input-range';
import DropdownMenu, { NestedDropdownMenu } from 'react-dd-menu';



class FlashResults extends Component {

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
      add_state: false,
      add_report: [],
      add_report_id:[],
      detail: false,
      filter:'Class 1',
      tag: true,
      typeSearch: false,
      searchInput:'',
      popupVisible: false,
      all_class:true,
      called:false,
      global_search: false,
      check_all:false,
      hun: false,
      nin:false,
      eig:false,
      sev:false,
      six:false,
      fif:false,
      fou:false,
      thi:false,
      twe:false,
      one:false,
      initialItems: [
         "Class 1 ",
         "Class 2",
         "Class 3"
       ],
       items: [],
       fitlerSearch:false,
       delete_report: false,
       all_classes:false,
       isFlipped: false,
       showModal:false,
       showModal2:false,
       sideNav: false,
       reportCount:0,
       filterState: false,
       filtereData:[],
       filteredDataFuzzy:[],
       filteredDataInitials:[],
       filteredDataWildcard:[],
       filteredDataContextual:[],
       filtereChips:[],
       filterCount:[],
       filterDynamic:[],
       propFilter:false,
       filteredResult:false,
       loaderState:false,
       alertOptions:{
                  offset: 14,
                  position: 'top right',
                  theme: 'dark',
                  time: 3000,
                  transition: 'scale'
                },
      sort_hl:false,
      sort_lh:false,
      showTmWatch: false,
      showTmManager:false,
      showTmLitigation: false,
      interested:false,
      showInterested: false,
      loadBtn:false,
      markReport:[],
      activeClass:false,
      activeStates:false,
      activeStatus:false,
      activeType:false,
      activeDOU:false,
      activeDOA:false,
      activeSimilarity:false,
      scrollt:false,
      colors: ["#044747", "#079191", "#38adad", "#90e3e3", "#d5f7f7"],
      loadmore:false,
      initial_mark:[],
      initial_mark_fuzzy:[],
      initial_mark_wildcard:[],
      initial_mark_initials:[],
      check_data:[],
      scrollTop:false,
      showRT:false,
      openPrevDown:false,
      ipIndiaCheck:false,
      checkDynamic:[],
      top_result:false,
      top_data:'',
      filteredDataTop:[],
      selected_class:[],
      menuOpen:false,
      SimMenuOpen:false,
      ClMenuOpen:false,
      CliMenuOpen:false,
      TpMenuOpen:false,
      DouMenuOpen:false,
      DoaMenuOpen:false,
      StatusMenuOpen:false,
      StatesMenuOpen:false,
      startDate:'',
      endDate:'',
      startDateApp:'',
      endDateApp:'',
      selected_classes:[],
      selected_status:[],
      selected_type:[],
      selected_similarity:[],
      selected_state:[],
      selected_similarity:[],
      selected_dou:[],
      selected_doa:[],
      graph_stored:false,
      series:[],
      StatusSeries:[],
      YearSeries:[],
      filters_stored:false,
      states:'' ,
      status:'' ,
      type:'',
      class_fil:'',
      sim_value: { min: 0, max: 100 },
      sim_value_under: 'min0max100',
      opp_count_state:false,
      opp_count:'',
      opp_notice_count:'',
      selected_years:[],
      slab:'',
      isMenuOpen:false,
      vulnerability_set:false,
      vulnerability_set_value:0,
      showSpecificMark:'',
      specificMark:''

    }


    this.handleProprietorClick = this.handleProprietorClick.bind(this);
    this.toggleClass = this.toggleClass.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeStart = this.handleChangeStart.bind(this);
    this.handleChangeEnd = this.handleChangeEnd.bind(this);
    this.handleChangeStartApp = this.handleChangeStartApp.bind(this);
    this.handleChangeEndApp = this.handleChangeEndApp.bind(this);

  }


  componentWillMount() {
    document.removeEventListener('click', this.handleOutsideClick, false);
  this.props.casesAction.checkIpIndia();
   this.props.casesAction.fetchCases();
   this.props.casesAction.fetchReportSet();
   this.setState({items: this.state.initialItems, global_search:false});
   localStorage.setItem('flash_result_flash',false);
   if(this.props.vulnerability) {
     localStorage.setItem('vulnerability',this.props.vulnerability.vulnerability);
   }
  
   var selectedmark = _.filter(this.props.marks, {term:localStorage.getItem('mark')});
   var searchType = localStorage.getItem('searchType');
   // console.log('searchType:', searchType);
   var fuzzyInput;
   var report;
   setTimeout(()=>{
       this.showAlert('vulnerability level is calculated on the basis of your selected mark', 'info', 7000);
       this.showAlert('Opposition data is under processing. Please click on \"Get Realtime info\" to see current data', 'info',900000);
       report = _.filter(this.props.report, function(r){return r.mark== localStorage.getItem('mark_id')});
       // console.log('this.props.report:',report)
       this.setState({markReport:report});
      }, 3000);

// window.removeEventListener('scroll', this.handleScroll);
window.removeEventListener('scroll', this.handleScrollElement);
   
   // if(searchType =='fuzzy') {
   //   fuzzyInput = localStorage.getItem('search').split('[[~]]');
   //  // console.log('fuzzyInput:', fuzzyInput);
   //  this.props.casesAction.GlobalSearchRe({query:fuzzyInput[0], search_base:'trademark',mark:localStorage.getItem('mark_id'), search_type:localStorage.getItem('searchType'),fuzzyDepth: fuzzyInput[1], search_classes:localStorage.getItem('search_classes'), page:1 });
   // }

   // else {
   //  // console.log('NotfuzzyInput:');
   //  this.props.casesAction.GlobalSearchRe({query:localStorage.getItem('search'), search_base:'trademark',mark:localStorage.getItem('mark_id'), search_type:localStorage.getItem('searchType'), search_classes:localStorage.getItem('search_classes'), page:1 });
   // }

   localStorage.setItem('page', 1);

        if(localStorage.getItem('via_search')=='false') {
        this.props.casesAction.GlobalFlashSearch({query:localStorage.getItem('search'), search_base:'trademark',mark:localStorage.getItem('mark_id'), search_type:'standard', search_classes:localStorage.getItem('search_classes'), page:1, flash_flag:true});

        var wildcard_query = '[[*]]'+localStorage.getItem('search')+'[[*]]';
        var final_wild = wildcard_query.replace(/ /g, "[[*]]");
        // var wildcard_query1= '[[*]]'+mark_arr[mark_arr_length-(mark_arr_length-1)]+
        console.log('wildcard_query:',final_wild);
        localStorage.setItem('wildcard_query',final_wild);
        var fuzzy_length= Math.round(localStorage.getItem('search').length*0.4) ;
        console.log('fuzzy_length:',fuzzy_length);
        localStorage.setItem('fuzzy_depth',fuzzy_length);
        var initial_check = localStorage.getItem('search').split(' ');
        console.log('initial_check:',initial_check);
        if(initial_check.length>1){
          this.props.casesAction.flashInitialsSearch({query:localStorage.getItem('search'), search_base:'trademark',mark:localStorage.getItem('mark_id'), search_type:'initials', search_classes:localStorage.getItem('search_classes'), page:1,flash_flag:true, filter_flag: false});
          localStorage.setItem('flash_initial',true);
        }
        else {
          localStorage.setItem('flash_initial',false);
        }

        this.props.casesAction.flashWildcardSearch({query:localStorage.getItem('wildcard_query'), search_base:'trademark',mark:localStorage.getItem('mark_id'), search_type:'flash_wildcard', search_classes:localStorage.getItem('search_classes'), page:1, flash_flag:true, filter_flag:false });
        // this.props.casesAction.flashContextualSearch({query:localStorage.getItem('search'), search_base:'trademark',mark:localStorage.getItem('mark_id'), search_type:'contextual', search_classes:localStorage.getItem('search_classes'), page:1 });
        this.props.casesAction.flashFuzzySearch({query:localStorage.getItem('search'), search_base:'trademark',mark:localStorage.getItem('mark_id'), search_type:'fuzzy',fuzzy_depth:fuzzy_length, search_classes:localStorage.getItem('search_classes'), page:1,flash_flag:true, filter_flag: true});

        this.setState({
          selected_classes:[],
          selected_status:[],
          selected_type:[],
          selected_state:[],
          sim_value: { min: 0, max: 100 }
        });

        localStorage.setItem('page_flash',1);
        localStorage.setItem('page_fuzzy',1);
        localStorage.setItem('page_initial',1);
        localStorage.setItem('page_wild',1);
      }
  }

componentDidMount() {
  // window.addEventListener('scroll', this.handleScroll);
 window.addEventListener('scroll', this.handleScrollElement);
};

handleScroll(event) {
  // console.log('the scroll things', window.pageYOffset);
  // if(window.pageYOffset>200) {
  //   document.getElementById("scrol").style.visibility='visible';
  // }
  // else if(window.pageYOffset<200) {
  //   document.getElementById("scrol").style.visibility='hidden';
  // }
  // // if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20)
};

  showAlert = (message, type, time) => {
    this.msg.show(message, {
      time: time,
      type: type
    })
  }

  // showAlertInfo = (message, type) => {
  //   this.msg2.show(message, {
  //     time: 7000,
  //     type: type
  //   })
  // }

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


  handleHover() {
    // console.log('it worked');
    this.setState({add_state:true});
  }

  handleOut() {
    // console.log('it worked too');
    this.setState({add_state:false});
  }
  
  

  handleAlerts(message) {
    // console.log('handleAlerts message:', message);
  }
  
  addReport(data) {

    var a=_.filter(this.state.add_report_id, function(b){return b==data.id});
    // console.log('a:',a);

     if(a.length>0) {
      this.showAlert('Element is already in the report', 'error', 3000);
    }
    else {
      // console.log('Data for add:', data);
        
        var array_id=[];
        _.map(this.state.add_report_id, function(rep){
          array_id.push(rep);
        })
        
        array_id.push(data.id);
        array_id = _.uniq(array_id);
        // console.log('array_id:', array_id);
         // this.props.casesAction.addToReport({mark:localStorage.getItem('mark_id'), selected_marks:array_id});
         this.setState({add_report:this.state.add_report.concat(data), add_report_id:this.state.add_report_id.concat(array_id), ['delete_report'+data.id]: true, reportCount:array_id.length});
         this.showAlert('Mark added to report','success', 3000);} 
     
  }

  removeReport(data) {
  
   // console.log('remove data:', this.state.add_report_id);

    var data2 = _.filter(this.state.add_report_id, function(o) { return o!=data.id; });
    console.log('data2',data2);
    data2=_.uniq(data2);
    // var data3=[];
    // _.map(data2, function(d){
    //     data3.push(d.id);
    // })
    // console.log('Removed:', data2);
    this.setState({add_report_id:data2, ['delete_report'+data.id]:false});
    this.showAlert('Mark removed from report','success', 3000);
      }

showDetail(data,type) {
  console.log('Data show:', type);
  this.showAlert('Click on \"Get Realtime Info\" for latest trademark details','info',3000);
   this.setState({['isFlipped'+data.id+type]: true});   
}

hideDetail(data,type) {
  // console.log('data flip:', data);
  this.setState({['isFlipped'+data.id+type]: false});
}

closeDetail() {
  this.setState({detail:false});
}

change() {
  this.setState({filter:'Class 1', tag:true});
}


handleSelectChange(value, index) {

   // console.log('search:', value);
   if(value.length>0) {
    this.setState({searchInput: value, all_class:false});
   }
   else {
    this.setState({searchInput:value, all_class: true});
   }      
}

handleSelectClick(){
  // console.log('Function:', this.state.searchInput);
}

handleCheck() {
  // console.log('this.refs:', this.refs.check_me.checked);
  this.setState({all_classes:this.refs.check_me.checked});
}

// handleSubmit(e) {
//   if(e.keyCode == 13) {
//      browserHistory.push('/result/'+this.refs.search_input.value);
//      this.setState({global_search:false})
//   }
// }

handleSearch() {
  // this.setState({global_search:true});
}

handleCloseSearch() {
  this.setState({global_search:false})
}

close_filter() {
  this.setState({filter: '', tag:false});
}

filterList(event) {
  var updatedList = this.state.initialItems;

  updatedList = updatedList.filter(function(item){
    return item.toLowerCase().search(
      event.target.value.toLowerCase()) !== -1;
  });
  this.setState({items: updatedList});
  // console.log('items:', this.state.items);
}

toggleClass() {
      const currentState = this.state.activeClass;
      this.setState({ activeClass: !currentState });
  };
toggleStates() {
  const currentState = this.state.activeStates;
  this.setState({activeStates: !currentState})
}

toggleStatus() {
  const currentState = this.state.activeStatus;
  this.setState({activeStatus: !currentState})
}  

  toggleDOA() {
  const currentState = this.state.activeDOA;
  this.setState({activeDOA: !currentState})
}

toggleDOU() {
  const currentState = this.state.activeDOU;
  this.setState({activeDOU: !currentState})
}  

toggleType() {
  const currentState = this.state.activeType;
  this.setState({activeType: !currentState})
}    

 toggleSimilarity() {
  const currentState = this.state.activeSimilarity;
  this.setState({activeSimilarity: !currentState})
}    

handleFilterSearch() {
  this.setState({fitlerSearch: true, active:true});
}

close_search_filter() {
 this.setState({fitlerSearch:false, active:true});
}

open2() {
  this.setState({showModal2: true, showModal:false});
}

close2() {
  this.setState({showModal2:false, showModal:true});
}

handleModalClose() {
  this.setState({showModal:false, showModal2:false});
}

handleProprietorClick(data) {
  if(data){
    this.props.casesAction.RedirectToProprietor(data.id);
  }
    
    this.setState({loaderState:true});
  // browserHistory.push('/proprietor/'+data.proprietor[0].id);
}

handleSeeMore(data) {
  var url = '/mark_profile/'+data.id;
  window.open(url, '_blank');
}
   

   handleCheckAny(val) {
      // console.log('this.refs.check_70.checked:', this.state.hun);
      // console.log('val:', val); 
      setTimeout(()=>{
         if(this.state.all) {
           this.setState({called:true, hun:false, nin:false, eig: false, sev:false, six:false, fif:false, fou:false, thi:false, twe:false, one:false});
         }

         else if(!this.state.all) {
          this.setState({called:false});
         }
      }, 500);



     var appendReport = [];

     if(!this.state.filterState){
      switch(val) {

        case 110: this.setState({all:!this.state.all});
                var data;  
                   if(!this.state.all) { 
                      data = _.filter(this.props.result.search_result, function(o) {
                        return (o.similarity_index>0 && o.similarity_index<=100)
                      })
                      data=_.uniq(data);
                      var data_id;
                      data_id= _.map(data, function(data){
                        return data.id
                      })
                      var data2_id=data_id;
                      data_id=_.uniq(data_id);
                      var diff = _.difference(data2_id,data_id);
                      // console.log('diff:',diff);
                      // console.log('data 110:', data_id)
                     this.setState({add_report:this.state.add_report.concat(data), add_report_id:data_id})
                   } else {
                       data =_.filter(this.state.add_report, function(o) {
                        return !(o.similarity_index>0 && o.similarity_index<=100)
                      })

                       var data_id;
                      data_id= _.map(data, function(data){
                        return data.id
                      })
                      data_id=_.uniq(data_id);
                      // console.log('data 110:', data_id)

                       this.setState({add_report:data, add_report_id:data_id})
                   }
         break;

       case 100: this.setState({hun:!this.state.hun});
                var data;  
                   if(!this.state.hun) { 
                      data = _.filter(this.props.result.search_result, function(o) {
                        return (o.similarity_index>90 && o.similarity_index<=100)
                      })
                      data=_.uniq(data);
                      var data_id;
                      data_id= _.map(data, function(data){
                        return data.id
                      })
                      data_id=_.uniq(data_id);
                      // console.log('data 110:', data_id)
                     this.setState({add_report:this.state.add_report.concat(data), add_report_id:this.state.add_report_id.concat(data_id)})
                   } else {
                       data =_.filter(this.state.add_report, function(o) {
                        return !(o.similarity_index>90 && o.similarity_index<=100)
                      })
                      var data_id;
                      data_id= _.map(data, function(data){
                        return data.id
                      })
                      data_id=_.uniq(data_id);
                      // console.log('data 110:', data_id)

                       this.setState({add_report:data, add_report_id:data_id})
                   }
         break;
       case 90: this.setState({nin:!this.state.nin});  
       var data;  
                   if(!this.state.nin) { 
                      data = _.filter(this.props.result.search_result, function(o) {
                        return (o.similarity_index>80 && o.similarity_index<=90)
                      })
                      data=_.uniq(data);
                      var data_id;
                     data_id= _.map(data, function(data){
                        return data.id
                      })
                      data_id=_.uniq(data_id);
                      // console.log('data 90:', data_id)
                     this.setState({add_report:this.state.add_report.concat(data), add_report_id:this.state.add_report_id.concat(data_id)})
                   } else {
                       data =_.filter(this.state.add_report, function(o) {
                        return !(o.similarity_index>80 && o.similarity_index<=90)
                      })
                      var data_id;
                      data_id= _.map(data, function(data){
                        return data.id
                      })
                      data_id=_.uniq(data_id);
                      // console.log('data 110:', data_id)

                       this.setState({add_report:data, add_report_id:data_id})
                   }
        break;
       case 80: this.setState({eig:!this.state.eig}); 
       var data;  
                   if(!this.state.eig) { 
                      data = _.filter(this.props.result.search_result, function(o) {
                        return (o.similarity_index>70 && o.similarity_index<=80)
                      })
                      data=_.uniq(data);
                      var data_id;
                      data_id= _.map(data, function(data){
                        return data.id
                      })
                      data_id=_.uniq(data_id);
                      // console.log('data 110:', data_id)
                     this.setState({add_report:this.state.add_report.concat(data), add_report_id:this.state.add_report_id.concat(data_id)})
                   } else {
                       data =_.filter(this.state.add_report, function(o) {
                        return !(o.similarity_index>70 && o.similarity_index<=80)
                      })
                      var data_id;
                      data_id= _.map(data, function(data){
                        return data.id
                      })
                      data_id=_.uniq(data_id);
                      // console.log('data 110:', data_id)

                       this.setState({add_report:data, add_report_id:data_id})
                   }
        break;
       case 70: this.setState({sev:!this.state.sev}); 
       var data;  
                   if(!this.state.sev) { 
                      data = _.filter(this.props.result.search_result, function(o) {
                        return (o.similarity_index>60 && o.similarity_index<=70)
                      })
                      data=_.uniq(data);
                      var data_id;
                      data_id= _.map(data, function(data){
                        return data.id
                      })
                      data_id=_.uniq(data_id);
                      // console.log('data 110:', data_id)
                     this.setState({add_report:this.state.add_report.concat(data), add_report_id:this.state.add_report_id.concat(data_id)})
                   } else {
                       data =_.filter(this.state.add_report, function(o) {
                        return !(o.similarity_index>60 && o.similarity_index<=70)
                      })
                      var data_id;
                      data_id= _.map(data, function(data){
                        return data.id
                      })
                      data_id=_.uniq(data_id);
                      // console.log('data 110:', data_id)

                       this.setState({add_report:data, add_report_id:data_id})
                   }
        break;
       case 60: this.setState({six:!this.state.six}); 
                 var data;  
                   if(!this.state.six) { 
                      data = _.filter(this.props.result.search_result, function(o) {
                        return (o.similarity_index>50 && o.similarity_index<=60)
                      })
                      data=_.uniq(data);
                      var data_id;
                      data_id= _.map(data, function(data){
                        return data.id
                      })
                      data_id=_.uniq(data_id);
                      // console.log('data 110:', data_id)
                     this.setState({add_report:this.state.add_report.concat(data), add_report_id:this.state.add_report_id.concat(data_id)})
                   } else {
                       data =_.filter(this.state.add_report, function(o) {
                        return !(o.similarity_index>50 && o.similarity_index<=60)
                      })
                      var data_id;
                      data_id= _.map(data, function(data){
                        return data.id
                      })
                      data_id=_.uniq(data_id);
                      // console.log('data 110:', data_id)

                       this.setState({add_report:data, add_report_id:data_id})
                   }
        break;
       case 50: this.setState({fif:!this.state.fif}); 
                   var data;  
                   if(!this.state.fif) { 
                      data = _.filter(this.props.result.search_result, function(o) {
                        return (o.similarity_index>40 && o.similarity_index<=50)
                      })
                      data=_.uniq(data);
                      var data_id;
                      data_id= _.map(data, function(data){
                        return data.id
                      })
                      data_id=_.uniq(data_id);
                      // console.log('data 110:', data_id)
                     this.setState({add_report:this.state.add_report.concat(data), add_report_id:this.state.add_report_id.concat(data_id)})
                   } else {
                       data =_.filter(this.state.add_report, function(o) {
                        return !(o.similarity_index>40 && o.similarity_index<=50)
                      })
                      var data_id;
                      data_id= _.map(data, function(data){
                        return data.id
                      })
                      data_id=_.uniq(data_id);
                      // console.log('data 110:', data_id)

                       this.setState({add_report:data, add_report_id:data_id})
                   }
                   
                         // console.log('this.state.hun 50:', !this.state.fif, 'data',data);
        break;
       case 40: this.setState({fou:!this.state.fou}); 
       var data;  
                   if(!this.state.fou) { 
                      data = _.filter(this.props.result.search_result, function(o) {
                        return (o.similarity_index>30 && o.similarity_index<=50)
                      })
                      data=_.uniq(data);
                      var data_id;
                      data_id= _.map(data, function(data){
                        return data.id
                      })
                      data_id=_.uniq(data_id);
                      // console.log('data 110:', data_id)
                     this.setState({add_report:this.state.add_report.concat(data), add_report_id:this.state.add_report_id.concat(data_id)})
                   } else {
                       data =_.filter(this.state.add_report, function(o) {
                        return !(o.similarity_index>30 && o.similarity_index<=50)
                      })
                      var data_id;
                      data_id= _.map(data, function(data){
                        return data.id
                      })
                      data_id=_.uniq(data_id);
                      // console.log('data 110:', data_id)

                       this.setState({add_report:data, add_report_id:data_id})
                   }
        break;
       case 30: this.setState({thi:!this.state.thi});
       var data;  
                   if(!this.state.thi) { 
                      data = _.filter(this.props.result.search_result, function(o) {
                        return (o.similarity_index>20 && o.similarity_index<=30)
                      })
                      data=_.uniq(data);
                      var data_id;
                      data_id= _.map(data, function(data){
                        return data.id
                      })
                      data_id=_.uniq(data_id);
                      // console.log('data 110:', data_id)
                     this.setState({add_report:this.state.add_report.concat(data), add_report_id:this.state.add_report_id.concat(data_id)})
                   } else {
                       data =_.filter(this.state.add_report, function(o) {
                        return !(o.similarity_index>20 && o.similarity_index<=30)
                      })
                      var data_id;
                      data_id= _.map(data, function(data){
                        return data.id
                      })
                      data_id=_.uniq(data_id);
                      // console.log('data 110:', data_id)

                       this.setState({add_report:data, add_report_id:data_id})
                   } 
        break;
       case 20: this.setState({twe:!this.state.twe}); 
       var data;  
                   if(!this.state.twe) { 
                      data = _.filter(this.props.result.search_result, function(o) {
                        return (o.similarity_index>10 && o.similarity_index<=20)
                      })
                      data=_.uniq(data);
                      var data_id;
                     data_id= _.map(data, function(data){
                        return data.id
                      })
                      data_id=_.uniq(data_id);
                      // console.log('data 110:', data_id)
                     this.setState({add_report:this.state.add_report.concat(data), add_report_id:this.state.add_report_id.concat(data_id)})
                   } else {
                       data =_.filter(this.state.add_report, function(o) {
                        return !(o.similarity_index>10 && o.similarity_index<=20)
                      })
                      var data_id;
                      data_id= _.map(data, function(data){
                        return data.id
                      })
                      data_id=_.uniq(data_id);
                      // console.log('data 110:', data_id)

                       this.setState({add_report:data, add_report_id:data_id})
                   }
        break;
       case 10: this.setState({one:!this.state.one}); 
       var data;  
                   if(!this.state.one) { 
                      data = _.filter(this.props.result.search_result, function(o) {
                        return (o.similarity_index>0 && o.similarity_index<=10)
                      })
                      data=_.uniq(data);
                      var data_id;
                      data_id= _.map(data, function(data){
                        return data.id
                      })
                      data_id=_.uniq(data_id);
                      // console.log('data 110:', data_id)
                     this.setState({add_report:this.state.add_report.concat(data), add_report_id:this.state.add_report_id.concat(data_id)})
                   } else {
                       data =_.filter(this.state.add_report, function(o) {
                        return !(o.similarity_index>0 && o.similarity_index<=10)
                      })
                      var data_id;
                      data_id= _.map(data, function(data){
                        return data.id
                      })
                      data_id=_.uniq(data_id);
                      // console.log('data 110:', data_id)

                       this.setState({add_report:data, add_report_id:data_id})
                   }
               
        }
     }   



       if(this.state.filterState){
        switch(val) {

        case 110: this.setState({all:!this.state.all});
                var data;  
                   if(!this.state.all) { 
                      data = _.filter(this.state.filtereData, function(o) {
                        return (o.similarity_index>0 && o.similarity_index<=100)
                      })
                      data=_.uniq(data);
                      var data_id;
                      data_id= _.map(data, function(data){
                        return data.id
                      })
                      var data2_id=data_id;
                      data_id=_.uniq(data_id);
                      var diff = _.difference(data2_id,data_id);
                      // console.log('diff:',diff);
                      // console.log('data 110:', data_id)
                     this.setState({add_report:this.state.add_report.concat(data), add_report_id:data_id})
                   } else {
                       data =_.filter(this.state.add_report, function(o) {
                        return !(o.similarity_index>0 && o.similarity_index<=100)
                      })

                       var data_id;
                      data_id= _.map(data, function(data){
                        return data.id
                      })
                      data_id=_.uniq(data_id);
                      // console.log('data 110:', data_id)

                       this.setState({add_report:data, add_report_id:data_id})
                   }
         break;

       case 100: this.setState({hun:!this.state.hun});
                var data;  
                   if(!this.state.hun) { 
                      data = _.filter(this.state.filtereData, function(o) {
                        return (o.similarity_index>90 && o.similarity_index<=100)
                      })
                      data=_.uniq(data);
                      var data_id;
                      data_id= _.map(data, function(data){
                        return data.id
                      })
                      data_id=_.uniq(data_id);
                      // console.log('data 110:', data_id)
                     this.setState({add_report:this.state.add_report.concat(data), add_report_id:this.state.add_report_id.concat(data_id)})
                   } else {
                       data =_.filter(this.state.add_report, function(o) {
                        return !(o.similarity_index>90 && o.similarity_index<=100)
                      })
                      var data_id;
                      data_id= _.map(data, function(data){
                        return data.id
                      })
                      data_id=_.uniq(data_id);
                      // console.log('data 110:', data_id)

                       this.setState({add_report:data, add_report_id:data_id})
                   }
         break;
       case 90: this.setState({nin:!this.state.nin});  
       var data;  
                   if(!this.state.nin) { 
                      data = _.filter(this.state.filtereData, function(o) {
                        return (o.similarity_index>80 && o.similarity_index<=90)
                      })
                      data=_.uniq(data);
                      var data_id;
                     data_id= _.map(data, function(data){
                        return data.id
                      })
                      data_id=_.uniq(data_id);
                      // console.log('data 90:', data_id)
                     this.setState({add_report:this.state.add_report.concat(data), add_report_id:this.state.add_report_id.concat(data_id)})
                   } else {
                       data =_.filter(this.state.add_report, function(o) {
                        return !(o.similarity_index>80 && o.similarity_index<=90)
                      })
                      var data_id;
                      data_id= _.map(data, function(data){
                        return data.id
                      })
                      data_id=_.uniq(data_id);
                      // console.log('data 110:', data_id)

                       this.setState({add_report:data, add_report_id:data_id})
                   }
        break;
       case 80: this.setState({eig:!this.state.eig}); 
       var data;  
                   if(!this.state.eig) { 
                      data = _.filter(this.state.filtereData, function(o) {
                        return (o.similarity_index>70 && o.similarity_index<=80)
                      })
                      data=_.uniq(data);
                      var data_id;
                      data_id= _.map(data, function(data){
                        return data.id
                      })
                      data_id=_.uniq(data_id);
                      // console.log('data 110:', data_id)
                     this.setState({add_report:this.state.add_report.concat(data), add_report_id:this.state.add_report_id.concat(data_id)})
                   } else {
                       data =_.filter(this.state.add_report, function(o) {
                        return !(o.similarity_index>70 && o.similarity_index<=80)
                      })
                      var data_id;
                      data_id= _.map(data, function(data){
                        return data.id
                      })
                      data_id=_.uniq(data_id);
                      // console.log('data 110:', data_id)

                       this.setState({add_report:data, add_report_id:data_id})
                   }
        break;
       case 70: this.setState({sev:!this.state.sev}); 
       var data;  
                   if(!this.state.sev) { 
                      data = _.filter(this.state.filtereData, function(o) {
                        return (o.similarity_index>60 && o.similarity_index<=70)
                      })
                      data=_.uniq(data);
                      var data_id;
                      data_id= _.map(data, function(data){
                        return data.id
                      })
                      data_id=_.uniq(data_id);
                      // console.log('data 110:', data_id)
                     this.setState({add_report:this.state.add_report.concat(data), add_report_id:this.state.add_report_id.concat(data_id)})
                   } else {
                       data =_.filter(this.state.add_report, function(o) {
                        return !(o.similarity_index>60 && o.similarity_index<=70)
                      })
                      var data_id;
                      data_id= _.map(data, function(data){
                        return data.id
                      })
                      data_id=_.uniq(data_id);
                      // console.log('data 110:', data_id)

                       this.setState({add_report:data, add_report_id:data_id})
                   }
        break;
       case 60: this.setState({six:!this.state.six}); 
                 var data;  
                   if(!this.state.six) { 
                      data = _.filter(this.state.filtereData, function(o) {
                        return (o.similarity_index>50 && o.similarity_index<=60)
                      })
                      data=_.uniq(data);
                      var data_id;
                      data_id= _.map(data, function(data){
                        return data.id
                      })
                      data_id=_.uniq(data_id);
                      // console.log('data 110:', data_id)
                     this.setState({add_report:this.state.add_report.concat(data), add_report_id:this.state.add_report_id.concat(data_id)})
                   } else {
                       data =_.filter(this.state.add_report, function(o) {
                        return !(o.similarity_index>50 && o.similarity_index<=60)
                      })
                      var data_id;
                      data_id= _.map(data, function(data){
                        return data.id
                      })
                      data_id=_.uniq(data_id);
                      // console.log('data 110:', data_id)

                       this.setState({add_report:data, add_report_id:data_id})
                   }
        break;
       case 50: this.setState({fif:!this.state.fif}); 
                   var data;  
                   if(!this.state.fif) { 
                      data = _.filter(this.state.filtereData, function(o) {
                        return (o.similarity_index>40 && o.similarity_index<=50)
                      })
                      data=_.uniq(data);
                      var data_id;
                      data_id= _.map(data, function(data){
                        return data.id
                      })
                      data_id=_.uniq(data_id);
                      // console.log('data 110:', data_id)
                     this.setState({add_report:this.state.add_report.concat(data), add_report_id:this.state.add_report_id.concat(data_id)})
                   } else {
                       data =_.filter(this.state.add_report, function(o) {
                        return !(o.similarity_index>40 && o.similarity_index<=50)
                      })
                      var data_id;
                      data_id= _.map(data, function(data){
                        return data.id
                      })
                      data_id=_.uniq(data_id);
                      // console.log('data 110:', data_id)

                       this.setState({add_report:data, add_report_id:data_id})
                   }
                   
                         // console.log('this.state.hun 50:', !this.state.fif, 'data',data);
        break;
       case 40: this.setState({fou:!this.state.fou}); 
       var data;  
                   if(!this.state.fou) { 
                      data = _.filter(this.state.filtereData, function(o) {
                        return (o.similarity_index>30 && o.similarity_index<=50)
                      })
                      data=_.uniq(data);
                      var data_id;
                      data_id= _.map(data, function(data){
                        return data.id
                      })
                      data_id=_.uniq(data_id);
                      // console.log('data 110:', data_id)
                     this.setState({add_report:this.state.add_report.concat(data), add_report_id:this.state.add_report_id.concat(data_id)})
                   } else {
                       data =_.filter(this.state.add_report, function(o) {
                        return !(o.similarity_index>30 && o.similarity_index<=50)
                      })
                      var data_id;
                      data_id= _.map(data, function(data){
                        return data.id
                      })
                      data_id=_.uniq(data_id);
                      // console.log('data 110:', data_id)

                       this.setState({add_report:data, add_report_id:data_id})
                   }
        break;
       case 30: this.setState({thi:!this.state.thi});
       var data;  
                   if(!this.state.thi) { 
                      data = _.filter(this.state.filtereData, function(o) {
                        return (o.similarity_index>20 && o.similarity_index<=30)
                      })
                      data=_.uniq(data);
                      var data_id;
                      data_id= _.map(data, function(data){
                        return data.id
                      })
                      data_id=_.uniq(data_id);
                      // console.log('data 110:', data_id)
                     this.setState({add_report:this.state.add_report.concat(data), add_report_id:this.state.add_report_id.concat(data_id)})
                   } else {
                       data =_.filter(this.state.add_report, function(o) {
                        return !(o.similarity_index>20 && o.similarity_index<=30)
                      })
                      var data_id;
                      data_id= _.map(data, function(data){
                        return data.id
                      })
                      data_id=_.uniq(data_id);
                      // console.log('data 110:', data_id)

                       this.setState({add_report:data, add_report_id:data_id})
                   } 
        break;
       case 20: this.setState({twe:!this.state.twe}); 
       var data;  
                   if(!this.state.twe) { 
                      data = _.filter(this.state.filtereData, function(o) {
                        return (o.similarity_index>10 && o.similarity_index<=20)
                      })
                      data=_.uniq(data);
                      var data_id;
                     data_id= _.map(data, function(data){
                        return data.id
                      })
                      data_id=_.uniq(data_id);
                      // console.log('data 110:', data_id)
                     this.setState({add_report:this.state.add_report.concat(data), add_report_id:this.state.add_report_id.concat(data_id)})
                   } else {
                       data =_.filter(this.state.add_report, function(o) {
                        return !(o.similarity_index>10 && o.similarity_index<=20)
                      })
                      var data_id;
                      data_id= _.map(data, function(data){
                        return data.id
                      })
                      data_id=_.uniq(data_id);
                      // console.log('data 110:', data_id)

                       this.setState({add_report:data, add_report_id:data_id})
                   }
        break;
       case 10: this.setState({one:!this.state.one}); 
       var data;  
                   if(!this.state.one) { 
                      data = _.filter(this.state.filtereData, function(o) {
                        return (o.similarity_index>0 && o.similarity_index<=10)
                      })
                      data=_.uniq(data);
                      var data_id;
                      data_id= _.map(data, function(data){
                        return data.id
                      })
                      data_id=_.uniq(data_id);
                      // console.log('data 110:', data_id)
                     this.setState({add_report:this.state.add_report.concat(data), add_report_id:this.state.add_report_id.concat(data_id)})
                   } else {
                       data =_.filter(this.state.add_report, function(o) {
                        return !(o.similarity_index>0 && o.similarity_index<=10)
                      })
                      var data_id;
                      data_id= _.map(data, function(data){
                        return data.id
                      })
                      data_id=_.uniq(data_id);
                      // console.log('data 110:', data_id)

                       this.setState({add_report:data, add_report_id:data_id})
                   }  
                 }
               }

     
        
        setTimeout(()=>{
         _.map(this.state.add_report_id, function(rep){
         
          
        });
       }, 1000);
          

      
   }


   handleFiltereSelect(item, type) {
     // console.log('item:', item,'type:', type);
     var data;
     var check_data;
     this.setState({initial_mark:this.props.result.search_result});



     if(this.props.initials_results && localStorage.getItem('flash_initial')=='true') {
      this.setState({
        initial_mark_initials:this.props.initials_results.search_result,
        initial_mark_fuzzy:this.props.fuzzy_results.search_result,
        initial_mark_wildcard:this.props.wildcard_results.search_result
      })
     }

     else {
      this.setState({
        initial_mark_fuzzy:this.props.fuzzy_results.search_result,
        initial_mark_wildcard:this.props.wildcard_results.search_result
      })
     }

      var a = _.filter(this.state.filterDynamic, function(o) {
         return (o.item== item.label)
     })
     if(a.length>0) {
        data = _.filter(this.state.filterDynamic, function(o) {
            return !(o.item==item.label)
        })
        var new_check_data = item.label+'-'+type;
        check_data=_.filter(this.state.check_data,function(p){
          return  !(new_check_data==p)
        })
        this.setState({filterDynamic:data, check_data:check_data});
     } else {
        data = this.state.filterDynamic.concat({item:item.label, type:type});
        check_data=this.state.check_data.concat(item.label+'-'+type);
        this.setState({filterDynamic:data,check_data:check_data});
     }

     var grouped = _.groupBy(data,function(d) {
              return d.type;
          });

    var query='';
          // console.log('grouped',grouped);

      _.mapKeys(grouped, function(value,key,key_index) {
             switch(key) {
                // case 'proprietor': 
                //                 _.map(value,function(e,index) {
                //                            if(value.length>1) {
                //                                if(index==0){
                //                                   query+= '((_.filter(o.'+key+',function(f) {  return f.name=="'+e.item+'" }).length>0) ||'
                //                                }else
                //                                if(index<value.length-1 && index>0){
                //                                 query+= '(_.filter(o.'+key+',function(f) {  return f.name=="'+e.item+'" }).length>0) ||'
                //                                } else {
                //                                  query+= '(_.filter(o.'+key+',function(f) {  return f.name=="'+e.item+'" }).length>0))';
                //                                }
                //                             }
                //                             else {
                //                               query+='(_.filter(o.'+key+',function(f) {  return f.name=="'+e.item+'" }).length>0)';
                //                             }  
                //                         })
                //          break;
                                                         
             case 'associated_class': 
                                _.map(value,function(e,index) {
                                           if(value.length>1) {
                                               if(index==0){
                                                  query+= '((_.filter(o.'+key+',function(f) {  return f=="'+e.item+'" }).length>0) ||'
                                               }else
                                               if(index<value.length-1 && index>0){
                                                query+= '(_.filter(o.'+key+',function(f) {  return f=="'+e.item+'" }).length>0) ||'
                                               } else {
                                                 query+= '(_.filter(o.'+key+',function(f) {  return f=="'+e.item+'" }).length>0))';
                                               }
                                            }
                                            else {
                                              query+='(_.filter(o.'+key+',function(f) {  return f=="'+e.item+'" }).length>0)';
                                            }  
                                        })
                         break;   

              case 'load_more': 
                                _.map(value,function(e,index) {
                                      if(value.length>1) {
                                         if(index==0){
                                            query+= '((o'+'=='+'o'+') ||'
                                         }else
                                         if(index<value.length-1 && index>0){
                                          query+= '((o'+'=='+'o'+') ||'
                                         } else {
                                           query+= '(o'+'=='+'o'+'))';
                                         }
                                      }
                                      else {
                                        query+='(o'+'=='+'o'+')';
                                      }  
                                        })
                         break;            

              case 'similarity_index': _.map(value,function(e,index) {
                                         // console.log('similarity filter:',e);
                                         var item_arr = e.item.split('-');
                                         // console.log('item_arr:',item_arr);
                                         if(value.length>1) {

                                             if(index==0){

                                                query+= '(((((o.'+key+')'+'>='+parseInt(item_arr[0])+') && ((o.'+key+')'+'<='+parseInt(item_arr[1])+'))) ||'
                                               
                                             } else
                                             if(index<value.length-1 && index>0){
                                              query+= '(((o.'+key+')'+'>='+parseInt(item_arr[0])+') && ((o.'+key+')'+'<='+parseInt(item_arr[1])+')) ||'
                                             } else {
                                               query+= '(((o.'+key+')'+'>='+parseInt(item_arr[0])+') && ((o.'+key+')'+'<='+parseInt(item_arr[1])+')))';
                                             }
                                          }
                                          else {
                                            query+= '(((o.'+key+')'+'>='+parseInt(item_arr[0])+') && ((o.'+key+')'+'<='+parseInt(item_arr[1])+'))';
                                          }  
                                      })
                                   break;             

              case 'type':   _.map(value,function(e,index) {
                           if(value.length>1) {
                               if(index==0){
                                  query+= '((o.'+key+'.name=="'+e.item+'") ||'
                               }else
                               if(index<value.length-1 && index>0){
                                query+= '(o.'+key+'.name=="'+e.item+'") ||'
                               } else {
                                 query+= '(o.'+key+'.name=="'+e.item+'"))';
                               }
                            }
                            else {
                              query+='(o.'+key+'.name=="'+e.item+'")';
                            }  
                        })
                           break;

              case 'application_date': _.map(value,function(e,index) {
                                         // console.log('application_date filter:',e);
                                         var item_arr = e.item.split('-');
                                         // console.log('item_arr:',item_arr);
                                         if(value.length>1) {

                                             if(index==0){

                                                query+= '(('+'new Date'+'(o.'+key+').getFullYear())'+'>='+parseInt(item_arr[0])+') && (('+'new Date'+'(o.'+key+').getFullYear())'+'<='+parseInt(item_arr[1])+') ||'
                                               
                                             } else
                                             if(index<value.length-1 && index>0){
                                              query+= '(('+'new Date'+'(o.'+key+').getFullYear())'+'>='+parseInt(item_arr[0])+') && (('+'new Date'+'(o.'+key+').getFullYear())'+'<='+parseInt(item_arr[1])+') ||'
                                             } else {
                                               query+= '(('+'new Date'+'(o.'+key+').getFullYear())'+'>='+parseInt(item_arr[0])+') && (('+'new Date'+'(o.'+key+').getFullYear())'+'<='+parseInt(item_arr[1])+')';
                                             }
                                          }
                                          else {
                                            query+='(('+'new Date'+'(o.'+key+').getFullYear())'+'>='+parseInt(item_arr[0])+') && (('+'new Date'+'(o.'+key+').getFullYear())'+'<='+parseInt(item_arr[1])+')';
                                          }  
                                      })
                                   break;           
               case 'date_of_usage': _.map(value,function(e,index) {
                                      if(e.item=='Proposed to be used') {
                                         // console.log('application_date filter:',e);
                                       
                                         if(value.length>1) {

                                             if(index==0){

                                               query+= '((o.'+key+'== null'+') ||'
                                               
                                             } else
                                             if(index<value.length-1 && index>0){
                                              query+= '((o.'+key+'== null'+') ||'
                                             } else {
                                               query+= '(o.'+key+'== null'+')';
                                             }
                                          }
                                          else {
                                            query+='(o.'+key+'== null'+')';
                                          }  
                                      }
                                      else {
                                         // console.log('application_date filter:',e);
                                         var item_arr = e.item.split('-');
                                         // console.log('item_arr:',item_arr);
                                         if(value.length>1) {

                                             if(index==0){

                                                query+= '(('+'new Date'+'(o.'+key+').getFullYear())'+'>='+parseInt(item_arr[0])+') && (('+'new Date'+'(o.'+key+').getFullYear())'+'<='+parseInt(item_arr[1])+') ||'
                                               
                                             } else
                                             if(index<value.length-1 && index>0){
                                              query+= '(('+'new Date'+'(o.'+key+').getFullYear())'+'>='+parseInt(item_arr[0])+') && (('+'new Date'+'(o.'+key+').getFullYear())'+'<='+parseInt(item_arr[1])+') ||'
                                             } else {
                                               query+= '(('+'new Date'+'(o.'+key+').getFullYear())'+'>='+parseInt(item_arr[0])+') && (('+'new Date'+'(o.'+key+').getFullYear())'+'<='+parseInt(item_arr[1])+')';
                                             }
                                          }
                                          else {
                                            query+='(('+'new Date'+'(o.'+key+').getFullYear())'+'>='+parseInt(item_arr[0])+') && (('+'new Date'+'(o.'+key+').getFullYear())'+'<='+parseInt(item_arr[1])+')';
                                          }  
                                        
                                      }
                                      })
                                   break;               
                default: 
                         _.map(value,function(e,index) {
                           if(value.length>1) {
                               if(index==0){
                                  query+= '((o.'+key+'=="'+e.item+'") ||'
                               }else
                               if(index<value.length-1 && index>0){
                                query+= '(o.'+key+'=="'+e.item+'") ||'
                               } else {
                                 query+= '(o.'+key+'=="'+e.item+'"))';
                               }
                            }
                            else {
                              query+='(o.'+key+'=="'+e.item+'")';
                            }  
                        })
             }
              
             
               query+=' && ';
            })
           
           query = _.trimRight(query,' && ');
        // var query_arr = query.split(' && ');
            // query_arr = query_arr.splice(-1,1)
            // query = query_arr.toString();
   // var query =  '((o.id=="738247")  && (o.state=="CHANDIGARH"))';
      // console.log('grouped',grouped,'query',query);
    var dataFLash = _.filter(this.props.result.search_result, function(o) {
      if(o.type!=null && o.status!=null) {
        return eval(query)
      }
    })

    // var dataContextual = _.filter(this.props.contextual_results.search_result, function(o) {
    //   if(o.type!=null && o.status!=null) {
    //     return eval(query)
    //   }
    // })
if(this.props.initials_results && localStorage.getItem('flash_initial')=='true'){
  var dataInititals = _.filter(this.props.initials_results.search_result, function(o) {
      if(o.type!=null && o.status!=null) {
        return eval(query)
      }
    })
}
    

    var dataFuzzy = _.filter(this.props.fuzzy_results.search_result, function(o) {
      if(o.type!=null && o.status!=null) {
        return eval(query)
      }
    })

    var dataWildcard = _.filter(this.props.wildcard_results.search_result, function(o) {
      if(o.type!=null && o.status!=null) {
        return eval(query)
      }
    })

    var dataTop = _.map(this.state.top_data,function(k){
      var fil_top=_.filter(k.marks,function(o){
        if(o.type!=null && o.status!=null) {
        return eval(query)
      }
      })
      return {name:k.name,marks:fil_top}
    })
    if(query) {
      if(this.state.filtereData.length==dataFLash.length){
        
      }

       this.setState({filteredDataTop:dataTop, filtereData:dataFLash,filterState:false, loadmore:true, filteredDataWildcard:dataWildcard , filteredDataInitials:dataInititals ,filteredDataFuzzy:dataFuzzy })
    } else {
      this.setState({filterState:false})
    }
   
   //   switch(type) {
   //    case 'proprietor':  this.setState({filterState:true, propFilter:true});
   //    if(!this.state.filterState && !this.state.propFilter) {
   //        var data;
   //         data = _.filter(this.props.result.search_result, function(o) {
   //                      return (o.proprietor[0].name == item.label)
   //                    })
         // console.log('filtered data:', data);  
   //       this.setState({filtereData:data});
   //    }

   //    else if(this.state.filterState) {
   //       var data;
   //         data = _.filter(this.state.filtereData, function(o) {
   //                      return (o.proprietor[0].name == item.label)
   //                    })
         // console.log('filtered data:', data);  
   //       this.setState({filtereData:data});
   //    }
         
     
   //   break;

   //    case 'status': this.setState({filterState:true});
   //    if(!this.state.filterState) {
   //      var data;
   //         data = _.filter(this.props.result.search_result, function(o) {
   //                      return (o.status == item.label)
   //                    })
         // console.log('filtered data:', data);  
   //       this.setState({filtereData:data});
   //    }

   //    else if(this.state.filterState) {
   //      var data;
   //         data = _.filter(this.state.filtereData, function(o) {
   //                      return (o.status == item.label)
   //                    })
         // console.log('filtered data:', data);  
   //       this.setState({filtereData:data});
   //    }
   // }

    setTimeout(()=>{
        var fuz_marks=[];
        var ini_marks=[];
        var wild_marks=[];
        var flash_marks=[];
        _.map(this.state.initial_mark,function(ma){
          flash_marks.push(ma.id);
        })
        _.map(this.state.initial_mark_wildcard,function(ma){
          wild_marks.push(ma.id);
        })
        _.map(this.state.initial_mark_initials,function(ma){
          ini_marks.push(ma.id);
        })
        _.map(this.state.initial_mark_fuzzy,function(ma){
          fuz_marks.push(ma.id);
        })

        var diff_ini=_.difference(ini_marks,flash_marks);
        var diff_wild=_.difference(wild_marks,flash_marks);
        var diff_fuzz=_.difference(fuz_marks, flash_marks);

        console.log('diff with initials:',diff_ini,'diff with fuzzy:',diff_fuzz,'diff with wildcard:',diff_wild);

      }, 1000);
 }



      handleSimHTL() {
       if(this.props.result) {
    var resultLength = this.props.result.search_result.length;
    // console.log('resultLength:', resultLength);
    var all_classes=this.props.result.search_result;
    // console.log('All classes:', all_classes);
    for(var i=0;i<=resultLength;i++) {
      // console.log('all_classes[i]:', all_classes[i]);
      var hold;
      for(var j=0;j<=resultLength;j++) {
        // console.log('all_classes[j]:', all_classes[j]);
        if(all_classes[j].similarity_index<all_classes[j++].similarity_index) {
          hold=all_classes[j];
          all_classes[j]=all_classes[j++];
          all_classes[j++]=hold;
        }
      }
    }
    // console.log('Filter all classes:', all_classes);
    }
  } 

  ScrollToTop() {
    window.scrollTo(0, 0);
  }  

  addFilter(data) {
    // var Filter=[];
    // _.map(this.state.filterCount, function(filter){
    //   Filter.push(filter);
    // })
    // Filter.push(data);
    // var filtered;

    
    // this.setState({filterCount:Filter, filteredResult:true})
  }

  handleOpphl() {
    // console.log('High to low')
    this.setState({sort_hl: !this.state.sort_hl, sort_lh:false});
  }

  handleOpplh() {
    // console.log('Low to high')
    this.setState({sort_lh: !this.state.sort_lh, sort_hl:false});
  }

  handleKey(key) {
    return <p>key</p>
  }



  FetchReport() {
    this.props.casesAction.fetchReportSet();
  }

  // handleScroll() {
    // console.log('scroll function');
  //   if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
  //    ;
  //   }

  //   else if(document.body.scrollTop == 0 || document.documentElement.scrollTop == 0) {
  //     this.setState({scrollt:false});
  //   }
  // }

// window.onbeforeunload = function (evt) {
//   var message = 'Are you sure you want to leave?';
  // console.log('refresh captured:', message);
//   // if (typeof evt == 'undefined') {
//   //   evt = window.event;
//   // }
//   // if (evt) {
//   //   evt.returnValue = message;
//   // }
//   // return message;
// }

siteImg(photo) {
          // const url = 'http://localhost:3000/listing';
            if(photo) {
                 return `${photo}`
            } 
        }

handleLoadMoreBtn() {
  this.setState({loadBtn:false});
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

handleUrgentReport() {

var report_id = _.uniq(this.state.add_report_id);
    // console.log('report_id:', report_id);
    if(report_id.length==0) {
      setTimeout(()=>{
         browserHistory.push('/report_set');
       }, 1000);
    }

    else if(this.state.markReport.length==0){
   this.props.casesAction.addToReport({mark:localStorage.getItem('mark_id'), selected_marks:this.state.add_report_id,urgent:true});
   this.setState({loaderState:true});
    }

    else if(this.state.markReport.length==1) {
    this.props.casesAction.appendReport({id:this.state.markReport[0].id, selected_marks:this.state.add_report_id, selection_type:'append',urgent:true});
   this.setState({loaderState:true});
    }

}

handleRealtimeReport() {

    var report_id = _.uniq(this.state.add_report_id);

    if(report_id.length==0) {
      setTimeout(()=>{
         browserHistory.push('/report_set');
       }, 1000);
    }


    else if(this.state.markReport.length==0){
   this.props.casesAction.addToReport({mark:localStorage.getItem('mark_id'), selected_marks:this.state.add_report_id});
   this.setState({loaderState:true});

    }

    else if(this.state.markReport.length==1) {
    this.props.casesAction.appendReport({id:this.state.markReport[0].id, selected_marks:this.state.add_report_id, selection_type:'append'});
   this.setState({loaderState:true});
    }
}

close(){
  this.setState({showModal:false});
}

closeRT() {
  this.setState({showRT:false});
}

proceedRT() {
  this.setState({showRT:false,showModal:true});
}

  handleReportAdd() {
    console.log('this.state.markState:',this.state.markReport);
    var report_id = _.uniq(this.state.add_report_id);
    if(report_id.length==0) {
      this.showAlert('No mark is selected','error',4000);
    }

    else if(this.state.markReport.length>0) {
      this.setState({showRT:true});
    }

    else {
    this.setState({showModal:true}); 
    }   
  }


openPreviousReport() {
  this.setState({openPrevDown:true,showRT:false});
}  

closePreviousReport() {
  this.setState({openPrevDown:false});
}

GoBack() {
  this.setState({openPrevDown:false,showRT:true});
}

patchMarks() {
  this.setState({showRT:false,showModal:true})
}

handleReportDelete() {
   this.setState({openPrevDown:false,showModal:true,showRT:false});
  this.props.casesAction.deleteReport({id:this.state.markReport[0].id});
  this.setState({markReport:[]});
  setTimeout(()=>{
      this.showAlert('Report Deleted Successfully','error',3000);
      }, 500);
}

IPIndiaDown() {
  this.showAlert('It seems IP India is down so the realtime won\'t work for the time being','info',18000);
  this.setState({ipIndiaCheck:true});
}

// refreshCatch() {
//   console.log('refresh catched:');
// }

handleCustomDelete(val) {
    switch(val) {
       
       case '0-100': this.setState({all:!this.state.all,called:!this.state.called});
               
         break;
       case '90-100': this.setState({hun:!this.state.hun});
               
         break;
       case '80-90': this.setState({nin:!this.state.nin});  
       
        break;
       case '70-80': this.setState({eig:!this.state.eig}); 
       
        break;
       case '60-70': this.setState({sev:!this.state.sev}); 
       
        break;
       case '50-60': this.setState({six:!this.state.six}); 

        break;
       case '40-50': this.setState({fif:!this.state.fif}); 
           
        break;
       case '30-40': this.setState({fou:!this.state.fou}); 
      
        break;
       case '20-30': this.setState({thi:!this.state.thi});
       
        break;
       case '10-20': this.setState({twe:!this.state.twe}); 
      
        break;
       case '0-10': this.setState({one:!this.state.one}); 
       
               
        }
    console.log('val:',val);
    var data;
     var check_data;

      var a = _.filter(this.state.checkDynamic, function(o) {
         return (o==val)
     })
     if(a.length>0) {
        data = _.filter(this.state.checkDynamic, function(o) {
            return !(o==val)
        })

        this.setState({checkDynamic:data});
     } else {
        data = this.state.checkDynamic.concat(val);

        this.setState({checkDynamic:data});
     }

     var query='';
     var checkData=this.state.checkDynamic;

     setTimeout(()=>{
        _.map(this.state.checkDynamic,function(e,index) {
                                         console.log('similarity filter:',e);
                                         var item_arr = e.split('-');
                                         console.log('item_arr:',item_arr);
                                         if(data.length>1) {
                                          console.log('data.length>1');

                                             if(index==0){
                                              console.log('data.length>1>>index==0');

                                                query+= '(((((o.similarity_index'+')'+'>='+parseInt(item_arr[0])+') && ((o.similarity_index'+')'+'<='+parseInt(item_arr[1])+'))) ||'
                                               
                                             } 
                                             else if(index<data.length-1 && index>0){
                                              console.log('data.length>1>>index<checkData.length-1');
                                              query+= '(((o.similarity_index'+')'+'>='+parseInt(item_arr[0])+') && ((o.similarity_index'+')'+'<='+parseInt(item_arr[1])+')) ||'
                                             } else {
                                               console.log('data.length>1>>else');
                                               query+= '(((o.similarity_index'+')'+'>='+parseInt(item_arr[0])+') && ((o.similarity_index'+')'+'<='+parseInt(item_arr[1])+')))';
                                             }
                                          }
                                          else {
                                            console.log('else');
                                            query+= '(((o.similarity_index'+')'+'>='+parseInt(item_arr[0])+') && ((o.similarity_index'+')'+'<='+parseInt(item_arr[1])+'))';
                                          }  
                                      })
     console.log('query:',query);

   if(!this.state.filterState) {
    

    var dataFlash = _.filter(this.props.result.search_result, function(o) {
      if(o.type!=null && o.status!=null) {
        return eval(query)
      }
    })
    if(this.props.initials_results && localStorage.getItem('flash_initial')=='true'){
      var dataInititals = _.filter(this.props.initials_results.search_result, function(o) {
      if(o.type!=null && o.status!=null) {
        return eval(query)
      }
    })
    }
    

    var dataFuzzy = _.filter(this.props.fuzzy_results.search_result, function(o) {
      if(o.type!=null && o.status!=null) {
        return eval(query)
      }
    })

    var dataWildcard = _.filter(this.props.wildcard_results.search_result, function(o) {
      if(o.type!=null && o.status!=null) {
        return eval(query)
      }
    })
    
    var marks=[];


    // _.map(dataContextual,function(m){
    //   marks.push(m.id)
    // })

    _.map(dataInititals,function(m){
      marks.push(m.id)
    })

    _.map(dataFuzzy,function(m){
      marks.push(m.id)
    })

    _.map(dataWildcard,function(m){
      marks.push(m.id)
    })

    _.map(dataFlash,function(m){
      marks.push(m.id)
    })

    marks = _.uniq(marks);

    console.log('marks length:',marks.length);
    this.setState({add_report_id:marks})
   }

   else if(this.state.filterState) {

 var dataFlash = _.filter(this.props.result.search_result, function(o) {
      if(o.type!=null && o.status!=null) {
        return eval(query)
      }
    })

    var dataInititals = _.filter(this.state.filteredDataInitials, function(o) {
      if(o.type!=null && o.status!=null) {
        return eval(query)
      }
    })

    var dataFuzzy = _.filter(this.state.filteredDataFuzzy, function(o) {
      if(o.type!=null && o.status!=null) {
        return eval(query)
      }
    })

    var dataWildcard = _.filter(this.state.filteredDataWildcard, function(o) {
      if(o.type!=null && o.status!=null) {
        return eval(query)
      }
    })
    
    var marks=[];


    // _.map(dataContextual,function(m){
    //   marks.push(m.id)
    // })

    _.map(dataInititals,function(m){
      marks.push(m.id)
    })

    _.map(dataFuzzy,function(m){
      marks.push(m.id)
    })

    _.map(dataWildcard,function(m){
      marks.push(m.id)
    })

    _.map(dataFlash,function(m){
      marks.push(m.id)
    })

    marks = _.uniq(marks);

    console.log('marks length:',marks.length);
    this.setState({add_report_id:marks})
   }
      }, 500);

     

 }

 SetTopResultsState(data) {
  console.log('data top',data);
  this.setState({top_result:true,top_data:data});
  setTimeout(()=>{
    this.handleFiltereSelect('', 'load_more');
  }, 500);
 }

 handleFilterCall() {

 }

// handleReset() {
//   this.setState({filterState:false,filtereData:[], filteredDataWildcard:[], filteredDataFuzzy:[], filteredDataInitials:[],filteredDataTop:[], filterDynamic:[],add_report:[],add_report_id:[],check_data:[]});

//   setTimeout(()=>{
//     this.handleFiltereSelect('', 'load_more');
//   }, 300);
// }

handleClassSelected(clas, type) {
this.props.casesAction.ResetSearchResults();
console.log('clas:',clas);
 var tot_class = this.state.selected_class;
 tot_class.push(clas);
 tot_class=_.uniq(tot_class);
 this.setState({selected_class:tot_class});

 console.log('tot_class:',tot_class.toString(), tot_class);
 this.props.casesAction.new_filter({query:localStorage.getItem('mark_term'), search_base:'trademark',mark:localStorage.getItem('mark_id'), search_type:localStorage.getItem('searchType'), filter_flag: true,filter_classes:tot_class.toString(),page:1 });
 this.props.casesAction.GlobalFlashSearch({query:localStorage.getItem('mark_term'), search_base:'trademark',mark:localStorage.getItem('mark_id'), search_type:'standard', page:1, flash_flag:true,filter_flag: true,filter_classes:tot_class.toString(),page:1 });

  var initial_check = localStorage.getItem('mark_term').split(' ');
  console.log('initial_check:',initial_check);
  if(initial_check.length>1){
    this.props.casesAction.flashInitialsSearch({query:localStorage.getItem('mark_term'), search_base:'trademark',mark:localStorage.getItem('mark_id'), search_type:'initials', page:1,flash_flag:true,filter_flag: true,filter_classes:tot_class.toString(),page:1 });
    localStorage.setItem('flash_initial',true);
  }
  else {
    localStorage.setItem('flash_initial',false);
  }

  this.props.casesAction.flashWildcardSearch({query:localStorage.getItem('wildcard_query'), search_base:'trademark',mark:localStorage.getItem('mark_id'), search_type:'flash_wildcard', page:1, flash_flag:true,filter_flag: true,filter_classes:tot_class.toString(),page:1 });
  // this.props.casesAction.flashContextualSearch({query:this.state.selectedMark, search_base:'trademark',mark:localStorage.getItem('mark_id'), search_type:'contextual', search_classes:JSON.stringify(class_arr), page:1 });
  this.props.casesAction.flashFuzzySearch({query:localStorage.getItem('mark_term'), search_base:'trademark',mark:localStorage.getItem('mark_id'), search_type:'fuzzy',fuzzy_depth:localStorage.getItem('fuzzy_depth'), page:1,flash_flag:true,filter_flag: true,filter_classes:tot_class.toString(),page:1 });

  setTimeout(()=>{
    this.handleFiltereSelect('', 'load_more');
  }, 10000);
}

toggle = () => {
    this.setState({ isMenuOpen: !this.state.isMenuOpen });
  }

  closeRT = () => {
    this.setState({ isMenuOpen: false });
  };

  click = () => {
    console.log('You clicked an item');
  };

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }

dropdownToggle(newValue){
    if (this._forceOpen){
        this.setState({ menuOpen: true });
        this._forceOpen = false;
    } else {
        this.setState({ menuOpen: newValue });
    }
}

dropdownToggleSim(newValue){
    if (this._forceOpen){
        this.setState({ SimMenuOpen: true });
        this._forceOpen = false;
    } else {
        this.setState({ SimMenuOpen: newValue });
    }
}

dropdownToggleCl(newValue){
    if (this._forceOpen){
        this.setState({ ClMenuOpen: true });
        this._forceOpen = false;
    } else {
        this.setState({ ClMenuOpen: newValue });
    }
}

dropdownToggleCli(newValue){
    if (this._forceOpen){
        this.setState({ CliMenuOpen: true });
        this._forceOpen = false;
    } else {
        this.setState({ CliMenuOpen: newValue });
    }
}

dropdownToggleTp(newValue){
    if (this._forceOpen){
        this.setState({ TpMenuOpen: true });
        this._forceOpen = false;
    } else {
        this.setState({ TpMenuOpen: newValue });
    }
}

dropdownToggleStatus(newValue){
    if (this._forceOpen){
        this.setState({ StatusMenuOpen: true });
        this._forceOpen = false;
    } else {
        this.setState({ StatusMenuOpen: newValue });
    }
}

dropdownToggleDou(newValue){
    if (this._forceOpen){
        this.setState({ DouMenuOpen: true });
        this._forceOpen = false;
    } else {
        this.setState({ DouMenuOpen: newValue });
    }
}

dropdownToggleDoa(newValue){
    if (this._forceOpen){
        this.setState({ DoaMenuOpen: true });
        this._forceOpen = false;
    } else {
        this.setState({ DoaMenuOpen: newValue });
    }
}

dropdownToggleStates(newValue){
    if (this._forceOpen){
        this.setState({ StatesMenuOpen: true });
        this._forceOpen = false;
    } else {
        this.setState({ StatesMenuOpen: newValue });
    }
}
menuItemClickedThatShouldntCloseDropdown(){
   this._forceOpen = true;
}

handleChangeStart(date) {
  console.log('start date:',date._d);
  this.setState({
    startDate:date
  });
}

handleChangeEnd(date) {
  console.log('end date:',date._d);
  this.setState({
    endDate:date
  });
}

handleChangeStartApp(date) {
  console.log('start date:',date._d);
  this.setState({
    startDateApp:date
  });
}

handleChangeEndApp(date) {
  console.log('end date:',date._d);
  this.setState({
    endDateApp:date
  });
}



handleNewFilter(item,type) {

  if(type=='associated_class') {
    var a = _.filter(this.state.selected_classes, function(cl){return cl==item});
    var data;
    var check_data;
    if(a.length>0) {
        data = _.filter(this.state.selected_classes, function(o) {
            return !(o==item)
        })
        var new_check_data = item+'-'+type;
        check_data=_.filter(this.state.check_data,function(p){
          return  !(new_check_data==p)
        })
        this.setState({selected_classes:data, check_data:check_data});
     } else {
        data = this.state.selected_classes.concat(item);
        check_data=this.state.check_data.concat(item+'-'+type);
        this.setState({selected_classes:data,check_data:check_data});
     }
  }

  else if(type=='status') {
    var a = _.filter(this.state.selected_status, function(cl){return cl==item});
    var data;
    var check_data;
    if(a.length>0) {
        data = _.filter(this.state.selected_status, function(o) {
            return !(o==item)
        })
        var new_check_data = item+'-'+type;
        check_data=_.filter(this.state.check_data,function(p){
          return  !(new_check_data==p)
        })
        this.setState({selected_status:data, check_data:check_data});
     } else {
        data = this.state.selected_status.concat(item);
        check_data=this.state.check_data.concat(item+'-'+type);
        this.setState({selected_status:data,check_data:check_data});
     }
  }

  else if(type=='type') {
    var a = _.filter(this.state.selected_type, function(cl){return cl==item});
    var data;
    var check_data;
    if(a.length>0) {
        data = _.filter(this.state.selected_type, function(o) {
            return !(o==item)
        })
        var new_check_data = item+'-'+type;
        check_data=_.filter(this.state.check_data,function(p){
          return  !(new_check_data==p)
        })
        this.setState({selected_type:data, check_data:check_data});
     } else {
        data = this.state.selected_type.concat(item);
        check_data=this.state.check_data.concat(item+'-'+type);
        this.setState({selected_type:data,check_data:check_data});
     }
  }

  else if(type=='state') {
    var a = _.filter(this.state.selected_state, function(cl){return cl==item});
    var data;
    var check_data;
    if(a.length>0) {
        data = _.filter(this.state.selected_state, function(o) {
            return !(o==item)
        })
        var new_check_data = item+'-'+type;
        check_data=_.filter(this.state.check_data,function(p){
          return  !(new_check_data==p)
        })
        this.setState({selected_state:data, check_data:check_data});
     } else {
        data = this.state.selected_state.concat(item);
        check_data=this.state.check_data.concat(item+'-'+type);
        this.setState({selected_state:data,check_data:check_data});
     }
  }

  else if(type=='similarity') {
    var a = _.filter(this.state.selected_similarity, function(cl){return cl==item});
    var data;
    var check_data;
    if(a.length>0) {
        data = _.filter(this.state.selected_similarity, function(o) {
            return !(o==item)
        })
        var new_check_data = item+'-'+type;
        check_data=_.filter(this.state.check_data,function(p){
          return  !(new_check_data==p)
        })
        this.setState({selected_similarity:data, check_data:check_data});
     } else {
        data = this.state.selected_similarity.concat(item);
        check_data=this.state.check_data.concat(item+'-'+type);
        this.setState({selected_similarity:data,check_data:check_data});
     }
  }

  else if(type=='date_of_usage') {
    var a = _.filter(this.state.selected_dou, function(cl){return cl==item});
    var data;
    var check_data;
    if(a.length>0) {
        data = _.filter(this.state.selected_dou, function(o) {
            return !(o==item)
        })
        var new_check_data = item+'-'+type;
        check_data=_.filter(this.state.check_data,function(p){
          return  !(new_check_data==p)
        })
        this.setState({selected_dou:data, check_data:check_data});
     } else {
        data = this.state.selected_dou.concat(item);
        check_data=this.state.check_data.concat(item+'-'+type);
        this.setState({selected_dou:data,check_data:check_data});
     }
  }

  else if(type=='date_of_application') {
    var a = _.filter(this.state.selected_doa, function(cl){return cl==item});
    var data;
    var check_data;
    if(a.length>0) {
        data = _.filter(this.state.selected_doa, function(o) {
            return !(o==item)
        })
        var new_check_data = item+'-'+type;
        check_data=_.filter(this.state.check_data,function(p){
          return  !(new_check_data==p)
        })
        this.setState({selected_doa:data, check_data:check_data});
     } else {
        data = this.state.selected_doa.concat(item);
        check_data=this.state.check_data.concat(item+'-'+type);
        this.setState({selected_doa:data,check_data:check_data});
     }
  }

  //   console.log('slab:',item);
  // var limits = item.split('-');
  // var years = [];
  // for(var i=parseInt(limits[0]);i<=limits[1];i++) {
  //   years.push(i);
  // }

  // if(this.state.slab==item) {
  //   this.setState({
  //     selected_years:[],
  //     slab:''
  //   });
  // }
  // else {
  //   this.setState({
  //   selected_years:years,
  //   slab:item
  // });
  // }
  // console.log('years:',years);

} 


/*------SPECIFIC MARK SEARCH FUNCTION STARTS-------*/

  // specificMarkSearchInput(e) {
  //   if ((this.state.specificMark=== null || this.state.specificMark=== '') && e.keyCode==13) {
  //     this.showAlert('Plaese type a Mark you want to search', 'error', 3000);
  //   } else if(this.state.specificMark && e.keyCode==13) {
  //   this.setState({showSpecificMark: this.state.specificMark});
  //   this.props.casesAction.ResetSearchResults();
  //   this.props.casesAction.searchForMark({search_query:this.state.specificMark, search_base:'trademark',mark:localStorage.getItem('mark_id'), search_type:'standard', search_classes:localStorage.getItem('search_classes'),page:1});
  //   this.props.casesAction.searchForMarkWildcard({search_query:this.state.specificMark, search_base:'trademark',mark:localStorage.getItem('mark_id'), search_type:'wildcard', search_classes:localStorage.getItem('search_classes'),page:1});
  //   this.props.casesAction.searchForMarkFuzzy({search_query:this.state.specificMark, search_base:'trademark',mark:localStorage.getItem('mark_id'), search_type:'fuzzy', fuzzy_depth:parseInt(localStorage.getItem('fuzzy_depth')), search_classes:localStorage.getItem('search_classes'),page:1});
  //   if (localStorage.getItem('flash_initial')=='true') {
  //   this.props.casesAction.searchForMarkInitial({search_query:this.state.specificMark, search_base:'trademark',mark:localStorage.getItem('mark_id'), search_type:'initials', search_classes:localStorage.getItem('search_classes'),page:1});
  //   }
  //   }
  // }
  // showSpecificSearchFunc(){
  //   if (this.state.specificMark=== null || this.state.specificMark=== ''){
  //     this.showAlert('Plaese type a Mark you want to search', 'error', 3000);
  //   } else {
  //   this.setState({showSpecificMark: this.state.specificMark});
  //   this.props.casesAction.ResetSearchResults();
  //   this.props.casesAction.searchForMark({search_query:this.state.specificMark, search_base:'trademark',mark:localStorage.getItem('mark_id'), search_type:'standard', search_classes:localStorage.getItem('search_classes'),page:1});
  //   this.props.casesAction.searchForMarkWildcard({search_query:this.state.specificMark, search_base:'trademark',mark:localStorage.getItem('mark_id'), search_type:'wildcard', search_classes:localStorage.getItem('search_classes'),page:1});
  //   this.props.casesAction.searchForMarkFuzzy({search_query:this.state.specificMark, search_base:'trademark',mark:localStorage.getItem('mark_id'), search_type:'fuzzy', fuzzy_depth:parseInt(localStorage.getItem('fuzzy_depth')), search_classes:localStorage.getItem('search_classes'),page:1});
  //   if (localStorage.getItem('flash_initial')=='true') {
  //   this.props.casesAction.searchForMarkInitial({search_query:this.state.specificMark, search_base:'trademark',mark:localStorage.getItem('mark_id'), search_type:'initials', search_classes:localStorage.getItem('search_classes'),page:1});
  //   }
  // }
  // }
  // specificMarkReset(){
  //   this.setState({showSpecificMark: null});
  //   this.setState({specificMark: null});
  //   localStorage.setItem('via_search',false);
  //   window.location.reload();
  //   localStorage.setItem('page',1);
  // }
/*------SPECIFIC MARK SEARCH FUNCTION ENDS-------*/

specificSearchFunc(event){
  this.setState({specificMark: event.target.value});
}

handleApplyFilters() {
  this.props.casesAction.ResetSearchResults();
  var similarity = this.state.sim_value.min+'to'+this.state.sim_value.max;
  // var dou_date = (new Date(this.state.startDate).getDate())+'-' + (new Date(this.state.startDate).getMonth()+1)+'-'+ new Date(this.state.startDate).getFullYear() + 'to' + (new Date(this.state.endDate).getDate())+'-' + (new Date(this.state.endDate).getMonth()+1)+'-'+ new Date(this.state.endDate).getFullYear();
  // var doa_date = (new Date(this.state.startDateApp).getDate())+'-' + (new Date(this.state.startDateApp).getMonth()+1)+'-'+ new Date(this.state.startDateApp).getFullYear() + 'to' + (new Date(this.state.endDateApp).getDate())+'-' + (new Date(this.state.endDateApp).getMonth()+1)+'-'+ new Date(this.state.endDateApp).getFullYear();
  // console.log('dou_date:',dou_date);
  // console.log('similarity:',similarity);
  if(this.state.selected_classes.length>0 || this.state.selected_status.length>0 || this.state.selected_type.length>0 || this.state.selected_state.length>0 || similarity.length>0 || this.state.specificMark.length >=1) {
    var searchType = localStorage.getItem('searchType');

    this.props.casesAction.GlobalFlashSearchFilter({search_query:this.state.specificMark,query:localStorage.getItem('search'), search_base:'trademark',mark:localStorage.getItem('mark_id'), search_type:'standard', search_classes:localStorage.getItem('search_classes'), page:1, flash_flag:true,filter_flag: true,filter_classes:this.state.selected_classes,filter_trademark_status:this.state.selected_status,filter_trademark_type:this.state.selected_type,filter_states:this.state.selected_state,filter_similarity:similarity });

        var wildcard_query = '[[*]]'+localStorage.getItem('search')+'[[*]]';
        var final_wild = wildcard_query.replace(/ /g, "[[*]]");
        // var wildcard_query1= '[[*]]'+mark_arr[mark_arr_length-(mark_arr_length-1)]+
        console.log('wildcard_query:',final_wild);
        localStorage.setItem('wildcard_query',final_wild);
        var fuzzy_length= Math.round(localStorage.getItem('search').length*0.4) ;
        console.log('fuzzy_length:',fuzzy_length);
        localStorage.setItem('fuzzy_depth',fuzzy_length);
        var initial_check = localStorage.getItem('search').split(' ');
        console.log('initial_check:',initial_check);
        if(initial_check.length>1){
          this.props.casesAction.flashInitialsSearchFilter({search_query:this.state.specificMark,query:localStorage.getItem('search'), search_base:'trademark',mark:localStorage.getItem('mark_id'), search_type:'initials', search_classes:localStorage.getItem('search_classes'), page:1,flash_flag:true, filter_flag: true,filter_classes:this.state.selected_classes,filter_trademark_status:this.state.selected_status,filter_trademark_type:this.state.selected_type,filter_states:this.state.selected_state,filter_similarity:similarity });
          localStorage.setItem('flash_initial',true);
        }
        else {
          localStorage.setItem('flash_initial',false);
        }

        this.props.casesAction.flashWildcardSearchFilter({search_query:this.state.specificMark,query:localStorage.getItem('search'), search_base:'trademark',mark:localStorage.getItem('mark_id'), search_type:'flash_wildcard', search_classes:localStorage.getItem('search_classes'), page:1, flash_flag:true, filter_flag: true,filter_classes:this.state.selected_classes,filter_trademark_status:this.state.selected_status,filter_trademark_type:this.state.selected_type,filter_states:this.state.selected_state,filter_similarity:similarity });
        // this.props.casesAction.flashContextualSearch({query:localStorage.getItem('search'), search_base:'trademark',mark:localStorage.getItem('mark_id'), search_type:'contextual', search_classes:localStorage.getItem('search_classes'), page:1 });
        this.props.casesAction.flashFuzzySearchFilter({search_query:this.state.specificMark,query:localStorage.getItem('search'), search_base:'trademark',mark:localStorage.getItem('mark_id'), search_type:'fuzzy',fuzzy_depth:fuzzy_length, search_classes:localStorage.getItem('search_classes'), page:1,flash_flag:true, filter_flag: true,filter_classes:this.state.selected_classes,filter_trademark_status:this.state.selected_status,filter_trademark_type:this.state.selected_type,filter_states:this.state.selected_state,filter_similarity:similarity });
  }
}

  handleLoadMoreFlash() {

  var similarity = this.state.sim_value.min+'to'+this.state.sim_value.max;

   if(this.state.selected_classes.length>0 || this.state.selected_status.length>0 || this.state.selected_type.length>0 || this.state.selected_state.length>0 || similarity.length>0) {
    var selectedmark = _.filter(this.props.marks, {term:localStorage.getItem('mark')});
   var searchType = localStorage.getItem('searchType');
   // console.log('searchType:', searchType);
   var fuzzyInput;
   var page=localStorage.getItem('page_flash');
   page++;
   localStorage.setItem('page_flash',page);

    // console.log('NotfuzzyInput:');
    this.props.casesAction.GlobalSearchFilterPagi({query:localStorage.getItem('search'), search_base:'trademark',mark:localStorage.getItem('mark_id'), search_type:'standard', search_classes:localStorage.getItem('search_classes'),page:page,flash_flag:true,  filter_flag: true,filter_classes:this.state.selected_classes,filter_trademark_status:this.state.selected_status,filter_trademark_type:this.state.selected_type,filter_states:this.state.selected_state,filter_similarity:similarity });
   
   }

   else {
     var selectedmark = _.filter(this.props.marks, {term:localStorage.getItem('mark')});
   var searchType = localStorage.getItem('searchType');
   // console.log('searchType:', searchType);
   var fuzzyInput;
   var page=localStorage.getItem('page_flash');
   page++;
   localStorage.setItem('page_flash',page);

    // console.log('NotfuzzyInput:');
    this.props.casesAction.GlobalSearchPagi({query:localStorage.getItem('search'), search_base:'trademark',mark:localStorage.getItem('mark_id'), search_type:'standard', search_classes:localStorage.getItem('search_classes'),page:page,flash_flag:true });
   
   }

   this.setState({loadBtn:true,loadmore:true});
   this.handleFiltereSelect('', 'load_more');

   setTimeout(()=>{
       this.setState({loadBtn:false});
      }, 18000);

  }

  handleLoadMoreWild() {
    var similarity = this.state.sim_value.min+'to'+this.state.sim_value.max;

   if(this.state.selected_classes.length>0 || this.state.selected_status.length>0 || this.state.selected_type.length>0 || this.state.selected_state.length>0 || similarity.length>0) {
 var selectedmark = _.filter(this.props.marks, {term:localStorage.getItem('mark')});
   var searchType = localStorage.getItem('searchType');
   // console.log('searchType:', searchType);
   var fuzzyInput;
   var page=localStorage.getItem('page_contextual');
   page++;
   localStorage.setItem('page_contextual',page);

    // console.log('NotfuzzyInput:');
    this.props.casesAction.flashWildSearchFilterPagi({query:localStorage.getItem('search'), search_base:'trademark',mark:localStorage.getItem('mark_id'), search_type:'flash_wildcard', search_classes:localStorage.getItem('search_classes'),page:page, flash_flag:true,filter_flag: true,filter_classes:this.state.selected_classes,filter_trademark_status:this.state.selected_status,filter_trademark_type:this.state.selected_type,filter_states:this.state.selected_state,filter_similarity:similarity });
   }

   else {
          var selectedmark = _.filter(this.props.marks, {term:localStorage.getItem('mark')});
   var searchType = localStorage.getItem('searchType');
   // console.log('searchType:', searchType);
   var fuzzyInput;
   var page=localStorage.getItem('page_contextual');
   page++;
   localStorage.setItem('page_contextual',page);

    // console.log('NotfuzzyInput:');
    this.props.casesAction.flashWildSearchPagi({query:localStorage.getItem('search'), search_base:'trademark',mark:localStorage.getItem('mark_id'), search_type:'flash_wildcard', search_classes:localStorage.getItem('search_classes'),page:page, flash_flag:true });
   }


   this.setState({loadBtn:true,loadmore:true});
   this.handleFiltereSelect('', 'load_more');

   setTimeout(()=>{
       this.setState({loadBtn:false});
      }, 18000);

  }

  handleLoadMoreContextual() {

     var similarity = this.state.sim_value.min+'to'+this.state.sim_value.max;

   if(this.state.selected_classes.length>0 || this.state.selected_status.length>0 || this.state.selected_type.length>0 || this.state.selected_state.length>0 || similarity.length>0) {
 var selectedmark = _.filter(this.props.marks, {term:localStorage.getItem('mark')});
   var searchType = localStorage.getItem('searchType');
   // console.log('searchType:', searchType);
   var fuzzyInput;
   var page=localStorage.getItem('page_contextual');
   page++;
   localStorage.setItem('page_contextual',page);

    // console.log('NotfuzzyInput:');
    this.props.casesAction.flashContextualSearchFilterPagi({query:localStorage.getItem('search'), search_base:'trademark',mark:localStorage.getItem('mark_id'), search_type:'contextual', search_classes:localStorage.getItem('search_classes'),page:page, flash_flag:true,filter_flag: true,filter_classes:this.state.selected_classes,filter_trademark_status:this.state.selected_status,filter_trademark_type:this.state.selected_type,filter_states:this.state.selected_state,filter_similarity:similarity });
   }

    var selectedmark = _.filter(this.props.marks, {term:localStorage.getItem('mark')});
   var searchType = localStorage.getItem('searchType');
   // console.log('searchType:', searchType);
   var fuzzyInput;
   var page=localStorage.getItem('page_contextual');
   page++;
   localStorage.setItem('page_contextual',page);

    // console.log('NotfuzzyInput:');
    this.props.casesAction.flashContextualSearchPagi({query:localStorage.getItem('search'), search_base:'trademark',mark:localStorage.getItem('mark_id'), search_type:'contextual', search_classes:localStorage.getItem('search_classes'),page:page, flash_flag:true });

   this.setState({loadBtn:true,loadmore:true});
   this.handleFiltereSelect('', 'load_more');

   setTimeout(()=>{
       this.setState({loadBtn:false});
      }, 18000);

  }


handleLoadMoreFuzzy() {
   var similarity = this.state.sim_value.min+'to'+this.state.sim_value.max;

   if(this.state.selected_classes.length>0 || this.state.selected_status.length>0 || this.state.selected_type.length>0 || this.state.selected_state.length>0 || similarity.length>0) {
   var selectedmark = _.filter(this.props.marks, {term:localStorage.getItem('mark')});
 var searchType = localStorage.getItem('searchType');
 // console.log('searchType:', searchType);
 var fuzzyInput;
 var page=localStorage.getItem('page_fuzzy');
 page++;
 localStorage.setItem('page_fuzzy',page);

  // console.log('NotfuzzyInput:');
  this.props.casesAction.flashFuzzySearchFilterPagi({query:localStorage.getItem('search'), search_base:'trademark',mark:localStorage.getItem('mark_id'),fuzzyDepth: localStorage.getItem('fuzzy_depth'), search_type:'fuzzy', search_classes:localStorage.getItem('search_classes'),page:page, flash_flag:true,filter_flag: true,filter_classes:this.state.selected_classes,filter_trademark_status:this.state.selected_status,filter_trademark_type:this.state.selected_type,filter_states:this.state.selected_state,filter_similarity:similarity });
   }

   else {
      var selectedmark = _.filter(this.props.marks, {term:localStorage.getItem('mark')});
 var searchType = localStorage.getItem('searchType');
 // console.log('searchType:', searchType);
 var fuzzyInput;
 var page=localStorage.getItem('page_fuzzy');
 page++;
 localStorage.setItem('page_fuzzy',page);

  // console.log('NotfuzzyInput:');
  this.props.casesAction.flashFuzzySearchPagi({query:localStorage.getItem('search'), search_base:'trademark',mark:localStorage.getItem('mark_id'),fuzzyDepth: localStorage.getItem('fuzzy_depth'), search_type:'fuzzy', search_classes:localStorage.getItem('search_classes'),page:page, flash_flag:true });
   }

 this.setState({loadBtn:true,loadmore:true});
 this.handleFiltereSelect('', 'load_more');

 setTimeout(()=>{
     this.setState({loadBtn:false});
    }, 18000);

}

handleLoadMoreInitial() {

   var similarity = this.state.sim_value.min+'to'+this.state.sim_value.max;

   if(this.state.selected_classes.length>0 || this.state.selected_status.length>0 || this.state.selected_type.length>0 || this.state.selected_state.length>0 || similarity.length>0) {
  var selectedmark = _.filter(this.props.marks, {term:localStorage.getItem('mark')});
 var searchType = localStorage.getItem('searchType');
 // console.log('searchType:', searchType);
 var fuzzyInput;
 var page=localStorage.getItem('page_initial');
 page++;
 localStorage.setItem('page_initial',page);

  // console.log('NotfuzzyInput:');
  this.props.casesAction.flashInitialsFilterSearchPagi({query:localStorage.getItem('search'), search_base:'trademark',mark:localStorage.getItem('mark_id'), search_type:'initials', search_classes:localStorage.getItem('search_classes'),page:page, flash_flag:true,filter_flag: true,filter_classes:this.state.selected_classes,filter_trademark_status:this.state.selected_status,filter_trademark_type:this.state.selected_type,filter_states:this.state.selected_state,filter_similarity:similarity });
   }

   else {
      var selectedmark = _.filter(this.props.marks, {term:localStorage.getItem('mark')});
 var searchType = localStorage.getItem('searchType');
 // console.log('searchType:', searchType);
 var fuzzyInput;
 var page=localStorage.getItem('page_initial');
 page++;
 localStorage.setItem('page_initial',page);

  // console.log('NotfuzzyInput:');
  this.props.casesAction.flashInitialsSearchPagi({query:localStorage.getItem('search'), search_base:'trademark',mark:localStorage.getItem('mark_id'), search_type:'initials', search_classes:localStorage.getItem('search_classes'),page:page, flash_flag:true });
   }




 this.setState({loadBtn:true,loadmore:true});
 this.handleFiltereSelect('', 'load_more');
 setTimeout(()=>{
     this.setState({loadBtn:false});
    }, 18000);

 // setTimeout(()=>{
 //     this.setState({loadBtn:false});
 //    }, 12000);

}

setGraphData(series, StatusSeries, YearSeries) {
  console.log('setGraphData');
  this.setState({
    series:series,
    StatusSeries:StatusSeries,
    YearSeries:YearSeries,
    graph_stored:true
  })
}

handleSetFilter(states,status,type,class_fil) {
  console.log('handleSetFilter');
  this.setState({
    filters_stored:true,
    states: states,
    status: status,
    type: type,
    class_fil:class_fil
  });
}

handleReset() {
  localStorage.setItem('via_search',false);

   window.location.reload();
  
  this.props.casesAction.ResetSearchResults();
  this.setState({
    filters_stored:false,
    opp_count_state:false
  });
  // this.props.casesAction.GlobalFlashSearch({query:localStorage.getItem('search'), search_base:'trademark',mark:localStorage.getItem('mark_id'), search_type:'standard', search_classes:localStorage.getItem('search_classes'), page:1, flash_flag:true,filter_flag: false});

  //       var wildcard_query = '[[*]]'+localStorage.getItem('search')+'[[*]]';
  //       var final_wild = wildcard_query.replace(/ /g, "[[*]]");
  //       // var wildcard_query1= '[[*]]'+mark_arr[mark_arr_length-(mark_arr_length-1)]+
  //       console.log('wildcard_query:',final_wild);
  //       localStorage.setItem('wildcard_query',final_wild);
  //       var fuzzy_length= Math.round(localStorage.getItem('search').length*0.4) ;
  //       console.log('fuzzy_length:',fuzzy_length);
  //       localStorage.setItem('fuzzy_depth',fuzzy_length);
  //       var initial_check = localStorage.getItem('search').split(' ');
  //       console.log('initial_check:',initial_check);
  //       if(initial_check.length>1){
  //         this.props.casesAction.flashInitialsSearch({query:localStorage.getItem('search'), search_base:'trademark',mark:localStorage.getItem('mark_id'), search_type:'initials', search_classes:localStorage.getItem('search_classes'), page:1,flash_flag:true, filter_flag: false});
  //         localStorage.setItem('flash_initial',true);
  //       }
  //       else {
  //         localStorage.setItem('flash_initial',false);
  //       }

  //       this.props.casesAction.flashWildcardSearch({query:localStorage.getItem('search'), search_base:'trademark',mark:localStorage.getItem('mark_id'), search_type:'flash_wildcard', search_classes:localStorage.getItem('search_classes'), page:1, flash_flag:true, filter_flag:false });
  //       // this.props.casesAction.flashContextualSearch({query:localStorage.getItem('search'), search_base:'trademark',mark:localStorage.getItem('mark_id'), search_type:'contextual', search_classes:localStorage.getItem('search_classes'), page:1 });
  //       this.props.casesAction.flashFuzzySearch({query:localStorage.getItem('search'), search_base:'trademark',mark:localStorage.getItem('mark_id'), search_type:'fuzzy',fuzzy_depth:fuzzy_length, search_classes:localStorage.getItem('search_classes'), page:1,flash_flag:true, filter_flag: true});

  //       this.setState({
  //         selected_classes:[],
  //         selected_status:[],
  //         selected_type:[],
  //         selected_state:[],
  //         sim_value: { min: 0, max: 100 }
  //       });

  //       localStorage.setItem('page_flash',1);
  //       localStorage.setItem('page_fuzzy',1);
  //       localStorage.setItem('page_initial',1);
  //       localStorage.setItem('page_wild',1);
}


SetOppositionCount(opp_count, opp_notice_count) {
  console.log('SetOppositionCount');
  this.setState({
    opp_count:opp_count,
    opp_notice_count:opp_notice_count,
    opp_count_state:true
  })
}

// handleSelectDouSlab(slab) {
//   console.log('slab:',slab);
//   var limits = slab.split('-');
//   var years = [];
//   for(var i=parseInt(limits[0]);i<=limits[1];i++) {
//     years.push(i);
//   }

//   if(this.state.slab==slab) {
//     this.setState({
//       selected_years:[],
//       slab:''
//     });
//   }
//   else {
//     this.setState({
//     selected_years:years,
//     slab:slab
//   });
//   }
//   console.log('years:',years);
// }

setVulnerability(vul) {
  this.setState({
    vulnerability_set_value:vul,
    vulnerability_set:true
  })
}


render() {

// console.log('this.state:',this.state);

// if(this.props.result && this.state.loadmore && this.state.initial_mark<this.props.result.search_result) {
//   // this.handleFiltereSelect('', 'load_more');
//   this.handleLoadMoreBtn();
// }

// if(this.props.fuzzy_results && this.state.loadmore && this.state.initial_mark_fuzzy<this.props.fuzzy_results.search_result) {
//   // this.handleFiltereSelect('', 'load_more');
//   this.handleLoadMoreBtn();
// }

// if(this.props.wildcard_results && this.state.loadmore && this.state.initial_mark_wildcard<this.props.wildcard_results.search_result) {
//   // this.handleFiltereSelect('', 'load_more');
//   this.handleLoadMoreBtn();
// }

// if(this.props.initials_results && localStorage.getItem('flash_initial')=='true' && this.state.loadmore && this.state.initial_mark_initials<this.props.initials_results.search_result) {
//   // this.handleFiltereSelect('', 'load_more');
//   this.handleLoadMoreBtn();
// }




window.onbeforeunload = function (evt) {
   // this.refreshCatch();
  // console.log('refresh captured:', message);
   evt.preventDefault();
  // this.setState({loaderState:true})
}

    console.log('this.state:', this.state);
    const {page_end} = this.props;
    // console.log('this.props.page_end:',this.props.page_end);
    var exact=[];
    var similar=[];
    var identical=[];
    if(this.props.result) {
      _.map(this.props.result.search_result, function(res){
        if(res.similarity_index==100) {
          exact.push(res);
        }
        else if(res.similarity_index<=99 && res.similarity_index>=75) {
          similar.push(res);
        }
        else if(res.similarity_index<75 && res.similarity_index>=50) {
          identical.push(res);
        }
      })
    }
    // console.log(exact,similar,identical);
    const {result} = this.props;
    // if(this.props.result){console.log('this.state:', this.props.result.search_result);}
    var series;
    if(this.props.result) {const results = this.props.result;
      series = _.map(results.class_distribution, function(mark) {

          return {name:'Class '+ mark.class_number, data:[mark.count]}
        });
        }

        series = _.filter(series, function(ser){return !ser.data[0]==0});
        // console.log('series:', series);

      var StatusSeries;

      if(this.props.result) {const resultStatus = this.props.result;
      StatusSeries = _.map(resultStatus.status_distribution, function(status) {
          return {name: status.status,y:status.count}
        });
      }

        StatusSeries = _.filter(StatusSeries, function(ser){return !ser.y==0 && ser.name!=null});
   

         var YearSeries;

      if(this.props.result) {const resultYear = this.props.result;
      YearSeries = _.map(resultYear.type_distribution, function(year) {
          return {name:year.type,y:year.count}
        });

       YearSeries = _.filter(YearSeries, function(ser){return !ser.y==0 && ser.name!=null});
       // const newYearSeries = _.filter(YearSeries, function(ser2){return ser2.name!=null})
    
        // console.log('StatusSeries:', YearSeries);
      }

      if(this.props.result && series.length>0 && StatusSeries.length>0 && YearSeries.length>0 && !this.state.graph_stored) {
        this.setGraphData(series, StatusSeries, YearSeries);
      }
        var SafetyMeter=[];
     
        if(localStorage.getItem('vulnerability')) {
          if(localStorage.getItem('vulnerability')=='L') {
            SafetyMeter.push(1);
          }
          else if(localStorage.getItem('vulnerability')=='M') {
            SafetyMeter.push(3);
          }
          if(localStorage.getItem('vulnerability')=='H') {
           SafetyMeter.push(5);
          }

          if(!this.state.vulnerability_set) {
            this.setVulnerability(SafetyMeter);
          }
        }
        
    var safety = {
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
    animation: {
        duration: 20000
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
            color: '#55BF3B'
        }, {
            from: 2,
            to: 4,
            color: '#DDDF0D' // yellow
        }, {
            from: 4,
            to: 6,
            color: '#DF5353' // red
        }]
    },

    series: [{
        data: this.state.vulnerability_set_value
    }]

};

 var config = {
  chart: {
        type: 'column'
    },
    title: {
        text: 'Class Distribution'
    },
    subtitle: {
        text: ''
    },
    xAxis: {
        categories: [
          'Classes'
        ],
        crosshair: true
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Marks'
        },
        tickInterval: 2
    },
    tooltip: {
        
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
    },
    series: this.state.series
    };

        var config2 = {chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: 'Status Distribution'
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
            }
        }
    },
    series: [{
        name: 'Brands',
        colorByPoint: true,
        data: this.state.StatusSeries
    }]};

    var config3 = {chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: 'Type Distribution'
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
            }
        }
    },
    series: [{
        name: 'Brands',
        colorByPoint: true,
        data: this.state.YearSeries
    }]};

    const fuseConfig = {
      keys: ['label']
    };
     const fuseConfig2 = {
      keys: ['label']
    };

    const fuseConfig3 = {
      keys: ['label']
    };

     const fuseConfig4 = {
      keys: ['label']
    };

    const fuseConfig5 = {
      keys: ['label']
    };

   const fuseConfig6 = {
      keys: ['label']
    };

    const fuseConfig7 = {
      keys: ['label']
    };

    const fuseConfig8 = {
      keys: ['label']
    };

    const fuseConfig9 = {
      keys: ['label']
    };

    const fuseConfig10 = {
      keys: ['label']
    };



setTimeout(()=>{
   if(this.props.result && !this.props.ipindia && this.state.ipIndiaCheck==false) {
     this.IPIndiaDown();
   }
  }, 3000);

  if(this.props.fuzzy_results!=null && this.props.wildcard_results!=null && this.props.result!=null) {
    if(this.props.initials_results && localStorage.getItem('flash_initial')=='true') {
      var mark_initial=this.props.initials_results.search_result;
    }
   
   var mark_fuzzy=this.props.fuzzy_results.search_result;
   // var mark_contextual=this.props.contextual_results.search_result);
   var mark_wildcard=this.props.wildcard_results.search_result;
   var mark_flash= this.props.result.search_result;
   
   var initial_object=[];
   var fuzzy_object=[];
   var flash_object=[];
   // var contextual_object=[];
   var wildcard_object=[];
   console.log('mark_initial:',mark_initial);
   if(this.props.initials_results && localStorage.getItem('flash_initial')=='true') {
   _.map(mark_initial,function(mark,index){
   // console.log('index:',index);
    if(index<=9) {
      initial_object.push(mark);
    }
   })
 }

    _.map(mark_fuzzy,function(mark,index){
   // console.log('index:',index);
    if(index<=9) {
      fuzzy_object.push(mark);
    }
   })

   //   _.map(mark_contextual,function(mark,index){
   // // console.log('index:',index);
   //  if(index<=9) {
   //    contextual_object.push(mark);
   //  }
   // })

      _.map(mark_wildcard,function(mark,index){
   // console.log('index:',index);
    if(index<=9) {
      wildcard_object.push(mark);
    }
   })
     
     _.map(mark_flash,function(mark,index){
   // console.log('index:',index);
    if(index<=9) {
      flash_object.push(mark);
    }
   })


      if(!this.state.filterState) {
         if(this.props.initials_results){
      var final_initial={name:'Initial Search',marks:initial_object};
    }
   
   var final_fuzzy={name:'Fuzzy Search',marks:fuzzy_object};
   // var final_contextual={name:'Contextual',marks:contextual_object};
   var final_wildcard={name:'Wildcard Search',marks:wildcard_object};
   var final_flash={name:'Standard Search',marks:flash_object};

   var final_combined=[];
    final_combined.push(final_flash);
   final_combined.push(final_wildcard);
   final_combined.push(final_fuzzy);
   if(this.props.initials_results && localStorage.getItem('flash_initial')=='true') {
    final_combined.push(final_initial);
   }
   if(!this.state.top_result){
    this.SetTopResultsState(final_combined);
   }
    
   console.log('final_initial:',final_combined);
      }

      else if(this.state.filterState) {
    if(this.props.initials_results){
      var final_initial={name:'Initial Search',marks:this.state.filteredDataInitials};
    }
   
   var final_fuzzy={name:'Fuzzy Search',marks:this.state.filteredDataFuzzy};
   // var final_contextual={name:'Contextual Results',marks:contextual_object};
   var final_wildcard={name:'Wildcard Search',marks:this.props.wildcard_results.search_result};
   var final_flash={name:'Standard Search',marks:this.props.result.search_result};

   var final_combined=[];
    final_combined.push(final_flash);
   final_combined.push(final_wildcard);
   final_combined.push(final_fuzzy);
   if(this.props.initials_results && localStorage.getItem('flash_initial')=='true') {
    final_combined.push(final_initial);
   }
   console.log('final_initial:',final_combined);
      }

   
  }



   // if(this.props.result) {
      // console.log('this.props.filter:', this.props.result.filter);
   //        var proprietor= this.props.result.filter.proprietor;
   //  var states= this.props.filter.states;
   //  var status= this.props.filter.status;
   // }


       const tooltip = (
  <Tooltip id="tooltip">Instantly add marks with a particular similarity percent to your report</Tooltip>
);

    const element_data = [{heading:'Axis Bank', similarity:'80%', aggressive_index: 67},
                          {heading:'SBI Bank', similarity:'90%', aggressive_index: 65},
                          {heading:'Dena Bank', similarity:'30%', aggressive_index: 34},
                          {heading:'Baroda Bank', similarity:'20%', aggressive_index: 23},
                          {heading:'ICICI Bank', similarity:'10%', aggressive_index: 89}]

    var class_fil_arr =  localStorage.getItem('search_classes'); 
                

    var class_fil = _.map(JSON.parse(class_fil_arr), function(clas){
      
        return {label:clas}
    });     
    var classesFil=[];
    if(class_fil.length==0 && this.props.result) {
      class_fil = _.map(this.props.result.filters.classes, function(cl){
       return {label:cl}
      });
    }

    // console.log('class_fil:', class_fil);     
    var states=[];
    var status=[];
    var type =[];
    if(this.props.result) {

     states = _.map(this.props.result.filters.states, function(state){
       return {label:state}
      });

     status = _.map(this.props.result.filters.status, function(status){
    
      return {label:status.label}
      });
       
     type = _.map(this.props.result.filters.type, function(type){
     
       return {label:type}       
      })

    } 
    // console.log('year_application:',year_application);
    // type = _.filter(type,function(t){return t.label!=null})
    // console.log('new type:', type);

      var tr_status;
  if(status.length>0){  
     tr_status=_.map(status, function(p){
      if(p.label) {
        return (_.trim(p.label));
      }
      });
     // console.log('tr_status pre:', tr_status);
  
      tr_status=_.uniq(tr_status);
      

      tr_status = _.map(tr_status, function(o){
        if(o){
        return {label:o}
        }
      })
      // console.log('tr_status:',tr_status);
    }

    

    if(states.length>0 && status.length>0 && type.length>0) {
      states=_.uniq(states);
      status=_.uniq(status);
      type=_.uniq(type)

      if(!this.state.filters_stored) {
        this.handleSetFilter(states,status,type, class_fil);
      }
    }

    // var year_application= [{'1960-1970': [1586941, 1603968, 1613599, 1629414, 1635861, 1637298]}, {'1980-1990': [1784087, 1812264, 1814313, 1845632, 1851664, 1853011]} ];
    // console.log(status, states);    
var opp_count=[];
var opp_notice_count=[];
if(this.props.result && this.props.result.search_result) {
  _.map(this.props.result.search_result,function(res2){
        if(res2.opposition_notice_count>0) {
          opp_notice_count.push(res2);
        }
      })
}
// console.log('opp_notice_count:', opp_notice_count);
var opp_length;
var results=[];
if(this.props.result && this.props.result.search_result){
  
  _.map(this.props.result.search_result,function(res){
    if(res.opposition_count>0) {
      opp_count.push(res);
    }
  })
  opp_length=opp_count.length;
  results=this.props.result.search_result;
  // console.log('opp_count:',opp_count);
} 

if(this.props.result && !this.state.opp_count_state) {
  this.SetOppositionCount(opp_count, opp_notice_count);
}

  const similarity = [
  {label:'91%-100%',value:'91-100'},
  {label:'81%-90%',value:'81-90'},
  {label:'71%-80%',value:'71-80'},
  {label:'61%-70%',value:'61-70'},
  {label:'51%-60%',value:'51-60'},
  {label:'41%-50%',value:'41-50'},
  {label:'31%-40%',value:'31-40'},
  {label:'21%-30%',value:'21-30'},
  {label:'11%-20%',value:'11-20'},
  {label:'00%-10%',value:'00-10'},
  ];

   const date_of_application = [
    {label:'2011-2018'},
    {label:'2001-2010'},
    {label:'1991-2000'},
    {label:'1981-1990'},
    {label:'1971-1980'},
    {label:'1961-1970'},
    {label:'1950-1960'}
    ];

    const date_of_usage = [
    {label:'Proposed to be used'},
    {label:'2011-2018'},
    {label:'2001-2010'},
    {label:'1991-2000'},
    {label:'1981-1990'},
    {label:'1971-1980'},
    {label:'1961-1970'},
    {label:'1950-1960'}
    ];

    const date_usage=[];

    date_of_usage.map(slab=> {
      var limits = slab.label.split('-');
      var years = [];
      for(var i=parseInt(limits[0]);i<=limits[1];i++) {
        years.push(i);
      }

     date_usage.push({title:slab.label,expanded_years:years});
    })
    console.log('date_usage:',date_usage);

  const seeMore = (
  <Tooltip style={{fontSize:'17px'}} id="tooltip">Click to see details and realtime data of the mark</Tooltip>
);

  const exacOv = (
  <Tooltip style={{fontSize:'15px'}} id="tooltip">100% Similarity Level</Tooltip>
);
  const simiOv = (
  <Tooltip style={{fontSize:'15px'}} id="tooltip">75%-99% Similarity Level</Tooltip>
);
  const idenOv = (
  <Tooltip style={{fontSize:'15px'}} id="tooltip">51%-74% Similarity Level</Tooltip>
);

  const standardtip = (
  <Tooltip style={{fontSize:'15px'}} id="tooltip">Shows result with 60% and more similarity</Tooltip>
);

  const wildcardtip = (
  <Tooltip style={{fontSize:'15px'}} id="tooltip">Shows result for "{localStorage.getItem('wildcard_query')}" search</Tooltip>
);

  const fuzzytip = (
  <Tooltip style={{fontSize:'15px'}} id="tooltip">Marks with 40% character variation to your mark</Tooltip>
);

  const toptip = (
    <Tooltip style={{fontSize:'15px'}} id="tooltip">Top marks from each result.</Tooltip>
    );

  const customtip = (
        <Tooltip style={{fontSize:'15px'}} id="tooltip">Marks from all searches with chosen similarity will be added</Tooltip>
    );
    

    const filters = [{label:'Classes', list_item: [{label:'Class 1', value:'class_1'}, {label:'Class 2', value:'class_2'}, {label:'Class 3', value:'class_3'}]}, {label:'Classes2', list_item: [{label:'Class 1', value:'class_1'}, {label:'Class 2', value:'class_2'}, {label:'Class 3', value:'class_3'}]}];


    // console.log('Result for:',this.props.params.text);
        const classes=[{label:'Case 1', value: 'case_1'}, {label:'Case 2', value: 'case_2'}, {label:'Case 3', value: 'case_3'}]

    const sortBy = [{label:'Similarity(High to Low)', value: 'sim_h_l'},{label:'Similarity(Low to High)', value: 'sim_l_h'} ]
    return (
    <div id="resBody" >
      <div style={{background:'#F1F2F1'}} > 
        {/*(this.props.result==null || this.props.fuzzy_results==null || this.props.wildcard_results==null) &&
          <div className="col-sm-12" style={{textAlign:'center', background:'#F1F2F1', paddingTop:'10%', paddingBottom:'8%', height:'100vh'}} >
        <img src="../../images/loading.gif" style={{display:"block",left:'50%',marginLeft:"auto",marginRight:"auto", width:'40%'}}/>
        <br/>
        <p style={{fontSize:'18px', color:'#525252'}}>Crunching latest trademark data for you. Hang on... </p>
        </div>
        */}
      </div>
    <div style={{background:'#F1F2F1'}} > 
        {this.state.loaderState &&
          <div className="col-sm-12" style={{textAlign:'center', background:'#F1F2F1', paddingTop:'10%', paddingBottom:'8%', height:'100vh'}} >
        <img src="../../images/loading.gif" style={{display:"block",left:'50%',marginLeft:"auto",marginRight:"auto", width:'40%'}}/>
        <br/>
        <p style={{fontSize:'18px', color:'#525252'}}>Crunching latest trademark data for you. Hang on... </p>
        </div>
        }
    </div>
    <div style={{visibility:'hidden'}} id="scrollt" ><i style={{color:'#4285f4', position:'fixed',right:'10px',fontSize:'40px',zIndex:'999',bottom:'10px',cursor:'pointer'}} onScroll={this.handleScrollElement.bind(this)} onClick={this.hadleScrollTop.bind(this)}  className="fa fa-chevron-circle-up"></i></div>
    { !this.state.loaderState && <div className="container-fluid result">
    {/*<ScrollButton scrollStepInPx="70" delayInMs="10"/>*/}

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
    {!this.state.global_search && <div className="row">
              <div className="row top-nav" id="top-element">
            <div className="col-sm-12">
              <div className="col-sm-6 pull-left">
                 <div className="top-menu"> 
                    <i className="fa fa-bars pull-left" onClick={this.openNav.bind(this)} aria-hidden="true"></i>
                </div>
              </div>
              <div className="col-sm-6">
                 <Link to="/search" ><i className="fa fa-search pull-right" aria-hidden="true"></i></Link>
              </div>
            </div>
          </div>
    
          <div className="report-page col-sm-12">

          <div className="row">
            <div className="col-sm-12">
            <div className="col-sm-4 search-stats">
             <h2>Chosen mark: {this.props.params.text}</h2>
             <div className="result-num">
             <p style={{fontSize:'20px', textTransform:'capitalize'}} >Search type: MikeTM Flash</p>
             {this.props.result && <p style={{fontSize:'17px', textTransform:'capitalize'}} >Total marks: {this.props.result.result_count}</p>} 
             <p>Similarity Index:</p>
                  <p style={{width:'60%',marginBottom:'7px !important'}} ><span style={{backgroundColor:'#DF5353',marginRight:'5px !important'}} className="dot"></span>100% : {exact.length} Marks</p>

                  <p style={{width:'60%',marginBottom:'7px !important'}} ><span style={{backgroundColor:'#DDDF0D',marginRight:'5px !important'}} className="dot"></span>75%-99% : {similar.length} Marks</p>

                  <p style={{width:'60%',marginBottom:'7px !important'}} ><span style={{backgroundColor:'#55BF3B',marginRight:'5px !important'}} className="dot"></span>50%-75% : {identical.length} Marks</p>           
             </div>
             </div>
             <div className="col-sm-4 safety-meter">
                <ReactHighcharts config = {safety}></ReactHighcharts>
             </div>
             <div className="col-sm-4 safety-text">
                {SafetyMeter && SafetyMeter[0]==1 && 
                  <div>
                <h3 style={{marginBottom:'0'}} >Vulnerability level: Low</h3>
                <p>There are high chances for registration of this mark. You can proceed with the filing of this application</p> </div>}

                {SafetyMeter && SafetyMeter[0]==3 && 
                  <div>
                <h3>Vulnerability level: Medium</h3>
                <p>There are moderate chances for registration of this mark. You can proceed cautiously with the filing of this application</p></div>}

                {SafetyMeter && SafetyMeter[0]==5 && 
                  <div>
                <h3>Vulnerability level: High</h3>
                <p>There are low chances for registration of this mark. You need to reconsider filing of this application</p> </div>}
             </div>
            </div>
          </div>
          </div>
          </div>}
          {!this.state.global_search && 
          <div className="row">
            <Tabs>
              <TabList className="col-sm-12 tab-list">
                <Tab>Result Tab</Tab>
                <Tab>Result Analysis</Tab>
              </TabList>
              {/*
                <Select
                     multi={true}
                    name="form-field-name"
                    className="classes" 
                    autoBlur={true}
                    options={classArr}
                    onInputChange={this.cleanInput.bind(this)}
                    value={this.state.searchInput}
                    onChange={this.handleSelectChange.bind(this)}
                    placeholder="Classes"
                  />  
                  <div style={{marginLeft:'10%'}}>
        <InputFilter debounceTime={200} />
        <div>Any amount of content between</div>
        <FilterResults
          items={items}
          fuseConfig={fuseConfig}>
          {filteredItems => {
            return(
              <div>
                {filteredItems.map(item => <div>{item.name}</div>)}
              </div>
            )
          }}
        </FilterResults>
      </div> 
              */}

              <TabPanel>
                <div className="row">
                     <div className="results col-sm-12"> 
                     <div className="row">
                    <div className="col-sm-12 filter-dash" style={{paddingRight:'15px !important',marginBottom:'-1%',marginTop:'-0.8%'}} >
                     <Navbar style={{marginBottom:'3px'}} inverse collapseOnSelect>
                        <Navbar.Collapse>
                          <Nav style={{display:"flex"}}>
                          <NavDropdown className={this.state.selected_classes.length>0?"underline_nav":null} open={this.state.ClMenuOpen} onToggle={val => this.dropdownToggleCl(val)} eventKey={3} title="Classes" id="basic-nav-dropdown">
                              <ul style={{listStyle:'none !important',paddingLeft:'1% !important'}}>
                                  {this.state.class_fil && this.state.class_fil.map(cl=> <li style={{padding:'3px 20px'}} onClick={() => {this.menuItemClickedThatShouldntCloseDropdown()}}><input onClick={() => {this.handleNewFilter(cl.label,'associated_class')}} name="fil_check" type="checkbox" />{cl.label}</li>)}
                              </ul>       
                          </NavDropdown>

                          <NavDropdown className={this.state.selected_status.length>0?"underline_nav":null} open={this.state.StatusMenuOpen} onToggle={val => this.dropdownToggleStatus(val)} eventKey={3} title="Status" id="basic-nav-dropdown">
                              <ul style={{listStyle:'none !important',paddingLeft:'1% !important'}}>
                                  {this.state.status && this.state.status.map(status=> <li style={{padding:'3px 20px'}} onClick={() => {this.menuItemClickedThatShouldntCloseDropdown()}}><input onClick={() => {this.handleNewFilter(status.label,'status')}} name="fil_check" type="checkbox" />{status.label}</li>)}
                              </ul>       
                          </NavDropdown>

                          <NavDropdown className={this.state.selected_state.length>0?"underline_nav":null} open={this.state.StatesMenuOpen} onToggle={val => this.dropdownToggleStates(val)} eventKey={3} title="States" id="basic-nav-dropdown">
                              <ul style={{listStyle:'none !important',paddingLeft:'1% !important'}}>
                                  {this.state.states && this.state.states.map(state=> <li style={{padding:'3px 20px'}} onClick={() => {this.menuItemClickedThatShouldntCloseDropdown()}}><input onClick={() => {this.handleNewFilter(state.label,'state')}} name="fil_check" type="checkbox" />{state.label}</li>)}
                              </ul>       
                          </NavDropdown>

                          <NavDropdown className={this.state.sim_value_under=='min0max100'?"underline_nav":null} className="similarity_drop" open={this.state.SimMenuOpen} onToggle={val => this.dropdownToggleSim(val)} eventKey={3} title="Similarity" id="basic-nav-dropdown">
                          <InputRange
                            maxValue={100}
                            minValue={0}
                            value={this.state.sim_value}
                            onChange={sim_value => this.setState({ sim_value, sim_value_under:'min'+sim_value.min+'max'+sim_value.max })}
                            style={{height:'150px',paddingTop:'15px'}} />     
                            <p style={{paddingTop:'12%', fontSize:'15px'}} >{this.state.sim_value.min}% to {this.state.sim_value.max}% Similar</p>
                          </NavDropdown>

                          <NavDropdown className={this.state.selected_type.length>0?"underline_nav":null} className={this.state.selected_type.length>0?"underline_nav":null} open={this.state.TpMenuOpen} onToggle={val => this.dropdownToggleTp(val)} eventKey={3} title="Trademark Type" id="basic-nav-dropdown">
                              <ul style={{listStyle:'none !important',paddingLeft:'1% !important'}}>
                                  {this.state.type && this.state.type.map(tp=> <li style={{padding:'3px 20px'}} onClick={() => {this.menuItemClickedThatShouldntCloseDropdown()}}><input onClick={() => {this.handleNewFilter(tp.label,'type')}} name="fil_check" type="checkbox" />{tp.label}</li>)}
                              </ul>       
                          </NavDropdown>

                          {/*<NavDropdown className="date_drop_usage" open={this.state.DouMenuOpen} onToggle={val => this.dropdownToggleDou(val)} eventKey={3} title="Date of Usage" id="basic-nav-dropdown">
                            <ul className="dropdown-menu-doa multi-level" style={{listStyle:'none !important',paddingLeft:'1% !important'}}>
                                  {date_of_usage.map(dou=> <li className="dropdown-submenu" style={{padding:'3px 20px'}}><input onClick={() => {this.handleNewFilter(dou.label,'date_of_usage')}} name="fil_check" type="checkbox" />{dou.label}{this.state.slab==dou.label && <ul style={{listStyle:'none'}} className="dropdown-menu-doa" >{this.state.selected_years && this.state.selected_years.map(year => <li><input type="checkbox" />{year}</li>)}</ul>}</li>)}
                            </ul> 
                          </NavDropdown>*/}

                          {/*<NavDropdown className="date_drop_usage" open={this.state.DoaMenuOpen} onToggle={val => this.dropdownToggleDoa(val)} eventKey={4} title="Date of Application" id="basic-nav-dropdown">
                            <ul className="dropdown-menu-doa multi-level" style={{listStyle:'none !important',paddingLeft:'1% !important'}}>
                                  {date_of_application.map(doa=> <li onClick={() => {this.handleSelectDouSlab(doa.label)}} className="dropdown-submenu" style={{padding:'3px 20px'}}><input onClick={() => {this.handleNewFilter(doa.label,'date_of_application')}} name="fil_check" type="checkbox" />{doa.label}</li>)}
                            </ul>          
                          </NavDropdown>*/}
                          {/*<NavItem>
                          <DropdownMenu {...menuOptions}>
                            {date_usage.map(data => {
                              return <div style={{display:'flex !important', minWidth:'130px'}} >
                              <li style={{display:'flex'}} className="slab_li"><input style={{marginLeft:'4%',marginTop:'13%'}}  type="checkbox" /><span style={{width:'50%', padding:'12px 19px'}} >{data.title}</span></li>
                              <NestedDropdownMenu style={{display:'flex !important'}} {...nestedProps}>
                              {data.expanded_years.map(ch=>{return <li style={{display:'flex !important'}}><input style={{marginLeft:'10%',marginTop:'20%'}} type="checkbox" /><span style={{width:'50%', padding:'12px 19px'}} >{ch}</span></li>})}
                            </NestedDropdownMenu>
                            </div>
                            })}
                          </DropdownMenu>
                          </NavItem>*/}

                         
                           {
                          //   this.state.showSpecificMark && this.state.showSpecificMark?
                          // <Navbar.Text pullRight className="ml-0 mt-12 mb-0 p-5 bg-success">
                          //   Searched for mark: "<b>{this.state.showSpecificMark}</b>"
                          //   <i onClick={this.specificMarkReset.bind(this)} className="reset-style">Reset</i>
                          // </Navbar.Text>
                          // : null
                          }
                          <Navbar.Form className="ml-20 mt-10">
                            <FormGroup>
                              <FormControl className="sMarkStyleBox" onChange={this.specificSearchFunc.bind(this)} value={this.state.specificMark} type="text" placeholder="Search for specific mark..." />
                            </FormGroup>
                          {
                            // <Button className="sMarkStyleSearch" type="submit" onClick={this.showSpecificSearchFunc.bind(this)}><i className="glyphicon glyphicon-search"></i> </Button>
                          }
                          </Navbar.Form>

                          <NavItem onClick={this.handleReset.bind(this)} style={{backgroundColor:'#FFF'}} href="#">
                            <span style={{color:'#4285f4 !important'}} >Reset</span>
                          </NavItem>
                          <Button onClick={this.handleApplyFilters.bind(this)} style={{marginTop:'10px', marginBottom:'10px'}} >Apply</Button>


                          </Nav>
                        </Navbar.Collapse>
                      </Navbar>
                     </div>
                    </div>         
              
                    <div className="col-sm-12 result-area">
                    <div className="row rep-stat">
                       <div className="col-sm-12 action-report">
                   <div className="action-bar col-sm-10" style={{height: "120px !important"}}>
                   <div className="row">
                   <div style={{paddingLeft:'0 !important'}} className="col-sm-12">
                       <div style={{textAlign:'left'}} className=" col-sm-8 filter-area">
                           {this.state.opp_count && <div className="aggressive_count"><p><img src={'../../images/fire.png'}/> {this.state.opp_count.length} Opposed Brands</p></div>}
                           {this.state.opp_notice_count && <div style={{width:'40% !important'}} className="aggressive_count"><p><img src={'../../images/clipboard.png'}/> {this.state.opp_notice_count.length} Brands with Opposition Notices</p></div>}   
                         </div>
                         <div className="col-sm-4" style={{textAlign:'right'}} >
                           <p style={{fontSize:'13px', textAlign:'right', paddingRight:'10px',paddingTop:'3%'}} >*Please hover on the marks to see more info</p>
                         </div>
                       </div>  
                     </div>

                     <div className="row">
                        <div className="col-sm-12 sort-area" style={{display:'inline-flex', paddingTop:'3%'}}>
                           <div className="input-group col-sm-1">
                              <h5 style={{marginBottom:'0', padding:'6px 0'}} ><strong>Sort By</strong></h5>

                          </div>
                          <div className="col-sm-8 sort-btn" >
                             
                            
                              {!this.state.sort_hl && <button onClick={this.handleOpphl.bind(this)} style={{paddingLeft:'10px !important'}}  className="col-sm-2 btn btn-default"> Opposed high to low</button>}
                              {this.state.sort_hl && <button onClick={this.handleOpphl.bind(this)} style={{background:'#4285f4 !important', color:'#FFF !important', paddingLeft:'10px !important'}}  className="col-sm-2 btn btn-default"> Opposed high to low</button>}
                              {!this.state.sort_lh && <button onClick={this.handleOpplh.bind(this)} style={{paddingLeft:'10px !important'}} className="col-sm-2 btn btn-default"> Opposed low to high</button>}
                              {this.state.sort_lh && <button onClick={this.handleOpplh.bind(this)} style={{background:'#4285f4 !important', color:'#FFF !important', paddingLeft:'10px !important'}} className="col-sm-2 btn btn-default"> Opposed low to high</button>}
                             
                          </div>
                        </div>
                     </div>  
                   </div>
         
              <div className="report-area col-sm-2 col-xs-3" style={{height: "120px !important"}} >
                  <div className="row">
                  <div style={{paddingTop:'4%'}} className="col-sm-12">
                      <h3>{_.uniq(this.state.add_report_id).length} Marks</h3>
                      </div>
                      </div>
                      <div className="row">
                      <div className="col-sm-12">
                        <Button onClick={this.handleReportAdd.bind(this)}>Report</Button>
                      </div>
                        </div>
                        <div className="row">
                          <div className="col-sm-12">
                           <OverlayTrigger placement="left" overlay={customtip}>
                              <DropdownButton title="Custom" id="bg-nested-dropdown">
                                <li  eventKey="1"><span style={{paddingLeft:'10px'}}><input onChange={this.handleCustomDelete.bind(this, '0-100')} checked={this.state.all} ref="check_all"  type="checkbox" className="list-item" />All</span></li>
                                <li  eventKey="1"><span style={{paddingLeft:'10px'}}><input onChange={this.handleCustomDelete.bind(this, '90-100')} disabled={ (this.state.called) || (this.state.sim_value_under!='min0max100')} checked={this.state.hun} type="checkbox" ref="check_100" className="list-item" />91%-100%</span></li>
                                <li  eventKey="1"><span style={{paddingLeft:'10px'}}><input onChange={this.handleCustomDelete.bind(this, '80-90')} disabled={(this.state.called) || (this.state.sim_value_under!='min0max100')} checked={this.state.nin} type="checkbox" ref="check_90" className="list-item"/>81%-90%</span></li>
                                <li  eventKey="1"><span style={{paddingLeft:'10px'}}><input onChange={this.handleCustomDelete.bind(this, '70-80')} disabled={(this.state.called) || (this.state.sim_value_under!='min0max100')} checked={this.state.eig} type="checkbox" ref="check_80" className="list-item"/>71%-80%</span></li>
                                <li  eventKey="1"><span style={{paddingLeft:'10px'}}><input onChange={this.handleCustomDelete.bind(this, '60-70')} disabled={(this.state.called) || (this.state.sim_value_under!='min0max100')} checked={this.state.sev} type="checkbox" ref="check_70" className="list-item"/>61%-70%</span></li>
                                <li  eventKey="1"><span style={{paddingLeft:'10px'}}><input onChange={this.handleCustomDelete.bind(this, '50-60')} disabled={(this.state.called) || (this.state.sim_value_under!='min0max100')} checked={this.state.six} type="checkbox" ref="check_60" className="list-item"/>51%-60%</span></li>
                                <li  eventKey="1"><span style={{paddingLeft:'10px'}}><input onChange={this.handleCustomDelete.bind(this, '40-50')} disabled={(this.state.called) || (this.state.sim_value_under!='min0max100')} checked={this.state.fif} type="checkbox" ref="check_50" className="list-item"/>41%-50%</span></li>
                                <li  eventKey="1"><span style={{paddingLeft:'10px'}}><input onChange={this.handleCustomDelete.bind(this, '30-40')} disabled={(this.state.called) || (this.state.sim_value_under!='min0max100')} checked={this.state.fou} type="checkbox" ref="check_40" className="list-item"/>31%-40%</span></li>
                                <li  eventKey="1"><span style={{paddingLeft:'10px'}}><input onChange={this.handleCustomDelete.bind(this, '20-30')} disabled={(this.state.called) || (this.state.sim_value_under!='min0max100')} checked={this.state.thi} type="checkbox" ref="check_30" className="list-item"/>21%-30%</span></li>
                                <li  eventKey="1"><span style={{paddingLeft:'10px'}}><input onChange={this.handleCustomDelete.bind(this, '10-20')} disabled={(this.state.called) || (this.state.sim_value_under!='min0max100')} checked={this.state.twe} type="checkbox" ref="check_20" className="list-item"/>11%-20%</span></li>
                                <li  eventKey="1"><span style={{paddingLeft:'10px'}}><input onChange={this.handleCustomDelete.bind(this, '00-10')} disabled={(this.state.called) || (this.state.sim_value_under!='min0max100')} checked={this.state.one} type="checkbox" ref="check_10" className="list-item"/>00%-10%</span></li>
                            </DropdownButton>
                            </OverlayTrigger>
                          </div>
                        </div>
                  </div>
                     </div>
                  </div>  
              
                <div className="row">
                  <div className="col-sm-12" style={{background:'#FFF', marginLeft: '2.4%'}} >
                  <Tabs>
                  
                    <TabList>
                    <Tab>
                     <OverlayTrigger placement="top" overlay={toptip}>
                        <span>Top Results</span>
                      </OverlayTrigger>
                    </Tab>
                    <Tab>
                     <OverlayTrigger placement="top" overlay={standardtip}>
                        <span>Standard Results</span>
                      </OverlayTrigger>
                    </Tab>
                    <Tab>
                     <OverlayTrigger placement="top" overlay={wildcardtip}>
                        <span>Wildcard Results</span>
                      </OverlayTrigger>
                    </Tab>
                    <Tab>
                     <OverlayTrigger placement="top" overlay={fuzzytip}>
                        <span>Fuzzy Results</span>
                      </OverlayTrigger>
                    </Tab>

                      {/*<Tab>Contextual Results</Tab>*/}
                      
                      {this.props.initials_results && localStorage.getItem('flash_initial')=='true' && <Tab>Inititals Results</Tab>}
                    </TabList>

                    <TabPanel>
                      <div className="row">
                           <div className="col-sm-12" style={{background:'#FFF', marginLeft: '1%',paddingRight: '5%!important'}} >
                              <div className="elements-area flash_search">
                              {!this.props.result && !this.props.wildcard_results && !this.props.fuzzy_results && <div className="col-sm-12" style={{textAlign:'center'}} ><img style={{textAlign:'center'}} src="../../images/loader_list.gif" /></div>}
                              {this.state.top_data && this.props.result && final_combined.length>0 && final_combined.map(res=>
                               
                                   <div style={{display:'flow-root'}} className="panel panel-primary" >
                                   <div style={{padding:'1px !important'}} className="panel-heading">
                                    <h3 style={{paddingLeft:'30px'}} >{res.name}</h3>
                                   </div> 
                                    <br />
                                <div className="panel-body">    
                                {res.marks.length>0 && res.marks.map((data)=>
                                  <div>
                                  <div id="f1_container" className="col-sm-4">
                                   <div id="f1_card" className={this.state['isFlipped'+data.id+res.name]?"shadow flip":"shadow"}>
                                     <div className="front face">
                                       <div className="elements-flip">
                                       <div></div>
                                  {!data.associated_image && data.applied_for && <h3 style={{maxHeight:'95px', textOverflow:'ellipsis', overflow:'hidden'}}>{data.applied_for}</h3>}
                                  {data.associated_image && <img style={{height:'50%', width:'100% !important'}} src={this.siteImg(data.associated_image)} />}
                                  <hr size="2" style={{marginBottom:'0 !important'}} />
                                  <div className="overlay">
                                  <ButtonGroup>
                                  <Button style={{minWidth:'84%'}} className="btn btn-primary" onClick={() => {this.showDetail(data,res.name)}}>Show Details</Button>
                                  {this.state.add_report_id.indexOf(data.id) == -1 && <Button style={{minWidth:'84%'}} className="btn btn-default" onClick={() => {this.addReport(data)}}>Add to report</Button>}
                                  {this.state.add_report_id.indexOf(data.id) > -1 && <Button style={{minWidth:'84%'}} className="btn btn-danger" onClick={() => {this.removeReport(data)}}>Remove</Button>}
                                  <Button onClick={() => {this.handleSeeMore(data)}} style={{backgroundColor:'#F0E7E7 !important', color:'#345b9e !important', minWidth:'84%', border:'none', boxShadow:'none'}} >Get Realtime info</Button>
                                  </ButtonGroup>
                                  </div>
                                  {data.associated_image && data.applied_for && <p style={{textOverflow:'ellipsis', overflow:'hidden',whiteSpace: 'nowrap', maxWidth:'100%', textAlign:'center', paddingTop:'3px', maxHeight:'25px'}} >{data.applied_for}</p>}
                                  {data.similarity_index>0 && <p>{Math.round(data.similarity_index * 100) / 100}% Similar</p>}
                                  {data.similarity_index==0 && <p>0% Similar</p>}
                                  <div style={{display:'flex'}} >
                                  <p style={{width:'50%', textAlign:'right', paddingRight:'15px'}} ><img src='../../images/fire.png' />{data.opposition_count}</p>
                                  <div style={{borderLeft:'1px solid #DDD',height:'25px'}}></div>
                                  <p style={{width:'50%', textAlign:'left', paddingLeft:'15px'}} ><img src='../../images/clipboard.png' /> {data.opposition_notice_count}</p>
                                  </div>
                                                    
                   
                               </div>
                                     </div>
                                     <div className="back face center">
                                      <div className="row">
                                        <div className="col-sm-12" style={{paddingLeft:'0'}}>
                                         <div className="col-sm-10" style={{paddingLeft:'5px', paddingRight:'0'}} >
                                           <p style={{fontSize:'12px', textAlign:'left', color:'black', fontStyle:'italic', fontWeight:'600 !important'}} >*Last updated on: {(new Date(data.modified).getDate())+'/' + (new Date(data.modified).getMonth()+1)+'/'+ new Date(data.modified).getFullYear()}</p>
                                         </div>
                                         <div className="col-sm-2">
                                           <i className="fa fa-1.2x fa-chevron-left pull-right" onClick={() => {this.hideDetail(data,res.name)}} aria-hidden="true"></i>
                                         </div>
                                        </div>
                                     </div>
     
                                       <ul>
                                         <li><strong>Status: </strong>{data.status}</li>
                                         <li style={{whiteSpace:'nowrap',overflowX:'hidden'}} ><strong>Class: </strong>{data.associated_class.sort((a,b) => a - b).toString()}</li>
                                         <table style={{marginBottom:'0 !important'}} className="table card-table">
                                         <tbody>
                                         <tr style={{textAlign:'left !important'}}>
                                            {data.proprietor && data.proprietor.length>0 && data.proprietor[0].name && <td style={{width:'42% !important'}} ><strong>Proprietor:</strong></td>}
                                            {data.proprietor && data.proprietor.length>0 && data.proprietor[0].name && <td style={{maxWidth:'50px !important', textOverflow:'ellipsis !important',overflowX:'hidden !important'}} ><ul style={{paddingTop: '0',maxHeight:'50px !important', overflowY:'scroll' }} >
                                             {data.proprietor.map(propr=> <li style={{cursor:'pointer', color:'#4285f4',background:'#FFF',whiteSpace:'nowrap',overflowX:'hidden'}} onClick={()=> {this.handleProprietorClick(propr)}} >{propr.name}</li>) 
                                            }</ul></td>}
                                          </tr>
                                          </tbody>
                                          </table>
                                        {/*data.proprietor && data.proprietor.length>0 && data.proprietor[0].name && <li><strong>Proprietor: </strong><p2 style={{cursor:'pointer', color:'#4285f4'}} onClick={()=> {this.handleProprietorClick(data)}} >{data.proprietor[0].name}</p2></li>*/}
                                         {data.application_number && <li style={{paddingTop:'10px'}} ><strong>Application: </strong>{data.application_number}</li>}
                                       </ul>
                                       <p style={{cursor:'pointer', color:'#4285f4'}} onClick={() => {this.handleSeeMore(data)}}>Get Realtime info</p>
                                     </div>
                                   </div>
                                   </div>
                                   </div>
                                  )}
                                 </div>
                                 {res.marks.length==0 &&
                                <div className="col-sm-5 col-sm-offset-5">
                              <h3>No marks were found.</h3>
                            </div>
                                }
                                </div>                          
                              )}
                             
                             {this.state.filterState && this.state.filteredDataTop && this.state.filteredDataTop.map(res=>
                               
                                   <div style={{display:'flow-root'}} className="panel panel-primary" >
                                   <div style={{padding:'1px !important'}} className="panel-heading">
                                    <h3 style={{paddingLeft:'30px'}} >{res.name}</h3>
                                   </div> 
                                    <br />
                                <div className="panel-body">    
                                {res.marks.length>0 && res.marks
                                  .map((data)=>
                                  <div>
                                  <div id="f1_container" className="col-sm-4">
                                   <div id="f1_card" className={this.state['isFlipped'+data.id+res.name]?"shadow flip":"shadow"}>
                                     <div className="front face">
                                       <div className="elements-flip">
                                       <div></div>
                                  {!data.associated_image && data.applied_for && <h3 style={{maxHeight:'95px', textOverflow:'ellipsis', overflow:'hidden'}}>{data.applied_for}</h3>}
                                  {data.associated_image && <img style={{height:'50%', width:'100% !important'}} src={this.siteImg(data.associated_image)} />}
                                  <hr size="2" style={{marginBottom:'0 !important'}} />
                                  <div className="overlay">
                                  <ButtonGroup>
                                  <Button style={{minWidth:'84%'}} className="btn btn-primary" onClick={() => {this.showDetail(data,res.name)}}>Show Details</Button>
                                  {this.state.add_report_id.indexOf(data.id) == -1 && <Button style={{minWidth:'84%'}} className="btn btn-default" onClick={() => {this.addReport(data)}}>Add to report</Button>}
                                  {this.state.add_report_id.indexOf(data.id) > -1 && <Button style={{minWidth:'84%'}} className="btn btn-danger" onClick={() => {this.removeReport(data)}}>Remove</Button>}
                                  <Button onClick={() => {this.handleSeeMore(data)}} style={{backgroundColor:'#F0E7E7 !important', color:'#345b9e !important', minWidth:'84%', border:'none', boxShadow:'none'}} >Get Realtime info</Button>
                                  </ButtonGroup>
                                  </div>
                                  {data.associated_image && data.applied_for && <p style={{textOverflow:'ellipsis', overflow:'hidden',whiteSpace: 'nowrap', maxWidth:'100%', textAlign:'center', paddingTop:'3px', maxHeight:'25px'}} >{data.applied_for}</p>}
                                  {data.similarity_index>0 && <p>{Math.round(data.similarity_index * 100) / 100}% Similar</p>}
                                  {data.similarity_index==0 && <p>0% Similar</p>}
                                  <div style={{display:'flex'}} >
                                  <p style={{width:'50%', textAlign:'right', paddingRight:'15px'}} ><img src='../../images/fire.png' />{data.opposition_count}</p>
                                  <div style={{borderLeft:'1px solid #DDD',height:'25px'}}></div>
                                  <p style={{width:'50%', textAlign:'left', paddingLeft:'15px'}} ><img src='../../images/clipboard.png' /> {data.opposition_notice_count}</p>
                                  </div>
                                                    
                   
                               </div>
                                     </div>
                                     <div className="back face center">
                                      <div className="row">
                                        <div className="col-sm-12" style={{paddingLeft:'0'}}>
                                         <div className="col-sm-10" style={{paddingLeft:'5px', paddingRight:'0'}} >
                                           <p style={{fontSize:'12px', textAlign:'left', color:'black', fontStyle:'italic', fontWeight:'600 !important'}} >*Last updated on: {(new Date(data.modified).getDate())+'/' + (new Date(data.modified).getMonth()+1)+'/'+ new Date(data.modified).getFullYear()}</p>
                                         </div>
                                         <div className="col-sm-2">
                                           <i className="fa fa-1.2x fa-chevron-left pull-right" onClick={() => {this.hideDetail(data,res.name)}} aria-hidden="true"></i>
                                         </div>
                                        </div>
                                     </div>
     
                                       <ul>
                                         <li><strong>Status: </strong>{data.status}</li>
                                         <li style={{whiteSpace:'nowrap',overflowX:'hidden'}} ><strong>Class: </strong>{data.associated_class.sort((a,b) => a - b).toString()}</li>
                                         <table style={{marginBottom:'0 !important'}} className="table card-table">
                                         <tbody>
                                         <tr style={{textAlign:'left !important'}}>
                                            {data.proprietor && data.proprietor.length>0 && data.proprietor[0].name && <td style={{width:'42% !important'}} ><strong>Proprietor:</strong></td>}
                                            {data.proprietor && data.proprietor.length>0 && data.proprietor[0].name && <td style={{maxWidth:'50px !important',textOverflow:'ellipsis !important',overflowX:'hidden !important'}} ><ul style={{paddingTop: '0',maxHeight:'50px !important', overflowY:'scroll' }} >
                                             {data.proprietor.map(propr=> <li style={{cursor:'pointer', color:'#4285f4',background:'#FFF',whiteSpace:'nowrap',overflowX:'hidden'}} onClick={()=> {this.handleProprietorClick(propr)}} >{propr.name}</li>) 
                                            }</ul></td>}
                                          </tr>
                                          </tbody>
                                          </table>
                                        {/*data.proprietor && data.proprietor.length>0 && data.proprietor[0].name && <li><strong>Proprietor: </strong><p2 style={{cursor:'pointer', color:'#4285f4'}} onClick={()=> {this.handleProprietorClick(data)}} >{data.proprietor[0].name}</p2></li>*/}
                                         {data.application_number && <li style={{paddingTop:'10px'}} ><strong>Application: </strong>{data.application_number}</li>}
                                       </ul>
                                       <p style={{cursor:'pointer', color:'#4285f4'}} onClick={() => {this.handleSeeMore(data)}}>Get Realtime info</p>
                                     </div>
                                   </div>
                                   </div>
                                   </div>
                                  )}
                                 </div>
                                 {res.marks.length==0 &&
                                <div className="col-sm-5 col-sm-offset-5">
                              <h3>No marks were found.</h3>
                            </div>
                                }
                                </div>                          
                              )}
                          </div> 
                           </div>                          
                        </div>
                    </TabPanel>

                    {/*------FLASH RESULT SECTION-------*/}
                    <TabPanel>
                      <div className="row">
                           <div className="col-sm-12" style={{background:'#FFF', marginLeft: '2.4%'}} >
                              <div className="elements-area">
                              {!this.props.result && <div className="col-sm-12" style={{textAlign:'center'}} ><img style={{textAlign:'center'}} src="../../images/loader_list.gif" /></div>}
                              {!this.state.filterState && !this.state.sort_hl && !this.state.sort_lh && this.props.result && this.props.result.search_result
                                .map(data =>  
                                <div id="f1_container" className="col-sm-4">
                                   <div id="f1_card" className={this.state['isFlipped'+data.id+'flash']?"shadow flip":"shadow"}>
                                     <div className="front face">
                                       <div className="elements-flip">
                                       <div></div>
                                  {!data.associated_image && data.applied_for && <h3 style={{maxHeight:'95px', textOverflow:'ellipsis', overflow:'hidden'}}>{data.applied_for}</h3>}
                                  {data.associated_image && <img style={{height:'50%', width:'100% !important'}} src={this.siteImg(data.associated_image)} />}
                                  <hr size="2" style={{marginBottom:'0 !important'}} />
                                  <div className="overlay">
                                  <ButtonGroup>
                                  <Button style={{minWidth:'84%'}} className="btn btn-primary" onClick={() => {this.showDetail(data,'flash')}}>Show Details</Button>
                                  {this.state.add_report_id.indexOf(data.id) == -1 && <Button style={{minWidth:'84%'}} className="btn btn-default" onClick={() => {this.addReport(data)}}>Add to report</Button>}
                                  {this.state.add_report_id.indexOf(data.id) > -1 && <Button style={{minWidth:'84%'}} className="btn btn-danger" onClick={() => {this.removeReport(data)}}>Remove</Button>}
                                  <Button onClick={() => {this.handleSeeMore(data)}} style={{backgroundColor:'#F0E7E7 !important', color:'#345b9e !important', minWidth:'84%', border:'none', boxShadow:'none'}} >Get Realtime info</Button>
                                  </ButtonGroup>
                                  </div>
                                  {data.associated_image && data.applied_for && <p style={{textOverflow:'ellipsis', overflow:'hidden',whiteSpace: 'nowrap', maxWidth:'100%', textAlign:'center', paddingTop:'3px', maxHeight:'25px'}} >{data.applied_for}</p>}
                                  {data.similarity_index>0 && <p>{Math.round(data.similarity_index * 100) / 100}% Similar</p>}
                                  {data.similarity_index==0 && <p>0% Similar</p>}
                                  <div style={{display:'flex'}} >
                                  <p style={{width:'50%', textAlign:'right', paddingRight:'15px'}} ><img src='../../images/fire.png' />{data.opposition_count}</p>
                                  <div style={{borderLeft:'1px solid #DDD',height:'25px'}}></div>
                                  <p style={{width:'50%', textAlign:'left', paddingLeft:'15px'}} ><img src='../../images/clipboard.png' /> {data.opposition_notice_count}</p>
                                  </div>
                                                    
                   
                               </div>
                                     </div>
                                     <div className="back face center">
                                      <div className="row">
                                        <div className="col-sm-12" style={{paddingLeft:'0'}}>
                                         <div className="col-sm-10" style={{paddingLeft:'5px', paddingRight:'0'}} >
                                           <p style={{fontSize:'12px', textAlign:'left', color:'black', fontStyle:'italic', fontWeight:'600 !important'}} >*Last updated on: {(new Date(data.modified).getDate())+'/' + (new Date(data.modified).getMonth()+1)+'/'+ new Date(data.modified).getFullYear()}</p>
                                         </div>
                                         <div className="col-sm-2">
                                           <i className="fa fa-1.2x fa-chevron-left pull-right" onClick={() => {this.hideDetail(data,'flash')}} aria-hidden="true"></i>
                                         </div>
                                        </div>
                                     </div>
     
                                       <ul>
                                         <li><strong>Status: </strong>{data.status}</li>
                                         <li style={{whiteSpace:'nowrap',overflowX:'hidden'}} ><strong>Class: </strong>{data.associated_class.sort((a,b) => a - b).toString()}</li>
                                         <table style={{marginBottom:'0 !important'}} className="table card-table">
                                         <tbody>
                                         <tr style={{textAlign:'left !important'}}>
                                            {data.proprietor && data.proprietor.length>0 && data.proprietor[0].name && <td style={{width:'42% !important'}} ><strong>Proprietor:</strong></td>}
                                            {data.proprietor && data.proprietor.length>0 && data.proprietor[0].name && <td style={{maxWidth:'50px !important',textOverflow:'ellipsis !important',overflowX:'hidden !important'}} ><ul style={{paddingTop: '0',maxHeight:'50px !important', overflowY:'scroll' }} >
                                             {data.proprietor.map(propr=> <li style={{cursor:'pointer', color:'#4285f4',background:'#FFF',whiteSpace:'nowrap',overflowX:'hidden'}} onClick={()=> {this.handleProprietorClick(propr)}} >{propr.name}</li>) 
                                            }</ul></td>}
                                          </tr>
                                          </tbody>
                                          </table>
                                        {/*data.proprietor && data.proprietor.length>0 && data.proprietor[0].name && <li><strong>Proprietor: </strong><p2 style={{cursor:'pointer', color:'#4285f4'}} onClick={()=> {this.handleProprietorClick(data)}} >{data.proprietor[0].name}</p2></li>*/}
                                         {data.application_number && <li style={{paddingTop:'10px'}} ><strong>Application: </strong>{data.application_number}</li>}
                                       </ul>
                                       <p style={{cursor:'pointer', color:'#4285f4'}} onClick={() => {this.handleSeeMore(data)}}>Get Realtime info</p>
                                     </div>
                                   </div>
                                   </div>)}

                               {this.state.filterState && !this.state.sort_hl && !this.state.sort_lh && this.state.filtereData && this.state.filtereData
                                .map(data => 
                                <div id="f1_container" className="col-sm-4">
                                   <div id="f1_card" className={this.state['isFlipped'+data.id+'flash']?"shadow flip":"shadow"}>
                                     <div className="front face">
                                       <div className="elements-flip">
                                       <div></div>
                                  {!data.associated_image && <h3 style={{maxHeight:'95px', textOverflow:'ellipses', overflow:'hidden'}}>{data.applied_for}</h3>}
                                  {data.associated_image && <img style={{height:'50%', width:'100% !important'}} src={data.associated_image} />}
                                  <hr size="2" style={{marginBottom:'0 !important'}} />
                                  <div className="overlay">
                                  <ButtonGroup>
                                  <Button style={{minWidth:'84%'}} className="btn btn-primary" onClick={() => {this.showDetail(data,'flash')}}>Show Details</Button>
                                  {this.state.add_report_id.indexOf(data.id) == -1 && <Button style={{minWidth:'84%'}} className="btn btn-default" onClick={() => {this.addReport(data)}}>Add to report</Button>}
                                  {this.state.add_report_id.indexOf(data.id) > -1 && <Button style={{minWidth:'84%'}} className="btn btn-danger" onClick={() => {this.removeReport(data)}}>Remove</Button>}
                                  <Button onClick={() => {this.handleSeeMore(data)}} style={{backgroundColor:'#F0E7E7 !important', color:'#345b9e !important', minWidth:'84%', border:'none', boxShadow:'none'}} >Get Realtime info</Button>
                                  </ButtonGroup>
                                  </div>
                                  {data.associated_image && data.applied_for && <p style={{textOverflow:'ellipsis', overflow:'hidden',whiteSpace: 'nowrap', maxWidth:'100%', textAlign:'center', paddingTop:'3px', maxHeight:'25px'}} >{data.applied_for}</p>}
                                  {data.similarity_index>0 && <p>{Math.round(data.similarity_index * 100) / 100}% Similar</p>}
                                  {data.similarity_index==0 && <p>0% Similar</p>}
                                  <div style={{display:'flex'}} >
                                  <p style={{width:'50%', textAlign:'right', paddingRight:'15px'}} ><img src='../../images/fire.png' />{data.opposition_count}</p>
                                  <div style={{borderLeft:'1px solid #DDD',height:'25px'}}></div>
                                  <p style={{width:'50%', textAlign:'left', paddingLeft:'15px'}} ><img src='../../images/clipboard.png' /> {data.opposition_notice_count}</p>
                                  </div>
                   
                               </div>
                                     </div>
                                     <div className="back face center">
                                      <div className="row">
                                        <div className="col-sm-12" style={{paddingLeft:'0'}}>
                                         <div className="col-sm-10" style={{paddingLeft:'5px', paddingRight:'0'}} >
                                           <p style={{fontSize:'12px', textAlign:'left', color:'black', fontStyle:'italic', fontWeight:'600 !important'}} >*Last updated on: {(new Date(data.modified).getDate())+'/' + (new Date(data.modified).getMonth()+1)+'/'+ new Date(data.modified).getFullYear()}</p>
                                         </div>
                                         <div className="col-sm-2">
                                           <i className="fa fa-1.2x fa-chevron-left pull-right" onClick={() => {this.hideDetail(data,'flash')}} aria-hidden="true"></i>
                                         </div>
                                        </div>
                                     </div>
     
                                       <ul>
                                         <li><strong>Status: </strong>{data.status}</li>
                                         <li style={{whiteSpace:'nowrap',overflowX:'hidden'}} ><strong>Class: </strong>{data.associated_class.sort((a,b) => a - b).toString()}</li>
                                         <table style={{marginBottom:'0 !important'}} className="table card-table">
                                         <tbody>
                                         <tr style={{textAlign:'left !important'}}>
                                            {data.proprietor && data.proprietor.length>0 && data.proprietor[0].name && <td style={{width:'42% !important'}} ><strong>Proprietor:</strong></td>}
                                            {data.proprietor && data.proprietor.length>0 && data.proprietor[0].name && <td style={{maxWidth:'50px !important',textOverflow:'ellipsis !important',overflowX:'hidden !important'}} ><ul style={{paddingTop: '0',maxHeight:'50px !important', overflowY:'scroll' }} >
                                             {data.proprietor.map(propr=> <li style={{cursor:'pointer', color:'#4285f4',background:'#FFF',whiteSpace:'nowrap',overflowX:'hidden'}} onClick={()=> {this.handleProprietorClick(propr)}} >{propr.name}</li>) 
                                            }</ul></td>}
                                          </tr>
                                          </tbody>
                                          </table>
                                        {/*data.proprietor && data.proprietor.length>0 && data.proprietor[0].name && <li><strong>Proprietor: </strong><p2 style={{cursor:'pointer', color:'#4285f4'}} onClick={()=> {this.handleProprietorClick(data)}} >{data.proprietor[0].name}</p2></li>*/}
                                         {data.application_number && <li style={{paddingTop:'10px'}} ><strong>Application: </strong>{data.application_number}</li>}
                                       </ul>
                                       <p style={{cursor:'pointer', color:'#4285f4'}} onClick={() => {this.handleSeeMore(data)}}>Get Realtime info</p>
                                     </div>
                                   </div>
                                   </div>)}


                                {!this.state.filterState && this.state.sort_hl && !this.state.sort_lh && this.props.result && this.props.result.search_result
                                .concat()
                                .sort((a,b) => b.opposition_notice_count - a.opposition_notice_count)
                                .sort((a,b) => b.opposition_count - a.opposition_count)
                                .map(data => 
                                <div id="f1_container" className="col-sm-4">
                                   <div id="f1_card" className={this.state['isFlipped'+data.id+'flash']?"shadow flip":"shadow"}>
                                     <div className="front face">
                                       <div className="elements-flip">
                                       <div></div>
                                  {!data.associated_image && <h3 style={{maxHeight:'95px', textOverflow:'ellipses', overflow:'hidden'}}>{data.applied_for}</h3>}
                                  {data.associated_image && <img style={{height:'50%', width:'100% !important'}} src={data.associated_image} />}
                                  <hr size="2" style={{marginBottom:'0 !important'}} />
                                  <div className="overlay">
                                  <ButtonGroup>
                                  <Button style={{minWidth:'84%'}} className="btn btn-primary" onClick={() => {this.showDetail(data,'flash')}}>Show Details</Button>
                                  {this.state.add_report_id.indexOf(data.id) == -1 && <Button style={{minWidth:'84%'}} className="btn btn-default" onClick={() => {this.addReport(data)}}>Add to report</Button>}
                                  {this.state.add_report_id.indexOf(data.id) > -1 && <Button style={{minWidth:'84%'}} className="btn btn-danger" onClick={() => {this.removeReport(data)}}>Remove</Button>}
                                  <Button onClick={() => {this.handleSeeMore(data)}} style={{backgroundColor:'#F0E7E7 !important', color:'#345b9e !important', minWidth:'84%', border:'none', boxShadow:'none'}} >Get Realtime info</Button>
                                  </ButtonGroup>
                                  </div>
                                  {data.associated_image && data.applied_for && <p style={{textOverflow:'ellipsis', overflow:'hidden',whiteSpace: 'nowrap', maxWidth:'100%', textAlign:'center', paddingTop:'3px', maxHeight:'25px'}} >{data.applied_for}</p>}
                                  {data.similarity_index>0 && <p>{Math.round(data.similarity_index * 100) / 100}% Similar</p>}
                                  {data.similarity_index==0 && <p>0% Similar</p>}
                                  <div style={{display:'flex'}} >
                                  <p style={{width:'50%', textAlign:'right', paddingRight:'15px'}} ><img src='../../images/fire.png' />{data.opposition_count}</p>
                                  <div style={{borderLeft:'1px solid #DDD',height:'25px'}}></div>
                                  <p style={{width:'50%', textAlign:'left', paddingLeft:'15px'}} ><img src='../../images/clipboard.png' /> {data.opposition_notice_count}</p>
                                  </div>
                   
                               </div>
                                     </div>
                                     <div className="back face center">
                                      <div className="row">
                                        <div className="col-sm-12" style={{paddingLeft:'0'}}>
                                         <div className="col-sm-10" style={{paddingLeft:'5px', paddingRight:'0'}} >
                                           <p style={{fontSize:'12px', textAlign:'left', color:'black', fontStyle:'italic', fontWeight:'600 !important'}} >*Last updated on: {(new Date(data.modified).getDate())+'/' + (new Date(data.modified).getMonth()+1)+'/'+ new Date(data.modified).getFullYear()}</p>
                                         </div>
                                         <div className="col-sm-2">
                                           <i className="fa fa-1.2x fa-chevron-left pull-right" onClick={() => {this.hideDetail(data,'flash')}} aria-hidden="true"></i>
                                         </div>
                                        </div>
                                     </div>
     
                                       <ul>
                                         <li><strong>Status: </strong>{data.status}</li>
                                         <li style={{whiteSpace:'nowrap',overflowX:'hidden'}} ><strong>Class: </strong>{data.associated_class.sort((a,b) => a - b).toString()}</li>
                                         <table style={{marginBottom:'0 !important'}} className="table card-table">
                                         <tbody>
                                         <tr style={{textAlign:'left !important'}}>
                                            {data.proprietor && data.proprietor.length>0 && data.proprietor[0].name && <td style={{width:'42% !important'}} ><strong>Proprietor:</strong></td>}
                                            {data.proprietor && data.proprietor.length>0 && data.proprietor[0].name && <td style={{maxWidth:'50px !important',textOverflow:'ellipsis !important',overflowX:'hidden !important'}} ><ul style={{paddingTop: '0',maxHeight:'50px !important', overflowY:'scroll' }} >
                                             {data.proprietor.map(propr=> <li style={{cursor:'pointer', color:'#4285f4',background:'#FFF',whiteSpace:'nowrap',overflowX:'hidden'}} onClick={()=> {this.handleProprietorClick(propr)}} >{propr.name}</li>) 
                                            }</ul></td>}
                                          </tr>
                                          </tbody>
                                          </table>
                                        {/*data.proprietor && data.proprietor.length>0 && data.proprietor[0].name && <li><strong>Proprietor: </strong><p2 style={{cursor:'pointer', color:'#4285f4'}} onClick={()=> {this.handleProprietorClick(data)}} >{data.proprietor[0].name}</p2></li>*/}
                                         {data.application_number && <li style={{paddingTop:'10px'}} ><strong>Application: </strong>{data.application_number}</li>}
                                       </ul>
                                       <p style={{cursor:'pointer', color:'#4285f4'}} onClick={() => {this.handleSeeMore(data)}}>Get Realtime info</p>
                                     </div>
                                   </div>
                                   </div>)}

                                {this.state.filterState && this.state.sort_hl && !this.state.sort_lh && this.state.filtereData && this.state.filtereData
                                .concat()
                                .sort((a,b) => b.opposition_notice_count - a.opposition_notice_count)
                                .sort((a,b) => b.opposition_count - a.opposition_count)
                                .map(data => 
                                <div id="f1_container" className="col-sm-4">
                                   <div id="f1_card" className={this.state['isFlipped'+data.id+'flash']?"shadow flip":"shadow"}>
                                     <div className="front face">
                                       <div className="elements-flip">
                                       <div></div>
                                  {!data.associated_image && <h3 style={{maxHeight:'95px', textOverflow:'ellipses', overflow:'hidden'}}>{data.applied_for}</h3>}
                                  {data.associated_image && <img style={{height:'50%', width:'100% !important'}} src={data.associated_image} />}
                                  <hr size="2" style={{marginBottom:'0 !important'}} />
                                  <div className="overlay">
                                  <ButtonGroup>
                                  <Button style={{minWidth:'84%'}} className="btn btn-primary" onClick={() => {this.showDetail(data,'flash')}}>Show Details</Button>
                                  {this.state.add_report_id.indexOf(data.id) == -1 && <Button style={{minWidth:'84%'}} className="btn btn-default" onClick={() => {this.addReport(data)}}>Add to report</Button>}
                                  {this.state.add_report_id.indexOf(data.id) > -1 && <Button style={{minWidth:'84%'}} className="btn btn-danger" onClick={() => {this.removeReport(data)}}>Remove</Button>}
                                  <Button onClick={() => {this.handleSeeMore(data)}} style={{backgroundColor:'#F0E7E7 !important', color:'#345b9e !important', minWidth:'84%', border:'none', boxShadow:'none'}} >Get Realtime info</Button>
                                  </ButtonGroup>
                                  </div>
                                  {data.associated_image && data.applied_for && <p style={{textOverflow:'ellipsis', overflow:'hidden',whiteSpace: 'nowrap', maxWidth:'100%', textAlign:'center', paddingTop:'3px', maxHeight:'25px'}} >{data.applied_for}</p>}
                                  {data.similarity_index>0 && <p>{Math.round(data.similarity_index * 100) / 100}% Similar</p>}
                                  {data.similarity_index==0 && <p>0% Similar</p>}
                                  <div style={{display:'flex'}} >
                                  <p style={{width:'50%', textAlign:'right', paddingRight:'15px'}} ><img src='../../images/fire.png' />{data.opposition_count}</p>
                                  <div style={{borderLeft:'1px solid #DDD',height:'25px'}}></div>
                                  <p style={{width:'50%', textAlign:'left', paddingLeft:'15px'}} ><img src='../../images/clipboard.png' /> {data.opposition_notice_count}</p>
                                  </div>
                   
                               </div>
                                     </div>
                                     <div className="back face center">
                                      <div className="row">
                                        <div className="col-sm-12" style={{paddingLeft:'0'}}>
                                         <div className="col-sm-10" style={{paddingLeft:'5px', paddingRight:'0'}} >
                                           <p style={{fontSize:'12px', textAlign:'left', color:'black', fontStyle:'italic', fontWeight:'600 !important'}} >*Last updated on: {(new Date(data.modified).getDate())+'/' + (new Date(data.modified).getMonth()+1)+'/'+ new Date(data.modified).getFullYear()}</p>
                                         </div>
                                         <div className="col-sm-2">
                                           <i className="fa fa-1.2x fa-chevron-left pull-right" onClick={() => {this.hideDetail(data,'flash')}} aria-hidden="true"></i>
                                         </div>
                                        </div>
                                     </div>
     
                                       <ul>
                                         <li><strong>Status: </strong>{data.status}</li>
                                         <li style={{whiteSpace:'nowrap',overflowX:'hidden'}} ><strong>Class: </strong>{data.associated_class.sort((a,b) => a - b).toString()}</li>
                                         <table style={{marginBottom:'0 !important'}} className="table card-table">
                                         <tbody>
                                         <tr style={{textAlign:'left !important'}}>
                                            {data.proprietor && data.proprietor.length>0 && data.proprietor[0].name && <td style={{width:'42% !important'}} ><strong>Proprietor:</strong></td>}
                                            {data.proprietor && data.proprietor.length>0 && data.proprietor[0].name && <td style={{maxWidth:'50px !important',textOverflow:'ellipsis !important',overflowX:'hidden !important'}} ><ul style={{paddingTop: '0',maxHeight:'50px !important', overflowY:'scroll' }} >
                                             {data.proprietor.map(propr=> <li style={{cursor:'pointer', color:'#4285f4',background:'#FFF',whiteSpace:'nowrap',overflowX:'hidden'}} onClick={()=> {this.handleProprietorClick(propr)}} >{propr.name}</li>) 
                                            }</ul></td>}
                                          </tr>
                                          </tbody>
                                          </table>
                                        {/*data.proprietor && data.proprietor.length>0 && data.proprietor[0].name && <li><strong>Proprietor: </strong><p2 style={{cursor:'pointer', color:'#4285f4'}} onClick={()=> {this.handleProprietorClick(data)}} >{data.proprietor[0].name}</p2></li>*/}
                                         {data.application_number && <li style={{paddingTop:'10px'}} ><strong>Application: </strong>{data.application_number}</li>}
                                       </ul>
                                       <p style={{cursor:'pointer', color:'#4285f4'}} onClick={() => {this.handleSeeMore(data)}}>Get Realtime info</p>
                                     </div>
                                   </div>
                                   </div>)}

                                {!this.state.filterState && !this.state.sort_hl && this.state.sort_lh && this.state.filtereData && this.props.result.search_result
                                .concat()
                                .sort((a,b) => a.opposition_notice_count - b.opposition_notice_count)
                                .sort((a,b) => a.opposition_count - b.opposition_count)
                                .map(data => 
                                <div id="f1_container" className="col-sm-4">
                                   <div id="f1_card" className={this.state['isFlipped'+data.id+'flash']?"shadow flip":"shadow"}>
                                     <div className="front face">
                                       <div className="elements-flip">
                                       <div></div>
                                  {!data.associated_image && <h3 style={{maxHeight:'95px', textOverflow:'ellipses', overflow:'hidden'}}>{data.applied_for}</h3>}
                                  {data.associated_image && <img style={{height:'50%', width:'100% !important'}} src={data.associated_image} />}
                                  <hr size="2" style={{marginBottom:'0 !important'}} />
                                  <div className="overlay">
                                  <ButtonGroup>
                                  <Button style={{minWidth:'84%'}} className="btn btn-primary" onClick={() => {this.showDetail(data,'flash')}}>Show Details</Button>
                                  {this.state.add_report_id.indexOf(data.id) == -1 && <Button style={{minWidth:'84%'}} className="btn btn-default" onClick={() => {this.addReport(data)}}>Add to report</Button>}
                                  {this.state.add_report_id.indexOf(data.id) > -1 && <Button style={{minWidth:'84%'}} className="btn btn-danger" onClick={() => {this.removeReport(data)}}>Remove</Button>}
                                  <Button onClick={() => {this.handleSeeMore(data)}} style={{backgroundColor:'#F0E7E7 !important', color:'#345b9e !important', minWidth:'84%', border:'none', boxShadow:'none'}} >Get Realtime info</Button>
                                  </ButtonGroup>
                                  </div>
                                  {data.associated_image && data.applied_for && <p style={{textOverflow:'ellipsis', overflow:'hidden',whiteSpace: 'nowrap', maxWidth:'100%', textAlign:'center', paddingTop:'3px', maxHeight:'25px'}} >{data.applied_for}</p>}
                                  {data.similarity_index>0 && <p>{Math.round(data.similarity_index * 100) / 100}% Similar</p>}
                                  {data.similarity_index==0 && <p>0% Similar</p>}
                                  <div style={{display:'flex'}} >
                                  <p style={{width:'50%', textAlign:'right', paddingRight:'15px'}} ><img src='../../images/fire.png' />{data.opposition_count}</p>
                                  <div style={{borderLeft:'1px solid #DDD',height:'25px'}}></div>
                                  <p style={{width:'50%', textAlign:'left', paddingLeft:'15px'}} ><img src='../../images/clipboard.png' /> {data.opposition_notice_count}</p>
                                  </div>
                   
                               </div>
                                     </div>
                                     <div className="back face center">
                                      <div className="row">
                                        <div className="col-sm-12" style={{paddingLeft:'0'}}>
                                         <div className="col-sm-10" style={{paddingLeft:'5px', paddingRight:'0'}} >
                                           <p style={{fontSize:'12px', textAlign:'left', color:'black', fontStyle:'italic', fontWeight:'600 !important'}} >*Last updated on: {(new Date(data.modified).getDate())+'/' + (new Date(data.modified).getMonth()+1)+'/'+ new Date(data.modified).getFullYear()}</p>
                                         </div>
                                         <div className="col-sm-2">
                                           <i className="fa fa-1.2x fa-chevron-left pull-right" onClick={() => {this.hideDetail(data,'flash')}} aria-hidden="true"></i>
                                         </div>
                                        </div>
                                     </div>
     
                                       <ul>
                                         <li><strong>Status: </strong>{data.status}</li>
                                         <li style={{whiteSpace:'nowrap',overflowX:'hidden'}} ><strong>Class: </strong>{data.associated_class.sort((a,b) => a - b).toString()}</li>
                                         <table style={{marginBottom:'0 !important'}} className="table card-table">
                                         <tbody>
                                         <tr style={{textAlign:'left !important'}}>
                                            {data.proprietor && data.proprietor.length>0 && data.proprietor[0].name && <td style={{width:'42% !important'}} ><strong>Proprietor:</strong></td>}
                                            {data.proprietor && data.proprietor.length>0 && data.proprietor[0].name && <td style={{maxWidth:'50px !important',textOverflow:'ellipsis !important',overflowX:'hidden !important'}} ><ul style={{paddingTop: '0',maxHeight:'50px !important', overflowY:'scroll' }} >
                                             {data.proprietor.map(propr=> <li style={{cursor:'pointer', color:'#4285f4',background:'#FFF',whiteSpace:'nowrap',overflowX:'hidden'}} onClick={()=> {this.handleProprietorClick(propr)}} >{propr.name}</li>) 
                                            }</ul></td>}
                                          </tr>
                                          </tbody>
                                          </table>
                                        {/*data.proprietor && data.proprietor.length>0 && data.proprietor[0].name && <li><strong>Proprietor: </strong><p2 style={{cursor:'pointer', color:'#4285f4'}} onClick={()=> {this.handleProprietorClick(data)}} >{data.proprietor[0].name}</p2></li>*/}
                                         {data.application_number && <li style={{paddingTop:'10px'}} ><strong>Application: </strong>{data.application_number}</li>}
                                       </ul>
                                       <p style={{cursor:'pointer', color:'#4285f4'}} onClick={() => {this.handleSeeMore(data)}}>Get Realtime info</p>
                                     </div>
                                   </div>
                                   </div>)}

                                {this.state.filterState && !this.state.sort_hl && this.state.sort_lh && this.state.filtereData && this.state.filtereData
                                .concat()
                                .sort((a,b) => a.opposition_notice_count - b.opposition_notice_count)
                                .sort((a,b) => a.opposition_count - b.opposition_count)
                                .map(data => 
                                <div id="f1_container" className="col-sm-4">
                                   <div id="f1_card" className={this.state['isFlipped'+data.id+'flash']?"shadow flip":"shadow"}>
                                     <div className="front face">
                                       <div className="elements-flip">
                                       <div></div>
                                  {!data.associated_image && <h3 style={{maxHeight:'95px', textOverflow:'ellipses', overflow:'hidden'}}>{data.applied_for}</h3>}
                                  {data.associated_image && <img style={{height:'50%', width:'100% !important'}} src={data.associated_image} />}
                                  <hr size="2" style={{marginBottom:'0 !important'}} />
                                  <div className="overlay">
                                  <ButtonGroup>
                                  <Button style={{minWidth:'84%'}} className="btn btn-primary" onClick={() => {this.showDetail(data,'flash')}}>Show Details</Button>
                                  {this.state.add_report_id.indexOf(data.id) == -1 && <Button style={{minWidth:'84%'}} className="btn btn-default" onClick={() => {this.addReport(data)}}>Add to report</Button>}
                                  {this.state.add_report_id.indexOf(data.id) > -1 && <Button style={{minWidth:'84%'}} className="btn btn-danger" onClick={() => {this.removeReport(data)}}>Remove</Button>}
                                  <Button onClick={() => {this.handleSeeMore(data)}} style={{backgroundColor:'#F0E7E7 !important', color:'#345b9e !important', minWidth:'84%', border:'none', boxShadow:'none'}} >Get Realtime info</Button>
                                  </ButtonGroup>
                                  </div>
                                  {data.associated_image && data.applied_for && <p style={{textOverflow:'ellipsis', overflow:'hidden',whiteSpace: 'nowrap', maxWidth:'100%', textAlign:'center', paddingTop:'3px', maxHeight:'25px'}} >{data.applied_for}</p>}
                                  {data.similarity_index>0 && <p>{Math.round(data.similarity_index * 100) / 100}% Similar</p>}
                                  {data.similarity_index==0 && <p>0% Similar</p>}
                                  <div style={{display:'flex'}} >
                                  <p style={{width:'50%', textAlign:'right', paddingRight:'15px'}} ><img src='../../images/fire.png' />{data.opposition_count}</p>
                                  <div style={{borderLeft:'1px solid #DDD',height:'25px'}}></div>
                                  <p style={{width:'50%', textAlign:'left', paddingLeft:'15px'}} ><img src='../../images/clipboard.png' /> {data.opposition_notice_count}</p>
                                  </div>
                   
                               </div>
                                     </div>
                                     <div className="back face center">
                                      <div className="row">
                                        <div className="col-sm-12" style={{paddingLeft:'0'}}>
                                         <div className="col-sm-10" style={{paddingLeft:'5px', paddingRight:'0'}} >
                                           <p style={{fontSize:'12px', textAlign:'left', color:'black', fontStyle:'italic', fontWeight:'600 !important'}} >*Last updated on: {(new Date(data.modified).getDate())+'/' + (new Date(data.modified).getMonth()+1)+'/'+ new Date(data.modified).getFullYear()}</p>
                                         </div>
                                         <div className="col-sm-2">
                                           <i className="fa fa-1.2x fa-chevron-left pull-right" onClick={() => {this.hideDetail(data),'wildcard'}} aria-hidden="true"></i>
                                         </div>
                                        </div>
                                     </div>
     
                                       <ul>
                                         <li><strong>Status: </strong>{data.status}</li>
                                         <li style={{whiteSpace:'nowrap',overflowX:'hidden'}} ><strong>Class: </strong>{data.associated_class.sort((a,b) => a - b).toString()}</li>
                                         <table style={{marginBottom:'0 !important'}} className="table card-table">
                                         <tbody>
                                         <tr style={{textAlign:'left !important'}}>
                                            {data.proprietor && data.proprietor.length>0 && data.proprietor[0].name && <td style={{width:'42% !important'}} ><strong>Proprietor:</strong></td>}
                                            {data.proprietor && data.proprietor.length>0 && data.proprietor[0].name && <td style={{maxWidth:'50px !important',textOverflow:'ellipsis !important',overflowX:'hidden !important'}} ><ul style={{paddingTop: '0',maxHeight:'50px !important', overflowY:'scroll' }} >
                                             {data.proprietor.map(propr=> <li style={{cursor:'pointer', color:'#4285f4',background:'#FFF',whiteSpace:'nowrap',overflowX:'hidden'}} onClick={()=> {this.handleProprietorClick(propr)}} >{propr.name}</li>) 
                                            }</ul></td>}
                                          </tr>
                                          </tbody>
                                          </table>
                                        {/*data.proprietor && data.proprietor.length>0 && data.proprietor[0].name && <li><strong>Proprietor: </strong><p2 style={{cursor:'pointer', color:'#4285f4'}} onClick={()=> {this.handleProprietorClick(data)}} >{data.proprietor[0].name}</p2></li>*/}
                                         {data.application_number && <li style={{paddingTop:'10px'}} ><strong>Application: </strong>{data.application_number}</li>}
                                       </ul>
                                       <p style={{cursor:'pointer', color:'#4285f4'}} onClick={() => {this.handleSeeMore(data)}}>Get Realtime info</p>
                                     </div>
                                   </div>
                                   </div>)}

                                {this.props.result && this.props.result.search_result.length==0 && <div style={{textAlign:'center'}} className="col-sm-12">
                              <img src="../../images/empty_state.png" />
                            </div>}
                          </div> 
                      <div className="row" style={{background:'#FFF', paddingBottom:'30px', paddingTop:'30px'}}>
                           <div className="col-sm-12" style={{textAlign:'center'}}>
                             {this.props.result && !this.props.page_end_wild && this.props.result.search_result.length>50 &&  <div className="col-sm-3 col-sm-offset-4">
                              {!this.state.loadBtn && <button onClick={this.handleLoadMoreFlash.bind(this)} style={{fontSize:'20px'}} className="btn btn-default">Load more</button>}
                              {this.state.loadBtn && <button style={{fontSize:'20px'}} className="btn btn-default">Loading...</button>}
                            </div>}
              
                            {this.props.result && this.props.page_end_wild && <div className="col-sm-5 col-sm-offset-3">
                              <h3>No more results to show.</h3>
                            </div>}
                           </div>
                        </div>
                           </div>                          
                        </div>
                    </TabPanel>

                  {/*------WILDCARD RESULT SECTION-------*/}
                    <TabPanel>
                      <div className="row">
                           <div className="col-sm-12" style={{background:'#FFF', marginLeft: '2.4%'}} >
                              <div className="elements-area">
                              {!this.props.wildcard_results && <div className="col-sm-12" style={{textAlign:'center'}} ><img style={{textAlign:'center'}} src="../../images/loader_list.gif" /></div>}
                              {!this.state.filterState && !this.state.sort_hl && !this.state.sort_lh && this.props.wildcard_results && this.props.wildcard_results.search_result
                                .map(data =>  
                                <div id="f1_container" className="col-sm-4">
                                   <div id="f1_card" className={this.state['isFlipped'+data.id+'wildcard']?"shadow flip":"shadow"}>
                                     <div className="front face">
                                       <div className="elements-flip">
                                       <div></div>
                                  {!data.associated_image && data.applied_for && <h3 style={{maxHeight:'95px', textOverflow:'ellipsis', overflow:'hidden'}}>{data.applied_for}</h3>}
                                  {data.associated_image && <img style={{height:'50%', width:'100% !important'}} src={this.siteImg(data.associated_image)} />}
                                  <hr size="2" style={{marginBottom:'0 !important'}} />
                                  <div className="overlay">
                                  <ButtonGroup>
                                  <Button style={{minWidth:'84%'}} className="btn btn-primary" onClick={() => {this.showDetail(data,'wildcard')}}>Show Details</Button>
                                  {this.state.add_report_id.indexOf(data.id) == -1 && <Button style={{minWidth:'84%'}} className="btn btn-default" onClick={() => {this.addReport(data)}}>Add to report</Button>}
                                  {this.state.add_report_id.indexOf(data.id) > -1 && <Button style={{minWidth:'84%'}} className="btn btn-danger" onClick={() => {this.removeReport(data)}}>Remove</Button>}
                                  <Button onClick={() => {this.handleSeeMore(data)}} style={{backgroundColor:'#F0E7E7 !important', color:'#345b9e !important', minWidth:'84%', border:'none', boxShadow:'none'}} >Get Realtime info</Button>
                                  </ButtonGroup>
                                  </div>
                                  {data.associated_image && data.applied_for && <p style={{textOverflow:'ellipsis', overflow:'hidden',whiteSpace: 'nowrap', maxWidth:'100%', textAlign:'center', paddingTop:'3px', maxHeight:'25px'}} >{data.applied_for}</p>}
                                  {data.similarity_index>0 && <p>{Math.round(data.similarity_index * 100) / 100}% Similar</p>}
                                  {data.similarity_index==0 && <p>0% Similar</p>}
                                  <div style={{display:'flex'}} >
                                  <p style={{width:'50%', textAlign:'right', paddingRight:'15px'}} ><img src='../../images/fire.png' />{data.opposition_count}</p>
                                  <div style={{borderLeft:'1px solid #DDD',height:'25px'}}></div>
                                  <p style={{width:'50%', textAlign:'left', paddingLeft:'15px'}} ><img src='../../images/clipboard.png' /> {data.opposition_notice_count}</p>
                                  </div>
                                                    
                   
                               </div>
                                     </div>
                                     <div className="back face center">
                                      <div className="row">
                                        <div className="col-sm-12" style={{paddingLeft:'0'}}>
                                         <div className="col-sm-10" style={{paddingLeft:'5px', paddingRight:'0'}} >
                                           <p style={{fontSize:'12px', textAlign:'left', color:'black', fontStyle:'italic', fontWeight:'600 !important'}} >*Last updated on: {(new Date(data.modified).getDate())+'/' + (new Date(data.modified).getMonth()+1)+'/'+ new Date(data.modified).getFullYear()}</p>
                                         </div>
                                         <div className="col-sm-2">
                                           <i className="fa fa-1.2x fa-chevron-left pull-right" onClick={() => {this.hideDetail(data,'wildcard')}} aria-hidden="true"></i>
                                         </div>
                                        </div>
                                     </div>
     
                                       <ul>
                                         <li><strong>Status: </strong>{data.status}</li>
                                         <li style={{whiteSpace:'nowrap',overflowX:'hidden'}} ><strong>Class: </strong>{data.associated_class.sort((a,b) => a - b).toString()}</li>
                                         <table style={{marginBottom:'0 !important'}} className="table card-table">
                                         <tbody>
                                         <tr style={{textAlign:'left !important'}}>
                                            {data.proprietor && data.proprietor.length>0 && data.proprietor[0].name && <td style={{width:'42% !important'}} ><strong>Proprietor:</strong></td>}
                                            {data.proprietor && data.proprietor.length>0 && data.proprietor[0].name && <td style={{maxWidth:'50px !important',textOverflow:'ellipsis !important',overflowX:'hidden !important'}} ><ul style={{paddingTop: '0',maxHeight:'50px !important', overflowY:'scroll' }} >
                                             {data.proprietor.map(propr=> <li style={{cursor:'pointer', color:'#4285f4',background:'#FFF',whiteSpace:'nowrap',overflowX:'hidden'}} onClick={()=> {this.handleProprietorClick(propr)}} >{propr.name}</li>) 
                                            }</ul></td>}
                                          </tr>
                                          </tbody>
                                          </table>
                                        {/*data.proprietor && data.proprietor.length>0 && data.proprietor[0].name && <li><strong>Proprietor: </strong><p2 style={{cursor:'pointer', color:'#4285f4'}} onClick={()=> {this.handleProprietorClick(data)}} >{data.proprietor[0].name}</p2></li>*/}
                                         {data.application_number && <li style={{paddingTop:'10px'}} ><strong>Application: </strong>{data.application_number}</li>}
                                       </ul>
                                       <p style={{cursor:'pointer', color:'#4285f4'}} onClick={() => {this.handleSeeMore(data)}}>Get Realtime info</p>
                                     </div>
                                   </div>
                                   </div>)}

                               {this.state.filterState && !this.state.sort_hl && !this.state.sort_lh && this.state.filteredDataWildcard && this.state.filteredDataWildcard
                                .map(data => 
                                <div id="f1_container" className="col-sm-4">
                                   <div id="f1_card" className={this.state['isFlipped'+data.id+'wildcard']?"shadow flip":"shadow"}>
                                     <div className="front face">
                                       <div className="elements-flip">
                                       <div></div>
                                  {!data.associated_image && <h3 style={{maxHeight:'95px', textOverflow:'ellipses', overflow:'hidden'}}>{data.applied_for}</h3>}
                                  {data.associated_image && <img style={{height:'50%', width:'100% !important'}} src={data.associated_image} />}
                                  <hr size="2" style={{marginBottom:'0 !important'}} />
                                  <div className="overlay">
                                  <ButtonGroup>
                                  <Button style={{minWidth:'84%'}} className="btn btn-primary" onClick={() => {this.showDetail(data,'wildcard')}}>Show Details</Button>
                                  {this.state.add_report_id.indexOf(data.id) == -1 && <Button style={{minWidth:'84%'}} className="btn btn-default" onClick={() => {this.addReport(data)}}>Add to report</Button>}
                                  {this.state.add_report_id.indexOf(data.id) > -1 && <Button style={{minWidth:'84%'}} className="btn btn-danger" onClick={() => {this.removeReport(data)}}>Remove</Button>}
                                  <Button onClick={() => {this.handleSeeMore(data)}} style={{backgroundColor:'#F0E7E7 !important', color:'#345b9e !important', minWidth:'84%', border:'none', boxShadow:'none'}} >Get Realtime info</Button>
                                  </ButtonGroup>
                                  </div>
                                  {data.associated_image && data.applied_for && <p style={{textOverflow:'ellipsis', overflow:'hidden',whiteSpace: 'nowrap', maxWidth:'100%', textAlign:'center', paddingTop:'3px', maxHeight:'25px'}} >{data.applied_for}</p>}
                                  {data.similarity_index>0 && <p>{Math.round(data.similarity_index * 100) / 100}% Similar</p>}
                                  {data.similarity_index==0 && <p>0% Similar</p>}
                                  <div style={{display:'flex'}} >
                                  <p style={{width:'50%', textAlign:'right', paddingRight:'15px'}} ><img src='../../images/fire.png' />{data.opposition_count}</p>
                                  <div style={{borderLeft:'1px solid #DDD',height:'25px'}}></div>
                                  <p style={{width:'50%', textAlign:'left', paddingLeft:'15px'}} ><img src='../../images/clipboard.png' /> {data.opposition_notice_count}</p>
                                  </div>
                   
                               </div>
                                     </div>
                                     <div className="back face center">
                                      <div className="row">
                                        <div className="col-sm-12" style={{paddingLeft:'0'}}>
                                         <div className="col-sm-10" style={{paddingLeft:'5px', paddingRight:'0'}} >
                                           <p style={{fontSize:'12px', textAlign:'left', color:'black', fontStyle:'italic', fontWeight:'600 !important'}} >*Last updated on: {(new Date(data.modified).getDate())+'/' + (new Date(data.modified).getMonth()+1)+'/'+ new Date(data.modified).getFullYear()}</p>
                                         </div>
                                         <div className="col-sm-2">
                                           <i className="fa fa-1.2x fa-chevron-left pull-right" onClick={() => {this.hideDetail(data,'wildcard')}} aria-hidden="true"></i>
                                         </div>
                                        </div>
                                     </div>
     
                                       <ul>
                                         <li><strong>Status: </strong>{data.status}</li>
                                         <li style={{whiteSpace:'nowrap',overflowX:'hidden'}} ><strong>Class: </strong>{data.associated_class.sort((a,b) => a - b).toString()}</li>
                                         <table style={{marginBottom:'0 !important'}} className="table card-table">
                                         <tbody>
                                         <tr style={{textAlign:'left !important'}}>
                                            {data.proprietor && data.proprietor.length>0 && data.proprietor[0].name && <td style={{width:'42% !important'}} ><strong>Proprietor:</strong></td>}
                                            {data.proprietor && data.proprietor.length>0 && data.proprietor[0].name && <td style={{maxWidth:'50px !important',textOverflow:'ellipsis !important',overflowX:'hidden !important'}} ><ul style={{paddingTop: '0',maxHeight:'50px !important', overflowY:'scroll' }} >
                                             {data.proprietor.map(propr=> <li style={{cursor:'pointer', color:'#4285f4',background:'#FFF',whiteSpace:'nowrap',overflowX:'hidden'}} onClick={()=> {this.handleProprietorClick(propr)}} >{propr.name}</li>) 
                                            }</ul></td>}
                                          </tr>
                                          </tbody>
                                          </table>
                                        {/*data.proprietor && data.proprietor.length>0 && data.proprietor[0].name && <li><strong>Proprietor: </strong><p2 style={{cursor:'pointer', color:'#4285f4'}} onClick={()=> {this.handleProprietorClick(data)}} >{data.proprietor[0].name}</p2></li>*/}
                                         {data.application_number && <li style={{paddingTop:'10px'}} ><strong>Application: </strong>{data.application_number}</li>}
                                       </ul>
                                       <p style={{cursor:'pointer', color:'#4285f4'}} onClick={() => {this.handleSeeMore(data)}}>Get Realtime info</p>
                                     </div>
                                   </div>
                                   </div>)}


                                {!this.state.filterState && this.state.sort_hl && !this.state.sort_lh && this.props.wildcard_results && this.props.wildcard_results.search_result
                                .concat()
                                .sort((a,b) => b.opposition_notice_count - a.opposition_notice_count)
                                .sort((a,b) => b.opposition_count - a.opposition_count)
                                .map(data => 
                                <div id="f1_container" className="col-sm-4">
                                   <div id="f1_card" className={this.state['isFlipped'+data.id+'wildcard']?"shadow flip":"shadow"}>
                                     <div className="front face">
                                       <div className="elements-flip">
                                       <div></div>
                                  {!data.associated_image && <h3 style={{maxHeight:'95px', textOverflow:'ellipses', overflow:'hidden'}}>{data.applied_for}</h3>}
                                  {data.associated_image && <img style={{height:'50%', width:'100% !important'}} src={data.associated_image} />}
                                  <hr size="2" style={{marginBottom:'0 !important'}} />
                                  <div className="overlay">
                                  <ButtonGroup>
                                  <Button style={{minWidth:'84%'}} className="btn btn-primary" onClick={() => {this.showDetail(data,'wildcard')}}>Show Details</Button>
                                  {this.state.add_report_id.indexOf(data.id) == -1 && <Button style={{minWidth:'84%'}} className="btn btn-default" onClick={() => {this.addReport(data)}}>Add to report</Button>}
                                  {this.state.add_report_id.indexOf(data.id) > -1 && <Button style={{minWidth:'84%'}} className="btn btn-danger" onClick={() => {this.removeReport(data)}}>Remove</Button>}
                                  <Button onClick={() => {this.handleSeeMore(data)}} style={{backgroundColor:'#F0E7E7 !important', color:'#345b9e !important', minWidth:'84%', border:'none', boxShadow:'none'}} >Get Realtime info</Button>
                                  </ButtonGroup>
                                  </div>
                                  {data.associated_image && data.applied_for && <p style={{textOverflow:'ellipsis', overflow:'hidden',whiteSpace: 'nowrap', maxWidth:'100%', textAlign:'center', paddingTop:'3px', maxHeight:'25px'}} >{data.applied_for}</p>}
                                  {data.similarity_index>0 && <p>{Math.round(data.similarity_index * 100) / 100}% Similar</p>}
                                  {data.similarity_index==0 && <p>0% Similar</p>}
                                  <div style={{display:'flex'}} >
                                  <p style={{width:'50%', textAlign:'right', paddingRight:'15px'}} ><img src='../../images/fire.png' />{data.opposition_count}</p>
                                  <div style={{borderLeft:'1px solid #DDD',height:'25px'}}></div>
                                  <p style={{width:'50%', textAlign:'left', paddingLeft:'15px'}} ><img src='../../images/clipboard.png' /> {data.opposition_notice_count}</p>
                                  </div>
                   
                               </div>
                                     </div>
                                     <div className="back face center">
                                      <div className="row">
                                        <div className="col-sm-12" style={{paddingLeft:'0'}}>
                                         <div className="col-sm-10" style={{paddingLeft:'5px', paddingRight:'0'}} >
                                           <p style={{fontSize:'12px', textAlign:'left', color:'black', fontStyle:'italic', fontWeight:'600 !important'}} >*Last updated on: {(new Date(data.modified).getDate())+'/' + (new Date(data.modified).getMonth()+1)+'/'+ new Date(data.modified).getFullYear()}</p>
                                         </div>
                                         <div className="col-sm-2">
                                           <i className="fa fa-1.2x fa-chevron-left pull-right" onClick={() => {this.hideDetail(data,'wildcard')}} aria-hidden="true"></i>
                                         </div>
                                        </div>
                                     </div>
     
                                       <ul>
                                         <li><strong>Status: </strong>{data.status}</li>
                                         <li style={{whiteSpace:'nowrap',overflowX:'hidden'}} ><strong>Class: </strong>{data.associated_class.sort((a,b) => a - b).toString()}</li>
                                         <table style={{marginBottom:'0 !important'}} className="table card-table">
                                         <tbody>
                                         <tr style={{textAlign:'left !important'}}>
                                            {data.proprietor && data.proprietor.length>0 && data.proprietor[0].name && <td style={{width:'42% !important'}} ><strong>Proprietor:</strong></td>}
                                            {data.proprietor && data.proprietor.length>0 && data.proprietor[0].name && <td style={{maxWidth:'50px !important',textOverflow:'ellipsis !important',overflowX:'hidden !important'}} ><ul style={{paddingTop: '0',maxHeight:'50px !important', overflowY:'scroll' }} >
                                             {data.proprietor.map(propr=> <li style={{cursor:'pointer', color:'#4285f4',background:'#FFF',whiteSpace:'nowrap',overflowX:'hidden'}} onClick={()=> {this.handleProprietorClick(propr)}} >{propr.name}</li>) 
                                            }</ul></td>}
                                          </tr>
                                          </tbody>
                                          </table>
                                        {/*data.proprietor && data.proprietor.length>0 && data.proprietor[0].name && <li><strong>Proprietor: </strong><p2 style={{cursor:'pointer', color:'#4285f4'}} onClick={()=> {this.handleProprietorClick(data)}} >{data.proprietor[0].name}</p2></li>*/}
                                         {data.application_number && <li style={{paddingTop:'10px'}} ><strong>Application: </strong>{data.application_number}</li>}
                                       </ul>
                                       <p style={{cursor:'pointer', color:'#4285f4'}} onClick={() => {this.handleSeeMore(data)}}>Get Realtime info</p>
                                     </div>
                                   </div>
                                   </div>)}

                                {this.state.filterState && this.state.sort_hl && !this.state.sort_lh && this.state.filteredDataWildcard && this.state.filteredDataWildcard
                                .concat()
                                .sort((a,b) => b.opposition_notice_count - a.opposition_notice_count)
                                .sort((a,b) => b.opposition_count - a.opposition_count)
                                .map(data => 
                                <div id="f1_container" className="col-sm-4">
                                   <div id="f1_card" className={this.state['isFlipped'+data.id+'wildcard']?"shadow flip":"shadow"}>
                                     <div className="front face">
                                       <div className="elements-flip">
                                       <div></div>
                                  {!data.associated_image && <h3 style={{maxHeight:'95px', textOverflow:'ellipses', overflow:'hidden'}}>{data.applied_for}</h3>}
                                  {data.associated_image && <img style={{height:'50%', width:'100% !important'}} src={data.associated_image} />}
                                  <hr size="2" style={{marginBottom:'0 !important'}} />
                                  <div className="overlay">
                                  <ButtonGroup>
                                  <Button style={{minWidth:'84%'}} className="btn btn-primary" onClick={() => {this.showDetail(data,'wildcard')}}>Show Details</Button>
                                  {this.state.add_report_id.indexOf(data.id) == -1 && <Button style={{minWidth:'84%'}} className="btn btn-default" onClick={() => {this.addReport(data)}}>Add to report</Button>}
                                  {this.state.add_report_id.indexOf(data.id) > -1 && <Button style={{minWidth:'84%'}} className="btn btn-danger" onClick={() => {this.removeReport(data)}}>Remove</Button>}
                                  <Button onClick={() => {this.handleSeeMore(data)}} style={{backgroundColor:'#F0E7E7 !important', color:'#345b9e !important', minWidth:'84%', border:'none', boxShadow:'none'}} >Get Realtime info</Button>
                                  </ButtonGroup>
                                  </div>
                                  {data.associated_image && data.applied_for && <p style={{textOverflow:'ellipsis', overflow:'hidden',whiteSpace: 'nowrap', maxWidth:'100%', textAlign:'center', paddingTop:'3px', maxHeight:'25px'}} >{data.applied_for}</p>}
                                  {data.similarity_index>0 && <p>{Math.round(data.similarity_index * 100) / 100}% Similar</p>}
                                  {data.similarity_index==0 && <p>0% Similar</p>}
                                  <div style={{display:'flex'}} >
                                  <p style={{width:'50%', textAlign:'right', paddingRight:'15px'}} ><img src='../../images/fire.png' />{data.opposition_count}</p>
                                  <div style={{borderLeft:'1px solid #DDD',height:'25px'}}></div>
                                  <p style={{width:'50%', textAlign:'left', paddingLeft:'15px'}} ><img src='../../images/clipboard.png' /> {data.opposition_notice_count}</p>
                                  </div>
                   
                               </div>
                                     </div>
                                     <div className="back face center">
                                      <div className="row">
                                        <div className="col-sm-12" style={{paddingLeft:'0'}}>
                                         <div className="col-sm-10" style={{paddingLeft:'5px', paddingRight:'0'}} >
                                           <p style={{fontSize:'12px', textAlign:'left', color:'black', fontStyle:'italic', fontWeight:'600 !important'}} >*Last updated on: {(new Date(data.modified).getDate())+'/' + (new Date(data.modified).getMonth()+1)+'/'+ new Date(data.modified).getFullYear()}</p>
                                         </div>
                                         <div className="col-sm-2">
                                           <i className="fa fa-1.2x fa-chevron-left pull-right" onClick={() => {this.hideDetail(data,'wildcard')}} aria-hidden="true"></i>
                                         </div>
                                        </div>
                                     </div>
     
                                       <ul>
                                         <li><strong>Status: </strong>{data.status}</li>
                                         <li style={{whiteSpace:'nowrap',overflowX:'hidden'}} ><strong>Class: </strong>{data.associated_class.sort((a,b) => a - b).toString()}</li>
                                         <table style={{marginBottom:'0 !important'}} className="table card-table">
                                         <tbody>
                                         <tr style={{textAlign:'left !important'}}>
                                            {data.proprietor && data.proprietor.length>0 && data.proprietor[0].name && <td style={{width:'42% !important'}} ><strong>Proprietor:</strong></td>}
                                            {data.proprietor && data.proprietor.length>0 && data.proprietor[0].name && <td style={{maxWidth:'50px !important',textOverflow:'ellipsis !important',overflowX:'hidden !important'}} ><ul style={{paddingTop: '0',maxHeight:'50px !important', overflowY:'scroll' }} >
                                             {data.proprietor.map(propr=> <li style={{cursor:'pointer', color:'#4285f4',background:'#FFF',whiteSpace:'nowrap',overflowX:'hidden'}} onClick={()=> {this.handleProprietorClick(propr)}} >{propr.name}</li>) 
                                            }</ul></td>}
                                          </tr>
                                          </tbody>
                                          </table>
                                        {/*data.proprietor && data.proprietor.length>0 && data.proprietor[0].name && <li><strong>Proprietor: </strong><p2 style={{cursor:'pointer', color:'#4285f4'}} onClick={()=> {this.handleProprietorClick(data)}} >{data.proprietor[0].name}</p2></li>*/}
                                         {data.application_number && <li style={{paddingTop:'10px'}} ><strong>Application: </strong>{data.application_number}</li>}
                                       </ul>
                                       <p style={{cursor:'pointer', color:'#4285f4'}} onClick={() => {this.handleSeeMore(data)}}>Get Realtime info</p>
                                     </div>
                                   </div>
                                   </div>)}

                                {!this.state.filterState && !this.state.sort_hl && this.state.sort_lh && this.state.filteredDataWildcard && this.props.wildcard_results.search_result
                                .concat()
                                .sort((a,b) => a.opposition_notice_count - b.opposition_notice_count)
                                .sort((a,b) => a.opposition_count - b.opposition_count)
                                .map(data => 
                                <div id="f1_container" className="col-sm-4">
                                   <div id="f1_card" className={this.state['isFlipped'+data.id+'wildcard']?"shadow flip":"shadow"}>
                                     <div className="front face">
                                       <div className="elements-flip">
                                       <div></div>
                                  {!data.associated_image && <h3 style={{maxHeight:'95px', textOverflow:'ellipses', overflow:'hidden'}}>{data.applied_for}</h3>}
                                  {data.associated_image && <img style={{height:'50%', width:'100% !important'}} src={data.associated_image} />}
                                  <hr size="2" style={{marginBottom:'0 !important'}} />
                                  <div className="overlay">
                                  <ButtonGroup>
                                  <Button style={{minWidth:'84%'}} className="btn btn-primary" onClick={() => {this.showDetail(data,'wildcard')}}>Show Details</Button>
                                  {this.state.add_report_id.indexOf(data.id) == -1 && <Button style={{minWidth:'84%'}} className="btn btn-default" onClick={() => {this.addReport(data)}}>Add to report</Button>}
                                  {this.state.add_report_id.indexOf(data.id) > -1 && <Button style={{minWidth:'84%'}} className="btn btn-danger" onClick={() => {this.removeReport(data)}}>Remove</Button>}
                                  <Button onClick={() => {this.handleSeeMore(data)}} style={{backgroundColor:'#F0E7E7 !important', color:'#345b9e !important', minWidth:'84%', border:'none', boxShadow:'none'}} >Get Realtime info</Button>
                                  </ButtonGroup>
                                  </div>
                                  {data.associated_image && data.applied_for && <p style={{textOverflow:'ellipsis', overflow:'hidden',whiteSpace: 'nowrap', maxWidth:'100%', textAlign:'center', paddingTop:'3px', maxHeight:'25px'}} >{data.applied_for}</p>}
                                  {data.similarity_index>0 && <p>{Math.round(data.similarity_index * 100) / 100}% Similar</p>}
                                  {data.similarity_index==0 && <p>0% Similar</p>}
                                  <div style={{display:'flex'}} >
                                  <p style={{width:'50%', textAlign:'right', paddingRight:'15px'}} ><img src='../../images/fire.png' />{data.opposition_count}</p>
                                  <div style={{borderLeft:'1px solid #DDD',height:'25px'}}></div>
                                  <p style={{width:'50%', textAlign:'left', paddingLeft:'15px'}} ><img src='../../images/clipboard.png' /> {data.opposition_notice_count}</p>
                                  </div>
                   
                               </div>
                                     </div>
                                     <div className="back face center">
                                      <div className="row">
                                        <div className="col-sm-12" style={{paddingLeft:'0'}}>
                                         <div className="col-sm-10" style={{paddingLeft:'5px', paddingRight:'0'}} >
                                           <p style={{fontSize:'12px', textAlign:'left', color:'black', fontStyle:'italic', fontWeight:'600 !important'}} >*Last updated on: {(new Date(data.modified).getDate())+'/' + (new Date(data.modified).getMonth()+1)+'/'+ new Date(data.modified).getFullYear()}</p>
                                         </div>
                                         <div className="col-sm-2">
                                           <i className="fa fa-1.2x fa-chevron-left pull-right" onClick={() => {this.hideDetail(data,'wildcard')}} aria-hidden="true"></i>
                                         </div>
                                        </div>
                                     </div>
     
                                       <ul>
                                         <li><strong>Status: </strong>{data.status}</li>
                                         <li style={{whiteSpace:'nowrap',overflowX:'hidden'}} ><strong>Class: </strong>{data.associated_class.sort((a,b) => a - b).toString()}</li>
                                         <table style={{marginBottom:'0 !important'}} className="table card-table">
                                         <tbody>
                                         <tr style={{textAlign:'left !important'}}>
                                            {data.proprietor && data.proprietor.length>0 && data.proprietor[0].name && <td style={{width:'42% !important'}} ><strong>Proprietor:</strong></td>}
                                            {data.proprietor && data.proprietor.length>0 && data.proprietor[0].name && <td style={{maxWidth:'50px !important',textOverflow:'ellipsis !important',overflowX:'hidden !important'}} ><ul style={{paddingTop: '0',maxHeight:'50px !important', overflowY:'scroll' }} >
                                             {data.proprietor.map(propr=> <li style={{cursor:'pointer', color:'#4285f4',background:'#FFF',whiteSpace:'nowrap',overflowX:'hidden'}} onClick={()=> {this.handleProprietorClick(propr)}} >{propr.name}</li>) 
                                            }</ul></td>}
                                          </tr>
                                          </tbody>
                                          </table>
                                        {/*data.proprietor && data.proprietor.length>0 && data.proprietor[0].name && <li><strong>Proprietor: </strong><p2 style={{cursor:'pointer', color:'#4285f4'}} onClick={()=> {this.handleProprietorClick(data)}} >{data.proprietor[0].name}</p2></li>*/}
                                         {data.application_number && <li style={{paddingTop:'10px'}} ><strong>Application: </strong>{data.application_number}</li>}
                                       </ul>
                                       <p style={{cursor:'pointer', color:'#4285f4'}} onClick={() => {this.handleSeeMore(data)}}>Get Realtime info</p>
                                     </div>
                                   </div>
                                   </div>)}

                                {this.state.filterState && !this.state.sort_hl && this.state.sort_lh && this.state.filteredDataWildcard && this.state.filteredDataWildcard
                                .concat()
                                .sort((a,b) => a.opposition_notice_count - b.opposition_notice_count)
                                .sort((a,b) => a.opposition_count - b.opposition_count)
                                .map(data => 
                                <div id="f1_container" className="col-sm-4">
                                   <div id="f1_card" className={this.state['isFlipped'+data.id+'wildcard']?"shadow flip":"shadow"}>
                                     <div className="front face">
                                       <div className="elements-flip">
                                       <div></div>
                                  {!data.associated_image && <h3 style={{maxHeight:'95px', textOverflow:'ellipses', overflow:'hidden'}}>{data.applied_for}</h3>}
                                  {data.associated_image && <img style={{height:'50%', width:'100% !important'}} src={data.associated_image} />}
                                  <hr size="2" style={{marginBottom:'0 !important'}} />
                                  <div className="overlay">
                                  <ButtonGroup>
                                  <Button style={{minWidth:'84%'}} className="btn btn-primary" onClick={() => {this.showDetail(data,'wildcard')}}>Show Details</Button>
                                  {this.state.add_report_id.indexOf(data.id) == -1 && <Button style={{minWidth:'84%'}} className="btn btn-default" onClick={() => {this.addReport(data)}}>Add to report</Button>}
                                  {this.state.add_report_id.indexOf(data.id) > -1 && <Button style={{minWidth:'84%'}} className="btn btn-danger" onClick={() => {this.removeReport(data)}}>Remove</Button>}
                                  <Button onClick={() => {this.handleSeeMore(data)}} style={{backgroundColor:'#F0E7E7 !important', color:'#345b9e !important', minWidth:'84%', border:'none', boxShadow:'none'}} >Get Realtime info</Button>
                                  </ButtonGroup>
                                  </div>
                                  {data.associated_image && data.applied_for && <p style={{textOverflow:'ellipsis', overflow:'hidden',whiteSpace: 'nowrap', maxWidth:'100%', textAlign:'center', paddingTop:'3px', maxHeight:'25px'}} >{data.applied_for}</p>}
                                  {data.similarity_index>0 && <p>{Math.round(data.similarity_index * 100) / 100}% Similar</p>}
                                  {data.similarity_index==0 && <p>0% Similar</p>}
                                  <div style={{display:'flex'}} >
                                  <p style={{width:'50%', textAlign:'right', paddingRight:'15px'}} ><img src='../../images/fire.png' />{data.opposition_count}</p>
                                  <div style={{borderLeft:'1px solid #DDD',height:'25px'}}></div>
                                  <p style={{width:'50%', textAlign:'left', paddingLeft:'15px'}} ><img src='../../images/clipboard.png' /> {data.opposition_notice_count}</p>
                                  </div>
                   
                               </div>
                                     </div>
                                     <div className="back face center">
                                      <div className="row">
                                        <div className="col-sm-12" style={{paddingLeft:'0'}}>
                                         <div className="col-sm-10" style={{paddingLeft:'5px', paddingRight:'0'}} >
                                           <p style={{fontSize:'12px', textAlign:'left', color:'black', fontStyle:'italic', fontWeight:'600 !important'}} >*Last updated on: {(new Date(data.modified).getDate())+'/' + (new Date(data.modified).getMonth()+1)+'/'+ new Date(data.modified).getFullYear()}</p>
                                         </div>
                                         <div className="col-sm-2">
                                           <i className="fa fa-1.2x fa-chevron-left pull-right" onClick={() => {this.hideDetail(data),'wildcard'}} aria-hidden="true"></i>
                                         </div>
                                        </div>
                                     </div>
     
                                       <ul>
                                         <li><strong>Status: </strong>{data.status}</li>
                                         <li style={{whiteSpace:'nowrap',overflowX:'hidden'}} ><strong>Class: </strong>{data.associated_class.sort((a,b) => a - b).toString()}</li>
                                         <table style={{marginBottom:'0 !important'}} className="table card-table">
                                         <tbody>
                                         <tr style={{textAlign:'left !important'}}>
                                            {data.proprietor && data.proprietor.length>0 && data.proprietor[0].name && <td style={{width:'42% !important'}} ><strong>Proprietor:</strong></td>}
                                            {data.proprietor && data.proprietor.length>0 && data.proprietor[0].name && <td style={{maxWidth:'50px !important',textOverflow:'ellipsis !important',overflowX:'hidden !important'}} ><ul style={{paddingTop: '0',maxHeight:'50px !important', overflowY:'scroll' }} >
                                             {data.proprietor.map(propr=> <li style={{cursor:'pointer', color:'#4285f4',background:'#FFF',whiteSpace:'nowrap',overflowX:'hidden'}} onClick={()=> {this.handleProprietorClick(propr)}} >{propr.name}</li>) 
                                            }</ul></td>}
                                          </tr>
                                          </tbody>
                                          </table>
                                        {/*data.proprietor && data.proprietor.length>0 && data.proprietor[0].name && <li><strong>Proprietor: </strong><p2 style={{cursor:'pointer', color:'#4285f4'}} onClick={()=> {this.handleProprietorClick(data)}} >{data.proprietor[0].name}</p2></li>*/}
                                         {data.application_number && <li style={{paddingTop:'10px'}} ><strong>Application: </strong>{data.application_number}</li>}
                                       </ul>
                                       <p style={{cursor:'pointer', color:'#4285f4'}} onClick={() => {this.handleSeeMore(data)}}>Get Realtime info</p>
                                     </div>
                                   </div>
                                   </div>)}

                              {this.state.filterState && this.props.wildcard_results.search_result.length>0  && this.state.filteredDataWildcard && this.state.filteredDataWildcard.length==0 &&
                                <img style={{paddingLeft:'10%'}} src="../../images/empty_state.png" />
                                }
                                {this.props.wildcard_results && this.props.wildcard_results.search_result.length==0 && <div style={{textAlign:'center'}} className="col-sm-12">
                              <img src="../../images/empty_state.png" />
                            </div>}
                          </div> 
                      <div className="row" style={{background:'#FFF', paddingBottom:'30px', paddingTop:'30px'}}>
                           <div className="col-sm-12" style={{textAlign:'center'}}>
                             {this.props.wildcard_results && !this.props.page_end_wild && this.props.wildcard_results.search_result.length>50 &&  <div className="col-sm-3 col-sm-offset-4">
                              {!this.state.loadBtn && <button onClick={this.handleLoadMoreWild.bind(this)} style={{fontSize:'20px'}} className="btn btn-default">Load more</button>}
                              {this.state.loadBtn && <button style={{fontSize:'20px'}} className="btn btn-default">Loading...</button>}
                            </div>}
                            {this.props.wildcard_results && this.props.page_end_wild && <div className="col-sm-5 col-sm-offset-3">
                              <h3>No more results to show.</h3>
                            </div>}
                           </div>
                        </div>
                           </div>                          
                        </div>
                    </TabPanel>

                  {/*---------CONTEXTUAL RESULTS SECTION----------*/}
                    {/*<TabPanel>
                      <div className="row">
                           <div className="col-sm-12" style={{background:'#FFF', marginLeft: '2.4%'}} >
                              <div className="elements-area">
                              {!this.state.filterState && !this.state.sort_hl && !this.state.sort_lh && this.props.contextual_results && this.props.contextual_results.search_result
                                .concat()
                                .sort((a,b) => b.similarity_index - a.similarity_index)
                                .map(data =>  
                                <div id="f1_container" className="col-sm-4">
                                   <div id="f1_card" className={this.state['isFlipped'+data.id]?"shadow flip":"shadow"}>
                                     <div className="front face">
                                       <div className="elements-flip">
                                       <div></div>
                                  {!data.associated_image && data.applied_for && <h3 style={{maxHeight:'95px', textOverflow:'ellipsis', overflow:'hidden'}}>{data.applied_for}</h3>}
                                  {data.associated_image && <img style={{height:'50%', width:'100% !important'}} src={this.siteImg(data.associated_image)} />}
                                  <hr size="2" style={{marginBottom:'0 !important'}} />
                                  <div className="overlay">
                                  <ButtonGroup>
                                  <Button style={{minWidth:'84%'}} className="btn btn-primary" onClick={() => {this.showDetail(data)}}>Show Details</Button>
                                  {this.state.add_report_id.indexOf(data.id) == -1 && <Button style={{minWidth:'84%'}} className="btn btn-default" onClick={() => {this.addReport(data)}}>Add to report</Button>}
                                  {this.state.add_report_id.indexOf(data.id) > -1 && <Button style={{minWidth:'84%'}} className="btn btn-danger" onClick={() => {this.removeReport(data)}}>Remove</Button>}
                                  <Button onClick={() => {this.handleSeeMore(data)}} style={{backgroundColor:'#F0E7E7 !important', color:'#345b9e !important', minWidth:'84%', border:'none', boxShadow:'none'}} >Get Realtime info</Button>
                                  </ButtonGroup>
                                  </div>
                                  {data.associated_image && data.applied_for && <p style={{textOverflow:'ellipsis', overflow:'hidden',whiteSpace: 'nowrap', maxWidth:'100%', textAlign:'center', paddingTop:'3px', maxHeight:'25px'}} >{data.applied_for}</p>}
                                  {data.similarity_index>0 && <p>{Math.round(data.similarity_index * 100) / 100}% Similar</p>}
                                  {data.similarity_index==0 && <p>0% Similar</p>}
                                  <div style={{display:'flex'}} >
                                  <p style={{width:'50%', textAlign:'right', paddingRight:'15px'}} ><img src='../../images/fire.png' />{data.opposition_count}</p>
                                  <div style={{borderLeft:'1px solid #DDD',height:'25px'}}></div>
                                  <p style={{width:'50%', textAlign:'left', paddingLeft:'15px'}} ><img src='../../images/clipboard.png' /> {data.opposition_notice_count}</p>
                                  </div>
                                                    
                   
                               </div>
                                     </div>
                                     <div className="back face center">
                                      <div className="row">
                                        <div className="col-sm-12" style={{paddingLeft:'0'}}>
                                         <div className="col-sm-10" style={{paddingLeft:'5px', paddingRight:'0'}} >
                                           <p style={{fontSize:'12px', textAlign:'left', color:'black', fontStyle:'italic', fontWeight:'600 !important'}} >*Last updated on: {(new Date(data.modified).getDate())+'/' + (new Date(data.modified).getMonth()+1)+'/'+ new Date(data.modified).getFullYear()}</p>
                                         </div>
                                         <div className="col-sm-2">
                                           <i className="fa fa-1.2x fa-chevron-left pull-right" onClick={() => {this.hideDetail(data)}} aria-hidden="true"></i>
                                         </div>
                                        </div>
                                     </div>
     
                                       <ul>
                                         <li><strong>Status: </strong>{data.status}</li>
                                         <li style={{whiteSpace:'nowrap',overflowX:'hidden'}} ><strong>Class: </strong>{data.associated_class.sort((a,b) => a - b).toString()}</li>
                                         <table style={{marginBottom:'0 !important'}} className="table card-table">
                                         <tbody>
                                         <tr style={{textAlign:'left !important'}}>
                                            {data.proprietor && data.proprietor.length>0 && data.proprietor[0].name && <td style={{width:'42% !important'}} ><strong>Proprietor:</strong></td>}
                                            {data.proprietor && data.proprietor.length>0 && data.proprietor[0].name && <td style={{maxWidth:'50px !important',textOverflow:'ellipsis !important',overflowX:'hidden !important'}} ><ul style={{paddingTop: '0',maxHeight:'50px !important', overflowY:'scroll' }} >
                                             {data.proprietor.map(propr=> <li style={{cursor:'pointer', color:'#4285f4',background:'#FFF',whiteSpace:'nowrap',overflowX:'hidden'}} onClick={()=> {this.handleProprietorClick(propr)}} >{propr.name}</li>) 
                                            }</ul></td>}
                                          </tr>
                                          </tbody>
                                          </table>
                                        
                                         {data.application_number && <li style={{paddingTop:'10px'}} ><strong>Application: </strong>{data.application_number}</li>}
                                       </ul>
                                       <p style={{cursor:'pointer', color:'#4285f4'}} onClick={() => {this.handleSeeMore(data)}}>Get Realtime info</p>
                                     </div>
                                   </div>
                                   </div>)}

                               {this.state.filterState && !this.state.sort_hl && !this.state.sort_lh && this.state.filteredDataContextual && this.state.filteredDataContextual
                                .concat()
                                .sort((a,b) => b.similarity_index - a.similarity_index)
                                .map(data => 
                                <div id="f1_container" className="col-sm-4">
                                   <div id="f1_card" className={this.state['isFlipped'+data.id]?"shadow flip":"shadow"}>
                                     <div className="front face">
                                       <div className="elements-flip">
                                       <div></div>
                                  {!data.associated_image && <h3 style={{maxHeight:'95px', textOverflow:'ellipses', overflow:'hidden'}}>{data.applied_for}</h3>}
                                  {data.associated_image && <img style={{height:'50%', width:'100% !important'}} src={data.associated_image} />}
                                  <hr size="2" style={{marginBottom:'0 !important'}} />
                                  <div className="overlay">
                                  <ButtonGroup>
                                  <Button style={{minWidth:'84%'}} className="btn btn-primary" onClick={() => {this.showDetail(data)}}>Show Details</Button>
                                  {this.state.add_report_id.indexOf(data.id) == -1 && <Button style={{minWidth:'84%'}} className="btn btn-default" onClick={() => {this.addReport(data)}}>Add to report</Button>}
                                  {this.state.add_report_id.indexOf(data.id) > -1 && <Button style={{minWidth:'84%'}} className="btn btn-danger" onClick={() => {this.removeReport(data)}}>Remove</Button>}
                                  <Button onClick={() => {this.handleSeeMore(data)}} style={{backgroundColor:'#F0E7E7 !important', color:'#345b9e !important', minWidth:'84%', border:'none', boxShadow:'none'}} >Get Realtime info</Button>
                                  </ButtonGroup>
                                  </div>
                                  {data.associated_image && data.applied_for && <p style={{textOverflow:'ellipsis', overflow:'hidden',whiteSpace: 'nowrap', maxWidth:'100%', textAlign:'center', paddingTop:'3px', maxHeight:'25px'}} >{data.applied_for}</p>}
                                  {data.similarity_index>0 && <p>{Math.round(data.similarity_index)}% Similar</p>}
                                  {data.similarity_index==0 && <p>0% Similar</p>}
                                  <div style={{display:'flex'}} >
                                  <p style={{width:'50%', textAlign:'right', paddingRight:'15px'}} ><img src='../../images/fire.png' />{data.opposition_count}</p>
                                  <div style={{borderLeft:'1px solid #DDD',height:'25px'}}></div>
                                  <p style={{width:'50%', textAlign:'left', paddingLeft:'15px'}} ><img src='../../images/clipboard.png' /> {data.opposition_notice_count}</p>
                                  </div>
                   
                               </div>
                                     </div>
                                     <div className="back face center">
                                      <div className="row">
                                        <div className="col-sm-12" style={{paddingLeft:'0'}}>
                                         <div className="col-sm-10" style={{paddingLeft:'5px', paddingRight:'0'}} >
                                           <p style={{fontSize:'12px', textAlign:'left', color:'black', fontStyle:'italic', fontWeight:'600 !important'}} >*Last updated on: {(new Date(data.modified).getDate())+'/' + (new Date(data.modified).getMonth()+1)+'/'+ new Date(data.modified).getFullYear()}</p>
                                         </div>
                                         <div className="col-sm-2">
                                           <i className="fa fa-1.2x fa-chevron-left pull-right" onClick={() => {this.hideDetail(data)}} aria-hidden="true"></i>
                                         </div>
                                        </div>
                                     </div>
     
                                       <ul>
                                         <li><strong>Status: </strong>{data.status}</li>
                                         <li style={{whiteSpace:'nowrap',overflowX:'hidden'}} ><strong>Class: </strong>{data.associated_class.sort((a,b) => a - b).toString()}</li>
                                         <table style={{marginBottom:'0 !important'}} className="table card-table">
                                         <tbody>
                                         <tr style={{textAlign:'left !important'}}>
                                            {data.proprietor && data.proprietor.length>0 && data.proprietor[0].name && <td style={{width:'42% !important'}} ><strong>Proprietor:</strong></td>}
                                            {data.proprietor && data.proprietor.length>0 && data.proprietor[0].name && <td style={{maxWidth:'50px !important',textOverflow:'ellipsis !important',overflowX:'hidden !important'}} ><ul style={{paddingTop: '0',maxHeight:'50px !important', overflowY:'scroll' }} >
                                             {data.proprietor.map(propr=> <li style={{cursor:'pointer', color:'#4285f4',background:'#FFF',whiteSpace:'nowrap',overflowX:'hidden'}} onClick={()=> {this.handleProprietorClick(propr)}} >{propr.name}</li>) 
                                            }</ul></td>}
                                          </tr>
                                          </tbody>
                                          </table>
                                        
                                         {data.application_number && <li style={{paddingTop:'10px'}} ><strong>Application: </strong>{data.application_number}</li>}
                                       </ul>
                                       <p style={{cursor:'pointer', color:'#4285f4'}} onClick={() => {this.handleSeeMore(data)}}>Get Realtime info</p>
                                     </div>
                                   </div>
                                   </div>)}


                                {!this.state.filterState && this.state.sort_hl && !this.state.sort_lh && this.state.filteredDataContextual && this.props.contextual_results.search_result
                                .concat()
                                .sort((a,b) => b.opposition_notice_count - a.opposition_notice_count)
                                .sort((a,b) => b.opposition_count - a.opposition_count)
                                .map(data => 
                                <div id="f1_container" className="col-sm-4">
                                   <div id="f1_card" className={this.state['isFlipped'+data.id]?"shadow flip":"shadow"}>
                                     <div className="front face">
                                       <div className="elements-flip">
                                       <div></div>
                                  {!data.associated_image && <h3 style={{maxHeight:'95px', textOverflow:'ellipses', overflow:'hidden'}}>{data.applied_for}</h3>}
                                  {data.associated_image && <img style={{height:'50%', width:'100% !important'}} src={data.associated_image} />}
                                  <hr size="2" style={{marginBottom:'0 !important'}} />
                                  <div className="overlay">
                                  <ButtonGroup>
                                  <Button style={{minWidth:'84%'}} className="btn btn-primary" onClick={() => {this.showDetail(data)}}>Show Details</Button>
                                  {this.state.add_report_id.indexOf(data.id) == -1 && <Button style={{minWidth:'84%'}} className="btn btn-default" onClick={() => {this.addReport(data)}}>Add to report</Button>}
                                  {this.state.add_report_id.indexOf(data.id) > -1 && <Button style={{minWidth:'84%'}} className="btn btn-danger" onClick={() => {this.removeReport(data)}}>Remove</Button>}
                                  <Button onClick={() => {this.handleSeeMore(data)}} style={{backgroundColor:'#F0E7E7 !important', color:'#345b9e !important', minWidth:'84%', border:'none', boxShadow:'none'}} >Get Realtime info</Button>
                                  </ButtonGroup>
                                  </div>
                                  {data.associated_image && data.applied_for && <p style={{textOverflow:'ellipsis', overflow:'hidden',whiteSpace: 'nowrap', maxWidth:'100%', textAlign:'center', paddingTop:'3px', maxHeight:'25px'}} >{data.applied_for}</p>}
                                  {data.similarity_index>0 && <p>{Math.round(data.similarity_index)}% Similar</p>}
                                  {data.similarity_index==0 && <p>0% Similar</p>}
                                  <div style={{display:'flex'}} >
                                  <p style={{width:'50%', textAlign:'right', paddingRight:'15px'}} ><img src='../../images/fire.png' />{data.opposition_count}</p>
                                  <div style={{borderLeft:'1px solid #DDD',height:'25px'}}></div>
                                  <p style={{width:'50%', textAlign:'left', paddingLeft:'15px'}} ><img src='../../images/clipboard.png' /> {data.opposition_notice_count}</p>
                                  </div>
                   
                               </div>
                                     </div>
                                     <div className="back face center">
                                      <div className="row">
                                        <div className="col-sm-12" style={{paddingLeft:'0'}}>
                                         <div className="col-sm-10" style={{paddingLeft:'5px', paddingRight:'0'}} >
                                           <p style={{fontSize:'12px', textAlign:'left', color:'black', fontStyle:'italic', fontWeight:'600 !important'}} >*Last updated on: {(new Date(data.modified).getDate())+'/' + (new Date(data.modified).getMonth()+1)+'/'+ new Date(data.modified).getFullYear()}</p>
                                         </div>
                                         <div className="col-sm-2">
                                           <i className="fa fa-1.2x fa-chevron-left pull-right" onClick={() => {this.hideDetail(data)}} aria-hidden="true"></i>
                                         </div>
                                        </div>
                                     </div>
     
                                       <ul>
                                         <li><strong>Status: </strong>{data.status}</li>
                                         <li style={{whiteSpace:'nowrap',overflowX:'hidden'}} ><strong>Class: </strong>{data.associated_class.sort((a,b) => a - b).toString()}</li>
                                         <table style={{marginBottom:'0 !important'}} className="table card-table">
                                         <tbody>
                                         <tr style={{textAlign:'left !important'}}>
                                            {data.proprietor && data.proprietor.length>0 && data.proprietor[0].name && <td style={{width:'42% !important'}} ><strong>Proprietor:</strong></td>}
                                            {data.proprietor && data.proprietor.length>0 && data.proprietor[0].name && <td style={{maxWidth:'50px !important',textOverflow:'ellipsis !important',overflowX:'hidden !important'}} ><ul style={{paddingTop: '0',maxHeight:'50px !important', overflowY:'scroll' }} >
                                             {data.proprietor.map(propr=> <li style={{cursor:'pointer', color:'#4285f4',background:'#FFF',whiteSpace:'nowrap',overflowX:'hidden'}} onClick={()=> {this.handleProprietorClick(propr)}} >{propr.name}</li>) 
                                            }</ul></td>}
                                          </tr>
                                          </tbody>
                                          </table>
                                         {data.application_number && <li style={{paddingTop:'10px'}} ><strong>Application: </strong>{data.application_number}</li>}
                                       </ul>
                                       <p style={{cursor:'pointer', color:'#4285f4'}} onClick={() => {this.handleSeeMore(data)}}>Get Realtime info</p>
                                     </div>
                                   </div>
                                   </div>)}

                                {this.state.filterState && this.state.sort_hl && !this.state.sort_lh && this.state.filteredDataContextual && this.state.filteredDataContextual
                                .concat()
                                .sort((a,b) => b.opposition_notice_count - a.opposition_notice_count)
                                .sort((a,b) => b.opposition_count - a.opposition_count)
                                .map(data => 
                                <div id="f1_container" className="col-sm-4">
                                   <div id="f1_card" className={this.state['isFlipped'+data.id]?"shadow flip":"shadow"}>
                                     <div className="front face">
                                       <div className="elements-flip">
                                       <div></div>
                                  {!data.associated_image && <h3 style={{maxHeight:'95px', textOverflow:'ellipses', overflow:'hidden'}}>{data.applied_for}</h3>}
                                  {data.associated_image && <img style={{height:'50%', width:'100% !important'}} src={data.associated_image} />}
                                  <hr size="2" style={{marginBottom:'0 !important'}} />
                                  <div className="overlay">
                                  <ButtonGroup>
                                  <Button style={{minWidth:'84%'}} className="btn btn-primary" onClick={() => {this.showDetail(data)}}>Show Details</Button>
                                  {this.state.add_report_id.indexOf(data.id) == -1 && <Button style={{minWidth:'84%'}} className="btn btn-default" onClick={() => {this.addReport(data)}}>Add to report</Button>}
                                  {this.state.add_report_id.indexOf(data.id) > -1 && <Button style={{minWidth:'84%'}} className="btn btn-danger" onClick={() => {this.removeReport(data)}}>Remove</Button>}
                                  <Button onClick={() => {this.handleSeeMore(data)}} style={{backgroundColor:'#F0E7E7 !important', color:'#345b9e !important', minWidth:'84%', border:'none', boxShadow:'none'}} >Get Realtime info</Button>
                                  </ButtonGroup>
                                  </div>
                                  {data.associated_image && data.applied_for && <p style={{textOverflow:'ellipsis', overflow:'hidden',whiteSpace: 'nowrap', maxWidth:'100%', textAlign:'center', paddingTop:'3px', maxHeight:'25px'}} >{data.applied_for}</p>}
                                  {data.similarity_index>0 && <p>{Math.round(data.similarity_index)}% Similar</p>}
                                  {data.similarity_index==0 && <p>0% Similar</p>}
                                  <div style={{display:'flex'}} >
                                  <p style={{width:'50%', textAlign:'right', paddingRight:'15px'}} ><img src='../../images/fire.png' />{data.opposition_count}</p>
                                  <div style={{borderLeft:'1px solid #DDD',height:'25px'}}></div>
                                  <p style={{width:'50%', textAlign:'left', paddingLeft:'15px'}} ><img src='../../images/clipboard.png' /> {data.opposition_notice_count}</p>
                                  </div>
                   
                               </div>
                                     </div>
                                     <div className="back face center">
                                      <div className="row">
                                        <div className="col-sm-12" style={{paddingLeft:'0'}}>
                                         <div className="col-sm-10" style={{paddingLeft:'5px', paddingRight:'0'}} >
                                           <p style={{fontSize:'12px', textAlign:'left', color:'black', fontStyle:'italic', fontWeight:'600 !important'}} >*Last updated on: {(new Date(data.modified).getDate())+'/' + (new Date(data.modified).getMonth()+1)+'/'+ new Date(data.modified).getFullYear()}</p>
                                         </div>
                                         <div className="col-sm-2">
                                           <i className="fa fa-1.2x fa-chevron-left pull-right" onClick={() => {this.hideDetail(data)}} aria-hidden="true"></i>
                                         </div>
                                        </div>
                                     </div>
     
                                       <ul>
                                         <li><strong>Status: </strong>{data.status}</li>
                                         <li style={{whiteSpace:'nowrap',overflowX:'hidden'}} ><strong>Class: </strong>{data.associated_class.sort((a,b) => a - b).toString()}</li>
                                         <table style={{marginBottom:'0 !important'}} className="table card-table">
                                         <tbody>
                                         <tr style={{textAlign:'left !important'}}>
                                            {data.proprietor && data.proprietor.length>0 && data.proprietor[0].name && <td style={{width:'42% !important'}} ><strong>Proprietor:</strong></td>}
                                            {data.proprietor && data.proprietor.length>0 && data.proprietor[0].name && <td style={{maxWidth:'50px !important',textOverflow:'ellipsis !important',overflowX:'hidden !important'}} ><ul style={{paddingTop: '0',maxHeight:'50px !important', overflowY:'scroll' }} >
                                             {data.proprietor.map(propr=> <li style={{cursor:'pointer', color:'#4285f4',background:'#FFF',whiteSpace:'nowrap',overflowX:'hidden'}} onClick={()=> {this.handleProprietorClick(propr)}} >{propr.name}</li>) 
                                            }</ul></td>}
                                          </tr>
                                          </tbody>
                                          </table>
                                         {data.application_number && <li style={{paddingTop:'10px'}} ><strong>Application: </strong>{data.application_number}</li>}
                                       </ul>
                                       <p style={{cursor:'pointer', color:'#4285f4'}} onClick={() => {this.handleSeeMore(data)}}>Get Realtime info</p>
                                     </div>
                                   </div>
                                   </div>)}

                                {!this.state.filterState && !this.state.sort_hl && this.state.sort_lh && this.state.filteredDataContextual && this.props.contextual_results.search_result
                                .concat()
                                .sort((a,b) => a.opposition_notice_count - b.opposition_notice_count)
                                .sort((a,b) => a.opposition_count - b.opposition_count)
                                .map(data => 
                                <div id="f1_container" className="col-sm-4">
                                   <div id="f1_card" className={this.state['isFlipped'+data.id]?"shadow flip":"shadow"}>
                                     <div className="front face">
                                       <div className="elements-flip">
                                       <div></div>
                                  {!data.associated_image && <h3 style={{maxHeight:'95px', textOverflow:'ellipses', overflow:'hidden'}}>{data.applied_for}</h3>}
                                  {data.associated_image && <img style={{height:'50%', width:'100% !important'}} src={data.associated_image} />}
                                  <hr size="2" style={{marginBottom:'0 !important'}} />
                                  <div className="overlay">
                                  <ButtonGroup>
                                  <Button style={{minWidth:'84%'}} className="btn btn-primary" onClick={() => {this.showDetail(data)}}>Show Details</Button>
                                  {this.state.add_report_id.indexOf(data.id) == -1 && <Button style={{minWidth:'84%'}} className="btn btn-default" onClick={() => {this.addReport(data)}}>Add to report</Button>}
                                  {this.state.add_report_id.indexOf(data.id) > -1 && <Button style={{minWidth:'84%'}} className="btn btn-danger" onClick={() => {this.removeReport(data)}}>Remove</Button>}
                                  <Button onClick={() => {this.handleSeeMore(data)}} style={{backgroundColor:'#F0E7E7 !important', color:'#345b9e !important', minWidth:'84%', border:'none', boxShadow:'none'}} >Get Realtime info</Button>
                                  </ButtonGroup>
                                  </div>
                                  {data.associated_image && data.applied_for && <p style={{textOverflow:'ellipsis', overflow:'hidden',whiteSpace: 'nowrap', maxWidth:'100%', textAlign:'center', paddingTop:'3px', maxHeight:'25px'}} >{data.applied_for}</p>}
                                  {data.similarity_index>0 && <p>{Math.round(data.similarity_index)}% Similar</p>}
                                  {data.similarity_index==0 && <p>0% Similar</p>}
                                  <div style={{display:'flex'}} >
                                  <p style={{width:'50%', textAlign:'right', paddingRight:'15px'}} ><img src='../../images/fire.png' />{data.opposition_count}</p>
                                  <div style={{borderLeft:'1px solid #DDD',height:'25px'}}></div>
                                  <p style={{width:'50%', textAlign:'left', paddingLeft:'15px'}} ><img src='../../images/clipboard.png' /> {data.opposition_notice_count}</p>
                                  </div>
                   
                               </div>
                                     </div>
                                     <div className="back face center">
                                      <div className="row">
                                        <div className="col-sm-12" style={{paddingLeft:'0'}}>
                                         <div className="col-sm-10" style={{paddingLeft:'5px', paddingRight:'0'}} >
                                           <p style={{fontSize:'12px', textAlign:'left', color:'black', fontStyle:'italic', fontWeight:'600 !important'}} >*Last updated on: {(new Date(data.modified).getDate())+'/' + (new Date(data.modified).getMonth()+1)+'/'+ new Date(data.modified).getFullYear()}</p>
                                         </div>
                                         <div className="col-sm-2">
                                           <i className="fa fa-1.2x fa-chevron-left pull-right" onClick={() => {this.hideDetail(data)}} aria-hidden="true"></i>
                                         </div>
                                        </div>
                                     </div>
     
                                       <ul>
                                         <li><strong>Status: </strong>{data.status}</li>
                                         <li style={{whiteSpace:'nowrap',overflowX:'hidden'}} ><strong>Class: </strong>{data.associated_class.sort((a,b) => a - b).toString()}</li>
                                         <table style={{marginBottom:'0 !important'}} className="table card-table">
                                         <tbody>
                                         <tr style={{textAlign:'left !important'}}>
                                            {data.proprietor && data.proprietor.length>0 && data.proprietor[0].name && <td style={{width:'42% !important'}} ><strong>Proprietor:</strong></td>}
                                            {data.proprietor && data.proprietor.length>0 && data.proprietor[0].name && <td style={{maxWidth:'50px !important',textOverflow:'ellipsis !important',overflowX:'hidden !important'}} ><ul style={{paddingTop: '0',maxHeight:'50px !important', overflowY:'scroll' }} >
                                             {data.proprietor.map(propr=> <li style={{cursor:'pointer', color:'#4285f4',background:'#FFF',whiteSpace:'nowrap',overflowX:'hidden'}} onClick={()=> {this.handleProprietorClick(propr)}} >{propr.name}</li>) 
                                            }</ul></td>}
                                          </tr>
                                          </tbody>
                                          </table>
                                         {data.application_number && <li style={{paddingTop:'10px'}} ><strong>Application: </strong>{data.application_number}</li>}
                                       </ul>
                                       <p style={{cursor:'pointer', color:'#4285f4'}} onClick={() => {this.handleSeeMore(data)}}>Get Realtime info</p>
                                     </div>
                                   </div>
                                   </div>)}

                                {this.state.filterState && !this.state.sort_hl && this.state.sort_lh && this.state.filteredDataContextual && this.state.filteredDataContextual
                                .concat()
                                .sort((a,b) => a.opposition_notice_count - b.opposition_notice_count)
                                .sort((a,b) => a.opposition_count - b.opposition_count)
                                .map(data => 
                                <div id="f1_container" className="col-sm-4">
                                   <div id="f1_card" className={this.state['isFlipped'+data.id]?"shadow flip":"shadow"}>
                                     <div className="front face">
                                       <div className="elements-flip">
                                       <div></div>
                                  {!data.associated_image && <h3 style={{maxHeight:'95px', textOverflow:'ellipses', overflow:'hidden'}}>{data.applied_for}</h3>}
                                  {data.associated_image && <img style={{height:'50%', width:'100% !important'}} src={data.associated_image} />}
                                  <hr size="2" style={{marginBottom:'0 !important'}} />
                                  <div className="overlay">
                                  <ButtonGroup>
                                  <Button style={{minWidth:'84%'}} className="btn btn-primary" onClick={() => {this.showDetail(data)}}>Show Details</Button>
                                  {this.state.add_report_id.indexOf(data.id) == -1 && <Button style={{minWidth:'84%'}} className="btn btn-default" onClick={() => {this.addReport(data)}}>Add to report</Button>}
                                  {this.state.add_report_id.indexOf(data.id) > -1 && <Button style={{minWidth:'84%'}} className="btn btn-danger" onClick={() => {this.removeReport(data)}}>Remove</Button>}
                                  <Button onClick={() => {this.handleSeeMore(data)}} style={{backgroundColor:'#F0E7E7 !important', color:'#345b9e !important', minWidth:'84%', border:'none', boxShadow:'none'}} >Get Realtime info</Button>
                                  </ButtonGroup>
                                  </div>
                                  {data.associated_image && data.applied_for && <p style={{textOverflow:'ellipsis', overflow:'hidden',whiteSpace: 'nowrap', maxWidth:'100%', textAlign:'center', paddingTop:'3px', maxHeight:'25px'}} >{data.applied_for}</p>}
                                  {data.similarity_index>0 && <p>{data.similarity_index}% Similar</p>}
                                  {data.similarity_index==0 && <p>0% Similar</p>}
                                  <div style={{display:'flex'}} >
                                  <p style={{width:'50%', textAlign:'right', paddingRight:'15px'}} ><img src='../../images/fire.png' />{data.opposition_count}</p>
                                  <div style={{borderLeft:'1px solid #DDD',height:'25px'}}></div>
                                  <p style={{width:'50%', textAlign:'left', paddingLeft:'15px'}} ><img src='../../images/clipboard.png' /> {data.opposition_notice_count}</p>
                                  </div>
                   
                               </div>
                                     </div>
                                     <div className="back face center">
                                      <div className="row">
                                        <div className="col-sm-12" style={{paddingLeft:'0'}}>
                                         <div className="col-sm-10" style={{paddingLeft:'5px', paddingRight:'0'}} >
                                           <p style={{fontSize:'12px', textAlign:'left', color:'black', fontStyle:'italic', fontWeight:'600 !important'}} >*Last updated on: {(new Date(data.modified).getDate())+'/' + (new Date(data.modified).getMonth()+1)+'/'+ new Date(data.modified).getFullYear()}</p>
                                         </div>
                                         <div className="col-sm-2">
                                           <i className="fa fa-1.2x fa-chevron-left pull-right" onClick={() => {this.hideDetail(data)}} aria-hidden="true"></i>
                                         </div>
                                        </div>
                                     </div>
     
                                       <ul>
                                         <li><strong>Status: </strong>{data.status}</li>
                                         <li style={{whiteSpace:'nowrap',overflowX:'hidden'}} ><strong>Class: </strong>{data.associated_class.sort((a,b) => a - b).toString()}</li>
                                         <table style={{marginBottom:'0 !important'}} className="table card-table">
                                         <tbody>
                                         <tr style={{textAlign:'left !important'}}>
                                            {data.proprietor && data.proprietor.length>0 && data.proprietor[0].name && <td style={{width:'42% !important'}} ><strong>Proprietor:</strong></td>}
                                            {data.proprietor && data.proprietor.length>0 && data.proprietor[0].name && <td style={{maxWidth:'50px !important',textOverflow:'ellipsis !important',overflowX:'hidden !important'}} ><ul style={{paddingTop: '0',maxHeight:'50px !important', overflowY:'scroll' }} >
                                             {data.proprietor.map(propr=> <li style={{cursor:'pointer', color:'#4285f4',background:'#FFF',whiteSpace:'nowrap',overflowX:'hidden'}} onClick={()=> {this.handleProprietorClick(propr)}} >{propr.name}</li>) 
                                            }</ul></td>}
                                          </tr>
                                          </tbody>
                                          </table>
                                         {data.application_number && <li style={{paddingTop:'10px'}} ><strong>Application: </strong>{data.application_number}</li>}
                                       </ul>
                                       <p style={{cursor:'pointer', color:'#4285f4'}} onClick={() => {this.handleSeeMore(data)}}>Get Realtime info</p>
                                     </div>
                                   </div>
                                   </div>)}

                              {this.state.filterState && this.state.filteredDataContextual && this.state.filteredDataContextual.length==0 &&
                                <img style={{paddingLeft:'10%'}} src="../../images/empty_state.png" />
                                }
                          </div> 
                      <div className="row" style={{background:'#FFF', paddingBottom:'30px', paddingTop:'30px'}}>
                           <div className="col-sm-12" style={{textAlign:'center'}}>
                             {this.props.contextual_results && !this.props.page_end_context && this.props.contextual_results.search_result.length>50 &&  <div className="col-sm-3 col-sm-offset-4">
                              {!this.state.loadBtn && <button onClick={this.handleLoadMoreContextual.bind(this)} style={{fontSize:'20px'}} className="btn btn-default">Load more</button>}
                              {this.state.loadBtn && <button style={{fontSize:'20px'}} className="btn btn-default">Loading...</button>}
                            </div>}
                            {this.props.contextual_results && this.props.contextual_results.search_result.length==0 && <div className="col-sm-5 col-sm-offset-3">
                              <h3>No marks were found.</h3>
                            </div>}
                            {this.props.contextual_results && this.props.page_end_context && <div className="col-sm-5 col-sm-offset-3">
                              <h3>No more results to show.</h3>
                            </div>}
                           </div>
                        </div>
                           </div>                          
                        </div>
                    </TabPanel>*/}

                  {/*-----------FUZZY RESULTS------------*/}
                    <TabPanel>
                      <div className="row">
                           <div className="col-sm-12" style={{background:'#FFF', marginLeft: '2.4%'}} >
                              <div className="elements-area">
                              {!this.props.fuzzy_results && <div className="col-sm-12" style={{textAlign:'center'}} ><img style={{textAlign:'center'}} src="../../images/loader_list.gif" /></div>}
                              {!this.state.filterState && !this.state.sort_hl && !this.state.sort_lh && this.props.fuzzy_results && this.props.fuzzy_results.search_result
                                .map(data =>  
                                <div id="f1_container" className="col-sm-4">
                                   <div id="f1_card" className={this.state['isFlipped'+data.id+'fuzzy']?"shadow flip":"shadow"}>
                                     <div className="front face">
                                       <div className="elements-flip">
                                       <div></div>
                                  {!data.associated_image && data.applied_for && <h3 style={{maxHeight:'95px', textOverflow:'ellipsis', overflow:'hidden'}}>{data.applied_for}</h3>}
                                  {data.associated_image && <img style={{height:'50%', width:'100% !important'}} src={this.siteImg(data.associated_image)} />}
                                  <hr size="2" style={{marginBottom:'0 !important'}} />
                                  <div className="overlay">
                                  <ButtonGroup>
                                  <Button style={{minWidth:'84%'}} className="btn btn-primary" onClick={() => {this.showDetail(data,'fuzzy')}}>Show Details</Button>
                                  {this.state.add_report_id.indexOf(data.id) == -1 && <Button style={{minWidth:'84%'}} className="btn btn-default" onClick={() => {this.addReport(data)}}>Add to report</Button>}
                                  {this.state.add_report_id.indexOf(data.id) > -1 && <Button style={{minWidth:'84%'}} className="btn btn-danger" onClick={() => {this.removeReport(data)}}>Remove</Button>}
                                  <Button onClick={() => {this.handleSeeMore(data)}} style={{backgroundColor:'#F0E7E7 !important', color:'#345b9e !important', minWidth:'84%', border:'none', boxShadow:'none'}} >Get Realtime info</Button>
                                  </ButtonGroup>
                                  </div>
                                  {data.associated_image && data.applied_for && <p style={{textOverflow:'ellipsis', overflow:'hidden',whiteSpace: 'nowrap', maxWidth:'100%', textAlign:'center', paddingTop:'3px', maxHeight:'25px'}} >{data.applied_for}</p>}
                                  {data.similarity_index>0 && <p>{Math.round(data.similarity_index * 100) / 100}% Similar</p>}
                                  {data.similarity_index==0 && <p>0% Similar</p>}
                                  <div style={{display:'flex'}} >
                                  <p style={{width:'50%', textAlign:'right', paddingRight:'15px'}} ><img src='../../images/fire.png' />{data.opposition_count}</p>
                                  <div style={{borderLeft:'1px solid #DDD',height:'25px'}}></div>
                                  <p style={{width:'50%', textAlign:'left', paddingLeft:'15px'}} ><img src='../../images/clipboard.png' /> {data.opposition_notice_count}</p>
                                  </div>
                                                    
                   
                               </div>
                                     </div>
                                     <div className="back face center">
                                      <div className="row">
                                        <div className="col-sm-12" style={{paddingLeft:'0'}}>
                                         <div className="col-sm-10" style={{paddingLeft:'5px', paddingRight:'0'}} >
                                           <p style={{fontSize:'12px', textAlign:'left', color:'black', fontStyle:'italic', fontWeight:'600 !important'}} >*Last updated on: {(new Date(data.modified).getDate())+'/' + (new Date(data.modified).getMonth()+1)+'/'+ new Date(data.modified).getFullYear()}</p>
                                         </div>
                                         <div className="col-sm-2">
                                           <i className="fa fa-1.2x fa-chevron-left pull-right" onClick={() => {this.hideDetail(data,'fuzzy')}} aria-hidden="true"></i>
                                         </div>
                                        </div>
                                     </div>
     
                                       <ul>
                                         <li><strong>Status: </strong>{data.status}</li>
                                         <li style={{whiteSpace:'nowrap',overflowX:'hidden'}} ><strong>Class: </strong>{data.associated_class.sort((a,b) => a - b).toString()}</li>
                                         <table style={{marginBottom:'0 !important'}} className="table card-table">
                                         <tbody>
                                         <tr style={{textAlign:'left !important'}}>
                                            {data.proprietor && data.proprietor.length>0 && data.proprietor[0].name && <td style={{width:'42% !important'}} ><strong>Proprietor:</strong></td>}
                                            {data.proprietor && data.proprietor.length>0 && data.proprietor[0].name && <td style={{maxWidth:'50px !important',textOverflow:'ellipsis !important',overflowX:'hidden !important'}} ><ul style={{paddingTop: '0',maxHeight:'50px !important', overflowY:'scroll' }} >
                                             {data.proprietor.map(propr=> <li style={{cursor:'pointer', color:'#4285f4',background:'#FFF',whiteSpace:'nowrap',overflowX:'hidden'}} onClick={()=> {this.handleProprietorClick(propr)}} >{propr.name}</li>) 
                                            }</ul></td>}
                                          </tr>
                                          </tbody>
                                          </table>
                                        {/*data.proprietor && data.proprietor.length>0 && data.proprietor[0].name && <li><strong>Proprietor: </strong><p2 style={{cursor:'pointer', color:'#4285f4'}} onClick={()=> {this.handleProprietorClick(data)}} >{data.proprietor[0].name}</p2></li>*/}
                                         {data.application_number && <li style={{paddingTop:'10px'}} ><strong>Application: </strong>{data.application_number}</li>}
                                       </ul>
                                       <p style={{cursor:'pointer', color:'#4285f4'}} onClick={() => {this.handleSeeMore(data)}}>Get Realtime info</p>
                                     </div>
                                   </div>
                                   </div>)}

                               {this.state.filterState && !this.state.sort_hl && !this.state.sort_lh && this.state.filteredDataFuzzy && this.state.filteredDataFuzzy
                                .map(data => 
                                <div id="f1_container" className="col-sm-4">
                                   <div id="f1_card" className={this.state['isFlipped'+data.id+'fuzzy']?"shadow flip":"shadow"}>
                                     <div className="front face">
                                       <div className="elements-flip">
                                       <div></div>
                                  {!data.associated_image && <h3 style={{maxHeight:'95px', textOverflow:'ellipses', overflow:'hidden'}}>{data.applied_for}</h3>}
                                  {data.associated_image && <img style={{height:'50%', width:'100% !important'}} src={data.associated_image} />}
                                  <hr size="2" style={{marginBottom:'0 !important'}} />
                                  <div className="overlay">
                                  <ButtonGroup>
                                  <Button style={{minWidth:'84%'}} className="btn btn-primary" onClick={() => {this.showDetail(data,'fuzzy')}}>Show Details</Button>
                                  {this.state.add_report_id.indexOf(data.id) == -1 && <Button style={{minWidth:'84%'}} className="btn btn-default" onClick={() => {this.addReport(data)}}>Add to report</Button>}
                                  {this.state.add_report_id.indexOf(data.id) > -1 && <Button style={{minWidth:'84%'}} className="btn btn-danger" onClick={() => {this.removeReport(data)}}>Remove</Button>}
                                  <Button onClick={() => {this.handleSeeMore(data)}} style={{backgroundColor:'#F0E7E7 !important', color:'#345b9e !important', minWidth:'84%', border:'none', boxShadow:'none'}} >Get Realtime info</Button>
                                  </ButtonGroup>
                                  </div>
                                  {data.associated_image && data.applied_for && <p style={{textOverflow:'ellipsis', overflow:'hidden',whiteSpace: 'nowrap', maxWidth:'100%', textAlign:'center', paddingTop:'3px', maxHeight:'25px'}} >{data.applied_for}</p>}
                                  {data.similarity_index>0 && <p>{Math.round(data.similarity_index * 100) / 100}% Similar</p>}
                                  {data.similarity_index==0 && <p>0% Similar</p>}
                                  <div style={{display:'flex'}} >
                                  <p style={{width:'50%', textAlign:'right', paddingRight:'15px'}} ><img src='../../images/fire.png' />{data.opposition_count}</p>
                                  <div style={{borderLeft:'1px solid #DDD',height:'25px'}}></div>
                                  <p style={{width:'50%', textAlign:'left', paddingLeft:'15px'}} ><img src='../../images/clipboard.png' /> {data.opposition_notice_count}</p>
                                  </div>
                   
                               </div>
                                     </div>
                                     <div className="back face center">
                                      <div className="row">
                                        <div className="col-sm-12" style={{paddingLeft:'0'}}>
                                         <div className="col-sm-10" style={{paddingLeft:'5px', paddingRight:'0'}} >
                                           <p style={{fontSize:'12px', textAlign:'left', color:'black', fontStyle:'italic', fontWeight:'600 !important'}} >*Last updated on: {(new Date(data.modified).getDate())+'/' + (new Date(data.modified).getMonth()+1)+'/'+ new Date(data.modified).getFullYear()}</p>
                                         </div>
                                         <div className="col-sm-2">
                                           <i className="fa fa-1.2x fa-chevron-left pull-right" onClick={() => {this.hideDetail(data,'fuzzy')}} aria-hidden="true"></i>
                                         </div>
                                        </div>
                                     </div>
     
                                       <ul>
                                         <li><strong>Status: </strong>{data.status}</li>
                                         <li style={{whiteSpace:'nowrap',overflowX:'hidden'}} ><strong>Class: </strong>{data.associated_class.sort((a,b) => a - b).toString()}</li>
                                         <table style={{marginBottom:'0 !important'}} className="table card-table">
                                         <tbody>
                                         <tr style={{textAlign:'left !important'}}>
                                            {data.proprietor && data.proprietor.length>0 && data.proprietor[0].name && <td style={{width:'42% !important'}} ><strong>Proprietor:</strong></td>}
                                            {data.proprietor && data.proprietor.length>0 && data.proprietor[0].name && <td style={{maxWidth:'50px !important',textOverflow:'ellipsis !important',overflowX:'hidden !important'}} ><ul style={{paddingTop: '0',maxHeight:'50px !important', overflowY:'scroll' }} >
                                             {data.proprietor.map(propr=> <li style={{cursor:'pointer', color:'#4285f4',background:'#FFF',whiteSpace:'nowrap',overflowX:'hidden'}} onClick={()=> {this.handleProprietorClick(propr)}} >{propr.name}</li>) 
                                            }</ul></td>}
                                          </tr>
                                          </tbody>
                                          </table>
                                        {/*data.proprietor && data.proprietor.length>0 && data.proprietor[0].name && <li><strong>Proprietor: </strong><p2 style={{cursor:'pointer', color:'#4285f4'}} onClick={()=> {this.handleProprietorClick(data)}} >{data.proprietor[0].name}</p2></li>*/}
                                         {data.application_number && <li style={{paddingTop:'10px'}} ><strong>Application: </strong>{data.application_number}</li>}
                                       </ul>
                                       <p style={{cursor:'pointer', color:'#4285f4'}} onClick={() => {this.handleSeeMore(data)}}>Get Realtime info</p>
                                     </div>
                                   </div>
                                   </div>)}


                                {!this.state.filterState && this.state.sort_hl && !this.state.sort_lh && this.state.filteredDataFuzzy && this.props.fuzzy_results.search_result
                                .concat()
                                .sort((a,b) => b.opposition_notice_count - a.opposition_notice_count)
                                .sort((a,b) => b.opposition_count - a.opposition_count)
                                .map(data => 
                                <div id="f1_container" className="col-sm-4">
                                   <div id="f1_card" className={this.state['isFlipped'+data.id+'fuzzy']?"shadow flip":"shadow"}>
                                     <div className="front face">
                                       <div className="elements-flip">
                                       <div></div>
                                  {!data.associated_image && <h3 style={{maxHeight:'95px', textOverflow:'ellipses', overflow:'hidden'}}>{data.applied_for}</h3>}
                                  {data.associated_image && <img style={{height:'50%', width:'100% !important'}} src={data.associated_image} />}
                                  <hr size="2" style={{marginBottom:'0 !important'}} />
                                  <div className="overlay">
                                  <ButtonGroup>
                                  <Button style={{minWidth:'84%'}} className="btn btn-primary" onClick={() => {this.showDetail(data,'fuzzy')}}>Show Details</Button>
                                  {this.state.add_report_id.indexOf(data.id) == -1 && <Button style={{minWidth:'84%'}} className="btn btn-default" onClick={() => {this.addReport(data)}}>Add to report</Button>}
                                  {this.state.add_report_id.indexOf(data.id) > -1 && <Button style={{minWidth:'84%'}} className="btn btn-danger" onClick={() => {this.removeReport(data)}}>Remove</Button>}
                                  <Button onClick={() => {this.handleSeeMore(data)}} style={{backgroundColor:'#F0E7E7 !important', color:'#345b9e !important', minWidth:'84%', border:'none', boxShadow:'none'}} >Get Realtime info</Button>
                                  </ButtonGroup>
                                  </div>
                                  {data.associated_image && data.applied_for && <p style={{textOverflow:'ellipsis', overflow:'hidden',whiteSpace: 'nowrap', maxWidth:'100%', textAlign:'center', paddingTop:'3px', maxHeight:'25px'}} >{data.applied_for}</p>}
                                  {data.similarity_index>0 && <p>{Math.round(data.similarity_index * 100) / 100}% Similar</p>}
                                  {data.similarity_index==0 && <p>0% Similar</p>}
                                  <div style={{display:'flex'}} >
                                  <p style={{width:'50%', textAlign:'right', paddingRight:'15px'}} ><img src='../../images/fire.png' />{data.opposition_count}</p>
                                  <div style={{borderLeft:'1px solid #DDD',height:'25px'}}></div>
                                  <p style={{width:'50%', textAlign:'left', paddingLeft:'15px'}} ><img src='../../images/clipboard.png' /> {data.opposition_notice_count}</p>
                                  </div>
                   
                               </div>
                                     </div>
                                     <div className="back face center">
                                      <div className="row">
                                        <div className="col-sm-12" style={{paddingLeft:'0'}}>
                                         <div className="col-sm-10" style={{paddingLeft:'5px', paddingRight:'0'}} >
                                           <p style={{fontSize:'12px', textAlign:'left', color:'black', fontStyle:'italic', fontWeight:'600 !important'}} >*Last updated on: {(new Date(data.modified).getDate())+'/' + (new Date(data.modified).getMonth()+1)+'/'+ new Date(data.modified).getFullYear()}</p>
                                         </div>
                                         <div className="col-sm-2">
                                           <i className="fa fa-1.2x fa-chevron-left pull-right" onClick={() => {this.hideDetail(data,'fuzzy')}} aria-hidden="true"></i>
                                         </div>
                                        </div>
                                     </div>
     
                                       <ul>
                                         <li><strong>Status: </strong>{data.status}</li>
                                         <li style={{whiteSpace:'nowrap',overflowX:'hidden'}} ><strong>Class: </strong>{data.associated_class.sort((a,b) => a - b).toString()}</li>
                                         <table style={{marginBottom:'0 !important'}} className="table card-table">
                                         <tbody>
                                         <tr style={{textAlign:'left !important'}}>
                                            {data.proprietor && data.proprietor.length>0 && data.proprietor[0].name && <td style={{width:'42% !important'}} ><strong>Proprietor:</strong></td>}
                                            {data.proprietor && data.proprietor.length>0 && data.proprietor[0].name && <td style={{maxWidth:'50px !important',textOverflow:'ellipsis !important',overflowX:'hidden !important'}} ><ul style={{paddingTop: '0',maxHeight:'50px !important', overflowY:'scroll' }} >
                                             {data.proprietor.map(propr=> <li style={{cursor:'pointer', color:'#4285f4',background:'#FFF',whiteSpace:'nowrap',overflowX:'hidden'}} onClick={()=> {this.handleProprietorClick(propr)}} >{propr.name}</li>) 
                                            }</ul></td>}
                                          </tr>
                                          </tbody>
                                          </table>
                                        {/*data.proprietor && data.proprietor.length>0 && data.proprietor[0].name && <li><strong>Proprietor: </strong><p2 style={{cursor:'pointer', color:'#4285f4'}} onClick={()=> {this.handleProprietorClick(data)}} >{data.proprietor[0].name}</p2></li>*/}
                                         {data.application_number && <li style={{paddingTop:'10px'}} ><strong>Application: </strong>{data.application_number}</li>}
                                       </ul>
                                       <p style={{cursor:'pointer', color:'#4285f4'}} onClick={() => {this.handleSeeMore(data)}}>Get Realtime info</p>
                                     </div>
                                   </div>
                                   </div>)}

                                {this.state.filterState && this.state.sort_hl && !this.state.sort_lh && this.state.filteredDataFuzzy && this.state.filteredDataFuzzy
                                .concat()
                                .sort((a,b) => b.opposition_notice_count - a.opposition_notice_count)
                                .sort((a,b) => b.opposition_count - a.opposition_count)
                                .map(data => 
                                <div id="f1_container" className="col-sm-4">
                                   <div id="f1_card" className={this.state['isFlipped'+data.id+'fuzzy']?"shadow flip":"shadow"}>
                                     <div className="front face">
                                       <div className="elements-flip">
                                       <div></div>
                                  {!data.associated_image && <h3 style={{maxHeight:'95px', textOverflow:'ellipses', overflow:'hidden'}}>{data.applied_for}</h3>}
                                  {data.associated_image && <img style={{height:'50%', width:'100% !important'}} src={data.associated_image} />}
                                  <hr size="2" style={{marginBottom:'0 !important'}} />
                                  <div className="overlay">
                                  <ButtonGroup>
                                  <Button style={{minWidth:'84%'}} className="btn btn-primary" onClick={() => {this.showDetail(data,'fuzzy')}}>Show Details</Button>
                                  {this.state.add_report_id.indexOf(data.id) == -1 && <Button style={{minWidth:'84%'}} className="btn btn-default" onClick={() => {this.addReport(data)}}>Add to report</Button>}
                                  {this.state.add_report_id.indexOf(data.id) > -1 && <Button style={{minWidth:'84%'}} className="btn btn-danger" onClick={() => {this.removeReport(data)}}>Remove</Button>}
                                  <Button onClick={() => {this.handleSeeMore(data)}} style={{backgroundColor:'#F0E7E7 !important', color:'#345b9e !important', minWidth:'84%', border:'none', boxShadow:'none'}} >Get Realtime info</Button>
                                  </ButtonGroup>
                                  </div>
                                  {data.associated_image && data.applied_for && <p style={{textOverflow:'ellipsis', overflow:'hidden',whiteSpace: 'nowrap', maxWidth:'100%', textAlign:'center', paddingTop:'3px', maxHeight:'25px'}} >{data.applied_for}</p>}
                                  {data.similarity_index>0 && <p>{Math.round(data.similarity_index * 100) / 100}% Similar</p>}
                                  {data.similarity_index==0 && <p>0% Similar</p>}
                                  <div style={{display:'flex'}} >
                                  <p style={{width:'50%', textAlign:'right', paddingRight:'15px'}} ><img src='../../images/fire.png' />{data.opposition_count}</p>
                                  <div style={{borderLeft:'1px solid #DDD',height:'25px'}}></div>
                                  <p style={{width:'50%', textAlign:'left', paddingLeft:'15px'}} ><img src='../../images/clipboard.png' /> {data.opposition_notice_count}</p>
                                  </div>
                   
                               </div>
                                     </div>
                                     <div className="back face center">
                                      <div className="row">
                                        <div className="col-sm-12" style={{paddingLeft:'0'}}>
                                         <div className="col-sm-10" style={{paddingLeft:'5px', paddingRight:'0'}} >
                                           <p style={{fontSize:'12px', textAlign:'left', color:'black', fontStyle:'italic', fontWeight:'600 !important'}} >*Last updated on: {(new Date(data.modified).getDate())+'/' + (new Date(data.modified).getMonth()+1)+'/'+ new Date(data.modified).getFullYear()}</p>
                                         </div>
                                         <div className="col-sm-2">
                                           <i className="fa fa-1.2x fa-chevron-left pull-right" onClick={() => {this.hideDetail(data,'fuzzy')}} aria-hidden="true"></i>
                                         </div>
                                        </div>
                                     </div>
     
                                       <ul>
                                         <li><strong>Status: </strong>{data.status}</li>
                                         <li style={{whiteSpace:'nowrap',overflowX:'hidden'}} ><strong>Class: </strong>{data.associated_class.sort((a,b) => a - b).toString()}</li>
                                         <table style={{marginBottom:'0 !important'}} className="table card-table">
                                         <tbody>
                                         <tr style={{textAlign:'left !important'}}>
                                            {data.proprietor && data.proprietor.length>0 && data.proprietor[0].name && <td style={{width:'42% !important'}} ><strong>Proprietor:</strong></td>}
                                            {data.proprietor && data.proprietor.length>0 && data.proprietor[0].name && <td style={{maxWidth:'50px !important',textOverflow:'ellipsis !important',overflowX:'hidden !important'}} ><ul style={{paddingTop: '0',maxHeight:'50px !important', overflowY:'scroll' }} >
                                             {data.proprietor.map(propr=> <li style={{cursor:'pointer', color:'#4285f4',background:'#FFF',whiteSpace:'nowrap',overflowX:'hidden'}} onClick={()=> {this.handleProprietorClick(propr)}} >{propr.name}</li>) 
                                            }</ul></td>}
                                          </tr>
                                          </tbody>
                                          </table>
                                        {/*data.proprietor && data.proprietor.length>0 && data.proprietor[0].name && <li><strong>Proprietor: </strong><p2 style={{cursor:'pointer', color:'#4285f4'}} onClick={()=> {this.handleProprietorClick(data)}} >{data.proprietor[0].name}</p2></li>*/}
                                         {data.application_number && <li style={{paddingTop:'10px'}} ><strong>Application: </strong>{data.application_number}</li>}
                                       </ul>
                                       <p style={{cursor:'pointer', color:'#4285f4'}} onClick={() => {this.handleSeeMore(data)}}>Get Realtime info</p>
                                     </div>
                                   </div>
                                   </div>)}

                                {!this.state.filterState && !this.state.sort_hl && this.state.sort_lh && this.state.filteredDataFuzzy && this.props.fuzzy_results.search_result
                                .concat()
                                .sort((a,b) => a.opposition_notice_count - b.opposition_notice_count)
                                .sort((a,b) => a.opposition_count - b.opposition_count)
                                .map(data => 
                                <div id="f1_container" className="col-sm-4">
                                   <div id="f1_card" className={this.state['isFlipped'+data.id+'fuzzy']?"shadow flip":"shadow"}>
                                     <div className="front face">
                                       <div className="elements-flip">
                                       <div></div>
                                  {!data.associated_image && <h3 style={{maxHeight:'95px', textOverflow:'ellipses', overflow:'hidden'}}>{data.applied_for}</h3>}
                                  {data.associated_image && <img style={{height:'50%', width:'100% !important'}} src={data.associated_image} />}
                                  <hr size="2" style={{marginBottom:'0 !important'}} />
                                  <div className="overlay">
                                  <ButtonGroup>
                                  <Button style={{minWidth:'84%'}} className="btn btn-primary" onClick={() => {this.showDetail(data,'fuzzy')}}>Show Details</Button>
                                  {this.state.add_report_id.indexOf(data.id) == -1 && <Button style={{minWidth:'84%'}} className="btn btn-default" onClick={() => {this.addReport(data)}}>Add to report</Button>}
                                  {this.state.add_report_id.indexOf(data.id) > -1 && <Button style={{minWidth:'84%'}} className="btn btn-danger" onClick={() => {this.removeReport(data)}}>Remove</Button>}
                                  <Button onClick={() => {this.handleSeeMore(data)}} style={{backgroundColor:'#F0E7E7 !important', color:'#345b9e !important', minWidth:'84%', border:'none', boxShadow:'none'}} >Get Realtime info</Button>
                                  </ButtonGroup>
                                  </div>
                                  {data.associated_image && data.applied_for && <p style={{textOverflow:'ellipsis', overflow:'hidden',whiteSpace: 'nowrap', maxWidth:'100%', textAlign:'center', paddingTop:'3px', maxHeight:'25px'}} >{data.applied_for}</p>}
                                  {data.similarity_index>0 && <p>{Math.round(data.similarity_index * 100) / 100}% Similar</p>}
                                  {data.similarity_index==0 && <p>0% Similar</p>}
                                  <div style={{display:'flex'}} >
                                  <p style={{width:'50%', textAlign:'right', paddingRight:'15px'}} ><img src='../../images/fire.png' />{data.opposition_count}</p>
                                  <div style={{borderLeft:'1px solid #DDD',height:'25px'}}></div>
                                  <p style={{width:'50%', textAlign:'left', paddingLeft:'15px'}} ><img src='../../images/clipboard.png' /> {data.opposition_notice_count}</p>
                                  </div>
                   
                               </div>
                                     </div>
                                     <div className="back face center">
                                      <div className="row">
                                        <div className="col-sm-12" style={{paddingLeft:'0'}}>
                                         <div className="col-sm-10" style={{paddingLeft:'5px', paddingRight:'0'}} >
                                           <p style={{fontSize:'12px', textAlign:'left', color:'black', fontStyle:'italic', fontWeight:'600 !important'}} >*Last updated on: {(new Date(data.modified).getDate())+'/' + (new Date(data.modified).getMonth()+1)+'/'+ new Date(data.modified).getFullYear()}</p>
                                         </div>
                                         <div className="col-sm-2">
                                           <i className="fa fa-1.2x fa-chevron-left pull-right" onClick={() => {this.hideDetail(data,'fuzzy')}} aria-hidden="true"></i>
                                         </div>
                                        </div>
                                     </div>
     
                                       <ul>
                                         <li><strong>Status: </strong>{data.status}</li>
                                         <li style={{whiteSpace:'nowrap',overflowX:'hidden'}} ><strong>Class: </strong>{data.associated_class.sort((a,b) => a - b).toString()}</li>
                                         <table style={{marginBottom:'0 !important'}} className="table card-table">
                                         <tbody>
                                         <tr style={{textAlign:'left !important'}}>
                                            {data.proprietor && data.proprietor.length>0 && data.proprietor[0].name && <td style={{width:'42% !important'}} ><strong>Proprietor:</strong></td>}
                                            {data.proprietor && data.proprietor.length>0 && data.proprietor[0].name && <td style={{maxWidth:'50px !important',textOverflow:'ellipsis !important',overflowX:'hidden !important'}} ><ul style={{paddingTop: '0',maxHeight:'50px !important', overflowY:'scroll' }} >
                                             {data.proprietor.map(propr=> <li style={{cursor:'pointer', color:'#4285f4',background:'#FFF',whiteSpace:'nowrap',overflowX:'hidden'}} onClick={()=> {this.handleProprietorClick(propr)}} >{propr.name}</li>) 
                                            }</ul></td>}
                                          </tr>
                                          </tbody>
                                          </table>
                                        {/*data.proprietor && data.proprietor.length>0 && data.proprietor[0].name && <li><strong>Proprietor: </strong><p2 style={{cursor:'pointer', color:'#4285f4'}} onClick={()=> {this.handleProprietorClick(data)}} >{data.proprietor[0].name}</p2></li>*/}
                                         {data.application_number && <li style={{paddingTop:'10px'}} ><strong>Application: </strong>{data.application_number}</li>}
                                       </ul>
                                       <p style={{cursor:'pointer', color:'#4285f4'}} onClick={() => {this.handleSeeMore(data)}}>Get Realtime info</p>
                                     </div>
                                   </div>
                                   </div>)}

                                {this.state.filterState && !this.state.sort_hl && this.state.sort_lh && this.state.filteredDataFuzzy && this.state.filteredDataFuzzy
                                .concat()
                                .sort((a,b) => a.opposition_notice_count - b.opposition_notice_count)
                                .sort((a,b) => a.opposition_count - b.opposition_count)
                                .map(data => 
                                <div id="f1_container" className="col-sm-4">
                                   <div id="f1_card" className={this.state['isFlipped'+data.id+'fuzzy']?"shadow flip":"shadow"}>
                                     <div className="front face">
                                       <div className="elements-flip">
                                       <div></div>
                                  {!data.associated_image && <h3 style={{maxHeight:'95px', textOverflow:'ellipses', overflow:'hidden'}}>{data.applied_for}</h3>}
                                  {data.associated_image && <img style={{height:'50%', width:'100% !important'}} src={data.associated_image} />}
                                  <hr size="2" style={{marginBottom:'0 !important'}} />
                                  <div className="overlay">
                                  <ButtonGroup>
                                  <Button style={{minWidth:'84%'}} className="btn btn-primary" onClick={() => {this.showDetail(data,'fuzzy')}}>Show Details</Button>
                                  {this.state.add_report_id.indexOf(data.id) == -1 && <Button style={{minWidth:'84%'}} className="btn btn-default" onClick={() => {this.addReport(data)}}>Add to report</Button>}
                                  {this.state.add_report_id.indexOf(data.id) > -1 && <Button style={{minWidth:'84%'}} className="btn btn-danger" onClick={() => {this.removeReport(data)}}>Remove</Button>}
                                  <Button onClick={() => {this.handleSeeMore(data)}} style={{backgroundColor:'#F0E7E7 !important', color:'#345b9e !important', minWidth:'84%', border:'none', boxShadow:'none'}} >Get Realtime info</Button>
                                  </ButtonGroup>
                                  </div>
                                  {data.associated_image && data.applied_for && <p style={{textOverflow:'ellipsis', overflow:'hidden',whiteSpace: 'nowrap', maxWidth:'100%', textAlign:'center', paddingTop:'3px', maxHeight:'25px'}} >{data.applied_for}</p>}
                                  {data.similarity_index>0 && <p>{Math.round(data.similarity_index * 100) / 100}% Similar</p>}
                                  {data.similarity_index==0 && <p>0% Similar</p>}
                                  <div style={{display:'flex'}} >
                                  <p style={{width:'50%', textAlign:'right', paddingRight:'15px'}} ><img src='../../images/fire.png' />{data.opposition_count}</p>
                                  <div style={{borderLeft:'1px solid #DDD',height:'25px'}}></div>
                                  <p style={{width:'50%', textAlign:'left', paddingLeft:'15px'}} ><img src='../../images/clipboard.png' /> {data.opposition_notice_count}</p>
                                  </div>
                   
                               </div>
                                     </div>
                                     <div className="back face center">
                                      <div className="row">
                                        <div className="col-sm-12" style={{paddingLeft:'0'}}>
                                         <div className="col-sm-10" style={{paddingLeft:'5px', paddingRight:'0'}} >
                                           <p style={{fontSize:'12px', textAlign:'left', color:'black', fontStyle:'italic', fontWeight:'600 !important'}} >*Last updated on: {(new Date(data.modified).getDate())+'/' + (new Date(data.modified).getMonth()+1)+'/'+ new Date(data.modified).getFullYear()}</p>
                                         </div>
                                         <div className="col-sm-2">
                                           <i className="fa fa-1.2x fa-chevron-left pull-right" onClick={() => {this.hideDetail(data,'fuzzy')}} aria-hidden="true"></i>
                                         </div>
                                        </div>
                                     </div>
     
                                       <ul>
                                         <li><strong>Status: </strong>{data.status}</li>
                                         <li style={{whiteSpace:'nowrap',overflowX:'hidden'}} ><strong>Class: </strong>{data.associated_class.sort((a,b) => a - b).toString()}</li>
                                         <table style={{marginBottom:'0 !important'}} className="table card-table">
                                         <tbody>
                                         <tr style={{textAlign:'left !important'}}>
                                            {data.proprietor && data.proprietor.length>0 && data.proprietor[0].name && <td style={{width:'42% !important'}} ><strong>Proprietor:</strong></td>}
                                            {data.proprietor && data.proprietor.length>0 && data.proprietor[0].name && <td style={{maxWidth:'50px !important',textOverflow:'ellipsis !important',overflowX:'hidden !important'}} ><ul style={{paddingTop: '0',maxHeight:'50px !important', overflowY:'scroll' }} >
                                             {data.proprietor.map(propr=> <li style={{cursor:'pointer', color:'#4285f4',background:'#FFF',whiteSpace:'nowrap',overflowX:'hidden'}} onClick={()=> {this.handleProprietorClick(propr)}} >{propr.name}</li>) 
                                            }</ul></td>}
                                          </tr>
                                          </tbody>
                                          </table>
                                        {/*data.proprietor && data.proprietor.length>0 && data.proprietor[0].name && <li><strong>Proprietor: </strong><p2 style={{cursor:'pointer', color:'#4285f4'}} onClick={()=> {this.handleProprietorClick(data)}} >{data.proprietor[0].name}</p2></li>*/}
                                         {data.application_number && <li style={{paddingTop:'10px'}} ><strong>Application: </strong>{data.application_number}</li>}
                                       </ul>
                                       <p style={{cursor:'pointer', color:'#4285f4'}} onClick={() => {this.handleSeeMore(data)}}>Get Realtime info</p>
                                     </div>
                                   </div>
                                   </div>)}

                              {this.state.filterState && this.props.fuzzy_results.search_result.length>0  && this.state.filteredDataFuzzy && this.state.filteredDataFuzzy.length==0 &&
                                <img style={{paddingLeft:'10%'}} src="../../images/empty_state.png" />
                                }

                                {this.props.fuzzy_results && this.props.fuzzy_results.search_result.length==0 && <div style={{textAlign:'center'}} className="col-sm-12">
                              <img style={{paddingLeft:'10%'}} src="../../images/empty_state.png" />
                            </div>}

                          </div> 
                      <div className="row" style={{background:'#FFF', paddingBottom:'30px', paddingTop:'30px'}}>
                           <div className="col-sm-12" style={{textAlign:'center'}}>
                             {this.props.fuzzy_results && !this.props.page_end_fuzzy && this.props.fuzzy_results.search_result.length>50 &&  <div className="col-sm-3 col-sm-offset-4">
                              {!this.state.loadBtn && <button onClick={this.handleLoadMoreFuzzy.bind(this)} style={{fontSize:'20px'}} className="btn btn-default">Load more</button>}
                              {this.state.loadBtn && <button style={{fontSize:'20px'}} className="btn btn-default">Loading...</button>}
                            </div>}
                            
                            {this.props.result && this.props.page_end_fuzzy && <div className="col-sm-5 col-sm-offset-3">
                              <h3>No more results to show.</h3>
                            </div>}
                           </div>
                        </div>
                           </div>                          
                        </div>
                    </TabPanel>

                  {/*--------INITIALS RESULTS SECTION--------*/}
                    {this.props.initials_results && localStorage.getItem('flash_initial')=='true' && <TabPanel>
                      <div className="row">
                           <div className="col-sm-12" style={{background:'#FFF', marginLeft: '2.4%'}} >
                              <div className="elements-area">
                              {!this.props.initials_results && <div className="col-sm-12" style={{textAlign:'center'}} ><img style={{textAlign:'center'}} src="../../images/loader_list.gif" /></div>}
                              {!this.state.filterState && !this.state.sort_hl && !this.state.sort_lh && this.props.initials_results && this.props.initials_results.search_result
                                .map(data =>  
                                <div id="f1_container" className="col-sm-4">
                                   <div id="f1_card" className={this.state['isFlipped'+data.id+'initials']?"shadow flip":"shadow"}>
                                     <div className="front face">
                                       <div className="elements-flip">
                                       <div></div>
                                  {!data.associated_image && data.applied_for && <h3 style={{maxHeight:'95px', textOverflow:'ellipsis', overflow:'hidden'}}>{data.applied_for}</h3>}
                                  {data.associated_image && <img style={{height:'50%', width:'100% !important'}} src={this.siteImg(data.associated_image)} />}
                                  <hr size="2" style={{marginBottom:'0 !important'}} />
                                  <div className="overlay">
                                  <ButtonGroup>
                                  <Button style={{minWidth:'84%'}} className="btn btn-primary" onClick={() => {this.showDetail(data,'initials')}}>Show Details</Button>
                                  {this.state.add_report_id.indexOf(data.id) == -1 && <Button style={{minWidth:'84%'}} className="btn btn-default" onClick={() => {this.addReport(data)}}>Add to report</Button>}
                                  {this.state.add_report_id.indexOf(data.id) > -1 && <Button style={{minWidth:'84%'}} className="btn btn-danger" onClick={() => {this.removeReport(data)}}>Remove</Button>}
                                  <Button onClick={() => {this.handleSeeMore(data)}} style={{backgroundColor:'#F0E7E7 !important', color:'#345b9e !important', minWidth:'84%', border:'none', boxShadow:'none'}} >Get Realtime info</Button>
                                  </ButtonGroup>
                                  </div>
                                  {data.associated_image && data.applied_for && <p style={{textOverflow:'ellipsis', overflow:'hidden',whiteSpace: 'nowrap', maxWidth:'100%', textAlign:'center', paddingTop:'3px', maxHeight:'25px'}} >{data.applied_for}</p>}
                                  {data.similarity_index>0 && <p>{Math.round(data.similarity_index * 100) / 100}% Similar</p>}
                                  {data.similarity_index==0 && <p>0% Similar</p>}
                                  <div style={{display:'flex'}} >
                                  <p style={{width:'50%', textAlign:'right', paddingRight:'15px'}} ><img src='../../images/fire.png' />{data.opposition_count}</p>
                                  <div style={{borderLeft:'1px solid #DDD',height:'25px'}}></div>
                                  <p style={{width:'50%', textAlign:'left', paddingLeft:'15px'}} ><img src='../../images/clipboard.png' /> {data.opposition_notice_count}</p>
                                  </div>
                                                    
                   
                               </div>
                                     </div>
                                     <div className="back face center">
                                      <div className="row">
                                        <div className="col-sm-12" style={{paddingLeft:'0'}}>
                                         <div className="col-sm-10" style={{paddingLeft:'5px', paddingRight:'0'}} >
                                           <p style={{fontSize:'12px', textAlign:'left', color:'black', fontStyle:'italic', fontWeight:'600 !important'}} >*Last updated on: {(new Date(data.modified).getDate())+'/' + (new Date(data.modified).getMonth()+1)+'/'+ new Date(data.modified).getFullYear()}</p>
                                         </div>
                                         <div className="col-sm-2">
                                           <i className="fa fa-1.2x fa-chevron-left pull-right" onClick={() => {this.hideDetail(data,'initials')}} aria-hidden="true"></i>
                                         </div>
                                        </div>
                                     </div>
     
                                       <ul>
                                         <li><strong>Status: </strong>{data.status}</li>
                                         <li style={{whiteSpace:'nowrap',overflowX:'hidden'}} ><strong>Class: </strong>{data.associated_class.sort((a,b) => a - b).toString()}</li>
                                         <table style={{marginBottom:'0 !important'}} className="table card-table">
                                         <tbody>
                                         <tr style={{textAlign:'left !important'}}>
                                            {data.proprietor && data.proprietor.length>0 && data.proprietor[0].name && <td style={{width:'42% !important'}} ><strong>Proprietor:</strong></td>}
                                            {data.proprietor && data.proprietor.length>0 && data.proprietor[0].name && <td style={{maxWidth:'50px !important',textOverflow:'ellipsis !important',overflowX:'hidden !important'}} ><ul style={{paddingTop: '0',maxHeight:'50px !important', overflowY:'scroll' }} >
                                             {data.proprietor.map(propr=> <li style={{cursor:'pointer', color:'#4285f4',background:'#FFF',whiteSpace:'nowrap',overflowX:'hidden'}} onClick={()=> {this.handleProprietorClick(propr)}} >{propr.name}</li>) 
                                            }</ul></td>}
                                          </tr>
                                          </tbody>
                                          </table>
                                        {/*data.proprietor && data.proprietor.length>0 && data.proprietor[0].name && <li><strong>Proprietor: </strong><p2 style={{cursor:'pointer', color:'#4285f4'}} onClick={()=> {this.handleProprietorClick(data)}} >{data.proprietor[0].name}</p2></li>*/}
                                         {data.application_number && <li style={{paddingTop:'10px'}} ><strong>Application: </strong>{data.application_number}</li>}
                                       </ul>
                                       <p style={{cursor:'pointer', color:'#4285f4'}} onClick={() => {this.handleSeeMore(data)}}>Get Realtime info</p>
                                     </div>
                                   </div>
                                   </div>)}

                               {this.state.filterState && !this.state.sort_hl && !this.state.sort_lh && this.state.filteredDataInitials && this.state.filteredDataInitials
                                .map(data => 
                                <div id="f1_container" className="col-sm-4">
                                   <div id="f1_card" className={this.state['isFlipped'+data.id+'initials']?"shadow flip":"shadow"}>
                                     <div className="front face">
                                       <div className="elements-flip">
                                       <div></div>
                                  {!data.associated_image && <h3 style={{maxHeight:'95px', textOverflow:'ellipses', overflow:'hidden'}}>{data.applied_for}</h3>}
                                  {data.associated_image && <img style={{height:'50%', width:'100% !important'}} src={data.associated_image} />}
                                  <hr size="2" style={{marginBottom:'0 !important'}} />
                                  <div className="overlay">
                                  <ButtonGroup>
                                  <Button style={{minWidth:'84%'}} className="btn btn-primary" onClick={() => {this.showDetail(data,'initials')}}>Show Details</Button>
                                  {this.state.add_report_id.indexOf(data.id) == -1 && <Button style={{minWidth:'84%'}} className="btn btn-default" onClick={() => {this.addReport(data)}}>Add to report</Button>}
                                  {this.state.add_report_id.indexOf(data.id) > -1 && <Button style={{minWidth:'84%'}} className="btn btn-danger" onClick={() => {this.removeReport(data)}}>Remove</Button>}
                                  <Button onClick={() => {this.handleSeeMore(data)}} style={{backgroundColor:'#F0E7E7 !important', color:'#345b9e !important', minWidth:'84%', border:'none', boxShadow:'none'}} >Get Realtime info</Button>
                                  </ButtonGroup>
                                  </div>
                                  {data.associated_image && data.applied_for && <p style={{textOverflow:'ellipsis', overflow:'hidden',whiteSpace: 'nowrap', maxWidth:'100%', textAlign:'center', paddingTop:'3px', maxHeight:'25px'}} >{data.applied_for}</p>}
                                  {data.similarity_index>0 && <p>{Math.round(data.similarity_index * 100) / 100}% Similar</p>}
                                  {data.similarity_index==0 && <p>0% Similar</p>}
                                  <div style={{display:'flex'}} >
                                  <p style={{width:'50%', textAlign:'right', paddingRight:'15px'}} ><img src='../../images/fire.png' />{data.opposition_count}</p>
                                  <div style={{borderLeft:'1px solid #DDD',height:'25px'}}></div>
                                  <p style={{width:'50%', textAlign:'left', paddingLeft:'15px'}} ><img src='../../images/clipboard.png' /> {data.opposition_notice_count}</p>
                                  </div>
                   
                               </div>
                                     </div>
                                     <div className="back face center">
                                      <div className="row">
                                        <div className="col-sm-12" style={{paddingLeft:'0'}}>
                                         <div className="col-sm-10" style={{paddingLeft:'5px', paddingRight:'0'}} >
                                           <p style={{fontSize:'12px', textAlign:'left', color:'black', fontStyle:'italic', fontWeight:'600 !important'}} >*Last updated on: {(new Date(data.modified).getDate())+'/' + (new Date(data.modified).getMonth()+1)+'/'+ new Date(data.modified).getFullYear()}</p>
                                         </div>
                                         <div className="col-sm-2">
                                           <i className="fa fa-1.2x fa-chevron-left pull-right" onClick={() => {this.hideDetail(data,'initials')}} aria-hidden="true"></i>
                                         </div>
                                        </div>
                                     </div>
     
                                       <ul>
                                         <li><strong>Status: </strong>{data.status}</li>
                                         <li style={{whiteSpace:'nowrap',overflowX:'hidden'}} ><strong>Class: </strong>{data.associated_class.sort((a,b) => a - b).toString()}</li>
                                         <table style={{marginBottom:'0 !important'}} className="table card-table">
                                         <tbody>
                                         <tr style={{textAlign:'left !important'}}>
                                            {data.proprietor && data.proprietor.length>0 && data.proprietor[0].name && <td style={{width:'42% !important'}} ><strong>Proprietor:</strong></td>}
                                            {data.proprietor && data.proprietor.length>0 && data.proprietor[0].name && <td style={{maxWidth:'50px !important',textOverflow:'ellipsis !important',overflowX:'hidden !important'}} ><ul style={{paddingTop: '0',maxHeight:'50px !important', overflowY:'scroll' }} >
                                             {data.proprietor.map(propr=> <li style={{cursor:'pointer', color:'#4285f4',background:'#FFF',whiteSpace:'nowrap',overflowX:'hidden'}} onClick={()=> {this.handleProprietorClick(propr)}} >{propr.name}</li>) 
                                            }</ul></td>}
                                          </tr>
                                          </tbody>
                                          </table>
                                        {/*data.proprietor && data.proprietor.length>0 && data.proprietor[0].name && <li><strong>Proprietor: </strong><p2 style={{cursor:'pointer', color:'#4285f4'}} onClick={()=> {this.handleProprietorClick(data)}} >{data.proprietor[0].name}</p2></li>*/}
                                         {data.application_number && <li style={{paddingTop:'10px'}} ><strong>Application: </strong>{data.application_number}</li>}
                                       </ul>
                                       <p style={{cursor:'pointer', color:'#4285f4'}} onClick={() => {this.handleSeeMore(data)}}>Get Realtime info</p>
                                     </div>
                                   </div>
                                   </div>)}


                                {!this.state.filterState && this.state.sort_hl && !this.state.sort_lh && this.state.filteredDataInitials && this.props.initials_results.search_result
                                .concat()
                                .sort((a,b) => b.opposition_notice_count - a.opposition_notice_count)
                                .sort((a,b) => b.opposition_count - a.opposition_count)
                                .map(data => 
                                <div id="f1_container" className="col-sm-4">
                                   <div id="f1_card" className={this.state['isFlipped'+data.id+'initials']?"shadow flip":"shadow"}>
                                     <div className="front face">
                                       <div className="elements-flip">
                                       <div></div>
                                  {!data.associated_image && <h3 style={{maxHeight:'95px', textOverflow:'ellipses', overflow:'hidden'}}>{data.applied_for}</h3>}
                                  {data.associated_image && <img style={{height:'50%', width:'100% !important'}} src={data.associated_image} />}
                                  <hr size="2" style={{marginBottom:'0 !important'}} />
                                  <div className="overlay">
                                  <ButtonGroup>
                                  <Button style={{minWidth:'84%'}} className="btn btn-primary" onClick={() => {this.showDetail(data,'initials')}}>Show Details</Button>
                                  {this.state.add_report_id.indexOf(data.id) == -1 && <Button style={{minWidth:'84%'}} className="btn btn-default" onClick={() => {this.addReport(data)}}>Add to report</Button>}
                                  {this.state.add_report_id.indexOf(data.id) > -1 && <Button style={{minWidth:'84%'}} className="btn btn-danger" onClick={() => {this.removeReport(data)}}>Remove</Button>}
                                  <Button onClick={() => {this.handleSeeMore(data)}} style={{backgroundColor:'#F0E7E7 !important', color:'#345b9e !important', minWidth:'84%', border:'none', boxShadow:'none'}} >Get Realtime info</Button>
                                  </ButtonGroup>
                                  </div>
                                  {data.associated_image && data.applied_for && <p style={{textOverflow:'ellipsis', overflow:'hidden',whiteSpace: 'nowrap', maxWidth:'100%', textAlign:'center', paddingTop:'3px', maxHeight:'25px'}} >{data.applied_for}</p>}
                                  {data.similarity_index>0 && <p>{Math.round(data.similarity_index * 100) / 100}% Similar</p>}
                                  {data.similarity_index==0 && <p>0% Similar</p>}
                                  <div style={{display:'flex'}} >
                                  <p style={{width:'50%', textAlign:'right', paddingRight:'15px'}} ><img src='../../images/fire.png' />{data.opposition_count}</p>
                                  <div style={{borderLeft:'1px solid #DDD',height:'25px'}}></div>
                                  <p style={{width:'50%', textAlign:'left', paddingLeft:'15px'}} ><img src='../../images/clipboard.png' /> {data.opposition_notice_count}</p>
                                  </div>
                   
                               </div>
                                     </div>
                                     <div className="back face center">
                                      <div className="row">
                                        <div className="col-sm-12" style={{paddingLeft:'0'}}>
                                         <div className="col-sm-10" style={{paddingLeft:'5px', paddingRight:'0'}} >
                                           <p style={{fontSize:'12px', textAlign:'left', color:'black', fontStyle:'italic', fontWeight:'600 !important'}} >*Last updated on: {(new Date(data.modified).getDate())+'/' + (new Date(data.modified).getMonth()+1)+'/'+ new Date(data.modified).getFullYear()}</p>
                                         </div>
                                         <div className="col-sm-2">
                                           <i className="fa fa-1.2x fa-chevron-left pull-right" onClick={() => {this.hideDetail(data,'initials')}} aria-hidden="true"></i>
                                         </div>
                                        </div>
                                     </div>
     
                                       <ul>
                                         <li><strong>Status: </strong>{data.status}</li>
                                         <li style={{whiteSpace:'nowrap',overflowX:'hidden'}} ><strong>Class: </strong>{data.associated_class.sort((a,b) => a - b).toString()}</li>
                                         <table style={{marginBottom:'0 !important'}} className="table card-table">
                                         <tbody>
                                         <tr style={{textAlign:'left !important'}}>
                                            {data.proprietor && data.proprietor.length>0 && data.proprietor[0].name && <td style={{width:'42% !important'}} ><strong>Proprietor:</strong></td>}
                                            {data.proprietor && data.proprietor.length>0 && data.proprietor[0].name && <td style={{maxWidth:'50px !important',textOverflow:'ellipsis !important',overflowX:'hidden !important'}} ><ul style={{paddingTop: '0',maxHeight:'50px !important', overflowY:'scroll' }} >
                                             {data.proprietor.map(propr=> <li style={{cursor:'pointer', color:'#4285f4',background:'#FFF',whiteSpace:'nowrap',overflowX:'hidden'}} onClick={()=> {this.handleProprietorClick(propr)}} >{propr.name}</li>) 
                                            }</ul></td>}
                                          </tr>
                                          </tbody>
                                          </table>
                                        {/*data.proprietor && data.proprietor.length>0 && data.proprietor[0].name && <li><strong>Proprietor: </strong><p2 style={{cursor:'pointer', color:'#4285f4'}} onClick={()=> {this.handleProprietorClick(data)}} >{data.proprietor[0].name}</p2></li>*/}
                                         {data.application_number && <li style={{paddingTop:'10px'}} ><strong>Application: </strong>{data.application_number}</li>}
                                       </ul>
                                       <p style={{cursor:'pointer', color:'#4285f4'}} onClick={() => {this.handleSeeMore(data)}}>Get Realtime info</p>
                                     </div>
                                   </div>
                                   </div>)}

                                {this.state.filterState && this.state.sort_hl && !this.state.sort_lh && this.state.filteredDataInitials && this.state.filteredDataInitials
                                .concat()
                                .sort((a,b) => b.opposition_notice_count - a.opposition_notice_count)
                                .sort((a,b) => b.opposition_count - a.opposition_count)
                                .map(data => 
                                <div id="f1_container" className="col-sm-4">
                                   <div id="f1_card" className={this.state['isFlipped'+data.id+'initials']?"shadow flip":"shadow"}>
                                     <div className="front face">
                                       <div className="elements-flip">
                                       <div></div>
                                  {!data.associated_image && <h3 style={{maxHeight:'95px', textOverflow:'ellipses', overflow:'hidden'}}>{data.applied_for}</h3>}
                                  {data.associated_image && <img style={{height:'50%', width:'100% !important'}} src={data.associated_image} />}
                                  <hr size="2" style={{marginBottom:'0 !important'}} />
                                  <div className="overlay">
                                  <ButtonGroup>
                                  <Button style={{minWidth:'84%'}} className="btn btn-primary" onClick={() => {this.showDetail(data,'initials')}}>Show Details</Button>
                                  {this.state.add_report_id.indexOf(data.id) == -1 && <Button style={{minWidth:'84%'}} className="btn btn-default" onClick={() => {this.addReport(data)}}>Add to report</Button>}
                                  {this.state.add_report_id.indexOf(data.id) > -1 && <Button style={{minWidth:'84%'}} className="btn btn-danger" onClick={() => {this.removeReport(data)}}>Remove</Button>}
                                  <Button onClick={() => {this.handleSeeMore(data)}} style={{backgroundColor:'#F0E7E7 !important', color:'#345b9e !important', minWidth:'84%', border:'none', boxShadow:'none'}} >Get Realtime info</Button>
                                  </ButtonGroup>
                                  </div>
                                  {data.associated_image && data.applied_for && <p style={{textOverflow:'ellipsis', overflow:'hidden',whiteSpace: 'nowrap', maxWidth:'100%', textAlign:'center', paddingTop:'3px', maxHeight:'25px'}} >{data.applied_for}</p>}
                                  {data.similarity_index>0 && <p>{Math.round(data.similarity_index * 100) / 100}% Similar</p>}
                                  {data.similarity_index==0 && <p>0% Similar</p>}
                                  <div style={{display:'flex'}} >
                                  <p style={{width:'50%', textAlign:'right', paddingRight:'15px'}} ><img src='../../images/fire.png' />{data.opposition_count}</p>
                                  <div style={{borderLeft:'1px solid #DDD',height:'25px'}}></div>
                                  <p style={{width:'50%', textAlign:'left', paddingLeft:'15px'}} ><img src='../../images/clipboard.png' /> {data.opposition_notice_count}</p>
                                  </div>
                   
                               </div>
                                     </div>
                                     <div className="back face center">
                                      <div className="row">
                                        <div className="col-sm-12" style={{paddingLeft:'0'}}>
                                         <div className="col-sm-10" style={{paddingLeft:'5px', paddingRight:'0'}} >
                                           <p style={{fontSize:'12px', textAlign:'left', color:'black', fontStyle:'italic', fontWeight:'600 !important'}} >*Last updated on: {(new Date(data.modified).getDate())+'/' + (new Date(data.modified).getMonth()+1)+'/'+ new Date(data.modified).getFullYear()}</p>
                                         </div>
                                         <div className="col-sm-2">
                                           <i className="fa fa-1.2x fa-chevron-left pull-right" onClick={() => {this.hideDetail(data,'initials')}} aria-hidden="true"></i>
                                         </div>
                                        </div>
                                     </div>
     
                                       <ul>
                                         <li><strong>Status: </strong>{data.status}</li>
                                         <li style={{whiteSpace:'nowrap',overflowX:'hidden'}} ><strong>Class: </strong>{data.associated_class.sort((a,b) => a - b).toString()}</li>
                                         <table style={{marginBottom:'0 !important'}} className="table card-table">
                                         <tbody>
                                         <tr style={{textAlign:'left !important'}}>
                                            {data.proprietor && data.proprietor.length>0 && data.proprietor[0].name && <td style={{width:'42% !important'}} ><strong>Proprietor:</strong></td>}
                                            {data.proprietor && data.proprietor.length>0 && data.proprietor[0].name && <td style={{maxWidth:'50px !important',textOverflow:'ellipsis !important',overflowX:'hidden !important'}} ><ul style={{paddingTop: '0',maxHeight:'50px !important', overflowY:'scroll' }} >
                                             {data.proprietor.map(propr=> <li style={{cursor:'pointer', color:'#4285f4',background:'#FFF',whiteSpace:'nowrap',overflowX:'hidden'}} onClick={()=> {this.handleProprietorClick(propr)}} >{propr.name}</li>) 
                                            }</ul></td>}
                                          </tr>
                                          </tbody>
                                          </table>
                                        {/*data.proprietor && data.proprietor.length>0 && data.proprietor[0].name && <li><strong>Proprietor: </strong><p2 style={{cursor:'pointer', color:'#4285f4'}} onClick={()=> {this.handleProprietorClick(data)}} >{data.proprietor[0].name}</p2></li>*/}
                                         {data.application_number && <li style={{paddingTop:'10px'}} ><strong>Application: </strong>{data.application_number}</li>}
                                       </ul>
                                       <p style={{cursor:'pointer', color:'#4285f4'}} onClick={() => {this.handleSeeMore(data)}}>Get Realtime info</p>
                                     </div>
                                   </div>
                                   </div>)}

                                {!this.state.filterState && !this.state.sort_hl && this.state.sort_lh && this.state.filteredDataInitials && this.props.initials_results.search_result
                                .concat()
                                .sort((a,b) => a.opposition_notice_count - b.opposition_notice_count)
                                .sort((a,b) => a.opposition_count - b.opposition_count)
                                .map(data => 
                                <div id="f1_container" className="col-sm-4">
                                   <div id="f1_card" className={this.state['isFlipped'+data.id+'initials']?"shadow flip":"shadow"}>
                                     <div className="front face">
                                       <div className="elements-flip">
                                       <div></div>
                                  {!data.associated_image && <h3 style={{maxHeight:'95px', textOverflow:'ellipses', overflow:'hidden'}}>{data.applied_for}</h3>}
                                  {data.associated_image && <img style={{height:'50%', width:'100% !important'}} src={data.associated_image} />}
                                  <hr size="2" style={{marginBottom:'0 !important'}} />
                                  <div className="overlay">
                                  <ButtonGroup>
                                  <Button style={{minWidth:'84%'}} className="btn btn-primary" onClick={() => {this.showDetail(data,'initials')}}>Show Details</Button>
                                  {this.state.add_report_id.indexOf(data.id) == -1 && <Button style={{minWidth:'84%'}} className="btn btn-default" onClick={() => {this.addReport(data)}}>Add to report</Button>}
                                  {this.state.add_report_id.indexOf(data.id) > -1 && <Button style={{minWidth:'84%'}} className="btn btn-danger" onClick={() => {this.removeReport(data)}}>Remove</Button>}
                                  <Button onClick={() => {this.handleSeeMore(data)}} style={{backgroundColor:'#F0E7E7 !important', color:'#345b9e !important', minWidth:'84%', border:'none', boxShadow:'none'}} >Get Realtime info</Button>
                                  </ButtonGroup>
                                  </div>
                                  {data.associated_image && data.applied_for && <p style={{textOverflow:'ellipsis', overflow:'hidden',whiteSpace: 'nowrap', maxWidth:'100%', textAlign:'center', paddingTop:'3px', maxHeight:'25px'}} >{data.applied_for}</p>}
                                  {data.similarity_index>0 && <p>{Math.round(data.similarity_index * 100) / 100}% Similar</p>}
                                  {data.similarity_index==0 && <p>0% Similar</p>}
                                  <div style={{display:'flex'}} >
                                  <p style={{width:'50%', textAlign:'right', paddingRight:'15px'}} ><img src='../../images/fire.png' />{data.opposition_count}</p>
                                  <div style={{borderLeft:'1px solid #DDD',height:'25px'}}></div>
                                  <p style={{width:'50%', textAlign:'left', paddingLeft:'15px'}} ><img src='../../images/clipboard.png' /> {data.opposition_notice_count}</p>
                                  </div>
                   
                               </div>
                                     </div>
                                     <div className="back face center">
                                      <div className="row">
                                        <div className="col-sm-12" style={{paddingLeft:'0'}}>
                                         <div className="col-sm-10" style={{paddingLeft:'5px', paddingRight:'0'}} >
                                           <p style={{fontSize:'12px', textAlign:'left', color:'black', fontStyle:'italic', fontWeight:'600 !important'}} >*Last updated on: {(new Date(data.modified).getDate())+'/' + (new Date(data.modified).getMonth()+1)+'/'+ new Date(data.modified).getFullYear()}</p>
                                         </div>
                                         <div className="col-sm-2">
                                           <i className="fa fa-1.2x fa-chevron-left pull-right" onClick={() => {this.hideDetail(data,'initials')}} aria-hidden="true"></i>
                                         </div>
                                        </div>
                                     </div>
     
                                       <ul>
                                         <li><strong>Status: </strong>{data.status}</li>
                                         <li style={{whiteSpace:'nowrap',overflowX:'hidden'}} ><strong>Class: </strong>{data.associated_class.sort((a,b) => a - b).toString()}</li>
                                         <table style={{marginBottom:'0 !important'}} className="table card-table">
                                         <tbody>
                                         <tr style={{textAlign:'left !important'}}>
                                            {data.proprietor && data.proprietor.length>0 && data.proprietor[0].name && <td style={{width:'42% !important'}} ><strong>Proprietor:</strong></td>}
                                            {data.proprietor && data.proprietor.length>0 && data.proprietor[0].name && <td style={{maxWidth:'50px !important',textOverflow:'ellipsis !important',overflowX:'hidden !important'}} ><ul style={{paddingTop: '0',maxHeight:'50px !important', overflowY:'scroll' }} >
                                             {data.proprietor.map(propr=> <li style={{cursor:'pointer', color:'#4285f4',background:'#FFF',whiteSpace:'nowrap',overflowX:'hidden'}} onClick={()=> {this.handleProprietorClick(propr)}} >{propr.name}</li>) 
                                            }</ul></td>}
                                          </tr>
                                          </tbody>
                                          </table>
                                        {/*data.proprietor && data.proprietor.length>0 && data.proprietor[0].name && <li><strong>Proprietor: </strong><p2 style={{cursor:'pointer', color:'#4285f4'}} onClick={()=> {this.handleProprietorClick(data)}} >{data.proprietor[0].name}</p2></li>*/}
                                         {data.application_number && <li style={{paddingTop:'10px'}} ><strong>Application: </strong>{data.application_number}</li>}
                                       </ul>
                                       <p style={{cursor:'pointer', color:'#4285f4'}} onClick={() => {this.handleSeeMore(data)}}>Get Realtime info</p>
                                     </div>
                                   </div>
                                   </div>)}

                                {this.state.filterState && !this.state.sort_hl && this.state.sort_lh && this.state.filteredDataInitials && this.state.filteredDataInitials
                                .concat()
                                .sort((a,b) => a.opposition_notice_count - b.opposition_notice_count)
                                .sort((a,b) => a.opposition_count - b.opposition_count)
                                .map(data => 
                                <div id="f1_container" className="col-sm-4">
                                   <div id="f1_card" className={this.state['isFlipped'+data.id+'initials']?"shadow flip":"shadow"}>
                                     <div className="front face">
                                       <div className="elements-flip">
                                       <div></div>
                                  {!data.associated_image && <h3 style={{maxHeight:'95px', textOverflow:'ellipses', overflow:'hidden'}}>{data.applied_for}</h3>}
                                  {data.associated_image && <img style={{height:'50%', width:'100% !important'}} src={data.associated_image} />}
                                  <hr size="2" style={{marginBottom:'0 !important'}} />
                                  <div className="overlay">
                                  <ButtonGroup>
                                  <Button style={{minWidth:'84%'}} className="btn btn-primary" onClick={() => {this.showDetail(data,'initials')}}>Show Details</Button>
                                  {this.state.add_report_id.indexOf(data.id) == -1 && <Button style={{minWidth:'84%'}} className="btn btn-default" onClick={() => {this.addReport(data)}}>Add to report</Button>}
                                  {this.state.add_report_id.indexOf(data.id) > -1 && <Button style={{minWidth:'84%'}} className="btn btn-danger" onClick={() => {this.removeReport(data)}}>Remove</Button>}
                                  <Button onClick={() => {this.handleSeeMore(data)}} style={{backgroundColor:'#F0E7E7 !important', color:'#345b9e !important', minWidth:'84%', border:'none', boxShadow:'none'}} >Get Realtime info</Button>
                                  </ButtonGroup>
                                  </div>
                                  {data.associated_image && data.applied_for && <p style={{textOverflow:'ellipsis', overflow:'hidden',whiteSpace: 'nowrap', maxWidth:'100%', textAlign:'center', paddingTop:'3px', maxHeight:'25px'}} >{data.applied_for}</p>}
                                  {data.similarity_index>0 && <p>{Math.round(data.similarity_index * 100) / 100}% Similar</p>}
                                  {data.similarity_index==0 && <p>0% Similar</p>}
                                  <div style={{display:'flex'}} >
                                  <p style={{width:'50%', textAlign:'right', paddingRight:'15px'}} ><img src='../../images/fire.png' />{data.opposition_count}</p>
                                  <div style={{borderLeft:'1px solid #DDD',height:'25px'}}></div>
                                  <p style={{width:'50%', textAlign:'left', paddingLeft:'15px'}} ><img src='../../images/clipboard.png' /> {data.opposition_notice_count}</p>
                                  </div>
                   
                               </div>
                                     </div>
                                     <div className="back face center">
                                      <div className="row">
                                        <div className="col-sm-12" style={{paddingLeft:'0'}}>
                                         <div className="col-sm-10" style={{paddingLeft:'5px', paddingRight:'0'}} >
                                           <p style={{fontSize:'12px', textAlign:'left', color:'black', fontStyle:'italic', fontWeight:'600 !important'}} >*Last updated on: {(new Date(data.modified).getDate())+'/' + (new Date(data.modified).getMonth()+1)+'/'+ new Date(data.modified).getFullYear()}</p>
                                         </div>
                                         <div className="col-sm-2">
                                           <i className="fa fa-1.2x fa-chevron-left pull-right" onClick={() => {this.hideDetail(data,'initials')}} aria-hidden="true"></i>
                                         </div>
                                        </div>
                                     </div>
     
                                       <ul>
                                         <li><strong>Status: </strong>{data.status}</li>
                                         <li style={{whiteSpace:'nowrap',overflowX:'hidden'}} ><strong>Class: </strong>{data.associated_class.sort((a,b) => a - b).toString()}</li>
                                         <table style={{marginBottom:'0 !important'}} className="table card-table">
                                         <tbody>
                                         <tr style={{textAlign:'left !important'}}>
                                            {data.proprietor && data.proprietor.length>0 && data.proprietor[0].name && <td style={{width:'42% !important'}} ><strong>Proprietor:</strong></td>}
                                            {data.proprietor && data.proprietor.length>0 && data.proprietor[0].name && <td style={{maxWidth:'50px !important',textOverflow:'ellipsis !important',overflowX:'hidden !important'}} ><ul style={{paddingTop: '0',maxHeight:'50px !important', overflowY:'scroll' }} >
                                             {data.proprietor.map(propr=> <li style={{cursor:'pointer', color:'#4285f4',background:'#FFF',whiteSpace:'nowrap',overflowX:'hidden'}} onClick={()=> {this.handleProprietorClick(propr)}} >{propr.name}</li>) 
                                            }</ul></td>}
                                          </tr>
                                          </tbody>
                                          </table>
                                        {/*data.proprietor && data.proprietor.length>0 && data.proprietor[0].name && <li><strong>Proprietor: </strong><p2 style={{cursor:'pointer', color:'#4285f4'}} onClick={()=> {this.handleProprietorClick(data)}} >{data.proprietor[0].name}</p2></li>*/}
                                         {data.application_number && <li style={{paddingTop:'10px'}} ><strong>Application: </strong>{data.application_number}</li>}
                                       </ul>
                                       <p style={{cursor:'pointer', color:'#4285f4'}} onClick={() => {this.handleSeeMore(data)}}>Get Realtime info</p>
                                     </div>
                                   </div>
                                   </div>)}

                              {this.state.filterState && this.props.initials_results.search_result.length>0  && this.state.filteredDataInitials && this.state.filteredDataInitials.length==0 &&
                                <img style={{paddingLeft:'10%'}} src="../../images/empty_state.png" />
                                }

                                {this.props.initials_results && this.props.initials_results.search_result.length==0  && <div style={{textAlign:'center'}} className="col-sm-12">
                              <img style={{paddingLeft:'10%'}} src="../../images/empty_state.png" />
                            </div>}
                          </div> 
                      <div className="row" style={{background:'#FFF', paddingBottom:'30px', paddingTop:'30px'}}>
                           <div className="col-sm-12" style={{textAlign:'center'}}>
                             {this.props.initials_results && !this.props.page_end_initials && this.props.initials_results.search_result.length>0 &&  <div className="col-sm-3 col-sm-offset-4">
                              {!this.state.loadBtn && <button onClick={this.handleLoadMoreInitial.bind(this)} style={{fontSize:'20px'}} className="btn btn-default">Load more</button>}
                              {this.state.loadBtn && <button style={{fontSize:'20px'}} className="btn btn-default">Loading...</button>}
                            </div>}
                            {this.props.result && this.props.page_end_initials && <div className="col-sm-5 col-sm-offset-3">
                              <h3>No more results to show.</h3>
                            </div>}
                           </div>
                        </div>
                           </div>                          
                        </div>
                    </TabPanel>}
                  </Tabs>
                  </div>
                </div>

                        </div>
                     </div>   
                    </div>

                 <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
                    <Modal.Body>
                    <div className="row">
                      <div className="col-sm-12">
                        <i onClick={this.close.bind(this)} style={{color:'#4285f4', fontSize:'20px', paddingRight:'10px', cursor:'pointer'}} className="fa fa-times pull-right" aria-hidden="true"></i>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-12 search-modal">
                        <h3>What would you like to do?</h3>
                      </div>
                    </div>
                      <div className="row">
                        <div className="col-sm-12 modal-mark">
                           <div onClick={this.handleUrgentReport.bind(this)} className="rep_card" >
                             <h5 style={{textAlign:'center',width:'100%',fontSize:'19px'}} >Urgent Report</h5>
                             <p style={{color:'#525252',fontSize:'15px',textAlign:'center'}} >Contains last updated data</p>
                           </div>
                           <div className="verticle-line"></div>
                           <div onClick={this.handleRealtimeReport.bind(this)} className="rep_card">
                            <h5 style={{textAlign:'center',width:'100%', fontSize:'19px'}} >Realtime Report</h5>
                            <p style={{color:'#525252',fontSize:'15px',textAlign:'center'}}>Contains realtime data</p>
                          </div>
                          </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-12 search-modal">
                          <p style={{paddingTop:'15px'}} >*Note : You can generate a realtime report for the same mark once every 4 hours</p>
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
                        {this.state.markReport.length>0 && <h3 style={{textAlign:'center', paddingBottom:'30px', color:'#525252', paddingLeft:'15px !important', paddingRight:'15px !important'}}>A report for {this.props.params.text} already exists with {this.state.markReport[0].selected_marks.length} marks.</h3>}
                        <div className="row">
                        <div className="col-sm-12 modal-mark">
                           <div onClick={this.openPreviousReport.bind(this)} style={{width:'45% !important',cursor:'pointer'}} className="card" >
                             Delete the previous report
                           </div>
                           <div className="verticle-line"></div>
                           <div className="card" style={{paddingRight:'15px !important',width:'47% !important',cursor:'pointer'}}  onClick={this.patchMarks.bind(this)}>
                            Add marks to existing report
                          </div>
                          </div>
                        </div>
                        <br/>
                        <button style={{backgroundColor:'#FFF !important',border:'none !important',boxShadow:'none !important', marginLeft:'-4% !important'}} onClick={this.closeRT.bind(this)} style={{borderRadius:'0'}} className="btn btn-default">Close</button>
                      </div>
                    </div>
                    </Modal.Body>
                </Modal>

                <Modal show={this.state.openPrevDown} onHide={this.closePreviousReport.bind(this)} >
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
                      <button style={{background:'#FFF', border:'none', color:'#4285f4', backgroundImage:'none'}} onClick={this.GoBack.bind(this)} className="btn btn-default">Go Back</button>
                        </div>
                      </div>
                    </Modal.Body>
                  </Modal> 

                <Modal show={this.state.showModal2} onHide={this.close2.bind(this)}>
                    <Modal.Body>
                    <div className="row">
                      <div className="col-sm-12">
                        <i onClick={this.handleModalClose.bind(this)} style={{color:'#4285f4', fontSize:'20px', paddingRight:'10px', cursor:'pointer'}} className="fa fa-times pull-right" aria-hidden="true"></i>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-12 search-modal">
                        <h3>Create Report</h3>
                      </div>
                    </div>
                      <div className="row">
                        <div className="col-sm-12">
                        <div className="report-form">
                            <form class="form-horizontal">
                          <div class="form-group">
                            <div class="col-sm-12">
                              <input ref="create_report" type="email" class="form-control" id="email" placeholder="Report name" />
                            </div>
                          </div>
                          <div class="form-group">
                            <div class="col-sm-offset-2 col-sm-10">
                              <Button onClick={this.close2.bind(this)} class="btn btn-primary">Create</Button>
                            </div>
                          </div>
                        </form> 
                     </div>
                      </div>
                      </div>
                    </Modal.Body>
                </Modal>
              </TabPanel>
              <TabPanel>
                <div className="row">
                     <div className=" result-analysis col-sm-12">
                     <h3>Result Analysis for {this.props.params.text}</h3>
                     <p>Below graphs are calculated based on your search results</p>
                        <div className="row">
                         <div className="col-lg-12 col-xl-4">
                             <div className="card-box">
                                 <div className="widget-chart text-center">
                                     <ReactHighcharts config = {config}></ReactHighcharts>   
                                 </div>
                             </div>
                         </div>
                     </div>
                      <div className="row">
                         <div className="col-lg-6 col-xl-2">
                             <div className="card-box">
                                 <div className="widget-chart text-center">
                                     <ReactHighcharts config = {config2}></ReactHighcharts>   
                                 </div>
                             </div>
                         </div>
                         <div className="col-lg-6 col-xl-2">
                             <div className="card-box">
                                 <div className="widget-chart text-center">
                                     <ReactHighcharts config = {config3}></ReactHighcharts>   
                                 </div>
                             </div>
                         </div>
                     </div>
                     </div>   
                    </div>
              </TabPanel>
            </Tabs>
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
            <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
            {/*{this.state.markReport.length>0 && <ReactInterval timeout={1000} enabled={!this.state.markReport[0].available}
                      callback={() => this.FetchReport()} />}*/}
           
          </div>            
                      }
          { this.state.global_search &&
            
    <div className="global_result_search container-fluid">
     <i className="fa fa-times pull-right" onClick={this.handleCloseSearch.bind(this)} aria-hidden="true"></i>
      <div className="row">
        <GlobalSearch />
      </div>
    </div>
            
            }
    </div>}
   </div> 
    );
  }
}

function mapStateToProps(state) {
  console.log('State check:', state);
   return ({
    result: state.result.result, 
    vulnerability: state.search.vulnerability, 
    page_end:state.result.page_end,
    page_end_context:state.result.page_end_context,
    page_end_wild:state.result.page_end_wild,
    page_end_fuzzy:state.result.page_end_fuzzy, 
    page_end_initials:state.result.page_end_initials,
    report: state.report.report, 
    ipindia:state.report.ipindia, 
    wildcard_results:state.result.search_flash_wild, 
    contextual_results:state.result.search_flash_context, 
    fuzzy_results:state.result.search_flash_fuzzy,
    initials_results:state.result.search_flash_initials });
}

function mapDispatchToProps(dispatch) {
  return  {
      casesAction: bindActionCreators(casesAction, dispatch)
    };
  
}
export default connect(mapStateToProps,mapDispatchToProps)(FlashResults);

    // <input className="pull-right" type="text" ref="search_input" />
          //       <div className="sk-hits-grid-hit sk-hits-grid__item" data-qa="hit" data-reactid=".0.0.0.1.1.1.$tt0468569">
          //   <i href="http://www.imdb.com/title/tt0468569" target="_blank" data-reactid=".0.0.0.1.1.1.$tt0468569.0">
          //   <h3>Axis Bank</h3>
          //   <div data-qa="title" className="sk-hits-grid-hit__title" data-reactid=".0.0.0.1.1.1.$tt0468569.0.1" >80% Similar</div>
          // <div style="padding-top: 29px;text-align: center;">
          // <img src="../../images/fire.png" />
          // <p>89</p>
          // </div>
          // </i>
          // </div>



               //           { this.state.add_state &&
               //  <Button>Add to report</Button>
               // }


                              // {this.props.result && this.state.filtereData && this.state.filteredResult && this.state.filtereData.map(data => 
                              //   <div id="f1_container" className="col-sm-4">
                              //      <div id="f1_card" className={this.state['isFlipped'+data.id]?"shadow flip":"shadow"}>
                              //        <div className="front face">
                              //          <div className="elements-flip">
                              //     {!data.associated_image && <h3>{data.applied_for}</h3>}
                              //     {data.associated_image && <img style={{height:'50%', width:'100% !important'}} src={data.associated_image} />}
                              //     <hr size="2" />
                              //     <div className="overlay">
                              //     <ButtonGroup>
                              //     <Button style={{minWidth:'84%'}} className="btn btn-primary" onClick={() => {this.showDetail(data)}}>Show Details</Button>
                              //     {!this.state['delete_report'+data.id] && <Button style={{minWidth:'84%'}} className="btn btn-default" onClick={() => {this.addReport(data)}}>Add to report</Button>}
                              //     {this.state['delete_report'+data.id] && <Button style={{minWidth:'84%'}} className="btn btn-danger" onClick={() => {this.removeReport(data)}}>Remove</Button>}
                              //     </ButtonGroup>
                              //     </div>
                              //     <p>{Math.round(data.similarity_index * 100) / 100}% Similar</p>
                              //     <p><img src='../../images/fire.png' />89</p>
                   
                              //  </div>
                              //        </div>
                              //        <div className="back face center">
                              //        <i className="fa fa-chevron-left pull-left" onClick={() => {this.hideDetail(data)}} aria-hidden="true"></i>
     
                              //          <ul>
                              //            <li><strong>Status:</strong>{data.status}</li>
                              //            <li><strong>Class:</strong>{data.associated_class.toString()}</li>
                              //            <li><strong>Proprietor:</strong><p2 style={{cursor:'pointer', color:'#4285f4'}} onClick={()=> {this.handleProprietorClick(data)}} >{data.proprietor[0].name}</p2></li>
                              //            {data.application_number && <li style={{paddingTop:'10px'}} ><strong>Application:</strong>{data.application_number}</li>}
                              //          </ul>
                              //          <p style={{cursor:'pointer', color:'#4285f4'}} onClick={() => {this.handleSeeMore(data)}}>See more</p>
                              //        </div>
                              //      </div>
                              //      </div>)}

                              // {this.props.result && this.state.filtereData && this.state.filteredResult && this.props.result.search_result.map(data => 
                              //   <div id="f1_container" className="col-sm-4">
                              //      <div id="f1_card" className={this.state['isFlipped'+data.id]?"shadow flip":"shadow"}>
                              //        <div className="front face">
                              //          <div className="elements-flip">
                              //     {!data.associated_image && <h3>{data.applied_for}</h3>}
                              //     {data.associated_image && <img style={{height:'50%', width:'100% !important'}} src={data.associated_image} />}
                              //     <hr size="2" />
                              //     <div className="overlay">
                              //     <ButtonGroup>
                              //     <Button style={{minWidth:'84%'}} className="btn btn-primary" onClick={() => {this.showDetail(data)}}>Show Details</Button>
                              //     {!this.state['delete_report'+data.id] && <Button style={{minWidth:'84%'}} className="btn btn-default" onClick={() => {this.addReport(data)}}>Add to report</Button>}
                              //     {this.state['delete_report'+data.id] && <Button style={{minWidth:'84%'}} className="btn btn-danger" onClick={() => {this.removeReport(data)}}>Remove</Button>}
                              //     </ButtonGroup>
                              //     </div>
                              //     <p>{data.similarity_index}% Similar</p>
                              //     <p><img src='../../images/fire.png' />89</p>
                   
                              //  </div>
                              //        </div>
                              //        <div className="back face center">
                              //        <i className="fa fa-chevron-left pull-left" onClick={() => {this.hideDetail(data)}} aria-hidden="true"></i>
     
                              //          <ul>
                              //            <li><strong>Status:</strong>{data.status}</li>
                              //            <li><strong>Class:</strong>{data.associated_class.toString()}</li>
                              //            <li><strong>Proprietor:</strong><p2 style={{cursor:'pointer', color:'#4285f4'}} onClick={()=> {this.handleProprietorClick(data)}} >{data.proprietor[0].name}</p2></li>
                              //            <li><strong>Application:</strong>{data.application_number}</li>
                              //          </ul>
                              //          <p style={{cursor:'pointer', color:'#4285f4'}} onClick={() => {this.handleSeeMore(data)}}>See more</p>
                              //        </div>
                              //      </div>
                              //      </div>)}
       //                                    <div className="row">
       //      <div className="col-sm-12">
       //      <DropdownButton title="Custom" id="bg-nested-dropdown">
       //                    <li  eventKey="1"><span style={{paddingLeft:'10px'}}><input onChange={this.handleCheckAny.bind(this, 110)} checked={this.state.all} ref="check_all"  type="checkbox" className="list-item" />All</span></li>
       // <li  eventKey="1"><span style={{paddingLeft:'10px'}}><input onChange={this.handleCheckAny.bind(this, 100)} disabled={this.state.called} checked={this.state.hun} type="checkbox" ref="check_100" className="list-item" />100%-90%</span></li>
       // <li  eventKey="1"><span style={{paddingLeft:'10px'}}><input onChange={this.handleCheckAny.bind(this, 90)} disabled={this.state.called} checked={this.state.nin} type="checkbox" ref="check_90" className="list-item"/>90%-80%</span></li>
       // <li  eventKey="1"><span style={{paddingLeft:'10px'}}><input onChange={this.handleCheckAny.bind(this, 80)} disabled={this.state.called} checked={this.state.eig} type="checkbox" ref="check_80" className="list-item"/>80%-70%</span></li>
       // <li  eventKey="1"><span style={{paddingLeft:'10px'}}><input onChange={this.handleCheckAny.bind(this, 70)} disabled={this.state.called} checked={this.state.sev} type="checkbox" ref="check_70" className="list-item"/>70%-60%</span></li>
       // <li  eventKey="1"><span style={{paddingLeft:'10px'}}><input onChange={this.handleCheckAny.bind(this, 60)} disabled={this.state.called} checked={this.state.six} type="checkbox" ref="check_60" className="list-item"/>60%-50%</span></li>
       // <li  eventKey="1"><span style={{paddingLeft:'10px'}}><input onChange={this.handleCheckAny.bind(this, 50)} disabled={this.state.called} checked={this.state.fif} type="checkbox" ref="check_50" className="list-item"/>50%-40%</span></li>
       // <li  eventKey="1"><span style={{paddingLeft:'10px'}}><input onChange={this.handleCheckAny.bind(this, 40)} disabled={this.state.called} checked={this.state.fou} type="checkbox" ref="check_40" className="list-item"/>40%-30%</span></li>
       // <li  eventKey="1"><span style={{paddingLeft:'10px'}}><input onChange={this.handleCheckAny.bind(this, 30)} disabled={this.state.called} checked={this.state.thi} type="checkbox" ref="check_30" className="list-item"/>30%-20%</span></li>
       // <li  eventKey="1"><span style={{paddingLeft:'10px'}}><input onChange={this.handleCheckAny.bind(this, 20)} disabled={this.state.called} checked={this.state.twe} type="checkbox" ref="check_20" className="list-item"/>20%-10%</span></li>
       // <li  eventKey="1"><span style={{paddingLeft:'10px'}}><input onChange={this.handleCheckAny.bind(this, 10)} disabled={this.state.called} checked={this.state.one} type="checkbox" ref="check_10" className="list-item"/>10%-00%</span></li>
       //           </DropdownButton>
       //           </div>
       //           </div>

        // <AlertContainer ref={a => this.msg2 = a} {...this.alertOptions} />

        // onClick={()=>{this.handleFiltereSelect({label:[2491669, 2490557, 2490537]}, 'application_date')}}
        