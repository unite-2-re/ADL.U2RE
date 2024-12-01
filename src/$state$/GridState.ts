// @ts-ignore /* @vite-ignore */
import {subscribe, makeReactive, makeObjectAssignable, safe } from "/externals/lib/object.js";
import {JSOX} from "jsox";

// @ts-ignore
import { createSignal } from "solid-js";

//
export const [targetItem, setTargetItem] = createSignal(null);
export const defaultLists = [["github", "youtube", "settings"]];
export const defaultItems = [
    {
        id: "github",
        icon: "github",
        label: "GitHub",
        cell: [0, 0]
    },
    {
        id: "youtube",
        icon: "youtube",
        label: "YouTube",
        cell: [1, 0]
    },
    {
        id: "settings",
        icon: "settings",
        label: "Settings",
        cell: [2, 0]
    }
]

//
export const wrapItemToReactive = (item: any)=>{
    return makeObjectAssignable(makeReactive({
        ...item,
        cell: makeReactive(item?.cell || [0, 0])
    }));
}

//
export const unwrap = (items: any[]|Set<any>)=>{
    return safe(items);
}



//
export const mergeByKey = (items: any[]|Set<any>, key = "id")=>{
    const entries = Array.from(items?.values?.()).map((I)=>[I?.[key],I]);
    const map = new Map(entries as any);
    return Array.from(map?.values?.() || []);
}


//
export const gridState = makeObjectAssignable(makeReactive({
    items: makeObjectAssignable(makeReactive(new Set(mergeByKey([...defaultItems, ...Array.from(JSOX.parse(localStorage.getItem("grids@items") || "[]")?.values?.() || [])]).map((I)=>wrapItemToReactive(I))))),
    lists: makeObjectAssignable(makeReactive(new Set([...Array.from(JSOX.parse(localStorage.getItem("grids@lists") || JSOX.stringify(defaultLists))?.values?.() || defaultLists)])))
}));

//
export const saveToStorage = (ev?: any)=>{
    localStorage.setItem("grids@items", JSOX.stringify(unwrap(Array.from(gridState.items?.values?.() || []))));
    localStorage.setItem("grids@lists", JSOX.stringify(unwrap(Array.from(gridState.lists?.values?.() || []))));
}

//
export const getItem = (id)=>{
    return Array.from(gridState.items.values()).find((item: any)=>item?.id == (id?.id || id));
}

// ideal scenario for protect from ban avoid...
// why? because after clear cache, memory process still remain
// you can pass ban-system only if you block such events, or if you clear store in out of process
addEventListener("beforeunload", saveToStorage);
addEventListener("pagehide", saveToStorage);

//
document.addEventListener("visibilitychange", (ev)=>{
    if (document.visibilityState === "hidden") {
        saveToStorage(ev);
    }
});

//
addEventListener("storage", (ev)=>{
    if (ev.storageArea == localStorage) {
        if (ev.key == "grids@items") { gridState.items = new Set(mergeByKey([...defaultItems, ...Array.from(JSOX.parse(ev.newValue || "[]")?.values?.() || [])]).map((I)=>wrapItemToReactive(I))); };
        if (ev.key == "grids@lists") { gridState.lists = new Set([...Array.from(JSOX.parse(ev.newValue || JSOX.stringify(defaultLists))?.values?.() || defaultLists)]); };
    }
});
