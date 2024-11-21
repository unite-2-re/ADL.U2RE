// @ts-ignore
import { For, createSignal, onMount  } from "solid-js";
import html from "solid-js/html";
import { lazy } from "solid-js";


// @ts-ignore
import {observeAttribute} from "/externals/lib/dom.js";

//
export interface TabType {
    component?: ()=>any;
    content: string;
    id: string;
};

//
export interface TabProps {
    tabs: TabType[];
}

//
const refAndMount = (cb)=>{
    return (element)=>{
        onMount(()=>cb(element));
    }
}

//
const observe = (val) => {
    return (el)=> {
        const [attr, setter] = val;
        observeAttribute(el, attr, (obs)=>setter(el.getAttribute(attr)));
    }
}

//
const logged = (fx)=>{
    return (...args)=>{
        console.log(...args);
        return fx(...args);
    }
}

//
const tabs: TabType[] = [
    //{id: "display", content: "Display"}
]

// while: tab.component should be  ()=> html`...`
export const Tabbed = (/*{tabs}: TabProps*/) => {
    const [currentTab, setTab] = createSignal("main");
    const $element = refAndMount((topLevel)=> {
        console.log(topLevel.querySelector("input"));
    });

    //
    return html`<div data-alpha="1" data-scheme="solid" class="ui-content" id="settings" ref=${$element} data-tab=${currentTab} ref=${observe(["data-tab", logged(setTab)])} style="display: inline grid; grid-template-columns: minmax(0px, 15rem) minmax(0px, 1fr); grid-template-rows: minmax(0px, 1fr);">
        <ui-scrollbox style="grid-column: 1 / 1 span; grid-row: 1 / 1 span; block-size: 100%; inline-size: 100%;">
            <div style="display: inline grid; grid-auto-rows: max-content; grid-template-columns: minmax(0px, max-content) minmax(0px, 1fr); block-size: 100%; inline-size: stretch; inline-size: -webkit-fill-available; inline-size: -moz-available;"><${For} each=${() => tabs}>${(tab) => {
                return html`<ui-listrow onChange=${(e)=>setTab(e.target.value)} value=${tab.id} checked=${currentTab == tab.id}> <ui-icon icon=${tab.icon} style="padding: 0.5rem; block-size: 2rem;"></ui-icon> <span>${tab.content as string}</span></ui-listrow>`
            }}<//></div>
        </ui-scrollbox>
        <ui-scrollbox style="grid-column: 2 / 2 span; grid-row: 1 / 1 span; block-size: 100%; inline-size: 100%;">
            <${For} each=${() => tabs}>${(tab) => {
                // too deceptive :/
                return currentTab == tab?.id ? lazy(tab?.component) : null;
            }}<//>
        </ui-scrollbox>
    </div>`;
};

//
export default Tabbed;
