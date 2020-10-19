import React, { Fragment } from 'react';
// import logo from './logo.svg';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import AddDoctor from './components/Add-Doctor/AddDoctor';
import DoctorList from './components/Doctor-List/DoctorList';
import Header from './components/Header/Header';
import NewAddedDoctor from './components/New-Added-Doctor/NewAddedDoctor';
import PageNotFoundComponent from './components/PageNotFound/PageNotFoundComponent';

const App =()=> {
  return (
    <Fragment>
      <Router>
        <header>
          <Header/>
        </header>
        <main>
          <Switch>
              <Route path="/" exact component={DoctorList} />
              <Route path="/doctor-list" exact component={DoctorList} />
              <Route path="/add-doctor" exact component={AddDoctor} />
							<Route path="/newly-added-doctors" exact component={NewAddedDoctor} />
							<Route path="**" component={PageNotFoundComponent} />
          </Switch>
        </main>
      </Router>
    </Fragment>
  );
}

export default App;
