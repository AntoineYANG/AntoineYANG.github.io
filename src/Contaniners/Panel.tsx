/*
 * @Author: Antoine YANG 
 * @Date: 2020-04-14 16:23:41 
 * @Last Modified by: Antoine YANG
 * @Last Modified time: 2020-04-15 16:00:26
 */

import React, { Component, createRef } from "react";
import $ from "jquery";
import { Sys } from "../Proxy";


export interface PanelProps {
    mode: "sunshine" | "rain" | "storm" | "snow";
};

class Rain {
    private distance: number;   // Nearest = 0, farthest = 1

    public x: number;
    public y: number;       // Top = 0, bottom = 1

    public constructor() {
        this.x = Math.random() * 1.4 - 0.2;
        this.y = -0.2 * Math.random();
        this.distance = Math.random();
    }

    public width(): number {
        return 0.5 / (1 + this.distance);
    }

    public fall(x: number): void {
        const rate: number = (this.y + 0.3) / 120 * x * this.distance * this.distance;
        this.y += 0.02 + rate;
        this.x += x;
    }
};

export interface PanelState {};

export class Panel extends Component<PanelProps, PanelState> {
    private timer: NodeJS.Timeout;
    private lasting: number;
    private ref: React.RefObject<HTMLCanvasElement>;
    private active: boolean;
    private ctx?: CanvasRenderingContext2D;
    private RainBox: Array<Rain>;
    private width: number;
    private height: number;
    private wind: number;
    private windNext: number;

    public constructor(props: PanelProps) {
        super(props);
        this.ref = createRef();
        this.timer = setTimeout(() => {}, 0);
        this.lasting = 0;
        this.active = false;
        this.RainBox = [];
        this.width = 400;
        this.height = 400;
        this.wind = 0;
        this.windNext = 0;
    }

    public render(): JSX.Element {
        return (
            <canvas ref={ this.ref }
            style={{
                width: "100%",
                height: "100%",
                zIndex: 9999,
                position: "fixed",
                left: 0,
                top: 0,
                background: this.props.mode === "rain"
                    ? "linear-gradient("
                        + "180deg,"
                        + "rgba(120,124,127,0.6) 0%,"
                        + "rgba(120,124,127,0.4) 10%,"
                        + "rgba(183,184,187,0.6) 85%,"
                        + "rgba(183,184,187,0.8) 100%)"
                    : "rgba(74,111,152,0.5)",
                pointerEvents: "none",
                opacity: 0
            }} />
        );
    }

    public componentDidMount(): void {
        Sys.callPanel = (a: boolean) => {
            this.active = a;
        };
        this.ctx = $(this.ref.current!).get(0).getContext("2d")!;
        this.ctx!.translate(0.5, 0.5);
        this.timer = setTimeout(this.play.bind(this), 30);
    }

    public componentWillUnmount(): void {
        clearTimeout(this.timer);
        Sys.callPanel = () => {};
    }

    private play(): void {
        if (this.active) {
            if (this.lasting < 40) {
                this.lasting += 1;
            }
        } else {
            this.lasting -= 0.6;
            if (this.lasting < 1) {
                this.lasting = 0;
            }
        }

        this.width = $(this.ref.current!).width()!;
        this.height = $(this.ref.current!).height()!;

        this.ctx!.clearRect(-10, -10, this.width + 20, this.height + 20);

        if (this.props.mode === "rain") {
            // Rain
            this.playRain();
        }

        $(this.ref.current!).css("opacity", Math.min(1, this.lasting / 40));

        this.timer = setTimeout(this.play.bind(this), 30);
    }

    private playRain(): void {
        if (this.active) {
            for (let i: number = 50 + Math.floor(Math.random() * 20); i < this.lasting * 5; i++) {
                this.RainBox.push(new Rain());
            }
        }

        if (Math.random() < 5e-3) {
            this.windNext = Math.random() * 0.016 - 0.008;
        }

        if (Math.abs(this.wind - this.windNext) >= 1e-4) {
            this.wind += (this.windNext - this.wind) * 0.02;
        }

        this.ctx!.strokeStyle = "rgb(215,219,234)";

        let newRainBox: Array<Rain> = [];
        
        this.RainBox.forEach((rain: Rain) => {
            this.ctx!.lineWidth = rain.width();
            this.ctx!.beginPath();
            this.ctx!.moveTo(rain.x * this.width, rain.y * this.height);
            rain.fall(this.wind);
            this.ctx!.lineTo(rain.x * this.width, rain.y * this.height);
            this.ctx!.stroke();
            rain.fall(this.wind);

            if (rain.y < 1) {
                newRainBox.push(rain);
            } else {
                // // 水花效果
                // const x: number = rain.x * this.width;
                // const y: number = this.height;
                // for (let i: number = 0; i < 80; i++) {
                //     this.ctx!.beginPath();
                //     this.ctx!.moveTo(x, y);
                //     this.ctx!.lineTo(
                //         x + Math.random() * 16 - 8,
                //         y - 12 - Math.random() * 16
                //     );
                //     this.ctx!.stroke();
                // }
            }
        });

        this.RainBox = newRainBox;
    }
};
