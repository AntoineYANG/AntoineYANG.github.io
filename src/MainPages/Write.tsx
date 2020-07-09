/*
 * @Author: Antoine YANG 
 * @Date: 2020-07-06 15:36:16 
 * @Last Modified by: Antoine YANG
 * @Last Modified time: 2020-07-08 18:32:49
 */

import React, { Component } from "react";
import $ from "jquery";
import { Container } from "../Contaniners/Container";


export class Write extends Component<{}, {}> {

    private textarea: React.RefObject<HTMLTextAreaElement>;
    private board: React.RefObject<HTMLDivElement>;

    public constructor(props: {}) {
        super(props);
        this.textarea = React.createRef<HTMLTextAreaElement>();
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
                            fontSize: "calc(9px + 1vmin)",
                            textAlign: "left",
                            minHeight: "4em",
                            overflowX: "scroll",
                            whiteSpace: "pre",
                            fontFamily: "operator mono, source code pro, MS Mincho, monospace !important"
                        }} />
                        {/* <div ref={ this.textarea } contentEditable={ true } */}
                        <textarea ref={ this.textarea }
                        // contentEditable={ true }
                        style={{
                            display: "inline-block",
                            width: "46%",
                            padding: "1%",
                            margin: "6% 1%",
                            fontSize: "calc(9px + 1vmin)",
                            resize: "none",
                            textAlign: "left",
                            minHeight: "4em",
                            overflowX: "scroll",
                            fontFamily: "operator mono, source code pro, MS Mincho, monospace !important",
                            backgroundColor: "rgba(75, 75, 75, 0.09)",
                            boxShadow: "calc(3px + 0.3vh) calc(2px + 0.2vh) calc(3px + 0.3vh) calc(0.4px + 0.1vh) #1A1B1D40"
                        }}
                        onInput={
                            (e: React.FormEvent<HTMLTextAreaElement>) => {
                                const text: string = $(e.target).val()?.toString() || "";
                                let html: string = parseMarkdown(text);
                                $(this.board.current!).html(html);
                                $("code").each((_: number, e: HTMLElement) => {
                                    const language: string | undefined = e.classList[1];
                                    if (language && $(e).html()) {
                                        $(e).html(
                                            highlightCode($(e).html(), language)
                                        );
                                    }
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
    
    let html: string = text.split("&nbsp;").join(" ").split(/</).join("&lt;");
    // .split(
    //     /&lt;/
    // ).join("<").split(/&gt;/).join(">").split(/\\</).join("&lt;").split(/\\>/).join("&gt;");

    if (!html) {
        return "";
    }

    while (html.includes("```")) {
        const html_c: RegExpExecArray = /```.*\n?/.exec(html)!;
        const hl: Array<string> = html_c[0].replace("```", "").split(/\s/).filter(s => s);
        const language: string = hl.length ? hl[0] : "plain";
        const html_r: string = html.replace(
            html_c[0],
            `<code class='selectable ${ language }' style='display: block;'>`
        );
        if (html_r.includes("```")) {
            html = html_r.replace("```", "</code>");
        } else {
            break;
        }
    }

    let lines: Array<string> = html.split("\n");

    // console.log(lines);

    if (!lines) {
        return "";
    }

    let isCode: boolean = false;

    let block: "plain" | "ul" | "ol" = "plain";

    let quote: number = 0;
    
    for (let i: number = 0; i < lines.length; i++) {
        if (lines[i].includes("<code class='selectable' ")) {
            isCode = true;
        } else if (lines[i].includes("</code>")) {
            isCode = false;
            continue;
        }

        if (isCode) {
            continue;
        }

        // 单行代码块
        let codeInline: RegExpExecArray | null = /(?<!\\)`[^`]+(?<!\\)`/.exec(lines[i]);
        while (codeInline) {
            lines[i] = lines[i].replace(
                codeInline[0],
                `<code class='selectable'>${ codeInline[0].split(/`/)[1] }</code>`
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

    isCode = false;

    for (let i: number = 0; i < lines.length; i++) {
        lines[i] = lines[i].replace("> ", ">&nbsp;").replace(" <", "&nbsp;<");

        if (lines[i].includes("<code class='selectable' ")) {
            isCode = true;
        } else if (lines[i].includes("</code>")) {
            isCode = false;
            // 重复空格
            let blanks: RegExpExecArray | null = /  +/g.exec(lines[i]);
            while (blanks) {
                const s: string = blanks[0];

                lines[i] = lines[i].replace(s, " " + "&nbsp;".repeat(s.length - 1));

                blanks = /  +/g.exec(lines[i]);
            }
            continue;
        }

        if (isCode) {
            // 重复空格
            let blanks: RegExpExecArray | null = /  +/g.exec(lines[i]);
            while (blanks) {
                const s: string = blanks[0];

                lines[i] = lines[i].replace(s, " " + "&nbsp;".repeat(s.length - 1));

                blanks = /  +/g.exec(lines[i]);
            }
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

    return lines.map(s => `${ s || "" }`).join("\n");
};

const highlightCode = (text: string, lang: string) => {
    if (lang === "python") {
        // 关键字
        let reservedWords: Array<string> = /\b(as|assert|break|continue|del|elif|else|except|finally|for|from|if|import|pass|raise|return|try|while|with|yield)\b(?!\<)/.exec(text) || [];
        while (reservedWords.length) {
            text = text.replace(
                new RegExp("\\b" + reservedWords[0] + "\\b(?!\\<)"),
                "<span style='color: #9A79AD;'>" + reservedWords[0] + "</span>"
            );
            reservedWords = /\b(as|assert|break|continue|del|elif|else|except|finally|for|from|if|import|pass|raise|return|try|while|with|yield)\b(?!\<)/.exec(text) || [];
        }

        reservedWords = /\b(False|None|True|and|class|def|global|in|is|lambda|nonlocal|not|or)\b(?!\<)/.exec(text) || [];
        while (reservedWords.length) {
            text = text.replace(
                new RegExp("\\b" + reservedWords[0] + "\\b(?!\\<)"),
                "<span style='color: #428BC1;'>" + reservedWords[0] + "</span>"
            );
            reservedWords = /\b(False|None|and|class|True|def|global|in|is|lambda|nonlocal|not|or)\b(?!\<)/.exec(text) || [];
        }

        // 数字
        let numbers: Array<string> = /\b[0-9]+(\.[0-9])?[0-9]*(e[+-]?[0-9]+(\.[0-9])?[0-9])?\b(?!\<)/.exec(text) || [];
        while (numbers.length) {
            text = text.replace(
                new RegExp("\\b" + numbers[0] + "\\b(?!\\<)"),
                "<span style='color: #709871;'>" + numbers[0] + "</span>"
            );
            numbers = /\b[0-9]+(\.[0-9])?[0-9]*(e[+-]?[0-9]+(\.[0-9])?[0-9])?\b(?!\<)/.exec(text) || [];
        }
        
        // // 字符串
        // let strings: Array<string> = /("((?!((?!\\)")).*)?"|'((?!((?!\\)')).*)?')(?!\<)/.exec(text) || [];
        // while (strings.length) {
        //     console.log(strings);
        //     text = text.replace(
        //         new RegExp(strings[0] + "(?!\\<)"),
        //         "<span style='color: #A7552F;'>" + strings[0] + "</span>"
        //     );
        //     strings = /(?!style\=)("((?!((?!\\)")).*)?"|'((?!((?!\\)')).*)?')(?!\<)/.exec(text) || [];
        //     console.log("->", strings);
        //     break;
        // }

        // 函数
        let funcs: Array<string> = /\b[_|a-z|A-Z][_|a-z|A-Z|0-9]*\b\s*\(/.exec(text) || [];
        while (funcs.length) {
            const parts: Array<string> = funcs[0].split(/\s|\(/);
            text = text.replace(
                new RegExp("\\b" + parts[0] + "\\b(?!\\<)"),
                "<span style='color: #9F9F1E;'>" + parts[0] + "</span>"
            );
            funcs = /\b[_|a-z|A-Z][_|a-z|A-Z|0-9]*\b\s*\(/.exec(text) || [];
        }
    }

    return text;
};
