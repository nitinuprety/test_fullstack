<StickyBox style={{top:'0 !important'}} bottom={true|true}>
                         <div className="col-sm-2 filter-res">

                          <div className="filters col-sm-12">
                          <div className="col-sm-12" style={{display:'flex !important', borderBottom:'1px solid #EEE'}} >
                          <h4 style={{textAlign:'left'}} ><strong>Filters</strong></h4>
                          <h4 style={{fontSize:'13px !important',textAlign:'right',paddingLeft:'40%',paddingTop:'2%',cursor:'pointer',color:'#4285f4'}}><strong onClick={this.handleReset.bind(this)} style={{fontSize:'14px !important'}} >Reset</strong></h4>
                          </div>
                      <Collapsible>
              
                        <div className="collapsible-header" onClick={this.toggleClass.bind(this)}>
                      <span><strong>Classes</strong></span>
              
                      </div>
                      
            <div className="collapsible-body" >
                    {!this.state.activeClass && <ul>
                   {class_fil && <FilterResults
                          items={class_fil}
                          fuseConfig={fuseConfig}>
                          {filteredItems => {
                            return(
                              <div style={{maxHeight:'150px', overflowY:'scroll'}} >      
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
                                {filteredItems3.map(item3 => <div>{item3.label && <span><input checked={this.state.check_data.indexOf(item3.label+'-'+'state')!=-1} style={{paddingRight:'5px', marginRight:'5px'}} onClick={()=>{this.handleFiltereSelect(item3, 'state')}} type="checkbox" />{item3.label}</span>}</div>)}
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


                    <div className="collapsible-header" onClick={this.toggleSimilarity.bind(this)}>
                      <span><strong>Similarity Level</strong></span>
              
                      </div>
                      
            <div className="collapsible-body" >
                    {!this.state.activeSimilarity && <ul>
                         {similarity && <FilterResults
                          items={similarity}
                          fuseConfig={fuseConfig8}>
                          {filteredItems8 => {
                            return(
                              <div style={{maxHeight:'150px', overflowY:'scroll', overflowX:'hidden'}} >      
                                {filteredItems8.map(item8 => <div><span><input style={{paddingRight:'5px', marginRight:'5px'}} checked={this.state.check_data.indexOf(item8.label+'-'+'similarity_index')!=-1} onClick={()=>{this.handleFiltereSelect(item8, 'similarity_index')}} type="checkbox" />{item8.label}</span></div>)}
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
                        </div>
                      </StickyBox>