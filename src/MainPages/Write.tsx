/*
 * @Author: Antoine YANG 
 * @Date: 2020-07-06 15:36:16 
 * @Last Modified by: Antoine YANG
 * @Last Modified time: 2020-07-07 19:29:15
 */

import React, { Component } from "react";
import $ from "jquery";
import { Container } from "../Contaniners/Container";


export class Write extends Component<{}, {}> {

    private textarea: React.RefObject<HTMLDivElement>;
    private board: React.RefObject<HTMLDivElement>;

    public constructor(props: {}) {
        super(props);
        this.textarea = React.createRef<HTMLDivElement>();
        this.board = React.createRef<HTMLDivElement>();
    }

    public render(): JSX.Element {
        return (
            <>
                <Container mode="text" >
                    <hr className="head" />
                    <div
                    style={{
                        display: "flex"
                    }} >
                        <div ref={ this.board }
                        style={{
                            display: "inline-block",
                            width: "46%",
                            padding: "1%",
                            margin: "6% 1%",
                            fontSize: "calc(12px + 1vmin)",
                            textAlign: "left",
                            minHeight: "4em",
                            overflowX: "scroll",
                            fontFamily: "operator mono, source code pro, MS Mincho, monospace !important"
                        }} />
                        <div ref={ this.textarea } contentEditable={ true }
                        style={{
                            display: "inline-block",
                            width: "46%",
                            padding: "1%",
                            margin: "6% 1%",
                            fontSize: "calc(12px + 1vmin)",
                            textAlign: "left",
                            minHeight: "4em",
                            overflowX: "scroll",
                            fontFamily: "operator mono, source code pro, MS Mincho, monospace !important",
                            backgroundColor: "rgba(75, 75, 75, 0.09)",
                            boxShadow: "calc(3px + 0.3vh) calc(2px + 0.2vh) calc(3px + 0.3vh) calc(0.4px + 0.1vh) #1A1B1D40"
                        }}
                        onInput={
                            (e: React.FormEvent<HTMLDivElement>) => {
                                const text: string = $(e.target).html()?.toString() || "";
                                let html: string = parseMarkdown(text);
                                $(this.board.current!).html(html);
                                $("code").each((_: number, e: HTMLElement) => {
                                    $(e).html(
                                        $(e).html().split(
                                            "<div>"
                                        ).join("").split("<br>").join("").split(
                                            "</div>"
                                        ).join("<br>")
                                    );
                                });
                            }
                        } />
                    </div>
                </Container>
            </>
        );
    }
    
};

const parseMarkdown = (text: string): string => {
    // console.log(text);
    
    let html: string = text.split("&nbsp;").join(" ");
    // .split(
    //     /&lt;/
    // ).join("<").split(/&gt;/).join(">").split(/\\</).join("&lt;").split(/\\>/).join("&gt;");

    html = html.split("<br></div>").join("</div>");

    if (!html) {
        return "";
    }

    while (html.includes("```")) {
        const html_r: string = html.replace("```", "<code style='display: block;'>");
        if (html_r.includes("```")) {
            html = html_r.replace("```", "</code>");
        } else {
            break;
        }
    }

    let lines: Array<string> = [];

    while (html.includes("<div>") && html.includes("</div>")) {
        if (html.startsWith("<div>")) {
            const end: number = html.indexOf("</div>");
            lines.push(...html.substring(5, end).split(/<br>/));
            html = html.substring(end + 6);
        } else {
            const start: number = html.indexOf("<div>");
            lines.push(...html.substring(0, start).split(/<br>/));
            html = html.substring(start);
        }
    }

    lines.push(...html.split(/<br>/));

    if (!lines) {
        return "";
    }

    let block: "plain" | "ul" | "ol" = "plain";

    let quote: number = 0;
    
    for (let i: number = 0; i < lines.length; i++) {
        // 单行代码块
        let codeInline: RegExpExecArray | null = /(?<!\\)`[^`]+(?<!\\)`/.exec(lines[i]);
        while (codeInline) {
            lines[i] = lines[i].replace(
                codeInline[0],
                `<code>${ codeInline[0].split(/`/)[1] }</code>`
            );

            codeInline = /(?<!\\)`[^`]+(?<!\\)`/.exec(lines[i]);
        }

        // 标题
        let titles: RegExpExecArray | null = /^(?<!\\)#{1,3} +[^\s]+/g.exec(lines[i]);
        if (titles) {
            const title: RegExpExecArray = /^(?<!\\)#{1,3} /g.exec(lines[i])!;
            const level: 1 | 2 | 3 = Math.min(title[0].length - 1, 3) as 1 | 2 | 3;
            lines[i] = lines[i].replace(
                /(?<!\\)#{1,3} /g,
                `<h${ level }>`
            ) + `</h${ level }><hr>`;

            if (i && lines[i].length) {
                if (block === "ol") {
                    lines[i - 1] += "</ol>";
                    block = "plain";
                } else if (block === "ul") {
                    lines[i - 1] += "</ul>";
                    block = "plain";
                }
            }

            continue;
        }

        // 无序列表
        let ul: RegExpExecArray | null = /^(?<!\\)[*+-] +[^\s]+/g.exec(lines[i]);
        if (ul) {
            if (block === "ol") {
                lines[i - 1] += "</ol>";
                lines[i] = "<ul style='padding-left: 1.2em;'>" + lines[i].replace(
                    /^(?<!\\)[*+-] /g,
                    `<li style="list-style-position: inside;">`
                ) + `</li>`;
                block = "ul";
            } else if (block === "plain") {
                lines[i] = "<ul style='padding-left: 1.2em;'>" + lines[i].replace(
                    /^(?<!\\)[*+-] /g,
                    `<li style="list-style-position: inside;">`
                ) + `</li>`;
                block = "ul";
            } else {
                lines[i] = lines[i].replace(
                    /^(?<!\\)[*+-] /g,
                    `<li style="list-style-position: inside;">`
                ) + `</li>`;
            }

            continue;
        }

        // 有序列表
        let ol: RegExpExecArray | null = /^(?<!\\)[0-9]+\. +[^\s]+/g.exec(lines[i]);
        if (ol) {
            if (block === "ol") {
                lines[i] = lines[i].replace(
                    /^(?<!\\)[0-9]+\. /g,
                    `<li style="list-style-position: inside;">`
                ) + `</li>`;
            } else if (block === "plain") {
                lines[i] = "<ol style='padding-left: 1.2em;'>" + lines[i].replace(
                    /^(?<!\\)[0-9]+\. /g,
                    `<li style="list-style-position: inside;">`
                ) + `</li>`;
                block = "ol";
            } else {
                lines[i - 1] += "</ul>";
                lines[i] = "<ol style='padding-left: 1.2em;'>" + lines[i].replace(
                    /^(?<!\\)[0-9]+\. /g,
                    `<li style="list-style-position: inside;">`
                ) + `</li>`;
                block = "ol";
            }

            continue;
        }
        
        if (i && lines[i].length) {
            if (block === "ol") {
                lines[i - 1] += "</ol>";
                block = "plain";
            } else if (block === "ul") {
                lines[i - 1] += "</ul>";
                block = "plain";
            }
        }

        // 引用
        let quoting: RegExpExecArray | null = /^(?<!\\)(>|&gt;)+ +/g.exec(lines[i]);
        if (quoting) {
            const title: RegExpExecArray = /^(?<!\\)(>|&gt;)+ /g.exec(lines[i])!;
            const level: number = title[0].split("&gt;").join(">").length - 1;
            while (level < quote) {
                quote -= 1;
                lines[i - 1] += "</blockquote>";
            }
            while (level > quote) {
                quote += 1;
                lines[i] = "<blockquote>" + lines[i];
            }
            if (level === quote) {
                lines[i] = (lines[i].replace(
                    /^(?<!\\)(>|&gt;)+ /g,
                    `<div>`
                ).replace(
                    /<blockquote>(?<!\\)(>|&gt;)+ /g,
                    `<blockquote><div>`
                ) + `</div>`).replace(
                    "<div></div>",
                    "<br>"
                );
            }
            continue;
        }

        while (0 < quote) {
            quote -= 1;
            lines[i - 1] += "</blockquote>";
        }

        quote = 0;
    }

    if (lines.length && lines[lines.length - 1].length) {
        if (block === "ol") {
            lines[lines.length - 1] += "</ol>";
            block = "plain";
        } else if (block === "ul") {
            lines[lines.length - 1] += "</ul>";
            block = "plain";
        }
    }

    while (lines.length && 0 < quote) {
        quote -= 1;
        lines[lines.length - 1] += "</blockquote>";
    }

    quote = 0;

    let isCode: boolean = false;

    for (let i: number = 0; i < lines.length; i++) {
        if (lines[i].includes("<code ")) {
            isCode = true;
        } else if (lines[i].includes("</code>")) {
            isCode = false;
            continue;
        }

        if (isCode) {
            continue;
        }

        // 行内式图片
        let imgInline: RegExpExecArray | null = /\!\[[^\]]*(?<!\\)\]\([^\)]*[^\s\)]+[^\)]*(?<!\\)\)/g.exec(lines[i]);
        while (imgInline) {
            const s: string = imgInline[0];
            const text: string = /\!\[[^\]]*(?<!\\)\]/.exec(s)![0].split(/\[|\]/)[1];
            let url: string = /\([^\)]*[^\s\)]+[^\)]*(?<!\\)\)/.exec(s)![0].split(/\(|\)/)[1];

            if (!url.includes("//")) {
                url = "//" + url;
            }

            lines[i] = lines[i].replace(
                s,
                `<img src="${ url }" alt="${ text }" title="${ text }" />`
            );

            imgInline = /\!\[[^\]]*(?<!\\)\]\([^\)]*[^\s\)]+[^\)]*(?<!\\)\)/g.exec(lines[i]);
        }

        // 行内式链接
        let aInline: RegExpExecArray | null = /(?<!\\)\[[^\]]*[^\s\]]+[^\]]*(?<!\\)\]\([^\)]*[^\s\)]+[^\)]*(?<!\\)\)/g.exec(lines[i]);
        while (aInline) {
            const s: string = aInline[0];
            const text: string = /(?<!\\)\[[^\]]*[^\s\]]+[^\]]*(?<!\\)\]/.exec(s)![0].split(/\[|\]/)[1];
            let url: string = /\([^\)]*[^\s\)]+[^\)]*(?<!\\)\)/.exec(s)![0].split(/\(|\)/)[1];

            if (!url.includes("//")) {
                url = "//" + url;
            }

            lines[i] = lines[i].replace(
                s,
                `<a href="${ url }">${ text }</a>`
            );

            aInline = /(?<!\\)\[[^\]]*[^\s\]]+[^\]]*(?<!\\)\]\([^\)]*[^\s\)]+[^\)]*(?<!\\)\)/g.exec(lines[i]);
        }

        // 重复空格
        let blanks: RegExpExecArray | null = /  +/g.exec(lines[i]);
        while (blanks) {
            const s: string = blanks[0];

            lines[i] = lines[i].replace(s, " " + "&nbsp;".repeat(s.length - 1));

            blanks = /  +/g.exec(lines[i]);
        }
    }

    // console.log(lines);

    return lines.map(s => s.startsWith("<") ? s : `<div>${ s || "<br>" }</div>`).join("");
};
