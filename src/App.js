import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import DoctorList from "./components/Doctor-List/DoctorList";
import Header from "./components/Header/Header";
import NewAddedDoctor from "./components/New-Added-Doctor/NewAddedDoctor";
import PageNotFoundComponent from "./components/PageNotFound/PageNotFoundComponent";
import DoctorDetail from "./components/Add-Doctor/DoctorDetail";
import DoctorTiming from "./components/Add-Doctor/DoctorTiming";
import AddDoctor from "./components/Add-Doctor/AddDoctor";

const App = () => {
  return (
    <Fragment>
      <Router>
        <header>
          <Header />
        </header>
        <main>
          <Switch>
            <Route path='/' exact component={DoctorList} />
            <Route path='/doctor-list' exact component={DoctorList} />
            <Route path='/step-1' exact component={DoctorDetail} /> 
            <Route path='/add-doctor' exact component={AddDoctor} />
            <Route path='/step-2' exact component={DoctorTiming} />
            <Route
              path='/newly-added-doctors'
              exact
              component={NewAddedDoctor}
            />
            <Route path='**' component={PageNotFoundComponent} />
          </Switch>
        </main>
      </Router>
    </Fragment>
  );
};

export default App;
