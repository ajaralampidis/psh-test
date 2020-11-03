import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
//Styles
import 'normalize.css';
import styles from './App.module.css';
// Components
import Navbar from './components/Navbar/Navbar.js'
// Sections
import Home from './sections/Home/Home.js';
import Ranking from './sections/Ranking/Ranking.js';
// ================= End Imports ===============//


function App() {
  return (
    <div className={styles.App}>
      <Router>

        <Navbar />

        <Switch>
          
          <Route exact path="/">
            <Home />
          </Route>

          <Route path="/register">
            <h1> Register </h1>
          </Route>

          <Route path="/ranking">
            <Ranking />
          </Route>

          <Route path="/matches">
            <h1> Matches </h1>
          </Route>


          {/*========( 404 Route )========*/}
          <Route>
            <h1> 404 Page Not Found </h1>
          </Route>

        </Switch>
      </Router>
    </div>
  );
}

export default App;
