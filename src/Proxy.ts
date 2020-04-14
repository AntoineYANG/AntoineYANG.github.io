/*
 * @Author: Antoine YANG 
 * @Date: 2020-04-13 16:36:49 
 * @Last Modified by: Antoine YANG
 * @Last Modified time: 2020-04-14 17:08:45
 */

import $ from "jquery";

export type ElementVisibility = number;

interface ProxyInterface {
    isElementVisible: (e: JQuery<HTMLElement>) => ElementVisibility;
    callPanel: (a: boolean) => void;
};

export const Sys: ProxyInterface = {
    isElementVisible: (e: JQuery<HTMLElement>) => {
        const elementTop: number = e.offset()!.top;
        const elementHeight: number = e.height()!;
        const windowHeight: number = $(window).height()!;
        const pageHeight: number = $(document).height()!;
        const pageOffset: number = $(document).scrollTop()!;

        const covered: number = Math.max(
            0,
            Math.min(
                elementTop + elementHeight - pageOffset,
                windowHeight
            ) - Math.max(
                elementTop - pageOffset,
                0
            )
        );

        return covered / Math.min(pageHeight * 0.8, elementHeight);
    },
    callPanel: () => {}
};
