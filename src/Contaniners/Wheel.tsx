/*
 * @Author: Antoine YANG 
 * @Date: 2020-04-13 15:28:55 
 * @Last Modified by: Antoine YANG
 * @Last Modified time: 2020-04-13 16:16:08
 */

import React, { Component } from "react";


export interface WheelProps {};

export interface WheelState {};

/**
 * 这个类组件构造一个交互式的菜单轮。
 * 
 * @export
 * @class Wheel
 * @extends {Component<WheelProps, WheelState, React.ReactElement>}
 */
export class Wheel extends Component<WheelProps, WheelState, React.ReactElement> {
    public constructor(props: WheelProps) {
        super(props);
    }

    public render(): JSX.Element {
        return (
            <div key="wheel" className="wheel" />
        );
    }
}
