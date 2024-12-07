// @ts-ignore
import { For, createSignal, onMount, lazy } from "solid-js";
import html from "solid-js/html";

// @ts-ignore
import {observeAttribute} from "/externals/lib/dom.js";

// @ts-ignore
import {makeSelection} from "/externals/lib/interact.js";

//
import type { AppsType } from "@src/$core$/Types";
import { itemFields, itemForm } from "@src/$solid$/$maps$/Forms.tsx";
import { getItem, gridState, targetItem } from "../$state$/GridState";
import { refAndMount } from "@src/$core$/Utils";
import ItemEdit from "./workspace/ItemEdit.tsx";
import Items from "./workspace/Items";

// while: tab.component should be  ()=> html`...`
export const Workspace = ({tasks}: AppsType) => {
    const $element = refAndMount((topLevel)=> {
        //makeSelection(topLevel, "ui-shaped");
    });

    //
    return html`<div id="root" ref=${$element} data-scheme="accent" data-alpha="0">
        <!-- Workspace Icons -->
        <${Items} items=${()=>gridState.items} lists=${()=>gridState.lists}><//>

        <!-- Apps Part -->
        <${For} each=${() => tasks}>${(task) => {
            return html`<ui-frame data-scheme="solid" id=${task?.id.replace("#","")}>
            <div style="justify-self: start; text-align: start; padding-inline: 1rem;" slot="ui-title-bar">${task?.title}</div>  <${lazy(task?.component)}><//>
            </ui-frame>`;
        }}<//>

        <!-- -->
        <${ItemEdit}
            loadState=${()=>(targetItem)}
            confirmState=${(state, /*[_, k]*/p?: [any?, any?])=>{
                const item = getItem(state?.id)||{};
                if (state && item) {
                    if (!p) {
                        for (const k of itemFields) {
                            if (item[k] != state?.[k]) { item[k] = state?.[k] ?? item[k]; };
                        }
                    } else {
                        const k = p?.[1]; if (item[k] != state?.[k]) { item[k] = state?.[k] ?? item[k]; };
                    }
                }
            }}
            form=${()=>itemForm}
        ><//>

        <!-- Taskbar -->
        <ui-taskbar prop:tasks=${tasks}>

            <${For} each=${() => tasks}>${(task) => {
                return html`<ui-task prop:taskId=${task?.id} label=${task?.title} icon=${task?.icon}> <ui-icon icon=${task?.icon}></ui-icon> </ui-task>`;
            }}<//>

        </ui-taskbar>

        <!-- Navbar (Mobile Only) -->
        <ui-navbar></ui-navbar>

    </div>`;
};

//
export default Workspace;
