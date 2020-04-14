/*
 * @Author: Antoine YANG 
 * @Date: 2020-04-13 18:08:15 
 * @Last Modified by: Antoine YANG
 * @Last Modified time: 2020-04-14 13:15:02
 */

import React, { Component } from 'react';
import { Container } from "../Contaniners/Container";
import '../App.css';


export class Home extends Component<{}, {}, {}> {
  public render(): JSX.Element {
    return (
      <>
        <Container mode="text" >
          <hr className="head" />
          <header style={{
            fontWeight: "bold"
          }} >
            Hello! This is Antoine YANG's blog.
          </header>
        </Container>
        <Container mode="info" >
          <hr className="head" />
          <p>
            Sorry that this site is still under developing.
          </p>
          <p>
            Hope to see you here in the near future. (´∀｀)
          </p>
        </Container>
        <Container mode="text" >
          <hr className="head" />
          <p>
            I've just started working on this project as my private blog.
            After the system is built,
            I want to share some exprience and ideas I get through
            my study and programming.
            Therefore, I also want to display something I programmed before
            on this site, or maybe some new component such like some mini web games.
          </p>
          <p>
            All in all, this project will be a long term one.
            I do hope that I could make it a wonderful site
            not only for myself but everyone visits.
          </p>
          <p>
            See you next time, <b>Thanks!</b>
          </p>
          <br />
          <p>
            April 14th, 2020
          </p>
        </Container>
        <Container mode="text" >
          <hr className="head" />
          <p>
            If you want to send me messages, click <b>Contact Me</b> on the top navigator.
          </p>
        </Container>
        </>
    );
  }
}
