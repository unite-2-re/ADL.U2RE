// @ts-ignore
import { For, createSignal, onMount, lazy } from "solid-js";
import { render } from "solid-js/web";
import html from "solid-js/html";
import type { AppsType } from "@src/$core$/Types";
import { itemFields, itemForm } from "@src/$solid$/$maps$/Forms.tsx";
import { getItem, gridState } from "../$state$/GridState";
import ItemEdit, {targetItem} from "./workspace/ItemEdit.tsx";
import Items from "./workspace/Items";

// @ts-ignore
import { observeAttribute } from "/externals/lib/dom.js";

// @ts-ignore
import { makeSelection } from "/externals/core/interact.js";

// while: tab.component should be  ()=> html`...`
export const Workspace = ({tasks}: AppsType) => {
    // TODO! Wrap "Apps" with zoomed layer (initial orientation)
    return html`<div id="root" data-scheme="accent" data-alpha="0">
        <!-- Workspace Icons -->
        <${Items} items=${()=>gridState.items} lists=${()=>gridState.lists}><//>

        <!-- UI-Scaled Layer -->
        <ui-orientbox id="ui-layer" class="ui-layer" orient="0">
            <!-- Apps Part -->
            <${For} each=${() => tasks}>${(task) => {
                return html`<ui-frame data-chroma="0.01" data-scheme="solid" id=${task?.id.replace("#","")}>
                <div style="justify-self: start; text-align: start; padding-inline: 1rem;" slot="ui-title-bar">${task?.title}</div>  <${  task?.component  }><//>
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

            <!-- Merge to UI layer context-menu (13.12.2024) -->
            <ui-modal type="contextmenu" id="contextmenu" style="display: inline grid; padding: 0.25rem; grid-template-columns: [icon] minmax(0px, 1.75rem) [content] minmax(0px, 1fr);"></ui-modal>

            <!-- Sentence 30.12.2024 -->
            <ui-modal type="popup" data-name="calendar">
                <ui-calendar></ui-calendar>
            </ui-modal>
        </ui-orientbox>

    </div>`;
};

//
export default Workspace;
export const renderInPage = (root: HTMLElement, tasks: any)=>{
    render(()=>html`<${Workspace} tasks=${tasks}><//>`, root);
}
