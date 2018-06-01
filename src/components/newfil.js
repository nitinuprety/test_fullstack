                          <NavDropdown open={this.state.SimMenuOpen} onToggle={val => this.dropdownToggleSim(val)} eventKey={3} title="Similarity" id="basic-nav-dropdown">
                          <ul style={{listStyle:'none !important',paddingLeft:'1% !important'}}>
                              {similarity.map(sim=> <li style={{padding:'3px 20px'}} onClick={() => {this.menuItemClickedThatShouldntCloseDropdown()}}><input name="fil_check" type="checkbox" />{sim.label}</li>)}
                          </ul>       
                          </NavDropdown>

                            <NavDropdown open={this.state.ClMenuOpen} onToggle={val => this.dropdownToggleCl(val)} eventKey={3} title="Your TM class" id="basic-nav-dropdown">
                              <ul style={{listStyle:'none !important',paddingLeft:'1% !important'}}>
                                  {class_fil.map(cl=> <li style={{padding:'3px 20px'}} onClick={() => {this.menuItemClickedThatShouldntCloseDropdown()}}><input name="fil_check" type="checkbox" />{cl.label}</li>)}
                              </ul>       
                          </NavDropdown>

                          <NavDropdown open={this.state.CliMenuOpen} onToggle={val => this.dropdownToggleCli(val)} eventKey={3} title="Threat's TM class" id="basic-nav-dropdown">
                              <ul style={{listStyle:'none !important',paddingLeft:'1% !important'}}>
                                  {date_of_application.map(cli=> <li style={{padding:'3px 20px'}} onClick={() => {this.menuItemClickedThatShouldntCloseDropdown()}}><input name="fil_check" type="checkbox" />{cli}</li>)}
                              </ul>       
                          </NavDropdown>

                          <NavDropdown open={this.state.TpMenuOpen} onToggle={val => this.dropdownToggleTp(val)} eventKey={3} title="Trademark Type" id="basic-nav-dropdown">
                              <ul style={{listStyle:'none !important',paddingLeft:'1% !important'}}>
                                  {type.map(tp=> <li style={{padding:'3px 20px'}} onClick={() => {this.menuItemClickedThatShouldntCloseDropdown()}}><input name="fil_check" type="checkbox" />{tp.label}</li>)}
                              </ul>       
                          </NavDropdown>

                          <NavDropdown open={this.state.TpMenuOpen} onToggle={val => this.dropdownToggleTp(val)} eventKey={3} title="Trademark Type" id="basic-nav-dropdown">
                              <ul style={{listStyle:'none !important',paddingLeft:'1% !important'}}>
                                  {state.map(state=> <li style={{padding:'3px 20px'}} onClick={() => {this.menuItemClickedThatShouldntCloseDropdown()}}><input name="fil_check" type="checkbox" />{state.label}</li>)}
                              </ul>       
                          </NavDropdown>

                          <NavDropdown open={this.state.TpMenuOpen} onToggle={val => this.dropdownToggleTp(val)} eventKey={3} title="Trademark Type" id="basic-nav-dropdown">
                              <ul style={{listStyle:'none !important',paddingLeft:'1% !important'}}>
                                  {status.map(status=> <li style={{padding:'3px 20px'}} onClick={() => {this.menuItemClickedThatShouldntCloseDropdown()}}><input name="fil_check" type="checkbox" />{status.label}</li>)}
                              </ul>       
                          </NavDropdown>

                          <NavDropdown open={this.state.DouMenuOpen} onToggle={val => this.dropdownToggleDou(val)} eventKey={3} title="Date of Usage" id="basic-nav-dropdown">
                              <ul style={{listStyle:'none !important',paddingLeft:'1% !important'}}>
                                  {date_of_usage.map(dou=> <li style={{padding:'3px 20px'}} onClick={() => {this.menuItemClickedThatShouldntCloseDropdown()}}><input name="fil_check" type="checkbox" />{dou.label}</li>)}
                              </ul>       
                          </NavDropdown>