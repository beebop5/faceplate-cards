var ce=Object.defineProperty;var si=Object.getOwnPropertyDescriptor;var k=(o,i)=>()=>(o&&(i=o(o=0)),i);var ai=(o,i)=>{for(var t in i)ce(o,t,{get:i[t],enumerable:!0})};var d=(o,i,t,e)=>{for(var n=e>1?void 0:e?si(i,t):i,s=o.length-1,a;s>=0;s--)(a=o[s])&&(n=(e?a(i,t,n):a(n))||n);return e&&n&&ce(i,t,n),n};function qt(o){let i=o.toLowerCase();return i.includes("auto")?"mdi:fan-auto":i==="off"?"mdi:fan-off":/(quiet|silent|sleep|night)/.test(i)?"mdi:fan-minus":/(low|min|1)/.test(i)?"mdi:fan-speed-1":/(mid|med|2)/.test(i)?"mdi:fan-speed-2":/(high|3)/.test(i)?"mdi:fan-speed-3":/(max|top|turbo|strong|4|5)/.test(i)?"mdi:fan-plus":"mdi:fan"}function pe(o){let i=o.trim();return/^\d+$/.test(i)?i:/^auto(matic)?$/i.test(i)?"auto":null}function xt(o,i){let t=o.toLowerCase();return/(off|stop|fix)/.test(t)?i?"mdi:pan-horizontal":"mdi:pan-vertical":/(on|swing|both|all|auto|oscillat|full|range)/.test(t)?i?"mdi:swap-horizontal":"mdi:swap-vertical":i?/left/.test(t)?"mdi:arrow-left":/right/.test(t)?"mdi:arrow-right":/(mid|cent)/.test(t)?"mdi:arrow-split-vertical":"mdi:swap-horizontal":/(highest|top|up)/.test(t)?"mdi:arrow-up":/(lowest|bottom|down|low)/.test(t)?"mdi:arrow-down":/(mid|cent|horiz)/.test(t)?"mdi:arrow-split-horizontal":/high/.test(t)?"mdi:arrow-top-right":"mdi:swap-vertical"}function he(o){let i=o.toLowerCase();return/both|all/.test(i)?"mdi:arrow-all":/horiz/.test(i)?"mdi:swap-horizontal":/vert/.test(i)?"mdi:swap-vertical":/off|stop|fix/.test(i)?"mdi:arrow-oscillating-off":"mdi:arrow-oscillating"}function L(o){return o.replace(/[_-]+/g," ").replace(/\b\w/g,i=>i.toUpperCase())}function Vt(o){return/^auto/i.test(o.replace(/[_\s-]+/g,""))?"":L(o)}var yt,vt,Ut,pt,X,$t=k(()=>{"use strict";yt="faceplate-climate-card",vt="faceplate-climate-card-editor",Ut=["off","auto","heat_cool","heat","cool","dry","fan_only"],pt={auto:"mdi:thermostat-auto",heat_cool:"mdi:sun-snowflake-variant",heat:"mdi:fire",cool:"mdi:snowflake",dry:"mdi:water-percent",fan_only:"mdi:fan",off:"mdi:power"},X={auto:"var(--state-climate-auto-color, #008e6d)",heat_cool:"var(--state-climate-heat_cool-color, #008e6d)",heat:"var(--state-climate-heat-color, #ff8100)",cool:"var(--state-climate-cool-color, #2196f3)",dry:"var(--state-climate-dry-color, #efbd07)",fan_only:"var(--state-climate-fan_only-color, #009688)",off:"var(--state-climate-off-color, var(--disabled-text-color, #9e9e9e))"}});var kt,At,Wt,de,ht,ue,g,me,Kt,Gt=k(()=>{kt=globalThis,At=kt.ShadowRoot&&(kt.ShadyCSS===void 0||kt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Wt=Symbol(),de=new WeakMap,ht=class{constructor(i,t,e){if(this._$cssResult$=!0,e!==Wt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=i,this.t=t}get styleSheet(){let i=this.o,t=this.t;if(At&&i===void 0){let e=t!==void 0&&t.length===1;e&&(i=de.get(t)),i===void 0&&((this.o=i=new CSSStyleSheet).replaceSync(this.cssText),e&&de.set(t,i))}return i}toString(){return this.cssText}},ue=o=>new ht(typeof o=="string"?o:o+"",void 0,Wt),g=(o,...i)=>{let t=o.length===1?o[0]:i.reduce((e,n,s)=>e+(a=>{if(a._$cssResult$===!0)return a.cssText;if(typeof a=="number")return a;throw Error("Value passed to 'css' function must be a 'css' function result: "+a+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+o[s+1],o[0]);return new ht(t,o,Wt)},me=(o,i)=>{if(At)o.adoptedStyleSheets=i.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of i){let e=document.createElement("style"),n=kt.litNonce;n!==void 0&&e.setAttribute("nonce",n),e.textContent=t.cssText,o.appendChild(e)}},Kt=At?o=>o:o=>o instanceof CSSStyleSheet?(i=>{let t="";for(let e of i.cssRules)t+=e.cssText;return ue(t)})(o):o});var li,ci,pi,hi,di,ui,St,fe,mi,fi,dt,ut,Et,ge,D,mt=k(()=>{Gt();Gt();({is:li,defineProperty:ci,getOwnPropertyDescriptor:pi,getOwnPropertyNames:hi,getOwnPropertySymbols:di,getPrototypeOf:ui}=Object),St=globalThis,fe=St.trustedTypes,mi=fe?fe.emptyScript:"",fi=St.reactiveElementPolyfillSupport,dt=(o,i)=>o,ut={toAttribute(o,i){switch(i){case Boolean:o=o?mi:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,i){let t=o;switch(i){case Boolean:t=o!==null;break;case Number:t=o===null?null:Number(o);break;case Object:case Array:try{t=JSON.parse(o)}catch{t=null}}return t}},Et=(o,i)=>!li(o,i),ge={attribute:!0,type:String,converter:ut,reflect:!1,useDefault:!1,hasChanged:Et};Symbol.metadata??=Symbol("metadata"),St.litPropertyMetadata??=new WeakMap;D=class extends HTMLElement{static addInitializer(i){this._$Ei(),(this.l??=[]).push(i)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(i,t=ge){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(i)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(i,t),!t.noAccessor){let e=Symbol(),n=this.getPropertyDescriptor(i,e,t);n!==void 0&&ci(this.prototype,i,n)}}static getPropertyDescriptor(i,t,e){let{get:n,set:s}=pi(this.prototype,i)??{get(){return this[t]},set(a){this[t]=a}};return{get:n,set(a){let l=n?.call(this);s?.call(this,a),this.requestUpdate(i,l,e)},configurable:!0,enumerable:!0}}static getPropertyOptions(i){return this.elementProperties.get(i)??ge}static _$Ei(){if(this.hasOwnProperty(dt("elementProperties")))return;let i=ui(this);i.finalize(),i.l!==void 0&&(this.l=[...i.l]),this.elementProperties=new Map(i.elementProperties)}static finalize(){if(this.hasOwnProperty(dt("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(dt("properties"))){let t=this.properties,e=[...hi(t),...di(t)];for(let n of e)this.createProperty(n,t[n])}let i=this[Symbol.metadata];if(i!==null){let t=litPropertyMetadata.get(i);if(t!==void 0)for(let[e,n]of t)this.elementProperties.set(e,n)}this._$Eh=new Map;for(let[t,e]of this.elementProperties){let n=this._$Eu(t,e);n!==void 0&&this._$Eh.set(n,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(i){let t=[];if(Array.isArray(i)){let e=new Set(i.flat(1/0).reverse());for(let n of e)t.unshift(Kt(n))}else i!==void 0&&t.push(Kt(i));return t}static _$Eu(i,t){let e=t.attribute;return e===!1?void 0:typeof e=="string"?e:typeof i=="string"?i.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(i=>this.enableUpdating=i),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(i=>i(this))}addController(i){(this._$EO??=new Set).add(i),this.renderRoot!==void 0&&this.isConnected&&i.hostConnected?.()}removeController(i){this._$EO?.delete(i)}_$E_(){let i=new Map,t=this.constructor.elementProperties;for(let e of t.keys())this.hasOwnProperty(e)&&(i.set(e,this[e]),delete this[e]);i.size>0&&(this._$Ep=i)}createRenderRoot(){let i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return me(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(i=>i.hostConnected?.())}enableUpdating(i){}disconnectedCallback(){this._$EO?.forEach(i=>i.hostDisconnected?.())}attributeChangedCallback(i,t,e){this._$AK(i,e)}_$ET(i,t){let e=this.constructor.elementProperties.get(i),n=this.constructor._$Eu(i,e);if(n!==void 0&&e.reflect===!0){let s=(e.converter?.toAttribute!==void 0?e.converter:ut).toAttribute(t,e.type);this._$Em=i,s==null?this.removeAttribute(n):this.setAttribute(n,s),this._$Em=null}}_$AK(i,t){let e=this.constructor,n=e._$Eh.get(i);if(n!==void 0&&this._$Em!==n){let s=e.getPropertyOptions(n),a=typeof s.converter=="function"?{fromAttribute:s.converter}:s.converter?.fromAttribute!==void 0?s.converter:ut;this._$Em=n;let l=a.fromAttribute(t,s.type);this[n]=l??this._$Ej?.get(n)??l,this._$Em=null}}requestUpdate(i,t,e,n=!1,s){if(i!==void 0){let a=this.constructor;if(n===!1&&(s=this[i]),e??=a.getPropertyOptions(i),!((e.hasChanged??Et)(s,t)||e.useDefault&&e.reflect&&s===this._$Ej?.get(i)&&!this.hasAttribute(a._$Eu(i,e))))return;this.C(i,t,e)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(i,t,{useDefault:e,reflect:n,wrapped:s},a){e&&!(this._$Ej??=new Map).has(i)&&(this._$Ej.set(i,a??t??this[i]),s!==!0||a!==void 0)||(this._$AL.has(i)||(this.hasUpdated||e||(t=void 0),this._$AL.set(i,t)),n===!0&&this._$Em!==i&&(this._$Eq??=new Set).add(i))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let i=this.scheduleUpdate();return i!=null&&await i,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[n,s]of this._$Ep)this[n]=s;this._$Ep=void 0}let e=this.constructor.elementProperties;if(e.size>0)for(let[n,s]of e){let{wrapped:a}=s,l=this[n];a!==!0||this._$AL.has(n)||l===void 0||this.C(n,void 0,s,l)}}let i=!1,t=this._$AL;try{i=this.shouldUpdate(t),i?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(e){throw i=!1,this._$EM(),e}i&&this._$AE(t)}willUpdate(i){}_$AE(i){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(i)),this.updated(i)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(i){return!0}update(i){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(i){}firstUpdated(i){}};D.elementStyles=[],D.shadowRootOptions={mode:"open"},D[dt("elementProperties")]=new Map,D[dt("finalized")]=new Map,fi?.({ReactiveElement:D}),(St.reactiveElementVersions??=[]).push("2.1.2")});function Ee(o,i){if(!ie(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return be!==void 0?be.createHTML(i):i}function Z(o,i,t=o,e){if(i===O)return i;let n=e!==void 0?t._$Co?.[e]:t._$Cl,s=_t(i)?void 0:i._$litDirective$;return n?.constructor!==s&&(n?._$AO?.(!1),s===void 0?n=void 0:(n=new s(o),n._$AT(o,t,e)),e!==void 0?(t._$Co??=[])[e]=n:t._$Cl=n),n!==void 0&&(i=Z(o,n._$AS(o,i.values),n,e)),i}var ee,_e,Tt,be,ke,F,Ae,gi,W,gt,_t,ie,_i,Yt,ft,we,ye,q,ve,xe,Se,ne,r,Gi,Yi,O,p,$e,V,bi,bt,Xt,wt,J,Zt,Jt,Qt,te,wi,Te,Q=k(()=>{ee=globalThis,_e=o=>o,Tt=ee.trustedTypes,be=Tt?Tt.createPolicy("lit-html",{createHTML:o=>o}):void 0,ke="$lit$",F=`lit$${Math.random().toFixed(9).slice(2)}$`,Ae="?"+F,gi=`<${Ae}>`,W=document,gt=()=>W.createComment(""),_t=o=>o===null||typeof o!="object"&&typeof o!="function",ie=Array.isArray,_i=o=>ie(o)||typeof o?.[Symbol.iterator]=="function",Yt=`[ 	
\f\r]`,ft=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,we=/-->/g,ye=/>/g,q=RegExp(`>|${Yt}(?:([^\\s"'>=/]+)(${Yt}*=${Yt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ve=/'/g,xe=/"/g,Se=/^(?:script|style|textarea|title)$/i,ne=o=>(i,...t)=>({_$litType$:o,strings:i,values:t}),r=ne(1),Gi=ne(2),Yi=ne(3),O=Symbol.for("lit-noChange"),p=Symbol.for("lit-nothing"),$e=new WeakMap,V=W.createTreeWalker(W,129);bi=(o,i)=>{let t=o.length-1,e=[],n,s=i===2?"<svg>":i===3?"<math>":"",a=ft;for(let l=0;l<t;l++){let c=o[l],u,h,m=-1,b=0;for(;b<c.length&&(a.lastIndex=b,h=a.exec(c),h!==null);)b=a.lastIndex,a===ft?h[1]==="!--"?a=we:h[1]!==void 0?a=ye:h[2]!==void 0?(Se.test(h[2])&&(n=RegExp("</"+h[2],"g")),a=q):h[3]!==void 0&&(a=q):a===q?h[0]===">"?(a=n??ft,m=-1):h[1]===void 0?m=-2:(m=a.lastIndex-h[2].length,u=h[1],a=h[3]===void 0?q:h[3]==='"'?xe:ve):a===xe||a===ve?a=q:a===we||a===ye?a=ft:(a=q,n=void 0);let w=a===q&&o[l+1].startsWith("/>")?" ":"";s+=a===ft?c+gi:m>=0?(e.push(u),c.slice(0,m)+ke+c.slice(m)+F+w):c+F+(m===-2?l:w)}return[Ee(o,s+(o[t]||"<?>")+(i===2?"</svg>":i===3?"</math>":"")),e]},bt=class o{constructor({strings:i,_$litType$:t},e){let n;this.parts=[];let s=0,a=0,l=i.length-1,c=this.parts,[u,h]=bi(i,t);if(this.el=o.createElement(u,e),V.currentNode=this.el.content,t===2||t===3){let m=this.el.content.firstChild;m.replaceWith(...m.childNodes)}for(;(n=V.nextNode())!==null&&c.length<l;){if(n.nodeType===1){if(n.hasAttributes())for(let m of n.getAttributeNames())if(m.endsWith(ke)){let b=h[a++],w=n.getAttribute(m).split(F),R=/([.?@])?(.*)/.exec(b);c.push({type:1,index:s,name:R[2],strings:w,ctor:R[1]==="."?Zt:R[1]==="?"?Jt:R[1]==="@"?Qt:J}),n.removeAttribute(m)}else m.startsWith(F)&&(c.push({type:6,index:s}),n.removeAttribute(m));if(Se.test(n.tagName)){let m=n.textContent.split(F),b=m.length-1;if(b>0){n.textContent=Tt?Tt.emptyScript:"";for(let w=0;w<b;w++)n.append(m[w],gt()),V.nextNode(),c.push({type:2,index:++s});n.append(m[b],gt())}}}else if(n.nodeType===8)if(n.data===Ae)c.push({type:2,index:s});else{let m=-1;for(;(m=n.data.indexOf(F,m+1))!==-1;)c.push({type:7,index:s}),m+=F.length-1}s++}}static createElement(i,t){let e=W.createElement("template");return e.innerHTML=i,e}};Xt=class{constructor(i,t){this._$AV=[],this._$AN=void 0,this._$AD=i,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(i){let{el:{content:t},parts:e}=this._$AD,n=(i?.creationScope??W).importNode(t,!0);V.currentNode=n;let s=V.nextNode(),a=0,l=0,c=e[0];for(;c!==void 0;){if(a===c.index){let u;c.type===2?u=new wt(s,s.nextSibling,this,i):c.type===1?u=new c.ctor(s,c.name,c.strings,this,i):c.type===6&&(u=new te(s,this,i)),this._$AV.push(u),c=e[++l]}a!==c?.index&&(s=V.nextNode(),a++)}return V.currentNode=W,n}p(i){let t=0;for(let e of this._$AV)e!==void 0&&(e.strings!==void 0?(e._$AI(i,e,t),t+=e.strings.length-2):e._$AI(i[t])),t++}},wt=class o{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(i,t,e,n){this.type=2,this._$AH=p,this._$AN=void 0,this._$AA=i,this._$AB=t,this._$AM=e,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let i=this._$AA.parentNode,t=this._$AM;return t!==void 0&&i?.nodeType===11&&(i=t.parentNode),i}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(i,t=this){i=Z(this,i,t),_t(i)?i===p||i==null||i===""?(this._$AH!==p&&this._$AR(),this._$AH=p):i!==this._$AH&&i!==O&&this._(i):i._$litType$!==void 0?this.$(i):i.nodeType!==void 0?this.T(i):_i(i)?this.k(i):this._(i)}O(i){return this._$AA.parentNode.insertBefore(i,this._$AB)}T(i){this._$AH!==i&&(this._$AR(),this._$AH=this.O(i))}_(i){this._$AH!==p&&_t(this._$AH)?this._$AA.nextSibling.data=i:this.T(W.createTextNode(i)),this._$AH=i}$(i){let{values:t,_$litType$:e}=i,n=typeof e=="number"?this._$AC(i):(e.el===void 0&&(e.el=bt.createElement(Ee(e.h,e.h[0]),this.options)),e);if(this._$AH?._$AD===n)this._$AH.p(t);else{let s=new Xt(n,this),a=s.u(this.options);s.p(t),this.T(a),this._$AH=s}}_$AC(i){let t=$e.get(i.strings);return t===void 0&&$e.set(i.strings,t=new bt(i)),t}k(i){ie(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,e,n=0;for(let s of i)n===t.length?t.push(e=new o(this.O(gt()),this.O(gt()),this,this.options)):e=t[n],e._$AI(s),n++;n<t.length&&(this._$AR(e&&e._$AB.nextSibling,n),t.length=n)}_$AR(i=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);i!==this._$AB;){let e=_e(i).nextSibling;_e(i).remove(),i=e}}setConnected(i){this._$AM===void 0&&(this._$Cv=i,this._$AP?.(i))}},J=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(i,t,e,n,s){this.type=1,this._$AH=p,this._$AN=void 0,this.element=i,this.name=t,this._$AM=n,this.options=s,e.length>2||e[0]!==""||e[1]!==""?(this._$AH=Array(e.length-1).fill(new String),this.strings=e):this._$AH=p}_$AI(i,t=this,e,n){let s=this.strings,a=!1;if(s===void 0)i=Z(this,i,t,0),a=!_t(i)||i!==this._$AH&&i!==O,a&&(this._$AH=i);else{let l=i,c,u;for(i=s[0],c=0;c<s.length-1;c++)u=Z(this,l[e+c],t,c),u===O&&(u=this._$AH[c]),a||=!_t(u)||u!==this._$AH[c],u===p?i=p:i!==p&&(i+=(u??"")+s[c+1]),this._$AH[c]=u}a&&!n&&this.j(i)}j(i){i===p?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,i??"")}},Zt=class extends J{constructor(){super(...arguments),this.type=3}j(i){this.element[this.name]=i===p?void 0:i}},Jt=class extends J{constructor(){super(...arguments),this.type=4}j(i){this.element.toggleAttribute(this.name,!!i&&i!==p)}},Qt=class extends J{constructor(i,t,e,n,s){super(i,t,e,n,s),this.type=5}_$AI(i,t=this){if((i=Z(this,i,t,0)??p)===O)return;let e=this._$AH,n=i===p&&e!==p||i.capture!==e.capture||i.once!==e.once||i.passive!==e.passive,s=i!==p&&(e===p||n);n&&this.element.removeEventListener(this.name,this,e),s&&this.element.addEventListener(this.name,this,i),this._$AH=i}handleEvent(i){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,i):this._$AH.handleEvent(i)}},te=class{constructor(i,t,e){this.element=i,this.type=6,this._$AN=void 0,this._$AM=t,this.options=e}get _$AU(){return this._$AM._$AU}_$AI(i){Z(this,i)}},wi=ee.litHtmlPolyfillSupport;wi?.(bt,wt),(ee.litHtmlVersions??=[]).push("3.3.3");Te=(o,i,t)=>{let e=t?.renderBefore??i,n=e._$litPart$;if(n===void 0){let s=t?.renderBefore??null;e._$litPart$=n=new wt(i.insertBefore(gt(),s),s,void 0,t??{})}return n._$AI(o),n}});var oe,E,yi,Ce=k(()=>{mt();mt();Q();Q();oe=globalThis,E=class extends D{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let i=super.createRenderRoot();return this.renderOptions.renderBefore??=i.firstChild,i}update(i){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(i),this._$Do=Te(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return O}};E._$litElement$=!0,E.finalized=!0,oe.litElementHydrateSupport?.({LitElement:E});yi=oe.litElementPolyfillSupport;yi?.({LitElement:E});(oe.litElementVersions??=[]).push("4.2.2")});var ze=k(()=>{});var C=k(()=>{mt();Q();Ce();ze()});var _,Me=k(()=>{_=o=>(i,t)=>{t!==void 0?t.addInitializer(()=>{customElements.define(o,i)}):customElements.define(o,i)}});function y(o){return(i,t)=>typeof t=="object"?xi(o,i,t):((e,n,s)=>{let a=n.hasOwnProperty(s);return n.constructor.createProperty(s,e),a?Object.getOwnPropertyDescriptor(n,s):void 0})(o,i,t)}var vi,xi,se=k(()=>{mt();vi={attribute:!0,type:String,converter:ut,reflect:!1,hasChanged:Et},xi=(o=vi,i,t)=>{let{kind:e,metadata:n}=t,s=globalThis.litPropertyMetadata.get(n);if(s===void 0&&globalThis.litPropertyMetadata.set(n,s=new Map),e==="setter"&&((o=Object.create(o)).wrapped=!0),s.set(t.name,o),e==="accessor"){let{name:a}=t;return{set(l){let c=i.get.call(this);i.set.call(this,l),this.requestUpdate(a,c,o,!0,l)},init(l){return l!==void 0&&this.C(a,void 0,o,l),l}}}if(e==="setter"){let{name:a}=t;return function(l){let c=this[a];i.call(this,l),this.requestUpdate(a,c,o,!0,l)}}throw Error("Unsupported decorator location: "+e)}});function v(o){return y({...o,state:!0,attribute:!1})}var Oe=k(()=>{se();});var He=k(()=>{});var K,tt=k(()=>{K=(o,i,t)=>(t.configurable=!0,t.enumerable=!0,Reflect.decorate&&typeof i!="object"&&Object.defineProperty(o,i,t),t)});function Pe(o,i){return(t,e,n)=>{let s=a=>a.renderRoot?.querySelector(o)??null;if(i){let{get:a,set:l}=typeof e=="object"?t:n??(()=>{let c=Symbol();return{get(){return this[c]},set(u){this[c]=u}}})();return K(t,e,{get(){let c=a.call(this);return c===void 0&&(c=s(this),(c!==null||this.hasUpdated)&&l.call(this,c)),c}})}return K(t,e,{get(){return s(this)}})}}var Ne=k(()=>{tt();});var Re=k(()=>{tt();});var De=k(()=>{tt();});var Ie=k(()=>{tt();});var je=k(()=>{tt();});var z=k(()=>{Me();se();Oe();He();Ne();Re();De();Ie();je()});var Be={};ai(Be,{FaceplateClimateCardEditor:()=>G});var Fe,Mi,Oi,Hi,Pi,Ni,G,ae=k(()=>{"use strict";C();z();$t();Fe=["select","input_select"],Mi=["switch","input_boolean","light","select","input_select","number","input_number"],Oi=(o,i)=>[{name:"entity",required:!0,selector:{entity:{domain:"climate"}}},{name:"name",selector:{text:{}}},{name:"layout",selector:{select:{mode:"dropdown",options:[{value:"row",label:"Row (single line)"},{value:"compact",label:"Compact"},{value:"standard",label:"Standard"},{value:"large",label:"Large"}]}}},{name:"current_temperature_entity",selector:{entity:{domain:["sensor","number","input_number"]}}},{name:"outdoor_temperature_entity",selector:{entity:{domain:["sensor","number","input_number"]}}},...i.length?[{name:"default_mode",selector:{select:{mode:"dropdown",options:i.filter(t=>t!=="off").map(t=>({value:t,label:t.replace(/_/g," ").replace(/\b\w/g,e=>e.toUpperCase())}))}}},{name:"hvac_modes",selector:{select:{multiple:!0,mode:"list",options:i.map(t=>({value:t,label:t.replace(/_/g," ").replace(/\b\w/g,e=>e.toUpperCase())}))}}}]:[],{type:"grid",name:"",schema:[{name:"show_name",selector:{boolean:{}}},{name:"show_current_temperature",selector:{boolean:{}}},{name:"show_controls",selector:{boolean:{}}},{name:"show_fan",selector:{boolean:{}}},{name:"show_vertical_swing",selector:{boolean:{}}},{name:"show_horizontal_swing",selector:{boolean:{}}},{name:"show_settings",selector:{boolean:{}}}]},{type:"expandable",title:"Swing entity overrides",icon:"mdi:tune",schema:[{name:"vertical_swing_entity",selector:{entity:{domain:Fe}}},{name:"horizontal_swing_entity",selector:{entity:{domain:Fe}}}]},{type:"expandable",title:"Settings popup",icon:"mdi:tune-variant",schema:[{name:"setting_entities",selector:o?{object:{}}:{entity:{multiple:!0,domain:Mi}}}]},{name:"step",selector:{number:{min:.1,max:5,step:.1,mode:"box"}}}],Hi={entity:"Climate entity (required)",name:"Name",layout:"Size / layout",current_temperature_entity:"Current temperature entity (optional)",outdoor_temperature_entity:"Outdoor temperature entity (optional)",hvac_modes:"Modes to offer",default_mode:"Default mode (power button)",show_name:"Show name",show_current_temperature:"Show current temperature",show_controls:"Show buttons",show_fan:"Show fan control",show_vertical_swing:"Show vertical swing",show_horizontal_swing:"Show horizontal swing",show_settings:"Show settings popup",vertical_swing_entity:"Vertical swing entity",horizontal_swing_entity:"Horizontal swing entity",setting_entities:"Entities in settings popup",step:"Temperature step"},Pi={current_temperature_entity:"Overrides the temperature reported by the climate entity",outdoor_temperature_entity:"Shown on the display next to the current temperature",hvac_modes:"Untick modes your unit can't actually do. Empty = offer all of them",show_controls:"Off gives a larger status-only display with no buttons",default_mode:"Pressing power turns the unit on to this mode. Hold the button to pick any mode",vertical_swing_entity:"Use a select entity instead of the climate swing_mode attribute",horizontal_swing_entity:"Use a select entity instead of the climate swing_horizontal_mode attribute",setting_entities:"To rename an item, use YAML: - entity: switch.x, name: Display light",step:"Defaults to the entity's own step"},Ni={show_name:!0,show_current_temperature:!0,show_controls:!0,show_fan:!0,show_vertical_swing:!0,show_horizontal_swing:!0,show_settings:!0},G=class extends E{setConfig(i){this._config=i}render(){if(!this.hass||!this._config)return p;let i=!!this._config.setting_entities?.some(e=>typeof e!="string"),t=this.hass.states[this._config.entity]?.attributes.hvac_modes??[];return r`
      <ha-form
        .hass=${this.hass}
        .data=${{...Ni,...this._config}}
        .schema=${Oi(i,t)}
        .computeLabel=${e=>Hi[e.name]??e.name}
        .computeHelper=${e=>Pi[e.name]}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `}_valueChanged(i){i.stopPropagation();let t={...i.detail.value};for(let[e,n]of Object.entries(t))(n===""||Array.isArray(n)&&n.length===0)&&delete t[e];this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0}))}};d([y({attribute:!1})],G.prototype,"hass",2),d([v()],G.prototype,"_config",2),G=d([_(vt)],G)});var ri="https://github.com/bl0ckstat/faceplate-cards";function A(o){window.customCards=window.customCards||[],!window.customCards.some(i=>i.type===o.type)&&window.customCards.push({preview:!0,documentationURL:ri,...o})}$t();C();z();Q();var Ct={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},zt=o=>(...i)=>({_$litDirective$:o,values:i}),et=class{constructor(i){}get _$AU(){return this._$AM._$AU}_$AT(i,t,e){this._$Ct=i,this._$AM=t,this._$Ci=e}_$AS(i,t){return this.update(i,t)}update(i,t){return this.render(...t)}};var f=zt(class extends et{constructor(o){if(super(o),o.type!==Ct.ATTRIBUTE||o.name!=="class"||o.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(o){return" "+Object.keys(o).filter(i=>o[i]).join(" ")+" "}update(o,[i]){if(this.st===void 0){this.st=new Set,o.strings!==void 0&&(this.nt=new Set(o.strings.join(" ").split(/\s/).filter(e=>e!=="")));for(let e in i)i[e]&&!this.nt?.has(e)&&this.st.add(e);return this.render(i)}let t=o.element.classList;for(let e of this.st)e in i||(t.remove(e),this.st.delete(e));for(let e in i){let n=!!i[e];n===this.st.has(e)||this.nt?.has(e)||(n?(t.add(e),this.st.add(e)):(t.remove(e),this.st.delete(e)))}return O}});Q();var Le="important",$i=" !"+Le,M=zt(class extends et{constructor(o){if(super(o),o.type!==Ct.ATTRIBUTE||o.name!=="style"||o.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(o){return Object.keys(o).reduce((i,t)=>{let e=o[t];return e==null?i:i+`${t=t.includes("-")?t:t.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${e};`},"")}update(o,[i]){let{style:t}=o.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(i)),this.render(i);for(let e of this.ft)i[e]==null&&(this.ft.delete(e),e.includes("-")?t.removeProperty(e):t[e]=null);for(let e in i){let n=i[e];if(n!=null){this.ft.add(e);let s=typeof n=="string"&&n.endsWith($i);e.includes("-")||s?t.setProperty(e,s?n.slice(0,-11):n,s?Le:""):t[e]=n}}return O}});$t();C();var ki=g`
  :host {
    display: block;
    container-type: inline-size;
    height: 100%;

    --faceplate-radius: 12px;
    /* Controls are rounded squares, not circles. */
    --faceplate-control-radius: 12px;
    --faceplate-gap: 8px;
    --faceplate-padding: 10px;
    --faceplate-button-size: 44px;
    --faceplate-button-max: 52px;
    --faceplate-icon-size: 24px;
    --faceplate-lcd-background: var(
      --faceplate-lcd-bg,
      var(--secondary-background-color)
    );
  }
`,Ai=g`
  ha-card {
    padding: var(--faceplate-padding);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: var(--faceplate-gap);
    height: 100%;
    box-sizing: border-box;
    overflow: hidden;
  }
  ha-card.error {
    padding: 16px;
    color: var(--error-color, #db4437);
  }
  button {
    font: inherit;
    color: inherit;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    /* Long-press must reach us rather than becoming a text selection or
       double-tap zoom on a touch panel. */
    touch-action: manipulation;
    -webkit-user-select: none;
    user-select: none;
    -webkit-touch-callout: none;
  }
  button:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
  /* ha-icon has no text baseline; keep icons flex-centered everywhere so they
     never drift against neighbouring text or inside round buttons. */
  ha-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex: none;
  }
`,Si=g`
  .lcd {
    border-radius: var(--faceplate-radius);
    padding: 10px 16px 8px;
    background: var(--faceplate-lcd-background);
    box-shadow: inset 0 1px 5px rgba(0, 0, 0, 0.12);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    min-height: 0;
    flex: 1;
    justify-content: center;
  }
  .lcd.tappable {
    cursor: pointer;
  }
  /* "Off" greys the derived readouts but leaves measured values at full
     contrast — a measurement is still true when the appliance is idle. */
  .lcd.off .segment {
    opacity: 0.55;
  }
  .lcd-top {
    align-self: stretch;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
  }
  .name {
    font-size: 12px;
    font-weight: 500;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .lcd-center {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  /* The one big number every card leads with. */
  .readout {
    font-size: var(--faceplate-readout-size, 40px);
    font-weight: 300;
    line-height: 1.1;
    font-variant-numeric: tabular-nums;
  }
  .readout.dimmed,
  .readout.dimmed .unit {
    color: var(--disabled-text-color, var(--secondary-text-color));
  }
  .unit {
    font-size: calc(var(--faceplate-readout-size, 40px) * 0.4);
    opacity: 0.75;
    margin-left: 1px;
  }
  .aux {
    font-size: 11px;
    color: var(--secondary-text-color);
    white-space: nowrap;
    font-variant-numeric: tabular-nums;
  }
  .badge {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 13px;
    font-weight: 500;
    white-space: nowrap;
  }
  .badge ha-icon {
    --mdc-icon-size: 17px;
  }
  /* Secondary readouts, ruled off like a segment row on a real panel. */
  .lcd-status {
    align-self: stretch;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 2px 12px;
    margin-top: 3px;
    padding-top: 5px;
    border-top: 1px dashed var(--divider-color, rgba(0, 0, 0, 0.12));
  }
  .segment {
    display: flex;
    align-items: center;
    gap: 3px;
    font-size: 11px;
    color: var(--secondary-text-color);
    border-radius: 6px;
    padding: 1px 4px;
  }
  button.segment:hover {
    background: rgba(127, 127, 127, 0.15);
    color: var(--primary-text-color);
  }
  .segment ha-icon {
    --mdc-icon-size: 14px;
  }
  .segment span {
    max-width: 12ch;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`,Ei=g`
  /* Buttons flow into as many equal columns as fit at a thumb-friendly size,
     wrapping onto another row on narrow wall-panel tiles rather than shrinking
     into fiddly targets or overflowing the card. */
  .controls {
    display: grid;
    grid-template-columns: repeat(
      auto-fit,
      minmax(var(--faceplate-button-size, 46px), 1fr)
    );
    gap: 6px;
    align-items: center;
    justify-items: center;
    flex: none;
    min-width: 0;
  }
  .ctl {
    width: 100%;
    max-width: var(--faceplate-button-max, 60px);
    height: auto;
    aspect-ratio: 1;
    border-radius: var(--faceplate-control-radius);
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--secondary-background-color);
    color: var(--primary-text-color);
    transition: background 0.15s;
  }
  .ctl ha-icon {
    --mdc-icon-size: var(--faceplate-icon-size, 24px);
    max-width: 100%;
  }
  .ctl:hover:not(:disabled) {
    background: rgba(127, 127, 127, 0.3);
  }
  /* The accented button — the primary action on any given card. */
  .ctl.accent {
    background: var(--primary-color);
    color: var(--text-primary-color, #fff);
  }
  .ctl.accent:hover:not(:disabled) {
    background: var(--primary-color);
    filter: brightness(1.1);
  }
  /* An "active" button tints itself with its own state colour, which the card
     supplies as the element's color — the climate card passes the HVAC mode's
     colour, the others an active-state colour. A card that left color as plain
     text would tint with the text colour and come out fainter than the
     inactive button, so every card sets it explicitly.

     The older panels ship Chromium 107, which predates color-mix(). There the
     tint collapses to the plain background — identical to an inactive button —
     so the ring, which needs no color-mix, is what actually carries the state.
     Where color-mix does work the two reinforce each other. */
  .ctl.on {
    box-shadow: inset 0 0 0 2px currentColor;
    background: var(--secondary-background-color);
    background: color-mix(
      in srgb,
      currentColor 26%,
      var(--secondary-background-color)
    );
  }
  .ctl.off {
    color: var(--secondary-text-color);
  }
  .ctl.mini {
    --faceplate-icon-size: 18px;
    width: 30px;
    flex: none;
  }
`,Ti=g`
  .section-title {
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.6px;
    color: var(--secondary-text-color);
    padding: 9px 2px 4px;
  }
  /* Chips grow to fill each row so the edges stay flush, but size to their own
     content first — an equal-column grid clipped "Automatic" next to icon-only
     chips that needed a third of the width. */
  .chips {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    padding: 0;
  }
  .chip {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    min-height: 36px;
    padding: 5px 8px;
    border-radius: 9px;
    font-size: 13px;
    background: var(--secondary-background-color);
    color: var(--primary-text-color);
    white-space: nowrap;
    flex: 1 1 auto;
    min-width: 72px;
  }
  /* Where the icon already carries the label — a numbered fan glyph reads as
     "2" on its own — the chip sheds the text and stays narrow. */
  .chip-icon {
    min-height: 34px;
    flex: 0 1 auto;
    min-width: 46px;
  }
  .chip-icon ha-icon {
    --mdc-icon-size: 20px;
  }
  .chip ha-icon {
    --mdc-icon-size: 18px;
  }
  .chip.active {
    background: var(--primary-color);
    color: var(--text-primary-color, #fff);
    font-weight: 600;
  }
  .row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 10px 4px;
    font-size: 14px;
    border-top: 1px solid var(--divider-color, rgba(0, 0, 0, 0.08));
  }
  .row.column {
    flex-direction: column;
    align-items: stretch;
  }
  .row:first-child {
    border-top: none;
  }
  .row-name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .row-missing {
    color: var(--error-color, #db4437);
    font-size: 12px;
  }
  .stepper {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .stepper-value {
    min-width: 5ch;
    text-align: center;
    font-variant-numeric: tabular-nums;
  }
`,Ci=g`
  /* A native modal dialog, so the popup lands in the browser's top layer
     rather than competing on z-index inside this card's stacking context:
     each card in a Home Assistant grid establishes its own stacking context,
     so a popup drawn inside one card paints under any card that follows it. */
  .popup-backdrop {
    border: none;
    /* Generous vertical inset. The dialog is centred, so this is what keeps
       its close button clear of the top edge — on a wall panel the top ~40px
       is where Android's own pull-down lives, and a close button sitting in
       it is a coin toss between closing the sheet and opening the shade. */
    padding: 30px 16px;
    margin: auto;
    max-width: 100vw;
    max-height: 100vh;
    width: 100%;
    height: 100%;
    background: transparent;
    overflow: hidden;
  }
  /* The UA sheet hides a closed dialog; only lay it out once open. */
  .popup-backdrop[open] {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .popup-backdrop::backdrop {
    background: rgba(0, 0, 0, 0.4);
  }
  .popup {
    background: var(--ha-card-background, var(--card-background-color, #fff));
    color: var(--primary-text-color);
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.35);
    width: min(420px, 96vw);
    /* 100% of the backdrop's content box, which the backdrop's own padding has
       already inset — so the sheet is as tall as it can be while its close
       button still clears the top edge. A vh figure would double-count that
       inset and scroll content that had room to sit still. */
    max-height: min(100%, 560px);
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  .popup-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 14px 8px;
    font-size: 15px;
    font-weight: 500;
  }
  .close {
    width: 44px;
    height: 44px;
    flex: none;
    border-radius: var(--faceplate-control-radius);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--secondary-text-color);
  }
  .close:hover {
    background: rgba(127, 127, 127, 0.2);
  }
  .popup-body {
    padding: 0 12px 12px;
    overflow-y: auto;
    /* A column flex item defaults to min-height:auto, which refuses to shrink
       below its content — so overflow-y had nothing to act on and the sheet
       clipped its last section instead of scrolling it. */
    flex: 1 1 auto;
    min-height: 0;
    display: flex;
    flex-direction: column;
    gap: 0;
  }
  /* A full-width option row, for lists too long or too wordy for chips. */
  .option {
    display: flex;
    align-items: center;
    gap: 14px;
    min-height: 48px;
    padding: 10px 14px;
    border-radius: 12px;
    text-align: left;
    font-size: 15px;
  }
  .option:hover {
    background: rgba(127, 127, 127, 0.15);
  }
  .option.active {
    background: rgba(127, 127, 127, 0.15);
    background: color-mix(in srgb, currentColor 12%, transparent);
    color: var(--primary-color);
    font-weight: 600;
  }
  .option ha-icon {
    --mdc-icon-size: 20px;
  }
  .option .check {
    margin-left: auto;
  }
`,zi=g`
  @container (max-width: 300px) {
    ha-card {
      --faceplate-padding: 8px;
    }
    .lcd {
      --faceplate-readout-size: 34px;
      padding: 6px 10px 4px;
    }
    .badge > span {
      display: none;
    }
    .lcd-status {
      gap: 2px 8px;
    }
  }
  @container (max-width: 230px) {
    .lcd {
      --faceplate-readout-size: 30px;
    }
    .lcd-status {
      display: none;
    }
  }
  @container (max-width: 170px) {
    .aux {
      display: none;
    }
    .controls {
      --faceplate-button-size: 40px;
      gap: 4px;
    }
  }
`,x=[ki,Ai,Si,Ei,Ti,Ci,zi];var H=class extends E{constructor(){super(...arguments);this._popup=null;this._longPressed=!1;this._pressStart=()=>{this._longPressed=!1,window.clearTimeout(this._pressTimer),this._pressTimer=window.setTimeout(()=>{this._longPressed=!0,this._popup="config"},500)};this._pressEnd=()=>{window.clearTimeout(this._pressTimer)};this._powerPress=()=>{if(this._longPressed){this._longPressed=!1;return}if(!this._isOff){this._setHvacMode("off");return}let t=this._defaultMode();t?this._setHvacMode(t):this._popup="config"};this._cycleFan=t=>{if(this._longPressed){this._longPressed=!1;return}let{options:e,current:n}=t.source;if(!e.length){this._popup="config";return}let s=e[(e.indexOf(n??"")+1)%e.length];t.source.set(s)}}static async getConfigElement(){return await Promise.resolve().then(()=>(ae(),Be)),document.createElement(vt)}static getStubConfig(t){return{entity:Object.keys(t.states).find(n=>n.startsWith("climate."))??""}}setConfig(t){if(!t.entity||!t.entity.startsWith("climate."))throw new Error("Please define a climate entity");this._config=t}getCardSize(){let t=this._config?.layout;return t==="row"?1:t==="compact"?2:3}getGridOptions(){return this._config?.layout==="row"?{columns:12,rows:1,min_columns:6,min_rows:1}:{columns:6,rows:3,min_columns:3,min_rows:2}}disconnectedCallback(){super.disconnectedCallback(),window.clearTimeout(this._commitTimer),window.clearTimeout(this._pressTimer)}get _stateObj(){return this._config&&this.hass?this.hass.states[this._config.entity]:void 0}_show(t){return this._config?.[t]!==!1}_selectSource(t){let e=this.hass?.states[t];if(!e)return;let s=t.split(".")[0]==="input_select"?"input_select":"select";return{options:e.attributes.options??[],current:e.state,set:a=>this.hass.callService(s,"select_option",{entity_id:t,option:a})}}_climateSource(t,e,n){let s=this._stateObj;if(s?.attributes[t]?.length)return{options:s.attributes[t],current:s.attributes[e],set:a=>this.hass.callService("climate",n,{entity_id:s.entity_id,[e]:a})}}_fanSections(){let t=[];if(this._show("show_fan")){let n=this._climateSource("fan_modes","fan_mode","set_fan_mode");n&&t.push({key:"fan",title:"Fan speed",segmentIcon:qt(n.current??""),icon:qt,source:n})}let e=this._show("show_horizontal_swing")?this._config?.horizontal_swing_entity?this._selectSource(this._config.horizontal_swing_entity):this._climateSource("swing_horizontal_modes","swing_horizontal_mode","set_swing_horizontal_mode"):void 0;if(this._show("show_vertical_swing")){let n=this._config?.vertical_swing_entity?this._selectSource(this._config.vertical_swing_entity):this._climateSource("swing_modes","swing_mode","set_swing_mode");if(n?.options.length){let s=!e?.options.length&&n.options.some(l=>/horiz|both/i.test(l)),a=s?he:l=>xt(l,!1);t.push({key:"vswing",title:s?"Swing":"Vertical swing",segmentIcon:a(n.current??""),icon:a,source:n})}}return e?.options.length&&t.push({key:"hswing",title:"Horizontal swing",segmentIcon:xt(e.current??"",!0),icon:n=>xt(n,!0),source:e}),t}_hasSettings(){return this._show("show_settings")?!!(this._stateObj?.attributes.preset_modes?.length||this._config?.setting_entities?.length):!1}get _isOff(){return this._stateObj?.state==="off"}get _step(){return this._config?.step??this._stateObj?.attributes.target_temp_step??.5}get _targetTemp(){return this._localTarget??this._stateObj?.attributes.temperature}get _currentTemp(){let t=this._config?.current_temperature_entity;if(t){let e=this.hass?.states[t],n=e?parseFloat(e.state):NaN;return Number.isFinite(n)?n:void 0}return this._stateObj?.attributes.current_temperature}get _outdoorTemp(){let t=this._config?.outdoor_temperature_entity;if(!t)return;let e=this.hass?.states[t],n=e?parseFloat(e.state):NaN;return Number.isFinite(n)?n:void 0}get _unit(){return this.hass?.config.unit_system.temperature??"\xB0C"}_modeName(t){return this.hass?.localize(`component.climate.entity_component._.state.${t}`)||L(t)}willUpdate(){this._localTarget!==void 0&&this._stateObj?.attributes.temperature===this._localTarget&&(this._localTarget=void 0)}_adjustTemp(t){let e=this._stateObj;if(!e)return;let n=e.attributes,s=this._targetTemp??n.min_temp??20,a=n.min_temp??7,l=n.max_temp??35,c=this._step,u=Math.min(l,Math.max(a,s+t*c)),h=`${c}`.split(".")[1]?.length??0;this._localTarget=parseFloat(u.toFixed(h)),window.clearTimeout(this._commitTimer),this._commitTimer=window.setTimeout(()=>{this.hass.callService("climate","set_temperature",{entity_id:e.entity_id,temperature:this._localTarget})},700)}_availableModes(){let t=this._config?.hvac_modes;return[...this._stateObj?.attributes.hvac_modes??[]].filter(e=>!t?.length||t.includes(e)).sort((e,n)=>Ut.indexOf(e)-Ut.indexOf(n))}_defaultMode(){let t=this._availableModes().filter(n=>n!=="off"),e=this._config?.default_mode;return e&&t.includes(e)?e:t.length===1?t[0]:void 0}_setHvacMode(t){this.hass.callService("climate","set_hvac_mode",{entity_id:this._config.entity,hvac_mode:t})}render(){if(!this._config||!this.hass)return p;let t=this._stateObj;if(!t)return r`<ha-card class="error">
        Entity not found: ${this._config.entity}
      </ha-card>`;let e=t.state==="unavailable",n=t.state,s=X[n]??X.off,a=this._fanSections(),l=a.find(w=>w.key==="fan"),c=this._config.layout??"standard",u=this._config.name??t.attributes.friendly_name??"",h=t.attributes.preset_mode,m=this._show("show_controls"),b=this._isOff||e;return r`
      <ha-card
        class=${f({[`layout-${c}`]:!0,"display-only":!m})}
      >
        <!-- With the buttons hidden the display is the only thing left to
             touch, so it becomes the way into the config sheet. -->
        <div
          class=${f({lcd:!0,off:b,tappable:!m})}
          @click=${()=>{m||(this._popup="config")}}
        >
          <div class="lcd-top">
            ${this._show("show_name")?r`<span class="name" title=${u}>${u}</span>`:r`<span></span>`}
            <span class="temps">
              ${this._show("show_current_temperature")&&this._currentTemp!==void 0?r`<span class="aux"
                    >Current ${this._formatNumber(this._currentTemp)}°</span
                  >`:p}
              ${this._outdoorTemp!==void 0?r`<span class="aux"
                    >Outside ${this._formatNumber(this._outdoorTemp)}°</span
                  >`:p}
            </span>
          </div>
          <div class="lcd-center">
            <span class=${f({readout:!0,dimmed:b})}>
              ${e||this._targetTemp===void 0?"--":this._formatNumber(this._targetTemp)}<span class="unit"
                >${this._unit}</span
              >
            </span>
            <span class="badge" style=${M({color:s})}>
              <ha-icon icon=${pt[n]??"mdi:thermostat"}></ha-icon>
              <span>${e?"Unavailable":this._modeName(n)}</span>
            </span>
          </div>
          ${a.length||h?r`<div class="lcd-status">
                ${a.map(w=>r`<button
                    class="segment"
                    title=${w.title}
                    @click=${()=>this._popup="config"}
                  >
                    <ha-icon icon=${w.segmentIcon}></ha-icon>
                    <span
                      >${b?"\u2014":Vt(w.source.current??"\u2014")}</span
                    >
                  </button>`)}
                ${h&&h!=="none"&&this._hasSettings()?r`<button
                      class="segment"
                      title="Preset"
                      @click=${()=>this._popup="config"}
                    >
                      <ha-icon icon="mdi:star-outline"></ha-icon>
                      <span>${L(h)}</span>
                    </button>`:p}
              </div>`:p}
        </div>

        ${m?r`<div class="controls">
          <button
            class="ctl accent"
            title="Lower temperature"
            .disabled=${e}
            @click=${()=>this._adjustTemp(-1)}
          >
            <ha-icon icon="mdi:minus"></ha-icon>
          </button>
          <button
            class="ctl accent"
            title="Raise temperature"
            .disabled=${e}
            @click=${()=>this._adjustTemp(1)}
          >
            <ha-icon icon="mdi:plus"></ha-icon>
          </button>
          ${t.attributes.hvac_modes?.length?r`<button
                class=${f({ctl:!0,on:!this._isOff,off:this._isOff})}
                title="Power (hold to choose mode)"
                style=${M(this._isOff?{}:{color:s})}
                .disabled=${e}
                @click=${this._powerPress}
                @pointerdown=${this._pressStart}
                @pointerup=${this._pressEnd}
                @pointerleave=${this._pressEnd}
                @pointercancel=${this._pressEnd}
                @contextmenu=${w=>w.preventDefault()}
              >
                <ha-icon
                  icon=${pt[n]??"mdi:thermostat"}
                ></ha-icon>
              </button>`:p}
          ${l?r`<button
                class="ctl"
                title="Fan speed (hold for all settings)"
                .disabled=${e}
                @click=${()=>this._cycleFan(l)}
                @pointerdown=${this._pressStart}
                @pointerup=${this._pressEnd}
                @pointerleave=${this._pressEnd}
                @pointercancel=${this._pressEnd}
                @contextmenu=${w=>w.preventDefault()}
              >
                <ha-icon icon=${l.segmentIcon}></ha-icon>
              </button>`:p}
          ${this._hasSettings()?r`<button
                class="ctl"
                title="Settings"
                .disabled=${e}
                @click=${()=>this._popup="config"}
              >
                <ha-icon icon="mdi:dots-horizontal"></ha-icon>
              </button>`:p}
        </div>`:p}
        ${this._renderPopup(a)}
      </ha-card>
    `}_formatNumber(t){return t.toLocaleString(this.hass?.language??"en",{maximumFractionDigits:1})}_renderPopup(t){if(!this._popup)return p;let e=()=>this._popup=null,n=this._stateObj,s=n.state==="unavailable",a=this._config?.name??n.attributes.friendly_name??"Settings",l=X[n.state]??X.off,c=this._isOff||s,u=r`
      <!-- The same readout as the card's face: measured temperatures and mode
           above, setpoint across the middle, fan and swing along the bottom. -->
      <div class="popup-lcd ${c?"off":""}">
        <div class="lcd-top">
          <span class="temps">
            ${this._show("show_current_temperature")&&this._currentTemp!==void 0?r`<span class="aux"
                  >Current ${this._formatNumber(this._currentTemp)}°</span
                >`:p}
            ${this._outdoorTemp!==void 0?r`<span class="aux"
                  >Outside ${this._formatNumber(this._outdoorTemp)}°</span
                >`:p}
          </span>
          <span class="badge" style=${M({color:l})}>
            <ha-icon
              icon=${pt[n.state]??"mdi:thermostat"}
            ></ha-icon>
            <span>${s?"Unavailable":this._modeName(n.state)}</span>
          </span>
        </div>
        <div class="popup-lcd-center">
          <button
            class="ctl accent"
            title="Lower temperature"
            .disabled=${s}
            @click=${()=>this._adjustTemp(-1)}
          >
            <ha-icon icon="mdi:minus"></ha-icon>
          </button>
          <span class=${f({"temp-value":!0,dimmed:c})}>
            ${s||this._targetTemp===void 0?"--":this._formatNumber(this._targetTemp)}<span class="unit"
              >${this._unit}</span
            >
          </span>
          <button
            class="ctl accent"
            title="Raise temperature"
            .disabled=${s}
            @click=${()=>this._adjustTemp(1)}
          >
            <ha-icon icon="mdi:plus"></ha-icon>
          </button>
        </div>
        ${t.length?r`<div class="lcd-status">
              ${t.map(h=>r`<span class="segment">
                  <ha-icon icon=${h.segmentIcon}></ha-icon>
                  <span>${c?"\u2014":Vt(h.source.current??"\u2014")}</span>
                </span>`)}
            </div>`:p}
      </div>

      <div class="section-title">Mode</div>
      <div class="chips">
        ${this._availableModes().map(h=>r`<button
            class=${f({chip:!0,"mode-chip":!0,active:h===n.state})}
            style=${M(h===n.state?{color:X[h]??""}:{})}
            @click=${()=>this._setHvacMode(h)}
          >
            <ha-icon icon=${pt[h]??"mdi:thermostat"}></ha-icon>
            ${this._modeName(h)}
          </button>`)}
      </div>

      ${t.map(h=>r`
          <div class="section-title">${h.title}</div>
          <div class="chips">
            ${h.source.options.map(m=>{let b=h.key==="fan"?pe(m):null;return r`<button
                class=${f({chip:!0,"chip-icon":b!==null,active:m===h.source.current})}
                title=${L(m)}
                @click=${()=>h.source.set(m)}
              >
                ${this._renderFanChipIcon(m,h.icon(m),b)}
                ${b===null?L(m):p}
              </button>`})}
          </div>
        `)}
      ${this._renderSettingsBody()}
    `;return r`
      <dialog class="popup-backdrop" @click=${e} @close=${e}>
        <div
          class="popup"
          aria-label=${a}
          @click=${h=>h.stopPropagation()}
        >
          <div class="popup-header">
            <span>${a}</span>
            <button class="close" @click=${e}>
              <ha-icon icon="mdi:close"></ha-icon>
            </button>
          </div>
          <div class="popup-body">${u}</div>
        </div>
      </dialog>
    `}updated(){let t=this._dialogEl;t&&(this._popup&&!t.open?typeof t.showModal=="function"?t.showModal():t.setAttribute("open",""):!this._popup&&t.open&&(typeof t.close=="function"?t.close():t.removeAttribute("open")))}_renderFanChipIcon(t,e,n){return n===null?r`<ha-icon icon=${e}></ha-icon>`:n==="auto"?r`<ha-icon icon="mdi:fan-auto"></ha-icon>`:r`<span class="fan-glyph">
      <ha-icon icon="mdi:fan"></ha-icon>
      <span class="fan-glyph-num">${n}</span>
    </span>`}_renderSettingsBody(){let t=this._stateObj,e=t.attributes.preset_modes??[],n=this._config?.setting_entities??[];return r`
      ${e.length?r`<div class="section-title">Preset</div>
            <div class="chips">
              ${e.map(s=>r`<button
                  class=${f({chip:!0,active:s===t.attributes.preset_mode})}
                  @click=${()=>this.hass.callService("climate","set_preset_mode",{entity_id:t.entity_id,preset_mode:s})}
                >
                  ${L(s)}
                </button>`)}
            </div>`:p}
      ${n.map(s=>this._renderSettingRow(s))}
    `}_renderSettingRow(t){let e=typeof t=="string"?t:t.entity,n=typeof t=="string"?void 0:t.name,s=this.hass.states[e];if(!s)return r`<div class="row">
        <span class="row-name">${n??e}</span>
        <span class="row-missing">not found</span>
      </div>`;let a=e.split(".")[0],l=n??s.attributes.friendly_name??e;if(["switch","input_boolean","light"].includes(a))return r`<div class="row">
        <span class="row-name">${l}</span>
        <ha-switch
          .checked=${s.state==="on"}
          @change=${()=>this.hass.callService("homeassistant","toggle",{entity_id:e})}
        ></ha-switch>
      </div>`;if(["select","input_select"].includes(a)){let c=a==="input_select"?"input_select":"select",u=s.attributes.options??[];return r`<div class="row column">
        <span class="row-name">${l}</span>
        <div class="chips">
          ${u.map(h=>r`<button
              class=${f({chip:!0,active:h===s.state})}
              @click=${()=>this.hass.callService(c,"select_option",{entity_id:e,option:h})}
            >
              ${L(h)}
            </button>`)}
        </div>
      </div>`}if(["number","input_number"].includes(a)){let c=a==="input_number"?"input_number":"number",u=parseFloat(s.state),h=s.attributes.step??1,m=b=>this.hass.callService(c,"set_value",{entity_id:e,value:Math.min(s.attributes.max??1/0,Math.max(s.attributes.min??-1/0,b))});return r`<div class="row">
        <span class="row-name">${l}</span>
        <div class="stepper">
          <button class="ctl mini" @click=${()=>m(u-h)}>
            <ha-icon icon="mdi:minus"></ha-icon>
          </button>
          <span class="stepper-value"
            >${s.state}${s.attributes.unit_of_measurement??""}</span
          >
          <button class="ctl mini" @click=${()=>m(u+h)}>
            <ha-icon icon="mdi:plus"></ha-icon>
          </button>
        </div>
      </div>`}return r`<div class="row">
      <span class="row-name">${l}</span>
      <span>${this.hass.formatEntityState?.(s)??s.state}</span>
    </div>`}};H.styles=[...x,g`
      .temps {
        display: flex;
        align-items: center;
        gap: 10px;
        flex: none;
      }

      /* A fan speed drawn rather than borrowed: a plain fan carrying its own
         digit, so every speed looks the same however many the unit has. */
      .fan-glyph {
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex: none;
      }
      .fan-glyph ha-icon {
        --mdc-icon-size: 20px;
      }
      .fan-glyph-num {
        position: absolute;
        right: -3px;
        bottom: -2px;
        font-size: 10px;
        font-weight: 700;
        line-height: 1;
        font-variant-numeric: tabular-nums;
      }

      /* ------------------ setpoint block in the sheet ----------------- */
      /* Mirrors the card's own LCD — same inset panel, same round temperature
         buttons — so the sheet reads as the card opened up rather than as a
         separate dialog. */
      .popup-lcd {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2px;
        padding: 7px 12px 5px;
        border-radius: var(--faceplate-radius);
        background: var(--faceplate-lcd-background);
        box-shadow: inset 0 1px 5px rgba(0, 0, 0, 0.12);
      }
      .popup-lcd .lcd-status {
        margin-top: 2px;
        padding-top: 4px;
      }
      .popup-lcd.off .segment {
        opacity: 0.55;
      }
      .popup-lcd-center {
        align-self: stretch;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
      }
      .popup-lcd-center .ctl {
        width: 40px;
        flex: none;
      }
      .temp-value {
        font-size: 34px;
        font-weight: 300;
        font-variant-numeric: tabular-nums;
        line-height: 1.1;
        text-align: center;
        flex: 1;
      }
      .temp-value.dimmed,
      .temp-value.dimmed .unit {
        color: var(--disabled-text-color, var(--secondary-text-color));
      }
      .temp-value .unit {
        font-size: 14px;
      }

      /* -------------------------- layouts ----------------------------- */
      .layout-compact {
        --faceplate-readout-size: 30px;
        --faceplate-button-size: 42px;
        --faceplate-button-max: 52px;
        --faceplate-icon-size: 22px;
        padding: 8px;
        gap: 8px;
      }
      .layout-compact .lcd {
        padding: 6px 10px 4px;
      }
      .layout-compact .lcd-status {
        display: none;
      }
      .layout-compact .badge > span {
        display: none;
      }
      /* Single-line strip for wall panels that must fit a whole dashboard on
         one screen: the readout and the buttons share a row instead of
         stacking, so the card costs ~64px of height instead of ~190px. */
      .layout-row {
        /* Sized against the card's own height so a strip given two rows grows
           into them. It used to hold these fixed and centre the result, which
           on a two-row tile drew a thin ribbon of content in a tall box and
           looked like a mistake. The floors are the old fixed values, so a
           one-row strip is unchanged. */
        /* Height alone is the wrong bound. The controls are a nowrap row, so
           on a tall tile they grew until five buttons were wider than the card
           and slid over the readout. Whichever of the two axes runs out first
           wins; 11cqw is the share five buttons and the readout can agree on. */
        --faceplate-readout-size: clamp(26px, min(34cqh, 9cqw), 56px);
        --faceplate-button-size: clamp(38px, min(50cqh, 12cqw), 78px);
        --faceplate-button-max: clamp(42px, min(54cqh, 13cqw), 84px);
        --faceplate-icon-size: clamp(20px, min(26cqh, 6cqw), 40px);
        container-type: size;
        /* If this ever lands somewhere its height is indefinite, size
           containment would collapse it to nothing; this keeps it visible. */
        min-height: 52px;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        padding: clamp(6px, 6cqh, 12px) 8px;
        gap: 8px;
      }
      .layout-row .lcd {
        flex: 1 1 auto;
        min-width: 0;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        padding: 4px 10px;
      }
      /* Name over the measured temperature, so the setpoint keeps the eye. */
      .layout-row .lcd-top {
        flex-direction: column;
        align-items: flex-start;
        align-self: center;
        gap: 0;
        flex: 1 1 auto;
        min-width: 0;
      }
      .layout-row .temps {
        gap: 8px;
      }
      .layout-row .lcd-center {
        flex: none;
        gap: 6px;
      }
      .layout-row .lcd-status {
        display: none;
      }
      .layout-row .badge > span {
        display: none;
      }
      /* On a one-row strip the buttons must not wrap — wrapping is what makes
         the card tall, and tall is the thing this layout exists to avoid. */
      .layout-row .controls {
        display: flex;
        flex-wrap: nowrap;
        gap: 5px;
        flex: none;
      }
      .layout-row .ctl {
        width: var(--faceplate-button-size, 38px);
        flex: none;
      }
      /* Given two rows or more, the strip stops being a strip: the readout
         takes the full height on the left and the controls wrap into a block
         beside it, which is both how the space gets used and how the buttons
         get big enough to hit. Below this height nothing changes. */
      @container (min-height: 88px) {
        .layout-row .lcd {
          align-self: stretch;
          /* Stacked, not side by side. Side by side the name and the setpoint
             were competing for a pane barely 190px wide and ran over each
             other. */
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          gap: 2px;
        }
        .layout-row .lcd-center {
          order: 1;
        }
        .layout-row .lcd-top {
          order: 2;
          flex: none;
          align-self: stretch;
          flex-direction: row;
          align-items: baseline;
          justify-content: space-between;
          gap: 8px;
        }
        /* A real grid rather than a wrapped row: wrapping left the last two
           buttons hanging off one end, which is the sort of thing that reads
           as a bug even when it is only a shrug. Three columns, so five
           controls sit in fixed positions with one empty cell. */
        .layout-row .controls {
          display: grid;
          grid-template-columns: repeat(3, var(--faceplate-button-max, 42px));
          justify-content: end;
          align-content: center;
          gap: 5px;
          max-width: none;
        }
        /* There is room for the fan, swing and preset readouts here, and the
           one-line strip has to hide them. This is the layout that can afford
           to say what the unit is actually doing. */
        .layout-row .lcd-status {
          display: flex;
          order: 3;
          flex-wrap: wrap;
          gap: 4px 10px;
          padding-top: 4px;
          border-top: 1px solid var(--divider-color, rgba(127, 127, 127, 0.25));
          align-self: stretch;
        }
        .layout-row .badge > span {
          display: inline;
        }
        .layout-row .ctl {
          width: var(--faceplate-button-max, 42px);
          height: var(--faceplate-button-max, 42px);
        }
      }

      .layout-large {
        --faceplate-readout-size: 52px;
        --faceplate-button-size: 56px;
        --faceplate-button-max: 72px;
        --faceplate-icon-size: 28px;
        padding: 14px;
        gap: 12px;
      }
      .layout-large .lcd {
        padding: 12px 18px 8px;
      }
      .layout-large .name {
        font-size: 14px;
      }
      .layout-large .aux {
        font-size: 13px;
      }
      .layout-large .badge {
        font-size: 15px;
      }
      .layout-large .segment {
        font-size: 12px;
      }

      /* ------------- status-only display (show_controls: false) -------- */
      .display-only .lcd {
        --faceplate-readout-size: 64px;
        gap: 4px;
        padding: 12px 16px 10px;
      }
      .display-only .name {
        font-size: 14px;
      }
      .display-only .badge {
        font-size: 16px;
      }
      .display-only .badge ha-icon {
        --mdc-icon-size: 22px;
      }
      .display-only .badge > span {
        display: inline;
      }
      .display-only .aux {
        font-size: 13px;
      }
      .display-only .temps {
        display: flex;
      }
      .display-only .lcd-status {
        display: flex;
        font-size: 13px;
      }
      .display-only .segment {
        font-size: 13px;
      }
      .display-only .segment ha-icon {
        --mdc-icon-size: 17px;
      }
      /* Half-width status tiles: three rows have to sit inside roughly 96px of
         card, so the setpoint gives up size before anything overflows the LCD. */
      @container (max-width: 300px) {
        .display-only .lcd {
          --faceplate-readout-size: 38px;
          padding: 6px 10px;
          gap: 1px;
        }
        .display-only .name {
          font-size: 12px;
        }
        .display-only .aux {
          font-size: 11px;
        }
        .display-only .badge {
          font-size: 13px;
        }
        .display-only .badge ha-icon {
          --mdc-icon-size: 18px;
        }
        .display-only .badge > span {
          display: none;
        }
        .display-only .segment {
          font-size: 10px;
        }
        .display-only .segment ha-icon {
          --mdc-icon-size: 12px;
        }
      }
      @container (max-width: 200px) {
        .display-only .lcd {
          --faceplate-readout-size: 40px;
        }
        .display-only .lcd-status {
          gap: 0 8px;
        }
      }
    `],d([y({attribute:!1})],H.prototype,"hass",2),d([v()],H.prototype,"_config",2),d([v()],H.prototype,"_popup",2),d([Pe("dialog.popup-backdrop")],H.prototype,"_dialogEl",2),d([v()],H.prototype,"_localTarget",2),H=d([_(yt)],H);ae();C();z();C();z();var $=class extends E{static{this.styles=x}static{this.requiresEntity=!0}setConfig(i){let t=this.constructor;if(t.requiresEntity){let e=t.entityDomains,n=i.entity?.split(".")[0];if(!i.entity||e&&!e.includes(n))throw new Error(e?`Please define a ${e.join(" or ")} entity`:"Please define an entity")}this._config=i}getCardSize(){return 2}get _stateObj(){return this._config?.entity&&this.hass?this.hass.states[this._config.entity]:void 0}_show(i){return this._config?.[i]!==!1}_missingEntity(){return r`<ha-card class="error">
      Entity not found: ${this._config?.entity}
    </ha-card>`}_guard(){return!this._config||!this.hass?p:this.constructor.requiresEntity&&!this._stateObj?this._missingEntity():null}};d([y({attribute:!1})],$.prototype,"hass",2),d([v()],$.prototype,"_config",2);C();z();var S=class extends E{constructor(){super(...arguments);this.labels={};this.helpers={};this.defaults={}}setConfig(t){this._config=t}render(){return!this.hass||!this._config?p:r`
      <ha-form
        .hass=${this.hass}
        .data=${{...this.defaults,...this._config}}
        .schema=${this.schema(this._config,this.hass)}
        .computeLabel=${t=>this.labels[t.name]??t.name}
        .computeHelper=${t=>this.helpers[t.name]}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `}_valueChanged(t){t.stopPropagation();let e={...t.detail.value};for(let[n,s]of Object.entries(e))(s===""||Array.isArray(s)&&s.length===0)&&delete e[n];this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0}))}};d([y({attribute:!1})],S.prototype,"hass",2),d([v()],S.prototype,"_config",2);var Ue={type:"expandable",title:"Actions",icon:"mdi:gesture-tap",schema:[{name:"tap_action",selector:{ui_action:{}}},{name:"hold_action",selector:{ui_action:{}}},{name:"double_tap_action",selector:{ui_action:{}}}]},Mt={tap_action:"Tap action",hold_action:"Hold action",double_tap_action:"Double tap action"};var Ri={lock:"lock",cover:"cover",group:"homeassistant"};function re(o,i,t){o.dispatchEvent(new CustomEvent(i,{detail:t,bubbles:!0,composed:!0}))}function I(o,i){re(o,"hass-more-info",{entityId:i})}function j(o,i,t,e){let n=`${e}_action`,s=e==="tap"?{action:t.entity?"toggle":"none"}:e==="hold"?{action:t.entity?"more-info":"none"}:{action:"none"},a=t[n]??s;switch(a.action){case"none":return;case"more-info":{let l=a.entity??t.entity;l&&I(o,l);return}case"toggle":{let l=a.entity??t.entity;if(!l)return;let c=l.split(".")[0];i.callService(Ri[c]??"homeassistant","toggle",{entity_id:l});return}case"navigate":{if(!a.navigation_path)return;history.pushState(null,"",a.navigation_path),re(o,"location-changed",{replace:!1});return}case"url":{a.url_path&&window.open(a.url_path,"_blank","noreferrer");return}case"assist":re(o,"show-dialog",{dialogTag:"ha-voice-command-dialog",dialogImport:()=>Promise.resolve(),dialogParams:{}});return;case"call-service":case"perform-action":{let l=a.perform_action??a.service;if(!l||!l.includes("."))return;let[c,u]=l.split(".",2);i.callService(c,u,a.data??a.service_data??{},a.target);return}}}var it=class{constructor(i,t={}){this._run=i;this._opts=t;this._held=!1;this._lastTap=0;this.down=()=>{this._held=!1,this._opts.hasHold&&(window.clearTimeout(this._timer),this._timer=window.setTimeout(()=>{this._held=!0,this._run("hold")},this._opts.holdMs??500))};this.up=()=>{window.clearTimeout(this._timer)};this.click=i=>{if(i.stopPropagation(),this._held){this._held=!1;return}if(!this._opts.hasDoubleTap){this._run("tap");return}let t=Date.now();if(t-this._lastTap<300){window.clearTimeout(this._tapTimer),this._lastTap=0,this._run("double_tap");return}this._lastTap=t,this._tapTimer=window.setTimeout(()=>this._run("tap"),300)}}destroy(){window.clearTimeout(this._timer),window.clearTimeout(this._tapTimer)}};function le(o){return o.replace(/[_-]+/g," ").replace(/\b\w/g,i=>i.toUpperCase())}function P(o,i,t=1){return i.toLocaleString(o?.language??"en",{maximumFractionDigits:t})}function Ot(o,i){if(!i)return"";if(o?.formatEntityState)try{return o.formatEntityState(i)}catch{}let t=i.entity_id.split(".")[0];return o?.localize(`component.${t}.entity_component._.state.${i.state}`)||le(i.state)}function N(o,i){return i??o?.attributes.friendly_name??o?.entity_id??""}var qe="faceplate-button-card",Ve="faceplate-button-card-editor",nt=class extends ${static async getConfigElement(){return document.createElement(Ve)}static getStubConfig(){return{show_name:!0,show_icon:!0,tap_action:{action:"toggle"}}}getCardSize(){return 1}getGridOptions(){return{columns:4,rows:1,min_columns:2,min_rows:1}}setConfig(i){super.setConfig(i),this._handler?.destroy(),this._handler=new it(t=>this._run(t),{hasHold:!!i.hold_action||!!i.entity,hasDoubleTap:!!i.double_tap_action})}disconnectedCallback(){super.disconnectedCallback(),this._handler?.destroy()}_run(i){this.hass&&this._config&&j(this,this.hass,this._config,i)}render(){let i=this._guard();if(i!==null)return i;let t=this._config,e=this._stateObj,n=e?.state==="on"||e?.state==="open",s=e?.state==="unavailable",a=N(e,t.name),l=t.icon??e?.attributes.icon??this._domainIcon(n),c=t.show_name!==!1&&!!a,u=!!(t.show_state&&e);return r`
      <ha-card
        class=${f({unavailable:s,"with-name":c,"with-state":u})}
      >
        ${t.show_icon===!1?p:r`<button
              class=${f({ctl:!0,fill:!0,on:n&&!t.accent,off:!!e&&!n,accent:!!t.accent})}
              title=${a}
              aria-label=${a}
              style=${M(n&&!t.accent?{color:"var(--state-active-color, var(--primary-color))"}:{})}
              @click=${this._handler.click}
              @pointerdown=${this._handler.down}
              @pointerup=${this._handler.up}
              @pointerleave=${this._handler.up}
              @pointercancel=${this._handler.up}
              @contextmenu=${h=>h.preventDefault()}
            >
              ${t.icon_badge?r`<span class="glyph">
                    <ha-icon icon=${l}></ha-icon>
                    <span class="glyph-badge">${t.icon_badge}</span>
                  </span>`:r`<ha-icon icon=${l}></ha-icon>`}
            </button>`}
        ${c?r`<span class="label" title=${a}>${a}</span>`:p}
        ${u?r`<span class="label state"
              >${Ot(this.hass,e)}</span
            >`:p}
      </ha-card>
    `}_domainIcon(i){switch(this._config?.entity?.split(".")[0]){case"light":return i?"mdi:lightbulb":"mdi:lightbulb-outline";case"switch":return"mdi:toggle-switch-outline";case"script":return"mdi:play";case"scene":return"mdi:palette";case"fan":return"mdi:fan";case"cover":return"mdi:window-shutter";case"climate":return"mdi:thermostat";case"media_player":return"mdi:speaker";default:return this._config?.tap_action?.action==="navigate"?"mdi:arrow-right-circle-outline":"mdi:gesture-tap-button"}}};nt.requiresEntity=!1,nt.styles=[...x,g`
      /* The digit sits in the icon's corner rather than beside it, so the
         button still reads as one glyph at a glance and the label is not
         competing with the icon for a small tile's width. */
      .glyph {
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }
      .glyph-badge {
        position: absolute;
        right: -14%;
        bottom: -6%;
        /* Sized off the same container metric as the icon, not em: em resolves
           against the inherited font-size, while the icon is sized by
           --mdc-icon-size, so an em badge stayed ~9px next to a 38px glyph and
           was unreadable at arm's length. Roughly half the icon, which is the
           proportion Material draws its own fan numerals at. */
        font-size: clamp(10px, 23cqmin, 19px);
        font-weight: 700;
        line-height: 1;
        font-variant-numeric: tabular-nums;
        text-shadow: 0 0 3px var(--faceplate-lcd-background, rgba(0, 0, 0, 0.6));
      }
      /* A size container, so the button can be sized from whichever of the
         tile's two dimensions is smaller. aspect-ratio alone cannot do it:
         it derives one axis from the other, so whichever axis gets clamped
         second leaves the circle an ellipse. The min-height floor keeps the
         button visible if this ever lands in a view that gives the card an
         indefinite height, where a size container would otherwise collapse. */
      ha-card {
        justify-content: center;
        align-items: center;
        gap: 4px;
        container-type: size;
        min-height: 48px;
      }
      /* The button is the card: it takes whatever space the tile gives it,
         squared off so it stays a circle at any tile shape.
         Deliberately not a size container: container-type size on an element
         with auto width and height collapses it to nothing, which renders the
         button invisible. */
      .ctl.fill {
        /* Square by construction: the smaller of the tile's two dimensions,
           less whatever the labels underneath have reserved. */
        --fp-button: min(100cqw, calc(100cqh - var(--fp-labels, 0px)));
        width: var(--fp-button);
        height: var(--fp-button);
        max-width: none;
        flex: none;
      }
      /* Each label line under the button takes its height out of the circle
         rather than squashing it. */
      ha-card.with-name .ctl.fill {
        --fp-labels: 20px;
      }
      ha-card.with-state .ctl.fill {
        --fp-labels: 20px;
      }
      ha-card.with-name.with-state .ctl.fill {
        --fp-labels: 44px;
      }
      .ctl.fill ha-icon {
        --mdc-icon-size: clamp(16px, 46cqmin, 38px);
      }
      .label {
        font-size: 12px;
        font-weight: 500;
        text-align: center;
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        flex: none;
      }
      .label.state {
        font-size: 11px;
        color: var(--secondary-text-color);
      }
      .unavailable {
        opacity: 0.45;
      }
    `],nt=d([_(qe)],nt);var Ht=class extends S{constructor(){super(...arguments);this.defaults={show_name:!0,show_icon:!0,show_state:!1};this.labels={entity:"Entity (optional)",name:"Name",icon:"Icon",show_name:"Show name",show_icon:"Show icon",show_state:"Show state",accent:"Accent colour",...Mt};this.helpers={entity:"Leave empty for a button that only navigates or runs an action",accent:"Fill the button with the theme's accent colour at all times"}}schema(t,e){return[{name:"entity",selector:{entity:{}}},{name:"name",selector:{text:{}}},{name:"icon",selector:{icon:{}}},{type:"grid",name:"",schema:[{name:"show_name",selector:{boolean:{}}},{name:"show_icon",selector:{boolean:{}}},{name:"show_state",selector:{boolean:{}}},{name:"accent",selector:{boolean:{}}}]},Ue]}};Ht=d([_(Ve)],Ht);A({type:qe,name:"Faceplate Button",description:"A round tactile button that fills its tile \u2014 toggles, scripts, scenes and navigation"});C();z();var We="faceplate-tile-card",Ke="faceplate-tile-card-editor",ot=class extends ${constructor(){super(...arguments);this._iconTap=t=>{if(t.stopPropagation(),!this.hass||!this._config)return;let e=this._config.icon_tap_action;if(e){j(this,this.hass,{...this._config,tap_action:e},"tap");return}if(!this._config.entity){j(this,this.hass,this._config,"tap");return}let n=this._config.entity.split(".")[0];if(["script","scene","button","input_button"].includes(n)){let s=n==="script"||n==="scene"?"turn_on":"press";this.hass.callService(n,s,{entity_id:this._config.entity});return}if(["light","switch","fan","input_boolean","media_player"].includes(n)){this.hass.callService("homeassistant","toggle",{entity_id:this._config.entity});return}I(this,this._config.entity)}}static async getConfigElement(){return document.createElement(Ke)}static getStubConfig(t){return{entity:Object.keys(t.states).find(n=>n.startsWith("light."))??Object.keys(t.states)[0]??""}}getCardSize(){return 1}getGridOptions(){return this._config?.vertical?{columns:3,rows:2,min_columns:2,min_rows:2}:{columns:6,rows:1,min_columns:3,min_rows:1}}setConfig(t){super.setConfig(t),this._rowHandler?.destroy(),this._rowHandler=new it(e=>this._run(e),{hasHold:!0,hasDoubleTap:!!t.double_tap_action})}disconnectedCallback(){super.disconnectedCallback(),this._rowHandler?.destroy()}_run(t){if(!this.hass||!this._config)return;let e=t==="tap"&&!this._config.tap_action?{...this._config,tap_action:{action:"more-info"}}:this._config;j(this,this.hass,e,t)}render(){let t=this._guard();if(t!==null)return t;let e=this._config,n=this._stateObj,s=n?["on","open","playing","home"].includes(n.state):!1,a=n?.state==="unavailable",l=N(n,e.name),c=e.icon??n?.attributes.icon??"mdi:eye";return r`
      <ha-card
        class=${f({vertical:!!e.vertical,unavailable:a})}
        @click=${this._rowHandler.click}
        @pointerdown=${this._rowHandler.down}
        @pointerup=${this._rowHandler.up}
        @pointerleave=${this._rowHandler.up}
        @pointercancel=${this._rowHandler.up}
        @contextmenu=${u=>u.preventDefault()}
      >
        <button
          class=${f({ctl:!0,on:s&&!e.accent,off:!s,accent:!!e.accent})}
          title=${l}
          style=${M(s&&!e.accent?{color:"var(--state-active-color, var(--primary-color))"}:{})}
          @click=${this._iconTap}
        >
          <ha-icon icon=${c}></ha-icon>
        </button>
        <div class="text">
          <span class="primary" title=${l}>${l}</span>
          ${this._show("show_state")&&n?r`<span class="secondary"
                >${Ot(this.hass,n)}</span
              >`:p}
        </div>
      </ha-card>
    `}};ot.requiresEntity=!1,ot.styles=[...x,g`
      ha-card {
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        gap: 10px;
        padding: 8px 10px;
        cursor: pointer;
      }
      ha-card.vertical {
        flex-direction: column;
        justify-content: center;
        gap: 6px;
        text-align: center;
      }
      .ctl {
        flex: none;
        width: 42px;
        max-width: 42px;
      }
      .ctl ha-icon {
        --faceplate-icon-size: 22px;
      }
      .text {
        display: flex;
        flex-direction: column;
        min-width: 0;
        gap: 1px;
      }
      ha-card.vertical .text {
        align-items: center;
      }
      .primary {
        font-size: 14px;
        font-weight: 500;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .secondary {
        font-size: 12px;
        color: var(--secondary-text-color);
        font-variant-numeric: tabular-nums;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      ha-card.unavailable {
        opacity: 0.5;
      }
      @container (max-width: 140px) {
        .primary {
          font-size: 13px;
        }
      }
    `],ot=d([_(We)],ot);var Pt=class extends S{constructor(){super(...arguments);this.defaults={show_state:!0,vertical:!1};this.labels={entity:"Entity (required)",name:"Name",icon:"Icon",show_state:"Show state",vertical:"Vertical layout",accent:"Accent colour",icon_tap_action:"Icon tap action",...Mt};this.helpers={icon_tap_action:"Defaults to toggling, or running the script/scene. The rest of the row opens more-info"}}schema(){return[{name:"entity",required:!0,selector:{entity:{}}},{name:"name",selector:{text:{}}},{name:"icon",selector:{icon:{}}},{type:"grid",name:"",schema:[{name:"show_state",selector:{boolean:{}}},{name:"vertical",selector:{boolean:{}}},{name:"accent",selector:{boolean:{}}}]},{type:"expandable",title:"Actions",icon:"mdi:gesture-tap",schema:[{name:"icon_tap_action",selector:{ui_action:{}}},{name:"tap_action",selector:{ui_action:{}}},{name:"hold_action",selector:{ui_action:{}}},{name:"double_tap_action",selector:{ui_action:{}}}]}]}};Pt=d([_(Ke)],Pt);A({type:We,name:"Faceplate Tile",description:"An entity row with a tactile icon button, its name and its state in LCD type"});C();z();C();z();var T=class extends E{constructor(){super(...arguments);this.value=0;this.min=0;this.max=100;this.step=1;this.disabled=!1;this.unit="";this.hideValue=!1;this._down=t=>{this.disabled||(t.preventDefault(),this._pointerId=t.pointerId,t.target.setPointerCapture(t.pointerId),this._dragValue=this._valueFromEvent(t))};this._move=t=>{this.disabled||this._pointerId!==t.pointerId||(this._dragValue=this._valueFromEvent(t))};this._up=t=>{if(this.disabled||this._pointerId!==t.pointerId)return;let e=this._valueFromEvent(t);this._pointerId=void 0,this._dragValue=void 0,this.value=e,this.dispatchEvent(new CustomEvent("slider-change",{detail:{value:e},bubbles:!0,composed:!0}))};this._cancel=()=>{this._pointerId=void 0,this._dragValue=void 0}}get _shown(){return this._dragValue??this.value}_valueFromEvent(t){let e=this.renderRoot.querySelector(".track").getBoundingClientRect(),n=Math.min(1,Math.max(0,(t.clientX-e.left)/e.width)),s=this.min+n*(this.max-this.min),a=Math.round(s/this.step)*this.step;return Math.min(this.max,Math.max(this.min,a))}render(){let t=this.max-this.min||1,n=`${(Math.min(1,Math.max(0,(this._shown-this.min)/t))*100).toFixed(1)}%`;return r`
      <div
        class=${f({track:!0,disabled:this.disabled,dragging:this._dragValue!==void 0})}
        style=${this.fill?`--faceplate-slider-fill:${this.fill}`:""}
        role="slider"
        aria-label=${this.label??""}
        aria-valuemin=${this.min}
        aria-valuemax=${this.max}
        aria-valuenow=${this._shown}
        @pointerdown=${this._down}
        @pointermove=${this._move}
        @pointerup=${this._up}
        @pointercancel=${this._cancel}
      >
        ${this.gradient?r`<div
                class="gradient"
                style=${`--faceplate-slider-gradient:${this.gradient}`}
              ></div>
              <div class="marker" style=${`left:${n}`}></div>`:r`<div class="fill" style=${`width:${n}`}></div>`}
        <div class="content">
          <span>${this.label??""}</span>
          ${this.hideValue?p:r`<span class="value"
                >${Math.round(this._shown)}${this.unit}</span
              >`}
        </div>
      </div>
    `}};T.styles=g`
    :host {
      display: block;
    }
    .track {
      position: relative;
      height: var(--faceplate-slider-height, 42px);
      border-radius: 12px;
      background: var(--faceplate-lcd-background, var(--secondary-background-color));
      box-shadow: inset 0 1px 5px rgba(0, 0, 0, 0.12);
      overflow: hidden;
      cursor: pointer;
      touch-action: none;
      -webkit-user-select: none;
      user-select: none;
    }
    .track.disabled {
      opacity: 0.45;
      cursor: not-allowed;
    }
    .fill {
      position: absolute;
      inset: 0 auto 0 0;
      background: var(--faceplate-slider-fill, var(--primary-color));
      transition: width 0.12s ease-out;
    }
    .track.dragging .fill {
      transition: none;
    }
    .gradient {
      position: absolute;
      inset: 0;
      background: var(--faceplate-slider-gradient);
    }
    /* A notch marking the value on a gradient track, where a fill would hide
       the very colours the user is choosing between. */
    .marker {
      position: absolute;
      top: 0;
      bottom: 0;
      width: 4px;
      margin-left: -2px;
      border-radius: 2px;
      background: var(--primary-text-color);
      box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.25);
      transition: left 0.12s ease-out;
    }
    .track.dragging .marker {
      transition: none;
    }
    .content {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 8px;
      pointer-events: none;
      font-size: 13px;
      font-weight: 500;
    }
    /* The label and value sit over whatever the track happens to be showing —
       the empty well, a fill in the light's own colour, or the pale end of the
       warmth gradient. No single text colour is readable on all three, so each
       gets its own scrim and is always set in white, the way a legend is
       printed onto an appliance's slider. */
    .content span {
      background: rgba(0, 0, 0, 0.4);
      color: #fff;
      padding: 2px 7px;
      border-radius: 7px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .content span:empty {
      display: none;
    }
    .value {
      font-variant-numeric: tabular-nums;
    }
  `,d([y({type:Number})],T.prototype,"value",2),d([y({type:Number})],T.prototype,"min",2),d([y({type:Number})],T.prototype,"max",2),d([y({type:Number})],T.prototype,"step",2),d([y({type:Boolean})],T.prototype,"disabled",2),d([y({type:String})],T.prototype,"label",2),d([y({type:String})],T.prototype,"unit",2),d([y({type:String})],T.prototype,"fill",2),d([y({type:String})],T.prototype,"gradient",2),d([y({type:Boolean,attribute:"hide-value"})],T.prototype,"hideValue",2),d([v()],T.prototype,"_dragValue",2),T=d([_("faceplate-slider")],T);var Ge="faceplate-light-card",Ye="faceplate-light-card-editor",Di=2e3,Ii=6535,st=class extends ${constructor(){super(...arguments);this._toggle=()=>{this.hass.callService("light","toggle",{entity_id:this._config.entity})};this._setBrightness=t=>{let{min:e,max:n}=this._brightnessRange;this.hass.callService("light","turn_on",{entity_id:this._config.entity,brightness_pct:e+(n-e)*t.detail.value/100})};this._setColorTemp=t=>{this.hass.callService("light","turn_on",{entity_id:this._config.entity,color_temp_kelvin:Math.round(t.detail.value)})}}static async getConfigElement(){return document.createElement(Ye)}static getStubConfig(t){return{entity:Object.keys(t.states).find(n=>n.startsWith("light."))??"",show_brightness_control:!0}}getCardSize(){return 2}getGridOptions(){let t=this._config?.show_color_temp_control?4:3;this._config?.show_state===!1&&(t-=1),this._config?.show_controls===!1&&(t-=1);let e=this._config?.show_state===!1&&this._config?.show_controls===!1;return{columns:6,rows:Math.max(1,t),min_columns:3,min_rows:e?1:2}}get _on(){return this._stateObj?.state==="on"}get _brightnessRange(){let t=s=>typeof s=="number"&&s>=0&&s<=100?s:void 0,e=t(this._config?.min_brightness)??0,n=t(this._config?.max_brightness)??100;return n>e?{min:e,max:n}:{min:0,max:100}}get _brightness(){let t=this._stateObj?.attributes.brightness;if(typeof t!="number")return;let{min:e,max:n}=this._brightnessRange,s=t/255*100;return Math.min(100,Math.max(0,Math.round((s-e)/(n-e)*100)))}get _kelvinRange(){let t=this._stateObj?.attributes.min_color_temp_kelvin??Di,e=this._stateObj?.attributes.max_color_temp_kelvin??Ii,n=this._config?.min_color_temp_kelvin,s=this._config?.max_color_temp_kelvin,a=typeof n=="number"?Math.max(t,n):t,l=typeof s=="number"?Math.min(e,s):e;return l>a?{min:a,max:l}:{min:t,max:e}}get _supportsBrightness(){return(this._stateObj?.attributes.supported_color_modes??[]).some(e=>e!=="onoff"&&e!=="unknown")}get _supportsColorTemp(){return(this._stateObj?.attributes.supported_color_modes??[]).includes("color_temp")}get _lightColor(){if(this._config?.use_light_color===!1||!this._on)return;let t=this._stateObj?.attributes.rgb_color;if(Array.isArray(t)&&t.length>=3)return`rgb(${t[0]}, ${t[1]}, ${t[2]})`;let e=this._stateObj?.attributes.color_temp_kelvin;if(typeof e=="number")return Nt(e)}render(){let t=this._guard();if(t!==null)return t;let e=this._config,n=this._stateObj,s=n.state==="unavailable",a=N(n,e.name),l=this._lightColor,c=this._brightness,u=e.icon??n.attributes.icon??(this._on?"mdi:lightbulb":"mdi:lightbulb-outline"),h=e.show_state===!1&&e.show_controls===!1,m=e.show_brightness_control!==!1&&this._supportsBrightness&&!s,b=e.show_color_temp_control===!0&&this._supportsColorTemp&&!s,{min:w,max:R}=this._kelvinRange,oi=Math.min(R,Math.max(w,n.attributes.color_temp_kelvin??w));return r`
      <ha-card class=${f({strip:h})}>
        <div class=${f({lcd:!0,off:!this._on})}>
          <div class="lcd-top">
            <span class="name" title=${a}>${a}</span>
            <!-- The badge toggles rather than just reporting. On a tile with
                 the button row hidden it is the only control left, and a lit
                 bulb that cannot be pressed is a confusing thing to show. -->
            ${this._show("show_toggle")?r`<button
              class=${f({badge:!0,on:this._on})}
              style=${M(l?{color:l}:{})}
              title=${this._on?"Turn off":"Turn on"}
              aria-label=${this._on?"Turn off":"Turn on"}
              .disabled=${s}
              @click=${this._toggle}
                >
                  <ha-icon class="bulb" icon=${u}></ha-icon>
                </button>`:p}
          </div>
          ${this._show("show_state")?r`<div class="lcd-center">
                ${s?r`<span class="off-label">Unavailable</span>`:this._on?c===void 0?r`<span class="readout">On</span>`:r`<span class="readout"
                          >${c}<span class="unit">%</span></span
                        >`:r`<span class="off-label">Off</span>`}
              </div>`:p}
        </div>

        ${m||b?r`<div class="sliders">
              ${m?r`<faceplate-slider
                    label=${h?a:"Brightness"}
                    unit="%"
                    min="1"
                    max="100"
                    .value=${c??0}
                    .disabled=${!this._on}
                    .fill=${l??""}
                    @slider-change=${this._setBrightness}
                  ></faceplate-slider>`:p}
              ${b?r`<faceplate-slider
                    label=${h?a:"Warmth"}
                    unit="K"
                    .min=${w}
                    .max=${R}
                    .step=${50}
                    .value=${oi}
                    .disabled=${!this._on}
                    .gradient=${`linear-gradient(to right, ${Nt(w)}, ${Nt((w+R)/2)}, ${Nt(R)})`}
                    @slider-change=${this._setColorTemp}
                  ></faceplate-slider>`:p}
            </div>`:p}

        ${this._show("show_controls")?r`<div class="controls">
              <button
                class=${f({ctl:!0,on:this._on,off:!this._on})}
                title="Power"
                style=${M(l?{color:l}:{})}
                .disabled=${s}
                @click=${this._toggle}
              >
                <ha-icon icon="mdi:power"></ha-icon>
              </button>
              <button
                class="ctl"
                title="Details"
                @click=${()=>I(this,e.entity)}
              >
                <ha-icon icon="mdi:dots-horizontal"></ha-icon>
              </button>
            </div>`:p}
      </ha-card>
    `}};st.entityDomains=["light"],st.styles=[...x,g`
      /* The badge is a control, so it has to look like one: a target
         big enough for a thumb, sitting in the title row. Plain rgba rather
         than color-mix — the Gen1 panels run a Chromium that predates it and
         would drop the declaration, leaving an invisible button. */
      .badge {
        width: 34px;
        height: 34px;
        justify-content: center;
        flex: none;
        border-radius: var(--faceplate-control-radius);
        background: rgba(127, 127, 127, 0.16);
        transition: background 0.15s;
      }
      .badge.on {
        background: rgba(255, 255, 255, 0.13);
      }
      .badge:hover:not(:disabled) {
        background: rgba(127, 127, 127, 0.3);
      }
      .badge ha-icon {
        --mdc-icon-size: 20px;
      }
      .sliders {
        display: flex;
        flex-direction: column;
        gap: 6px;
        flex: none;
      }
      /* A strip is the slider and the on/off badge, side by side, with no
         recessed panel around them: the panel's padding and the title row are
         exactly what stopped this fitting a single row. */
      ha-card.strip {
        --faceplate-padding: 6px;
        flex-direction: row;
        align-items: center;
        gap: 8px;
      }
      ha-card.strip .lcd {
        display: contents;
      }
      ha-card.strip .lcd-top {
        display: contents;
      }
      ha-card.strip .name {
        display: none;
      }
      ha-card.strip .sliders {
        flex: 1 1 auto;
        min-width: 0;
      }
      ha-card.strip .badge {
        order: 2;
      }
      /* On a tile too short for everything, the readout gives up its height
         before the sliders do — a clipped number is still readable, a slider
         pushed out of the card is not usable at all. */
      .lcd {
        flex: 1 1 auto;
        min-height: 0;
        overflow: hidden;
      }
      .bulb {
        --mdc-icon-size: 22px;
      }
      .off-label {
        font-size: 20px;
        font-weight: 300;
        color: var(--disabled-text-color, var(--secondary-text-color));
      }
      @container (max-width: 200px) {
        faceplate-slider {
          --faceplate-slider-height: 36px;
        }
      }
    `],st=d([_(Ge)],st);function Nt(o){let i=Math.min(6600,Math.max(1e3,o))/100,t=a=>Math.round(Math.min(255,Math.max(0,a))),e=i<=66?255:t(329.7*Math.pow(i-60,-.1332)),n=i<=66?t(99.47*Math.log(i)-161.12):t(288.12*Math.pow(i-60,-.0755)),s=i>=66?255:i<=19?0:t(138.52*Math.log(i-10)-305.04);return`rgb(${e}, ${n}, ${s})`}var Rt=class extends S{constructor(){super(...arguments);this.defaults={show_state:!0,show_brightness_control:!0,show_color_temp_control:!1,use_light_color:!0,show_controls:!0};this.labels={entity:"Light entity (required)",name:"Name",icon:"Icon",show_brightness_control:"Brightness slider",show_color_temp_control:"Warmth slider",use_light_color:"Tint with the light's colour",show_controls:"Show buttons",min_brightness:"Brightness floor (%)",max_brightness:"Brightness ceiling (%)",min_color_temp_kelvin:"Warmest (K)",max_color_temp_kelvin:"Coolest (K)"};this.helpers={show_color_temp_control:"Only appears on lights that support colour temperature",show_controls:"Off leaves just the readout and sliders",max_brightness:"The span the card's own 0-100% covers. A ceiling of 60 makes the card's 100% equal 60% output, rescaling the whole slider rather than clipping its top",max_color_temp_kelvin:"Narrows the warmth slider. Both ends are held inside what the light actually supports"}}schema(){return[{name:"entity",required:!0,selector:{entity:{domain:"light"}}},{name:"name",selector:{text:{}}},{name:"icon",selector:{icon:{}}},{type:"grid",name:"",schema:[{name:"show_brightness_control",selector:{boolean:{}}},{name:"show_color_temp_control",selector:{boolean:{}}},{name:"use_light_color",selector:{boolean:{}}},{name:"show_controls",selector:{boolean:{}}}]},{type:"grid",name:"",schema:[{name:"min_brightness",selector:{number:{min:0,max:100,step:1,mode:"box"}}},{name:"max_brightness",selector:{number:{min:0,max:100,step:1,mode:"box"}}},{name:"min_color_temp_kelvin",selector:{number:{min:1e3,max:1e4,step:50,mode:"box"}}},{name:"max_color_temp_kelvin",selector:{number:{min:1e3,max:1e4,step:50,mode:"box"}}}]}]}};Rt=d([_(Ye)],Rt);A({type:Ge,name:"Faceplate Light",description:"Light control with a recessed brightness slider and a tactile power button"});C();z();var ji={"clear-night":"mdi:weather-night",cloudy:"mdi:weather-cloudy",exceptional:"mdi:alert-circle-outline",fog:"mdi:weather-fog",hail:"mdi:weather-hail",lightning:"mdi:weather-lightning","lightning-rainy":"mdi:weather-lightning-rainy",partlycloudy:"mdi:weather-partly-cloudy",pouring:"mdi:weather-pouring",rainy:"mdi:weather-rainy",snowy:"mdi:weather-snowy","snowy-rainy":"mdi:weather-snowy-rainy",sunny:"mdi:weather-sunny",windy:"mdi:weather-windy","windy-variant":"mdi:weather-windy-variant"};function Dt(o){return ji[o??""]??"mdi:weather-cloudy"}var at=class{constructor(i){this._onForecast=i}async sync(i,t,e="daily",n=!0){if(!i?.connection||!t)return;if(!n){await this.stop();return}let s=`${t}|${e}`;if(this._key===s)return;await this.stop(),this._key=s;let a=i.states[t]?.attributes.forecast;Array.isArray(a)&&this._onForecast(a);try{this._unsubscribe=await i.connection.subscribeMessage(l=>{l.forecast&&this._onForecast(l.forecast)},{type:"weather/subscribe_forecast",forecast_type:e,entity_id:t})}catch{this._key=void 0}}async stop(){let i=this._unsubscribe;this._unsubscribe=void 0,this._key=void 0;try{await i?.()}catch{}}};var Xe="faceplate-clock-card",Ze="faceplate-clock-card-editor",B=class extends ${constructor(){super(...arguments);this._now=new Date;this._forecast=[];this._subscription=new at(t=>{this._forecast=t})}static async getConfigElement(){return document.createElement(Ze)}static getStubConfig(){return{show_date:!0,clock_size:"medium"}}getCardSize(){return 1}getGridOptions(){return{columns:6,rows:1,min_columns:3,min_rows:1}}connectedCallback(){super.connectedCallback(),this._schedule()}disconnectedCallback(){super.disconnectedCallback(),window.clearTimeout(this._timer),this._subscription.stop()}updated(){this._subscription.sync(this.hass,this._config?.weather_entity,"daily",this._weatherWanted)}_schedule(){window.clearTimeout(this._timer);let t=new Date;this._now=t;let e=this._config?.show_seconds?1e3:6e4,n=e-t.getTime()%e;this._timer=window.setTimeout(()=>this._schedule(),n+20)}willUpdate(t){t.has("_config")&&this._schedule()}get _hour12(){let t=this._config?.time_format??"auto";if(t==="12")return!0;if(t==="24")return!1;let e=this.hass?.locale?.time_format;if(e==="12")return!0;if(e==="24")return!1}get _locale(){return this.hass?.locale?.language??this.hass?.language??"en"}get _weatherWanted(){return!!this._config?.weather_entity&&this._show("show_weather")}render(){if(!this._config)return p;let t=this._config,e=t.time_zone,n=new Intl.DateTimeFormat(this._locale,{hour:"2-digit",minute:"2-digit",...t.show_seconds?{second:"2-digit"}:{},...this._hour12===void 0?{}:this._hour12?{hour12:!0}:{hourCycle:"h23"},...e?{timeZone:e}:{}}).formatToParts(this._now),s=n.find(u=>u.type==="dayPeriod")?.value,a=n.filter(u=>u.type!=="dayPeriod"&&u.type!=="literal").map(u=>u.value).join(":"),l=this._show("show_date")?new Intl.DateTimeFormat(this._locale,{weekday:"short",day:"numeric",month:"short",...e?{timeZone:e}:{}}).format(this._now):void 0,c=this._weather();return this.dataset.size=t.clock_size??"medium",r`
      <ha-card
        class=${f({"with-sub":!!(l||c),"with-label":!!t.name,row:t.layout==="row"})}
      >
        <div class="lcd">
          ${t.name?r`<span class="label">${t.name}</span>`:p}
          <span class="time"
            >${a}${s?r`<span class="meridiem">${s}</span>`:p}</span
          >
          ${l||c?r`<div class="sub">
                ${l?r`<span class="date">${l}</span>`:p}
                ${c??p}
              </div>`:p}
        </div>
      </ha-card>
    `}_weather(){if(!this._weatherWanted)return;let t=this.hass?.states[this._config.weather_entity];if(!t)return;let e=this._forecast[0],n=e?.condition??t.state,s=e?.temperature,a=e?.templow;return r`<span class="weather">
      <ha-icon icon=${Dt(n)}></ha-icon>
      <span class="temps">
        ${s===void 0?"--":P(this.hass,s,0)}°${a===void 0?p:r`<span class="temp-low"
              >/${P(this.hass,a,0)}°</span
            >`}
      </span>
    </span>`}};B.requiresEntity=!1,B.styles=[...x,g`
      /* A size container so the figures can be capped against the tile's
         height. Without it a medium clock with seconds and a date overflows a
         two-row tile and the date is sliced off. The min-height floor keeps it
         legible if this lands in a view that gives the card no definite
         height, where a size container would otherwise collapse. */
      ha-card {
        container-type: size;
        min-height: 40px;
      }
      .lcd {
        gap: 0;
        min-height: 0;
        overflow: hidden;
      }
      /* Each line below the time takes its share out of the figures. The date
         and the weather share one line, so a clock showing both is no shorter
         than a clock showing either. */
      ha-card.with-sub {
        --fp-clock-fit: 46cqh;
      }
      ha-card.with-label {
        --fp-clock-fit: 46cqh;
      }
      ha-card.with-label.with-sub {
        --fp-clock-fit: 34cqh;
      }
      .time {
        font-size: min(
          var(--faceplate-clock-size, 44px),
          var(--fp-clock-fit, 66cqh)
        );
        font-weight: 300;
        line-height: 1.05;
        font-variant-numeric: tabular-nums;
        letter-spacing: 0.01em;
      }
      .meridiem {
        font-size: 0.4em;
        opacity: 0.75;
        margin-left: 4px;
      }
      /* Date and weather read as one secondary line under the figures. */
      .sub {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        margin-top: 2px;
        min-width: 0;
      }
      .date {
        font-size: 13px;
        color: var(--secondary-text-color);
        white-space: nowrap;
      }
      .weather {
        display: flex;
        align-items: center;
        gap: 3px;
        white-space: nowrap;
      }
      .weather ha-icon {
        --mdc-icon-size: 18px;
      }
      .temps {
        font-size: 13px;
        font-variant-numeric: tabular-nums;
      }
      /* The low is the quieter half of the pair, as on the forecast strip. */
      .temp-low {
        color: var(--secondary-text-color);
      }
      .label {
        font-size: 12px;
        font-weight: 500;
        color: var(--secondary-text-color);
      }
      /* Row layout: everything on one line, so the figures are limited by the
         tile's height rather than by having to leave a line free beneath them.
         The stacked layout caps them at 46cqh once a date is shown; here they
         take nearly the whole height, which on a wide one-row tile is the
         difference between a readable clock and a token one. */
      ha-card.row .lcd {
        flex-direction: row;
        align-items: baseline;
        justify-content: space-between;
        gap: 10px;
        flex-wrap: nowrap;
      }
      /* Date left, time centre, weather right. The date and the weather are
         markup siblings inside .sub, so .sub dissolves and lets all three sit
         as direct children of the line; giving the outer two equal flex makes
         the time land dead centre whatever their widths. */
      ha-card.row .sub {
        display: contents;
      }
      ha-card.row .date {
        order: 1;
        flex: 1 1 0;
        min-width: 0;
        text-align: left;
      }
      ha-card.row .time {
        order: 2;
        flex: 0 0 auto;
        /* Bold rather than much larger: the bar is width-constrained, and
           weight reads at a glance across a room where a couple of extra
           pixels of height does not. */
        font-weight: 700;
        font-size: 1.12em;
      }
      ha-card.row .weather {
        order: 3;
        flex: 1 1 0;
        min-width: 0;
        display: flex;
        align-items: baseline;
        justify-content: flex-end;
      }
      ha-card.row.with-sub,
      ha-card.row.with-label,
      ha-card.row.with-label.with-sub {
        --fp-clock-fit: 76cqh;
      }
      /* One size for the whole bar. The time, the date and the weather are one
         line of text, so sizing them apart makes the smaller ones read as an
         afterthought; they all take the size the figures settle on.
         Capped against width as well as height because this line grows: adding
         seconds is four more characters, and a bar that overflows its tile
         silently loses the end of itself. */
      ha-card.row .lcd {
        font-size: min(
          var(--faceplate-clock-size, 44px),
          var(--fp-clock-fit, 68cqh),
          4.6cqw
        );
        /* The bar is a single line of text, so the generous vertical padding
           the stacked readouts want just draws a grey band above and below
           it. Horizontal padding stays: the line needs its margins. */
        padding: 2px 16px;
      }
      ha-card.row .time,
      ha-card.row .date,
      ha-card.row .temps,
      ha-card.row .label {
        font-size: 1em;
      }
      ha-card.row .weather ha-icon {
        --mdc-icon-size: 1em;
      }
      ha-card.row .sub {
        margin-top: 0;
        gap: 8px;
        flex: none;
      }
      /* A header bar is mostly frame otherwise: the card's own padding, then
         the recessed panel's, around a single line of text. Tightening both
         lets the figures grow into the space instead of it being border. */
      ha-card.row {
        --faceplate-padding: 0px;
      }
      ha-card.row .lcd {
        padding: 2px 14px;
        border-radius: var(--faceplate-radius);
        align-self: stretch;
      }
      /* Secondary text is sized against the figures, not fixed at 13px — a
         date a third the height of the time beside it reads as an accident. */

      ha-card.row .weather {
        gap: 5px;
      }

      ha-card.row .label {
        align-self: baseline;
      }
      :host([data-size="small"]) .lcd {
        --faceplate-clock-size: 30px;
      }
      :host([data-size="large"]) .lcd {
        /* Not a target so much as a ceiling: --fp-clock-fit caps the figures
           against the tile's height, so on an ordinary tile this still lands
           near 64px, and on the tall 120mm panels — where a clock is read from
           across a dark room — it grows into the space instead of sitting at
           64px in a 200px box. */
        --faceplate-clock-size: 132px;
      }
      @container (max-width: 260px) {
        .lcd {
          --faceplate-clock-size: 34px;
        }
      }
      @container (max-width: 170px) {
        .lcd {
          --faceplate-clock-size: 26px;
        }
        .date,
        .temps {
          font-size: 11px;
        }
        .sub {
          gap: 5px;
        }
        .weather ha-icon {
          --mdc-icon-size: 15px;
        }
      }
    `],d([v()],B.prototype,"_now",2),d([v()],B.prototype,"_forecast",2),B=d([_(Xe)],B);var It=class extends S{constructor(){super(...arguments);this.defaults={clock_size:"medium",time_format:"auto",show_seconds:!1,show_date:!0,show_weather:!0};this.labels={name:"Label (optional)",clock_size:"Size",time_format:"Time format",show_seconds:"Show seconds",show_date:"Show date",time_zone:"Time zone",weather_entity:"Weather entity (optional)",show_weather:"Show weather"};this.helpers={time_format:"Auto follows your Home Assistant profile setting",show_seconds:"Ticks every second instead of every minute",time_zone:"IANA name, e.g. Asia/Hong_Kong. Empty uses the panel's own zone",weather_entity:"Puts today's condition icon and high/low beside the date"}}schema(){return[{name:"name",selector:{text:{}}},{type:"grid",name:"",schema:[{name:"clock_size",selector:{select:{mode:"dropdown",options:[{value:"small",label:"Small"},{value:"medium",label:"Medium"},{value:"large",label:"Large"}]}}},{name:"time_format",selector:{select:{mode:"dropdown",options:[{value:"auto",label:"Auto"},{value:"12",label:"12 hour"},{value:"24",label:"24 hour"}]}}},{name:"show_seconds",selector:{boolean:{}}},{name:"show_date",selector:{boolean:{}}}]},{name:"time_zone",selector:{text:{}}},{name:"weather_entity",selector:{entity:{domain:"weather"}}},{name:"show_weather",selector:{boolean:{}}}]}};It=d([_(Ze)],It);A({type:Xe,name:"Faceplate Clock",description:"Time and date in LCD figures"});C();z();var Je="faceplate-weather-card",Qe="faceplate-weather-card-editor",Y=class extends ${constructor(){super(...arguments);this._forecast=[];this._subscription=new at(t=>{this._forecast=t})}static async getConfigElement(){return document.createElement(Qe)}static getStubConfig(t){return{entity:Object.keys(t.states).find(n=>n.startsWith("weather."))??"",show_forecast:!0}}getCardSize(){return 3}getGridOptions(){return{columns:12,rows:2,min_columns:4,min_rows:1}}disconnectedCallback(){super.disconnectedCallback(),this._subscription.stop()}updated(){this._subscription.sync(this.hass,this._config?.entity,this._config?.forecast_type,this._config?.show_forecast!==!1)}_icon(t){return Dt(t)}_slotLabel(t){let e=new Date(t.datetime);if(Number.isNaN(e.getTime()))return"";let n=this.hass?.locale?.language??this.hass?.language??"en";return this._config?.forecast_type==="hourly"?new Intl.DateTimeFormat(n,{hour:"numeric"}).format(e):new Intl.DateTimeFormat(n,{weekday:"short"}).format(e)}render(){let t=this._guard();if(t!==null)return t;let e=this._config,n=this._stateObj,s=N(n,e.name),a=n.attributes.temperature_unit??"\xB0",l=n.attributes.temperature,c=n.state,u=(e.show_forecast===!1?[]:this._forecast).slice(0,e.forecast_slots??5);return r`
      <ha-card @click=${()=>I(this,e.entity)}>
        <div class="lcd ${e.show_current===!1?"no-current":""}">
          ${e.show_current===!1?p:r`
                <div class="lcd-top">
                  <span class="name" title=${s}>${s}</span>
                  <span class="aux">${this._secondary(n)}</span>
                </div>
                <div class="lcd-center">
                  <span class="readout">
                    ${typeof l=="number"?P(this.hass,l,0):"--"}<span class="unit">${a}</span>
                  </span>
                  <span class="badge">
                    <ha-icon
                      class="condition"
                      icon=${this._icon(c)}
                    ></ha-icon>
                    <span>${le(c)}</span>
                  </span>
                </div>
              `}
          ${u.length?r`<div class="forecast">
                ${u.map(h=>r`<div class="slot">
                    <span class="slot-label">${this._slotLabel(h)}</span>
                    <ha-icon icon=${this._icon(h.condition)}></ha-icon>
                    <span class="slot-temps">
                      ${h.temperature===void 0?"--":P(this.hass,h.temperature,0)}°${h.templow===void 0?p:r`<span class="slot-low"
                            >/${P(this.hass,h.templow,0)}°</span
                          >`}
                    </span>
                  </div>`)}
              </div>`:p}
        </div>
      </ha-card>
    `}_secondary(t){let e=this._config?.secondary_info??["humidity","apparent","wind","pressure"].filter(s=>this._hasReading(t,s)).slice(0,1),n=[];for(let s of e)s==="humidity"&&t.attributes.humidity!==void 0&&n.push(`Humidity ${Math.round(t.attributes.humidity)}%`),s==="wind"&&t.attributes.wind_speed!==void 0&&n.push(`Wind ${P(this.hass,t.attributes.wind_speed,0)} ${t.attributes.wind_speed_unit??""}`.trim()),s==="pressure"&&t.attributes.pressure!==void 0&&n.push(`${P(this.hass,t.attributes.pressure,0)} ${t.attributes.pressure_unit??""}`.trim()),s==="apparent"&&t.attributes.apparent_temperature!==void 0&&n.push(`Feels ${P(this.hass,t.attributes.apparent_temperature,0)}\xB0`);return n.join("   ")}_hasReading(t,e){let n={humidity:"humidity",wind:"wind_speed",pressure:"pressure",apparent:"apparent_temperature"}[e];return t.attributes[n]!==void 0}};Y.entityDomains=["weather"],Y.styles=[...x,g`
      ha-card {
        cursor: pointer;
      }
      .lcd {
        gap: 4px;
      }
      .condition {
        --mdc-icon-size: 30px;
      }
      /* The forecast reads as a strip of segments across the bottom of the
         panel, the way a weather station prints its outlook. */
      .forecast {
        display: grid;
        grid-auto-flow: column;
        grid-auto-columns: 1fr;
        gap: 4px;
        align-self: stretch;
        margin-top: 4px;
        padding-top: 6px;
        border-top: 1px dashed var(--divider-color, rgba(0, 0, 0, 0.12));
      }
      .slot {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1px;
        min-width: 0;
      }
      .slot-label {
        font-size: 10px;
        color: var(--secondary-text-color);
        text-transform: uppercase;
        letter-spacing: 0.03em;
      }
      .slot ha-icon {
        --mdc-icon-size: 18px;
      }
      .slot-temps {
        font-size: 11px;
        font-variant-numeric: tabular-nums;
        white-space: nowrap;
      }
      .slot-low {
        color: var(--secondary-text-color);
      }
      /* With the current conditions hidden the forecast is the whole card, so
         the rule that would separate it from them has nothing to separate. */
      .lcd.no-current .forecast {
        margin-top: 0;
        padding-top: 0;
        border-top: none;
      }
      @container (max-width: 260px) {
        .slot-temps {
          font-size: 10px;
        }
      }
    `],d([v()],Y.prototype,"_forecast",2),Y=d([_(Je)],Y);var jt=class extends S{constructor(){super(...arguments);this.defaults={show_current:!0,show_forecast:!0,forecast_type:"daily",forecast_slots:5};this.labels={entity:"Weather entity (required)",name:"Name",show_current:"Show current conditions",show_forecast:"Show forecast",forecast_type:"Forecast type",forecast_slots:"Forecast slots",secondary_info:"Auxiliary readouts"};this.helpers={forecast_slots:"How many days or hours to show across the strip",secondary_info:"Shown on the top line beside the name"}}schema(){return[{name:"entity",required:!0,selector:{entity:{domain:"weather"}}},{name:"name",selector:{text:{}}},{type:"grid",name:"",schema:[{name:"show_current",selector:{boolean:{}}},{name:"show_forecast",selector:{boolean:{}}},{name:"forecast_type",selector:{select:{mode:"dropdown",options:[{value:"daily",label:"Daily"},{value:"hourly",label:"Hourly"},{value:"twice_daily",label:"Twice daily"}]}}},{name:"forecast_slots",selector:{number:{min:1,max:10,mode:"box"}}}]},{name:"secondary_info",selector:{select:{multiple:!0,mode:"list",options:[{value:"humidity",label:"Humidity"},{value:"wind",label:"Wind"},{value:"pressure",label:"Pressure"},{value:"apparent",label:"Feels like"}]}}}]}};jt=d([_(Qe)],jt);A({type:Je,name:"Faceplate Weather",description:"Current conditions and a forecast strip, in LCD type"});C();z();var ti="faceplate-banner-card",ei="faceplate-banner-card-editor",U=class extends ${constructor(){super(...arguments);this._rendered=""}static async getConfigElement(){return document.createElement(ei)}static getStubConfig(){return{content:"{{ now().strftime('%H:%M') }}",severity:"plain",align:"center",text_size:"large"}}getCardSize(){return 1}getGridOptions(){return{columns:12,rows:1,min_columns:3,min_rows:1}}disconnectedCallback(){super.disconnectedCallback(),this._unsubscribeTemplate()}updated(){this._subscribeTemplate()}async _unsubscribeTemplate(){let t=this._unsubscribe;this._unsubscribe=void 0,this._subscribedTo=void 0;try{await t?.()}catch{}}async _subscribeTemplate(){let t=this._config?.content;if(!(!this.hass?.connection||!t)&&this._subscribedTo!==t){if(await this._unsubscribeTemplate(),this._subscribedTo=t,!t.includes("{{")&&!t.includes("{%")){this._rendered=t,this._error=void 0;return}try{this._unsubscribe=await this.hass.connection.subscribeMessage(e=>{if(e.error){this._error=e.error;return}this._error=void 0,this._rendered=e.result??""},{type:"render_template",template:t,report_errors:!0})}catch(e){this._error=e instanceof Error?e.message:String(e),this._subscribedTo=void 0}}}_asText(t){return t.replace(/<br\s*\/?>/gi," ").replace(/<[^>]*>/g,"").replace(/&nbsp;/gi," ").replace(/&amp;/gi,"&").replace(/&lt;/gi,"<").replace(/&gt;/gi,">").replace(/&#39;|&apos;/gi,"'").replace(/&quot;/gi,'"').replace(/\s+/g," ").trim()}render(){if(!this._config)return p;let t=this._config,e=t.severity??"plain";this.dataset.severity=e,this.dataset.size=t.text_size??"medium";let n=this._asText(this._rendered);return r`
      <ha-card
        class=${f({"text-only":!!t.text_only,[`align-${t.align??"center"}`]:!0})}
      >
        ${t.icon?r`<ha-icon icon=${t.icon}></ha-icon>`:p}
        ${this._error?r`<span class="error">Template error: ${this._error}</span>`:r`<span class="text" title=${n}>${n}</span>`}
      </ha-card>
    `}};U.requiresEntity=!1,U.styles=[...x,g`
      ha-card {
        flex-direction: row;
        align-items: center;
        gap: 8px;
        padding: 8px 12px;
        color: var(--faceplate-banner-color, var(--primary-text-color));
      }
      ha-card.text-only {
        background: none;
        border: none;
        box-shadow: none;
        padding: 2px 4px;
      }
      /* Explicit, because the base card spaces its children apart: without
         this "left" put the icon at one edge and the text at the other, which
         is the one alignment nobody asks for. */
      ha-card.align-left {
        justify-content: flex-start;
      }
      ha-card.align-center {
        justify-content: center;
      }
      ha-card.align-right {
        justify-content: flex-end;
      }
      .text {
        font-size: var(--faceplate-banner-size, 16px);
        font-weight: 500;
        line-height: 1.25;
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-variant-numeric: tabular-nums;
      }
      ha-icon {
        --mdc-icon-size: calc(var(--faceplate-banner-size, 16px) * 1.1);
      }
      :host([data-size="small"]) ha-card {
        --faceplate-banner-size: 13px;
      }
      :host([data-size="large"]) ha-card {
        --faceplate-banner-size: 22px;
      }
      :host([data-severity="info"]) ha-card {
        --faceplate-banner-color: var(--info-color, #039be5);
      }
      :host([data-severity="ok"]) ha-card {
        --faceplate-banner-color: var(--success-color, #43a047);
      }
      :host([data-severity="warn"]) ha-card {
        --faceplate-banner-color: var(--warning-color, #ffa600);
      }
      :host([data-severity="alert"]) ha-card {
        --faceplate-banner-color: var(--error-color, #db4437);
      }
      .error {
        font-size: 12px;
        color: var(--error-color, #db4437);
      }
      @container (max-width: 200px) {
        ha-card {
          --faceplate-banner-size: 14px;
        }
      }
    `],d([v()],U.prototype,"_rendered",2),d([v()],U.prototype,"_error",2),U=d([_(ti)],U);var Lt=class extends S{constructor(){super(...arguments);this.defaults={severity:"plain",align:"center",text_size:"medium",text_only:!1};this.labels={content:"Content",icon:"Icon (optional)",severity:"Severity",align:"Alignment",text_size:"Text size",text_only:"No card background"};this.helpers={content:"Jinja template, re-rendered by Home Assistant whenever its inputs change. Markup is stripped \u2014 use the options below for styling",severity:"Colours the text; alert is the red 'needs attention' banner",text_only:"Renders straight onto the view, like a heading"}}schema(){return[{name:"content",required:!0,selector:{template:{}}},{name:"icon",selector:{icon:{}}},{type:"grid",name:"",schema:[{name:"severity",selector:{select:{mode:"dropdown",options:[{value:"plain",label:"Plain"},{value:"info",label:"Info"},{value:"ok",label:"OK"},{value:"warn",label:"Warning"},{value:"alert",label:"Alert"}]}}},{name:"align",selector:{select:{mode:"dropdown",options:[{value:"left",label:"Left"},{value:"center",label:"Centre"},{value:"right",label:"Right"}]}}},{name:"text_size",selector:{select:{mode:"dropdown",options:[{value:"small",label:"Small"},{value:"medium",label:"Medium"},{value:"large",label:"Large"}]}}},{name:"text_only",selector:{boolean:{}}}]}]}};Lt=d([_(ei)],Lt);A({type:ti,name:"Faceplate Banner",description:"A template-driven status line \u2014 headers, clocks and 'needs attention' warnings"});C();z();var Ft="faceplate-buttons-card",rt=class extends ${constructor(){super(...arguments);this._timers=new Map;this._held=new Set}static getStubConfig(){return{buttons:[{icon:"mdi:fan-off",tap_action:{action:"none"}},{icon:"mdi:fan",icon_badge:"1",tap_action:{action:"none"}}]}}getCardSize(){return 1}getGridOptions(){return{columns:12,rows:2,min_columns:6,min_rows:1}}setConfig(t){if(!Array.isArray(t?.buttons)||t.buttons.length===0)throw new Error("Define at least one button");super.setConfig(t)}disconnectedCallback(){super.disconnectedCallback();for(let t of this._timers.values())window.clearTimeout(t);this._timers.clear()}_down(t,e){e.hold_action&&(this._held.delete(t),this._timers.set(t,window.setTimeout(()=>{this._held.add(t),this.hass&&j(this,this.hass,{...e,type:Ft},"hold")},500)))}_up(t){let e=this._timers.get(t);e!==void 0&&(window.clearTimeout(e),this._timers.delete(t))}_press(t,e){this._held.delete(t)||this.hass&&j(this,this.hass,{...e,type:Ft},"tap")}_isOn(t){if(!t.entity)return!1;let e=this.hass?.states?.[t.entity]?.state;return e==="on"||e==="open"}render(){if(!this.hass||!this._config)return p;let t=this._config.buttons;return r`
      <ha-card>
        <div class="row" style="--fp-count: ${t.length}">
          ${t.map((e,n)=>{let s=this._isOn(e);return r`<button
              class=${f({ctl:!0,on:s,off:!!e.entity&&!s,danger:!!e.danger})}
              title=${e.name??""}
              aria-label=${e.name??e.icon??"button"}
              style=${s?"color: var(--state-active-color, var(--primary-color))":""}
              @click=${()=>this._press(n,e)}
              @pointerdown=${()=>this._down(n,e)}
              @pointerup=${()=>this._up(n)}
              @pointerleave=${()=>this._up(n)}
              @pointercancel=${()=>this._up(n)}
              @contextmenu=${a=>a.preventDefault()}
            >
              ${e.icon_badge?r`<span class="glyph">
                    <ha-icon icon=${e.icon}></ha-icon>
                    <span class="glyph-badge">${e.icon_badge}</span>
                  </span>`:r`<ha-icon icon=${e.icon}></ha-icon>`}
            </button>`})}
        </div>
      </ha-card>
    `}};rt.requiresEntity=!1,rt.styles=[...x,g`
      /* Inherits --faceplate-padding rather than setting its own: the frame
         around a card is the one thing the eye compares across a panel, and a
         row of controls framed at 6px beside a climate card framed at 10px
         reads as a mistake even when each card is fine alone. */
      ha-card {
        container-type: size;
        min-height: 48px;
        justify-content: center;
        /* Deliberately tighter than --faceplate-padding. A strip is all
           control and no content, so the frame earns less of the width here
           than it does around a readout, and the buttons take what it gives
           up. */
        padding: 2px 6px;
      }
      .row {
        display: flex;
        align-items: center;
        /* Flush to the padding at both ends, so the visible frame is the
           padding and not whatever width the squares happened to leave over. */
        justify-content: space-between;
        gap: 3px;
        width: 100%;
        height: 100%;
      }
      /* Square, sized by whichever of the tile's two dimensions runs out
         first. Height alone is not enough: on a two-row tile seven squares of
         the row's height are wider than the tile, and the overflow is clipped
         silently — the card showed five of seven buttons and looked deliberate
         doing it. Width alone stretches them into lozenges on a one-row tile.
         So: the smaller of the row's height and its fair share of the width. */
      /* Each button takes its fair share of the width and the whole of the
         height. Square was the old rule, and it wasted whatever the binding
         axis left over: seven buttons across a 480px panel cap at 62px wide,
         so a two-row strip drew 62px squares floating in a 112px card and
         gave back half the space it had asked for. */
      .row {
        --fp-w: calc(
          (100cqw - (var(--fp-count, 1) - 1) * 3px) / var(--fp-count, 1)
        );
      }
      .row .ctl {
        flex: 0 0 auto;
        width: var(--fp-w);
        /* Square, and no taller than the card. Which of the two binds depends
           on the strip: four buttons on a two-row tile are limited by height,
           seven on a one-row tile by width. Give a strip more rows than its
           buttons can use and the surplus shows as a band of card above and
           below them, so size the tile to the buttons, not the other way. */
        height: min(100%, var(--fp-w));
        max-width: none;
        /* The glyph is sized off the button, not the card. Off the card it
           tracked the card's short side, so a one-row row of seven buttons
           bottomed out on the 16px floor and drew postage stamps inside
           36px squares. The explicit width plus aspect-ratio gives this a
           definite size in both axes, which is what a size container needs. */
        container-type: size;
      }
      .ctl ha-icon {
        --mdc-icon-size: clamp(14px, 55cqmin, 34px);
      }
      /* Tinted and outlined rather than filled: filled would read as "on",
         which is the opposite of what this button does. */
      .ctl.danger {
        color: var(--error-color, #db4437);
        background: rgba(219, 68, 55, 0.16);
        box-shadow: inset 0 0 0 2px var(--error-color, #db4437);
      }
      .glyph {
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }
      .glyph-badge {
        position: absolute;
        right: -14%;
        bottom: -6%;
        font-size: clamp(9px, 28cqmin, 17px);
        font-weight: 700;
        line-height: 1;
        font-variant-numeric: tabular-nums;
        text-shadow: 0 0 3px var(--faceplate-lcd-background, rgba(0, 0, 0, 0.6));
      }
    `],rt=d([_(Ft)],rt);A({type:Ft,name:"Faceplate Buttons",description:"A row of buttons that stays on one line, for sets that do not divide into the grid's twelve columns"});C();z();var ii="faceplate-media-card",ni="faceplate-media-card-editor",lt={PAUSE:1,VOLUME_SET:4,VOLUME_MUTE:8,PREVIOUS_TRACK:16,NEXT_TRACK:32,TURN_ON:128,TURN_OFF:256,STOP:4096,PLAY:16384},ct=class extends ${constructor(){super(...arguments);this._playPause=()=>this._call("media_play_pause");this._next=()=>this._call("media_next_track");this._previous=()=>this._call("media_previous_track");this._toggleMute=()=>this._call("volume_mute",{is_volume_muted:!this._muted});this._setVolume=t=>{this._call("volume_set",{volume_level:t.detail.value*this._maxVolume/1e4})}}static async getConfigElement(){return document.createElement(ni)}static getStubConfig(t){return{entity:Object.keys(t.states).find(n=>n.startsWith("media_player."))??"",show_art:!0}}getCardSize(){return 3}getGridOptions(){let t=3;return this._config?.show_volume_control===!1&&(t-=1),this._config?.show_controls===!1&&(t-=1),{columns:12,rows:Math.max(1,t),min_columns:4,min_rows:1}}get _playing(){return this._stateObj?.state==="playing"}_supports(t){return((this._stateObj?.attributes.supported_features??0)&t)!==0}get _maxVolume(){let t=this._config?.max_volume;return typeof t=="number"&&t>0&&t<=100?t:100}get _volume(){let t=this._stateObj?.attributes.volume_level;return typeof t!="number"?0:Math.min(100,Math.round(t*100/this._maxVolume*100))}get _muted(){return this._stateObj?.attributes.is_volume_muted===!0}_call(t,e={}){this.hass.callService("media_player",t,{entity_id:this._config.entity,...e})}render(){let t=this._guard();if(t!==null)return t;let e=this._config,n=this._stateObj,s=n.state==="unavailable",a=n.state==="off"||n.state==="standby",l=N(n,e.name),c=n.attributes.media_title,u=n.attributes.media_artist??n.attributes.media_album_name,h=n.attributes.entity_picture,m=e.show_volume_control!==!1&&this._supports(lt.VOLUME_SET)&&!s,b=e.show_controls!==!1&&!s;return r`
      <ha-card>
        <div class=${f({lcd:!0,off:a||s})}>
          <div class="lcd-top">
            <span class="name" title=${l}>${l}</span>
            ${this._supports(lt.VOLUME_MUTE)&&!s?r`<button
                  class=${f({badge:!0,on:this._muted})}
                  title=${this._muted?"Unmute":"Mute"}
                  aria-label=${this._muted?"Unmute":"Mute"}
                  @click=${this._toggleMute}
                >
                  <ha-icon
                    icon=${this._muted?"mdi:volume-off":"mdi:volume-high"}
                  ></ha-icon>
                </button>`:p}
          </div>
          ${this._show("show_state")?r`<div class="now">
                ${s?r`<span class="idle">Unavailable</span>`:c?r`
                        ${e.show_art!==!1&&h?r`<img class="art" src=${h} alt="" />`:p}
                        <div class="lines">
                          <span class="title" title=${c}>${c}</span>
                          ${u?r`<span class="artist" title=${u}
                                >${u}</span
                              >`:p}
                        </div>
                      `:r`<span class="idle">${a?"Off":"Idle"}</span>`}
              </div>`:p}
        </div>

        ${m?r`<div class="sliders">
              <faceplate-slider
                label="Volume"
                unit="%"
                min="0"
                max="100"
                .value=${this._volume}
                .disabled=${this._muted}
                @slider-change=${this._setVolume}
              ></faceplate-slider>
            </div>`:p}

        ${b?r`<div class="controls">
              ${this._supports(lt.PREVIOUS_TRACK)?r`<button
                    class="ctl"
                    title="Previous"
                    @click=${this._previous}
                  >
                    <ha-icon icon="mdi:skip-previous"></ha-icon>
                  </button>`:p}
              ${this._supports(lt.PLAY)||this._supports(lt.PAUSE)?r`<button
                    class=${f({ctl:!0,on:this._playing})}
                    title=${this._playing?"Pause":"Play"}
                    @click=${this._playPause}
                  >
                    <ha-icon
                      icon=${this._playing?"mdi:pause":"mdi:play"}
                    ></ha-icon>
                  </button>`:p}
              ${this._supports(lt.NEXT_TRACK)?r`<button class="ctl" title="Next" @click=${this._next}>
                    <ha-icon icon="mdi:skip-next"></ha-icon>
                  </button>`:p}
              <button
                class="ctl"
                title="Details"
                @click=${()=>I(this,e.entity)}
              >
                <ha-icon icon="mdi:dots-horizontal"></ha-icon>
              </button>
            </div>`:p}
      </ha-card>
    `}};ct.entityDomains=["media_player"],ct.styles=[...x,g`
      ha-card {
        container-type: inline-size;
      }
      /* Art and text sit side by side: the cover is the fastest way to
         recognise what is playing, and the title alone in a narrow tile
         truncates to uselessness. */
      .now {
        display: flex;
        align-items: center;
        gap: 10px;
        align-self: stretch;
        min-width: 0;
      }
      .art {
        width: 44px;
        height: 44px;
        flex: none;
        border-radius: 6px;
        object-fit: cover;
        background: rgba(127, 127, 127, 0.18);
      }
      .lines {
        display: flex;
        flex-direction: column;
        min-width: 0;
        gap: 1px;
      }
      .title {
        font-size: 15px;
        font-weight: 400;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .artist {
        font-size: 12px;
        color: var(--secondary-text-color);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .idle {
        font-size: 20px;
        font-weight: 300;
        color: var(--disabled-text-color, var(--secondary-text-color));
      }
      .sliders {
        display: flex;
        flex-direction: column;
        gap: 6px;
        flex: none;
      }
      .lcd {
        flex: 1 1 auto;
        min-height: 0;
        overflow: hidden;
      }
      /* The cover is the first thing to go when the tile gets narrow: the
         transport buttons have to stay thumb-sized, and the text has to stay
         readable, so the decoration yields first. */
      @container (max-width: 240px) {
        .art {
          display: none;
        }
      }
    `],ct=d([_(ii)],ct);var Bt=class extends S{constructor(){super(...arguments);this.defaults={show_state:!0,show_art:!0,show_volume_control:!0,show_controls:!0};this.labels={entity:"Media player entity (required)",name:"Name",show_state:"Show what's playing",show_art:"Show album art",show_volume_control:"Volume slider",show_controls:"Transport buttons",max_volume:"Volume ceiling (%)"};this.helpers={show_art:"Hidden automatically on a narrow tile",max_volume:"The slider's 100%, as a percentage of the player's full volume"}}schema(){return[{name:"entity",required:!0,selector:{entity:{domain:"media_player"}}},{name:"name",selector:{text:{}}},{type:"grid",name:"",schema:[{name:"show_state",selector:{boolean:{}}},{name:"show_art",selector:{boolean:{}}},{name:"show_volume_control",selector:{boolean:{}}},{name:"show_controls",selector:{boolean:{}}}]},{name:"max_volume",selector:{number:{min:1,max:100,step:1,mode:"box"}}}]}};Bt=d([_(ni)],Bt);A({type:ii,name:"Faceplate Media",description:"Now playing, volume and transport controls in LCD type"});A({type:yt,name:"Faceplate Climate",description:"Air-conditioner remote with temperature, fan and swing controls, built for small wall panels"});var Li="0.1.20";console.info(`%c FACEPLATE-CARDS %c ${Li} `,"color:#fff;background:#2196f3;font-weight:700","color:#2196f3;background:#fff;font-weight:700");
/*! Bundled license information:

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/lit-html.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-element/lit-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/custom-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/property.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/state.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/event-options.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/base.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-all.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-async.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-elements.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query-assigned-nodes.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directive.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directives/class-map.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directives/style-map.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/
