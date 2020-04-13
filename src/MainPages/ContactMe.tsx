/*
 * @Author: Antoine YANG 
 * @Date: 2020-04-13 20:59:01 
 * @Last Modified by: Antoine YANG
 * @Last Modified time: 2020-04-13 21:36:52
 */

import React, { Component } from 'react';
import { Container } from "../Contaniners/Container";
import '../App.css';


export class ContactMe extends Component<{}, {}, {}> {
  public render(): JSX.Element {
    return (
        <Container mode="text" >
            <div style={{
                fontSize: "22px"
            }} >
                <hr style={{
                    margin: "90px 10vh"
                }} />
                <p>
                    Grateful to our accquitance! 
                </p>
                <p>
                    If you are interested in this site,
                </p>
                <p>
                    Or want to share some ideas with me,
                </p>
                <p>
                    <a href="https://github.com/AntoineYANG" >Click here</a> to see my GitHub page.
                </p>
                <p>
                    You can also send e-mails to&nbsp;
                    <i className="selectable" id="email" style={{
                        textDecoration: "underline"
                    }} >
                        antoineyang99@gmail.com
                    </i>.
                </p>
            </div>
        </Container>
    );
  }
}
