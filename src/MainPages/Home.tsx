/*
 * @Author: Antoine YANG 
 * @Date: 2020-04-13 18:08:15 
 * @Last Modified by: Antoine YANG
 * @Last Modified time: 2020-04-15 21:36:38
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
          <header style={{
            fontWeight: "bold"
          }} >
            UPDATE!
          </header>
          <p>
            The button designed for starting writing a new article is loaded.
            You can find it at the bottom-right corner - a cross with the color of seawater.
            So if you <i>want to write an article</i>,
            stick your mouse or finger on it.
            Then you will...
          </p>
          <br />
          <br />
          <br />
          <p>
            Get wet.
          </p>
          <br />
          <br />
          <p>
            Enjoy it.
          </p>
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
