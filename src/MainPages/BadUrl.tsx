/*
 * @Author: Antoine YANG 
 * @Date: 2020-04-13 18:12:52 
 * @Last Modified by: Antoine YANG
 * @Last Modified time: 2020-04-13 21:36:15
 */

import React, { Component } from 'react';
import { Container } from "../Contaniners/Container";
import '../App.css';


export class BadUrl extends Component<{}, {}, {}> {
  public render(): JSX.Element {
    return (
        <Container mode="info" >
          <hr style={{
            margin: "90px 10vh"
          }} />
          <p style={{
            fontSize: "26px"
          }} >
            Welcome to the Vaccum.
          </p>
        </Container>
    );
  }
}
