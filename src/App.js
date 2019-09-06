import React, { Component } from 'react';
import './App.css';
import {Router, Route} from "react-router-dom";
import {history} from "./history/history";
import AddEdit from "../src/app/components/add-edit";
import List from "../src/app/components/list";

class App extends Component {
  render() {
    return (
      <Router history={history}>
      <div>
        <Route exact path="/" component={List}></Route>
        <Route exact path="/list" component={List}></Route>
        <Route exact path="/add-edit/:id" component={AddEdit}></Route>
      </div>
      </Router>
    );
  }
}


export default App;
