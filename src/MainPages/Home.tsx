/*
 * @Author: Antoine YANG 
 * @Date: 2020-04-13 18:08:15 
 * @Last Modified by: Antoine YANG
 * @Last Modified time: 2020-04-13 18:12:57
 */

import React, { Component } from 'react';
import { Container } from "../Contaniners/Container";
import '../App.css';


export class Home extends Component<{}, {}, {}> {
  public render(): JSX.Element {
    return (
        <Container >
          <p>
            Hello! This is Antoine YANG's blog.
          </p>
          <p>
            Sorry that this page is still under developing.
          </p>
          <p>
            Hope to see you here in the near future. (´∀｀)
          </p>
        </Container>
    );
  }
}
