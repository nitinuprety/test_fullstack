import React, { Component } from 'react';
import { browserHistory, Link } from 'react-router';


export default class Intro extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-sm-12 hero-section">
          	<h3 style={{textAlign:'center', fontSize:'24px', fontWeight:'600'}} >MikeTM Search</h3>
          	<br/>
          	<h3 style={{textAlign:'center', fontSize:'24px', fontWeight:'600'}} >Your AI Powered trademark search tool</h3>
          	<br/>
          </div>
        </div>
        <div className="row">
        	<div className="col-sm-12" style={{textAlign:'center'}}>
               <ul style={{listStyle:'aliceblue !important', padding:'10px 100px', fontSize:'17px'}} >
          		<li style={{color:'#525252',background:'none ', paddingTop:'20px'}}>Now perform an all class search or multi-class search. By default we do the search across 45 classes. </li>
          		<li style={{color:'#525252',background:'none ', paddingTop:'20px'}}>Use state of the art searching capabilities like Flash Search, Fuzzy Search, Wildcard Search to ensure that you do not miss out on any relevant mark.</li>
          		<li style={{color:'#525252',background:'none ', paddingTop:'20px'}}>Analyze the search results through our ‘Results Analysis’. See number of class wise applications, type wise and status wise distribution of the search results in pictorial form. Also, find number of oppositions filed against a mark easily.  </li>
          		<li style={{color:'#525252',background:'none ', paddingTop:'20px'}}> Now you can also do a proprietor search to know all the details such as number of applications filed, number of registered applications and year-wise distribution of applications filed.</li>
          		<li style={{color:'#525252',background:'none ', paddingTop:'20px'}}>You can also see the real time data of a mark by clicking on ‘get realtime info’ and access all the documents filed in relation to that application.</li>
          		<li style={{color:'#525252',background:'none ', paddingTop:'20px'}}>Make a report by either clicking on ‘add to report’ or selecting the range of similarity level which you want to add in the report. In the report, you can also put logo of your organisation.</li>
          	</ul>
          	<br/>
          	<Link to="/search"><button className="btn btn-primary" style={{background:'#4285f4 !important', borderColor:'#4285f4 !important', padding:'10px 20px',borderRadius:'0',textShadow:'none !important',boxShadow:'none !important'}}>Start Researching</button></Link>
        	</div>
        </div>
      </div>
    );
  }
}