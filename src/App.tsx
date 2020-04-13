/*
 * @Author: Antoine YANG 
 * @Date: 2020-04-13 15:29:03 
 * @Last Modified by: Antoine YANG
 * @Last Modified time: 2020-04-13 19:16:44
 */
import React, { Component } from 'react';
// import { Container } from "./Contaniners/Container";
import { Navigator } from "./Contaniners/Navigator";
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import { Home } from "./MainPages/Home";
import { BadUrl } from "./MainPages/BadUrl";  


class App extends Component<{}, {}, {}> {
  public render(): JSX.Element {
    return (
      <>
        <Navigator items={ [{
          text: "Home",
          url: "/"
        }, {
          text: "Most Viewed",
          url: "/most_viewed"
        }, {
          text: "Recent",
          url: "/recent"
        }] } >
        </Navigator>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={ Home } />
            <Route path="/**" component={ BadUrl } />
          </Switch>
        </BrowserRouter>
      </>
    );
  }
}

export default App;
