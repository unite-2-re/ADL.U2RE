//
export const createShaped = (item, gs)=>{
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
export const createLabel = (item, gs)=>{
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