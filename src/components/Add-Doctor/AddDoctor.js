import React, { Component, Fragment } from "react";
import DoctorDetail from "./DoctorDetail";
import DoctorTiming from "./DoctorTiming";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Tabs, TabList, TabPanel, Tab } from "react-tabs";
import 'react-tabs/style/react-tabs.css';
import "./AddDoctor.styles.css"

class AddDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Fragment>
        <Router>
          <div>
            <div>
              <Tabs>
                <TabList>
                  <Tab>
                    <Link to='/'>DoctorDetail</Link>
                  </Tab>
                  <Tab>
                    <Link to='/step-2'>DoctorTiming</Link>
                  </Tab>
                </TabList>

                <TabPanel>
                  <Route path='/' component={DoctorDetail} />
                </TabPanel>
                <TabPanel>
                  <Route path='/step-2' component={DoctorTiming} />
                </TabPanel>
              </Tabs>
            </div>
          </div>
        </Router>
      </Fragment>
    );
  }
}

export default AddDoctor;
