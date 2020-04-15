/*
 * @Author: Antoine YANG 
 * @Date: 2020-04-15 16:22:40 
 * @Last Modified by: Antoine YANG
 * @Last Modified time: 2020-04-15 22:11:26
 */

import React from "react";
import $ from "jquery";


export const ValidTags = {
    b: true,
    code: true,
    h1: true,
    h2: true,
    h3: true,
    h4: true,
    i: true,
    p: true,
    span: true,
    strong: true
};


export const isValidTag = (tag: string) => {
    return ValidTags.hasOwnProperty(tag);
};

export const parseXml = (xml: Element) => {
    if (!xml) {
        return "";
    }
    const tag: string = xml.tagName;
    if (isValidTag(tag)) {
        let children: Array<string | React.DOMElement<{}, Element>> = [];
        const childNodes: HTMLCollection = xml.children;
        let index: number = 0;
        xml.childNodes.forEach((node: ChildNode) => {
            if (node.nodeName === "#text") {
                children.push(node.nodeValue!);
            } else {
                children.push(parseXml(childNodes.item(index++)!));
            }
        });
        let element = React.createElement(tag, {}, ...children);

        return element;
    } else if (tag === "doc") {
        let children: Array<string | React.DOMElement<{}, Element>> = [];
        const childNodes: HTMLCollection = xml.children;
        for (let i: number = 0; i < childNodes.length; i++) {
            children.push(parseXml(childNodes.item(i)!));
        }
        let element = React.createElement("article", {
            className: "doc"
        }, ...children);

        return element;
    }

    return xml.outerHTML;
};


export const parseArticle: (content: string) => JSX.Element = (
    (content: string) => {
        const doc: Element = $.parseXML(
            "<?xml version='1.0' encoding='utf-8'?><doc>" + content + "</doc>"
        ).getElementsByTagName("doc").item(0)!;

        return parseXml(doc) as JSX.Element;
    }
);
