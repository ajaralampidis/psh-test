import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>

        <Link to='/'>| Home |</Link>
        <Link to='/register'>| Register |</Link>
        <Link to='/ranking'>| Top 10 |</Link>
        <Link to='/matches'>| Matches |</Link>

        <Switch>
          
          <Route exact path="/">
            <h1> HOME </h1>
          </Route>

          <Route path="/register">
            <h1> Register </h1>
          </Route>

          <Route path="/ranking">
            <h1> Top 10 </h1>
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
