/*
 * @Author: Antoine YANG 
 * @Date: 2020-04-13 15:29:03 
 * @Last Modified by: Antoine YANG
 * @Last Modified time: 2020-07-06 15:39:24
 */
import React, { Component } from 'react';
import $ from "jquery";
import { Navigator } from "./Contaniners/Navigator";
import { Switch, Route, HashRouter } from 'react-router-dom';
import './App.css';
import { Home } from "./MainPages/Home";
import { BadUrl } from "./MainPages/BadUrl";
import { MostViewedList, RecentList } from "./MainPages/ListView";
import { ContactMe } from './MainPages/ContactMe';
import { Write } from './MainPages/Write';
import { ElementVisibility, Sys } from './Proxy';
import { NewText } from "./Toolbox/NewText";
import { Panel } from "./Contaniners/Panel";


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
              <Route path="/recent" exact component={ RecentList } />
              <Route path="/most_viewed" exact component={ MostViewedList } />
              <Route path="/contact_me" exact component={ ContactMe } />
              <Route path="/write" exact component={ Write } />
              <Route path="/**" component={ BadUrl } />
            </Switch>
          </HashRouter>
        </div>
        <NewText />
        <Panel mode="rain" />
      </>
    );
  }

  public componentDidMount(): void {
    window.onresize = this.updateContainers.bind(this);
    window.onscroll = this.updateContainers.bind(this);
    this.updateContainers();
  }

  private updateContainers(): void {
    // 若横屏，导航栏换行
    $("#navi").css(
      "display", $(window).width()! >= $(window).height()! ? "flex" : "block"
    );
    $("#navi_nav").css(
      "margin", `0 ${
        $(window).width()! >= $(window).height()! ? "2.4vmin" : "0"
    }`);
    $(".MenuItem").css(
      "font-size", $(window).width()! >= $(window).height()! ? "unset" : "14.5px"
    ).css(
      "letter-spacing", $(window).width()! >= $(window).height()! ? "unset" : "-0.5px"
    );

    const containers: JQuery<HTMLDivElement> = $("div.box");

    containers.each((_: number, e: HTMLDivElement) => {
      const state: ElementVisibility = Sys.isElementVisible($(e));

      $(e).css("background", `rgba(252, 251, 249, ${ 0.2 + state * 0.7 })`);
    })
  }
}

export default App;
