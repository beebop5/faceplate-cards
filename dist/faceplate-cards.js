var oe=Object.defineProperty;var Qe=Object.getOwnPropertyDescriptor;var v=(s,e)=>()=>(s&&(e=s(s=0)),e);var ti=(s,e)=>{for(var t in e)oe(s,t,{get:e[t],enumerable:!0})};var h=(s,e,t,i)=>{for(var n=i>1?void 0:i?Qe(e,t):e,o=s.length-1,a;o>=0;o--)(a=s[o])&&(n=(i?a(e,t,n):a(n))||n);return i&&n&&oe(e,t,n),n};function jt(s){let e=s.toLowerCase();return e.includes("auto")?"mdi:fan-auto":e==="off"?"mdi:fan-off":/(quiet|silent|sleep|night)/.test(e)?"mdi:fan-minus":/(low|min|1)/.test(e)?"mdi:fan-speed-1":/(mid|med|2)/.test(e)?"mdi:fan-speed-2":/(high|3)/.test(e)?"mdi:fan-speed-3":/(max|top|turbo|strong|4|5)/.test(e)?"mdi:fan-plus":"mdi:fan"}function ae(s){let e=s.trim();return/^\d+$/.test(e)?e:/^auto(matic)?$/i.test(e)?"auto":null}function wt(s,e){let t=s.toLowerCase();return/(off|stop|fix)/.test(t)?e?"mdi:pan-horizontal":"mdi:pan-vertical":/(on|swing|both|all|auto|oscillat|full|range)/.test(t)?e?"mdi:swap-horizontal":"mdi:swap-vertical":e?/left/.test(t)?"mdi:arrow-left":/right/.test(t)?"mdi:arrow-right":/(mid|cent)/.test(t)?"mdi:arrow-split-vertical":"mdi:swap-horizontal":/(highest|top|up)/.test(t)?"mdi:arrow-up":/(lowest|bottom|down|low)/.test(t)?"mdi:arrow-down":/(mid|cent|horiz)/.test(t)?"mdi:arrow-split-horizontal":/high/.test(t)?"mdi:arrow-top-right":"mdi:swap-vertical"}function re(s){let e=s.toLowerCase();return/both|all/.test(e)?"mdi:arrow-all":/horiz/.test(e)?"mdi:swap-horizontal":/vert/.test(e)?"mdi:swap-vertical":/off|stop|fix/.test(e)?"mdi:arrow-oscillating-off":"mdi:arrow-oscillating"}function R(s){return s.replace(/[_-]+/g," ").replace(/\b\w/g,e=>e.toUpperCase())}var bt,yt,Lt,rt,J,vt=v(()=>{"use strict";bt="faceplate-climate-card",yt="faceplate-climate-card-editor",Lt=["off","auto","heat_cool","heat","cool","dry","fan_only"],rt={auto:"mdi:thermostat-auto",heat_cool:"mdi:sun-snowflake-variant",heat:"mdi:fire",cool:"mdi:snowflake",dry:"mdi:water-percent",fan_only:"mdi:fan",off:"mdi:power"},J={auto:"var(--state-climate-auto-color, #008e6d)",heat_cool:"var(--state-climate-heat_cool-color, #008e6d)",heat:"var(--state-climate-heat-color, #ff8100)",cool:"var(--state-climate-cool-color, #2196f3)",dry:"var(--state-climate-dry-color, #efbd07)",fan_only:"var(--state-climate-fan_only-color, #009688)",off:"var(--state-climate-off-color, var(--disabled-text-color, #9e9e9e))"}});var xt,$t,Bt,ce,ct,le,g,pe,Ft,Ut=v(()=>{xt=globalThis,$t=xt.ShadowRoot&&(xt.ShadyCSS===void 0||xt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Bt=Symbol(),ce=new WeakMap,ct=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==Bt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if($t&&e===void 0){let i=t!==void 0&&t.length===1;i&&(e=ce.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&ce.set(t,e))}return e}toString(){return this.cssText}},le=s=>new ct(typeof s=="string"?s:s+"",void 0,Bt),g=(s,...e)=>{let t=s.length===1?s[0]:e.reduce((i,n,o)=>i+(a=>{if(a._$cssResult$===!0)return a.cssText;if(typeof a=="number")return a;throw Error("Value passed to 'css' function must be a 'css' function result: "+a+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+s[o+1],s[0]);return new ct(t,s,Bt)},pe=(s,e)=>{if($t)s.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of e){let i=document.createElement("style"),n=xt.litNonce;n!==void 0&&i.setAttribute("nonce",n),i.textContent=t.cssText,s.appendChild(i)}},Ft=$t?s=>s:s=>s instanceof CSSStyleSheet?(e=>{let t="";for(let i of e.cssRules)t+=i.cssText;return le(t)})(s):s});var ii,ni,si,oi,ai,ri,At,de,ci,li,lt,pt,St,he,D,dt=v(()=>{Ut();Ut();({is:ii,defineProperty:ni,getOwnPropertyDescriptor:si,getOwnPropertyNames:oi,getOwnPropertySymbols:ai,getPrototypeOf:ri}=Object),At=globalThis,de=At.trustedTypes,ci=de?de.emptyScript:"",li=At.reactiveElementPolyfillSupport,lt=(s,e)=>s,pt={toAttribute(s,e){switch(e){case Boolean:s=s?ci:null;break;case Object:case Array:s=s==null?s:JSON.stringify(s)}return s},fromAttribute(s,e){let t=s;switch(e){case Boolean:t=s!==null;break;case Number:t=s===null?null:Number(s);break;case Object:case Array:try{t=JSON.parse(s)}catch{t=null}}return t}},St=(s,e)=>!ii(s,e),he={attribute:!0,type:String,converter:pt,reflect:!1,useDefault:!1,hasChanged:St};Symbol.metadata??=Symbol("metadata"),At.litPropertyMetadata??=new WeakMap;D=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=he){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let i=Symbol(),n=this.getPropertyDescriptor(e,i,t);n!==void 0&&ni(this.prototype,e,n)}}static getPropertyDescriptor(e,t,i){let{get:n,set:o}=si(this.prototype,e)??{get(){return this[t]},set(a){this[t]=a}};return{get:n,set(a){let c=n?.call(this);o?.call(this,a),this.requestUpdate(e,c,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??he}static _$Ei(){if(this.hasOwnProperty(lt("elementProperties")))return;let e=ri(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(lt("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(lt("properties"))){let t=this.properties,i=[...oi(t),...ai(t)];for(let n of i)this.createProperty(n,t[n])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[i,n]of t)this.elementProperties.set(i,n)}this._$Eh=new Map;for(let[t,i]of this.elementProperties){let n=this._$Eu(t,i);n!==void 0&&this._$Eh.set(n,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let i=new Set(e.flat(1/0).reverse());for(let n of i)t.unshift(Ft(n))}else e!==void 0&&t.push(Ft(e));return t}static _$Eu(e,t){let i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return pe(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){let i=this.constructor.elementProperties.get(e),n=this.constructor._$Eu(e,i);if(n!==void 0&&i.reflect===!0){let o=(i.converter?.toAttribute!==void 0?i.converter:pt).toAttribute(t,i.type);this._$Em=e,o==null?this.removeAttribute(n):this.setAttribute(n,o),this._$Em=null}}_$AK(e,t){let i=this.constructor,n=i._$Eh.get(e);if(n!==void 0&&this._$Em!==n){let o=i.getPropertyOptions(n),a=typeof o.converter=="function"?{fromAttribute:o.converter}:o.converter?.fromAttribute!==void 0?o.converter:pt;this._$Em=n;let c=a.fromAttribute(t,o.type);this[n]=c??this._$Ej?.get(n)??c,this._$Em=null}}requestUpdate(e,t,i,n=!1,o){if(e!==void 0){let a=this.constructor;if(n===!1&&(o=this[e]),i??=a.getPropertyOptions(e),!((i.hasChanged??St)(o,t)||i.useDefault&&i.reflect&&o===this._$Ej?.get(e)&&!this.hasAttribute(a._$Eu(e,i))))return;this.C(e,t,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:n,wrapped:o},a){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,a??t??this[e]),o!==!0||a!==void 0)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),n===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[n,o]of this._$Ep)this[n]=o;this._$Ep=void 0}let i=this.constructor.elementProperties;if(i.size>0)for(let[n,o]of i){let{wrapped:a}=o,c=this[n];a!==!0||this._$AL.has(n)||c===void 0||this.C(n,void 0,o,c)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(t)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(e){}firstUpdated(e){}};D.elementStyles=[],D.shadowRootOptions={mode:"open"},D[lt("elementProperties")]=new Map,D[lt("finalized")]=new Map,li?.({ReactiveElement:D}),(At.reactiveElementVersions??=[]).push("2.1.2")});function $e(s,e){if(!Yt(s)||!s.hasOwnProperty("raw"))throw Error("invalid template strings array");return me!==void 0?me.createHTML(e):e}function Y(s,e,t=s,i){if(e===O)return e;let n=i!==void 0?t._$Co?.[i]:t._$Cl,o=mt(e)?void 0:e._$litDirective$;return n?.constructor!==o&&(n?._$AO?.(!1),o===void 0?n=void 0:(n=new o(s),n._$AT(s,t,i)),i!==void 0?(t._$Co??=[])[i]=n:t._$Cl=n),n!==void 0&&(e=Y(s,n._$AS(s,e.values),n,i)),e}var Jt,ue,kt,me,we,I,ve,pi,q,ut,mt,Yt,di,qt,ht,fe,ge,F,_e,be,xe,Xt,r,Fi,Ui,O,p,ye,U,hi,ft,Vt,gt,X,Wt,Kt,Gt,Zt,ui,Ae,Q=v(()=>{Jt=globalThis,ue=s=>s,kt=Jt.trustedTypes,me=kt?kt.createPolicy("lit-html",{createHTML:s=>s}):void 0,we="$lit$",I=`lit$${Math.random().toFixed(9).slice(2)}$`,ve="?"+I,pi=`<${ve}>`,q=document,ut=()=>q.createComment(""),mt=s=>s===null||typeof s!="object"&&typeof s!="function",Yt=Array.isArray,di=s=>Yt(s)||typeof s?.[Symbol.iterator]=="function",qt=`[ 	
\f\r]`,ht=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,fe=/-->/g,ge=/>/g,F=RegExp(`>|${qt}(?:([^\\s"'>=/]+)(${qt}*=${qt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),_e=/'/g,be=/"/g,xe=/^(?:script|style|textarea|title)$/i,Xt=s=>(e,...t)=>({_$litType$:s,strings:e,values:t}),r=Xt(1),Fi=Xt(2),Ui=Xt(3),O=Symbol.for("lit-noChange"),p=Symbol.for("lit-nothing"),ye=new WeakMap,U=q.createTreeWalker(q,129);hi=(s,e)=>{let t=s.length-1,i=[],n,o=e===2?"<svg>":e===3?"<math>":"",a=ht;for(let c=0;c<t;c++){let l=s[c],u,d,m=-1,b=0;for(;b<l.length&&(a.lastIndex=b,d=a.exec(l),d!==null);)b=a.lastIndex,a===ht?d[1]==="!--"?a=fe:d[1]!==void 0?a=ge:d[2]!==void 0?(xe.test(d[2])&&(n=RegExp("</"+d[2],"g")),a=F):d[3]!==void 0&&(a=F):a===F?d[0]===">"?(a=n??ht,m=-1):d[1]===void 0?m=-2:(m=a.lastIndex-d[2].length,u=d[1],a=d[3]===void 0?F:d[3]==='"'?be:_e):a===be||a===_e?a=F:a===fe||a===ge?a=ht:(a=F,n=void 0);let C=a===F&&s[c+1].startsWith("/>")?" ":"";o+=a===ht?l+pi:m>=0?(i.push(u),l.slice(0,m)+we+l.slice(m)+I+C):l+I+(m===-2?c:C)}return[$e(s,o+(s[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]},ft=class s{constructor({strings:e,_$litType$:t},i){let n;this.parts=[];let o=0,a=0,c=e.length-1,l=this.parts,[u,d]=hi(e,t);if(this.el=s.createElement(u,i),U.currentNode=this.el.content,t===2||t===3){let m=this.el.content.firstChild;m.replaceWith(...m.childNodes)}for(;(n=U.nextNode())!==null&&l.length<c;){if(n.nodeType===1){if(n.hasAttributes())for(let m of n.getAttributeNames())if(m.endsWith(we)){let b=d[a++],C=n.getAttribute(m).split(I),N=/([.?@])?(.*)/.exec(b);l.push({type:1,index:o,name:N[2],strings:C,ctor:N[1]==="."?Wt:N[1]==="?"?Kt:N[1]==="@"?Gt:X}),n.removeAttribute(m)}else m.startsWith(I)&&(l.push({type:6,index:o}),n.removeAttribute(m));if(xe.test(n.tagName)){let m=n.textContent.split(I),b=m.length-1;if(b>0){n.textContent=kt?kt.emptyScript:"";for(let C=0;C<b;C++)n.append(m[C],ut()),U.nextNode(),l.push({type:2,index:++o});n.append(m[b],ut())}}}else if(n.nodeType===8)if(n.data===ve)l.push({type:2,index:o});else{let m=-1;for(;(m=n.data.indexOf(I,m+1))!==-1;)l.push({type:7,index:o}),m+=I.length-1}o++}}static createElement(e,t){let i=q.createElement("template");return i.innerHTML=e,i}};Vt=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:i}=this._$AD,n=(e?.creationScope??q).importNode(t,!0);U.currentNode=n;let o=U.nextNode(),a=0,c=0,l=i[0];for(;l!==void 0;){if(a===l.index){let u;l.type===2?u=new gt(o,o.nextSibling,this,e):l.type===1?u=new l.ctor(o,l.name,l.strings,this,e):l.type===6&&(u=new Zt(o,this,e)),this._$AV.push(u),l=i[++c]}a!==l?.index&&(o=U.nextNode(),a++)}return U.currentNode=q,n}p(e){let t=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}},gt=class s{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,n){this.type=2,this._$AH=p,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=n,this._$Cv=n?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Y(this,e,t),mt(e)?e===p||e==null||e===""?(this._$AH!==p&&this._$AR(),this._$AH=p):e!==this._$AH&&e!==O&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):di(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==p&&mt(this._$AH)?this._$AA.nextSibling.data=e:this.T(q.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:i}=e,n=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=ft.createElement($e(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===n)this._$AH.p(t);else{let o=new Vt(n,this),a=o.u(this.options);o.p(t),this.T(a),this._$AH=o}}_$AC(e){let t=ye.get(e.strings);return t===void 0&&ye.set(e.strings,t=new ft(e)),t}k(e){Yt(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,i,n=0;for(let o of e)n===t.length?t.push(i=new s(this.O(ut()),this.O(ut()),this,this.options)):i=t[n],i._$AI(o),n++;n<t.length&&(this._$AR(i&&i._$AB.nextSibling,n),t.length=n)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let i=ue(e).nextSibling;ue(e).remove(),e=i}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},X=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,n,o){this.type=1,this._$AH=p,this._$AN=void 0,this.element=e,this.name=t,this._$AM=n,this.options=o,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=p}_$AI(e,t=this,i,n){let o=this.strings,a=!1;if(o===void 0)e=Y(this,e,t,0),a=!mt(e)||e!==this._$AH&&e!==O,a&&(this._$AH=e);else{let c=e,l,u;for(e=o[0],l=0;l<o.length-1;l++)u=Y(this,c[i+l],t,l),u===O&&(u=this._$AH[l]),a||=!mt(u)||u!==this._$AH[l],u===p?e=p:e!==p&&(e+=(u??"")+o[l+1]),this._$AH[l]=u}a&&!n&&this.j(e)}j(e){e===p?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},Wt=class extends X{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===p?void 0:e}},Kt=class extends X{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==p)}},Gt=class extends X{constructor(e,t,i,n,o){super(e,t,i,n,o),this.type=5}_$AI(e,t=this){if((e=Y(this,e,t,0)??p)===O)return;let i=this._$AH,n=e===p&&i!==p||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,o=e!==p&&(i===p||n);n&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},Zt=class{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){Y(this,e)}},ui=Jt.litHtmlPolyfillSupport;ui?.(ft,gt),(Jt.litHtmlVersions??=[]).push("3.3.3");Ae=(s,e,t)=>{let i=t?.renderBefore??e,n=i._$litPart$;if(n===void 0){let o=t?.renderBefore??null;i._$litPart$=n=new gt(e.insertBefore(ut(),o),o,void 0,t??{})}return n._$AI(s),n}});var Qt,S,mi,Se=v(()=>{dt();dt();Q();Q();Qt=globalThis,S=class extends D{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Ae(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return O}};S._$litElement$=!0,S.finalized=!0,Qt.litElementHydrateSupport?.({LitElement:S});mi=Qt.litElementPolyfillSupport;mi?.({LitElement:S});(Qt.litElementVersions??=[]).push("4.2.2")});var ke=v(()=>{});var T=v(()=>{dt();Q();Se();ke()});var _,Ee=v(()=>{_=s=>(e,t)=>{t!==void 0?t.addInitializer(()=>{customElements.define(s,e)}):customElements.define(s,e)}});function y(s){return(e,t)=>typeof t=="object"?gi(s,e,t):((i,n,o)=>{let a=n.hasOwnProperty(o);return n.constructor.createProperty(o,i),a?Object.getOwnPropertyDescriptor(n,o):void 0})(s,e,t)}var fi,gi,te=v(()=>{dt();fi={attribute:!0,type:String,converter:pt,reflect:!1,hasChanged:St},gi=(s=fi,e,t)=>{let{kind:i,metadata:n}=t,o=globalThis.litPropertyMetadata.get(n);if(o===void 0&&globalThis.litPropertyMetadata.set(n,o=new Map),i==="setter"&&((s=Object.create(s)).wrapped=!0),o.set(t.name,s),i==="accessor"){let{name:a}=t;return{set(c){let l=e.get.call(this);e.set.call(this,c),this.requestUpdate(a,l,s,!0,c)},init(c){return c!==void 0&&this.C(a,void 0,s,c),c}}}if(i==="setter"){let{name:a}=t;return function(c){let l=this[a];e.call(this,c),this.requestUpdate(a,l,s,!0,c)}}throw Error("Unsupported decorator location: "+i)}});function w(s){return y({...s,state:!0,attribute:!1})}var Ce=v(()=>{te();});var Te=v(()=>{});var V,tt=v(()=>{V=(s,e,t)=>(t.configurable=!0,t.enumerable=!0,Reflect.decorate&&typeof e!="object"&&Object.defineProperty(s,e,t),t)});function ze(s,e){return(t,i,n)=>{let o=a=>a.renderRoot?.querySelector(s)??null;if(e){let{get:a,set:c}=typeof i=="object"?t:n??(()=>{let l=Symbol();return{get(){return this[l]},set(u){this[l]=u}}})();return V(t,i,{get(){let l=a.call(this);return l===void 0&&(l=o(this),(l!==null||this.hasUpdated)&&c.call(this,l)),l}})}return V(t,i,{get(){return o(this)}})}}var Me=v(()=>{tt();});var Oe=v(()=>{tt();});var He=v(()=>{tt();});var Pe=v(()=>{tt();});var Ne=v(()=>{tt();});var z=v(()=>{Ee();te();Ce();Te();Me();Oe();He();Pe();Ne()});var Ie={};ti(Ie,{FaceplateClimateCardEditor:()=>W});var De,Si,ki,Ei,Ci,Ti,W,ee=v(()=>{"use strict";T();z();vt();De=["select","input_select"],Si=["switch","input_boolean","light","select","input_select","number","input_number"],ki=(s,e)=>[{name:"entity",required:!0,selector:{entity:{domain:"climate"}}},{name:"name",selector:{text:{}}},{name:"layout",selector:{select:{mode:"dropdown",options:[{value:"row",label:"Row (single line)"},{value:"compact",label:"Compact"},{value:"standard",label:"Standard"},{value:"large",label:"Large"}]}}},{name:"current_temperature_entity",selector:{entity:{domain:["sensor","number","input_number"]}}},{name:"outdoor_temperature_entity",selector:{entity:{domain:["sensor","number","input_number"]}}},...e.length?[{name:"default_mode",selector:{select:{mode:"dropdown",options:e.filter(t=>t!=="off").map(t=>({value:t,label:t.replace(/_/g," ").replace(/\b\w/g,i=>i.toUpperCase())}))}}},{name:"hvac_modes",selector:{select:{multiple:!0,mode:"list",options:e.map(t=>({value:t,label:t.replace(/_/g," ").replace(/\b\w/g,i=>i.toUpperCase())}))}}}]:[],{type:"grid",name:"",schema:[{name:"show_name",selector:{boolean:{}}},{name:"show_current_temperature",selector:{boolean:{}}},{name:"show_controls",selector:{boolean:{}}},{name:"show_fan",selector:{boolean:{}}},{name:"show_vertical_swing",selector:{boolean:{}}},{name:"show_horizontal_swing",selector:{boolean:{}}},{name:"show_settings",selector:{boolean:{}}}]},{type:"expandable",title:"Swing entity overrides",icon:"mdi:tune",schema:[{name:"vertical_swing_entity",selector:{entity:{domain:De}}},{name:"horizontal_swing_entity",selector:{entity:{domain:De}}}]},{type:"expandable",title:"Settings popup",icon:"mdi:tune-variant",schema:[{name:"setting_entities",selector:s?{object:{}}:{entity:{multiple:!0,domain:Si}}}]},{name:"step",selector:{number:{min:.1,max:5,step:.1,mode:"box"}}}],Ei={entity:"Climate entity (required)",name:"Name",layout:"Size / layout",current_temperature_entity:"Current temperature entity (optional)",outdoor_temperature_entity:"Outdoor temperature entity (optional)",hvac_modes:"Modes to offer",default_mode:"Default mode (power button)",show_name:"Show name",show_current_temperature:"Show current temperature",show_controls:"Show buttons",show_fan:"Show fan control",show_vertical_swing:"Show vertical swing",show_horizontal_swing:"Show horizontal swing",show_settings:"Show settings popup",vertical_swing_entity:"Vertical swing entity",horizontal_swing_entity:"Horizontal swing entity",setting_entities:"Entities in settings popup",step:"Temperature step"},Ci={current_temperature_entity:"Overrides the temperature reported by the climate entity",outdoor_temperature_entity:"Shown on the display next to the current temperature",hvac_modes:"Untick modes your unit can't actually do. Empty = offer all of them",show_controls:"Off gives a larger status-only display with no buttons",default_mode:"Pressing power turns the unit on to this mode. Hold the button to pick any mode",vertical_swing_entity:"Use a select entity instead of the climate swing_mode attribute",horizontal_swing_entity:"Use a select entity instead of the climate swing_horizontal_mode attribute",setting_entities:"To rename an item, use YAML: - entity: switch.x, name: Display light",step:"Defaults to the entity's own step"},Ti={show_name:!0,show_current_temperature:!0,show_controls:!0,show_fan:!0,show_vertical_swing:!0,show_horizontal_swing:!0,show_settings:!0},W=class extends S{setConfig(e){this._config=e}render(){if(!this.hass||!this._config)return p;let e=!!this._config.setting_entities?.some(i=>typeof i!="string"),t=this.hass.states[this._config.entity]?.attributes.hvac_modes??[];return r`
      <ha-form
        .hass=${this.hass}
        .data=${{...Ti,...this._config}}
        .schema=${ki(e,t)}
        .computeLabel=${i=>Ei[i.name]??i.name}
        .computeHelper=${i=>Ci[i.name]}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `}_valueChanged(e){e.stopPropagation();let t={...e.detail.value};for(let[i,n]of Object.entries(t))(n===""||Array.isArray(n)&&n.length===0)&&delete t[i];this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0}))}};h([y({attribute:!1})],W.prototype,"hass",2),h([w()],W.prototype,"_config",2),W=h([_(yt)],W)});var ei="https://github.com/bl0ckstat/faceplate-cards";function A(s){window.customCards=window.customCards||[],!window.customCards.some(e=>e.type===s.type)&&window.customCards.push({preview:!0,documentationURL:ei,...s})}vt();T();z();Q();var Et={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Ct=s=>(...e)=>({_$litDirective$:s,values:e}),et=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}};var f=Ct(class extends et{constructor(s){if(super(s),s.type!==Et.ATTRIBUTE||s.name!=="class"||s.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(s){return" "+Object.keys(s).filter(e=>s[e]).join(" ")+" "}update(s,[e]){if(this.st===void 0){this.st=new Set,s.strings!==void 0&&(this.nt=new Set(s.strings.join(" ").split(/\s/).filter(i=>i!=="")));for(let i in e)e[i]&&!this.nt?.has(i)&&this.st.add(i);return this.render(e)}let t=s.element.classList;for(let i of this.st)i in e||(t.remove(i),this.st.delete(i));for(let i in e){let n=!!e[i];n===this.st.has(i)||this.nt?.has(i)||(n?(t.add(i),this.st.add(i)):(t.remove(i),this.st.delete(i)))}return O}});Q();var Re="important",_i=" !"+Re,M=Ct(class extends et{constructor(s){if(super(s),s.type!==Et.ATTRIBUTE||s.name!=="style"||s.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(s){return Object.keys(s).reduce((e,t)=>{let i=s[t];return i==null?e:e+`${t=t.includes("-")?t:t.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${i};`},"")}update(s,[e]){let{style:t}=s.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(e)),this.render(e);for(let i of this.ft)e[i]==null&&(this.ft.delete(i),i.includes("-")?t.removeProperty(i):t[i]=null);for(let i in e){let n=e[i];if(n!=null){this.ft.add(i);let o=typeof n=="string"&&n.endsWith(_i);i.includes("-")||o?t.setProperty(i,o?n.slice(0,-11):n,o?Re:""):t[i]=n}}return O}});vt();T();var bi=g`
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
`,yi=g`
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
`,wi=g`
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
`,vi=g`
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
`,xi=g`
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
`,$i=g`
  /* A native modal dialog, so the popup lands in the browser's top layer
     rather than competing on z-index inside this card's stacking context:
     each card in a Home Assistant grid establishes its own stacking context,
     so a popup drawn inside one card paints under any card that follows it. */
  .popup-backdrop {
    border: none;
    padding: 16px;
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
    max-height: min(90vh, 560px);
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  .popup-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 14px 8px;
    font-size: 15px;
    font-weight: 500;
  }
  .close {
    width: 40px;
    height: 40px;
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
`,Ai=g`
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
`,x=[bi,yi,wi,vi,xi,$i,Ai];var H=class extends S{constructor(){super(...arguments);this._popup=null;this._longPressed=!1;this._pressStart=()=>{this._longPressed=!1,window.clearTimeout(this._pressTimer),this._pressTimer=window.setTimeout(()=>{this._longPressed=!0,this._popup="config"},500)};this._pressEnd=()=>{window.clearTimeout(this._pressTimer)};this._powerPress=()=>{if(this._longPressed){this._longPressed=!1;return}if(!this._isOff){this._setHvacMode("off");return}let t=this._defaultMode();t?this._setHvacMode(t):this._popup="config"}}static async getConfigElement(){return await Promise.resolve().then(()=>(ee(),Ie)),document.createElement(yt)}static getStubConfig(t){return{entity:Object.keys(t.states).find(n=>n.startsWith("climate."))??""}}setConfig(t){if(!t.entity||!t.entity.startsWith("climate."))throw new Error("Please define a climate entity");this._config=t}getCardSize(){let t=this._config?.layout;return t==="row"?1:t==="compact"?2:3}getGridOptions(){return this._config?.layout==="row"?{columns:12,rows:1,min_columns:6,min_rows:1}:{columns:6,rows:3,min_columns:3,min_rows:2}}disconnectedCallback(){super.disconnectedCallback(),window.clearTimeout(this._commitTimer),window.clearTimeout(this._pressTimer)}get _stateObj(){return this._config&&this.hass?this.hass.states[this._config.entity]:void 0}_show(t){return this._config?.[t]!==!1}_selectSource(t){let i=this.hass?.states[t];if(!i)return;let o=t.split(".")[0]==="input_select"?"input_select":"select";return{options:i.attributes.options??[],current:i.state,set:a=>this.hass.callService(o,"select_option",{entity_id:t,option:a})}}_climateSource(t,i,n){let o=this._stateObj;if(o?.attributes[t]?.length)return{options:o.attributes[t],current:o.attributes[i],set:a=>this.hass.callService("climate",n,{entity_id:o.entity_id,[i]:a})}}_fanSections(){let t=[];if(this._show("show_fan")){let n=this._climateSource("fan_modes","fan_mode","set_fan_mode");n&&t.push({key:"fan",title:"Fan speed",segmentIcon:jt(n.current??""),icon:jt,source:n})}let i=this._show("show_horizontal_swing")?this._config?.horizontal_swing_entity?this._selectSource(this._config.horizontal_swing_entity):this._climateSource("swing_horizontal_modes","swing_horizontal_mode","set_swing_horizontal_mode"):void 0;if(this._show("show_vertical_swing")){let n=this._config?.vertical_swing_entity?this._selectSource(this._config.vertical_swing_entity):this._climateSource("swing_modes","swing_mode","set_swing_mode");if(n?.options.length){let o=!i?.options.length&&n.options.some(c=>/horiz|both/i.test(c)),a=o?re:c=>wt(c,!1);t.push({key:"vswing",title:o?"Swing":"Vertical swing",segmentIcon:a(n.current??""),icon:a,source:n})}}return i?.options.length&&t.push({key:"hswing",title:"Horizontal swing",segmentIcon:wt(i.current??"",!0),icon:n=>wt(n,!0),source:i}),t}_hasSettings(){return this._show("show_settings")?!!(this._stateObj?.attributes.preset_modes?.length||this._config?.setting_entities?.length):!1}get _isOff(){return this._stateObj?.state==="off"}get _step(){return this._config?.step??this._stateObj?.attributes.target_temp_step??.5}get _targetTemp(){return this._localTarget??this._stateObj?.attributes.temperature}get _currentTemp(){let t=this._config?.current_temperature_entity;if(t){let i=this.hass?.states[t],n=i?parseFloat(i.state):NaN;return Number.isFinite(n)?n:void 0}return this._stateObj?.attributes.current_temperature}get _outdoorTemp(){let t=this._config?.outdoor_temperature_entity;if(!t)return;let i=this.hass?.states[t],n=i?parseFloat(i.state):NaN;return Number.isFinite(n)?n:void 0}get _unit(){return this.hass?.config.unit_system.temperature??"\xB0C"}_modeName(t){return this.hass?.localize(`component.climate.entity_component._.state.${t}`)||R(t)}willUpdate(){this._localTarget!==void 0&&this._stateObj?.attributes.temperature===this._localTarget&&(this._localTarget=void 0)}_adjustTemp(t){let i=this._stateObj;if(!i)return;let n=i.attributes,o=this._targetTemp??n.min_temp??20,a=n.min_temp??7,c=n.max_temp??35,l=this._step,u=Math.min(c,Math.max(a,o+t*l)),d=`${l}`.split(".")[1]?.length??0;this._localTarget=parseFloat(u.toFixed(d)),window.clearTimeout(this._commitTimer),this._commitTimer=window.setTimeout(()=>{this.hass.callService("climate","set_temperature",{entity_id:i.entity_id,temperature:this._localTarget})},700)}_availableModes(){let t=this._config?.hvac_modes;return[...this._stateObj?.attributes.hvac_modes??[]].filter(i=>!t?.length||t.includes(i)).sort((i,n)=>Lt.indexOf(i)-Lt.indexOf(n))}_defaultMode(){let t=this._availableModes().filter(n=>n!=="off"),i=this._config?.default_mode;return i&&t.includes(i)?i:t.length===1?t[0]:void 0}_setHvacMode(t){this.hass.callService("climate","set_hvac_mode",{entity_id:this._config.entity,hvac_mode:t})}render(){if(!this._config||!this.hass)return p;let t=this._stateObj;if(!t)return r`<ha-card class="error">
        Entity not found: ${this._config.entity}
      </ha-card>`;let i=t.state==="unavailable",n=t.state,o=J[n]??J.off,a=this._fanSections(),c=this._config.layout??"standard",l=this._config.name??t.attributes.friendly_name??"",u=t.attributes.preset_mode,d=this._show("show_controls"),m=this._isOff||i;return r`
      <ha-card
        class=${f({[`layout-${c}`]:!0,"display-only":!d})}
      >
        <!-- With the buttons hidden the display is the only thing left to
             touch, so it becomes the way into the config sheet. -->
        <div
          class=${f({lcd:!0,off:m,tappable:!d})}
          @click=${()=>{d||(this._popup="config")}}
        >
          <div class="lcd-top">
            ${this._show("show_name")?r`<span class="name" title=${l}>${l}</span>`:r`<span></span>`}
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
            <span class=${f({readout:!0,dimmed:m})}>
              ${i||this._targetTemp===void 0?"--":this._formatNumber(this._targetTemp)}<span class="unit"
                >${this._unit}</span
              >
            </span>
            <span class="badge" style=${M({color:o})}>
              <ha-icon icon=${rt[n]??"mdi:thermostat"}></ha-icon>
              <span>${i?"Unavailable":this._modeName(n)}</span>
            </span>
          </div>
          ${a.length||u?r`<div class="lcd-status">
                ${a.map(b=>r`<button
                    class="segment"
                    title=${b.title}
                    @click=${()=>this._popup="config"}
                  >
                    <ha-icon icon=${b.segmentIcon}></ha-icon>
                    <span
                      >${m?"\u2014":R(b.source.current??"\u2014")}</span
                    >
                  </button>`)}
                ${u&&u!=="none"&&this._hasSettings()?r`<button
                      class="segment"
                      title="Preset"
                      @click=${()=>this._popup="config"}
                    >
                      <ha-icon icon="mdi:star-outline"></ha-icon>
                      <span>${R(u)}</span>
                    </button>`:p}
              </div>`:p}
        </div>

        ${d?r`<div class="controls">
          <button
            class="ctl accent"
            title="Lower temperature"
            .disabled=${i}
            @click=${()=>this._adjustTemp(-1)}
          >
            <ha-icon icon="mdi:minus"></ha-icon>
          </button>
          <button
            class="ctl accent"
            title="Raise temperature"
            .disabled=${i}
            @click=${()=>this._adjustTemp(1)}
          >
            <ha-icon icon="mdi:plus"></ha-icon>
          </button>
          ${t.attributes.hvac_modes?.length?r`<button
                class=${f({ctl:!0,on:!this._isOff,off:this._isOff})}
                title="Power (hold to choose mode)"
                style=${M(this._isOff?{}:{color:o})}
                .disabled=${i}
                @click=${this._powerPress}
                @pointerdown=${this._pressStart}
                @pointerup=${this._pressEnd}
                @pointerleave=${this._pressEnd}
                @pointercancel=${this._pressEnd}
                @contextmenu=${b=>b.preventDefault()}
              >
                <ha-icon
                  icon=${rt[n]??"mdi:thermostat"}
                ></ha-icon>
              </button>`:p}
          ${a.length?r`<button
                class="ctl"
                title="Fan & swing"
                .disabled=${i}
                @click=${()=>this._popup="config"}
              >
                <ha-icon icon="mdi:fan"></ha-icon>
              </button>`:p}
          ${this._hasSettings()?r`<button
                class="ctl"
                title="Settings"
                .disabled=${i}
                @click=${()=>this._popup="config"}
              >
                <ha-icon icon="mdi:dots-horizontal"></ha-icon>
              </button>`:p}
        </div>`:p}
        ${this._renderPopup(a)}
      </ha-card>
    `}_formatNumber(t){return t.toLocaleString(this.hass?.language??"en",{maximumFractionDigits:1})}_renderPopup(t){if(!this._popup)return p;let i=()=>this._popup=null,n=this._stateObj,o=n.state==="unavailable",a=this._config?.name??n.attributes.friendly_name??"Settings",c=J[n.state]??J.off,l=this._isOff||o,u=r`
      <!-- The same readout as the card's face: measured temperatures and mode
           above, setpoint across the middle, fan and swing along the bottom. -->
      <div class="popup-lcd ${l?"off":""}">
        <div class="lcd-top">
          <span class="temps">
            ${this._show("show_current_temperature")&&this._currentTemp!==void 0?r`<span class="aux"
                  >Current ${this._formatNumber(this._currentTemp)}°</span
                >`:p}
            ${this._outdoorTemp!==void 0?r`<span class="aux"
                  >Outside ${this._formatNumber(this._outdoorTemp)}°</span
                >`:p}
          </span>
          <span class="badge" style=${M({color:c})}>
            <ha-icon
              icon=${rt[n.state]??"mdi:thermostat"}
            ></ha-icon>
            <span>${o?"Unavailable":this._modeName(n.state)}</span>
          </span>
        </div>
        <div class="popup-lcd-center">
          <button
            class="ctl accent"
            title="Lower temperature"
            .disabled=${o}
            @click=${()=>this._adjustTemp(-1)}
          >
            <ha-icon icon="mdi:minus"></ha-icon>
          </button>
          <span class=${f({"temp-value":!0,dimmed:l})}>
            ${o||this._targetTemp===void 0?"--":this._formatNumber(this._targetTemp)}<span class="unit"
              >${this._unit}</span
            >
          </span>
          <button
            class="ctl accent"
            title="Raise temperature"
            .disabled=${o}
            @click=${()=>this._adjustTemp(1)}
          >
            <ha-icon icon="mdi:plus"></ha-icon>
          </button>
        </div>
        ${t.length?r`<div class="lcd-status">
              ${t.map(d=>r`<span class="segment">
                  <ha-icon icon=${d.segmentIcon}></ha-icon>
                  <span>${l?"\u2014":R(d.source.current??"\u2014")}</span>
                </span>`)}
            </div>`:p}
      </div>

      <div class="section-title">Mode</div>
      <div class="chips">
        ${this._availableModes().map(d=>r`<button
            class=${f({chip:!0,"mode-chip":!0,active:d===n.state})}
            style=${M(d===n.state?{color:J[d]??""}:{})}
            @click=${()=>this._setHvacMode(d)}
          >
            <ha-icon icon=${rt[d]??"mdi:thermostat"}></ha-icon>
            ${this._modeName(d)}
          </button>`)}
      </div>

      ${t.map(d=>r`
          <div class="section-title">${d.title}</div>
          <div class="chips">
            ${d.source.options.map(m=>{let b=d.key==="fan"?ae(m):null;return r`<button
                class=${f({chip:!0,"chip-icon":b!==null,active:m===d.source.current})}
                title=${R(m)}
                @click=${()=>d.source.set(m)}
              >
                ${this._renderFanChipIcon(m,d.icon(m),b)}
                ${b===null?R(m):p}
              </button>`})}
          </div>
        `)}
      ${this._renderSettingsBody()}
    `;return r`
      <dialog class="popup-backdrop" @click=${i} @close=${i}>
        <div
          class="popup"
          aria-label=${a}
          @click=${d=>d.stopPropagation()}
        >
          <div class="popup-header">
            <span>${a}</span>
            <button class="close" @click=${i}>
              <ha-icon icon="mdi:close"></ha-icon>
            </button>
          </div>
          <div class="popup-body">${u}</div>
        </div>
      </dialog>
    `}updated(){let t=this._dialogEl;t&&(this._popup&&!t.open?typeof t.showModal=="function"?t.showModal():t.setAttribute("open",""):!this._popup&&t.open&&(typeof t.close=="function"?t.close():t.removeAttribute("open")))}_renderFanChipIcon(t,i,n){return n===null?r`<ha-icon icon=${i}></ha-icon>`:n==="auto"?r`<ha-icon icon="mdi:fan-auto"></ha-icon>`:r`<span class="fan-glyph">
      <ha-icon icon="mdi:fan"></ha-icon>
      <span class="fan-glyph-num">${n}</span>
    </span>`}_renderSettingsBody(){let t=this._stateObj,i=t.attributes.preset_modes??[],n=this._config?.setting_entities??[];return r`
      ${i.length?r`<div class="section-title">Preset</div>
            <div class="chips">
              ${i.map(o=>r`<button
                  class=${f({chip:!0,active:o===t.attributes.preset_mode})}
                  @click=${()=>this.hass.callService("climate","set_preset_mode",{entity_id:t.entity_id,preset_mode:o})}
                >
                  ${R(o)}
                </button>`)}
            </div>`:p}
      ${n.map(o=>this._renderSettingRow(o))}
    `}_renderSettingRow(t){let i=typeof t=="string"?t:t.entity,n=typeof t=="string"?void 0:t.name,o=this.hass.states[i];if(!o)return r`<div class="row">
        <span class="row-name">${n??i}</span>
        <span class="row-missing">not found</span>
      </div>`;let a=i.split(".")[0],c=n??o.attributes.friendly_name??i;if(["switch","input_boolean","light"].includes(a))return r`<div class="row">
        <span class="row-name">${c}</span>
        <ha-switch
          .checked=${o.state==="on"}
          @change=${()=>this.hass.callService("homeassistant","toggle",{entity_id:i})}
        ></ha-switch>
      </div>`;if(["select","input_select"].includes(a)){let l=a==="input_select"?"input_select":"select",u=o.attributes.options??[];return r`<div class="row column">
        <span class="row-name">${c}</span>
        <div class="chips">
          ${u.map(d=>r`<button
              class=${f({chip:!0,active:d===o.state})}
              @click=${()=>this.hass.callService(l,"select_option",{entity_id:i,option:d})}
            >
              ${R(d)}
            </button>`)}
        </div>
      </div>`}if(["number","input_number"].includes(a)){let l=a==="input_number"?"input_number":"number",u=parseFloat(o.state),d=o.attributes.step??1,m=b=>this.hass.callService(l,"set_value",{entity_id:i,value:Math.min(o.attributes.max??1/0,Math.max(o.attributes.min??-1/0,b))});return r`<div class="row">
        <span class="row-name">${c}</span>
        <div class="stepper">
          <button class="ctl mini" @click=${()=>m(u-d)}>
            <ha-icon icon="mdi:minus"></ha-icon>
          </button>
          <span class="stepper-value"
            >${o.state}${o.attributes.unit_of_measurement??""}</span
          >
          <button class="ctl mini" @click=${()=>m(u+d)}>
            <ha-icon icon="mdi:plus"></ha-icon>
          </button>
        </div>
      </div>`}return r`<div class="row">
      <span class="row-name">${c}</span>
      <span>${this.hass.formatEntityState?.(o)??o.state}</span>
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
        --faceplate-readout-size: 26px;
        --faceplate-button-size: 38px;
        --faceplate-button-max: 42px;
        --faceplate-icon-size: 20px;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        padding: 6px 8px;
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
      /* Buttons must not wrap here — wrapping is what makes the card tall. */
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
    `],h([y({attribute:!1})],H.prototype,"hass",2),h([w()],H.prototype,"_config",2),h([w()],H.prototype,"_popup",2),h([ze("dialog.popup-backdrop")],H.prototype,"_dialogEl",2),h([w()],H.prototype,"_localTarget",2),H=h([_(bt)],H);ee();T();z();T();z();var $=class extends S{static{this.styles=x}static{this.requiresEntity=!0}setConfig(e){let t=this.constructor;if(t.requiresEntity){let i=t.entityDomains,n=e.entity?.split(".")[0];if(!e.entity||i&&!i.includes(n))throw new Error(i?`Please define a ${i.join(" or ")} entity`:"Please define an entity")}this._config=e}getCardSize(){return 2}get _stateObj(){return this._config?.entity&&this.hass?this.hass.states[this._config.entity]:void 0}_show(e){return this._config?.[e]!==!1}_missingEntity(){return r`<ha-card class="error">
      Entity not found: ${this._config?.entity}
    </ha-card>`}_guard(){return!this._config||!this.hass?p:this.constructor.requiresEntity&&!this._stateObj?this._missingEntity():null}};h([y({attribute:!1})],$.prototype,"hass",2),h([w()],$.prototype,"_config",2);T();z();var k=class extends S{constructor(){super(...arguments);this.labels={};this.helpers={};this.defaults={}}setConfig(t){this._config=t}render(){return!this.hass||!this._config?p:r`
      <ha-form
        .hass=${this.hass}
        .data=${{...this.defaults,...this._config}}
        .schema=${this.schema(this._config,this.hass)}
        .computeLabel=${t=>this.labels[t.name]??t.name}
        .computeHelper=${t=>this.helpers[t.name]}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `}_valueChanged(t){t.stopPropagation();let i={...t.detail.value};for(let[n,o]of Object.entries(i))(o===""||Array.isArray(o)&&o.length===0)&&delete i[n];this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:i},bubbles:!0,composed:!0}))}};h([y({attribute:!1})],k.prototype,"hass",2),h([w()],k.prototype,"_config",2);var Le={type:"expandable",title:"Actions",icon:"mdi:gesture-tap",schema:[{name:"tap_action",selector:{ui_action:{}}},{name:"hold_action",selector:{ui_action:{}}},{name:"double_tap_action",selector:{ui_action:{}}}]},Tt={tap_action:"Tap action",hold_action:"Hold action",double_tap_action:"Double tap action"};var zi={lock:"lock",cover:"cover",group:"homeassistant"};function ie(s,e,t){s.dispatchEvent(new CustomEvent(e,{detail:t,bubbles:!0,composed:!0}))}function K(s,e){ie(s,"hass-more-info",{entityId:e})}function G(s,e,t,i){let n=`${i}_action`,o=i==="tap"?{action:t.entity?"toggle":"none"}:i==="hold"?{action:t.entity?"more-info":"none"}:{action:"none"},a=t[n]??o;switch(a.action){case"none":return;case"more-info":{let c=a.entity??t.entity;c&&K(s,c);return}case"toggle":{let c=a.entity??t.entity;if(!c)return;let l=c.split(".")[0];e.callService(zi[l]??"homeassistant","toggle",{entity_id:c});return}case"navigate":{if(!a.navigation_path)return;history.pushState(null,"",a.navigation_path),ie(s,"location-changed",{replace:!1});return}case"url":{a.url_path&&window.open(a.url_path,"_blank","noreferrer");return}case"assist":ie(s,"show-dialog",{dialogTag:"ha-voice-command-dialog",dialogImport:()=>Promise.resolve(),dialogParams:{}});return;case"call-service":case"perform-action":{let c=a.perform_action??a.service;if(!c||!c.includes("."))return;let[l,u]=c.split(".",2);e.callService(l,u,a.data??a.service_data??{},a.target);return}}}var it=class{constructor(e,t={}){this._run=e;this._opts=t;this._held=!1;this._lastTap=0;this.down=()=>{this._held=!1,this._opts.hasHold&&(window.clearTimeout(this._timer),this._timer=window.setTimeout(()=>{this._held=!0,this._run("hold")},this._opts.holdMs??500))};this.up=()=>{window.clearTimeout(this._timer)};this.click=e=>{if(e.stopPropagation(),this._held){this._held=!1;return}if(!this._opts.hasDoubleTap){this._run("tap");return}let t=Date.now();if(t-this._lastTap<300){window.clearTimeout(this._tapTimer),this._lastTap=0,this._run("double_tap");return}this._lastTap=t,this._tapTimer=window.setTimeout(()=>this._run("tap"),300)}}destroy(){window.clearTimeout(this._timer),window.clearTimeout(this._tapTimer)}};function ne(s){return s.replace(/[_-]+/g," ").replace(/\b\w/g,e=>e.toUpperCase())}function P(s,e,t=1){return e.toLocaleString(s?.language??"en",{maximumFractionDigits:t})}function zt(s,e){if(!e)return"";if(s?.formatEntityState)try{return s.formatEntityState(e)}catch{}let t=e.entity_id.split(".")[0];return s?.localize(`component.${t}.entity_component._.state.${e.state}`)||ne(e.state)}function L(s,e){return e??s?.attributes.friendly_name??s?.entity_id??""}var je="faceplate-button-card",Be="faceplate-button-card-editor",nt=class extends ${static async getConfigElement(){return document.createElement(Be)}static getStubConfig(){return{show_name:!0,show_icon:!0,tap_action:{action:"toggle"}}}getCardSize(){return 1}getGridOptions(){return{columns:4,rows:1,min_columns:2,min_rows:1}}setConfig(e){super.setConfig(e),this._handler?.destroy(),this._handler=new it(t=>this._run(t),{hasHold:!!e.hold_action||!!e.entity,hasDoubleTap:!!e.double_tap_action})}disconnectedCallback(){super.disconnectedCallback(),this._handler?.destroy()}_run(e){this.hass&&this._config&&G(this,this.hass,this._config,e)}render(){let e=this._guard();if(e!==null)return e;let t=this._config,i=this._stateObj,n=i?.state==="on"||i?.state==="open",o=i?.state==="unavailable",a=L(i,t.name),c=t.icon??i?.attributes.icon??this._domainIcon(n),l=t.show_name!==!1&&!!a,u=!!(t.show_state&&i);return r`
      <ha-card
        class=${f({unavailable:o,"with-name":l,"with-state":u})}
      >
        ${t.show_icon===!1?p:r`<button
              class=${f({ctl:!0,fill:!0,on:n&&!t.accent,off:!!i&&!n,accent:!!t.accent})}
              title=${a}
              aria-label=${a}
              style=${M(n&&!t.accent?{color:"var(--state-active-color, var(--primary-color))"}:{})}
              @click=${this._handler.click}
              @pointerdown=${this._handler.down}
              @pointerup=${this._handler.up}
              @pointerleave=${this._handler.up}
              @pointercancel=${this._handler.up}
              @contextmenu=${d=>d.preventDefault()}
            >
              ${t.icon_badge?r`<span class="glyph">
                    <ha-icon icon=${c}></ha-icon>
                    <span class="glyph-badge">${t.icon_badge}</span>
                  </span>`:r`<ha-icon icon=${c}></ha-icon>`}
            </button>`}
        ${l?r`<span class="label" title=${a}>${a}</span>`:p}
        ${u?r`<span class="label state"
              >${zt(this.hass,i)}</span
            >`:p}
      </ha-card>
    `}_domainIcon(e){switch(this._config?.entity?.split(".")[0]){case"light":return e?"mdi:lightbulb":"mdi:lightbulb-outline";case"switch":return"mdi:toggle-switch-outline";case"script":return"mdi:play";case"scene":return"mdi:palette";case"fan":return"mdi:fan";case"cover":return"mdi:window-shutter";case"climate":return"mdi:thermostat";case"media_player":return"mdi:speaker";default:return this._config?.tap_action?.action==="navigate"?"mdi:arrow-right-circle-outline":"mdi:gesture-tap-button"}}};nt.requiresEntity=!1,nt.styles=[...x,g`
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
        padding: 6px;
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
    `],nt=h([_(je)],nt);var Mt=class extends k{constructor(){super(...arguments);this.defaults={show_name:!0,show_icon:!0,show_state:!1};this.labels={entity:"Entity (optional)",name:"Name",icon:"Icon",show_name:"Show name",show_icon:"Show icon",show_state:"Show state",accent:"Accent colour",...Tt};this.helpers={entity:"Leave empty for a button that only navigates or runs an action",accent:"Fill the button with the theme's accent colour at all times"}}schema(t,i){return[{name:"entity",selector:{entity:{}}},{name:"name",selector:{text:{}}},{name:"icon",selector:{icon:{}}},{type:"grid",name:"",schema:[{name:"show_name",selector:{boolean:{}}},{name:"show_icon",selector:{boolean:{}}},{name:"show_state",selector:{boolean:{}}},{name:"accent",selector:{boolean:{}}}]},Le]}};Mt=h([_(Be)],Mt);A({type:je,name:"Faceplate Button",description:"A round tactile button that fills its tile \u2014 toggles, scripts, scenes and navigation"});T();z();var Fe="faceplate-tile-card",Ue="faceplate-tile-card-editor",_t=class extends ${constructor(){super(...arguments);this._iconTap=t=>{if(t.stopPropagation(),!this.hass||!this._config)return;let i=this._config.icon_tap_action;if(i){G(this,this.hass,{...this._config,tap_action:i},"tap");return}let n=this._config.entity.split(".")[0];if(["script","scene","button","input_button"].includes(n)){let o=n==="script"||n==="scene"?"turn_on":"press";this.hass.callService(n,o,{entity_id:this._config.entity});return}if(["light","switch","fan","input_boolean","media_player"].includes(n)){this.hass.callService("homeassistant","toggle",{entity_id:this._config.entity});return}K(this,this._config.entity)}}static async getConfigElement(){return document.createElement(Ue)}static getStubConfig(t){return{entity:Object.keys(t.states).find(n=>n.startsWith("light."))??Object.keys(t.states)[0]??""}}getCardSize(){return 1}getGridOptions(){return this._config?.vertical?{columns:3,rows:2,min_columns:2,min_rows:2}:{columns:6,rows:1,min_columns:3,min_rows:1}}setConfig(t){super.setConfig(t),this._rowHandler?.destroy(),this._rowHandler=new it(i=>this._run(i),{hasHold:!0,hasDoubleTap:!!t.double_tap_action})}disconnectedCallback(){super.disconnectedCallback(),this._rowHandler?.destroy()}_run(t){if(!this.hass||!this._config)return;let i=t==="tap"&&!this._config.tap_action?{...this._config,tap_action:{action:"more-info"}}:this._config;G(this,this.hass,i,t)}render(){let t=this._guard();if(t!==null)return t;let i=this._config,n=this._stateObj,o=["on","open","playing","home"].includes(n.state),a=n.state==="unavailable",c=L(n,i.name),l=i.icon??n.attributes.icon??"mdi:eye";return r`
      <ha-card
        class=${f({vertical:!!i.vertical,unavailable:a})}
        @click=${this._rowHandler.click}
        @pointerdown=${this._rowHandler.down}
        @pointerup=${this._rowHandler.up}
        @pointerleave=${this._rowHandler.up}
        @pointercancel=${this._rowHandler.up}
        @contextmenu=${u=>u.preventDefault()}
      >
        <button
          class=${f({ctl:!0,on:o&&!i.accent,off:!o,accent:!!i.accent})}
          title=${c}
          style=${M(o&&!i.accent?{color:"var(--state-active-color, var(--primary-color))"}:{})}
          @click=${this._iconTap}
        >
          <ha-icon icon=${l}></ha-icon>
        </button>
        <div class="text">
          <span class="primary" title=${c}>${c}</span>
          ${this._show("show_state")?r`<span class="secondary"
                >${zt(this.hass,n)}</span
              >`:p}
        </div>
      </ha-card>
    `}};_t.styles=[...x,g`
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
    `],_t=h([_(Fe)],_t);var Ot=class extends k{constructor(){super(...arguments);this.defaults={show_state:!0,vertical:!1};this.labels={entity:"Entity (required)",name:"Name",icon:"Icon",show_state:"Show state",vertical:"Vertical layout",accent:"Accent colour",icon_tap_action:"Icon tap action",...Tt};this.helpers={icon_tap_action:"Defaults to toggling, or running the script/scene. The rest of the row opens more-info"}}schema(){return[{name:"entity",required:!0,selector:{entity:{}}},{name:"name",selector:{text:{}}},{name:"icon",selector:{icon:{}}},{type:"grid",name:"",schema:[{name:"show_state",selector:{boolean:{}}},{name:"vertical",selector:{boolean:{}}},{name:"accent",selector:{boolean:{}}}]},{type:"expandable",title:"Actions",icon:"mdi:gesture-tap",schema:[{name:"icon_tap_action",selector:{ui_action:{}}},{name:"tap_action",selector:{ui_action:{}}},{name:"hold_action",selector:{ui_action:{}}},{name:"double_tap_action",selector:{ui_action:{}}}]}]}};Ot=h([_(Ue)],Ot);A({type:Fe,name:"Faceplate Tile",description:"An entity row with a tactile icon button, its name and its state in LCD type"});T();z();T();z();var E=class extends S{constructor(){super(...arguments);this.value=0;this.min=0;this.max=100;this.step=1;this.disabled=!1;this.unit="";this.hideValue=!1;this._down=t=>{this.disabled||(t.preventDefault(),this._pointerId=t.pointerId,t.target.setPointerCapture(t.pointerId),this._dragValue=this._valueFromEvent(t))};this._move=t=>{this.disabled||this._pointerId!==t.pointerId||(this._dragValue=this._valueFromEvent(t))};this._up=t=>{if(this.disabled||this._pointerId!==t.pointerId)return;let i=this._valueFromEvent(t);this._pointerId=void 0,this._dragValue=void 0,this.value=i,this.dispatchEvent(new CustomEvent("slider-change",{detail:{value:i},bubbles:!0,composed:!0}))};this._cancel=()=>{this._pointerId=void 0,this._dragValue=void 0}}get _shown(){return this._dragValue??this.value}_valueFromEvent(t){let i=this.renderRoot.querySelector(".track").getBoundingClientRect(),n=Math.min(1,Math.max(0,(t.clientX-i.left)/i.width)),o=this.min+n*(this.max-this.min),a=Math.round(o/this.step)*this.step;return Math.min(this.max,Math.max(this.min,a))}render(){let t=this.max-this.min||1,n=`${(Math.min(1,Math.max(0,(this._shown-this.min)/t))*100).toFixed(1)}%`;return r`
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
    `}};E.styles=g`
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
  `,h([y({type:Number})],E.prototype,"value",2),h([y({type:Number})],E.prototype,"min",2),h([y({type:Number})],E.prototype,"max",2),h([y({type:Number})],E.prototype,"step",2),h([y({type:Boolean})],E.prototype,"disabled",2),h([y({type:String})],E.prototype,"label",2),h([y({type:String})],E.prototype,"unit",2),h([y({type:String})],E.prototype,"fill",2),h([y({type:String})],E.prototype,"gradient",2),h([y({type:Boolean,attribute:"hide-value"})],E.prototype,"hideValue",2),h([w()],E.prototype,"_dragValue",2),E=h([_("faceplate-slider")],E);var qe="faceplate-light-card",Ve="faceplate-light-card-editor",Mi=2e3,Oi=6535,st=class extends ${constructor(){super(...arguments);this._toggle=()=>{this.hass.callService("light","toggle",{entity_id:this._config.entity})};this._setBrightness=t=>{let{min:i,max:n}=this._brightnessRange;this.hass.callService("light","turn_on",{entity_id:this._config.entity,brightness_pct:i+(n-i)*t.detail.value/100})};this._setColorTemp=t=>{this.hass.callService("light","turn_on",{entity_id:this._config.entity,color_temp_kelvin:Math.round(t.detail.value)})}}static async getConfigElement(){return document.createElement(Ve)}static getStubConfig(t){return{entity:Object.keys(t.states).find(n=>n.startsWith("light."))??"",show_brightness_control:!0}}getCardSize(){return 2}getGridOptions(){let t=this._config?.show_color_temp_control?4:3;this._config?.show_state===!1&&(t-=1),this._config?.show_controls===!1&&(t-=1);let i=this._config?.show_state===!1&&this._config?.show_controls===!1;return{columns:6,rows:Math.max(1,t),min_columns:3,min_rows:i?1:2}}get _on(){return this._stateObj?.state==="on"}get _brightnessRange(){let t=o=>typeof o=="number"&&o>=0&&o<=100?o:void 0,i=t(this._config?.min_brightness)??0,n=t(this._config?.max_brightness)??100;return n>i?{min:i,max:n}:{min:0,max:100}}get _brightness(){let t=this._stateObj?.attributes.brightness;if(typeof t!="number")return;let{min:i,max:n}=this._brightnessRange,o=t/255*100;return Math.min(100,Math.max(0,Math.round((o-i)/(n-i)*100)))}get _kelvinRange(){let t=this._stateObj?.attributes.min_color_temp_kelvin??Mi,i=this._stateObj?.attributes.max_color_temp_kelvin??Oi,n=this._config?.min_color_temp_kelvin,o=this._config?.max_color_temp_kelvin,a=typeof n=="number"?Math.max(t,n):t,c=typeof o=="number"?Math.min(i,o):i;return c>a?{min:a,max:c}:{min:t,max:i}}get _supportsBrightness(){return(this._stateObj?.attributes.supported_color_modes??[]).some(i=>i!=="onoff"&&i!=="unknown")}get _supportsColorTemp(){return(this._stateObj?.attributes.supported_color_modes??[]).includes("color_temp")}get _lightColor(){if(this._config?.use_light_color===!1||!this._on)return;let t=this._stateObj?.attributes.rgb_color;if(Array.isArray(t)&&t.length>=3)return`rgb(${t[0]}, ${t[1]}, ${t[2]})`;let i=this._stateObj?.attributes.color_temp_kelvin;if(typeof i=="number")return Ht(i)}render(){let t=this._guard();if(t!==null)return t;let i=this._config,n=this._stateObj,o=n.state==="unavailable",a=L(n,i.name),c=this._lightColor,l=this._brightness,u=i.icon??n.attributes.icon??(this._on?"mdi:lightbulb":"mdi:lightbulb-outline"),d=i.show_state===!1&&i.show_controls===!1,m=i.show_brightness_control!==!1&&this._supportsBrightness&&!o,b=i.show_color_temp_control===!0&&this._supportsColorTemp&&!o,{min:C,max:N}=this._kelvinRange,Xe=Math.min(N,Math.max(C,n.attributes.color_temp_kelvin??C));return r`
      <ha-card class=${f({strip:d})}>
        <div class=${f({lcd:!0,off:!this._on})}>
          <div class="lcd-top">
            <span class="name" title=${a}>${a}</span>
            <!-- The badge toggles rather than just reporting. On a tile with
                 the button row hidden it is the only control left, and a lit
                 bulb that cannot be pressed is a confusing thing to show. -->
            <button
              class=${f({badge:!0,on:this._on})}
              style=${M(c?{color:c}:{})}
              title=${this._on?"Turn off":"Turn on"}
              aria-label=${this._on?"Turn off":"Turn on"}
              .disabled=${o}
              @click=${this._toggle}
            >
              <ha-icon class="bulb" icon=${u}></ha-icon>
            </button>
          </div>
          ${this._show("show_state")?r`<div class="lcd-center">
                ${o?r`<span class="off-label">Unavailable</span>`:this._on?l===void 0?r`<span class="readout">On</span>`:r`<span class="readout"
                          >${l}<span class="unit">%</span></span
                        >`:r`<span class="off-label">Off</span>`}
              </div>`:p}
        </div>

        ${m||b?r`<div class="sliders">
              ${m?r`<faceplate-slider
                    label=${d?a:"Brightness"}
                    unit="%"
                    min="1"
                    max="100"
                    .value=${l??0}
                    .disabled=${!this._on}
                    .fill=${c??""}
                    @slider-change=${this._setBrightness}
                  ></faceplate-slider>`:p}
              ${b?r`<faceplate-slider
                    label=${d?a:"Warmth"}
                    unit="K"
                    .min=${C}
                    .max=${N}
                    .step=${50}
                    .value=${Xe}
                    .disabled=${!this._on}
                    .gradient=${`linear-gradient(to right, ${Ht(C)}, ${Ht((C+N)/2)}, ${Ht(N)})`}
                    @slider-change=${this._setColorTemp}
                  ></faceplate-slider>`:p}
            </div>`:p}

        ${this._show("show_controls")?r`<div class="controls">
              <button
                class=${f({ctl:!0,on:this._on,off:!this._on})}
                title="Power"
                style=${M(c?{color:c}:{})}
                .disabled=${o}
                @click=${this._toggle}
              >
                <ha-icon icon="mdi:power"></ha-icon>
              </button>
              <button
                class="ctl"
                title="Details"
                @click=${()=>K(this,i.entity)}
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
    `],st=h([_(qe)],st);function Ht(s){let e=Math.min(6600,Math.max(1e3,s))/100,t=a=>Math.round(Math.min(255,Math.max(0,a))),i=e<=66?255:t(329.7*Math.pow(e-60,-.1332)),n=e<=66?t(99.47*Math.log(e)-161.12):t(288.12*Math.pow(e-60,-.0755)),o=e>=66?255:e<=19?0:t(138.52*Math.log(e-10)-305.04);return`rgb(${i}, ${n}, ${o})`}var Pt=class extends k{constructor(){super(...arguments);this.defaults={show_state:!0,show_brightness_control:!0,show_color_temp_control:!1,use_light_color:!0,show_controls:!0};this.labels={entity:"Light entity (required)",name:"Name",icon:"Icon",show_brightness_control:"Brightness slider",show_color_temp_control:"Warmth slider",use_light_color:"Tint with the light's colour",show_controls:"Show buttons",min_brightness:"Brightness floor (%)",max_brightness:"Brightness ceiling (%)",min_color_temp_kelvin:"Warmest (K)",max_color_temp_kelvin:"Coolest (K)"};this.helpers={show_color_temp_control:"Only appears on lights that support colour temperature",show_controls:"Off leaves just the readout and sliders",max_brightness:"The span the card's own 0-100% covers. A ceiling of 60 makes the card's 100% equal 60% output, rescaling the whole slider rather than clipping its top",max_color_temp_kelvin:"Narrows the warmth slider. Both ends are held inside what the light actually supports"}}schema(){return[{name:"entity",required:!0,selector:{entity:{domain:"light"}}},{name:"name",selector:{text:{}}},{name:"icon",selector:{icon:{}}},{type:"grid",name:"",schema:[{name:"show_brightness_control",selector:{boolean:{}}},{name:"show_color_temp_control",selector:{boolean:{}}},{name:"use_light_color",selector:{boolean:{}}},{name:"show_controls",selector:{boolean:{}}}]},{type:"grid",name:"",schema:[{name:"min_brightness",selector:{number:{min:0,max:100,step:1,mode:"box"}}},{name:"max_brightness",selector:{number:{min:0,max:100,step:1,mode:"box"}}},{name:"min_color_temp_kelvin",selector:{number:{min:1e3,max:1e4,step:50,mode:"box"}}},{name:"max_color_temp_kelvin",selector:{number:{min:1e3,max:1e4,step:50,mode:"box"}}}]}]}};Pt=h([_(Ve)],Pt);A({type:qe,name:"Faceplate Light",description:"Light control with a recessed brightness slider and a tactile power button"});T();z();var Hi={"clear-night":"mdi:weather-night",cloudy:"mdi:weather-cloudy",exceptional:"mdi:alert-circle-outline",fog:"mdi:weather-fog",hail:"mdi:weather-hail",lightning:"mdi:weather-lightning","lightning-rainy":"mdi:weather-lightning-rainy",partlycloudy:"mdi:weather-partly-cloudy",pouring:"mdi:weather-pouring",rainy:"mdi:weather-rainy",snowy:"mdi:weather-snowy","snowy-rainy":"mdi:weather-snowy-rainy",sunny:"mdi:weather-sunny",windy:"mdi:weather-windy","windy-variant":"mdi:weather-windy-variant"};function Nt(s){return Hi[s??""]??"mdi:weather-cloudy"}var ot=class{constructor(e){this._onForecast=e}async sync(e,t,i="daily",n=!0){if(!e?.connection||!t)return;if(!n){await this.stop();return}let o=`${t}|${i}`;if(this._key===o)return;await this.stop(),this._key=o;let a=e.states[t]?.attributes.forecast;Array.isArray(a)&&this._onForecast(a);try{this._unsubscribe=await e.connection.subscribeMessage(c=>{c.forecast&&this._onForecast(c.forecast)},{type:"weather/subscribe_forecast",forecast_type:i,entity_id:t})}catch{this._key=void 0}}async stop(){let e=this._unsubscribe;this._unsubscribe=void 0,this._key=void 0;try{await e?.()}catch{}}};var We="faceplate-clock-card",Ke="faceplate-clock-card-editor",j=class extends ${constructor(){super(...arguments);this._now=new Date;this._forecast=[];this._subscription=new ot(t=>{this._forecast=t})}static async getConfigElement(){return document.createElement(Ke)}static getStubConfig(){return{show_date:!0,clock_size:"medium"}}getCardSize(){return 1}getGridOptions(){return{columns:6,rows:1,min_columns:3,min_rows:1}}connectedCallback(){super.connectedCallback(),this._schedule()}disconnectedCallback(){super.disconnectedCallback(),window.clearTimeout(this._timer),this._subscription.stop()}updated(){this._subscription.sync(this.hass,this._config?.weather_entity,"daily",this._weatherWanted)}_schedule(){window.clearTimeout(this._timer);let t=new Date;this._now=t;let i=this._config?.show_seconds?1e3:6e4,n=i-t.getTime()%i;this._timer=window.setTimeout(()=>this._schedule(),n+20)}willUpdate(t){t.has("_config")&&this._schedule()}get _hour12(){let t=this._config?.time_format??"auto";if(t==="12")return!0;if(t==="24")return!1;let i=this.hass?.locale?.time_format;if(i==="12")return!0;if(i==="24")return!1}get _locale(){return this.hass?.locale?.language??this.hass?.language??"en"}get _weatherWanted(){return!!this._config?.weather_entity&&this._show("show_weather")}render(){if(!this._config)return p;let t=this._config,i=t.time_zone,n=new Intl.DateTimeFormat(this._locale,{hour:"2-digit",minute:"2-digit",...t.show_seconds?{second:"2-digit"}:{},...this._hour12===void 0?{}:{hour12:this._hour12},...i?{timeZone:i}:{}}).formatToParts(this._now),o=n.find(u=>u.type==="dayPeriod")?.value,a=n.filter(u=>u.type!=="dayPeriod"&&u.type!=="literal").map(u=>u.value).join(":"),c=this._show("show_date")?new Intl.DateTimeFormat(this._locale,{weekday:"short",day:"numeric",month:"short",...i?{timeZone:i}:{}}).format(this._now):void 0,l=this._weather();return this.dataset.size=t.clock_size??"medium",r`
      <ha-card
        class=${f({"with-sub":!!(c||l),"with-label":!!t.name,row:t.layout==="row"})}
      >
        <div class="lcd">
          ${t.name?r`<span class="label">${t.name}</span>`:p}
          <span class="time"
            >${a}${o?r`<span class="meridiem">${o}</span>`:p}</span
          >
          ${c||l?r`<div class="sub">
                ${c?r`<span class="date">${c}</span>`:p}
                ${l??p}
              </div>`:p}
        </div>
      </ha-card>
    `}_weather(){if(!this._weatherWanted)return;let t=this.hass?.states[this._config.weather_entity];if(!t)return;let i=this._forecast[0],n=i?.condition??t.state,o=i?.temperature,a=i?.templow;return r`<span class="weather">
      <ha-icon icon=${Nt(n)}></ha-icon>
      <span class="temps">
        ${o===void 0?"--":P(this.hass,o,0)}°${a===void 0?p:r`<span class="temp-low"
              >/${P(this.hass,a,0)}°</span
            >`}
      </span>
    </span>`}};j.requiresEntity=!1,j.styles=[...x,g`
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
        justify-content: center;
        gap: 10px;
        flex-wrap: nowrap;
      }
      ha-card.row.with-sub,
      ha-card.row.with-label,
      ha-card.row.with-label.with-sub {
        --fp-clock-fit: 76cqh;
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
      ha-card.row .date,
      ha-card.row .temps {
        font-size: max(14px, 34cqh);
      }
      ha-card.row .weather {
        gap: 5px;
      }
      ha-card.row .weather ha-icon {
        --mdc-icon-size: max(20px, 40cqh);
      }
      ha-card.row .label {
        font-size: max(13px, 30cqh);
        align-self: baseline;
      }
      :host([data-size="small"]) .lcd {
        --faceplate-clock-size: 30px;
      }
      :host([data-size="large"]) .lcd {
        --faceplate-clock-size: 64px;
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
    `],h([w()],j.prototype,"_now",2),h([w()],j.prototype,"_forecast",2),j=h([_(We)],j);var Rt=class extends k{constructor(){super(...arguments);this.defaults={clock_size:"medium",time_format:"auto",show_seconds:!1,show_date:!0,show_weather:!0};this.labels={name:"Label (optional)",clock_size:"Size",time_format:"Time format",show_seconds:"Show seconds",show_date:"Show date",time_zone:"Time zone",weather_entity:"Weather entity (optional)",show_weather:"Show weather"};this.helpers={time_format:"Auto follows your Home Assistant profile setting",show_seconds:"Ticks every second instead of every minute",time_zone:"IANA name, e.g. Asia/Hong_Kong. Empty uses the panel's own zone",weather_entity:"Puts today's condition icon and high/low beside the date"}}schema(){return[{name:"name",selector:{text:{}}},{type:"grid",name:"",schema:[{name:"clock_size",selector:{select:{mode:"dropdown",options:[{value:"small",label:"Small"},{value:"medium",label:"Medium"},{value:"large",label:"Large"}]}}},{name:"time_format",selector:{select:{mode:"dropdown",options:[{value:"auto",label:"Auto"},{value:"12",label:"12 hour"},{value:"24",label:"24 hour"}]}}},{name:"show_seconds",selector:{boolean:{}}},{name:"show_date",selector:{boolean:{}}}]},{name:"time_zone",selector:{text:{}}},{name:"weather_entity",selector:{entity:{domain:"weather"}}},{name:"show_weather",selector:{boolean:{}}}]}};Rt=h([_(Ke)],Rt);A({type:We,name:"Faceplate Clock",description:"Time and date in LCD figures"});T();z();var Ge="faceplate-weather-card",Ze="faceplate-weather-card-editor",Z=class extends ${constructor(){super(...arguments);this._forecast=[];this._subscription=new ot(t=>{this._forecast=t})}static async getConfigElement(){return document.createElement(Ze)}static getStubConfig(t){return{entity:Object.keys(t.states).find(n=>n.startsWith("weather."))??"",show_forecast:!0}}getCardSize(){return 3}getGridOptions(){return{columns:12,rows:2,min_columns:4,min_rows:1}}disconnectedCallback(){super.disconnectedCallback(),this._subscription.stop()}updated(){this._subscription.sync(this.hass,this._config?.entity,this._config?.forecast_type,this._config?.show_forecast!==!1)}_icon(t){return Nt(t)}_slotLabel(t){let i=new Date(t.datetime);if(Number.isNaN(i.getTime()))return"";let n=this.hass?.locale?.language??this.hass?.language??"en";return this._config?.forecast_type==="hourly"?new Intl.DateTimeFormat(n,{hour:"numeric"}).format(i):new Intl.DateTimeFormat(n,{weekday:"short"}).format(i)}render(){let t=this._guard();if(t!==null)return t;let i=this._config,n=this._stateObj,o=L(n,i.name),a=n.attributes.temperature_unit??"\xB0",c=n.attributes.temperature,l=n.state,u=(i.show_forecast===!1?[]:this._forecast).slice(0,i.forecast_slots??5);return r`
      <ha-card @click=${()=>K(this,i.entity)}>
        <div class="lcd ${i.show_current===!1?"no-current":""}">
          ${i.show_current===!1?p:r`
                <div class="lcd-top">
                  <span class="name" title=${o}>${o}</span>
                  <span class="aux">${this._secondary(n)}</span>
                </div>
                <div class="lcd-center">
                  <span class="readout">
                    ${typeof c=="number"?P(this.hass,c,0):"--"}<span class="unit">${a}</span>
                  </span>
                  <span class="badge">
                    <ha-icon
                      class="condition"
                      icon=${this._icon(l)}
                    ></ha-icon>
                    <span>${ne(l)}</span>
                  </span>
                </div>
              `}
          ${u.length?r`<div class="forecast">
                ${u.map(d=>r`<div class="slot">
                    <span class="slot-label">${this._slotLabel(d)}</span>
                    <ha-icon icon=${this._icon(d.condition)}></ha-icon>
                    <span class="slot-temps">
                      ${d.temperature===void 0?"--":P(this.hass,d.temperature,0)}°${d.templow===void 0?p:r`<span class="slot-low"
                            >/${P(this.hass,d.templow,0)}°</span
                          >`}
                    </span>
                  </div>`)}
              </div>`:p}
        </div>
      </ha-card>
    `}_secondary(t){let i=this._config?.secondary_info??["humidity","apparent","wind","pressure"].filter(o=>this._hasReading(t,o)).slice(0,1),n=[];for(let o of i)o==="humidity"&&t.attributes.humidity!==void 0&&n.push(`Humidity ${Math.round(t.attributes.humidity)}%`),o==="wind"&&t.attributes.wind_speed!==void 0&&n.push(`Wind ${P(this.hass,t.attributes.wind_speed,0)} ${t.attributes.wind_speed_unit??""}`.trim()),o==="pressure"&&t.attributes.pressure!==void 0&&n.push(`${P(this.hass,t.attributes.pressure,0)} ${t.attributes.pressure_unit??""}`.trim()),o==="apparent"&&t.attributes.apparent_temperature!==void 0&&n.push(`Feels ${P(this.hass,t.attributes.apparent_temperature,0)}\xB0`);return n.join("   ")}_hasReading(t,i){let n={humidity:"humidity",wind:"wind_speed",pressure:"pressure",apparent:"apparent_temperature"}[i];return t.attributes[n]!==void 0}};Z.entityDomains=["weather"],Z.styles=[...x,g`
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
    `],h([w()],Z.prototype,"_forecast",2),Z=h([_(Ge)],Z);var Dt=class extends k{constructor(){super(...arguments);this.defaults={show_current:!0,show_forecast:!0,forecast_type:"daily",forecast_slots:5};this.labels={entity:"Weather entity (required)",name:"Name",show_current:"Show current conditions",show_forecast:"Show forecast",forecast_type:"Forecast type",forecast_slots:"Forecast slots",secondary_info:"Auxiliary readouts"};this.helpers={forecast_slots:"How many days or hours to show across the strip",secondary_info:"Shown on the top line beside the name"}}schema(){return[{name:"entity",required:!0,selector:{entity:{domain:"weather"}}},{name:"name",selector:{text:{}}},{type:"grid",name:"",schema:[{name:"show_current",selector:{boolean:{}}},{name:"show_forecast",selector:{boolean:{}}},{name:"forecast_type",selector:{select:{mode:"dropdown",options:[{value:"daily",label:"Daily"},{value:"hourly",label:"Hourly"},{value:"twice_daily",label:"Twice daily"}]}}},{name:"forecast_slots",selector:{number:{min:1,max:10,mode:"box"}}}]},{name:"secondary_info",selector:{select:{multiple:!0,mode:"list",options:[{value:"humidity",label:"Humidity"},{value:"wind",label:"Wind"},{value:"pressure",label:"Pressure"},{value:"apparent",label:"Feels like"}]}}}]}};Dt=h([_(Ze)],Dt);A({type:Ge,name:"Faceplate Weather",description:"Current conditions and a forecast strip, in LCD type"});T();z();var Je="faceplate-banner-card",Ye="faceplate-banner-card-editor",B=class extends ${constructor(){super(...arguments);this._rendered=""}static async getConfigElement(){return document.createElement(Ye)}static getStubConfig(){return{content:"{{ now().strftime('%H:%M') }}",severity:"plain",align:"center",text_size:"large"}}getCardSize(){return 1}getGridOptions(){return{columns:12,rows:1,min_columns:3,min_rows:1}}disconnectedCallback(){super.disconnectedCallback(),this._unsubscribeTemplate()}updated(){this._subscribeTemplate()}async _unsubscribeTemplate(){let t=this._unsubscribe;this._unsubscribe=void 0,this._subscribedTo=void 0;try{await t?.()}catch{}}async _subscribeTemplate(){let t=this._config?.content;if(!(!this.hass?.connection||!t)&&this._subscribedTo!==t){if(await this._unsubscribeTemplate(),this._subscribedTo=t,!t.includes("{{")&&!t.includes("{%")){this._rendered=t,this._error=void 0;return}try{this._unsubscribe=await this.hass.connection.subscribeMessage(i=>{if(i.error){this._error=i.error;return}this._error=void 0,this._rendered=i.result??""},{type:"render_template",template:t,report_errors:!0})}catch(i){this._error=i instanceof Error?i.message:String(i),this._subscribedTo=void 0}}}_asText(t){return t.replace(/<br\s*\/?>/gi," ").replace(/<[^>]*>/g,"").replace(/&nbsp;/gi," ").replace(/&amp;/gi,"&").replace(/&lt;/gi,"<").replace(/&gt;/gi,">").replace(/&#39;|&apos;/gi,"'").replace(/&quot;/gi,'"').replace(/\s+/g," ").trim()}render(){if(!this._config)return p;let t=this._config,i=t.severity??"plain";this.dataset.severity=i,this.dataset.size=t.text_size??"medium";let n=this._asText(this._rendered);return r`
      <ha-card
        class=${f({"text-only":!!t.text_only,[`align-${t.align??"center"}`]:!0})}
      >
        ${t.icon?r`<ha-icon icon=${t.icon}></ha-icon>`:p}
        ${this._error?r`<span class="error">Template error: ${this._error}</span>`:r`<span class="text" title=${n}>${n}</span>`}
      </ha-card>
    `}};B.requiresEntity=!1,B.styles=[...x,g`
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
    `],h([w()],B.prototype,"_rendered",2),h([w()],B.prototype,"_error",2),B=h([_(Je)],B);var It=class extends k{constructor(){super(...arguments);this.defaults={severity:"plain",align:"center",text_size:"medium",text_only:!1};this.labels={content:"Content",icon:"Icon (optional)",severity:"Severity",align:"Alignment",text_size:"Text size",text_only:"No card background"};this.helpers={content:"Jinja template, re-rendered by Home Assistant whenever its inputs change. Markup is stripped \u2014 use the options below for styling",severity:"Colours the text; alert is the red 'needs attention' banner",text_only:"Renders straight onto the view, like a heading"}}schema(){return[{name:"content",required:!0,selector:{template:{}}},{name:"icon",selector:{icon:{}}},{type:"grid",name:"",schema:[{name:"severity",selector:{select:{mode:"dropdown",options:[{value:"plain",label:"Plain"},{value:"info",label:"Info"},{value:"ok",label:"OK"},{value:"warn",label:"Warning"},{value:"alert",label:"Alert"}]}}},{name:"align",selector:{select:{mode:"dropdown",options:[{value:"left",label:"Left"},{value:"center",label:"Centre"},{value:"right",label:"Right"}]}}},{name:"text_size",selector:{select:{mode:"dropdown",options:[{value:"small",label:"Small"},{value:"medium",label:"Medium"},{value:"large",label:"Large"}]}}},{name:"text_only",selector:{boolean:{}}}]}]}};It=h([_(Ye)],It);A({type:Je,name:"Faceplate Banner",description:"A template-driven status line \u2014 headers, clocks and 'needs attention' warnings"});T();z();var se="faceplate-buttons-card",at=class extends ${static getStubConfig(){return{buttons:[{icon:"mdi:fan-off",tap_action:{action:"none"}},{icon:"mdi:fan",icon_badge:"1",tap_action:{action:"none"}}]}}getCardSize(){return 1}getGridOptions(){return{columns:12,rows:2,min_columns:6,min_rows:1}}setConfig(e){if(!Array.isArray(e?.buttons)||e.buttons.length===0)throw new Error("Define at least one button");super.setConfig(e)}_press(e){this.hass&&G(this,this.hass,{...e,type:se},"tap")}_isOn(e){if(!e.entity)return!1;let t=this.hass?.states?.[e.entity]?.state;return t==="on"||t==="open"}render(){if(!this.hass||!this._config)return p;let e=this._config.buttons;return r`
      <ha-card>
        <div class="row">
          ${e.map(t=>{let i=this._isOn(t);return r`<button
              class=${f({ctl:!0,on:i,off:!!t.entity&&!i})}
              title=${t.name??""}
              aria-label=${t.name??t.icon??"button"}
              @click=${()=>this._press(t)}
            >
              ${t.icon_badge?r`<span class="glyph">
                    <ha-icon icon=${t.icon}></ha-icon>
                    <span class="glyph-badge">${t.icon_badge}</span>
                  </span>`:r`<ha-icon icon=${t.icon}></ha-icon>`}
            </button>`})}
        </div>
      </ha-card>
    `}};at.requiresEntity=!1,at.styles=[...x,g`
      ha-card {
        container-type: size;
        min-height: 48px;
        justify-content: center;
        padding: 6px;
      }
      .row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 6px;
        width: 100%;
        height: 100%;
      }
      /* Each button takes an equal share of the row and squares itself off
         against the row's height, so the set stays on one line however many
         there are — the point of the card. */
      .row .ctl {
        flex: 1 1 0;
        min-width: 0;
        width: auto;
        max-width: none;
        height: 100%;
        aspect-ratio: auto;
      }
      .ctl ha-icon {
        --mdc-icon-size: clamp(16px, 34cqmin, 34px);
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
        font-size: clamp(9px, 17cqmin, 17px);
        font-weight: 700;
        line-height: 1;
        font-variant-numeric: tabular-nums;
        text-shadow: 0 0 3px var(--faceplate-lcd-background, rgba(0, 0, 0, 0.6));
      }
    `],at=h([_(se)],at);A({type:se,name:"Faceplate Buttons",description:"A row of buttons that stays on one line, for sets that do not divide into the grid's twelve columns"});A({type:bt,name:"Faceplate Climate",description:"Air-conditioner remote with temperature, fan and swing controls, built for small wall panels"});var Pi="0.1.17";console.info(`%c FACEPLATE-CARDS %c ${Pi} `,"color:#fff;background:#2196f3;font-weight:700","color:#2196f3;background:#fff;font-weight:700");
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
