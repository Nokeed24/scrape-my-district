import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import LoginPage from "./components/login/LoginPage";

import TopBar from "./components/layout/TopBar";
import Homepage from "./components/homepage/homepage.js";
import LogoutPage from "./components/logout/LogoutPage";

import List from "./components/List";
import FileSelector from "./components/FileSelector";

// /Users/fong/code/scrape-rwapp/scrape-my-district/client/src/components
class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <nav>
            <TopBar />
          </nav>

          <main style={{ marginTop: 75 }}>
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/logout" component={LogoutPage} />
            <Route exact path="/homepage" component={Homepage} />
            <Route exact path="/fileselector" component={FileSelector} />
            <Route exact path="/" render={() => <Redirect to="/login" />} />
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
