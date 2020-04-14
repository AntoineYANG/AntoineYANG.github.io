/*
 * @Author: Antoine YANG 
 * @Date: 2020-04-13 16:20:08 
 * @Last Modified by: Antoine YANG
 * @Last Modified time: 2020-04-14 13:03:54
 */

import React, { Component } from "react";


export interface ContainerProps {
    style?: React.CSSProperties;
    mode: "info" | "text";
};

export interface ContainerState {};

export class Container extends Component<ContainerProps, ContainerState, {}> {
    public constructor(props: ContainerProps) {
        super(props);
    }

    public render(): JSX.Element {
      return (
        <div className={ "container box monospaced unselectable " + this.props.mode }
        style={{
          minHeight: "16vmin",
          padding: "4vmin 10vmin",
          fontSize: "calc(4px + 2vmin)",
          ...this.props.style
        }} >
          { this.props.children }
        </div>
      );
    }
  }
