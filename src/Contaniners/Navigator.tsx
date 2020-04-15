/*
 * @Author: Antoine YANG 
 * @Date: 2020-04-13 16:47:52 
 * @Last Modified by: Antoine YANG
 * @Last Modified time: 2020-04-15 15:58:15
 */

import React, { Component } from "react";
import $ from "jquery";
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
            <div className="container monospaced unselectable" id="navi"
            style={{
                background: "#20242A",
                color: "white",
                fontSize: "16px",
                border: "none",
                display: $(window).width()! >= $(window).height()! ? "flex" : "block",
                padding: "10px 16px",
                width: "calc(100% - 32px)",
                textAlign: "left",
                overflowX: "hidden",
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
                            margin: "5px 1vmin 5px 1vmin",
                            fontSize: "22px",
                            letterSpacing: "-0.06em"
                        }} >
                            Shiokaze
                        </label>
                    </Link>
                </HashRouter>
                <nav id="navi_nav"
                style={{
                    margin: `0 ${
                        $(window).width()! >= $(window).height()! ? "2.4vmin" : "0"
                    }`,
                    padding: "5.9px 0",
                    display: "flex",
                    overflowX: "hidden"
                }} >
                    <HashRouter>
                        {
                            this.props.items.map((item: MenuItem, i: number) => {
                                return this.parseJSX(item);
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
