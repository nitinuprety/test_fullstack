import React, { Component } from 'react';
import {FormGroup,Modal, FormControl, Col, Tooltip, OverlayTrigger, ListGroup, ListGroupItem, ControlLabel, DropdownButton, MenuItem, Checkbox, Navbar, Nav, NavItem, Button, ButtonGroup, Carousel} from 'react-bootstrap';
import _ from 'lodash';
import Select from 'react-select';
import { Async } from 'react-select';
import * as casesAction  from '../actions/index';
import update from 'react-addons-update';
import Slider from 'react-slick';
import { browserHistory, Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; 
import Sidebar from 'react-sidebar';
import AlertContainer from 'react-alert';
import Autosuggest from 'react-autosuggest';
import { ROOT_URL } from '../../config';
import axios from 'axios';
import fuzzyFilterFactory from 'react-fuzzy-filter';
const {InputFilter, FilterResults} = fuzzyFilterFactory();

// import {fetchUrl } from 'fetch';

// var fetchUrl = require("fetch").fetchUrl;


class App extends Component {
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
      typeSearch: false,
      searchInput:[],
      markState:[],
      popupVisible: false,
      all_class:true,
      showModal: false,
      showModal2:false,
      showModal3:false,
      showModal4: false,
      propSearch:false,
      tradeSearch:false,
      prop_btn_select: false,
      trade_btn_select: false,
      marks: [],
      add_mark_text: false,
      mark_selection: false,
      mark_select: false,
      searchValue: '',
      flash:false,
      boolean: false,
      fuzzy:false,
      wildcard:false,
      initial:false,
      contextual:false,
      exact:false,
      general:false,
      application:false,
      sidebarOpen: false,
      sideNav: false,
      coachScreen: true,
      inputArray:[],
      operatorState:false,
      operatorState2:false,
      topWarning:false,
      selectedMark:'',
      indirectSearch:false,
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
      showConfirm:false,
      alertState: true,
      showInterested: false,
      showSearchType: false,
      showWildType:false,
      showFuzzyType:false,
      showInitialType: false,
      showBooleanType:false,
      showContextualType: false,
      showExactType: false,
      showFlashType: false,
      showGeneralType:false,
      MarkInputValue:'',
      value: '',
      suggestions: [],
      class_suggestions:[],
      inputArr:[],
      classInput:'',
      propInput:'',
      classSelect:[],
      tempMark:'',
      selectedMarkId:'',
      searchValueApp:'',
      mark_redirect:false,
      mark_error:false,
      showRT:false,
      showRTC:false,
      updatedNews:false,
      open_latest:false,
      dont_show:false

    }
    this.handleClick = this.handleClick.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.handleMarkSelection = this.handleMarkSelection.bind(this);
     this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    this.handleClassInput = this.handleClassInput.bind(this);
  }

componentWillMount() {
      this.props.casesAction.fetchCases();
      this.props.casesAction.fetchQuota();
      localStorage.setItem('via_search',true);
  // this.props.casesAction.fetchClasses();
  

}

componentDidMount() {
  if(localStorage.getItem('mark_id') && localStorage.getItem('search')) {
    this.setState({selectedMark:localStorage.getItem('mark_term'), searchValue:localStorage.getItem('search'), mark_select:true, loaderState:false, selectedMarkId:localStorage.getItem('mark_id')});
  }

  if(localStorage.getItem('searchtype')=="flash") {
    localStorage.setItem('searchtype','');
    window.location.reload();
  }
}

onChange = (event, { newValue }) => {
  this.setState({
    value: newValue
  });
  if(newValue.length>=2) {
    this.props.casesAction.ProprietorFilterSearch({query:newValue});
  }
}


showAlert = (message, type, time) => {
  this.msg.show(message, {
    time: time,
    type: type
  })
}

getOptions = (input) => {

      // console.log('input',input)
  var myInit = { method: 'GET',
               headers: {Authorization:'Token '+ localStorage.getItem('token')},
               mode: 'cors',
               cache: 'default' };
  return fetch(`${ROOT_URL}/api/trademark_class_items/?query=${input}`,myInit)
    .then((response) => {
      // console.log('response:', response);
      return response.json();
    }).then((json) => {
      return { options: json };
    });
}

showInfoAlert = (message, type) => {
  this.msg.show(message, {
    time: 10000,
    type: type
  })
}

onSetSidebarOpen(open) {
  this.setState({sidebarOpen: open});
}

handleClick() {
  if (!this.state.popupVisible) {
    // attach/remove event handler
    document.addEventListener('click', this.handleOutsideClick, false);
  } else {
    document.removeEventListener('click', this.handleOutsideClick, false);
  }

  this.setState(prevState => ({
     popupVisible: !prevState.popupVisible, topWarning:true
  }));

  if(!this.state.selectedMark && this.state.alertState && !this.state.application) {
    this.showAlert('Please select a mark', 'info', 3000);
    this.setState({alertState:false});
}

 if(!localStorage.getItem('not_en')) {
  this.showAlert('To take full advantage of MikeTM Search, please search using all search tools','info',900000);
  localStorage.setItem('not_en', true);
 }
}

handleMarkInput() {
  this.setState({MarkInputValue:this.refs.mark_input.value});
}

handleOutsideClick(e) {
  // ignore clicks on the component itself
  if (this.node.contains(e.target)) {
    return;
  }
  
  this.handleClick();
}

  handleSelectChange(value) {
    // console.log('initial value:', value);
    // // var new_value=value.label.split(" :");
    // console.log('Value onCHange:', new_value);  
   
     // console.log('search:', value);
     
      this.setState({searchInput: value});
    
  }


  handleCheck() {
    // console.log('this.refs:', this.refs.check_me.checked);
    this.setState({all_class:this.refs.check_me.checked});
  }

  handleSubmit(e) {
    if(e.keyCode==13) {

    var searchType;
    if(this.state.boolean) {
      searchType='boolean';
      localStorage.setItem('searchType',searchType);
    }

    else if(this.state.wildcard) {
      searchType='wildcard';
      localStorage.setItem('searchType',searchType);
    }

    else if(this.state.fuzzy) {
      searchType='fuzzy';
      localStorage.setItem('searchType',searchType);
    }

    else if(this.state.initial) {
      searchType='initials';
      localStorage.setItem('searchType',searchType);
    }

    else if(this.state.contextual) {
      searchType='contextual';
      localStorage.setItem('searchType',searchType);
    }

    else if(this.state.exact) {
      searchType='exact';
      localStorage.setItem('searchType',searchType);
    }

    else if(this.state.flash) {
      searchType='flash';
      localStorage.setItem('searchType',searchType);
    }

       var selectedmark = _.filter(this.props.marks, {term:this.state.selectedMark});
    // if(!this.state.selectedmark) {
    //   this.showAlert('Please select a mark to continue', 'error');
    // }
     


   // var boolean_op_check= _.filter(this.state.inputArr, function(arr){return arr=="[[&]]" || arr=="[[|]]" || arr=="[[!]]"} );
   // console.log('boolean_op_check:', boolean_op_check);

   //  var fuzzy_op_check= _.filter(this.state.inputArr, function(arr){return arr=="[[~]]"} );
   // console.log('boolean_op_check fuzzy:', fuzzy_op_check);

   // var wildcard_op_check= _.filter(this.state.inputArr, function(arr){return arr=="[[*]]" || arr=="[[?]]"} );
   // console.log('boolean_op_check wild:', wildcard_op_check);

   if(!this.state.flash && !this.state.wildcard && !this.state.fuzzy && !this.state.initial && this.state.boolean && !this.state.contextual && !this.state.exact && this.refs.search_input.value.indexOf('[[&]]') == -1 && this.refs.search_input.value.indexOf('[[|]]') == -1 && this.refs.search_input.value.indexOf('[[!]]') == -1) {
    // console.log('this.refs.search_input.value.indexOf',this.refs.search_input.value.indexOf('[[&]]' || '[[|]]' || '[[!]]'));
    this.showAlert('Please select the boolean operator','error', 3000);
   }

   else if(!this.state.flash && !this.state.wildcard && this.state.fuzzy && !this.state.initial && !this.state.boolean && !this.state.contextual && !this.state.exact && this.refs.search_input.value.indexOf('[[~]]') == -1) {
    // console.log('this.refs.search_input.value:', this.refs.search_input.value.indexOf('[[~]]'));
    this.showAlert('Please select the fuzzy operator','error', 3000);
   }

   else if(!this.state.flash && this.state.wildcard && !this.state.fuzzy && !this.state.initial && !this.state.boolean && !this.state.contextual && !this.state.exact && this.refs.search_input.value.indexOf('[[*]]') == -1 && this.refs.search_input.value.indexOf('[[?]]') == -1) {
    this.showAlert('Please select the wildcard operator','error', 3000);
   }

   else if(this.state.flash && ((this.refs.search_input.value.indexOf('[[&]]') > -1) || (this.refs.search_input.value.indexOf('[[|]]') > -1) || (this.refs.search_input.value.indexOf('[[!]]') > -1) || (this.refs.search_input.value.indexOf('[[~]]') > -1) || ( this.refs.search_input.value.indexOf('[[*]]') > -1 ) || ( this.refs.search_input.value.indexOf('[[?]]') > -1 ))) {
    // console.log('this.refs.search_input.value.indexOf',this.refs.search_input.value.indexOf('[[&]]' || '[[|]]' || '[[!]]'), 'fuzzy:', this.refs.search_input.value.indexOf('[[~]]'), 'wildcard:',this.refs.search_input.value.indexOf('[[*]]' || '[[?]]'))
    this.showAlert('No operator is needed for flash search','error', 3000);
   }

   else if(this.state.exact && ((this.refs.search_input.value.indexOf('[[&]]') > -1) || (this.refs.search_input.value.indexOf('[[|]]') > -1) || (this.refs.search_input.value.indexOf('[[!]]') > -1) || (this.refs.search_input.value.indexOf('[[~]]') > -1) || ( this.refs.search_input.value.indexOf('[[*]]') > -1 ) || ( this.refs.search_input.value.indexOf('[[?]]') > -1 ))) {
    this.showAlert('No operator is needed for exact search','error', 3000);
   }

   else if(this.state.contextual && ((this.refs.search_input.value.indexOf('[[&]]') > -1) || (this.refs.search_input.value.indexOf('[[|]]') > -1) || (this.refs.search_input.value.indexOf('[[!]]') > -1) || (this.refs.search_input.value.indexOf('[[~]]') > -1) || ( this.refs.search_input.value.indexOf('[[*]]') > -1 ) || ( this.refs.search_input.value.indexOf('[[?]]') > -1 ))) {
    this.showAlert('No operator is needed for contextual search','error', 3000);
   }

   else if(this.state.initial && ((this.refs.search_input.value.indexOf('[[&]]') > -1) || (this.refs.search_input.value.indexOf('[[|]]') > -1) || (this.refs.search_input.value.indexOf('[[!]]') > -1) || (this.refs.search_input.value.indexOf('[[~]]') > -1) || ( this.refs.search_input.value.indexOf('[[*]]') > -1 ) || ( this.refs.search_input.value.indexOf('[[?]]') > -1 ))) {
    this.showAlert('No operator is needed for initial search','error', 3000);
   }

   else if(this.state.boolean && ((this.refs.search_input.value.indexOf('[[~]]') > -1) ||( this.refs.search_input.value.indexOf('[[*]]') > -1 ) || ( this.refs.search_input.value.indexOf('[[?]]') > -1 ))) {
    this.showAlert('Please use the boolean operators only','error', 3000);
   }

   else if(this.state.fuzzy && ((this.refs.search_input.value.indexOf('[[&]]') > -1) || (this.refs.search_input.value.indexOf('[[|]]') > -1) || (this.refs.search_input.value.indexOf('[[!]]') > -1) || ( this.refs.search_input.value.indexOf('[[*]]') > -1 ) || ( this.refs.search_input.value.indexOf('[[?]]') > -1 ))) {
    this.showAlert('Please use the fuzzy operator only','error', 3000);
   }

   else if(this.state.wildcard && ((this.refs.search_input.value.indexOf('[[&]]') > -1) || (this.refs.search_input.value.indexOf('[[|]]') > -1) || (this.refs.search_input.value.indexOf('[[!]]') > -1) || (this.refs.search_input.value.indexOf('[[~]]') > -1))) {
    this.showAlert('Please use the wildcard operator only','error', 3000);
   }


   else if(e.keyCode == 13 && !this.state.selectedMark) {
     this.showAlert('Please select a mark to continue', 'error', 3000);
   }


   else if( !this.state.flash && !this.state.wildcard && !this.state.fuzzy && !this.state.initial && !this.state.boolean && !this.state.contextual && !this.state.exact) {
    this.showAlert('Please select a search type', 'error', 3000);
   }

   else if(e.keyCode == 13 && this.state.selectedMark && !this.state.flash || this.state.wildcard || this.state.fuzzy || this.state.initial || this.state.boolean || this.state.contextual || this.state.exact) {
      var local_search=this.refs.search_input.value;
     for(var i=0;i<=this.state.inputArr.length;i++) {
           local_search = local_search.replace(",","");
     }
      
      var class_arr = [];
      _.map(this.state.searchInput, function(cl){
       // return console.log('cl:', cl);
           var inter_class= cl.label.replace("Class ", "");
           class_arr.push(inter_class);
      });
      // console.log("local_search:", class_arr);

      // console.log('this.state.selectedMark:', this.state.selectedMark);
       // browserHistory.push('/result/'+this.state.selectedMark);
       localStorage.setItem('mark_id', selectedmark[0].id);
       localStorage.setItem('mark_term', selectedmark[0].term);
       localStorage.setItem('search', local_search);
       localStorage.setItem('searchType',searchType);
       localStorage.setItem('search_classes', JSON.stringify(class_arr));
       localStorage.setItem('page',1);
        this.props.casesAction.vulnerability(selectedmark[0].id);
       // console.log('By passed:');
      var searchtype = localStorage.getItem('searchType');
      // console.log('fuzzy check:', searchtype)
       var fuzzyInput;
       if(searchtype =='fuzzy') {

         fuzzyInput = local_search.split('[[~]]');
        // console.log('fuzzyInput:', fuzzyInput);
        this.props.casesAction.GlobalSearch({query:fuzzyInput[0], search_base:'trademark',mark:localStorage.getItem('mark_id'), search_type:localStorage.getItem('searchType'),fuzzy_depth: fuzzyInput[1], search_classes:localStorage.getItem('search_classes'),page:1 });
        this.setState({loaderState:true});
       }

       else {
        // console.log('NotfuzzyInput:');
        this.props.casesAction.GlobalSearch({query:localStorage.getItem('search'), search_base:'trademark',mark:localStorage.getItem('mark_id'), search_type:localStorage.getItem('searchType'), search_classes:localStorage.getItem('search_classes'), page:1 });
        this.setState({loaderState:true});
       }
       
       // this.props.casesAction.GlobalSearch({search_type:searchType,query:this.refs.search_input.value, mark:this.state.selectedMark});
    }
    }
    
  }

  handleSubmitClick() {
    console.log('handleSubmit')
    var searchType;
    if(this.state.boolean) {
      searchType='boolean';
      localStorage.setItem('searchType',searchType);
    }

    else if(this.state.wildcard) {
      searchType='wildcard';
      localStorage.setItem('searchType',searchType);
    }

    else if(this.state.fuzzy) {
      searchType='fuzzy';
      localStorage.setItem('searchType',searchType);
    }

    else if(this.state.initial) {
      searchType='initials';
      localStorage.setItem('searchType',searchType);
    }

    else if(this.state.contextual) {
      searchType='contextual';
      localStorage.setItem('searchType',searchType);
    }

    else if(this.state.exact) {
      searchType='exact';
      localStorage.setItem('searchType',searchType);
    }

    else if(this.state.flash) {
      searchType='flash';
      localStorage.setItem('searchType',searchType);
    }

       var selectedmark = _.filter(this.props.marks, {term:this.state.selectedMark});
    // if(!this.state.selectedmark) {
    //   this.showAlert('Please select a mark to continue', 'error');
    // }
     


   // var boolean_op_check= _.filter(this.state.inputArr, function(arr){return arr=="[[&]]" || arr=="[[|]]" || arr=="[[!]]"} );
   // console.log('boolean_op_check:', boolean_op_check);

   //  var fuzzy_op_check= _.filter(this.state.inputArr, function(arr){return arr=="[[~]]"} );
   // console.log('boolean_op_check fuzzy:', fuzzy_op_check);

   // var wildcard_op_check= _.filter(this.state.inputArr, function(arr){return arr=="[[*]]" || arr=="[[?]]"} );
   // console.log('boolean_op_check wild:', wildcard_op_check);

   if(!this.state.flash && !this.state.wildcard && !this.state.fuzzy && !this.state.initial && this.state.boolean && !this.state.contextual && !this.state.exact && this.refs.search_input.value.indexOf('[[&]]') == -1 && this.refs.search_input.value.indexOf('[[|]]') == -1 && this.refs.search_input.value.indexOf('[[!]]') == -1) {
    // console.log('this.refs.search_input.value.indexOf',this.refs.search_input.value.indexOf('[[&]]' || '[[|]]' || '[[!]]'));
    this.showAlert('Please select the boolean operator','error', 3000);
   }

   else if(!this.state.flash && !this.state.wildcard && this.state.fuzzy && !this.state.initial && !this.state.boolean && !this.state.contextual && !this.state.exact && this.refs.search_input.value.indexOf('[[~]]') == -1) {
    // console.log('this.refs.search_input.value:', this.refs.search_input.value.indexOf('[[~]]'));
    this.showAlert('Please select the fuzzy operator','error', 3000);
   }

   else if(!this.state.flash && this.state.wildcard && !this.state.fuzzy && !this.state.initial && !this.state.boolean && !this.state.contextual && !this.state.exact && this.refs.search_input.value.indexOf('[[*]]') == -1 && this.refs.search_input.value.indexOf('[[?]]') == -1) {
    this.showAlert('Please select the wildcard operator','error', 3000);
   }

   else if(this.state.flash && ((this.refs.search_input.value.indexOf('[[&]]') > -1) || (this.refs.search_input.value.indexOf('[[|]]') > -1) || (this.refs.search_input.value.indexOf('[[!]]') > -1) || (this.refs.search_input.value.indexOf('[[~]]') > -1) || ( this.refs.search_input.value.indexOf('[[*]]') > -1 ) || ( this.refs.search_input.value.indexOf('[[?]]') > -1 ))) {
    // console.log('this.refs.search_input.value.indexOf',this.refs.search_input.value.indexOf('[[&]]' || '[[|]]' || '[[!]]'), 'fuzzy:', this.refs.search_input.value.indexOf('[[~]]'), 'wildcard:',this.refs.search_input.value.indexOf('[[*]]' || '[[?]]'))
    this.showAlert('No operator is needed for flash search','error', 3000);
   }

   else if(this.state.exact && ((this.refs.search_input.value.indexOf('[[&]]') > -1) || (this.refs.search_input.value.indexOf('[[|]]') > -1) || (this.refs.search_input.value.indexOf('[[!]]') > -1) || (this.refs.search_input.value.indexOf('[[~]]') > -1) || ( this.refs.search_input.value.indexOf('[[*]]') > -1 ) || ( this.refs.search_input.value.indexOf('[[?]]') > -1 ))) {
    this.showAlert('No operator is needed for exact search','error', 3000);
   }

   else if(this.state.contextual && ((this.refs.search_input.value.indexOf('[[&]]') > -1) || (this.refs.search_input.value.indexOf('[[|]]') > -1) || (this.refs.search_input.value.indexOf('[[!]]') > -1) || (this.refs.search_input.value.indexOf('[[~]]') > -1) || ( this.refs.search_input.value.indexOf('[[*]]') > -1 ) || ( this.refs.search_input.value.indexOf('[[?]]') > -1 ))) {
    this.showAlert('No operator is needed for contextual search','error', 3000);
   }

   else if(this.state.initial && ((this.refs.search_input.value.indexOf('[[&]]') > -1) || (this.refs.search_input.value.indexOf('[[|]]') > -1) || (this.refs.search_input.value.indexOf('[[!]]') > -1) || (this.refs.search_input.value.indexOf('[[~]]') > -1) || ( this.refs.search_input.value.indexOf('[[*]]') > -1 ) || ( this.refs.search_input.value.indexOf('[[?]]') > -1 ))) {
    this.showAlert('No operator is needed for initial search','error', 3000);
   }

   else if(this.state.boolean && ((this.refs.search_input.value.indexOf('[[~]]') > -1) ||( this.refs.search_input.value.indexOf('[[*]]') > -1 ) || ( this.refs.search_input.value.indexOf('[[?]]') > -1 ))) {
    this.showAlert('Please use the boolean operators only','error', 3000);
   }

   else if(this.state.fuzzy && ((this.refs.search_input.value.indexOf('[[&]]') > -1) || (this.refs.search_input.value.indexOf('[[|]]') > -1) || (this.refs.search_input.value.indexOf('[[!]]') > -1) || ( this.refs.search_input.value.indexOf('[[*]]') > -1 ) || ( this.refs.search_input.value.indexOf('[[?]]') > -1 ))) {
    this.showAlert('Please use the fuzzy operator only','error', 3000);
   }

   else if(this.state.wildcard && ((this.refs.search_input.value.indexOf('[[&]]') > -1) || (this.refs.search_input.value.indexOf('[[|]]') > -1) || (this.refs.search_input.value.indexOf('[[!]]') > -1) || (this.refs.search_input.value.indexOf('[[~]]') > -1))) {
    this.showAlert('Please use the wildcard operator only','error', 3000);
   }


   else if(!this.state.selectedMark) {
     this.showAlert('Please select a mark to continue', 'error', 3000);
   }


   else if( !this.state.flash && !this.state.wildcard && !this.state.fuzzy && !this.state.initial && !this.state.boolean && !this.state.contextual && !this.state.exact) {
    this.showAlert('Please select a search type', 'error', 3000);
   }

   else if(this.state.selectedMark && !this.state.flash || this.state.wildcard || this.state.fuzzy || this.state.initial || this.state.boolean || this.state.contextual || this.state.exact) {
      var local_search=this.refs.search_input.value;
     for(var i=0;i<=this.state.inputArr.length;i++) {
           local_search = local_search.replace(",","");
     }
      
      var class_arr = [];
      _.map(this.state.searchInput, function(cl){
       // return console.log('cl:', cl);
           var inter_class= cl.label.replace("Class ", "");
           class_arr.push(inter_class);
      });
      // console.log("local_search:", class_arr);

      // console.log('this.state.selectedMark:', this.state.selectedMark);
       // browserHistory.push('/result/'+this.state.selectedMark);
       localStorage.setItem('mark_id', selectedmark[0].id);
       localStorage.setItem('mark_term', selectedmark[0].term);
       localStorage.setItem('search', local_search);
       localStorage.setItem('searchType',searchType);
       localStorage.setItem('search_classes', JSON.stringify(class_arr));
       localStorage.setItem('page',1);
        this.props.casesAction.vulnerability(selectedmark[0].id);
       // console.log('By passed:');
      var searchtype = localStorage.getItem('searchType');
      // console.log('fuzzy check:', searchtype)
       var fuzzyInput;
       if(searchtype =='fuzzy') {

         fuzzyInput = local_search.split('[[~]]');
        // console.log('fuzzyInput:', fuzzyInput);
        this.props.casesAction.GlobalSearch({query:fuzzyInput[0], search_base:'trademark',mark:localStorage.getItem('mark_id'), search_type:localStorage.getItem('searchType'),fuzzy_depth: fuzzyInput[1], search_classes:localStorage.getItem('search_classes'),page:1 });
        this.setState({loaderState:true});
       }

       else {
        // console.log('NotfuzzyInput:');
        this.props.casesAction.GlobalSearch({query:localStorage.getItem('search'), search_base:'trademark',mark:localStorage.getItem('mark_id'), search_type:localStorage.getItem('searchType'), search_classes:localStorage.getItem('search_classes'), page:1 });
        this.setState({loaderState:true});
       }
       
       // this.props.casesAction.GlobalSearch({search_type:searchType,query:this.refs.search_input.value, mark:this.state.selectedMark});
    }
  }

  close() {
  this.setState({ showModal : false });
}

open() {

  this.setState({ showModal : true });
  this.setMarkData();
  
}

 close2() {
  this.setState({ showModal2 : false });
}

open2() {

  this.setState({ showModal2 : true });
  
}

close3() {
  this.setState({ showModal3 : false });
}

open3() {

  this.setState({ showModal3 : true });
  
}

close4() {
  this.setState({ showModal4 : false });
}

open4() {

  this.setState({ showModal4 : true });
  
}

handlePropSearch() {
  this.setState({propSearch: true, tradeSearch: false, prop_btn_select:true, trade_btn_select: false, showModal2: true, showModal: false});
}

handleTradeSearch () {
  this.setState({tradeSearch:true, propSearch: false, prop_btn_select: false, trade_btn_select:true, showModal3:true, showModal:false})
}

handleFirstTradeSearch() {
  this.setState({showModal4:true, showModal:false});
}

handleBack() {
  this.setState({showModal2:false, showModal:true, showModal3:false});
}

handleTradeBack() {
  this.setState({showModal3:true, showModal4:false});
}

handleAddMark() {
  if(this.props.marks.length==this.props.quota.quota) {
    this.showAlert('Your marks quota is full, please contact our team to get more marks', 'error', 3000);
  }

  else {
     // console.log('Function Called');
  this.setState({showModal4:true, showModal3:false});
  }
 
}

handleMarkSelection(data) {
  if(this.state.flash) {
    this.showAlert('Flash search is being executed now', 'info', 2000);
    setTimeout(() => {
    var class_arr = [];
     _.map(this.state.searchInput, function(cl){
       // return console.log('cl:', cl);
           var inter_class= cl.label.replace("Class ", "");
           class_arr.push(inter_class);
      });
      // console.log("local_search:", class_arr);
      localStorage.setItem('mark_id', data.id);
       localStorage.setItem('mark_term', data.term);
       localStorage.setItem('search', data.term);
       localStorage.setItem('searchType','flash');
       localStorage.setItem('search_classes', JSON.stringify(class_arr));
       localStorage.setItem('page',1);
       localStorage.setItem('page_flash',1);
      localStorage.setItem('page_wild',1);
      localStorage.setItem('page_contextual',1);
      localStorage.setItem('page_fuzzy',1);
      localStorage.setItem('page_initial',1);
       this.props.casesAction.vulnerability(data.id);
        // this.props.casesAction.GlobalSearch({query:data.term, search_base:'trademark',mark:data.id, search_type:'flash', search_classes:JSON.stringify(class_arr), page:1 });

      this.props.casesAction.GlobalFlashSearch({query:data.term, search_base:'trademark',mark:data.id, search_type:'flash', search_classes:JSON.stringify(class_arr), page:1 });
      this.setState({loaderState:true,searchValue:localStorage.getItem('search')});

        var wildcard_query = '[[*]]'+data.term+'[[*]]';
        console.log('wildcard_query:',wildcard_query);
        var final_wild = wildcard_query.replace(/ /g, "[[*]]");
        localStorage.setItem('wildcard_query',final_wild);
        var fuzzy_length= Math.round(data.term.length*0.4) ;
        console.log('fuzzy_length:',fuzzy_length);
        localStorage.setItem('fuzzy_depth',fuzzy_length);
        var initial_check = data.term.split(' ');
        console.log('initial_check:',initial_check);
        if(initial_check.length>1){
          this.props.casesAction.flashInitialsSearch({query:data.term, search_base:'trademark',mark:data.id, search_type:'initials', search_classes:JSON.stringify(class_arr), page:1 });
          localStorage.setItem('flash_initial',true);
        }
        else {
          localStorage.setItem('flash_initial',false);
        }
        this.props.casesAction.flashWildcardSearch({query:final_wild, search_base:'trademark',mark:data.id, search_type:'wildcard', search_classes:JSON.stringify(class_arr), page:1 });
        // this.props.casesAction.flashContextualSearch({query:this.state.selectedMark, search_base:'trademark',mark:this.state.selectedMarkId, search_type:'contextual', search_classes:JSON.stringify(class_arr), page:1 });
        this.props.casesAction.flashFuzzySearch({query:data.term, search_base:'trademark',mark:data.id, search_type:'fuzzy',fuzzyDepth: fuzzy_length, search_classes:JSON.stringify(class_arr), page:1 });
        this.setState({loaderState:true});
      }, 2000);
     
  }

  else if(this.state.general) {
    this.showAlert('Standard search is being executed now', 'info', 2000);
      this.setState({searchValue:this.state.selectedMark});

      setTimeout(()=>{
      var class_arr = [];
     _.map(this.state.searchInput, function(cl){
       // return console.log('cl:', cl);
           var inter_class= cl.label.replace("Class ", "");
           class_arr.push(inter_class);
      })});
      // console.log("local_search:", class_arr);
      localStorage.setItem('mark_id', this.state.selectedMarkId);
      localStorage.setItem('mark_term', this.state.selectedMark);
      localStorage.setItem('search', this.state.selectedMark);
      localStorage.setItem('searchType','Standard');
      localStorage.setItem('search_classes', JSON.stringify(class_arr));
      localStorage.setItem('page',1);
      this.props.casesAction.vulnerability(this.state.selectedMarkId);
      this.props.casesAction.GlobalSearch({query:this.state.selectedMark, search_base:'trademark',mark:this.state.selectedMarkId, search_type:'flash', search_classes:JSON.stringify(class_arr), page:1 });
      this.setState({loaderState:true,searchValue:localStorage.getItem('search')});
  }
  else {
      // console.log('HandleMarkSelection');
  var MarkState= this.state.mark_selection;
  this.setState({mark_selection:!MarkState, showModal3: false,mark_select:true, selectedMark:data.term, selectedMarkId:data.id});
  this.showAlert('Mark Selected','success', 3000);

  setTimeout(()=>{
        this.showInfoAlert('Tap on search bar and select the search type','info');
      }, 500);
  }

}

handleMarkSubmit() {
  var markInput= this.state.marks;
  
  markInput.push({label:this.refs.mark_input.value, value:this.refs.mark_input.value});
  if(this.state.marks.length>0)
  {this.setState({marks: markInput, showModal4:false, showModal3:false, add_mark_text:true, showConfirm:true, tempMark:this.refs.mark_input.value});}
  else if(this.state.marks.length=0) {
    {this.setState({marks: markInput, showModal4:false, showModal3:true, add_mark_text:false, tempMark:this.refs.mark_input.value});}
  }
  // console.log('Marks State:',this.state.marks);
}

handleConfirmAdd() {
  this.props.casesAction.addMark({mark:this.state.MarkInputValue});
  this.setState({showModal3:true, showConfirm:false});
}

handleBackConfirm() {
  this.setState({showModal4:true, showConfirm:false});
}

close_filter() {
  this.setState({mark_select:false, showModal: true, selectedMark:'', selectedMarkId:'', topWarning:true});
   this.setMarkData();
}

handleAndOperatorClick() {
  var appendAnd=[];
  appendAnd.push(this.refs.search_input.value);
  appendAnd.push('[[&]]');
  this.setState({searchValue:appendAnd, inputArr:appendAnd});
}

handleOrOperatorClick() {
   var appendAnd=[];
  appendAnd.push(this.refs.search_input.value);
  appendAnd.push('[[|]]');
  var appendInput = this.refs.search_input.value + '[[|]]';
  console.log('appendInput:', appendInput);
  this.setState({searchValue:appendInput, inputArr:appendAnd});
}

handleNotOperatorClick() {
   var appendAnd=[];
  appendAnd.push(this.refs.search_input.value);
  appendAnd.push('[[!]]');
  var appendInput = this.refs.search_input.value + '[[!]] ';
  this.setState({searchValue:appendAnd, inputArr:appendAnd});
}

  handleFuzzyOperatorClick() {
    var appendAnd=[];
  appendAnd.push(this.refs.search_input.value);
  appendAnd.push('[[~]]');
  this.setState({searchValue:appendAnd, inputArr:appendAnd});
  }

  handleWildOperatorClick() {
  var appendAnd=[];
  appendAnd.push(this.refs.search_input.value);
  appendAnd.push('[[*]]');
  this.setState({searchValue:appendAnd, inputArr:appendAnd});
  }

  handleWildDashClick() {
  var appendAnd=[];
  appendAnd.push(this.refs.search_input.value);
  appendAnd.push('[[?]]');
  this.setState({searchValue:appendAnd, inputArr:appendAnd});
  }

handleGlobalSearchChange() {
  var appendInput = this.refs.search_input.value;
  this.setState({searchValue:this.refs.search_input.value});
  }

  handleGlobalSearchChangeApp() {
   this.setState({searchValueApp:this.refs.search_application.value});
  }

handleBooleanCheck() {
    this.setState({boolean:!this.state.boolean, 
      fuzzy:false,
      exact:false,
      initial:false,
      wildcard:false,
      contextual:false,
      flash:false,
      application:false
       });
    if(!this.state.selectedMark && !this.state.selectedMarkId) {
      this.showAlert('Please select a mark', 'info', 3000);
    }
    this.refs.search_input.value = '';
    this.setState({searchValue:''});
  }

handleFuzzyCheck() {
      this.setState({boolean:false, 
      fuzzy:!this.state.fuzzy,
      exact:false,
      initial:false,
      wildcard:false,
      contextual:false,
      flash:false,
      application:false
       });
      if(!this.state.selectedMark && !this.state.selectedMarkId) {
      this.showAlert('Please select a mark', 'info', 3000);
    }
    this.refs.search_input.value = '';
    this.setState({searchValue:''});
  }

  handleWildcardCheck() {
     this.setState({boolean:false, 
      fuzzy:false,
      exact:false,
      initial:false,
      wildcard:!this.state.wildcard,
      contextual:false,
      flash:false,
      application:false
       });
     if(!this.state.selectedMark && !this.state.selectedMarkId) {
      this.showAlert('Please select a mark', 'info', 3000);
    }
    this.refs.search_input.value = '';
    this.setState({searchValue:''});
  }

  handleInitialCheck() {
  this.setState({boolean:false, 
      fuzzy:false,
      exact:false,
      initial:!this.state.initial,
      wildcard:false,
      contextual:false,
      flash:false,
      application:false
       });
  if(!this.state.selectedMark && !this.state.selectedMarkId) {
      this.showAlert('Please select a mark', 'info', 3000);
    }
    this.refs.search_input.value = '';
    this.setState({searchValue:''});
  }

  handleContextualCheck () {
    this.setState({boolean:false, 
      fuzzy:false,
      exact:false,
      initial:false,
      wildcard:false,
      contextual:!this.state.contextual,
      flash:false,
      application:false
       });
    if(!this.state.selectedMark && !this.state.selectedMarkId) {
      this.showAlert('Please select a mark', 'info', 3000);
    }
    this.refs.search_input.value = '';
    this.setState({searchValue:''});
  }

  handleExactCheck() {
     this.setState({boolean:false, 
      fuzzy:false,
      exact:!this.state.exact,
      initial:false,
      wildcard:false,
      contextual:false,
      flash:false,
      application:false
       });
     if(!this.state.selectedMark && !this.state.selectedMarkId) {
      this.showAlert('Please select a mark', 'info', 3000);
    }
    this.refs.search_input.value = '';
    this.setState({searchValue:''});
  }

  handleFlashCheck() {
    this.setState({boolean:false, 
      fuzzy:false,
      exact:false,
      initial:false,
      wildcard:false,
      contextual:false,
      flash:!this.state.flash,
      application:false
       });
    // console.log('selectedMark:', this.state.selectedMark, 'selectedMarkId:', this.state.selectedMarkId);
    if(this.state.selectedMark && this.state.selectedMarkId) {
      this.showAlert('Flash search is being executed now', 'info', 2000);
      this.setState({searchValue:this.state.selectedMark});

      setTimeout(()=>{
      var class_arr = [];
     _.map(this.state.searchInput, function(cl){
       // return console.log('cl:', cl);
           var inter_class= cl.label.replace("Class ", "");
           class_arr.push(inter_class);
      });
      // console.log("local_search:", class_arr);
      localStorage.setItem('mark_id', this.state.selectedMarkId);
      localStorage.setItem('mark_term', this.state.selectedMark);
      localStorage.setItem('search', this.state.selectedMark);
      localStorage.setItem('searchType','flash');
      localStorage.setItem('search_classes', JSON.stringify(class_arr));
      localStorage.setItem('page_flash',1);
      localStorage.setItem('page_wild',1);
      localStorage.setItem('page_contextual',1);
      localStorage.setItem('page_fuzzy',1);
      localStorage.setItem('page_initial',1);
      localStorage.setItem('via_search',true);
      this.props.casesAction.vulnerability(this.state.selectedMarkId);
      this.setState({loaderState:true,searchValue:localStorage.getItem('search')});
      this.props.casesAction.GlobalFlashSearch({query:this.state.selectedMark, search_base:'trademark',mark:this.state.selectedMarkId, search_type:'standard', search_classes:JSON.stringify(class_arr), page:1, flash_flag:true });

        var wildcard_query = '[[*]]'+this.state.selectedMark+'[[*]]';
        var final_wild = wildcard_query.replace(/ /g, "[[*]]");
        // var wildcard_query1= '[[*]]'+mark_arr[mark_arr_length-(mark_arr_length-1)]+
        console.log('wildcard_query:',final_wild);
        localStorage.setItem('wildcard_query',final_wild);
        var fuzzy_length= Math.round(this.state.selectedMark.length*0.4) ;
        console.log('fuzzy_length:',fuzzy_length);
        localStorage.setItem('fuzzy_depth',fuzzy_length);
        var initial_check = this.state.selectedMark.split(' ');
        console.log('initial_check:',initial_check);
        this.props.casesAction.ResetSearchResults();
        if(initial_check.length>1){
          this.props.casesAction.flashInitialsSearch({query:this.state.selectedMark, search_base:'trademark',mark:this.state.selectedMarkId, search_type:'initials', search_classes:JSON.stringify(class_arr), page:1,flash_flag:true });
          localStorage.setItem('flash_initial',true);
        }
        else {
          localStorage.setItem('flash_initial',false);
        }

        this.props.casesAction.flashWildcardSearch({query:final_wild, search_base:'trademark',mark:this.state.selectedMarkId, search_type:'flash_wildcard', search_classes:JSON.stringify(class_arr), page:1, flash_flag:true });
        // this.props.casesAction.flashContextualSearch({query:this.state.selectedMark, search_base:'trademark',mark:this.state.selectedMarkId, search_type:'contextual', search_classes:JSON.stringify(class_arr), page:1 });
        this.props.casesAction.flashFuzzySearch({query:this.state.selectedMark, search_base:'trademark',mark:this.state.selectedMarkId, search_type:'fuzzy',fuzzy_depth:fuzzy_length, search_classes:JSON.stringify(class_arr), page:1,flash_flag:true });
       }, 2000);
    }

    else if(!this.state.selectedMark && !this.state.selectedMarkId) {
      this.showAlert('Please select a mark to execute this search','info',3000);
    }
  }

  handleGeneralCheck() {
    this.setState({boolean:false, 
      fuzzy:false,
      exact:false,
      initial:false,
      wildcard:false,
      contextual:false,
      flash:false,
      general:!this.state.general
       });

    if(this.state.selectedMark && this.state.selectedMarkId) {
      this.showAlert('Standard search is being executed now', 'info', 2000);
      this.setState({searchValue:this.state.selectedMark});

      setTimeout(()=>{
      var class_arr = [];
     _.map(this.state.searchInput, function(cl){
       // return console.log('cl:', cl);
           var inter_class= cl.label.replace("Class ", "");
           class_arr.push(inter_class);
      });
      // console.log("local_search:", class_arr);
      localStorage.setItem('mark_id', this.state.selectedMarkId);
      localStorage.setItem('mark_term', this.state.selectedMark);
      localStorage.setItem('search', this.state.selectedMark);
      localStorage.setItem('searchType','standard');
      localStorage.setItem('search_classes', JSON.stringify(class_arr));
      localStorage.setItem('page',1);
      localStorage.setItem('via_search',true);
      this.props.casesAction.vulnerability(this.state.selectedMarkId);
      this.props.casesAction.GlobalSearch({query:this.state.selectedMark, search_base:'trademark',mark:this.state.selectedMarkId, search_type:'standard', search_classes:JSON.stringify(class_arr), page:1 });
      this.setState({loaderState:true,searchValue:localStorage.getItem('search')});

        // var wildcard_query = this.state.selectedMark+'[[*]]';
        // console.log('wildcard_query:',wildcard_query);
       }, 2000);
    }

    else if(!this.state.selectedMark && !this.state.selectedMarkId) {
      this.showAlert('Please select a mark to execute this search','info',3000);
    }
  }

  handleApplicationSearch() {
    this.setState({boolean:false, 
      fuzzy:false,
      exact:false,
      initial:false,
      wildcard:false,
      contextual:false,
      flash:false,
      application:!this.state.application
       });

    this.showAlert('Please enter the application number in the input field and click on the search icon','info',4000);
    this.setState({selectedMark:'',selectedMarkId:'',searchValue:'',mark_select:false});
  }

  openNav() {
    this.setState({sideNav: true});
  }

  closeNav() {
    this.setState({sideNav: false});
  }

  handleModalClose() {
      this.setState({showModal:false, showModal2:false, showModal3:false, showModal4:false});
    }

    handleSignOut() {
      this.props.casesAction.signoutUser();
    }

  hideCoach() {
    this.setState({coachScreen:false});
  }  

  showCoach() {
    this.setState({coachScreen:true});
  }



handleProprietorSearch(data) {
  this.props.casesAction.RedirectToProprietor(data.id);
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
handleInterested() {
  // console.log('FUnction called');
  this.setState({interested:true});
}

openConfirm() {
  this.setState({showConfirm:true, showModal4:false, showModal3:false, showModal2:false, showModal:false});
}

closeConfirm() {
 this.setState({showConfirm:false});
}

handleConfirmBack() {
  this.setState({showConfirm:false, showModal4:true});
}

closeInterested() {
this.setState({showInterested:false});
}

openInterested() {
  this.setState({showInterested:true, showTmLitigation:false, showTmManager: false, showTmWatch: false})
}

handleSeeSearchType() {
  this.setState ({showWildType : true});
  // if(this.state.flash) {
  //   this.setState({showFlashType:true});
  // }

  // else if(this.state.wildcard) {
  //   this.setState({showWildType:true});
  // }

  // else if(this.state.fuzzy) {
  //   this.setState({showFuzzyType:true});
  // }

  // else if(this.state.initial) {
  //   this.setState({showInitialType:true});
  // }

  // else if(this.state.boolean) {
  //   this.setState({showBooleanType:true});
  // }

  // else if(this.state.contextual) {
  //   this.setState({showContextualType:true});
  // }

  // else if(this.state.exact) {
  //   this.setState({showExactType:true});
  // }
}

closeSearchType() {
  this.setState({showSearchType:false});
}

handleWildTypeOpen() {
  this.setState({showWildType:true, showFuzzyType:false, showInitialType:false, showBooleanType:false, showContextualType:false, showExactType:false, showFlashType: false,showGeneralType:false});
}

closeInfoType() {
 this.setState({showWildType:false, showFuzzyType:false, showInitialType:false, showBooleanType:false, showContextualType:false, showExactType:false, showFlashType: false,showGeneralType:false});
}

handleFuzzyTypeOpen() {
 this.setState({showWildType:false, showFuzzyType:true, showInitialType:false, showBooleanType:false, showContextualType:false, showExactType:false, showFlashType: false,showGeneralType:false});
}

closeFuzzyType() {
  
}

handleInitialTypeOpen() {
this.setState({showWildType:false, showFuzzyType:false, showInitialType:true, showBooleanType:false, showContextualType:false, showExactType:false, showFlashType: false,showGeneralType:false});
}

closeInitialType() {
  
}

handleBooleanTypeOpen() {
this.setState({showWildType:false, showFuzzyType:false, showInitialType:false, showBooleanType:true, showContextualType:false, showExactType:false, showFlashType: false,showGeneralType:false});
}

closeBooleanType() {
  
}

handleContextualTypeOpen() {
this.setState({showWildType:false, showFuzzyType:false, showInitialType:false, showBooleanType:false, showContextualType:true, showExactType:false, showFlashType: false,showGeneralType:false});
}

closeContextualType() {
  
}

handleExactTypeOpen() {
this.setState({showWildType:false, showFuzzyType:false, showInitialType:false, showBooleanType:false, showContextualType:false, showExactType:true, showFlashType: false,showGeneralType:false});
}

handleFlashTypeOpen() {
  this.setState({showWildType:false, showFuzzyType:false, showInitialType:false, showBooleanType:false, showContextualType:false, showExactType:false, showFlashType: true,showGeneralType:false});
}

handleGeneralTypeOpen() {
  this.setState({showWildType:false, showFuzzyType:false, showInitialType:false, showBooleanType:false, showContextualType:false, showExactType:false, showFlashType: false,showGeneralType:true});
}

closeExactType() {
  
}  

handleThankClose() {
  this.setState({showInterested:false});
}

handleClassInput(value) {
 // console.log('this.refs.class_input.value', value);
  
  this.setState({searchInput:value});
  // if(this.refs.class_input.value.length>=2) {
  //   this.props.casesAction.classItem({query:this.refs.class_input.value});
  // }
}

handleSelectKey(e) {
  // console.log('e.keyCode', e.keyCode);
}

handlePropInput() {
  
  this.setState({propInput:this.refs.prop_input.value});
  if(this.refs.prop_input.value.length>=2) {
    this.props.casesAction.ProprietorFilterSearch({query:this.refs.prop_input.value});
  }
}


handleClassSelect(data) {
  var selectedClass=this.state.classSelect;
  selectedClass.push(data);
  this.setState({classSelect:selectedClass});
}


handleClassInputClick(classArr) {
  //  var classInputLength= this.state.classInput.length;
  //  const Dummy= classArr.filter(lang =>
  //   lang.label.toLowerCase().slice(0, classInputLength) === this.refs.class_input.value
  // );

  // console.log('Dummy:', Dummy);
}
cleanInput(inputValue) {
  // console.log('inputValue', inputValue);
   if(inputValue.length>=2) {
     this.props.casesAction.classItem({query:inputValue});
 }
   // setTimeout(()=>{
   //      this.setClassOption();
   //    }, 500);
}

handleSelectedMarkSearch(value) {
   // console.log('value selected:', this.refs.selected_mark.value);
   var val=this.refs.selected_mark.value;
   var filteredMark=_.filter(this.state.markState, function(val) {return val.term==val});
   // console.log('filteredMark:', filteredMark);
}

setMarkData() {
  // console.log('this.props.marks',this.props.marks);
  this.setState({markState:this.props.marks});
}

setClassOption() {
  var classArr;
  if(this.props.class_item) {
  classArr = _.map(this.props.class_item, function(class_single) {
        return {label:'Class '+ class_single.class[0], value: 'class_'+class_single.class[0]}
  });
}
  this.setState({classSelect: classArr});
}

 handleSubmitClick() {
    console.log('handleSubmit')
    var searchType;
    if(this.state.boolean) {
      searchType='boolean';
      localStorage.setItem('searchType',searchType);
    }

    else if(this.state.wildcard) {
      searchType='wildcard';
      localStorage.setItem('searchType',searchType);
    }

    else if(this.state.fuzzy) {
      searchType='fuzzy';
      localStorage.setItem('searchType',searchType);
    }

    else if(this.state.initial) {
      searchType='initials';
      localStorage.setItem('searchType',searchType);
    }

    else if(this.state.contextual) {
      searchType='contextual';
      localStorage.setItem('searchType',searchType);
    }

    else if(this.state.exact) {
      searchType='exact';
      localStorage.setItem('searchType',searchType);
    }

    else if(this.state.flash) {
      searchType='flash';
      localStorage.setItem('searchType',searchType);
    }

       var selectedmark = _.filter(this.props.marks, {term:this.state.selectedMark});
    // if(!this.state.selectedmark) {
    //   this.showAlert('Please select a mark to continue', 'error');
    // }
     


   // var boolean_op_check= _.filter(this.state.inputArr, function(arr){return arr=="[[&]]" || arr=="[[|]]" || arr=="[[!]]"} );
   // console.log('boolean_op_check:', boolean_op_check);

   //  var fuzzy_op_check= _.filter(this.state.inputArr, function(arr){return arr=="[[~]]"} );
   // console.log('boolean_op_check fuzzy:', fuzzy_op_check);

   // var wildcard_op_check= _.filter(this.state.inputArr, function(arr){return arr=="[[*]]" || arr=="[[?]]"} );
   // console.log('boolean_op_check wild:', wildcard_op_check);

   if(!this.state.flash && !this.state.wildcard && !this.state.fuzzy && !this.state.initial && this.state.boolean && !this.state.contextual && !this.state.exact && this.refs.search_input.value.indexOf('[[&]]') == -1 && this.refs.search_input.value.indexOf('[[|]]') == -1 && this.refs.search_input.value.indexOf('[[!]]') == -1) {
    // console.log('this.refs.search_input.value.indexOf',this.refs.search_input.value.indexOf('[[&]]' || '[[|]]' || '[[!]]'));
    this.showAlert('Please select the boolean operator','error', 3000);
   }

   else if(!this.state.flash && !this.state.wildcard && this.state.fuzzy && !this.state.initial && !this.state.boolean && !this.state.contextual && !this.state.exact && this.refs.search_input.value.indexOf('[[~]]') == -1) {
    // console.log('this.refs.search_input.value:', this.refs.search_input.value.indexOf('[[~]]'));
    this.showAlert('Please select the fuzzy operator','error', 3000);
   }

   else if(!this.state.flash && this.state.wildcard && !this.state.fuzzy && !this.state.initial && !this.state.boolean && !this.state.contextual && !this.state.exact && this.refs.search_input.value.indexOf('[[*]]') == -1 && this.refs.search_input.value.indexOf('[[?]]') == -1) {
    this.showAlert('Please select the wildcard operator','error', 3000);
   }

   else if(this.state.flash && ((this.refs.search_input.value.indexOf('[[&]]') > -1) || (this.refs.search_input.value.indexOf('[[|]]') > -1) || (this.refs.search_input.value.indexOf('[[!]]') > -1) || (this.refs.search_input.value.indexOf('[[~]]') > -1) || ( this.refs.search_input.value.indexOf('[[*]]') > -1 ) || ( this.refs.search_input.value.indexOf('[[?]]') > -1 ))) {
    // console.log('this.refs.search_input.value.indexOf',this.refs.search_input.value.indexOf('[[&]]' || '[[|]]' || '[[!]]'), 'fuzzy:', this.refs.search_input.value.indexOf('[[~]]'), 'wildcard:',this.refs.search_input.value.indexOf('[[*]]' || '[[?]]'))
    this.showAlert('No operator is needed for flash search','error', 3000);
   }

   else if(this.state.exact && ((this.refs.search_input.value.indexOf('[[&]]') > -1) || (this.refs.search_input.value.indexOf('[[|]]') > -1) || (this.refs.search_input.value.indexOf('[[!]]') > -1) || (this.refs.search_input.value.indexOf('[[~]]') > -1) || ( this.refs.search_input.value.indexOf('[[*]]') > -1 ) || ( this.refs.search_input.value.indexOf('[[?]]') > -1 ))) {
    this.showAlert('No operator is needed for exact search','error', 3000);
   }

   else if(this.state.contextual && ((this.refs.search_input.value.indexOf('[[&]]') > -1) || (this.refs.search_input.value.indexOf('[[|]]') > -1) || (this.refs.search_input.value.indexOf('[[!]]') > -1) || (this.refs.search_input.value.indexOf('[[~]]') > -1) || ( this.refs.search_input.value.indexOf('[[*]]') > -1 ) || ( this.refs.search_input.value.indexOf('[[?]]') > -1 ))) {
    this.showAlert('No operator is needed for contextual search','error', 3000);
   }

   else if(this.state.initial && ((this.refs.search_input.value.indexOf('[[&]]') > -1) || (this.refs.search_input.value.indexOf('[[|]]') > -1) || (this.refs.search_input.value.indexOf('[[!]]') > -1) || (this.refs.search_input.value.indexOf('[[~]]') > -1) || ( this.refs.search_input.value.indexOf('[[*]]') > -1 ) || ( this.refs.search_input.value.indexOf('[[?]]') > -1 ))) {
    this.showAlert('No operator is needed for initial search','error', 3000);
   }

   else if(this.state.boolean && ((this.refs.search_input.value.indexOf('[[~]]') > -1) ||( this.refs.search_input.value.indexOf('[[*]]') > -1 ) || ( this.refs.search_input.value.indexOf('[[?]]') > -1 ))) {
    this.showAlert('Please use the boolean operators only','error', 3000);
   }

   else if(this.state.fuzzy && ((this.refs.search_input.value.indexOf('[[&]]') > -1) || (this.refs.search_input.value.indexOf('[[|]]') > -1) || (this.refs.search_input.value.indexOf('[[!]]') > -1) || ( this.refs.search_input.value.indexOf('[[*]]') > -1 ) || ( this.refs.search_input.value.indexOf('[[?]]') > -1 ))) {
    this.showAlert('Please use the fuzzy operator only','error', 3000);
   }

   else if(this.state.wildcard && ((this.refs.search_input.value.indexOf('[[&]]') > -1) || (this.refs.search_input.value.indexOf('[[|]]') > -1) || (this.refs.search_input.value.indexOf('[[!]]') > -1) || (this.refs.search_input.value.indexOf('[[~]]') > -1))) {
    this.showAlert('Please use the wildcard operator only','error', 3000);
   }


   else if(!this.state.selectedMark) {
     this.showAlert('Please select a mark to continue', 'error', 3000);
   }


   else if( !this.state.flash && !this.state.wildcard && !this.state.fuzzy && !this.state.initial && !this.state.boolean && !this.state.contextual && !this.state.exact) {
    this.showAlert('Please select a search type', 'error', 3000);
   }

   else if(this.state.selectedMark && !this.state.flash || this.state.wildcard || this.state.fuzzy || this.state.initial || this.state.boolean || this.state.contextual || this.state.exact) {
      var local_search=this.refs.search_input.value;
     for(var i=0;i<=this.state.inputArr.length;i++) {
           local_search = local_search.replace(",","");
     }
      
      var class_arr = [];
      _.map(this.state.searchInput, function(cl){
       // return console.log('cl:', cl);
           var inter_class= cl.label.replace("Class ", "");
           class_arr.push(inter_class);
      });
      // console.log("local_search:", class_arr);

      // console.log('this.state.selectedMark:', this.state.selectedMark);
       // browserHistory.push('/result/'+this.state.selectedMark);
       localStorage.setItem('mark_id', selectedmark[0].id);
       localStorage.setItem('mark_term', selectedmark[0].term);
       localStorage.setItem('search', local_search);
       localStorage.setItem('searchType',searchType);
       localStorage.setItem('search_classes', JSON.stringify(class_arr));
       localStorage.setItem('page',1);
        this.props.casesAction.vulnerability(selectedmark[0].id);
       // console.log('By passed:');
      var searchtype = localStorage.getItem('searchType');
      // console.log('fuzzy check:', searchtype)
       var fuzzyInput;
       if(searchtype =='fuzzy') {

         fuzzyInput = local_search.split('[[~]]');
        // console.log('fuzzyInput:', fuzzyInput);
        this.props.casesAction.GlobalSearch({query:fuzzyInput[0], search_base:'trademark',mark:localStorage.getItem('mark_id'), search_type:localStorage.getItem('searchType'),fuzzy_depth: fuzzyInput[1], search_classes:localStorage.getItem('search_classes'),page:1 });
        this.setState({loaderState:true});
       }

       else {
        // console.log('NotfuzzyInput:');
        this.props.casesAction.GlobalSearch({query:localStorage.getItem('search'), search_base:'trademark',mark:localStorage.getItem('mark_id'), search_type:localStorage.getItem('searchType'), search_classes:localStorage.getItem('search_classes'), page:1 });
        this.setState({loaderState:true});
       }
       
       // this.props.casesAction.GlobalSearch({search_type:searchType,query:this.refs.search_input.value, mark:this.state.selectedMark});
    }
  }

handleSubmitApp(e) {
  console.log('e.keyCode:',e.keyCode);
  if(e.keyCode==13){
  this.props.casesAction.application_search(this.state.searchValueApp);
  }
}

handleSubmitClickApp() {
  this.props.casesAction.application_search(this.state.searchValueApp);
}

handleMarkProfileRedirection() {

  this.setState({mark_redirect:true,showRTC:true});
  this.props.casesAction.reset_mark_profile();

  setTimeout(()=>{
        this.setState({showRTC:false});
        this.handleMarkRedirect();
      }, 4000);
}

handleMarkProfileError() {
  // this.showAlert('No Trademark found with this application number','info',8000);
  this.setState({mark_error:true,showRT:true});
  setTimeout(()=>{
        this.props.casesAction.ResetAppSearch();
        this.setState({mark_error:false,showRT:false});
      }, 3000);
}

handleMarkRedirect() {
  browserHistory.push('/mark_profile/'+this.props.application_search_data.id);
  setTimeout(()=>{
        this.props.casesAction.ResetAppSearch();
        this.setState({showRTC:false,mark_redirect:false});
      }, 2000);
}


closeRT() {
  this.setState({showRT:false});
}

closeRTC() {
  this.setState({showRTC:false});
}

handleLatestChange() {
  var x = document.cookie;
       console.log('x:',x);
       if(x.indexOf("dont_show=true")!=-1) {
        this.setState({updatedNews:false,open_latest:true});
       }

       else {
        this.setState({updatedNews:true,open_latest:true});
       }
}

closeUpdated() {
    this.setState({updatedNews:false});
    if(this.state.dont_show) {
      document.cookie = "dont_show=true";
    }
  }

  handleDontShow() {
    this.setState({dont_show:!this.state.dont_show})
  }

  render() {

    const items = [
      { name: 'first', meta: 'first|123', tag: 'a' },
      { name: 'second', meta: 'second|443', tag: 'b' },
      { name: 'third', meta: 'third|623', tag: 'a' },
    ];
    const fuseConfig = {
      keys: ['term']
    };
    if(this.props.application_search_state!=null && this.props.application_search_state==true && !this.state.mark_redirect) {
      this.handleMarkProfileRedirection();
    } 

    if(this.props.application_search_state!=null && this.props.application_search_state==false && !this.state.mark_error) {
      this.handleMarkProfileError();
    } 

    if(this.props.marks && !this.state.open_latest) {
      this.handleLatestChange();
    }

    const { value, suggestions } = this.state;
    const {classes} = this.props;
    var all_classes;
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
    var classArr;
if(!this.props.class_item) {
  classArr = _.map(all_classes, function(class_single) {
        return {label:'Class '+ class_single, value:'class_'+class_single}
  });

}

if(this.props.class_item) {
  classArr = _.map(this.props.class_item, function(class_single) {
        return {label:'Class '+ class_single.class[0], value: 'class_'+class_single.class[0]}
  });
}

  // console.log('classArr:', classArr);
  // console.log('this.state:', this.state);

    // console.log('This.state:', this.state);
    var settings = {
      dots: false,
      infinite: false,
      speed: 200,
      slidesToShow: 3,
      slidesToScroll: 1
    };

    const {marks} = this.props;
    const {result} = this.props;
    const {class_item} = this.props;
    var filtered;
    if(this.props.filtered_prop) {
      // console.log('this.props.filtered_prop:',this.props.filtered_prop);
    }
    
    if(this.props.filtered_prop) {
    filtered =  _.map(this.props.filtered_prop, function(prop_item) {
      return {name: prop_item.name, id: prop_item.id}
     })
    }
    // console.log('this.props.filtered:', filtered);
    var filtered_class;

    if(this.props.marks) {


      _.map(this.props.marks, function(mark){
       
        // console.log('marks unix:', new Date(mark.created).getTime())
      })
      // this.props.marks.sort((a,b) => )
    }

    // if(this.props.class_item) {
    //   _.map(this.state.searchValue, function(cl){
    //     classArr = _.filter(classArr,function(cl2){return !cl2.value==cl.value})
    //   })
    //   console.log('classArr 3:', classArr);
    // }

    if(this.props.class_item) {
      filtered_class = _.map(this.props.class_item, function(class_item){
          return {item:class_item.item, associated_class:'Class '+class_item.class[0]}
      });
    }
    // console.log('filtered_class:', filtered_class);

    const tooltip = (
  <Tooltip style={{fontSize:'17px'}} id="tooltip">Select the class(es) you want to search</Tooltip>
);
    
    const and = (
  <Tooltip style={{fontSize:'17px'}} id="tooltip">To include</Tooltip>
);
    const or = (
  <Tooltip style={{fontSize:'17px'}} id="tooltip">Either one</Tooltip>
);
    const not = (
  <Tooltip style={{fontSize:'17px'}} id="tooltip">To exclude</Tooltip>
);
    const star = (
  <Tooltip style={{fontSize:'17px'}} id="tooltip">Unlimited character variation</Tooltip>
);
    const underscore = (
  <Tooltip style={{fontSize:'17px'}} id="tooltip">Single character variation</Tooltip>
);
    const fuzzy = (
  <Tooltip style={{fontSize:'17px'}} id="tooltip">Character variation</Tooltip>
);
   // const hola = this.getOptions('bo');

   // console.log('hola mofo',hola);

    // console.log('This.state:', this.state);
    var sidebarContent = <b>Sidebar content</b>;
    const classes2=[{label:'Class 1', value: 'class_1'}, {label:'CLass 2', value: 'class_2'}, {label:'CLass 3', value: 'class_3'}];
   
    return (
    <div>
      <div style={{background:'#F1F2F1'}} >
        {this.state.loaderState &&
          <div className="col-sm-12" style={{textAlign:'center', background:'#F1F2F1', paddingTop:'10%', paddingBottom:'8%', height:'100vh'}} >
        <img src="../../images/loading.gif" style={{display:"block",left:'50%',marginLeft:"auto",marginRight:"auto", width:'40%'}}/>
        <br/>
        <p style={{fontSize:'18px', color:'#525252'}}>Crunching latest trademark data for you. Hang on... </p>
        </div>
        }
      </div>
      {!this.state.loaderState && <div className="row">
        <div id={this.state.sideNav ? "mySidenav-active" : "mySidenav"} className="sidenav">
          <span style={{background:'none', color:'#FFF', textAlign:'center', padding:'0', paddingTop:'18px',paddingBottom:'12px', paddingLeft:'60px',fontSize:'20px' ,display:'flex'}} href="#">MikeLegal<span style={{color:'#FFF',fontSize:'20px', cursor:'pointer', padding:'0',marginLeft:'40px', border:'none', boxShadow:'none', backgroundColor:'none'}} href="#" className="fa fa-times" onClick={this.closeNav.bind(this)}></span></span>
          <hr style={{width:'80%', marginTop:'10px'}} size="5" />
          <Link to="/profile_page"><i href="#">Profile</i></Link>
          <Link to="/report_set"><i href="#">Reports</i></Link>
          <Link to="/search"><i href="#">Search Dashboard</i></Link>
          <i onClick={this.openTmWatch.bind(this)} href="#">Mike TM Watch</i>
          <i onClick={this.openTmManager.bind(this)} href="#">Mike TM Manager</i>
          <i onClick={this.openTmLitigation.bind(this)} href="#">Mike Litigation</i>
          <i onClick={this.handleSignOut.bind(this)} href="#">Sign Out</i>
        </div>


        <div className="col-sm-12">
          <div className="search_page">
          <div className="row">
            <div className="col-sm-12">
              <div className="top-menu"> 
              <i className="fa fa-bars pull-left" onClick={this.openNav.bind(this)} aria-hidden="true"></i>
              <div className="col-sm-2 col-md-offset-9" style={{textAlign:'right', paddingTop:'15px'}} >
                { this.state.contextual &&
                 <p onClick={this.handleSeeSearchType.bind(this)} style={{ color:'#4285f4', cursor:'pointer', fontSize:'18px'}}>How to search?</p>}
                 { this.state.flash &&
                 <p onClick={this.handleSeeSearchType.bind(this)} style={{ color:'#4285f4', cursor:'pointer', fontSize:'18px'}}>How to search?</p>}
                 { this.state.fuzzy &&
                 <p onClick={this.handleSeeSearchType.bind(this)} style={{ color:'#4285f4', cursor:'pointer', fontSize:'18px'}}>How to search?</p>}
                 { this.state.exact &&
                 <p onClick={this.handleSeeSearchType.bind(this)} style={{ color:'#4285f4', cursor:'pointer', fontSize:'18px'}}>How to search?</p>}
                 { this.state.initial &&
                 <p onClick={this.handleSeeSearchType.bind(this)} style={{ color:'#4285f4', cursor:'pointer', fontSize:'18px'}}>How to search?</p>}
                 { this.state.boolean &&
                 <p onClick={this.handleSeeSearchType.bind(this)} style={{ color:'#4285f4', cursor:'pointer', fontSize:'18px'}}>How to search?</p>}
                 { this.state.wildcard &&
                 <p onClick={this.handleSeeSearchType.bind(this)} style={{ color:'#4285f4', cursor:'pointer', fontSize:'18px'}}>How to search?</p>}

                 { !this.state.flash && !this.state.boolean && !this.state.wildcard && !this.state.fuzzy && !this.state.initial && !this.state.exact && !this.state.contextual &&
                 <p onClick={this.handleWildTypeOpen.bind(this)} style={{ color:'#4285f4', cursor:'pointer', fontSize:'18px'}}>How to search?</p>}
              </div>
            </div>
            </div>
          </div>
      

      <div className="row">
    <div className="mike">
      <div className={this.state.popupVisible?"search_open":"search"}>

      {this.state.boolean && <div className="row">
              <div className="col-sm-12 boolean">
              <h4 style={{textAlign:'center'}} >Please click on the options you would like to use:</h4>
               <div style={{textAlign:'center'}} className="col-sm-1 col-md-offset-5 andBoolean"><OverlayTrigger placement="left" overlay={and}><h3 style={{textAlign:'center'}}  onClick={this.handleAndOperatorClick.bind(this)}>AND</h3></OverlayTrigger></div>
               <div style={{textAlign:'center'}} className="col-sm-1 andBoolean"><OverlayTrigger placement="left" overlay={or}><h3 style={{textAlign:'center'}} onClick={this.handleOrOperatorClick.bind(this)}>OR</h3></OverlayTrigger></div>  
               <div style={{textAlign:'center'}} className="col-sm-1 andBoolean"><OverlayTrigger placement="left" overlay={not}><h3 style={{textAlign:'center'}} onClick={this.handleNotOperatorClick.bind(this)}>Not</h3></OverlayTrigger></div>  
              </div>
            </div>}
        {this.state.wildcard && <div className="row">
              <div className="col-sm-12 boolean">
              <h4 style={{textAlign:'center'}} >Please click on the options you would like to use:</h4>
               <div className="col-sm-4 col-md-offset-2 andBoolean"><OverlayTrigger placement="left" overlay={star}><h3 onClick={this.handleWildOperatorClick.bind(this)} className="pull-right">* </h3></OverlayTrigger></div>
               <div style={{textAlign:'right'}} className="col-sm-5 andBoolean"><OverlayTrigger placement="left" overlay={underscore}><h3 style={{textAlign:'center'}} onClick={this.handleWildDashClick.bind(this)}>?</h3></OverlayTrigger></div>  
              </div>
            </div>}

        {this.state.fuzzy && <div className="row">
              <div className="col-sm-12 boolean">
              <h4 className="andBoolean" onClick={this.handleFuzzyOperatorClick.bind(this)} style={{textAlign:'center'}} >Please click on the option to use:<OverlayTrigger placement="left" overlay={fuzzy}><strong style={{fontSize:'25px', fontWeight:'100', paddingLeft:'15px', paddingTop:'5px', cursor:'pointer', color:'#4285f4'}}>~</strong></OverlayTrigger></h4>
              </div>
            </div>}  
             
      <div className="row">
        <div className="col-sm-12">
          <h3>Hi there, what do you want to search today?</h3>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-8 col-md-offset-2 search-input-area">
          <FormGroup>
        <div style={{paddingRight:'0 !important'}} className="col-sm-12" ref={node => { this.node = node; }}>
            <Col className="main_input">
              {!this.state.application && <span><input  id="mikeInput" name="global_input" type="text" value={this.state.searchValue} ref="search_input" onClick={this.handleClick.bind(this)} onKeyDown={this.handleSubmit.bind(this)} onChange={this.handleGlobalSearchChange.bind(this)} /><i onClick={this.handleSubmitClick.bind(this)} style={{position:'absolute',color:'#4285f4',fontSize:'18px',top:'38% !important',marginLeft:'-3% !important'}} className="fa fa-search"></i></span>}
              {this.state.application && <span><input  id="mikeInput" name="global_input" type="text" value={this.state.searchValueApp} ref="search_application" onClick={this.handleClick.bind(this)} onKeyDown={this.handleSubmitApp.bind(this)} onChange={this.handleGlobalSearchChangeApp.bind(this)} /><i onClick={this.handleSubmitClickApp.bind(this)} style={{position:'absolute',color:'#4285f4',fontSize:'18px',top:'38% !important',marginLeft:'-3% !important'}} className="fa fa-search"></i></span>}
            </Col>
            {this.state.popupVisible && 
        
            <ul id="myUL">
              <li className={this.state.application?"activeLi":null} onClick={this.handleApplicationSearch.bind(this)} style={{cursor:'pointer'}} >Application search:<p>Search via application number</p><p2 className="pull-right"><input ref="flash_check" checked={this.state.application} onChange={this.handleApplicationSearch.bind(this)} style={{marginLeft: '5px',visibility:'hidden'}} type="checkbox" /></p2><br/></li>
              <li className={this.state.flash?"activeLi":null} onClick={this.handleFlashCheck.bind(this)} style={{cursor:'pointer'}} >MikeTM Flash:<p>Run multiple searches automatically</p><p2 className="pull-right"><input ref="flash_check" checked={this.state.flash} onChange={this.handleFlashCheck.bind(this)} style={{marginLeft: '5px',visibility:'hidden'}} type="checkbox" /></p2><br/></li>
              <li className={this.state.general?"activeLi":null}  onClick={this.handleGeneralCheck.bind(this)} style={{cursor:'pointer'}} >Standard Search:<p>See marks of 60% similarity or higher to your mark</p><p2 className="pull-right"><input ref="general_check" checked={this.state.general} onChange={this.handleGeneralCheck.bind(this)} style={{marginLeft: '5px',visibility:'hidden'}} type="checkbox" /></p2><br/></li>
              <li className={this.state.wildcard?"activeLi":null} onClick={this.handleWildcardCheck.bind(this)} style={{cursor:'pointer'}}>Wildcard search:<p>Allows you to see marks that contains your search</p><p2 className="pull-right"><input ref="wildcard_check" checked={this.state.wildcard} onChange={this.handleWildcardCheck.bind(this)} style={{marginLeft: '5px',visibility:'hidden'}} type="checkbox" /></p2><br/></li>
              <li className={this.state.fuzzy?"activeLi":null} onClick={this.handleFuzzyCheck.bind(this)} style={{cursor:'pointer'}}>Fuzzy search:<p>Allows you to see marks with letter variations</p><p2 className="pull-right"><input ref="fuzzy_check" checked={this.state.fuzzy} onChange={this.handleFuzzyCheck.bind(this)} style={{marginLeft: '5px',visibility:'hidden'}} type="checkbox" /></p2><br/></li>
              <li className={this.state.initial?"activeLi":null} onClick={this.handleInitialCheck.bind(this)} style={{cursor:'pointer'}}>Initials search:<p>Allows you to see marks with similar initials</p><p2 className="pull-right"><input style={{marginLeft: '5px',visibility:'hidden'}} ref="initials_check" checked={this.state.initial} onChange={this.handleInitialCheck.bind(this)}  type="checkbox" /></p2><br/></li>
              <li className={this.state.boolean?"activeLi":null} onClick={this.handleBooleanCheck.bind(this)} style={{cursor:'pointer'}}>Boolean search:<p>Allows you to see marks with similar combinations of letters</p><p2 className="pull-right"><input ref="boolean_check" checked={this.state.boolean} onChange={this.handleBooleanCheck.bind(this)} style={{marginLeft: '5px',visibility:'hidden'}} type="checkbox" /></p2><br/></li>
              <li className={this.state.contextual?"activeLi":null} onClick={this.handleContextualCheck.bind(this)} style={{cursor:'pointer'}}>Contextual search:<p>Allows you to see marks with a similar meaning</p><p2 className="pull-right"><input style={{marginLeft: '5px',visibility:'hidden'}} ref="contextual_check" checked={this.state.contextual} onChange={this.handleContextualCheck.bind(this)} type="checkbox" /></p2><br/></li>  
              {/*<li>Exact search:<p>Allows you to see the exact match to your mark</p><p2 className="pull-right"><input style={{marginLeft: '5px'}} ref="exact_check" checked={this.state.exact} onChange={this.handleExactCheck.bind(this)} type="checkbox" /></p2><br/></li>*/}
            </ul>
        
       } 
          </div>
           
       </FormGroup>
        </div>
      </div>  
       <div className="row">
         <div className="col-sm-12 global-search-filter">
         <div className="under_search">
            <div className="col-sm-3 col-md-offset-3">
             <OverlayTrigger placement="left" overlay={tooltip}>
              <div className="input-group">
                 <Async
                    name="form-field-name"
                    placeholder="Classes"
                    onChange={this.handleSelectChange.bind(this)}
                    value={this.state.searchInput}
                    loadOptions={this.getOptions}
                    multi={true}
                    joinValues
                   />
                          
                  
              </div>
              </OverlayTrigger>
              {this.state.all_classes &&  <div className="all_classes">
                <span><input type="checkbox" ref="check_me" checked={this.state.all_class} onChange={this.handleCheck.bind(this)} />All classes </span>
                </div>}
              
          </div>

          
          {!this.state.mark_select && !this.state.application &&
            <div style={{textAlign:'right'}} className="col-md-2 col-md-offset-1 enter-mark">
            <p onClick={this.open.bind(this)}>Enter Trademark/Proprietor</p>
             </div>
          }
          {this.state.mark_select && !this.state.application &&
            <div className="chip mark-chip col-md-3 col-md-offset-1">
               <p> Mark Selected: {this.state.selectedMark} <i style={{fontSize:'15px'}} onClick={this.close_filter.bind(this)} className="fa fa-times" aria-hidden="true"></i></p>
            </div>
          }
         
          
         </div>
          <Modal className="updated_elements" style={{marginTop:'-6%'}} show={this.state.updatedNews} onHide={this.closeUpdated.bind(this)}>
                    <Modal.Body style={{padding:'0',paddingBottom:'15px'}}>
                     <div style={{height:'auto', background:'#4285f4', color:'white',borderTopRightRadius:'6px', borderTopLeftRadius:'6px',paddingLeft:'0',paddingRight:'0'}} className="col-sm-12 TmWatchTop">
                         <div className="row">
                     <div className="col-sm-12">
                        <div className="col-sm-6 pull-right">
                          <i onClick={this.closeUpdated.bind(this)} style={{color:'#FFF', fontSize:'20px', cursor:'pointer',padding:'10px 15px 0 0 !important'}} className="fa fa-times pull-right" aria-hidden="true"></i>
                        </div>
                     </div>
                    </div>
                          <h2 style={{textAlign:'center', paddingBottom:'20px',marginTop:'0 !important'}}>Introducing Application Number Search</h2>
                        </div>

                    <div className="row">
                     <div className="col-sm-12" style={{textAlign:'center',padding:'0 15px',marginTop:'10px !important'}}>
                        <img style={{maxWidth:'95%',maxHeight:'95%',height:'auto',width:'auto'}} src="../../images/app_search.png" />
                     </div>
                    </div>

                    <div className="row">
                     <div className="col-sm-12" style={{textAlign:'center',padding:'15px 15px !important'}}>
                     <h3 style={{fontWeight:'600'}} >Application Search Features</h3>
                     <hr style={{width:'30%'}} />
                        <ul style={{listStyle:'aliceblue'}} >
                          <li style={{background:'#FFF', color:'black',fontSize:'15px'}}>Simply enter the application number of your mark</li>
                          <li style={{background:'#FFF', color:'black',fontSize:'15px'}}>See all details of the relevant mark</li>
                        </ul>
                     </div>
                    </div>

                    <div className="row">
                     <div className="col-sm-12" style={{textAlign:'center'}}>
                        <button style={{padding:'8px 35px'}} className="btn btn-primary" onClick={this.closeUpdated.bind(this)} >Got it!</button>
                        <br/>
                        <br />
                        <span style={{paddingTop:'15px'}} ><input checked={this.state.dont_show} onClick={this.handleDontShow.bind(this)} type="checkbox" /> Don't show this message again</span>
                     </div>
                    </div>

                    </Modal.Body>
                </Modal>  
          <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
                    <Modal.Body>
                    <div className="row">
                      <div className="col-sm-12">
                        <i onClick={this.handleModalClose.bind(this)} style={{color:'#4285f4', fontSize:'20px', paddingRight:'10px', cursor:'pointer'}} className="fa fa-times pull-right" aria-hidden="true"></i>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-12 search-modal">
                        <h3>What would you like to do?</h3>
                      </div>
                    </div>
                      <div className="row">
                        <div className="col-sm-12 modal-mark">
                           <div className={this.state.prop_btn_select ? "card card-active" : "card"} onClick={this.handlePropSearch.bind(this)}>
                             Proprietor Search
                           </div>
                           <div className="verticle-line"></div>
                           {this.props.marks && this.props.marks.length>0 && <div className={this.state.trade_btn_select ? "card card-active" : "card"} onClick={this.handleTradeSearch.bind(this)}>
                                                        Choose and Add Mark <i className="fa fa-plus-circle" aria-hidden="true"></i>
                                                      </div>}
                           {this.props.marks && this.props.marks.length==0 && <div className={this.state.trade_btn_select ? "card card-active" : "card"} onClick={this.handleFirstTradeSearch.bind(this)}>
                                                        Add your mark <i className="fa fa-plus-circle" aria-hidden="true"></i>
                                                      </div>}
                          </div>
                      </div>
                    </Modal.Body>
                </Modal>
         
                <Modal show={this.state.showModal2} onHide={this.close2.bind(this)}>
                    <Modal.Body>
                    <div className="row">
                     <div className="col-sm-12">
                        <div className="col-sm-6 pull-left">
                          <i className="fa fa-chevron-left" onClick={this.handleBack.bind(this)} aria-hidden="true"></i>
                        </div>
                        <div className="col-sm-6 pull-right">
                          <i onClick={this.handleModalClose.bind(this)} style={{color:'#4285f4', fontSize:'20px', paddingRight:'10px', cursor:'pointer'}} className="fa fa-times pull-right" aria-hidden="true"></i>
                        </div>
                     </div>
                    </div>
                      <div className="row">
                        <div className="col-sm-12 modal-prop">
                           <h3>Hi there, what proprietor you want to search today?</h3>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-12 search-modal-input">
                           <input placeholder='Search proprietor' ref="prop_input" style={{border:'none', borderBottom:'1px solid #4285f4'}}  onChange={this.handlePropInput.bind(this)} />  
                              {this.props.filtered_prop && filtered.map(data => 
                                <div className="react-autosuggest__suggestions-container react-autosuggest__suggestions-container--open">
                                  <ul className="react-autosuggest__suggestions-list" style={{marginBottom:'10px'}} >
                                     <li style={{cursor:'pointer'}} onClick={() => {this.handleProprietorSearch(data)}} className="react-autosuggest__suggestion" >
                                      {data.name}
                                     </li>
                                  </ul>
                                </div>)}
                        </div>
                      </div>
                    </Modal.Body>
                </Modal>

                <Modal show={this.state.showModal3} onHide={this.close3.bind(this)}>
                    <Modal.Body>
                    <div className="row">
                     <div className="col-sm-12">
                        <div className="col-sm-1">
                          <i className="fa fa-chevron-left" onClick={this.handleBack.bind(this)} aria-hidden="true"></i>
                        </div>
                        <div className="col-sm-4 col-md-offset-3">
                         <div className="search-modal-input-mark">
                           <span style={{display:'flex', borderBottom:'1px solid #4285f4'}} ><i style={{color:'#525252', display:'flex'}} className="fa fa-search" aria-hidden="true"></i><InputFilter placeholder="Search for marks" debounceTime={200} /></span>
                        </div>
                        </div>
                        <div className="col-sm-4 pull-right">
                          <i onClick={this.handleModalClose.bind(this)} style={{color:'#4285f4', fontSize:'20px', paddingRight:'10px', cursor:'pointer'}} className="fa fa-times pull-right" aria-hidden="true"></i>
                        </div>
                     </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12 search-mark-heading">
                           <h3>Choose a mark</h3>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-sm-12">
    
                      <div className= "mark-history">
                      
                         
                          {this.props.marks &&
                        <FilterResults
                          items={this.props.marks}
                          fuseConfig={fuseConfig}>
                          {filteredItems => {
                            return(
                              <Slider {...settings}>
                              <div>      
                          <span onClick={this.handleAddMark.bind(this)} style={{color:'#4285f4'}} className="btn">Add a mark</span>
                          </div> 
                                {filteredItems.concat().sort((a,b) => new Date(b.created).getTime() - new Date(a.created).getTime())
                                .map(item => <div onClick={() => {this.handleMarkSelection(item)}} style={{color:'#525252', fontSize:'17px'}} className="btn">{item.term}</div>)}
                              </Slider>
                            )
                          }}
                        </FilterResults>
                        }
                                 
                        </div>                  
                        </div>
                      </div>
                      
                    </Modal.Body>
                </Modal>

                <Modal show={this.state.showModal4} onHide={this.close4.bind(this)}>
                    <Modal.Body>
                    <div className="row">
                     <div className="col-sm-12">
                        <div className="col-sm-6 pull-left">
                          <i className="fa fa-chevron-left" onClick={this.handleTradeBack.bind(this)} aria-hidden="true"></i>
                        </div>
                        <div className="col-sm-6 pull-right">
                          <i onClick={this.handleModalClose.bind(this)} style={{color:'#4285f4', fontSize:'20px', paddingRight:'10px', cursor:'pointer'}} className="fa fa-times pull-right" aria-hidden="true"></i>
                        </div>
                     </div>
                    </div>
                      <div className="row">
                        <div className="col-sm-12 modal-prop">
                           <h3>Hi there, please enter a mark here</h3>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-12 search-modal-input">
                           <input ref="mark_input" onChange={this.handleMarkInput.bind(this)} type="text" placeholder="Add Mark..." />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-12">
                           <button onClick={this.handleMarkSubmit.bind(this)} className="btn btn-primary">Add Mark</button>
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
                        <h3 style={{textAlign:'center', paddingBottom:'30px', color:'#525252', paddingLeft:'15px !important', paddingRight:'15px !important'}}><img style={{maxWidth:'25% !important'}} src="../../images/oops.jpg" /><br/>No Trademark found with this application number</h3>
                        <br/>
                        <button onClick={this.closeRT.bind(this)} style={{borderRadius:'0'}} className="btn btn-primary">Close</button>
                      </div>
                    </div>
                    </Modal.Body>
                </Modal>

                <Modal show={this.state.showRTC} onHide={this.closeRTC.bind(this)}>
                    <Modal.Body>
                    <div className="row">
                      <div className="col-sm-12">
                        <i onClick={this.closeRTC.bind(this)} style={{color:'#4285f4', fontSize:'20px', paddingRight:'10px', cursor:'pointer'}} className="fa fa-times pull-right" aria-hidden="true"></i>
                      </div>
                    </div>
                    <div className="row">
                      <div style={{textAlign:'center'}} className="col-sm-12 search-modal">
                        <img style={{marginBottom:'-65px',marginTop:'-65px'}} src="../../images/loader-small.gif" />
                        <br/>
                        {this.props.application_search_data && <h3 style={{textAlign:'center', paddingBottom:'0px', color:'#525252', fontSize:'19px !important',paddingRight:'10px',paddingLeft:'10px',lineHeight:'1.8em'}}>Fetching data for {this.props.application_search_data.applied_for} with application number {this.props.application_search_data.application_number}</h3>}
                      </div>
                    </div>
                    </Modal.Body>
                </Modal>

                <Modal show={this.state.showConfirm} onHide={this.closeConfirm.bind(this)}>
                    <Modal.Body>
                    <div className="row">
                     <div className="col-sm-12">
                        <div className="col-sm-6 pull-left">
                          <i className="fa fa-chevron-left" onClick={this.handleConfirmBack.bind(this)} aria-hidden="true"></i>
                        </div>
                        <div className="col-sm-6 pull-right">
                          <i onClick={this.handleModalClose.bind(this)} style={{color:'#4285f4', fontSize:'20px', paddingRight:'10px', cursor:'pointer'}} className="fa fa-times pull-right" aria-hidden="true"></i>
                        </div>
                     </div>
                    </div>
                      <div className="row">
                        <div className="col-sm-12 modal-prop">
                           <h3 style={{textAlign:'center'}} >Please confirm you want to add {this.state.tempMark} as mark?</h3>
                        </div>
                      </div>

                      <div className="row">
                        <div style={{textAlign:'center', paddingTop:'20px'}} className="col-sm-12">
                           <button onClick={this.handleConfirmAdd.bind(this)} className="btn btn-primary ">Confirm</button>
                           <br/>
                           <button onClick={this.handleBackConfirm.bind(this)} style={{background:'#FFF !important', border:'none !important', color:'#4285f4 !important'}} className="btn btn-default">Cancel</button>
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
                        <i onClick={this.handleThankClose.bind(this)} style={{color:'#4285f4', fontSize:'20px', paddingRight:'10px', cursor:'pointer'}} className="fa fa-times pull-right" aria-hidden="true"></i>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-12 search-modal">
                        <h3 style={{textAlign:'center', paddingBottom:'30px', color:'#FFF', paddingLeft:'15px !important', paddingRight:'15px !important'}}><img style={{height: '25px'}} src="../../images/checked.png" />Thank you for showing your interest</h3>
                      </div>
                    </div>
                    </Modal.Body>
                </Modal>

                {
                // <Modal show={this.state.showSearchType} onHide={this.closeSearchType.bind(this)}>
                //     <Modal.Body>
                //     <div className="row">
                //       <div className="col-sm-12">
                //         <i onClick={this.handleModalClose.bind(this)} style={{color:'#4285f4', fontSize:'20px', paddingRight:'10px', cursor:'pointer'}} className="fa fa-times pull-right" aria-hidden="true"></i>
                //       </div>
                //     </div>
                //     <div className="row">
                //       <div className="col-sm-12 search-modal">
                //         <h3 style={{textAlign:'center', paddingBottom:'0px', color:'#FFF', paddingLeft:'15px !important', paddingRight:'15px !important'}}>Wildcard Search</h3>
                //         <br />
                //         <div>
                //         <p style={{textAlign:'justify', paddingRight:'10px', color:'#525252'}} >Wildcard - eg. Searching *legal will give you all results which has suffix legal in it. So, MikeLegal, AKlegal will be shown. You can also search *gal*. This will show results such as Legal, MikeLegal, MikeGallery and Gallery. Pay* will give all the results with Pay as prefix. Similarly, you can also search for a specific letter by using ?. Eg.  M?ke will give you results like Mike, Muke and Moke. Also, searching for M??e will give you results like Mike, Moue, Male and Make. Similarly, you can also use both of these together in a single search. Eg - M?ke* will give you results like MakeLaw, MikeLegal and Make Image. </p>
                //         </div>
                //       </div>
                //     </div>
                //     </Modal.Body>
                // </Modal>
                }


                <Modal show={this.state.showWildType} onHide={this.closeInfoType.bind(this)}>
                  <Modal.Body>

                  <Carousel interval={null} className="cStyle">
                    <Carousel.Item>
                      <Modal.Header className="p-0" style={{background:'#4285f4'}}>
                      <h3 style={{textAlign:'center', paddingBottom:'0px', color:'#ffff', paddingLeft:'15px !important', paddingRight:'15px !important'}}>Wildcard Search</h3>
                      </Modal.Header>
                      <br />
                      <div>
                      <p style={{textAlign:'justify', paddingRight:'10px', color:'#4285f4', fontSize:'15px'}} >Wildcard - eg. Searching *legal will give you all results which has suffix legal in it. So, MikeLegal, AKlegal will be shown. You can also search *gal*. This will show results such as Legal, MikeLegal, MikeGallery and Gallery. Pay* will give all the results with Pay as prefix. Similarly, you can also search for a specific letter by using ?. Eg.  M?ke will give you results like Mike, Muke and Moke. Also, searching for M??e will give you results like Mike, Moue, Male and Make. Similarly, you can also use both of these together in a single search. Eg - M?ke* will give you results like MakeLaw, MikeLegal and Make Image. </p>
                      </div>
                    </Carousel.Item>
                    <Carousel.Item>
                      <Modal.Header className="p-0" style={{background:'#4285f4'}}>
                      <h3 style={{textAlign:'center', paddingBottom:'0px', color:'#ffff', paddingLeft:'15px !important', paddingRight:'15px !important'}}>Fuzzy Search</h3>
                      </Modal.Header>
                      <br />
                      <p style={{textAlign:'justify', paddingRight:'10px', color:'#4285f4', fontSize:'15px'}} >Fuzzy Search - eg. Searching MikeLegal~2 will give results of variations in MikeLegal till 2 character variation. So, it will show results of 7 letter words to 11 letter words. Answers to the above query will include MkeLgal, Mikegal, MikeLegal12 and MikeLegal. </p>
                    </Carousel.Item>
                    <Carousel.Item>
                      <Modal.Header className="p-0" style={{background:'#4285f4'}}>
                      <h3 style={{textAlign:'center', paddingBottom:'0px', color:'#ffff', paddingLeft:'15px !important', paddingRight:'15px !important'}}>Boolean Search</h3>
                      </Modal.Header>
                      <br />
                      <p style={{textAlign:'justify', paddingRight:'10px', color:'#4285f4', fontSize:'15px'}} >Eg. Searching for marks Farm2Fresh or Farm to Fresh, it can be searched as Farm (and) 2 (or) to (and) fresh. This will give results having farm followed by either 2 or further followed by fresh. In case you wish to see the results starting with Mike but without Legal in it then you can search for Mike (NOT) Legal. This will give results starting with Mike but without Legal in it. Mike Law, Mike and Mike Layman will be the results of this query. </p>
                    </Carousel.Item>
                    <Carousel.Item>
                      <Modal.Header className="p-0" style={{background:'#4285f4'}}>
                      <h3 style={{textAlign:'center', paddingBottom:'0px', color:'#ffff', paddingLeft:'15px !important', paddingRight:'15px !important'}}>Initial Search</h3>
                      </Modal.Header>
                      <br />
                      <p style={{textAlign:'justify', paddingRight:'10px', color:'#4285f4', fontSize:'15px'}} >Initials - Eg. If you will select initial search for Oliver Silver it will show all results with initials O and S.</p>
                    </Carousel.Item>
                    <Carousel.Item>
                      <Modal.Header className="p-0" style={{background:'#4285f4'}}>
                      <h3 style={{textAlign:'center', paddingBottom:'0px', color:'#ffff', paddingLeft:'15px !important', paddingRight:'15px !important'}}>Contextual Search</h3>
                      </Modal.Header>
                      <br />
                      <p style={{textAlign:'justify', paddingRight:'10px', color:'#4285f4', fontSize:'15px'}} >Contextual - Shows marks with a similar meaning to the mark you searched for. Eg. Searching for alligator slippers would show crocodile slippers.   </p>
                    </Carousel.Item>
                  </Carousel>

                  <Modal.Footer className="p-0 border-none text-center">
                  <Button className="btn btn-info" onClick={this.closeInfoType.bind(this)}>
                    Close
                  </Button>
                  </Modal.Footer>

                  </Modal.Body>
                </Modal>


                {
                // <Modal show={this.state.showWildType} onHide={this.closeInfoType.bind(this)}>
                //   <i onClick={this.handleGeneralTypeOpen.bind(this)} style={{position:'absolute', marginLeft:'-30%', marginTop:'25%', fontSize:'20px', cursor:'pointer', color:'#FFF !important'}} className="fa fa-chevron-left" aria-hidden="true"></i>
                //   <i onClick={this.handleFuzzyTypeOpen.bind(this)} style={{position:'absolute', marginRight:'-30%', right:'0', marginTop:'25%', fontSize:'20px', color:'#FFF', cursor:'pointer'}} className="fa fa-chevron-right pull-right" aria-hidden="true"></i>

                //     <Modal.Body style={{background:'#4285f4'}} >
                //     <div className="row">
                //       <div className="col-sm-12">
                //         <i onClick={this.closeInfoType.bind(this)} style={{color:'#FFF', fontSize:'20px', paddingRight:'10px', cursor:'pointer'}} className="fa fa-times pull-right" aria-hidden="true"></i>
                //       </div>
                //     </div>
                //     <div className="row">
                //       <div className="col-sm-12 search-modal" style={{paddingLeft:'0'}}>
                //         <h3 style={{textAlign:'center', paddingBottom:'0px', color:'#FFF', paddingLeft:'15px !important', paddingRight:'15px !important'}}>Wildcard Search</h3>
                //         <br />
                //         <div style={{background:'#FFF',marginBottom:'-30px', padding:'20px'}} >
                //         <p style={{textAlign:'justify', paddingRight:'10px', color:'#525252', fontSize:'15px'}} >Wildcard - eg. Searching *legal will give you all results which has suffix legal in it. So, MikeLegal, AKlegal will be shown. You can also search *gal*. This will show results such as Legal, MikeLegal, MikeGallery and Gallery. Pay* will give all the results with Pay as prefix. Similarly, you can also search for a specific letter by using ?. Eg.  M?ke will give you results like Mike, Muke and Moke. Also, searching for M??e will give you results like Mike, Moue, Male and Make. Similarly, you can also use both of these together in a single search. Eg - M?ke* will give you results like MakeLaw, MikeLegal and Make Image. </p>
                //         </div>
                //       </div>
                //     </div>
                //     </Modal.Body>
                // </Modal>

                // <Modal show={this.state.showFuzzyType} onHide={this.closeInfoType.bind(this)}>
                //   <i onClick={this.handleWildTypeOpen.bind(this)} style={{position:'absolute', marginLeft:'-30%', marginTop:'25%', fontSize:'20px', cursor:'pointer', color:'#FFF !important'}} className="fa fa-chevron-left" aria-hidden="true"></i>
                //   <i onClick={this.handleInitialTypeOpen.bind(this)} style={{position:'absolute', marginRight:'-30%', right:'0', marginTop:'25%', fontSize:'20px', color:'#FFF', cursor:'pointer'}} className="fa fa-chevron-right pull-right" aria-hidden="true"></i>

                //     <Modal.Body style={{background:'#4285f4'}} >
                //     <div className="row">
                //       <div className="col-sm-12">
                //         <i onClick={this.closeInfoType.bind(this)} style={{color:'#FFF', fontSize:'20px', paddingRight:'10px', cursor:'pointer'}} className="fa fa-times pull-right" aria-hidden="true"></i>
                //       </div>
                //     </div>
                //     <div className="row">
                //       <div className="col-sm-12 search-modal" style={{paddingLeft:'0'}}>
                //         <h3 style={{textAlign:'center', paddingBottom:'0px', color:'#FFF', paddingLeft:'15px !important', paddingRight:'15px !important'}}>Fuzzy Search</h3>
                //         <br />
                //         <div style={{background:'#FFF',marginBottom:'-30px', padding:'20px'}}>
                //         <p style={{textAlign:'justify', paddingRight:'10px', color:'#525252', fontSize:'15px'}} >Fuzzy Search - eg. Searching MikeLegal~2 will give results of variations in MikeLegal till 2 character variation. So, it will show results of 7 letter words to 11 letter words. Answers to the above query will include MkeLgal, Mikegal, MikeLegal12 and MikeLegal. </p>
                //         </div>
                //       </div>
                //     </div>
                //     </Modal.Body>
                // </Modal>

                // <Modal show={this.state.showInitialType} onHide={this.closeInfoType.bind(this)}>
                //   <i onClick={this.handleFuzzyTypeOpen.bind(this)} style={{position:'absolute', marginLeft:'-30%', marginTop:'25%', fontSize:'20px', cursor:'pointer', color:'#FFF !important'}} className="fa fa-chevron-left" aria-hidden="true"></i>
                //   <i onClick={this.handleBooleanTypeOpen.bind(this)} style={{position:'absolute', marginRight:'-30%', right:'0', marginTop:'25%', fontSize:'20px', color:'#FFF', cursor:'pointer'}} className="fa fa-chevron-right pull-right" aria-hidden="true"></i>

                //     <Modal.Body style={{background:'#4285f4'}} >
                //     <div className="row">
                //       <div className="col-sm-12">
                //         <i onClick={this.closeInfoType.bind(this)} style={{color:'#FFF', fontSize:'20px', paddingRight:'10px', cursor:'pointer'}} className="fa fa-times pull-right" aria-hidden="true"></i>
                //       </div>
                //     </div>
                //     <div className="row">
                //       <div className="col-sm-12 search-modal" style={{paddingLeft:'0'}}>
                //         <h3 style={{textAlign:'center', paddingBottom:'0px', color:'#FFF', paddingLeft:'15px !important', paddingRight:'15px !important'}}>Initial Search</h3>
                //         <br />
                //         <div style={{background:'#FFF',marginBottom:'-30px', padding:'20px'}}>
                //         <p style={{textAlign:'justify', paddingRight:'10px', color:'#525252', fontSize:'15px'}} >Initials - Eg. If you will select initial search for Oliver Silver it will show all results with initials O and S.</p>
                //         </div>
                //       </div>
                //     </div>
                //     </Modal.Body>
                // </Modal>

                // <Modal show={this.state.showBooleanType} onHide={this.closeInfoType.bind(this)}>
                //   <i onClick={this.handleInitialTypeOpen.bind(this)} style={{position:'absolute', marginLeft:'-30%', marginTop:'25%', fontSize:'20px', cursor:'pointer !important'}} className="fa fa-chevron-left" aria-hidden="true"></i>
                //   <i onClick={this.handleContextualTypeOpen.bind(this)} style={{position:'absolute', marginRight:'-30%', right:'0', marginTop:'25%', fontSize:'20px', color:'#FFF', cursor:'pointer'}} className="fa fa-chevron-right pull-right" aria-hidden="true"></i>

                //     <Modal.Body style={{background:'#4285f4'}} >
                //     <div className="row">
                //       <div className="col-sm-12">
                //         <i onClick={this.closeInfoType.bind(this)} style={{color:'#FFF', fontSize:'20px', paddingRight:'10px', cursor:'pointer'}} className="fa fa-times pull-right" aria-hidden="true"></i>
                //       </div>
                //     </div>
                //     <div className="row">
                //       <div className="col-sm-12 search-modal" style={{paddingLeft:'0'}}>
                //         <h3 style={{textAlign:'center', paddingBottom:'0px', color:'#FFF', paddingLeft:'15px !important', paddingRight:'15px !important'}}>Boolean Search</h3>
                //         <br />
                //         <div style={{background:'#FFF',marginBottom:'-30px', padding:'20px'}}>
                //         <p style={{textAlign:'justify', paddingRight:'10px', color:'#525252', fontSize:'15px'}} >Eg. Searching for marks Farm2Fresh or Farm to Fresh, it can be searched as Farm (and) 2 (or) to (and) fresh. This will give results having farm followed by either 2 or further followed by fresh. In case you wish to see the results starting with Mike but without Legal in it then you can search for Mike (NOT) Legal. This will give results starting with Mike but without Legal in it. Mike Law, Mike and Mike Layman will be the results of this query. </p>
                //         </div>
                //       </div>
                //     </div>
                //     </Modal.Body>
                // </Modal>

                // <Modal show={this.state.showContextualType} onHide={this.closeInfoType.bind(this)}>
                //   <i onClick={this.handleBooleanTypeOpen.bind(this)} style={{position:'absolute', marginLeft:'-30%', marginTop:'25%', fontSize:'20px', cursor:'pointer', color:'#FFF !important'}} className="fa fa-chevron-left" aria-hidden="true"></i>
                //   <i onClick={this.handleFlashTypeOpen.bind(this)} style={{position:'absolute', marginRight:'-30%', right:'0', marginTop:'25%', fontSize:'20px', color:'#FFF', cursor:'pointer'}} className="fa fa-chevron-right pull-right" aria-hidden="true"></i>

                //     <Modal.Body style={{background:'#4285f4'}} >
                //     <div className="row">
                //       <div className="col-sm-12">
                //         <i onClick={this.closeInfoType.bind(this)} style={{color:'#FFF', fontSize:'20px', paddingRight:'10px', cursor:'pointer'}} className="fa fa-times pull-right" aria-hidden="true"></i>
                //       </div>
                //     </div>
                //     <div className="row">
                //       <div className="col-sm-12 search-modal" style={{paddingLeft:'0'}}>
                //         <h3 style={{textAlign:'center', paddingBottom:'0px', color:'#FFF', paddingLeft:'15px !important', paddingRight:'15px !important'}}>Contextual Search</h3>
                //         <br />
                //         <div style={{background:'#FFF',marginBottom:'-30px', padding:'20px'}}>
                //         <p style={{textAlign:'justify', paddingRight:'10px', color:'#525252', fontSize:'15px'}} >Contextual - Shows marks with a similar meaning to the mark you searched for. Eg. Searching for alligator slippers would show crocodile slippers.   </p>
                //         </div>
                //       </div>
                //     </div>
                //     </Modal.Body>
                // </Modal>

              }

                {/*<Modal show={this.state.showExactType} onHide={this.closeInfoType.bind(this)}>
                                  <i onClick={this.handleContextualTypeOpen.bind(this)} style={{position:'absolute', marginLeft:'-30%', marginTop:'25%', fontSize:'20px', cursor:'pointer', color:'#FFF !important'}} className="fa fa-chevron-left" aria-hidden="true"></i>
                                  <i onClick={this.handleFlashTypeOpen.bind(this)} style={{position:'absolute', marginRight:'-30%', right:'0', marginTop:'25%', fontSize:'20px', color:'#FFF', cursor:'pointer'}} className="fa fa-chevron-right pull-right" aria-hidden="true"></i>
                
                                    <Modal.Body style={{background:'#4285f4'}} >
                                    <div className="row">
                                      <div className="col-sm-12">
                                        <i onClick={this.closeInfoType.bind(this)} style={{color:'#FFF', fontSize:'20px', paddingRight:'10px', cursor:'pointer'}} className="fa fa-times pull-right" aria-hidden="true"></i>
                                      </div>
                                    </div>
                                    <div className="row">
                                      <div className="col-sm-12 search-modal" style={{paddingLeft:'0'}}>
                                        <h3 style={{textAlign:'center', paddingBottom:'0px', color:'#FFF', paddingLeft:'15px !important', paddingRight:'15px !important'}}>Exact Search</h3>
                                        <br />
                                        <div style={{background:'#FFF',marginBottom:'-30px', padding:'20px'}}>
                                        <p style={{textAlign:'justify', paddingRight:'10px', color:'#525252', fontSize:'15px'}} >Exact - Exact search will give exact search results.</p>
                                        </div>
                                      </div>
                                    </div>
                                    </Modal.Body>
                                </Modal>*/}

                <Modal show={this.state.showFlashType} onHide={this.closeInfoType.bind(this)}>
                  <i onClick={this.handleContextualTypeOpen.bind(this)} style={{position:'absolute', marginLeft:'-30%', marginTop:'25%', fontSize:'20px', cursor:'pointer', color:'#FFF !important'}} className="fa fa-chevron-left" aria-hidden="true"></i>
                  <i onClick={this.handleGeneralTypeOpen.bind(this)} style={{position:'absolute', marginRight:'-30%', right:'0', marginTop:'25%', fontSize:'20px', color:'#FFF', cursor:'pointer'}} className="fa fa-chevron-right pull-right" aria-hidden="true"></i>

                    <Modal.Body style={{background:'#4285f4'}} >
                    <div className="row">
                      <div className="col-sm-12">
                        <i onClick={this.closeInfoType.bind(this)} style={{color:'#FFF', fontSize:'20px', paddingRight:'10px', cursor:'pointer'}} className="fa fa-times pull-right" aria-hidden="true"></i>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-12 search-modal" style={{paddingLeft:'0'}}>
                        <h3 style={{textAlign:'center', paddingBottom:'0px', color:'#FFF', paddingLeft:'15px !important', paddingRight:'15px !important'}}>MikeTM Flash</h3>
                        <br />
                        <div style={{background:'#FFF',marginBottom:'-30px', padding:'20px'}} >
                        <p style={{textAlign:'justify', paddingRight:'10px', color:'#525252', fontSize:'15px'}} >Flash Search - Flash Search gives you an ability to do an instant search on your mark. It performs all kinds of search except boolean and shows results accordingly. </p>
                        </div>
                      </div>
                    </div>
                    </Modal.Body>
                </Modal>

                <Modal show={this.state.showGeneralType} onHide={this.closeInfoType.bind(this)}>
                  <i onClick={this.handleFlashTypeOpen.bind(this)} style={{position:'absolute', marginLeft:'-30%', marginTop:'25%', fontSize:'20px', cursor:'pointer', color:'#FFF !important'}} className="fa fa-chevron-left" aria-hidden="true"></i>
                  <i onClick={this.handleWildTypeOpen.bind(this)} style={{position:'absolute', marginRight:'-30%', right:'0', marginTop:'25%', fontSize:'20px', color:'#FFF', cursor:'pointer'}} className="fa fa-chevron-right pull-right" aria-hidden="true"></i>

                    <Modal.Body style={{background:'#4285f4'}} >
                    <div className="row">
                      <div className="col-sm-12">
                        <i onClick={this.closeInfoType.bind(this)} style={{color:'#FFF', fontSize:'20px', paddingRight:'10px', cursor:'pointer'}} className="fa fa-times pull-right" aria-hidden="true"></i>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-12 search-modal" style={{paddingLeft:'0'}}>
                        <h3 style={{textAlign:'center', paddingBottom:'0px', color:'#FFF', paddingLeft:'15px !important', paddingRight:'15px !important'}}>Standard Search</h3>
                        <br />
                        <div style={{background:'#FFF',marginBottom:'-30px', padding:'20px'}} >
                        <p style={{textAlign:'justify', paddingRight:'10px', color:'#525252', fontSize:'15px'}} >Flash Search - Flash Search gives you an ability to do an instant search on your mark. It performs all kinds of search except boolean and shows results accordingly. </p>
                        </div>
                      </div>
                    </div>
                    </Modal.Body>
                </Modal>
                 <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
         </div>
       </div>
    </div>
    </div>
    </div>
    </div>

        </div>
      </div>}
      </div>
          );
  }
}

function mapStateToProps(state) {
  console.log('State search check:', state);
   return ({marks:state.search.marks, result:state.result.result, classes:state.search.classes, class_item:state.search.class_item
    , filtered_prop: state.proprietor.proprietor_filtered, vulnerability: state.search.vulnerability, quota: state.search.quota, application_search_state:state.search.application_search_state, application_search_data:state.search.application_search_data });
}

function mapDispatchToProps(dispatch) {
  return  {
      casesAction: bindActionCreators(casesAction, dispatch)
    };
  
}
export default connect(mapStateToProps,mapDispatchToProps)(App);
