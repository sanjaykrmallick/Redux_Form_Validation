import React, { Fragment } from 'react';
// import logo from './logo.svg';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from './components/Header/Header';

const App =()=> {
  return (
    <Fragment>
      <Router>
        <header>
          <Header/>
        </header>
        <main>
          <Switch>
            {/* <Route exact path="/" component={}/> */}
          </Switch>
        </main>
      </Router>
    </Fragment>
  );
}

export default App;
