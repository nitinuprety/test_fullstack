import React, { Component } from 'react';
import { browserHistory, Link } from 'react-router';


export default class Intro extends Component {
  render() {
    return (
        <div className="row">
        	<div className="col-sm-12" style={{textAlign:'center',background:'#397099',height:'100vh'}}>
          <h3 style={{position:'absolute',color:'#FFF'}} >MikeTM Search seems down. Please wait...</h3>
          <img style={{textAlign:'center',background:'#397099',height:'100vh',width:'100%'}} src="../../images/maintenance_page.jpg" />
        	</div>
      </div>
    );
  }
}