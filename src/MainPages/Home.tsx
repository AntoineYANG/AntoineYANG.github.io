/*
 * @Author: Antoine YANG 
 * @Date: 2020-04-13 18:08:15 
 * @Last Modified by: Antoine YANG
 * @Last Modified time: 2020-04-13 21:38:40
 */

import React, { Component } from 'react';
import { Container } from "../Contaniners/Container";
import '../App.css';


export class Home extends Component<{}, {}, {}> {
  public render(): JSX.Element {
    return (
        <Container mode="text"
        style={{
          fontSize: "24px"
        }} >
          <hr style={{
            margin: "90px 10vh 70px"
          }} />
          <p>
            Hello! This is Antoine YANG's blog.
          </p>
          <p>
            Sorry that this site is still under developing.
          </p>
          <p>
            Hope to see you here in the near future. (´∀｀)
          </p>
          <br />
          <p>
            If you want to send me messages, click <b>Contact Me</b> on the top navigator.
          </p>
        </Container>
    );
  }
}
