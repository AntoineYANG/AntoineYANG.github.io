/*
 * @Author: Antoine YANG 
 * @Date: 2020-04-13 16:47:52 
 * @Last Modified by: Antoine YANG
 * @Last Modified time: 2020-04-13 20:58:25
 */

import React, { Component } from "react";
import { Link, HashRouter } from "react-router-dom";


export type MenuItem = {
    text: string;
    url: string;
};

export type Menu = Array<MenuItem>;

export interface NavigatorProps {
    style?: React.CSSProperties;
    items: Menu;
};

export interface NavigatorState {
    style?: React.CSSProperties;
};


export class Navigator extends Component<NavigatorProps, NavigatorState, undefined> {
    public constructor(props: NavigatorProps) {
        super(props);
    }

    public render(): JSX.Element {
        return (
            <div className="container monospaced unselectable"
            style={{
                background: "#20242A",
                color: "white",
                fontSize: "16px",
                border: "none",
                padding: "18px 20px 14px",
                minHeight: "1em",
                textAlign: "left",
                ...this.props.style
            }} >
                <HashRouter>
                    <Link to="/" >
                        <label className="inactive"
                        style={{
                            display: "inline-block",
                            textAlign: "center",
                            fontStyle: "italic",
                            width: "88px",
                            margin: "-6px 1.2em -6px 0",
                            fontSize: "22px",
                            letterSpacing: "-0.06em"
                        }} >
                            Shiokaze
                        </label>
                    </Link>
                </HashRouter>
                <nav
                style={{
                    display: "inline-block"
                }} >
                    <HashRouter>
                        {
                            (new Array<null>(
                                ...this.props.items.map(() => null),
                                ...this.props.items.map(() => null)
                            )).slice(0, this.props.items.length * 2 - 1).map((_: null, i: number) => {
                                if (i % 2 === 1) {
                                    return (
                                        <label className="splitor" key={ "splitor_" + i } >|</label>
                                    );
                                } else {
                                    return this.parseJSX(this.props.items[Math.floor(i / 2)]);
                                }
                            })
                        }
                    </HashRouter>
                </nav>
            </div>
        );
    }

    private parseJSX(item: MenuItem): JSX.Element {
        return (
            <Link to={ item.url } key={ item.text } >
                <label className="MenuItem inactive" >
                    { item.text }
                </label>
            </Link>
        );
    }
};
