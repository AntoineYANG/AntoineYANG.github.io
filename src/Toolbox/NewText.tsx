/*
 * @Author: Antoine YANG 
 * @Date: 2020-04-14 14:24:12 
 * @Last Modified by: Antoine YANG
 * @Last Modified time: 2020-04-14 17:12:13
 */

import React, { Component, createRef } from "react";
import sprit from "./sprit.png";
import $ from "jquery";
import { Sys } from "../Proxy";


export interface NewTextProps {};

export interface NewTextState {};


export class NewText extends Component<NewTextProps, NewTextState, {}> {
    private timer: NodeJS.Timeout;
    private speed: number;
    private dv: number;
    private degree: number;
    private hover: boolean;
    private refShape: React.RefObject<HTMLElement>;
    private refShade: React.RefObject<HTMLElement>;
    // private show: boolean;

    public constructor(props: NewTextProps) {
        super(props);
        this.timer = setTimeout(this.rotate.bind(this), 30);
        this.speed = 0.6;
        this.dv = 0;
        this.degree = 0;
        this.hover = false;
        // this.show = false;
        this.refShape = createRef();
        this.refShade = createRef();
    }

    public render(): JSX.Element {
        return (
            <div id="NewText"
            onMouseOver={
                () => {
                    this.hover = true;
                }
            }
            onMouseOut={
                () => {
                    this.hover = false;
                }
            }
            onTouchStart={
                () => {
                    this.hover = true;
                }
            }
            onTouchEnd={
                () => {
                    this.hover = false;
                }
            }
            // onClick={
            //     () => {
            //         this.show = !this.show;
            //         if (this.show) {
            //             $(this.refs["menu"]).show();
            //         } else {
            //             $(this.refs["menu"]).hide();
            //         }
            //     }
            // }
            >
                <i ref={ this.refShape } style={{
                    position: "relative",
                    top: "6%",
                    left: "6%",
                    background: `url(${ sprit })`,
                    width: "94%",
                    height: "94%",
                    backgroundSize: "100% auto",
                    backgroundPositionY: "9%",
                    display: "block"
                }} />
                <i ref={ this.refShade } style={{
                    position: "relative",
                    top: "-94%",
                    background: `url(${ sprit })`,
                    width: "100%",
                    height: "100%",
                    backgroundSize: "100% auto",
                    backgroundPositionY: 0,
                    display: "block"
                }} />
                {/* <div ref="menu" ></div> */}
            </div>
        );
    }

    public componentWillUnmount(): void {
        clearTimeout(this.timer);
    }

    private rotate(): void {
        if (this.hover) {
            if (this.dv < 0.01) {
                this.dv = 0.01;
            } else {
                this.dv += 0.004;
            }
            this.speed += this.dv;
            if (this.speed > 60) {
                this.speed = 60;
            }
        } else {
            if (this.dv > 0.01) {
                this.dv = 0.01;
            }
            if (this.speed > 0.6) {
                this.speed -= 0.3;
            }
            if (this.speed <= 0.6) {
                this.speed = 0.6;
                Sys.callPanel(false);
            }
        }

        // 激活特效幕布
        if (this.speed > 8) {
            Sys.callPanel(true);
        }
        
        this.degree += this.speed;

        while (this.degree >= 360) {
            this.degree -= 360;
        }

        $(this.refShade.current!).css("transform", `rotate(${ - this.degree }deg)`);
        $(this.refShape.current!).css("transform", `rotate(${ - this.degree }deg)`);

        this.timer = setTimeout(this.rotate.bind(this), 30);
    }
}
