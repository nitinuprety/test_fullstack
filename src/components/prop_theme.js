import React, { Component } from 'react';
import {FormGroup, Modal,  Tooltip, OverlayTrigger, FormControl, Col, ControlLabel, DropdownButton, MenuItem, Checkbox, Navbar, Nav, NavItem, Button, ButtonGroup} from 'react-bootstrap';
import  _  from 'lodash';
import Select from 'react-select';
import * as casesAction  from '../actions/index';
import { browserHistory, Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Highcharts from 'highcharts/highstock';
import {Collapsible, CollapsibleItem, Tag} from 'react-materialize';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
var ReactHighcharts = require('react-highcharts');
var Highlight = require('react-highlight');
var HighchartsMore = require('highcharts-more');
HighchartsMore(ReactHighcharts.Highcharts);
import AlertContainer from 'react-alert';
import GlobalSearch from './search';
import fuzzyFilterFactory from 'react-fuzzy-filter';
const {InputFilter, FilterResults} = fuzzyFilterFactory();
import StickyBox from "react-sticky-box";
import animateScrollTo from 'animated-scroll-to';




class PropTheme extends Component {

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
      warning_tab: false,
      add_state: false,
      add_report: 0,
      detail: false,
      filter:'Class 1',
      tag: true,
      typeSearch: false,
      searchInput:'',
      popupVisible: false,
      all_class:true,
      global_search: false,
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
       sidenav:false,
       filterState: false,
       filterDynamic:[],
       filtereData:[],
       filterStateProp: false,
       filterDynamicProp:[],
       filtereDataProp:[],
       showTmWatch: false,
      showTmManager:false,
      showTmLitigation: false,
      interested:false,
      sort_hl: false,
      sort_lh:false,
      sort_hl_prop:false,
      sort_lh_prop:false,
       alertOptions:{
                  offset: 14,
                  position: 'top right',
                  theme: 'dark',
                  time: 3000,
                  transition: 'scale'
                },
       activeClass:false,
      activeStates:false,
      activeStatus:false,
      activeType:false,
      activeDOU:false,
      activeDOA:false,
       activeClassOp:false,
      activeStatesOp:false,
      activeStatusOp:false,
      activeTypeOp:false,
      activeDOUOP:false,
      activeDOAOP:false,
      colors: ["#044747", "#079191", "#38adad", "#90e3e3", "#d5f7f7"],
      tabState:false,
      alertState:false,
      check_data:[],
      check_dataOp:[]
    }
  }

componentWillMount() {
      this.props.casesAction.ProprietorMarkSearch(this.props.params.text);
      this.props.casesAction.ProprietorSearch(this.props.params.text);
      this.props.casesAction.ProprietorOpposedMark(this.props.params.text);
      this.setState({items: this.state.initialItems, global_search:false});
      window.removeEventListener('scroll', this.handleScrollElement);

  }

componentDidMount() {
  window.addEventListener('scroll', this.handleScrollElement);
  console.log('component Did mount');
};

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

  toggleType() {
    const currentState = this.state.activeType;
    this.setState({activeType: !currentState})
  }   


   toggleDOA() {
    const currentState = this.state.activeDOA;
    this.setState({activeDOA: !currentState})
  }

  toggleDOU() {
    const currentState = this.state.activeDOU;
    this.setState({activeDOU: !currentState})
  }  
  
   toggleClassOp() {
        const currentState = this.state.activeClassOp;
        this.setState({ activeClassOp: !currentState });
    };
  toggleStatesOp() {
    const currentState = this.state.activeStatesOp;
    this.setState({activeStatesOp: !currentState})
  }

  toggleStatusOp() {
    const currentState = this.state.activeStatusOp;
    this.setState({activeStatusOp: !currentState})
  }  

  toggleTypeOp() {
    const currentState = this.state.activeTypeOp;
    this.setState({activeTypeOp: !currentState})
  }  

   toggleDOAOP() {
    const currentState = this.state.activeDOAOP;
    this.setState({activeDOAOP: !currentState})
  }

  toggleDOUOP() {
    const currentState = this.state.activeDOUOP;
    this.setState({activeDOUOP: !currentState})
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

  toggle() {
    this.setState({warning_tab: !this.state.warning_tab});
  }



    close_filter() {
    this.setState({filter: '', tag:false});
  }

   // toggleClass() {
   //      const currentState = this.state.active;
   //      this.setState({ active: !currentState });
   //  };

    filterList(event) {
    var updatedList = this.state.initialItems;

    updatedList = updatedList.filter(function(item){
      return item.toLowerCase().search(
        event.target.value.toLowerCase()) !== -1;
    });
    this.setState({items: updatedList});
    // console.log('items:', this.state.items);
  }

  showDetail(data) {
     this.showAlert('Click on \"Get Realtime Info\" for latest trademark details','info',3000);
     this.setState({['isFlipped'+data.id]: true});
  }

   showAlert = (message, type, time) => {
    this.msg.show(message, {
      time: time,
      type: type
    })
  }

  hideDetail(data) {
    this.setState({['isFlipped'+data.id]: false});
  }

   addReport() {

     this.setState({add_report: this.state.add_report + 1, delete_report: true});
     
  }


  handleSearch() {
    this.setState({global_search:true});
  }

  handleCloseSearch() {
    this.setState({global_search:false})
  }

    handleSignOut() {
      this.props.casesAction.signoutUser();
    }

   handleSeeMore(data) {
      var url='/mark_profile/'+data.id;
      window.open(url, '_blank');
    } 

  handleSimHTL() {
       if(this.props.classes) {
    all_classes=this.props.classes;
    all_classes.sort();
    // console.log('All classes:', all_classes);
    for(var i=0;i<=45;i++) {
      var hold=0;
      for(var j=0;j<=45;j++) {
        if(all_classes[j]>all_classes[j+1]) {
          hold=all_classes[j];
          all_classes[j]=all_classes[j+1];
          all_classes[j+1]=hold;
        }
      }
    }
    // console.log('Filter all classes:', all_classes);
    }
  }   
   
    handleProprietorClick(data) {
      browserHistory.push('/proprietor/'+data.proprietor[0].id);
    }

    handleProprietorSimilar(data) {
      browserHistory.push('/proprietor/'+data.id);
       setTimeout(()=>{
        window.location.reload();
      }, 500);
      
    }

       handleFiltereSelect(item, type) {
     // console.log('item:', item,'type:', type);
     var data;
     var check_data;
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
        this.setState({filterDynamic:data, check_data:check_data})
     } else {
        data = this.state.filterDynamic.concat({item:item.label, type:type});
        check_data=this.state.check_data.concat(item.label+'-'+type);
        this.setState({filterDynamic:data,check_data:check_data});
     }

     var grouped = _.groupBy(data,function(d) {
              return d.type;
          });

    var query='';
  
     

      _.mapKeys(grouped, function(value,key,key_index) {
             switch(key) {
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

                                                query+= '(('+'new Date'+'(o.'+key+').getFullYear())'+'>='+parseInt(item_arr[0])+') && (('+'new Date'+'(o.'+key+').getFullYear())'+'<'+parseInt(item_arr[1])+') ||'
                                               
                                             } else
                                             if(index<value.length-1 && index>0){
                                              query+= '(('+'new Date'+'(o.'+key+').getFullYear())'+'>='+parseInt(item_arr[0])+') && (('+'new Date'+'(o.'+key+').getFullYear())'+'<'+parseInt(item_arr[1])+') ||'
                                             } else {
                                               query+= '(('+'new Date'+'(o.'+key+').getFullYear())'+'>='+parseInt(item_arr[0])+') && (('+'new Date'+'(o.'+key+').getFullYear())'+'<'+parseInt(item_arr[1])+')';
                                             }
                                          }
                                          else {
                                            query+='(('+'new Date'+'(o.'+key+').getFullYear())'+'>='+parseInt(item_arr[0])+') && (('+'new Date'+'(o.'+key+').getFullYear())'+'<'+parseInt(item_arr[1])+')';
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
    var data2 = _.filter(this.props.proprietor_marks.data, function(o) {
      if(o.type!=null && o.status!=null){
        return eval(query)
      }
    })
    if(query) {
      if(this.state.filtereData.length==data2.length){
       
      }

       this.setState({filtereData:data2,filterState:true})
    } else {
      this.setState({filterState:false})
    }
 }



       handleFiltereSelectProp(item, type) {
     // console.log('item:', item,'type:', type);
     var data;
     var check_data;
      var a = _.filter(this.state.filterDynamicProp, function(o) {
         return (o.item== item.label)
     })
     if(a.length>0) {
        data = _.filter(this.state.filterDynamicProp, function(o) {
            return !(o.item==item.label)
        })
        var new_check_data = item.label+'-'+type+'op';
        check_data=_.filter(this.state.check_dataOp,function(p){
          return  !(new_check_data==p)
        })
        this.setState({filterDynamicProp:data, check_dataOp:check_data})
     } else {
        data = this.state.filterDynamicProp.concat({item:item.label, type:type});
        check_data=this.state.check_dataOp.concat(item.label+'-'+type+'op');
        this.setState({filterDynamicProp:data, check_dataOp:check_data});
     }

     var grouped = _.groupBy(data,function(d) {
              return d.type;
          });

    var query='';
     
     

      _.mapKeys(grouped, function(value,key,key_index) {
             switch(key) {
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
    var data2 = _.filter(this.props.proprietor_opposed_marks.data, function(o) {
      if(o.type!=null && o.status!=null){
        return eval(query)
      }
    })
    if(query) {
      if(this.state.filtereDataProp.length==data2.length){
     
      }

       this.setState({filtereDataProp:data2,filterStateProp:true})
    } else {
      this.setState({filterStateProp:false})
    }
 }

   handleOpphl() {
    // console.log('High to low')
    this.setState({sort_hl: !this.state.sort_hl, sort_lh:false});
  }

  handleOpplh() {
    // console.log('Low to high')
    this.setState({sort_lh: !this.state.sort_lh, sort_hl:false});
  }

   handleOpphlProp() {
    // console.log('High to low')
    this.setState({sort_hl_prop: !this.state.sort_hl_prop, sort_lh_prop:false});
  }

  handleOpplhProp() {
    // console.log('Low to high')
    this.setState({sort_lh_prop: !this.state.sort_lh_prop, sort_hl_prop:false});
  }

  ScrollToTop() {
    window.scrollTo(0, 0);
  }

  handlePropMark() {
    if(!this.state.tabState){
      this.showAlert('Opposition data is under processing. Please click on \"Get Realtime info\" to see current data', 'info',900000);
    }
    this.setState({tabState:true});

    
  }
  handlePropMarkOp() {
   if(!this.state.tabState){
      this.showAlert('Opposition data is under processing. Please click on \"Get Realtime info\" to see current data', 'info',900000);
    }
    this.setState({tabState:true});


  }

  handleLoadData() {
    console.log('loaded:');
  }

handleAlert() {
 if(this.props.proprietor_marks.data.length>500 || this.props.proprietor_opposed_marks.data.length>500){
  this.showAlert('Due to large number of marks for this proprietor general actions on this page might take some time','info');
 } 

this.setState({alertState:true})
console.log('handle alert has been called');
}

handleReset() {
  this.setState({filterState:false,filtereData:[],filterDynamic:[],check_data:[]})
}

handleResetOp() {
  this.setState({filterStateProp:false,filtereDataProp:[],filterDynamicProp:[],check_dataOp:[]})
}
  
  render() {

   // console.log('this.props.params:', this.props.params.text);

   const {proprietor} = this.props;
   const {proprietor_marks} =this.props;
   const {proprietor_opposed_marks} = this.props;
   if(this.props.proprietor_marks && !this.state.alertState ){
      setTimeout(()=>{
         this.handleAlert();
      }, 1000);
    }

if(this.props.proprietor_marks && !this.props.proprietor_marks.data.length==0){
  var prop_analaysis=[];
    var years = [];
    var status_arr=[];
    var classes_arr=[];
    var year_arr=[];}
 
    if(this.props.proprietor_marks && this.props.proprietor_marks.data.length>0) {
     _.map(this.props.proprietor_marks.data, function(mark){
       if(mark.status) {
         status_arr.push(mark.status);
       }
       
     })
    }
 
    if(this.props.proprietor_marks && this.props.proprietor_marks.data.length>0) {
     _.map(this.props.proprietor_marks.data, function(mark){
       _.map(mark.associated_class, function(classes){
             classes_arr.push(classes);
       })
     })
    }
 
    if(this.props.proprietor_marks && this.props.proprietor_marks.data.length>0) {
     _.map(this.props.proprietor_marks.data, function(mark){
         if(mark.application_date){
           var date = new Date(mark.application_date);
           year_arr.push(date.getFullYear());
         }
     })
    }

    var series=[];
 
if(this.props.proprietor_marks && !this.props.proprietor_marks.data.length==0)   { 
  // console.log(status_arr, classes_arr, year_arr);
    
       var status_arr_uniq= _.uniq(status_arr);
    
       var finalStatus = _.map(status_arr_uniq, function(val){
          var count=0;
          _.map(status_arr,function(stat){
            if(val==stat){
              count=count+1
            }
          })
          return {status:val, count:count};
       })
    
       series = _.map(finalStatus, function(fin){
        return {name:fin.status, y:fin.count}
       });
       series=_.filter(series, function(stat){return stat.y!=0 && stat.name!=null});
       // console.log('series:', series);
    
    
          var classes_arr_uniq= _.uniq(classes_arr);
          // console.log('classes_arr_uniq:', classes_arr_uniq);
    
       var finalClasses = _.map(classes_arr_uniq, function(fcl){
        // console.log('fcl:', fcl);
          var count2=0;
          _.map(classes_arr,function(cl){
            if(fcl==cl){
              count2=count2+1
            }
          })
          return {class:fcl, count:count2};
       });
    
       // console.log('finalClasses:', finalClasses);
    
       var seriesClass = _.map(finalClasses, function(fic){
        return {name:'Class '+fic.class, y:fic.count}
       });
    
       

      if(seriesClass.length>1){for(var i=0;i<=seriesClass.length;i++) {
              var hold=0;
              for(var j=0; j<=seriesClass.length;j++) {
                if(!seriesClass[j+1]) {
                  break;
                }

              else if(seriesClass[j].y<seriesClass[j+1].y){
                hold=seriesClass[j];
                seriesClass[j]=seriesClass[j+1];
                seriesClass[j+1]=hold;
                }
              }
            }}
    // console.log('seriesClass:', seriesClass);
       
     var year_arr_uniq= _.uniq(year_arr);
    
       var finalYear = _.map(year_arr_uniq, function(fcy){
          var count=0;
          _.map(year_arr,function(year){
            if(fcy==year){
              count=count+1
            }
          })
          return {year:fcy, count:count};
       })
    
       var seriesYear = _.map(finalYear, function(fiy){
        return {name:fiy.year, data:[fiy.count]}
       });

        seriesYear.sort((a,b) => a.name - b.name);
    
       // console.log('seriesyear:', seriesYear);
       var registeredCount;
       if(series) {
        registeredCount=_.filter(series, function(p){return p.name=='Registered'});
        // console.log('registeredCount:',registeredCount);
       }}
    
    if(this.props.proprietor_marks && !this.props.proprietor_marks.data.length==0) {var config = {
        chart: {
              type: 'column'
          },
          title: {
              text: 'Yearly marks distribution'
          },
          subtitle: {
              text: ''
          },
          xAxis: {
              categories: [
               'Year'
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
          series: seriesYear
          };
      
              var config2 = {chart: {
              plotBackgroundColor: null,
              plotBorderWidth: null,
              plotShadow: false,
              type: 'pie'
          },
          title: {
              text: 'Class-wise Distribution'
          },
          tooltip: {
              pointFormat: '{series.name}: <b>{point.percentage:.1f}</b>'
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
              data: seriesClass
          }]};
      
          var config3 = {chart: {
              plotBackgroundColor: null,
              plotBorderWidth: null,
              plotShadow: false,
              type: 'pie'
          },
          title: {
              text: 'Status-wise Distribution'
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
              data: series
          }]};}


  if(this.props.proprietor_opposed_marks && !this.props.proprietor_opposed_marks.data.length==0){
  var prop_analaysis=[];
    var years_op = [];
    var status_arr_op=[];
    var classes_arr_op=[];
    var year_arr_op=[];}
 
    if(this.props.proprietor_opposed_marks && this.props.proprietor_opposed_marks.data.length>0) {
     _.map(this.props.proprietor_opposed_marks.data, function(mark){
       if(mark.status) {
         status_arr_op.push(mark.status);
       }
       
     })
    }
 
    if(this.props.proprietor_opposed_marks &&this.props.proprietor_opposed_marks.data.length>0) {
     _.map(this.props.proprietor_opposed_marks.data, function(mark){
       _.map(mark.associated_class, function(classes){
             classes_arr_op.push(classes);
       })
     })
    }
 
    if(this.props.proprietor_opposed_marks &&this.props.proprietor_opposed_marks.data.length>0) {
     _.map(this.props.proprietor_opposed_marks.data, function(mark){
         if(mark.application_date){
           var date = new Date(mark.application_date);
           year_arr_op.push(date.getFullYear());
         }
     })
    }
 
if(this.props.proprietor_opposed_marks && !this.props.proprietor_opposed_marks.data.length==0)   { 
  // console.log(status_arr_op, classes_arr_op, year_arr_op);
    
       var status_arr_op_uniq= _.uniq(status_arr_op);
    
       var finalStatusOp = _.map(status_arr_op_uniq, function(val){
          var count=0;
          _.map(status_arr_op,function(stat){
            if(val==stat){
              count=count+1
            }
          })
          return {status:val, count:count};
       })
    
       var seriesOp = _.map(finalStatusOp, function(fin){
        return {name:fin.status, y:fin.count}
       });
    
       // console.log('series:', seriesOp);
       seriesOp = _.filter(seriesOp, function(ser){return ser.y!=0 && ser.name!=null});

    
    
          var classes_arr_op_uniq= _.uniq(classes_arr_op);
          // console.log('classes_arr_uniq:', classes_arr_uniq);
    
       var finalClassesOp = _.map(classes_arr_op_uniq, function(fcl){
        // console.log('fcl:', fcl);
          var count2=0;
          _.map(classes_arr_op,function(cl){
            if(fcl==cl){
              count2=count2+1
            }
          })
          return {class:fcl, count:count2};
       });
    
       // console.log('finalClasses:', finalClassesOp);
    
       var seriesOpClass = _.map(finalClassesOp, function(fic){
        return {name:'Class '+fic.class, y:fic.count}
       });
    
       // console.log('seriesOpClass:', seriesOpClass);

        if(seriesOpClass.length>1){
          for(var i=0;i<=seriesOpClass.length;i++) {
              var hold=0;
              for(var j=0; j<=seriesOpClass.length;j++) {
                if(!seriesOpClass[j+1]) {
                  break;
                }
               else if(seriesOpClass[j].y<seriesOpClass[j+1].y){
                hold=seriesOpClass[j];
                seriesOpClass[j]=seriesOpClass[j+1];
                seriesOpClass[j+1]=hold;
                }
              }
            }}
            // console.log('seriesOpClass:', seriesOpClass);
       
     var year_arr_op_uniq= _.uniq(year_arr_op);
    
       var finalYearOp = _.map(year_arr_op_uniq, function(fcy){
          var count=0;
          _.map(year_arr_op,function(year){
            if(fcy==year){
              count=count+1
            }
          })
          return {year:fcy, count:count};
       })
    
       var seriesYearOp = _.map(finalYearOp, function(fiy){
        return {name:fiy.year, data:[fiy.count]}
       });

       seriesYearOp.sort((a,b) => a.name - b.name);
    
       // console.log('seriesClass:', seriesYearOp);
       var registeredCountOp;
       if(seriesOp) {
        registeredCountOp=_.filter(seriesOp, function(p){return p.name=='Registered'});
        // console.log('registeredCount:',registeredCountOp);
       }
     }
    
    if(this.props.proprietor_opposed_marks && !this.props.proprietor_opposed_marks.data.length==0) {var config4 = {
        chart: {
              type: 'column'
          },
          title: {
              text: 'Yearly opposition filed '
          },
          subtitle: {
              text: ''
          },
          xAxis: {
              categories: [
               'Year'
              ],
              crosshair: true
          },
          yAxis: {
              tickInterval: 2,
              title: {
                  text: 'Marks'
              },

          },
          tooltip: {
        
          },
          plotOptions: {
              column: {
                  pointPadding: 0.2,
                  borderWidth: 0
              }
          },
          series: seriesYearOp
          };
      
              var config5 = {chart: {
              plotBackgroundColor: null,
              plotBorderWidth: null,
              plotShadow: false,
              type: 'pie'
          },
          title: {
              text: 'Class-wise Distribution'
          },
          tooltip: {
              pointFormat: '{series.name}: <b>{point.percentage:.1f}</b>'
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
              data: seriesOpClass
          }]};
      
          var config6 = {chart: {
              plotBackgroundColor: null,
              plotBorderWidth: null,
              plotShadow: false,
              type: 'pie'
          },
          title: {
              text: 'Status-wise Distribution'
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
              data: seriesOp
          }]};}

          const opp_count=[];
          const opp_count_mark=[];
          const opp_notice_count=[];
          const opp_notice_count_mark=[];
          if(this.props.proprietor_marks && this.props.proprietor_marks.data ){
      
      _.map(this.props.proprietor_marks.data,function(res2){
        if(res2.opposition_notice_count >0) {
          opp_notice_count.push(res2);
        }
      })
    }
    if(this.props.proprietor_marks && this.props.proprietor_marks.data ){
      
      _.map(this.props.proprietor_marks.data,function(res){
        if(res.opposition_count>0) {
          opp_count.push(res);
        }
      })
    } 
    

    if(this.props.proprietor_opposed_marks && this.props.proprietor_opposed_marks){
      
      _.map(this.props.proprietor_opposed_marks.data,function(res){
        if(res.opposition_count>0) {
          opp_count_mark.push(res);
        }
      })
    } 

    if(this.props.proprietor_opposed_marks && this.props.proprietor_opposed_marks){
      
      _.map(this.props.proprietor_opposed_marks.data,function(res3){
        if(res3.opposition_notice_count>0) {
          opp_notice_count_mark.push(res3);
        }
      })
    } 

   //     var opp_count_prop=[];

   // if(this.props.proprietor_opposed_marks){
   //  _.map(this.props.proprietor_opposed_marks, function(p){
   //     if(p.opposition_count>0){
   //      opp_count_prop.push(p);
   //     }
      
   //  })
   // }
    const tooltip = (
  <Tooltip id="tooltip">Analyse the oppositions on marks filed by the proprietor</Tooltip>
);

     const tooltip2 = (
  <Tooltip id="tooltip2">See the marks opposed by the proprietor</Tooltip>
);

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

     const fuseConfig9 = {
      keys: ['label']
    };

    const fuseConfig10 = {
      keys: ['label']
    };


    var states=[];
    var status=[];
    var type =[];
    var state=[];
    var clas=[];
    if(this.props.proprietor_marks) {

     states = _.map(this.props.proprietor_marks.filter.states, function(state){
       return {label:state}
      });

     status = _.map(this.props.proprietor_marks.filter.status, function(status){
      // console.log('status:', status);
      return {label:status.label}
      });
       
     type = _.map(this.props.proprietor_marks.filter.type, function(type){
       return {label:type}       
      }) 

     clas= _.map(this.props.proprietor_marks.filter.classes, function(cl){
      return {label:cl}
     })
     // console.log('states:', states, 'status:', status, 'type:', type);
    } 

      const fuseConfigp = {
      keys: ['label']
    };
     const fuseConfigp2 = {
      keys: ['label']
    };

    const fuseConfigp3 = {
      keys: ['label']
    };

     const fuseConfigp4 = {
      keys: ['label']
    };

    const fuseConfigp5 = {
      keys: ['label']
    };

     const fuseConfigp9 = {
      keys: ['label']
    };

    const fuseConfigp10 = {
      keys: ['label']
    };

    var states_props=[];
    var status_props=[];
    var type_props =[];
    var state_props=[];
    var clas_props=[];
    if(this.props.proprietor_opposed_marks) {

     states_props = _.map(this.props.proprietor_opposed_marks.filter.states, function(state){
       return {label:state}
      });

     status_props = _.map(this.props.proprietor_opposed_marks.filter.status, function(status){
      // console.log('status:', status);
      return {label:status.label}
      });
       
     type_props = _.map(this.props.proprietor_opposed_marks.filter.type, function(type){
       return {label:type}       
      }) 

     clas_props= _.map(this.props.proprietor_opposed_marks.filter.classes, function(cl){
      return {label:cl}
     })
     // console.log('states:', states, 'status:', status, 'type:', type);
    } 

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
    }

    // console.log('this.state:',this.state);

    // var year_application= [{'1960-1970': [1586941, 1603968, 1613599, 1629414, 1635861, 1637298]}, {'1980-1990': [1784087, 1812264, 1814313, 1845632, 1851664, 1853011]} ];
// var opp_count=[];
// var opp_length;
//     if(this.props.proprietor_marks){
      
//       _.map(this.props.proprietor_marks,function(res){
//         if(res.opposition_count>0) {
//           opp_count.push(res);
//         }
//       })
//       opp_length=opp_count.length;
//       console.log('opp_count:',opp_count);
//     } 

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
  const seeMore = (
  <Tooltip style={{fontSize:'17px'}} id="tooltip">Click to see details and realtime data of the mark</Tooltip>
);

    
    return (
  <div>
  <div style={{background:'#F1F2F1'}} >
        {!this.props.proprietor_marks  &&
          <div className="col-sm-12" style={{textAlign:'center', background:'#F1F2F1', paddingTop:'10%', paddingBottom:'8%', height:'100vh'}} >
        <img src="../../images/loading.gif" style={{display:"block",left:'50%',marginLeft:"auto",marginRight:"auto", width:'40%'}}/>
        <br/>
        <p style={{fontSize:'18px', color:'#525252'}}>Crunching latest trademark data for you. Hang on... </p>
        </div>
        }
  </div>
  <div style={{visibility:'hidden'}} id="scrollt" ><i style={{color:'#4285f4', position:'fixed',right:'10px',fontSize:'40px',zIndex:'999',bottom:'10px',cursor:'pointer'}} onScroll={this.handleScrollElement.bind(this)} onClick={this.hadleScrollTop.bind(this)}  className="fa fa-chevron-circle-up"></i></div>
  { this.props.proprietor_marks && <div>
    
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
     {!this.state.global_search && <div className="proprietor">
                      <div className="row prop-top-panel">
                   <div className="col-sm-12">
                     <i onClick={this.openNav.bind(this)} className="fa fa-bars pull-left" aria-hidden="true"></i>
                     <Link to="/search" ><i className="fa fa-search pull-right" aria-hidden="true"></i></Link>
                   </div>
                 </div>
     
          <div className="wrapper">
                 <div className="container-fluid">
                     <div className="row">

                         <div className="col-sm-12 page-title-box">

                             <div className="col-sm-6 pull-left">
                             {this.props.proprietor && 
                              <div>
                              <h4 className="page-title">Proprietor: {this.props.proprietor.proprietor.name}</h4>
                              {this.props.proprietor.proprietor.address && 
                              <div>  
                              <br/>
                              <p style={{textAlign:'left',color:'#c98484'}} >{this.props.proprietor.proprietor.address}</p>
                              </div>}
                              </div>
                            }
                                 
                             </div>
                             <div className="col-sm-6 pull-right">
                             {this.props.proprietor && <h6 style={{fontSize:'13px', float:'right', fontWeight:'100',paddingTop:'5px'}} className="page-title">*The analysis is based on identifiable data and hence is only indicative</h6>}
                                 
                             </div>
                         </div>
                     </div>
     
                     <div className="row">
                       <Tabs>
                         <TabList>
                           <Tab>Proprietor Analysis</Tab>
                           <Tab onClick={this.handlePropMark.bind(this)} >Proprietor Marks</Tab>
                           <Tab>
                           <OverlayTrigger placement="top" overlay={tooltip}>
                            <span>Aggressive Analysis</span>
                          </OverlayTrigger>
                          </Tab>
                           <Tab>
                           <OverlayTrigger placement="top" overlay={tooltip2}>
                            <span onClick={this.handlePropMarkOp.bind(this)} >Opposed Marks</span>
                          </OverlayTrigger></Tab>
                           {this.props.proprietor && this.props.proprietor.similar.length!=0 && <Tab>Similar Proprietor</Tab>}

                         </TabList>
                          
                          <TabPanel>
                          {this.props.proprietor_marks && this.props.proprietor_marks.data.length==0 && 
                            <div style={{textAlign:'center'}} >
                            <img style={{width:'20%'}} src="../../images/no-result.png" />
                            </div> }
                          {this.props.proprietor_marks && !this.props.proprietor_marks.data.length==0 && 
                            <div>
                        <div className="row">
                                    
                          <div className="col-md-6 col-lg-6 col-xl-3 prop-theme-top-stats">
                              <div className="widget-bg-color-icon card-box fadeInDown animated">
                                  <div className="bg-icon pull-left">
                                      <img src="../../images/curriculum.png" />
                                  </div>
                                  <div className="text-right">
                                      {this.props.proprietor_marks && !this.props.proprietor_marks.data.length==0 && <h3 className="text-dark"><b className="counter">{this.props.proprietor_marks.data.length}</b></h3>}
                                      <p className="text-muted mb-0">Total Applications</p>
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
                                      {registeredCount && registeredCount.length>0 && <h3 className="text-dark"><b className="counter">{registeredCount[0].y}</b></h3>}
                                      {registeredCount && registeredCount.length==0 && <h3 className="text-dark"><b className="counter">0</b></h3>}
                                      <p className="text-muted mb-0">Registered Marks</p>
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
                                     {seriesClass && <h3 className="text-dark"><b className="counter">{seriesClass[0].name}</b></h3>}
                                     <p className="text-muted mb-0">Most active class</p>
                                 </div>
                                 <div className="clearfix"></div>
                             </div>
                         </div>
                      </div>
      
                      <div className="row">
      
                          <div className="col-lg-12 col-xl-4">
                              <div className="card-box">
                                  
      
                                <div className="widget-chart text-center">
                                 {series && series.length>0 && <ReactHighcharts onLoad={this.handleLoadData.bind(this)} config = {config}></ReactHighcharts>}       
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
           }
        
                          </TabPanel>
                         <TabPanel>
                     {this.props.proprietor_marks && this.props.proprietor_marks.data.length==0 && <div style={{textAlign:'center'}} >
            <img style={{width:'20%'}} src="../../images/no-result.png" />
            </div>              }
                    {this.props.proprietor_marks && !this.props.proprietor_marks.data.length==0 &&
                      
                     <div>
                     {/*<ScrollButton scrollStepInPx="70" delayInMs="10"/>*/}
                     <div className="row"> 
                       <div className="col-sm-12 col-lg-12 col-xl-4 results-prop" style={{marginTop:'0 !important', textAlign:'center'}}>
                         {this.props.proprietor && <h3 className="page-title">Marks of : {this.props.proprietor.proprietor.name}</h3>}
                       </div>
                     </div>
     
                     <div className="row">
                       <div className="col-sm-12 col-lg-12 col-xl-4 results-prop ">
                       <StickyBox bottom={false|true}>
                        <div className="filters-prop col-sm-2 widget-bg-color-icon card-box">
                          <div className="col-sm-12" style={{display:'flex !important'}} >
                            <h4 style={{textAlign:'left'}} ><strong>Filters</strong></h4>
                            <h4 style={{fontSize:'13px !important',textAlign:'right',paddingLeft:'40%',paddingTop:'2%',cursor:'pointer',color:'#4285f4'}}><strong onClick={this.handleReset.bind(this)} style={{fontSize:'14px !important'}} >Reset</strong></h4>
                          </div>
                               <hr size="5" />
                     <Collapsible>

                     <div className="collapsible-header" onClick={this.toggleClass.bind(this)}>
                      <span><strong>Classes</strong></span>
              
                      </div>
                      
            <div className="collapsible-body" >
                    {!this.state.activeClass && <ul>
                   {clas && <FilterResults
                          items={clas}
                          fuseConfig={fuseConfig}>
                          {filteredItems => {
                            return(
                              <div style={{maxHeight:'150px', overflowY:'scroll'}}>      
                                {filteredItems.map(item => <div><span><input checked={this.state.check_data.indexOf(item.label+'-'+'associated_class')!=-1} onClick={()=>{this.handleFiltereSelect(item, 'associated_class')}} style={{paddingRight:'5px', marginRight:'5px'}} type="checkbox" />{item.label}</span></div>)}
                             </div>   
                            )
                          }}
                        </FilterResults>}


                        </ul>}
                    </div>

                    <div className="collapsible-header" onClick={this.toggleStates.bind(this)}>
                      <span><strong>States</strong></span>
              
                      </div>
                      
            <div className="collapsible-body" >
                    {!this.state.activeStates && <ul>
                         {states && <FilterResults
                          items={states}
                          fuseConfig={fuseConfig3}>
                          {filteredItems3 => {
                            return(
                             <div style={{maxHeight:'150px', overflowY:'scroll', overflowX:'hidden'}} >    
                                {filteredItems3.map(item3 => <div>{item3.label && <span><input style={{paddingRight:'5px', marginRight:'5px'}} checked={this.state.check_data.indexOf(item3.label+'-'+'state')!=-1} onClick={()=>{this.handleFiltereSelect(item3, 'state')}} type="checkbox" />{item3.label}</span>}</div>)}
                             </div>   
                            )
                          }}
                        </FilterResults>}
                        </ul>}
                    </div>
                  

                    <div className="collapsible-header" onClick={this.toggleStatus.bind(this)}>
                      <span><strong>Status</strong></span>
              
                      </div>
                      
            <div className="collapsible-body" >
                    {!this.state.activeStatus && <ul>
                         {status && <FilterResults
                          items={status}
                          fuseConfig={fuseConfig4}>
                          {filteredItems4 => {
                            return(
                             <div style={{maxHeight:'150px', overflowY:'scroll', overflowX:'hidden'}} >    
                                {filteredItems4.map(item4 => <div><span><input checked={this.state.check_data.indexOf(item4.label+'-'+'status')!=-1} style={{paddingRight:'5px', marginRight:'5px'}} onClick={()=>{this.handleFiltereSelect(item4, 'status')}} type="checkbox" />{item4.label}</span></div>)}
                             </div>   
                            )
                          }}
                        </FilterResults>}
                        </ul>}
                    </div>
                    


                    <div className="collapsible-header" onClick={this.toggleType.bind(this)}>
                      <span><strong>Trademark Type</strong></span>
              
                      </div>
                      
            <div className="collapsible-body" >
                    {!this.state.activeType && <ul>
                         {type && <FilterResults
                          items={type}
                          fuseConfig={fuseConfig5}>
                          {filteredItems5 => {
                            return(
                             <div style={{maxHeight:'150px', overflowY:'scroll', overflowX:'hidden'}} >    
                                {filteredItems5.map(item5 => <div><span><input checked={this.state.check_data.indexOf(item5.label+'-'+'type')!=-1} style={{paddingRight:'5px', marginRight:'5px'}} onClick={()=>{this.handleFiltereSelect(item5, 'type')}} type="checkbox" />{item5.label}</span></div>)}
                             </div>   
                            )
                          }}
                        </FilterResults>}
                        </ul>}
                    </div>     

                <div className="collapsible-header" onClick={this.toggleDOA.bind(this)}>
                      <span><strong>Date of application</strong></span>
              
                      </div>
                      
            <div className="collapsible-body" >
                    {!this.state.activeDOA && <ul>
                         {date_of_application && <FilterResults
                          items={date_of_application}
                          fuseConfig={fuseConfig9}>
                          {filteredItems9 => {
                            return(
                              <div style={{maxHeight:'150px', overflowY:'scroll', overflowX:'hidden'}} >      
                                {filteredItems9.map(item9 => <div><span><input checked={this.state.check_data.indexOf(item9.label+'-'+'application_date')!=-1} style={{paddingRight:'5px', marginRight:'5px'}} onClick={()=>{this.handleFiltereSelect(item9, 'application_date')}} type="checkbox" />{item9.label}</span></div>)}
                             </div>   
                            )
                          }}
                        </FilterResults>}
                        </ul>}
                    </div> 
                    


                <div className="collapsible-header" onClick={this.toggleDOU.bind(this)}>
                      <span><strong>Date of usage</strong></span>
              
                      </div>
                      
            <div className="collapsible-body" >
                    {!this.state.activeDOU && <ul>
                         {date_of_usage && <FilterResults
                          items={date_of_usage}
                          fuseConfig={fuseConfig10}>
                          {filteredItems10 => {
                            return(
                              <div style={{maxHeight:'150px', overflowY:'scroll', overflowX:'hidden'}} >      
                                {filteredItems10.map(item10 => <div><span><input checked={this.state.check_data.indexOf(item10.label+'-'+'date_of_usage')!=-1} style={{paddingRight:'5px', marginRight:'5px'}} onClick={()=>{this.handleFiltereSelect(item10, 'date_of_usage')}} type="checkbox" />{item10.label}</span></div>)}
                             </div>   
                            )
                          }}
                        </FilterResults>}
                        </ul>}
                    </div>      
                   
                          </Collapsible>
                        </div>
                      </StickyBox>
                         
     
                         <div className="row rep-stat col-sm-10">
                          <div className="col-sm-12 action-report-prop widget-bg-color-icon">
                   

            <div className="action-bar col-sm-12" style={{height: "125px !important", paddingRight:'15px !important'}}>
            <div className="row">
            <div className="col-sm-12">
            <div className="filter-area">
                {opp_count && <div className="aggressive_count"><span><img src={'../../images/fire.png'}/> {opp_count.length+' '}  Opposed Marks</span></div>}
                {opp_notice_count && <div style={{width:'40% !important'}} className="aggressive_count"><p><img src={'../../images/clipboard.png'}/>{opp_notice_count.length+' '} Brands with Opposition Notices</p></div>}
              </div>
            </div>  
              </div>
              <div className="row">
            <div className="col-sm-12 pull-right">
               <p style={{fontSize:'13px', textAlign:'right', paddingRight:'10px'}} >*Please hover on the marks to see more info</p>
            </div>
         </div>
              <div className="row">
                                   <div className="col-sm-12 sort-area" style={{display:'inline-flex', paddingRight:'15px !important'}}>
                                      <div style={{minWidth: '7%'}} className="input-group col-sm-1">
                                    <h5 style={{width:'100% !important', marginBottom:'0', padding: '6px 0'}} ><strong>Sort By</strong></h5>

                                </div>
                                <div className="col-sm-11 sort-btn" >
                                    {!this.state.sort_hl && <button onClick={this.handleOpphl.bind(this)} style={{paddingLeft:'10px !important'}}  className="col-sm-2 btn btn-default"> Opposed high to low</button>}
                                    {this.state.sort_hl && <button onClick={this.handleOpphl.bind(this)} style={{background:'#4285f4 !important', color:'#FFF !important', paddingLeft:'10px !important'}}  className="col-sm-2 btn btn-default"> Opposed high to low</button>}
                                    {!this.state.sort_lh && <button onClick={this.handleOpplh.bind(this)} style={{paddingLeft:'10px !important'}} className="col-sm-2 btn btn-default"> Opposed low to high</button>}
                                    {this.state.sort_lh && <button onClick={this.handleOpplh.bind(this)} style={{background:'#4285f4 !important', color:'#FFF !important', paddingLeft:'10px !important'}} className="col-sm-2 btn btn-default"> Opposed low to high</button>}
                                </div>
                                   </div>
                                </div>   
                                  </div>
                            
                                </div>
                                <div className="row">
                           <div className="col-sm-12" style={{background:'#FFF', marginLeft: '2.4%'}} >
                              <div className="elements-area">
                              {!this.props.proprietor &&
                                <div className="col-sm-12" style={{textAlign:'center'}} >
                              <img src="../../images/loader.gif" style={{display:"block",left:'50%',marginLeft:"auto",marginRight:"auto",width:'10%', height:'55%'}}/>
                              <br/>
                              <p>Fetching data...</p>
                              </div>
                              }
                              {!this.state.filterState && !this.state.sort_lh && !this.state.sort_hl &&  this.props.proprietor && this.props.proprietor_marks.data.map(data => 
                                <div id="f1_container" className="col-sm-4">
                                   <div id="f1_card" className={this.state['isFlipped'+data.id]?"shadow flip":"shadow"}>
                                     <div className="front face">
                                       <div className="elements-flip">
                                  {!data.associated_image && <h3 style={{maxHeight:'95px', textOverflow:'ellipses', overflow:'hidden'}}>{data.applied_for}</h3>}
                                  {data.associated_image && <img style={{height:'50%', width:'100% !important'}} src={data.associated_image} />}
                                  <hr size="2" style={{marginBottom:'0 !important'}} />
                                  {data.associated_image && data.applied_for && <p style={{textOverflow:'ellipsis', overflow:'hidden',whiteSpace: 'nowrap', maxWidth:'100%', textAlign:'center', paddingTop:'3px', maxHeight:'25px'}} >{data.applied_for}</p>}
                                  <div style={{display:'flex'}} >
                                  <p style={{width:'50%', textAlign:'right', paddingRight:'15px'}} ><img src='../../images/fire.png' />{data.opposition_count}</p>
                                  <div style={{borderLeft:'1px solid #DDD',height:'25px'}}></div>
                                  <p style={{width:'50%', textAlign:'left', paddingLeft:'15px'}} ><img src='../../images/clipboard.png' /> {data.opposition_notice_count}</p>
                                  </div>

                                  <div className="overlay">
                                  <ButtonGroup>
                                  <Button style={{minWidth:'84%'}} className="btn btn-primary" onClick={() => {this.showDetail(data)}}>Show Details</Button>
                                  <Button onClick={() => {this.handleSeeMore(data)}} style={{backgroundColor:'#F0E7E7 !important', color:'#345b9e !important', minWidth:'84%', border:'none', boxShadow:'none'}} >Get Realtime info</Button>
                                  </ButtonGroup>
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
                                         <li><strong>Class: </strong>{data.associated_class.sort((a,b) => a - b).toString()}</li>
                                         <table style={{marginBottom:'0 !important'}} className="table card-table">
                                         <tbody>
                                         <tr style={{textAlign:'left !important'}}>
                                            {data.proprietor && data.proprietor.length>0 && data.proprietor[0].name && <td style={{width:'42% !important'}} ><strong>Proprietor:</strong></td>}
                                            {data.proprietor && data.proprietor.length>0 && data.proprietor[0].name && <td style={{maxWidth:'50px !important',textOverflow:'ellipsis !important',overflowX:'hidden !important'}} ><ul style={{paddingTop: '0'}} >
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

                              {this.state.filterState && !this.state.sort_lh && !this.state.sort_hl && this.props.proprietor && this.state.filtereData.map(data => 
                                <div id="f1_container" className="col-sm-4">
                                   <div id="f1_card" className={this.state['isFlipped'+data.id]?"shadow flip":"shadow"}>
                                     <div className="front face">
                                       <div className="elements-flip">
                                  {!data.associated_image && <h3 style={{maxHeight:'95px', textOverflow:'ellipses', overflow:'hidden'}}>{data.applied_for}</h3>}
                                  {data.associated_image && <img style={{height:'50%', width:'100% !important'}} src={data.associated_image} />}
                                  <hr size="2" style={{marginBottom:'0 !important'}} />
                                  {data.associated_image && data.applied_for && <p style={{textOverflow:'ellipsis', overflow:'hidden',whiteSpace: 'nowrap', maxWidth:'100%', textAlign:'center', paddingTop:'3px', maxHeight:'25px'}} >{data.applied_for}</p>}
                                  <div className="overlay">
                                  <ButtonGroup>
                                  <Button style={{minWidth:'84%'}} className="btn btn-primary" onClick={() => {this.showDetail(data)}}>Show Details</Button>
                                  <Button onClick={() => {this.handleSeeMore(data)}} style={{backgroundColor:'#F0E7E7 !important', color:'#345b9e !important', minWidth:'84%', border:'none', boxShadow:'none'}} >Get Realtime info</Button>
                                  </ButtonGroup>
                                  </div>
                                  
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
                                         <li><strong>Class: </strong>{data.associated_class.sort((a,b) => a - b).toString()}</li>
                                         <table style={{marginBottom:'0 !important'}} className="table card-table">
                                         <tbody>
                                         <tr style={{textAlign:'left !important'}}>
                                            {data.proprietor && data.proprietor.length>0 && data.proprietor[0].name && <td style={{width:'42% !important'}} ><strong>Proprietor:</strong></td>}
                                            {data.proprietor && data.proprietor.length>0 && data.proprietor[0].name && <td style={{maxWidth:'50px !important',textOverflow:'ellipsis !important',overflowX:'hidden !important'}} ><ul style={{paddingTop: '0'}} >
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

                              {!this.state.filterState && !this.state.sort_lh && this.state.sort_hl && this.props.proprietor && this.props.proprietor_marks.data
                              .concat()
                              .sort((a,b) => b.opposition_notice_count - a.opposition_notice_count)
                              .sort((a,b) => b.opposition_count - a.opposition_count)
                              .map(data =>  
                                <div id="f1_container" className="col-sm-4">
                                   <div id="f1_card" className={this.state['isFlipped'+data.id]?"shadow flip":"shadow"}>
                                     <div className="front face">
                                       <div className="elements-flip">
                                  {!data.associated_image && <h3 style={{maxHeight:'95px', textOverflow:'ellipses', overflow:'hidden'}}>{data.applied_for}</h3>}
                                  {data.associated_image && <img style={{height:'50%', width:'100% !important'}} src={data.associated_image} />}
                                  <hr size="2" style={{marginBottom:'0 !important'}} />
                                  {data.associated_image && data.applied_for && <p style={{textOverflow:'ellipsis', overflow:'hidden',whiteSpace: 'nowrap', maxWidth:'100%', textAlign:'center', paddingTop:'3px', maxHeight:'25px'}} >{data.applied_for}</p>}
                                  <div className="overlay">
                                  <ButtonGroup>
                                  <Button style={{minWidth:'84%'}} className="btn btn-primary" onClick={() => {this.showDetail(data)}}>Show Details</Button>
                                  <Button onClick={() => {this.handleSeeMore(data)}} style={{backgroundColor:'#F0E7E7 !important', color:'#345b9e !important', minWidth:'84%', border:'none', boxShadow:'none'}} >Get Realtime info</Button>
                                  </ButtonGroup>
                                  </div>
                                  
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
                                         <li><strong>Class: </strong>{data.associated_class.sort((a,b) => a - b).toString()}</li>
                                         <table style={{marginBottom:'0 !important'}} className="table card-table">
                                         <tbody>
                                         <tr style={{textAlign:'left !important'}}>
                                            {data.proprietor && data.proprietor.length>0 && data.proprietor[0].name && <td style={{width:'42% !important'}} ><strong>Proprietor:</strong></td>}
                                            {data.proprietor && data.proprietor.length>0 && data.proprietor[0].name && <td style={{maxWidth:'50px !important',textOverflow:'ellipsis !important',overflowX:'hidden !important'}} ><ul style={{paddingTop: '0'}} >
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

                              {!this.state.filterState && this.state.sort_lh && !this.state.sort_hl &&  this.props.proprietor && this.props.proprietor_marks.data
                                .concat()
                                .sort((a,b) => a.opposition_notice_count - b.opposition_notice_count)
                                .sort((a,b) => a.opposition_count - b.opposition_count)
                                .map(data => 
                                <div id="f1_container" className="col-sm-4">
                                   <div id="f1_card" className={this.state['isFlipped'+data.id]?"shadow flip":"shadow"}>
                                     <div className="front face">
                                       <div className="elements-flip">
                                  {!data.associated_image && <h3 style={{maxHeight:'95px', textOverflow:'ellipses', overflow:'hidden'}}>{data.applied_for}</h3>}
                                  {data.associated_image && <img style={{height:'50%', width:'100% !important'}} src={data.associated_image} />}
                                  <hr size="2" style={{marginBottom:'0 !important'}} />
                                  {data.associated_image && data.applied_for && <p style={{textOverflow:'ellipsis', overflow:'hidden',whiteSpace: 'nowrap', maxWidth:'100%', textAlign:'center', paddingTop:'3px', maxHeight:'25px'}} >{data.applied_for}</p>}
                                  <div className="overlay">
                                  <ButtonGroup>
                                  <Button style={{minWidth:'84%'}} className="btn btn-primary" onClick={() => {this.showDetail(data)}}>Show Details</Button>
                                  <Button onClick={() => {this.handleSeeMore(data)}} style={{backgroundColor:'#F0E7E7 !important', color:'#345b9e !important', minWidth:'84%', border:'none', boxShadow:'none'}} >Get Realtime info</Button>
                                  </ButtonGroup>
                                  </div>
                                  
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
                                         <li><strong>Class: </strong>{data.associated_class.sort((a,b) => a - b).toString()}</li>
                                         <table style={{marginBottom:'0 !important'}} className="table card-table">
                                         <tbody>
                                         <tr style={{textAlign:'left !important'}}>
                                            {data.proprietor && data.proprietor.length>0 && data.proprietor[0].name && <td style={{width:'42% !important'}} ><strong>Proprietor:</strong></td>}
                                            {data.proprietor && data.proprietor.length>0 && data.proprietor[0].name && <td style={{maxWidth:'50px !important',textOverflow:'ellipsis !important',overflowX:'hidden !important'}} ><ul style={{paddingTop: '0'}} >
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

                                 {this.state.filterState && !this.state.sort_lh && this.state.sort_hl && this.props.proprietor && this.state.filtereData
                              .concat()
                              .sort((a,b) => b.opposition_notice_count - a.opposition_notice_count)
                                .sort((a,b) => b.opposition_count - a.opposition_count)
                                .map(data =>  
                                <div id="f1_container" className="col-sm-4">
                                   <div id="f1_card" className={this.state['isFlipped'+data.id]?"shadow flip":"shadow"}>
                                     <div className="front face">
                                       <div className="elements-flip">
                                 {!data.associated_image && <h3 style={{maxHeight:'95px', textOverflow:'ellipses', overflow:'hidden'}}>{data.applied_for}</h3>}
                                  {data.associated_image && <img style={{height:'50%', width:'100% !important'}} src={data.associated_image} />}
                                  <hr size="2" style={{marginBottom:'0 !important'}} />
                                  {data.associated_image && data.applied_for && <p style={{textOverflow:'ellipsis', overflow:'hidden',whiteSpace: 'nowrap', maxWidth:'100%', textAlign:'center', paddingTop:'3px', maxHeight:'25px'}} >{data.applied_for}</p>}
                                  <div className="overlay">
                                  <ButtonGroup>
                                  <Button style={{minWidth:'84%'}} className="btn btn-primary" onClick={() => {this.showDetail(data)}}>Show Details</Button>
                                  <Button onClick={() => {this.handleSeeMore(data)}} style={{backgroundColor:'#F0E7E7 !important', color:'#345b9e !important', minWidth:'84%', border:'none', boxShadow:'none'}} >Get Realtime info</Button>
                                  </ButtonGroup>
                                  </div>
                                  
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
                                         <li><strong>Class: </strong>{data.associated_class.sort((a,b) => a - b).toString()}</li>
                                         <table style={{marginBottom:'0 !important'}} className="table card-table">
                                         <tbody>
                                         <tr style={{textAlign:'left !important'}}>
                                            {data.proprietor && data.proprietor.length>0 && data.proprietor[0].name && <td style={{width:'42% !important'}} ><strong>Proprietor:</strong></td>}
                                            {data.proprietor && data.proprietor.length>0 && data.proprietor[0].name && <td style={{maxWidth:'50px !important',textOverflow:'ellipsis !important',overflowX:'hidden !important'}} ><ul style={{paddingTop: '0'}} >
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

                              {this.state.filterState && this.state.sort_lh && !this.state.sort_hl &&  this.props.proprietor && this.state.filtereData
                                .concat()
                                .sort((a,b) => a.opposition_notice_count - b.opposition_notice_count)
                                .sort((a,b) => a.opposition_count - b.opposition_count)
                                .map(data => 
                                <div id="f1_container" className="col-sm-4">
                                   <div id="f1_card" className={this.state['isFlipped'+data.id]?"shadow flip":"shadow"}>
                                     <div className="front face">
                                       <div className="elements-flip">
                                  {!data.associated_image && <h3 style={{maxHeight:'95px', textOverflow:'ellipses', overflow:'hidden'}}>{data.applied_for}</h3>}
                                  {data.associated_image && <img style={{height:'50%', width:'100% !important'}} src={data.associated_image} />}
                                  <hr size="2" style={{marginBottom:'0 !important'}} />
                                  {data.associated_image && data.applied_for && <p style={{textOverflow:'ellipsis', overflow:'hidden',whiteSpace: 'nowrap', maxWidth:'100%', textAlign:'center', paddingTop:'3px', maxHeight:'25px'}} >{data.applied_for}</p>}
                                  <div className="overlay">
                                  <ButtonGroup>
                                  <Button style={{minWidth:'84%'}} className="btn btn-primary" onClick={() => {this.showDetail(data)}}>Show Details</Button>
                                  <Button onClick={() => {this.handleSeeMore(data)}} style={{backgroundColor:'#F0E7E7 !important', color:'#345b9e !important', minWidth:'84%', border:'none', boxShadow:'none'}} >Get Realtime info</Button>
                                  </ButtonGroup>
                                  </div>
                                  
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
                                         <li><strong>Class: </strong>{data.associated_class.sort((a,b) => a - b).toString()}</li>
                                         <table style={{marginBottom:'0 !important'}} className="table card-table">
                                         <tbody>
                                         <tr style={{textAlign:'left !important'}}>
                                            {data.proprietor && data.proprietor.length>0 && data.proprietor[0].name && <td style={{width:'42% !important'}} ><strong>Proprietor:</strong></td>}
                                            {data.proprietor && data.proprietor.length>0 && data.proprietor[0].name && <td style={{maxWidth:'50px !important',textOverflow:'ellipsis !important',overflowX:'hidden !important'}} ><ul style={{paddingTop: '0'}} >
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

                              {this.state.filterState && this.state.filtereData && this.state.filtereData.length==0 &&
                                <img style={{paddingLeft:'10%'}} src="../../images/empty_state.png" />
                                }
                                </div> 
                              </div>                          
                            </div>
                             </div>
                          </div>
                        </div>
                         </div>
                         }
                         </TabPanel>
                         <TabPanel>
                         {this.props.proprietor_opposed_marks && this.props.proprietor_opposed_marks.data.length==0 && <div style={{textAlign:'center'}} >
                          <img style={{width:'20%'}} src="../../images/no-result.png" />
                          </div>              }
                          {this.props.proprietor_opposed_marks && !this.props.proprietor_opposed_marks.data.length==0 && 
                            <div>
                            <div className="row">                       
                         <div className="col-md-6 col-lg-6 col-xl-3 prop-theme-top-stats">
                             <div className="widget-bg-color-icon card-box fadeInDown animated">
                                 <div className="bg-icon pull-left">
                                     <img src="../../images/curriculum.png" />
                                 </div>
                                 <div className="text-right">
                                     {this.props.proprietor_opposed_marks && !this.props.proprietor_opposed_marks.data.length==0 && <h3 className="text-dark"><b className="counter">{this.props.proprietor_opposed_marks.data.length}</b></h3>}
                                     <p className="text-muted mb-0">Oppositions filed by proprietor</p>
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
                                 
                                    {opp_count &&  <h3 className="text-dark"><b className="counter">{opp_count.length}</b></h3>}
                                     <p className="text-muted mb-0">Oppositions filed against proprietor</p>
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
                                     {seriesOpClass && <h3 className="text-dark"><b className="counter">{seriesOpClass[0].name}</b></h3>}
                                     <p className="text-muted mb-0">Most aggressive class</p>
                                 </div>
                                 <div className="clearfix"></div>
                             </div>
                         </div>
                     </div>
     
                     <div className="row">
     
                         <div className="col-lg-12 col-xl-4">
                             <div className="card-box">
                                 
     
                                 <div className="widget-chart text-center">
                                <ReactHighcharts config = {config4}></ReactHighcharts>       
                                 </div>
                             </div>
     
                         </div>
     
                         
                     </div>
     
                      <div className="row">
     
                         <div className="col-lg-6 col-xl-2">
                             <div className="card-box">
                                
     
                                 <div className="widget-chart text-center">
                                 <ReactHighcharts config = {config5}></ReactHighcharts>    
                                 </div>
                             </div>
     
                         </div>
     
                         <div className="col-lg-6 col-xl-2">
                             <div className="card-box">
                                 
     
                                 <div className="widget-chart text-center">
                                <ReactHighcharts config = {config6}></ReactHighcharts>    
                                 </div>
                             </div>
     
                         </div>
     
                         
                     </div>
                    </div>}
                     
                         </TabPanel>

                         <TabPanel>
                         {this.props.proprietor_opposed_marks && this.props.proprietor_opposed_marks.data.length==0 && <div style={{textAlign:'center'}} >
            <img style={{width:'20%'}} src="../../images/no-result.png" />
            </div>              }
                    {this.props.proprietor_opposed_marks && !this.props.proprietor_opposed_marks.data.length==0 &&
                      
                     <div>
                     {/*<ScrollButton scrollStepInPx="70" delayInMs="10"/>*/}
                     <div className="row"> 
                       <div className="col-sm-12 col-lg-12 col-xl-4 results-prop" style={{marginTop:'0 !important', textAlign:'center'}}>
                         {this.props.proprietor && <h3 className="page-title">Opposed marks of : {this.props.proprietor.proprietor.name}</h3>}
                       </div>
                     </div>
     
                     <div className="row">
                       <div className="col-sm-12 col-lg-12 col-xl-4 results-prop ">
                       <StickyBox bottom={false|true}>
                         <div className="filters-prop col-sm-2 widget-bg-color-icon card-box">
                            <div className="col-sm-12" style={{display:'flex !important'}} >
                          <h4 style={{textAlign:'left'}} ><strong>Filters</strong></h4>
                          <h4 style={{fontSize:'13px !important',textAlign:'right',paddingLeft:'40%',paddingTop:'2%',cursor:'pointer',color:'#4285f4'}}><strong onClick={this.handleResetOp.bind(this)} style={{fontSize:'14px !important'}} >Reset</strong></h4>
                          </div>
                               <hr size="5" />
                 <Collapsible>

                     <div className="collapsible-header" onClick={this.toggleClassOp.bind(this)}>
                      <span><strong>Classes</strong></span>
              
                      </div>
                      
            <div className="collapsible-body" >
                    {!this.state.activeClassOp && <ul>
                   {clas_props && <FilterResults
                          items={clas_props}
                          fuseConfig={fuseConfig}>
                          {filteredItems => {
                            return(
                             <div style={{maxHeight:'150px', overflowY:'scroll', overflowX:'hidden'}} >    
                                {filteredItems.map(item => <div><span><input checked={this.state.check_dataOp.indexOf(item.label+'-'+'associated_class'+'op')!=-1} onClick={()=>{this.handleFiltereSelectProp(item, 'associated_class')}} style={{paddingRight:'5px', marginRight:'5px'}} type="checkbox" />{item.label}</span></div>)}
                             </div>   
                            )
                          }}
                        </FilterResults>}


                        </ul>}
                    </div>

                    <div className="collapsible-header" onClick={this.toggleStatesOp.bind(this)}>
                      <span><strong>States</strong></span>
              
                      </div>
                      
            <div className="collapsible-body" >
                    {!this.state.activeStatesOp && <ul>
                         {states_props && <FilterResults
                          items={states_props}
                          fuseConfig={fuseConfig3}>
                          {filteredItems3 => {
                            return(
                             <div style={{maxHeight:'150px', overflowY:'scroll', overflowX:'hidden'}} >    
                                {filteredItems3.map(item3 => <div>{item3.label && <span><input checked={this.state.check_dataOp.indexOf(item3.label+'-'+'state'+'op')!=-1} style={{paddingRight:'5px', marginRight:'5px'}} onClick={()=>{this.handleFiltereSelectProp(item3, 'state')}} type="checkbox" />{item3.label}</span>}</div>)}
                             </div>   
                            )
                          }}
                        </FilterResults>}
                        </ul>}
                    </div>
                  

                    <div className="collapsible-header" onClick={this.toggleStatusOp.bind(this)}>
                      <span><strong>Status</strong></span>
              
                      </div>
                      
            <div className="collapsible-body" >
                    {!this.state.activeStatusOp && <ul>
                         {status_props && <FilterResults
                          items={status_props}
                          fuseConfig={fuseConfig4}>
                          {filteredItems4 => {
                            return(
                             <div style={{maxHeight:'150px', overflowY:'scroll', overflowX:'hidden'}} >    
                                {filteredItems4.map(item4 => <div><span><input checked={this.state.check_dataOp.indexOf(item4.label+'-'+'status'+'op')!=-1} style={{paddingRight:'5px', marginRight:'5px'}} onClick={()=>{this.handleFiltereSelectProp(item4, 'status')}} type="checkbox" />{item4.label}</span></div>)}
                             </div>   
                            )
                          }}
                        </FilterResults>}
                        </ul>}
                    </div>
                    


                    <div className="collapsible-header" onClick={this.toggleTypeOp.bind(this)}>
                      <span><strong>Trademark Type</strong></span>
              
                      </div>
                      
            <div className="collapsible-body" >
                    {!this.state.activeTypeOp && <ul>
                         {type_props && <FilterResults
                          items={type_props}
                          fuseConfig={fuseConfig5}>
                          {filteredItems5 => {
                            return(
                             <div style={{maxHeight:'150px', overflowY:'scroll', overflowX:'hidden'}} >    
                                {filteredItems5.map(item5 => <div><span><input style={{paddingRight:'5px', marginRight:'5px'}} onClick={()=>{this.handleFiltereSelectProp(item5, 'type'+'op')}} type="checkbox" />{item5.label}</span></div>)}
                             </div>   
                            )
                          }}
                        </FilterResults>}
                        </ul>}
                    </div>   

             <div className="collapsible-header" onClick={this.toggleDOAOP.bind(this)}>
                      <span><strong>Date of application</strong></span>
              
                      </div>
                      
            <div className="collapsible-body" >
                    {!this.state.activeDOAOP && <ul>
                         {date_of_application && <FilterResults
                          items={date_of_application}
                          fuseConfig={fuseConfigp9}>
                          {filteredItems9 => {
                            return(
                              <div style={{maxHeight:'150px', overflowY:'scroll', overflowX:'hidden'}} >      
                                {filteredItems9.map(item9 => <div><span><input checked={this.state.check_dataOp.indexOf(item9.label+'-'+'application_date'+'op')!=-1} style={{paddingRight:'5px', marginRight:'5px'}} onClick={()=>{this.handleFiltereSelectProp(item9, 'application_date')}} type="checkbox" />{item9.label}</span></div>)}
                             </div>   
                            )
                          }}
                        </FilterResults>}
                        </ul>}
                    </div> 
                    


                <div className="collapsible-header" onClick={this.toggleDOUOP.bind(this)}>
                      <span><strong>Date of usage</strong></span>
              
                      </div>
                      
            <div className="collapsible-body" >
                    {!this.state.activeDOUOP && <ul>
                         {date_of_usage && <FilterResults
                          items={date_of_usage}
                          fuseConfig={fuseConfig10}>
                          {filteredItems10 => {
                            return(
                              <div style={{maxHeight:'150px', overflowY:'scroll', overflowX:'hidden'}} >      
                                {filteredItems10.map(item10 => <div><span><input checked={this.state.check_dataOp.indexOf(item10.label+'-'+'date_of_usage'+'op')!=-1} style={{paddingRight:'5px', marginRight:'5px'}} onClick={()=>{this.handleFiltereSelectProp(item10, 'date_of_usage')}} type="checkbox" />{item10.label}</span></div>)}
                             </div>   
                            )
                          }}
                        </FilterResults>}
                        </ul>}
                    </div>           
                   
                          </Collapsible>
                        </div>
                      </StickyBox>
                        
     
                         <div className="row rep-stat col-sm-10">
                          <div className="col-sm-12 action-report-prop widget-bg-color-icon">
                   

            <div className="action-bar col-sm-12" style={{height: "125px !important", paddingRight:'15px !important'}}>
            <div className="row">
            <div className="col-sm-12">
            <div className="filter-area">
                {opp_count_mark && <div className="aggressive_count"><span><img src={'../../images/fire.png'}/> {opp_count_mark.length} Opposed Marks</span></div>}
                {opp_notice_count_mark && <div style={{width:'40% !important'}} className="aggressive_count"><p><img src={'../../images/clipboard.png'}/>{opp_notice_count_mark.length+' '} Brands with Opposition Notices</p></div>}
              </div>
            </div>  
              </div>
              <div className="row">
            <div className="col-sm-12 pull-right">
               <p style={{fontSize:'13px', textAlign:'right', paddingRight:'10px'}} >*Please hover on the marks to see more info</p>
            </div>
         </div>
              <div className="row">
                                   <div className="col-sm-12 sort-area" style={{display:'inline-flex', paddingRight:'15px !important'}}>
                                      <div style={{minWidth: '7%'}} className="input-group col-sm-1">
                                    <h5 style={{width:'100% !important', marginBottom:'0', padding: '6px 0'}} ><strong>Sort By</strong></h5>

                                </div>
                                <div className="col-sm-11 sort-btn" >
                                {!this.state.sort_hl_prop && <button onClick={this.handleOpphlProp.bind(this)} style={{paddingLeft:'10px !important'}}  className="col-sm-2 btn btn-default"> Opposed high to low</button>}
                                {this.state.sort_hl_prop && <button onClick={this.handleOpphlProp.bind(this)} style={{background:'#4285f4 !important', color:'#FFF !important', paddingLeft:'10px !important'}}  className="col-sm-2 btn btn-default"> Opposed high to low</button>}
                                {!this.state.sort_lh_prop && <button onClick={this.handleOpplhProp.bind(this)} style={{paddingLeft:'10px !important'}} className="col-sm-2 btn btn-default"> Opposed low to high</button>}
                                {this.state.sort_lh_prop && <button onClick={this.handleOpplhProp.bind(this)} style={{background:'#4285f4 !important', color:'#FFF !important', paddingLeft:'10px !important'}} className="col-sm-2 btn btn-default"> Opposed low to high</button>}
                                   
                                </div>
                                   </div>
                                </div>   
                                  </div>
                            
                                </div>
                                <div className="row">
                           <div className="col-sm-12" style={{background:'#FFF', marginLeft: '2.4%'}} >
                              <div className="elements-area">
                              {!this.props.proprietor &&
                                <div className="col-sm-12" style={{textAlign:'center'}} >
                              <img src="../../images/loader.gif" style={{display:"block",left:'50%',marginLeft:"auto",marginRight:"auto",width:'10%', height:'55%'}}/>
                              <br/>
                              <p>Fetching data...</p>
                              </div>
                              }
                              {!this.state.filterStateProp && !this.state.sort_lh_prop && !this.state.sort_hl_prop && this.props.proprietor && this.props.proprietor_opposed_marks.data.map(data => 
                                <div id="f1_container" className="col-sm-4">
                                   <div id="f1_card" className={this.state['isFlipped'+data.id]?"shadow flip":"shadow"}>
                                     <div className="front face">
                                       <div className="elements-flip">
                                  {!data.associated_image && <h3 style={{maxHeight:'95px', textOverflow:'ellipses', overflow:'hidden'}}>{data.applied_for}</h3>}
                                  {data.associated_image && <img style={{height:'50%', width:'100% !important'}} src={data.associated_image} />}
                                  <hr size="2" style={{marginBottom:'0 !important'}} />
                                  {data.associated_image && data.applied_for && <p style={{textOverflow:'ellipsis', overflow:'hidden',whiteSpace: 'nowrap', maxWidth:'100%', textAlign:'center', paddingTop:'3px', maxHeight:'25px'}} >{data.applied_for}</p>}
                                  <div className="overlay">
                                  <ButtonGroup>
                                  <Button style={{minWidth:'84%'}} className="btn btn-primary" onClick={() => {this.showDetail(data)}}>Show Details</Button>
                                  <Button onClick={() => {this.handleSeeMore(data)}} style={{backgroundColor:'#F0E7E7 !important', color:'#345b9e !important', minWidth:'84%', border:'none', boxShadow:'none'}} >Get Realtime info</Button>
                                  </ButtonGroup>
                                  </div>
                                  
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
                                         <li><strong>Class: </strong>{data.associated_class.toString()}</li>
                                         {data.proprietor && data.proprietor.length>0 && data.proprietor[0].name && <li><strong>Proprietor: </strong><p2 onClick={()=> {this.handleProprietorClick(data)}} >{data.proprietor[0].name}</p2></li>}
                                         <li><strong>Application: </strong>{data.application_number}</li>
                                       </ul>
                                       <p style={{cursor:'pointer', color:'#4285f4'}} onClick={() => {this.handleSeeMore(data)}}>Get Realtime info</p>
                                     </div>
                                   </div>
                                   </div>)}

                              {this.state.filterStateProp && !this.state.sort_lh_prop && !this.state.sort_hl_prop && this.props.proprietor && this.state.filtereDataProp.map(data => 
                                <div id="f1_container" className="col-sm-4">
                                   <div id="f1_card" className={this.state['isFlipped'+data.id]?"shadow flip":"shadow"}>
                                     <div className="front face">
                                       <div className="elements-flip">
                                  {!data.associated_image && <h3 style={{maxHeight:'95px', textOverflow:'ellipses', overflow:'hidden'}}>{data.applied_for}</h3>}
                                  {data.associated_image && <img style={{height:'50%', width:'100% !important'}} src={data.associated_image} />}
                                  <hr size="2" style={{marginBottom:'0 !important'}} />
                                  {data.associated_image && data.applied_for && <p style={{textOverflow:'ellipsis', overflow:'hidden',whiteSpace: 'nowrap', maxWidth:'100%', textAlign:'center', paddingTop:'3px', maxHeight:'25px'}} >{data.applied_for}</p>}
                                  <div className="overlay">
                                  <ButtonGroup>
                                  <Button style={{minWidth:'84%'}} className="btn btn-primary" onClick={() => {this.showDetail(data)}}>Show Details</Button>
                                  <Button onClick={() => {this.handleSeeMore(data)}} style={{backgroundColor:'#F0E7E7 !important', color:'#345b9e !important', minWidth:'84%', border:'none', boxShadow:'none'}} >Get Realtime info</Button>
                                  </ButtonGroup>
                                  </div>
                                  
                                 
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
                                         <li><strong>Class: </strong>{data.associated_class.toString()}</li>
                                         {data.proprietor && data.proprietor.length>0 && data.proprietor[0].name && <li><strong>Proprietor: </strong><p2 onClick={()=> {this.handleProprietorClick(data)}} >{data.proprietor[0].name}</p2></li>}
                                         <li><strong>Application: </strong>{data.application_number}</li>
                                       </ul>
                                       <p style={{cursor:'pointer', color:'#4285f4'}} onClick={() => {this.handleSeeMore(data)}}>Get Realtime info</p>
                                     </div>
                                   </div>
                                   </div>)}

                              {!this.state.filterStateProp && !this.state.sort_lh_prop && this.state.sort_hl_prop && this.props.proprietor && this.props.proprietor_opposed_marks.data
                                .concat()
                                .sort((a,b) => b.opposition_notice_count - a.opposition_notice_count)
                                .sort((a,b) => b.opposition_count - a.opposition_count)
                                .map(data =>  
                                <div id="f1_container" className="col-sm-4">
                                   <div id="f1_card" className={this.state['isFlipped'+data.id]?"shadow flip":"shadow"}>
                                     <div className="front face">
                                       <div className="elements-flip">
                                  {!data.associated_image && <h3 style={{maxHeight:'95px', textOverflow:'ellipses', overflow:'hidden'}}>{data.applied_for}</h3>}
                                  {data.associated_image && <img style={{height:'50%', width:'100% !important'}} src={data.associated_image} />}
                                  <hr size="2" style={{marginBottom:'0 !important'}} />
                                  {data.associated_image && data.applied_for && <p style={{textOverflow:'ellipsis', overflow:'hidden',whiteSpace: 'nowrap', maxWidth:'100%', textAlign:'center', paddingTop:'3px', maxHeight:'25px'}} >{data.applied_for}</p>}
                                  <div className="overlay">
                                  <ButtonGroup>
                                  <Button style={{minWidth:'84%'}} className="btn btn-primary" onClick={() => {this.showDetail(data)}}>Show Details</Button>
                                  <Button onClick={() => {this.handleSeeMore(data)}} style={{backgroundColor:'#F0E7E7 !important', color:'#345b9e !important', minWidth:'84%', border:'none', boxShadow:'none'}} >Get Realtime info</Button>
                                  </ButtonGroup>
                                  </div>
                                  
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
                                         <li><strong>Class: </strong>{data.associated_class.toString()}</li>
                                         {data.proprietor && data.proprietor.length>0 && data.proprietor[0].name && <li><strong>Proprietor: </strong><p2 onClick={()=> {this.handleProprietorClick(data)}} >{data.proprietor[0].name}</p2></li>}
                                         <li><strong>Application: </strong>{data.application_number}</li>
                                       </ul>
                                       <p style={{cursor:'pointer', color:'#4285f4'}} onClick={() => {this.handleSeeMore(data)}}>Get Realtime info</p>
                                     </div>
                                   </div>
                                   </div>)}

                              {!this.state.filterStateProp && this.state.sort_lh_prop && !this.state.sort_hl_prop && this.props.proprietor_opposed_marks && this.props.proprietor_opposed_marks.data
                                .concat()
                                .sort((a,b) => a.opposition_notice_count - b.opposition_notice_count)
                                .sort((a,b) => a.opposition_count - b.opposition_count)
                                .map(data =>  
                                <div id="f1_container" className="col-sm-4">
                                   <div id="f1_card" className={this.state['isFlipped'+data.id]?"shadow flip":"shadow"}>
                                     <div className="front face">
                                       <div className="elements-flip">
                                  {!data.associated_image && <h3 style={{maxHeight:'95px', textOverflow:'ellipses', overflow:'hidden'}}>{data.applied_for}</h3>}
                                  {data.associated_image && <img style={{height:'50%', width:'100% !important'}} src={data.associated_image} />}
                                  <hr size="2" style={{marginBottom:'0 !important'}} />
                                  {data.associated_image && data.applied_for && <p style={{textOverflow:'ellipsis', overflow:'hidden',whiteSpace: 'nowrap', maxWidth:'100%', textAlign:'center', paddingTop:'3px', maxHeight:'25px'}} >{data.applied_for}</p>}
                                  <div className="overlay">
                                  <ButtonGroup>
                                  <Button style={{minWidth:'84%'}} className="btn btn-primary" onClick={() => {this.showDetail(data)}}>Show Details</Button>
                                  <Button onClick={() => {this.handleSeeMore(data)}} style={{backgroundColor:'#F0E7E7 !important', color:'#345b9e !important', minWidth:'84%', border:'none', boxShadow:'none'}} >Get Realtime info</Button>
                                  </ButtonGroup>
                                  </div>
                                  
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
                                         <li><strong>Class: </strong>{data.associated_class.toString()}</li>
                                         {data.proprietor && data.proprietor.length>0 && data.proprietor[0].name && <li><strong>Proprietor: </strong><p2 onClick={()=> {this.handleProprietorClick(data)}} >{data.proprietor[0].name}</p2></li>}
                                         <li><strong>Application: </strong>{data.application_number}</li>
                                       </ul>
                                       <p style={{cursor:'pointer', color:'#4285f4'}} onClick={() => {this.handleSeeMore(data)}}>Get Realtime info</p>
                                     </div>
                                   </div>
                                   </div>)}

                                {this.state.filterStateProp && !this.state.sort_lh_prop && this.state.sort_hl_prop && this.props.proprietor && this.state.filtereDataProp
                                .concat()
                                .sort((a,b) => b.opposition_notice_count - a.opposition_notice_count)
                                .sort((a,b) => b.opposition_count - a.opposition_count)
                                .map(data =>  
                                <div id="f1_container" className="col-sm-4">
                                   <div id="f1_card" className={this.state['isFlipped'+data.id]?"shadow flip":"shadow"}>
                                     <div className="front face">
                                       <div className="elements-flip">
                                  {!data.associated_image && <h3 style={{maxHeight:'95px', textOverflow:'ellipses', overflow:'hidden'}}>{data.applied_for}</h3>}
                                  {data.associated_image && <img style={{height:'50%', width:'100% !important'}} src={data.associated_image} />}
                                  <hr size="2" style={{marginBottom:'0 !important'}} />
                                  {data.associated_image && data.applied_for && <p style={{textOverflow:'ellipsis', overflow:'hidden',whiteSpace: 'nowrap', maxWidth:'100%', textAlign:'center', paddingTop:'3px', maxHeight:'25px'}} >{data.applied_for}</p>}
                                  <div className="overlay">
                                  <ButtonGroup>
                                  <Button style={{minWidth:'84%'}} className="btn btn-primary" onClick={() => {this.showDetail(data)}}>Show Details</Button>
                                  <Button onClick={() => {this.handleSeeMore(data)}} style={{backgroundColor:'#F0E7E7 !important', color:'#345b9e !important', minWidth:'84%', border:'none', boxShadow:'none'}} >Get Realtime info</Button>
                                  </ButtonGroup>
                                  </div>
                                  
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
                                         <li><strong>Class: </strong>{data.associated_class.toString()}</li>
                                         {data.proprietor && data.proprietor.length>0 && data.proprietor[0].name && <li><strong>Proprietor: </strong><p2 onClick={()=> {this.handleProprietorClick(data)}} >{data.proprietor[0].name}</p2></li>}
                                         <li><strong>Application: </strong>{data.application_number}</li>
                                       </ul>
                                       <p style={{cursor:'pointer', color:'#4285f4'}} onClick={() => {this.handleSeeMore(data)}}>Get Realtime info</p>
                                     </div>
                                   </div>
                                   </div>)}

                              {this.state.filterStateProp && this.state.sort_lh_prop && !this.state.sort_hl_prop && this.props.proprietor && this.state.filtereDataProp
                                .concat()
                                .sort((a,b) => a.opposition_notice_count - b.opposition_notice_count)
                                .sort((a,b) => a.opposition_count - b.opposition_count)
                                .map(data =>  
                                <div id="f1_container" className="col-sm-4">
                                   <div id="f1_card" className={this.state['isFlipped'+data.id]?"shadow flip":"shadow"}>
                                     <div className="front face">
                                       <div className="elements-flip">
                                  {!data.associated_image && <h3 style={{maxHeight:'95px', textOverflow:'ellipses', overflow:'hidden'}}>{data.applied_for}</h3>}
                                  {data.associated_image && <img style={{height:'50%', width:'100% !important'}} src={data.associated_image} />}
                                  <hr size="2" style={{marginBottom:'0 !important'}} />
                                  {data.associated_image && data.applied_for && <p style={{textOverflow:'ellipsis', overflow:'hidden',whiteSpace: 'nowrap', maxWidth:'100%', textAlign:'center', paddingTop:'3px', maxHeight:'25px'}} >{data.applied_for}</p>}
                                  <div className="overlay">
                                  <ButtonGroup>
                                  <Button style={{minWidth:'84%'}} className="btn btn-primary" onClick={() => {this.showDetail(data)}}>Show Details</Button>
                                  <Button onClick={() => {this.handleSeeMore(data)}} style={{backgroundColor:'#F0E7E7 !important', color:'#345b9e !important', minWidth:'84%', border:'none', boxShadow:'none'}} >Get Realtime info</Button>
                                  </ButtonGroup>
                                  </div>
                                  
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
                                         <li><strong>Class: </strong>{data.associated_class.toString()}</li>
                                         {data.proprietor && data.proprietor.length>0 && data.proprietor[0].name && <li><strong>Proprietor: </strong><p2 onClick={()=> {this.handleProprietorClick(data)}} >{data.proprietor[0].name}</p2></li>}
                                         <li><strong>Application: </strong>{data.application_number}</li>
                                       </ul>
                                       <p style={{cursor:'pointer', color:'#4285f4'}} onClick={() => {this.handleSeeMore(data)}}>Get Realtime info</p>
                                     </div>
                                   </div>
                                   </div>)}

                              {this.state.filterStateProp && this.state.filtereDataProp && this.state.filtereDataProp.length==0 &&
                                <img style={{paddingLeft:'10%'}} src="../../images/empty_state.png" />
                                }
                                </div> 
                              </div>                          
                            </div>
                             </div>
                          </div>
                        </div>
                         </div>}
                         </TabPanel>
                         <TabPanel>
                           {this.props.proprietor && this.props.proprietor.similar.length!=0 && <div className="col-sm-12 report-single-mark widget">
                         <div className="parameter-area-mark">
                         <div className="row">
                           <div className="col-sm-12">
                           <div className="col-sm-6">
                               <h4>Similar Proprietors</h4> 
                           </div>
                           </div>
                         </div>
                         
                         <hr />
                            <div className="col-sm-12 parameter"> 
                            {this.props.proprietor.similar.map(proprietor => 
                               <div>
                              <p onClick={() => {this.handleProprietorSimilar(proprietor)}} style={{color:'#4285f4', cursor:'pointer'}}>{proprietor.name}</p>
                              {proprietor.address && 
                              <div>  
                              <br/>
                              <p style={{textAlign:'left',color:'#c98484'}} >{proprietor.address}</p>
                              </div>}
                                <hr /></div>)}
                            </div>
                            </div>
                               </div>}
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
                            <li style={{background:'#4285f4', color:'white', fontSize:'16px', paddingBottom:'20px'}} >Mike is built using NLP and deep learning to help lawyers cut down on research time</li>
                            <li style={{background:'#4285f4', color:'white', fontSize:'16px', paddingBottom:'20px'}}>Mike allows lawyers to ask questions in simple english and it understands the context of the question</li>
                            <li style={{background:'#4285f4', color:'white', fontSize:'16px', paddingBottom:'30px'}}> Mike shows lawyers highly relevant passages of law along with analytical tools such as judge analytics, counsel analytics and much more</li>
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
                 </div> 
             </div>
          </div>}
      { this.state.global_search &&
            
    <div className="global_result_search container-fluid">
     
      <div className="row">
      <i className="fa fa-times pull-right" onClick={this.handleCloseSearch.bind(this)} aria-hidden="true"></i>
        <GlobalSearch />
      </div>
    </div>
            
            }
            </div>}
     </div>
    )
}
}

function mapStateToProps(state) {
  // console.log(' prop State check:', state);
   return ({ proprietor: state.proprietor.proprietor, proprietor_marks: state.proprietor.proprietor_marks, proprietor_opposed_marks: state.proprietor.proprietor_opposed_marks });
}

function mapDispatchToProps(dispatch) {
  return  {
      casesAction: bindActionCreators(casesAction, dispatch)
    };
  
}
export default connect(mapStateToProps,mapDispatchToProps)(PropTheme);