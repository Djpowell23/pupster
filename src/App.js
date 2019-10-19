import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar";
import About from "./pages/About";
import Discover from "./pages/Discover";
import Search from "./pages/Search";

function App() {
  return (
    <Router>
      <NavBar />
      <div className="container">
        <Switch>
          <Route exact path="/discover" component={Discover} />
          <Route exact path="/search" component={Search} />
          <Route component={About} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
