/*
 * @Author: Antoine YANG 
 * @Date: 2020-04-13 15:29:03 
 * @Last Modified by: Antoine YANG
 * @Last Modified time: 2020-04-14 13:15:26
 */
import React, { Component } from 'react';
import $ from "jquery";
import { Navigator } from "./Contaniners/Navigator";
import { Switch, Route, HashRouter } from 'react-router-dom';
import './App.css';
import { Home } from "./MainPages/Home";
import { BadUrl } from "./MainPages/BadUrl";  
import { ContactMe } from './MainPages/ContactMe';
import { ElementVisibility, Sys } from './Proxy';


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
          width: "80%"
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

  public componentDidMount(): void {
    window.onresize = this.updateContainers.bind(this);
    window.onscroll = this.updateContainers.bind(this);
    this.updateContainers();
  }

  private updateContainers(): void {
    const containers: JQuery<HTMLDivElement> = $("div.box");

    containers.each((_: number, e: HTMLDivElement) => {
      const state: ElementVisibility = Sys.isElementVisible($(e));

      $(e).css("background", `rgba(252, 251, 249, ${ 0.1 + state * 0.7 })`);
    })
  }
}

export default App;
