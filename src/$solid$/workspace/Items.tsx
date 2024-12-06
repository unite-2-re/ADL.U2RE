// @ts-ignore
import { For, createSignal, onMount  } from "solid-js";
import html from "solid-js/html";

// @ts-ignore
import {observeAttribute} from "/externals/lib/dom.js";

// @ts-ignore
import {inflectInGrid} from "/externals/system/grid-system.js";

// @ts-ignore
import {makeSelection} from "/externals/lib/interact.js";

//
import type { ItemsType } from "@src/$core$/Types";
import { refAndMount } from "@src/$core$/Utils.ts";

//
const createShaped = (item, gs)=>{
    // if exists, skip
    const exists = gs?.querySelector?.(`.u2-grid-item[data-id=\"${item?.id}\"]`);
    if (exists || !item?.id) { return exists; };

    //
    const element: any = document.createElement("ui-shaped");
    element.classList.add("u2-grid-item");
    element.item = item;
    element.icon = item.icon || "";
    element.label = item.label || "";
    element.setAttribute("data-scheme", "solid");
    element.setAttribute("data-alpha", "0");
    element.setAttribute("data-chroma", "0.2");
    element.setAttribute("data-theme", "light");
    element.setAttribute("data-id", item.id || "");
    element.setAttribute("data-label", item.label || "");
    element.setAttribute("data-action", item.action || "");
    element.setAttribute("data-href", item.href || "");

    //
    const shape: any = document.createElement("div");
    shape.classList.add("u2-item-design");
    //shape.setAttribute("data-scheme", "solid");
    //shape.setAttribute("data-scheme", "dynamic-transparent");
    shape.setAttribute("data-shape", "wavy");
    shape.setAttribute("data-alpha", "1");
    shape.setAttribute("data-highlight", "4");
    shape.setAttribute("data-highlight-hover", "6");
    shape.setAttribute("data-chroma", "0.2");

    //
    element.append(shape);
    return element;
}

//
const createLabel = (item, gs)=>{
    // if exists, skip
    const exists = gs?.querySelector?.(`.u2-grid-item[data-id=\"${item?.id}\"]`);
    if (exists || !item?.id) { return exists; }

    //
    const element: any = document.createElement("span");
    element.classList.add("u2-grid-item");
    element.classList.add("u2-item-label");
    element.setAttribute("data-scheme", "accent");
    element.setAttribute("data-alpha", "0");
    element.setAttribute("data-transparent", "");
    element.setAttribute("data-label", item.label || "");
    element.label = item.label || "";
    element.innerHTML = item.label || "";
    return element;
}

// while: tab.component should be  ()=> html`...`
export const Items = ({items, lists}: ItemsType) => {
    const $element = refAndMount((topLevel)=> {
        makeSelection(topLevel, "ui-shaped");
    });

    //
    const $shapes = refAndMount((gridSet)=> {
        inflectInGrid(gridSet, items, lists?.[0] || [], createShaped);
    });

    //
    const $labels = refAndMount((gridSet)=> {
        inflectInGrid(gridSet, items, lists?.[0] || [], createLabel);
    });

    //
    return html`<div ref=${$element} class="u2-desktop-grid" style="inset: 0px; inset-block-end: auto; pointer-events: auto; contain: none; overflow: visible; container-type: normal; touch-action: none;">
        <ui-gridbox class="u2-grid-page" style="inline-size: 100%; block-size: 100%;" ref=${$labels}></ui-gridbox>    
        <ui-gridbox class="u2-grid-page" style="inline-size: 100%; block-size: 100%;" ref=${$shapes}></ui-gridbox>
    </div>`;
};

//
export default Items;
