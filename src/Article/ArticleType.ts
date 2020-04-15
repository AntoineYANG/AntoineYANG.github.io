/*
 * @Author: Antoine YANG 
 * @Date: 2020-04-15 16:14:15 
 * @Last Modified by: Antoine YANG
 * @Last Modified time: 2020-04-15 17:45:52
 */

export type Article = {
    author: string;
    content: string;
    lastEdit: number;
    id: number;
    title: string;
    top: boolean;
    unixTime: number;
    viewed: number;
};
