/*
 * @Author: Antoine YANG 
 * @Date: 2020-04-13 15:29:03 
 * @Last Modified by: Antoine YANG
 * @Last Modified time: 2020-04-13 21:04:27
 */
import React, { Component } from 'react';
// import { Container } from "./Contaniners/Container";
import { Navigator } from "./Contaniners/Navigator";
import { Switch, Route, HashRouter } from 'react-router-dom';
import './App.css';
import { Home } from "./MainPages/Home";
import { BadUrl } from "./MainPages/BadUrl";  
import { ContactMe } from './MainPages/ContactMe';


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
        }, {
          text: "Contact Me",
          url: "/contact_me"
        }] } />
        <div id="main"
        style={{
          margin: "60px auto",
          width: "170vh",
          background: "#fBf9f5",
          boxShadow: "calc(3px + 0.3vh) calc(2px + 0.2vh)"
                    + " calc(3px + 0.3vh) calc(0.4px + 0.1vh) #1A1B1D38"
        }} >
          <HashRouter>
            <Switch>
              <Route path="/" exact component={ Home } />
              <Route path="/contact_me" exact component={ ContactMe } />
              <Route path="/**" component={ BadUrl } />
            </Switch>
          </HashRouter>
        </div>
      </>
    );
  }
}

export default App;
