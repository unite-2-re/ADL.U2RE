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
import { refAndMount } from "@/src/$solid$/Utils.tsx";
import { createLabel, createShaped } from "@src/$core$/Items.ts";

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

    // TODO! replace by orient-layer, and make it local
    return html`<div ref=${$element} class="u2-desktop-grid" style="inset: 0px; inset-block-end: auto; pointer-events: auto; contain: none; overflow: visible; container-type: normal; touch-action: none;">
        <ui-gridbox class="u2-grid-page" style="inline-size: 100%; block-size: 100%;" ref=${$labels}></ui-gridbox>    
        <ui-gridbox class="u2-grid-page" style="inline-size: 100%; block-size: 100%;" ref=${$shapes}></ui-gridbox>
    </div>`;
};

//
export default Items;
