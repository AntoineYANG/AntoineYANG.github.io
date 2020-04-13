/*
 * @Author: Antoine YANG 
 * @Date: 2020-04-13 16:20:08 
 * @Last Modified by: Antoine YANG
 * @Last Modified time: 2020-04-13 16:47:14
 */

import React, { Component } from "react";


export interface ContainerProps {
    style?: React.CSSProperties;
};

export interface ContainerState {};

export class Container extends Component<ContainerProps, ContainerState, {}> {
    public constructor(props: ContainerProps) {
        super(props);
    }

    public render(): JSX.Element {
      return (
        <div className="container monospaced unselectable"
        style={{
            ...this.props.style
        }} >
          { this.props.children }
        </div>
      );
    }
  }
