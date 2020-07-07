/*
 * @Author: Antoine YANG 
 * @Date: 2020-04-13 18:08:15 
 * @Last Modified by: Antoine YANG
 * @Last Modified time: 2020-04-16 00:07:57
 */

import React, { Component } from 'react';
import { Container } from "../Contaniners/Container";
import { Article } from '../Article/ArticleType';
import '../App.css';
import { parseArticle } from '../Article/ArticleReader';
import axios, { AxiosResponse } from "axios";


export interface ListViewProps {};

export interface ListViewState {
    info: string | null;
    err: string | null;
    list: Array<Article>;
};


export class ListView extends Component<ListViewProps, ListViewState, {}> {
    protected page: number;
    protected sortBy: "lastEdit" | "unixTime" | "viewed";

    public constructor(props: ListViewProps) {
        super(props);
        this.state = {
            info: null,
            err: null,
            list: []
        };
        this.page = 1;
        this.sortBy = "lastEdit";
    }

    public render(): JSX.Element {
        if (this.state.err) {
            return (
                <Container mode="info"
                style={{
                    padding: "8vmin 10vmin 5vmin",
                    textAlign: "center",
                    color: "rgb(236,79,50)"
                }} >
                    <header style={{
                        fontSize: "calc(8px + 2.4vmin)",
                        fontWeight: "bold"
                    }} >
                        ERROR OCCURED
                    </header>
                    <br className="splitor" />
                    <br className="splitor" />
                    { this.state.err }
                    <br />
                </Container>
            );
        } else if (this.state.info) {
            return (
                <Container mode="info"
                style={{
                    padding: "8vmin 10vmin 3vmin",
                    textAlign: "center"
                }} >
                    <header style={{
                        fontSize: "calc(8px + 2.4vmin)",
                        fontWeight: "bold",
                        color: "rgb(157,193,215)"
                    }} >
                        { this.state.info }
                    </header>
                </Container>
            );
        } else {
            return (
                <>{
                    this.state.list.map((item: Article, i: number) => {
                        return (
                            <Container key={ i } mode={
                                item.top ? "info" : "text"
                            } allowSelect={ true }
                            style={{
                                padding: "6vmin 10vmin",
                                textAlign: "left"
                            }} >
                                <header style={{
                                    fontSize: "calc(8px + 2.4vmin)",
                                    fontWeight: "bold"
                                }} >
                                    { item.title }
                                </header>
                                <p className="author" >
                                    Author:
                                    <span>
                                        { " " + item.author }
                                    </span>
                                    <span className="views" >
                                        { item.viewed } views
                                    </span>
                                </p>
                                <hr className="splitor" />
                                { parseArticle(item.content) }
                                <br />
                                { (() => {
                                    const create: number = item.unixTime;
                                    const edit: number = item.lastEdit;
                                    if (create !== edit) {
                                        return (
                                            <>
                                            <p className="date unselectable" style={{
                                                marginBottom: "2px"
                                            }} >
                                                Blog Created<pre className="tab">     </pre>{
                                                (new Date(create)).toLocaleString()
                                            }</p>
                                            <p className="date unselectable" style={{
                                                marginTop: "2px"
                                            }} >
                                                Last modified<pre className="tab">    </pre>{
                                                (new Date(edit)).toLocaleString()
                                            }</p>
                                            </>
                                        );
                                    } else {
                                        return (
                                            <p className="date unselectable" >
                                                Blog Created<pre className="tab">     </pre>
                                                { (new Date(create)).toLocaleString() }
                                            </p>
                                        );
                                    }
                                })() }
                                <p className="date unselectable" >
                                </p>
                            </Container>
                        );
                    })
                }</>
            );
        }
    }

    public componentDidMount(): void {
        this.requestForArticles();
    }

    protected requestForArticles(): void {
        const p: Promise<
            AxiosResponse<Array<Article>>
        > = axios.get(`http://192.168.137.1:2020/na?page=${
            this.page
        }&sortBy=${
            this.sortBy
        }`);

        this.setState({
            info: "Loading...",
            err: null
        });

        p.then((res: AxiosResponse<Array<Article>>) => {
            this.setState({
                info: null,
                err: null,
                list: res.data
            });
        }).catch(() => {
            const p2: Promise<
                AxiosResponse<Array<Article>>
            > = axios.get(`https://192.168.137.1:20204/na?page=${
                this.page
            }&sortBy=${
                this.sortBy
            }`);

            this.setState({
                info: "Loading...",
                err: null
            });

            p2.then((res: AxiosResponse<Array<Article>>) => {
                this.setState({
                    info: null,
                    err: null,
                    list: res.data
                });
            }).catch((reason: any) => {
                this.setState({
                    info: null,
                    err: reason.toString()
                });
            });
        });
    }
}

export class RecentList extends ListView {
    public constructor(props: ListViewProps) {
        super(props);
        this.sortBy = "lastEdit";
    }
}

export class MostViewedList extends ListView {
    public constructor(props: ListViewProps) {
        super(props);
        this.sortBy = "viewed";
    }
}
