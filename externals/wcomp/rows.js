const t=new WeakMap,e=(t,e)=>{if("computedStyleMap"in t){const i=t?.computedStyleMap();return i.get(e)?.value||0}{const i=getComputedStyle(t,"");return parseFloat(i.getPropertyValue(e)?.replace?.("px",""))||0}},i=URL.createObjectURL(new Blob(['@property --inset-block-start{syntax: "<length-percentage>"; initial-value: 0px; inherits: true;}@property --inset-inline-start{syntax: "<length-percentage>"; initial-value: 0px; inherits: true;}@layer u2-rows{div[is=u-rows],:host(div[is=u-rows]),:host{inline-size:100%;block-size:var(--block-size);min-block-size:100%;overflow:visible;padding:0;max-inline-size:100%;max-block-size:none;display:block flow;position:relative;container-type:size}div[is=u-rows]>*,div[is=u-rows] ::slotted(*),:host(div[is=u-rows])>*,:host(div[is=u-rows]) ::slotted(*),:host>*,:host ::slotted(*){inline-size:100%;position:absolute;inset:auto;inset-inline-start:var(--inset-inline-start, 0px);inset-block-start:var(--inset-block-start, 0px);will-change:left,top,inset-inline-start,inset-block-start,--inset-inline-start,--inset-block-start}div[is=u-rows][data-enable-transition=true]>*,:host(div[is=u-rows])[data-enable-transition=true]>*,:host[data-enable-transition=true]>*{transition-duration:.2s;transition-timing-function:linear;transition-property:--inset-inline-start,--inset-block-start}}'],{type:"text/css"}));class s extends HTMLDivElement{static observedAttributes=["data-direction"];connectedCallback(){this.dataset.enableTransition="false",this.#t()}constructor(){super();const s=document.createElement("style");s.innerHTML=`@import url("${i}");`,this?.shadowRoot?.appendChild?.(s),this.style.position="relative",((t,e,i,s)=>{const r=new Set((i.split(",")||[i]).map((t=>t.trim())));new MutationObserver(((t,i)=>{for(const i of t)if("childList"==i.type){const t=Array.from(i.addedNodes)||[],n=Array.from(i.removedNodes)||[];t.push(...Array.from(i.addedNodes||[]).flatMap((t=>Array.from(t?.querySelectorAll?.(e)||[])))),n.push(...Array.from(i.removedNodes||[]).flatMap((t=>Array.from(t?.querySelectorAll?.(e)||[])))),[...Array.from(new Set(t).values())].filter((t=>t?.matches?.(e))).forEach((t=>{r.forEach((e=>{s({target:t,type:"attributes",attributeName:e,oldValue:t?.getAttribute?.(e)})}))}))}else i.target?.matches?.(e)&&i.attributeName&&r.has(i.attributeName)&&s(i)})).observe(t,{attributeOldValue:1,childList:1,subtree:1,attributes:1,attributeFilter:[...r],characterData:1}),Array.from(t.querySelectorAll(e)).forEach((t=>{r.forEach((e=>{s({target:t,type:"attributes",attributeName:e,oldValue:t?.getAttribute?.(e)})}))}))})(document.documentElement,"*[data-hidden]","data-hidden",(t=>{const e=Array.from(t.target.querySelectorAll('*[is="u-rows"]'));e.length>0&&e.some((t=>t==this))&&t.oldValue!=t.target.dataset.hidden&&(this.dataset.enableTransition="false")})),this.addEventListener("u2-hidden",(()=>{this.#t()})),this.addEventListener("u2-appear",(()=>{this.#t()})),((t,e="*",i=(t,e)=>{})=>{const s=new MutationObserver(((t,s)=>{for(const r of t)if("childList"==r.type){const t=Array.from(r.addedNodes)||[],n=Array.from(r.removedNodes)||[];t.push(...Array.from(r.addedNodes||[]).flatMap((t=>Array.from(t?.querySelectorAll?.(e)||[])))),n.push(...Array.from(r.removedNodes||[]).flatMap((t=>Array.from(t?.querySelectorAll?.(e)||[]))));const a=[...Array.from(new Set(t).values())].filter((t=>t?.matches?.(e))),o=[...Array.from(new Set(n).values())].filter((t=>t?.matches?.(e)));(a.length>0||o.length>0)&&i?.({type:r.type,target:r.target,attributeName:r.attributeName,attributeNamespace:r.attributeNamespace,nextSibling:r.nextSibling,oldValue:r.oldValue,previousSibling:r.previousSibling,addedNodes:a,removedNodes:o},s)}}));s.observe(t,{childList:1,subtree:1});const r=Array.from(t.querySelectorAll(e));r.length>0&&i?.({addedNodes:r},s)})(this,"*",(t=>{this.#t()})),((i,s)=>{if(!t.has(i)){const r=[],n=new ResizeObserver((t=>{for(const e of t)if(e.contentBoxSize){const t=e.contentBoxSize[0];t&&r.forEach((e=>e?.(t,n)))}}));s?.((e(i,"padding-left"),e(i,"padding-right"),e(i,"padding-top"),e(i,"padding-bottom"))),t.set(i,r),n.observe(i,{box:"content-box"})}t.get(i)?.push(s)})(this,(t=>{this.#t()}))}#t(){const t=[],e=(this.dataset.gap?parseFloat(this.dataset.gap):0)||0;for(const e of this.children)t.push(e);let i=0;t.sort(((t,e)=>Math.sign((parseInt(t.dataset.order)||0)-(parseInt(e.dataset.order)||0)))).forEach(((t,s,r)=>{t.style.setProperty("--inset-block-start",i+"px"),i+=t.offsetHeight,r.length-1>s&&(i+=e)})),this.style.setProperty("--block-size",i+"px"),this.dataset.enableTransition="true"}}customElements.define("u-rows",s,{extends:"div"});{const t=document.createElement("link");t.rel="stylesheet",t.type="text/css",t.href=i,document.head.appendChild(t)}export{s as default};