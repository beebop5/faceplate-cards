var ee=Object.defineProperty;var Ke=Object.getOwnPropertyDescriptor;var w=(n,e)=>()=>(n&&(e=n(n=0)),e);var Ze=(n,e)=>{for(var t in e)ee(n,t,{get:e[t],enumerable:!0})};var h=(n,e,t,i)=>{for(var s=i>1?void 0:i?Ke(e,t):e,o=n.length-1,a;o>=0;o--)(a=n[o])&&(s=(i?a(e,t,s):a(s))||s);return i&&s&&ee(e,t,s),s};function Dt(n){let e=n.toLowerCase();return e.includes("auto")?"mdi:fan-auto":e==="off"?"mdi:fan-off":/(quiet|silent|sleep|night)/.test(e)?"mdi:fan-minus":/(low|min|1)/.test(e)?"mdi:fan-speed-1":/(mid|med|2)/.test(e)?"mdi:fan-speed-2":/(high|3)/.test(e)?"mdi:fan-speed-3":/(max|top|turbo|strong|4|5)/.test(e)?"mdi:fan-plus":"mdi:fan"}function ie(n,e){let t=n.trim();return/^\d+$/.test(t)&&e.endsWith(`-${t}`)}function bt(n,e){let t=n.toLowerCase();return/(off|stop|fix)/.test(t)?e?"mdi:pan-horizontal":"mdi:pan-vertical":/(on|swing|both|all|auto|oscillat|full|range)/.test(t)?e?"mdi:swap-horizontal":"mdi:swap-vertical":e?/left/.test(t)?"mdi:arrow-left":/right/.test(t)?"mdi:arrow-right":/(mid|cent)/.test(t)?"mdi:arrow-split-vertical":"mdi:swap-horizontal":/(highest|top|up)/.test(t)?"mdi:arrow-up":/(lowest|bottom|down|low)/.test(t)?"mdi:arrow-down":/(mid|cent|horiz)/.test(t)?"mdi:arrow-split-horizontal":/high/.test(t)?"mdi:arrow-top-right":"mdi:swap-vertical"}function se(n){let e=n.toLowerCase();return/both|all/.test(e)?"mdi:arrow-all":/horiz/.test(e)?"mdi:swap-horizontal":/vert/.test(e)?"mdi:swap-vertical":/off|stop|fix/.test(e)?"mdi:arrow-oscillating-off":"mdi:arrow-oscillating"}function H(n){return n.replace(/[_-]+/g," ").replace(/\b\w/g,e=>e.toUpperCase())}var gt,_t,Rt,st,K,yt=w(()=>{"use strict";gt="faceplate-climate-card",_t="faceplate-climate-card-editor",Rt=["off","auto","heat_cool","heat","cool","dry","fan_only"],st={auto:"mdi:thermostat-auto",heat_cool:"mdi:sun-snowflake-variant",heat:"mdi:fire",cool:"mdi:snowflake",dry:"mdi:water-percent",fan_only:"mdi:fan",off:"mdi:power"},K={auto:"var(--state-climate-auto-color, #008e6d)",heat_cool:"var(--state-climate-heat_cool-color, #008e6d)",heat:"var(--state-climate-heat-color, #ff8100)",cool:"var(--state-climate-cool-color, #2196f3)",dry:"var(--state-climate-dry-color, #efbd07)",fan_only:"var(--state-climate-fan_only-color, #009688)",off:"var(--state-climate-off-color, var(--disabled-text-color, #9e9e9e))"}});var wt,vt,Lt,ne,nt,oe,g,ae,It,jt=w(()=>{wt=globalThis,vt=wt.ShadowRoot&&(wt.ShadyCSS===void 0||wt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Lt=Symbol(),ne=new WeakMap,nt=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==Lt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(vt&&e===void 0){let i=t!==void 0&&t.length===1;i&&(e=ne.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&ne.set(t,e))}return e}toString(){return this.cssText}},oe=n=>new nt(typeof n=="string"?n:n+"",void 0,Lt),g=(n,...e)=>{let t=n.length===1?n[0]:e.reduce((i,s,o)=>i+(a=>{if(a._$cssResult$===!0)return a.cssText;if(typeof a=="number")return a;throw Error("Value passed to 'css' function must be a 'css' function result: "+a+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+n[o+1],n[0]);return new nt(t,n,Lt)},ae=(n,e)=>{if(vt)n.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of e){let i=document.createElement("style"),s=wt.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=t.cssText,n.appendChild(i)}},It=vt?n=>n:n=>n instanceof CSSStyleSheet?(e=>{let t="";for(let i of e.cssRules)t+=i.cssText;return oe(t)})(n):n});var Ye,Xe,Qe,ti,ei,ii,xt,re,si,ni,ot,at,$t,ce,P,rt=w(()=>{jt();jt();({is:Ye,defineProperty:Xe,getOwnPropertyDescriptor:Qe,getOwnPropertyNames:ti,getOwnPropertySymbols:ei,getPrototypeOf:ii}=Object),xt=globalThis,re=xt.trustedTypes,si=re?re.emptyScript:"",ni=xt.reactiveElementPolyfillSupport,ot=(n,e)=>n,at={toAttribute(n,e){switch(e){case Boolean:n=n?si:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,e){let t=n;switch(e){case Boolean:t=n!==null;break;case Number:t=n===null?null:Number(n);break;case Object:case Array:try{t=JSON.parse(n)}catch{t=null}}return t}},$t=(n,e)=>!Ye(n,e),ce={attribute:!0,type:String,converter:at,reflect:!1,useDefault:!1,hasChanged:$t};Symbol.metadata??=Symbol("metadata"),xt.litPropertyMetadata??=new WeakMap;P=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=ce){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let i=Symbol(),s=this.getPropertyDescriptor(e,i,t);s!==void 0&&Xe(this.prototype,e,s)}}static getPropertyDescriptor(e,t,i){let{get:s,set:o}=Qe(this.prototype,e)??{get(){return this[t]},set(a){this[t]=a}};return{get:s,set(a){let l=s?.call(this);o?.call(this,a),this.requestUpdate(e,l,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??ce}static _$Ei(){if(this.hasOwnProperty(ot("elementProperties")))return;let e=ii(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(ot("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(ot("properties"))){let t=this.properties,i=[...ti(t),...ei(t)];for(let s of i)this.createProperty(s,t[s])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[i,s]of t)this.elementProperties.set(i,s)}this._$Eh=new Map;for(let[t,i]of this.elementProperties){let s=this._$Eu(t,i);s!==void 0&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let i=new Set(e.flat(1/0).reverse());for(let s of i)t.unshift(It(s))}else e!==void 0&&t.push(It(e));return t}static _$Eu(e,t){let i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ae(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){let i=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,i);if(s!==void 0&&i.reflect===!0){let o=(i.converter?.toAttribute!==void 0?i.converter:at).toAttribute(t,i.type);this._$Em=e,o==null?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(e,t){let i=this.constructor,s=i._$Eh.get(e);if(s!==void 0&&this._$Em!==s){let o=i.getPropertyOptions(s),a=typeof o.converter=="function"?{fromAttribute:o.converter}:o.converter?.fromAttribute!==void 0?o.converter:at;this._$Em=s;let l=a.fromAttribute(t,o.type);this[s]=l??this._$Ej?.get(s)??l,this._$Em=null}}requestUpdate(e,t,i,s=!1,o){if(e!==void 0){let a=this.constructor;if(s===!1&&(o=this[e]),i??=a.getPropertyOptions(e),!((i.hasChanged??$t)(o,t)||i.useDefault&&i.reflect&&o===this._$Ej?.get(e)&&!this.hasAttribute(a._$Eu(e,i))))return;this.C(e,t,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:s,wrapped:o},a){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,a??t??this[e]),o!==!0||a!==void 0)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),s===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,o]of this._$Ep)this[s]=o;this._$Ep=void 0}let i=this.constructor.elementProperties;if(i.size>0)for(let[s,o]of i){let{wrapped:a}=o,l=this[s];a!==!0||this._$AL.has(s)||l===void 0||this.C(s,void 0,o,l)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(t)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(e){}firstUpdated(e){}};P.elementStyles=[],P.shadowRootOptions={mode:"open"},P[ot("elementProperties")]=new Map,P[ot("finalized")]=new Map,ni?.({ReactiveElement:P}),(xt.reactiveElementVersions??=[]).push("2.1.2")});function ye(n,e){if(!Kt(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return pe!==void 0?pe.createHTML(e):e}function Z(n,e,t=n,i){if(e===M)return e;let s=i!==void 0?t._$Co?.[i]:t._$Cl,o=pt(e)?void 0:e._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(n),s._$AT(n,t,i)),i!==void 0?(t._$Co??=[])[i]=s:t._$Cl=s),s!==void 0&&(e=Z(n,s._$AS(n,e.values),s,i)),e}var Gt,le,At,pe,ge,N,_e,oi,U,lt,pt,Kt,ai,Ut,ct,de,he,I,ue,me,be,Zt,c,Di,Li,M,p,fe,j,ri,dt,Bt,ht,J,Ft,qt,Vt,Wt,ci,we,Y=w(()=>{Gt=globalThis,le=n=>n,At=Gt.trustedTypes,pe=At?At.createPolicy("lit-html",{createHTML:n=>n}):void 0,ge="$lit$",N=`lit$${Math.random().toFixed(9).slice(2)}$`,_e="?"+N,oi=`<${_e}>`,U=document,lt=()=>U.createComment(""),pt=n=>n===null||typeof n!="object"&&typeof n!="function",Kt=Array.isArray,ai=n=>Kt(n)||typeof n?.[Symbol.iterator]=="function",Ut=`[ 	
\f\r]`,ct=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,de=/-->/g,he=/>/g,I=RegExp(`>|${Ut}(?:([^\\s"'>=/]+)(${Ut}*=${Ut}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ue=/'/g,me=/"/g,be=/^(?:script|style|textarea|title)$/i,Zt=n=>(e,...t)=>({_$litType$:n,strings:e,values:t}),c=Zt(1),Di=Zt(2),Li=Zt(3),M=Symbol.for("lit-noChange"),p=Symbol.for("lit-nothing"),fe=new WeakMap,j=U.createTreeWalker(U,129);ri=(n,e)=>{let t=n.length-1,i=[],s,o=e===2?"<svg>":e===3?"<math>":"",a=ct;for(let l=0;l<t;l++){let r=n[l],u,d,m=-1,f=0;for(;f<r.length&&(a.lastIndex=f,d=a.exec(r),d!==null);)f=a.lastIndex,a===ct?d[1]==="!--"?a=de:d[1]!==void 0?a=he:d[2]!==void 0?(be.test(d[2])&&(s=RegExp("</"+d[2],"g")),a=I):d[3]!==void 0&&(a=I):a===I?d[0]===">"?(a=s??ct,m=-1):d[1]===void 0?m=-2:(m=a.lastIndex-d[2].length,u=d[1],a=d[3]===void 0?I:d[3]==='"'?me:ue):a===me||a===ue?a=I:a===de||a===he?a=ct:(a=I,s=void 0);let C=a===I&&n[l+1].startsWith("/>")?" ":"";o+=a===ct?r+oi:m>=0?(i.push(u),r.slice(0,m)+ge+r.slice(m)+N+C):r+N+(m===-2?l:C)}return[ye(n,o+(n[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]},dt=class n{constructor({strings:e,_$litType$:t},i){let s;this.parts=[];let o=0,a=0,l=e.length-1,r=this.parts,[u,d]=ri(e,t);if(this.el=n.createElement(u,i),j.currentNode=this.el.content,t===2||t===3){let m=this.el.content.firstChild;m.replaceWith(...m.childNodes)}for(;(s=j.nextNode())!==null&&r.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(let m of s.getAttributeNames())if(m.endsWith(ge)){let f=d[a++],C=s.getAttribute(m).split(N),ft=/([.?@])?(.*)/.exec(f);r.push({type:1,index:o,name:ft[2],strings:C,ctor:ft[1]==="."?Ft:ft[1]==="?"?qt:ft[1]==="@"?Vt:J}),s.removeAttribute(m)}else m.startsWith(N)&&(r.push({type:6,index:o}),s.removeAttribute(m));if(be.test(s.tagName)){let m=s.textContent.split(N),f=m.length-1;if(f>0){s.textContent=At?At.emptyScript:"";for(let C=0;C<f;C++)s.append(m[C],lt()),j.nextNode(),r.push({type:2,index:++o});s.append(m[f],lt())}}}else if(s.nodeType===8)if(s.data===_e)r.push({type:2,index:o});else{let m=-1;for(;(m=s.data.indexOf(N,m+1))!==-1;)r.push({type:7,index:o}),m+=N.length-1}o++}}static createElement(e,t){let i=U.createElement("template");return i.innerHTML=e,i}};Bt=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:i}=this._$AD,s=(e?.creationScope??U).importNode(t,!0);j.currentNode=s;let o=j.nextNode(),a=0,l=0,r=i[0];for(;r!==void 0;){if(a===r.index){let u;r.type===2?u=new ht(o,o.nextSibling,this,e):r.type===1?u=new r.ctor(o,r.name,r.strings,this,e):r.type===6&&(u=new Wt(o,this,e)),this._$AV.push(u),r=i[++l]}a!==r?.index&&(o=j.nextNode(),a++)}return j.currentNode=U,s}p(e){let t=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}},ht=class n{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,s){this.type=2,this._$AH=p,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Z(this,e,t),pt(e)?e===p||e==null||e===""?(this._$AH!==p&&this._$AR(),this._$AH=p):e!==this._$AH&&e!==M&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):ai(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==p&&pt(this._$AH)?this._$AA.nextSibling.data=e:this.T(U.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:i}=e,s=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=dt.createElement(ye(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(t);else{let o=new Bt(s,this),a=o.u(this.options);o.p(t),this.T(a),this._$AH=o}}_$AC(e){let t=fe.get(e.strings);return t===void 0&&fe.set(e.strings,t=new dt(e)),t}k(e){Kt(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,i,s=0;for(let o of e)s===t.length?t.push(i=new n(this.O(lt()),this.O(lt()),this,this.options)):i=t[s],i._$AI(o),s++;s<t.length&&(this._$AR(i&&i._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let i=le(e).nextSibling;le(e).remove(),e=i}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},J=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,s,o){this.type=1,this._$AH=p,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=o,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=p}_$AI(e,t=this,i,s){let o=this.strings,a=!1;if(o===void 0)e=Z(this,e,t,0),a=!pt(e)||e!==this._$AH&&e!==M,a&&(this._$AH=e);else{let l=e,r,u;for(e=o[0],r=0;r<o.length-1;r++)u=Z(this,l[i+r],t,r),u===M&&(u=this._$AH[r]),a||=!pt(u)||u!==this._$AH[r],u===p?e=p:e!==p&&(e+=(u??"")+o[r+1]),this._$AH[r]=u}a&&!s&&this.j(e)}j(e){e===p?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},Ft=class extends J{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===p?void 0:e}},qt=class extends J{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==p)}},Vt=class extends J{constructor(e,t,i,s,o){super(e,t,i,s,o),this.type=5}_$AI(e,t=this){if((e=Z(this,e,t,0)??p)===M)return;let i=this._$AH,s=e===p&&i!==p||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,o=e!==p&&(i===p||s);s&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},Wt=class{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){Z(this,e)}},ci=Gt.litHtmlPolyfillSupport;ci?.(dt,ht),(Gt.litHtmlVersions??=[]).push("3.3.3");we=(n,e,t)=>{let i=t?.renderBefore??e,s=i._$litPart$;if(s===void 0){let o=t?.renderBefore??null;i._$litPart$=s=new ht(e.insertBefore(lt(),o),o,void 0,t??{})}return s._$AI(n),s}});var Jt,x,li,ve=w(()=>{rt();rt();Y();Y();Jt=globalThis,x=class extends P{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=we(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return M}};x._$litElement$=!0,x.finalized=!0,Jt.litElementHydrateSupport?.({LitElement:x});li=Jt.litElementPolyfillSupport;li?.({LitElement:x});(Jt.litElementVersions??=[]).push("4.2.2")});var xe=w(()=>{});var k=w(()=>{rt();Y();ve();xe()});var _,$e=w(()=>{_=n=>(e,t)=>{t!==void 0?t.addInitializer(()=>{customElements.define(n,e)}):customElements.define(n,e)}});function y(n){return(e,t)=>typeof t=="object"?di(n,e,t):((i,s,o)=>{let a=s.hasOwnProperty(o);return s.constructor.createProperty(o,i),a?Object.getOwnPropertyDescriptor(s,o):void 0})(n,e,t)}var pi,di,Yt=w(()=>{rt();pi={attribute:!0,type:String,converter:at,reflect:!1,hasChanged:$t},di=(n=pi,e,t)=>{let{kind:i,metadata:s}=t,o=globalThis.litPropertyMetadata.get(s);if(o===void 0&&globalThis.litPropertyMetadata.set(s,o=new Map),i==="setter"&&((n=Object.create(n)).wrapped=!0),o.set(t.name,n),i==="accessor"){let{name:a}=t;return{set(l){let r=e.get.call(this);e.set.call(this,l),this.requestUpdate(a,r,n,!0,l)},init(l){return l!==void 0&&this.C(a,void 0,n,l),l}}}if(i==="setter"){let{name:a}=t;return function(l){let r=this[a];e.call(this,l),this.requestUpdate(a,r,n,!0,l)}}throw Error("Unsupported decorator location: "+i)}});function v(n){return y({...n,state:!0,attribute:!1})}var Ae=w(()=>{Yt();});var Ee=w(()=>{});var B,X=w(()=>{B=(n,e,t)=>(t.configurable=!0,t.enumerable=!0,Reflect.decorate&&typeof e!="object"&&Object.defineProperty(n,e,t),t)});function Se(n,e){return(t,i,s)=>{let o=a=>a.renderRoot?.querySelector(n)??null;if(e){let{get:a,set:l}=typeof i=="object"?t:s??(()=>{let r=Symbol();return{get(){return this[r]},set(u){this[r]=u}}})();return B(t,i,{get(){let r=a.call(this);return r===void 0&&(r=o(this),(r!==null||this.hasUpdated)&&l.call(this,r)),r}})}return B(t,i,{get(){return o(this)}})}}var Ce=w(()=>{X();});var Te=w(()=>{X();});var ke=w(()=>{X();});var ze=w(()=>{X();});var Me=w(()=>{X();});var z=w(()=>{$e();Yt();Ae();Ee();Ce();Te();ke();ze();Me()});var Pe={};Ze(Pe,{FaceplateClimateCardEditor:()=>F});var He,wi,vi,xi,$i,Ai,F,Xt=w(()=>{"use strict";k();z();yt();He=["select","input_select"],wi=["switch","input_boolean","light","select","input_select","number","input_number"],vi=(n,e)=>[{name:"entity",required:!0,selector:{entity:{domain:"climate"}}},{name:"name",selector:{text:{}}},{name:"layout",selector:{select:{mode:"dropdown",options:[{value:"row",label:"Row (single line)"},{value:"compact",label:"Compact"},{value:"standard",label:"Standard"},{value:"large",label:"Large"}]}}},{name:"current_temperature_entity",selector:{entity:{domain:["sensor","number","input_number"]}}},{name:"outdoor_temperature_entity",selector:{entity:{domain:["sensor","number","input_number"]}}},...e.length?[{name:"default_mode",selector:{select:{mode:"dropdown",options:e.filter(t=>t!=="off").map(t=>({value:t,label:t.replace(/_/g," ").replace(/\b\w/g,i=>i.toUpperCase())}))}}},{name:"hvac_modes",selector:{select:{multiple:!0,mode:"list",options:e.map(t=>({value:t,label:t.replace(/_/g," ").replace(/\b\w/g,i=>i.toUpperCase())}))}}}]:[],{type:"grid",name:"",schema:[{name:"show_name",selector:{boolean:{}}},{name:"show_current_temperature",selector:{boolean:{}}},{name:"show_controls",selector:{boolean:{}}},{name:"show_fan",selector:{boolean:{}}},{name:"show_vertical_swing",selector:{boolean:{}}},{name:"show_horizontal_swing",selector:{boolean:{}}},{name:"show_settings",selector:{boolean:{}}}]},{type:"expandable",title:"Swing entity overrides",icon:"mdi:tune",schema:[{name:"vertical_swing_entity",selector:{entity:{domain:He}}},{name:"horizontal_swing_entity",selector:{entity:{domain:He}}}]},{type:"expandable",title:"Settings popup",icon:"mdi:tune-variant",schema:[{name:"setting_entities",selector:n?{object:{}}:{entity:{multiple:!0,domain:wi}}}]},{name:"step",selector:{number:{min:.1,max:5,step:.1,mode:"box"}}}],xi={entity:"Climate entity (required)",name:"Name",layout:"Size / layout",current_temperature_entity:"Current temperature entity (optional)",outdoor_temperature_entity:"Outdoor temperature entity (optional)",hvac_modes:"Modes to offer",default_mode:"Default mode (power button)",show_name:"Show name",show_current_temperature:"Show current temperature",show_controls:"Show buttons",show_fan:"Show fan control",show_vertical_swing:"Show vertical swing",show_horizontal_swing:"Show horizontal swing",show_settings:"Show settings popup",vertical_swing_entity:"Vertical swing entity",horizontal_swing_entity:"Horizontal swing entity",setting_entities:"Entities in settings popup",step:"Temperature step"},$i={current_temperature_entity:"Overrides the temperature reported by the climate entity",outdoor_temperature_entity:"Shown on the display next to the current temperature",hvac_modes:"Untick modes your unit can't actually do. Empty = offer all of them",show_controls:"Off gives a larger status-only display with no buttons",default_mode:"Pressing power turns the unit on to this mode. Hold the button to pick any mode",vertical_swing_entity:"Use a select entity instead of the climate swing_mode attribute",horizontal_swing_entity:"Use a select entity instead of the climate swing_horizontal_mode attribute",setting_entities:"To rename an item, use YAML: - entity: switch.x, name: Display light",step:"Defaults to the entity's own step"},Ai={show_name:!0,show_current_temperature:!0,show_controls:!0,show_fan:!0,show_vertical_swing:!0,show_horizontal_swing:!0,show_settings:!0},F=class extends x{setConfig(e){this._config=e}render(){if(!this.hass||!this._config)return p;let e=!!this._config.setting_entities?.some(i=>typeof i!="string"),t=this.hass.states[this._config.entity]?.attributes.hvac_modes??[];return c`
      <ha-form
        .hass=${this.hass}
        .data=${{...Ai,...this._config}}
        .schema=${vi(e,t)}
        .computeLabel=${i=>xi[i.name]??i.name}
        .computeHelper=${i=>$i[i.name]}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `}_valueChanged(e){e.stopPropagation();let t={...e.detail.value};for(let[i,s]of Object.entries(t))(s===""||Array.isArray(s)&&s.length===0)&&delete t[i];this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0}))}};h([y({attribute:!1})],F.prototype,"hass",2),h([v()],F.prototype,"_config",2),F=h([_(_t)],F)});var Je="https://github.com/beebop5/faceplate-cards";function T(n){window.customCards=window.customCards||[],!window.customCards.some(e=>e.type===n.type)&&window.customCards.push({preview:!0,documentationURL:Je,...n})}yt();k();z();Y();var Et={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},St=n=>(...e)=>({_$litDirective$:n,values:e}),Q=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}};var b=St(class extends Q{constructor(n){if(super(n),n.type!==Et.ATTRIBUTE||n.name!=="class"||n.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(n){return" "+Object.keys(n).filter(e=>n[e]).join(" ")+" "}update(n,[e]){if(this.st===void 0){this.st=new Set,n.strings!==void 0&&(this.nt=new Set(n.strings.join(" ").split(/\s/).filter(i=>i!=="")));for(let i in e)e[i]&&!this.nt?.has(i)&&this.st.add(i);return this.render(e)}let t=n.element.classList;for(let i of this.st)i in e||(t.remove(i),this.st.delete(i));for(let i in e){let s=!!e[i];s===this.st.has(i)||this.nt?.has(i)||(s?(t.add(i),this.st.add(i)):(t.remove(i),this.st.delete(i)))}return M}});Y();var Oe="important",hi=" !"+Oe,R=St(class extends Q{constructor(n){if(super(n),n.type!==Et.ATTRIBUTE||n.name!=="style"||n.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(n){return Object.keys(n).reduce((e,t)=>{let i=n[t];return i==null?e:e+`${t=t.includes("-")?t:t.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${i};`},"")}update(n,[e]){let{style:t}=n.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(e)),this.render(e);for(let i of this.ft)e[i]==null&&(this.ft.delete(i),i.includes("-")?t.removeProperty(i):t[i]=null);for(let i in e){let s=e[i];if(s!=null){this.ft.add(i);let o=typeof s=="string"&&s.endsWith(hi);i.includes("-")||o?t.setProperty(i,o?s.slice(0,-11):s,o?Oe:""):t[i]=s}}return M}});yt();k();var ui=g`
  :host {
    display: block;
    container-type: inline-size;
    height: 100%;

    --faceplate-radius: 12px;
    --faceplate-gap: 8px;
    --faceplate-padding: 10px;
    --faceplate-button-size: 46px;
    --faceplate-button-max: 60px;
    --faceplate-icon-size: 24px;
    --faceplate-lcd-background: var(
      --faceplate-lcd-bg,
      var(--secondary-background-color)
    );
  }
`,mi=g`
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
`,fi=g`
  .lcd {
    border-radius: var(--faceplate-radius);
    padding: 8px 14px 6px;
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
`,gi=g`
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
    border-radius: 50%;
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
  /* An "active" button tints itself with its own state colour. Gen1 wall
     panels ship Chromium 107, which predates color-mix(); the plain
     declaration first means those still get a filled button rather than
     dropping the background entirely. */
  .ctl.on {
    background: var(--secondary-background-color);
    background: color-mix(
      in srgb,
      currentColor 22%,
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
`,_i=g`
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
`,bi=g`
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
    border-radius: 50%;
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
`,yi=g`
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
`,$=[ui,mi,fi,gi,_i,bi,yi];var O=class extends x{constructor(){super(...arguments);this._popup=null;this._longPressed=!1;this._pressStart=()=>{this._longPressed=!1,window.clearTimeout(this._pressTimer),this._pressTimer=window.setTimeout(()=>{this._longPressed=!0,this._popup="config"},500)};this._pressEnd=()=>{window.clearTimeout(this._pressTimer)};this._powerPress=()=>{if(this._longPressed){this._longPressed=!1;return}if(!this._isOff){this._setHvacMode("off");return}let t=this._defaultMode();t?this._setHvacMode(t):this._popup="config"}}static async getConfigElement(){return await Promise.resolve().then(()=>(Xt(),Pe)),document.createElement(_t)}static getStubConfig(t){return{entity:Object.keys(t.states).find(s=>s.startsWith("climate."))??""}}setConfig(t){if(!t.entity||!t.entity.startsWith("climate."))throw new Error("Please define a climate entity");this._config=t}getCardSize(){let t=this._config?.layout;return t==="row"?1:t==="compact"?2:3}getGridOptions(){return this._config?.layout==="row"?{columns:12,rows:1,min_columns:6,min_rows:1}:{columns:6,rows:3,min_columns:3,min_rows:2}}disconnectedCallback(){super.disconnectedCallback(),window.clearTimeout(this._commitTimer),window.clearTimeout(this._pressTimer)}get _stateObj(){return this._config&&this.hass?this.hass.states[this._config.entity]:void 0}_show(t){return this._config?.[t]!==!1}_selectSource(t){let i=this.hass?.states[t];if(!i)return;let o=t.split(".")[0]==="input_select"?"input_select":"select";return{options:i.attributes.options??[],current:i.state,set:a=>this.hass.callService(o,"select_option",{entity_id:t,option:a})}}_climateSource(t,i,s){let o=this._stateObj;if(o?.attributes[t]?.length)return{options:o.attributes[t],current:o.attributes[i],set:a=>this.hass.callService("climate",s,{entity_id:o.entity_id,[i]:a})}}_fanSections(){let t=[];if(this._show("show_fan")){let s=this._climateSource("fan_modes","fan_mode","set_fan_mode");s&&t.push({key:"fan",title:"Fan speed",segmentIcon:Dt(s.current??""),icon:Dt,source:s})}let i=this._show("show_horizontal_swing")?this._config?.horizontal_swing_entity?this._selectSource(this._config.horizontal_swing_entity):this._climateSource("swing_horizontal_modes","swing_horizontal_mode","set_swing_horizontal_mode"):void 0;if(this._show("show_vertical_swing")){let s=this._config?.vertical_swing_entity?this._selectSource(this._config.vertical_swing_entity):this._climateSource("swing_modes","swing_mode","set_swing_mode");if(s?.options.length){let o=!i?.options.length&&s.options.some(l=>/horiz|both/i.test(l)),a=o?se:l=>bt(l,!1);t.push({key:"vswing",title:o?"Swing":"Vertical swing",segmentIcon:a(s.current??""),icon:a,source:s})}}return i?.options.length&&t.push({key:"hswing",title:"Horizontal swing",segmentIcon:bt(i.current??"",!0),icon:s=>bt(s,!0),source:i}),t}_hasSettings(){return this._show("show_settings")?!!(this._stateObj?.attributes.preset_modes?.length||this._config?.setting_entities?.length):!1}get _isOff(){return this._stateObj?.state==="off"}get _step(){return this._config?.step??this._stateObj?.attributes.target_temp_step??.5}get _targetTemp(){return this._localTarget??this._stateObj?.attributes.temperature}get _currentTemp(){let t=this._config?.current_temperature_entity;if(t){let i=this.hass?.states[t],s=i?parseFloat(i.state):NaN;return Number.isFinite(s)?s:void 0}return this._stateObj?.attributes.current_temperature}get _outdoorTemp(){let t=this._config?.outdoor_temperature_entity;if(!t)return;let i=this.hass?.states[t],s=i?parseFloat(i.state):NaN;return Number.isFinite(s)?s:void 0}get _unit(){return this.hass?.config.unit_system.temperature??"\xB0C"}_modeName(t){return this.hass?.localize(`component.climate.entity_component._.state.${t}`)||H(t)}willUpdate(){this._localTarget!==void 0&&this._stateObj?.attributes.temperature===this._localTarget&&(this._localTarget=void 0)}_adjustTemp(t){let i=this._stateObj;if(!i)return;let s=i.attributes,o=this._targetTemp??s.min_temp??20,a=s.min_temp??7,l=s.max_temp??35,r=this._step,u=Math.min(l,Math.max(a,o+t*r)),d=`${r}`.split(".")[1]?.length??0;this._localTarget=parseFloat(u.toFixed(d)),window.clearTimeout(this._commitTimer),this._commitTimer=window.setTimeout(()=>{this.hass.callService("climate","set_temperature",{entity_id:i.entity_id,temperature:this._localTarget})},700)}_availableModes(){let t=this._config?.hvac_modes;return[...this._stateObj?.attributes.hvac_modes??[]].filter(i=>!t?.length||t.includes(i)).sort((i,s)=>Rt.indexOf(i)-Rt.indexOf(s))}_defaultMode(){let t=this._availableModes().filter(s=>s!=="off"),i=this._config?.default_mode;return i&&t.includes(i)?i:t.length===1?t[0]:void 0}_setHvacMode(t){this.hass.callService("climate","set_hvac_mode",{entity_id:this._config.entity,hvac_mode:t})}render(){if(!this._config||!this.hass)return p;let t=this._stateObj;if(!t)return c`<ha-card class="error">
        Entity not found: ${this._config.entity}
      </ha-card>`;let i=t.state==="unavailable",s=t.state,o=K[s]??K.off,a=this._fanSections(),l=this._config.layout??"standard",r=this._config.name??t.attributes.friendly_name??"",u=t.attributes.preset_mode,d=this._show("show_controls"),m=this._isOff||i;return c`
      <ha-card
        class=${b({[`layout-${l}`]:!0,"display-only":!d})}
      >
        <!-- With the buttons hidden the display is the only thing left to
             touch, so it becomes the way into the config sheet. -->
        <div
          class=${b({lcd:!0,off:m,tappable:!d})}
          @click=${()=>{d||(this._popup="config")}}
        >
          <div class="lcd-top">
            ${this._show("show_name")?c`<span class="name" title=${r}>${r}</span>`:c`<span></span>`}
            <span class="temps">
              ${this._show("show_current_temperature")&&this._currentTemp!==void 0?c`<span class="aux"
                    >Current ${this._formatNumber(this._currentTemp)}°</span
                  >`:p}
              ${this._outdoorTemp!==void 0?c`<span class="aux"
                    >Outside ${this._formatNumber(this._outdoorTemp)}°</span
                  >`:p}
            </span>
          </div>
          <div class="lcd-center">
            <span class=${b({readout:!0,dimmed:m})}>
              ${i||this._targetTemp===void 0?"--":this._formatNumber(this._targetTemp)}<span class="unit"
                >${this._unit}</span
              >
            </span>
            <span class="badge" style=${R({color:o})}>
              <ha-icon icon=${st[s]??"mdi:thermostat"}></ha-icon>
              <span>${i?"Unavailable":this._modeName(s)}</span>
            </span>
          </div>
          ${a.length||u?c`<div class="lcd-status">
                ${a.map(f=>c`<button
                    class="segment"
                    title=${f.title}
                    @click=${()=>this._popup="config"}
                  >
                    <ha-icon icon=${f.segmentIcon}></ha-icon>
                    <span
                      >${m?"\u2014":H(f.source.current??"\u2014")}</span
                    >
                  </button>`)}
                ${u&&u!=="none"&&this._hasSettings()?c`<button
                      class="segment"
                      title="Preset"
                      @click=${()=>this._popup="config"}
                    >
                      <ha-icon icon="mdi:star-outline"></ha-icon>
                      <span>${H(u)}</span>
                    </button>`:p}
              </div>`:p}
        </div>

        ${d?c`<div class="controls">
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
          ${t.attributes.hvac_modes?.length?c`<button
                class=${b({ctl:!0,on:!this._isOff,off:this._isOff})}
                title="Power (hold to choose mode)"
                style=${R(this._isOff?{}:{color:o})}
                .disabled=${i}
                @click=${this._powerPress}
                @pointerdown=${this._pressStart}
                @pointerup=${this._pressEnd}
                @pointerleave=${this._pressEnd}
                @pointercancel=${this._pressEnd}
                @contextmenu=${f=>f.preventDefault()}
              >
                <ha-icon
                  icon=${st[s]??"mdi:thermostat"}
                ></ha-icon>
              </button>`:p}
          ${a.length?c`<button
                class="ctl"
                title="Fan & swing"
                .disabled=${i}
                @click=${()=>this._popup="config"}
              >
                <ha-icon icon="mdi:fan"></ha-icon>
              </button>`:p}
          ${this._hasSettings()?c`<button
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
    `}_formatNumber(t){return t.toLocaleString(this.hass?.language??"en",{maximumFractionDigits:1})}_renderPopup(t){if(!this._popup)return p;let i=()=>this._popup=null,s=this._stateObj,o=s.state==="unavailable",a=this._config?.name??s.attributes.friendly_name??"Settings",l=K[s.state]??K.off,r=this._isOff||o,u=c`
      <!-- The same readout as the card's face: measured temperatures and mode
           above, setpoint across the middle, fan and swing along the bottom. -->
      <div class="popup-lcd ${r?"off":""}">
        <div class="lcd-top">
          <span class="temps">
            ${this._show("show_current_temperature")&&this._currentTemp!==void 0?c`<span class="aux"
                  >Current ${this._formatNumber(this._currentTemp)}°</span
                >`:p}
            ${this._outdoorTemp!==void 0?c`<span class="aux"
                  >Outside ${this._formatNumber(this._outdoorTemp)}°</span
                >`:p}
          </span>
          <span class="badge" style=${R({color:l})}>
            <ha-icon
              icon=${st[s.state]??"mdi:thermostat"}
            ></ha-icon>
            <span>${o?"Unavailable":this._modeName(s.state)}</span>
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
          <span class=${b({"temp-value":!0,dimmed:r})}>
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
        ${t.length?c`<div class="lcd-status">
              ${t.map(d=>c`<span class="segment">
                  <ha-icon icon=${d.segmentIcon}></ha-icon>
                  <span>${r?"\u2014":H(d.source.current??"\u2014")}</span>
                </span>`)}
            </div>`:p}
      </div>

      <div class="section-title">Mode</div>
      <div class="chips">
        ${this._availableModes().map(d=>c`<button
            class=${b({chip:!0,"mode-chip":!0,active:d===s.state})}
            style=${R(d===s.state?{color:K[d]??""}:{})}
            @click=${()=>this._setHvacMode(d)}
          >
            <ha-icon icon=${st[d]??"mdi:thermostat"}></ha-icon>
            ${this._modeName(d)}
          </button>`)}
      </div>

      ${t.map(d=>c`
          <div class="section-title">${d.title}</div>
          <div class="chips">
            ${d.source.options.map(m=>{let f=d.icon(m),C=ie(m,f);return c`<button
                class=${b({chip:!0,"chip-icon":C,active:m===d.source.current})}
                title=${H(m)}
                @click=${()=>d.source.set(m)}
              >
                <ha-icon icon=${f}></ha-icon>
                ${C?p:H(m)}
              </button>`})}
          </div>
        `)}
      ${this._renderSettingsBody()}
    `;return c`
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
    `}updated(){let t=this._dialogEl;t&&(this._popup&&!t.open?typeof t.showModal=="function"?t.showModal():t.setAttribute("open",""):!this._popup&&t.open&&(typeof t.close=="function"?t.close():t.removeAttribute("open")))}_renderSettingsBody(){let t=this._stateObj,i=t.attributes.preset_modes??[],s=this._config?.setting_entities??[];return c`
      ${i.length?c`<div class="section-title">Preset</div>
            <div class="chips">
              ${i.map(o=>c`<button
                  class=${b({chip:!0,active:o===t.attributes.preset_mode})}
                  @click=${()=>this.hass.callService("climate","set_preset_mode",{entity_id:t.entity_id,preset_mode:o})}
                >
                  ${H(o)}
                </button>`)}
            </div>`:p}
      ${s.map(o=>this._renderSettingRow(o))}
    `}_renderSettingRow(t){let i=typeof t=="string"?t:t.entity,s=typeof t=="string"?void 0:t.name,o=this.hass.states[i];if(!o)return c`<div class="row">
        <span class="row-name">${s??i}</span>
        <span class="row-missing">not found</span>
      </div>`;let a=i.split(".")[0],l=s??o.attributes.friendly_name??i;if(["switch","input_boolean","light"].includes(a))return c`<div class="row">
        <span class="row-name">${l}</span>
        <ha-switch
          .checked=${o.state==="on"}
          @change=${()=>this.hass.callService("homeassistant","toggle",{entity_id:i})}
        ></ha-switch>
      </div>`;if(["select","input_select"].includes(a)){let r=a==="input_select"?"input_select":"select",u=o.attributes.options??[];return c`<div class="row column">
        <span class="row-name">${l}</span>
        <div class="chips">
          ${u.map(d=>c`<button
              class=${b({chip:!0,active:d===o.state})}
              @click=${()=>this.hass.callService(r,"select_option",{entity_id:i,option:d})}
            >
              ${H(d)}
            </button>`)}
        </div>
      </div>`}if(["number","input_number"].includes(a)){let r=a==="input_number"?"input_number":"number",u=parseFloat(o.state),d=o.attributes.step??1,m=f=>this.hass.callService(r,"set_value",{entity_id:i,value:Math.min(o.attributes.max??1/0,Math.max(o.attributes.min??-1/0,f))});return c`<div class="row">
        <span class="row-name">${l}</span>
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
      </div>`}return c`<div class="row">
      <span class="row-name">${l}</span>
      <span>${this.hass.formatEntityState?.(o)??o.state}</span>
    </div>`}};O.styles=[...$,g`
      .temps {
        display: flex;
        align-items: center;
        gap: 10px;
        flex: none;
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
    `],h([y({attribute:!1})],O.prototype,"hass",2),h([v()],O.prototype,"_config",2),h([v()],O.prototype,"_popup",2),h([Se("dialog.popup-backdrop")],O.prototype,"_dialogEl",2),h([v()],O.prototype,"_localTarget",2),O=h([_(gt)],O);Xt();k();z();k();z();var A=class extends x{static{this.styles=$}static{this.requiresEntity=!0}setConfig(e){let t=this.constructor;if(t.requiresEntity){let i=t.entityDomains,s=e.entity?.split(".")[0];if(!e.entity||i&&!i.includes(s))throw new Error(i?`Please define a ${i.join(" or ")} entity`:"Please define an entity")}this._config=e}getCardSize(){return 2}get _stateObj(){return this._config?.entity&&this.hass?this.hass.states[this._config.entity]:void 0}_show(e){return this._config?.[e]!==!1}_missingEntity(){return c`<ha-card class="error">
      Entity not found: ${this._config?.entity}
    </ha-card>`}_guard(){return!this._config||!this.hass?p:this.constructor.requiresEntity&&!this._stateObj?this._missingEntity():null}};h([y({attribute:!1})],A.prototype,"hass",2),h([v()],A.prototype,"_config",2);k();z();var E=class extends x{constructor(){super(...arguments);this.labels={};this.helpers={};this.defaults={}}setConfig(t){this._config=t}render(){return!this.hass||!this._config?p:c`
      <ha-form
        .hass=${this.hass}
        .data=${{...this.defaults,...this._config}}
        .schema=${this.schema(this._config,this.hass)}
        .computeLabel=${t=>this.labels[t.name]??t.name}
        .computeHelper=${t=>this.helpers[t.name]}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `}_valueChanged(t){t.stopPropagation();let i={...t.detail.value};for(let[s,o]of Object.entries(i))(o===""||Array.isArray(o)&&o.length===0)&&delete i[s];this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:i},bubbles:!0,composed:!0}))}};h([y({attribute:!1})],E.prototype,"hass",2),h([v()],E.prototype,"_config",2);var Ne={type:"expandable",title:"Actions",icon:"mdi:gesture-tap",schema:[{name:"tap_action",selector:{ui_action:{}}},{name:"hold_action",selector:{ui_action:{}}},{name:"double_tap_action",selector:{ui_action:{}}}]},Ct={tap_action:"Tap action",hold_action:"Hold action",double_tap_action:"Double tap action"};var Ei={lock:"lock",cover:"cover",group:"homeassistant"};function Qt(n,e,t){n.dispatchEvent(new CustomEvent(e,{detail:t,bubbles:!0,composed:!0}))}function q(n,e){Qt(n,"hass-more-info",{entityId:e})}function ut(n,e,t,i){let s=`${i}_action`,o=i==="tap"?{action:t.entity?"toggle":"none"}:i==="hold"?{action:t.entity?"more-info":"none"}:{action:"none"},a=t[s]??o;switch(a.action){case"none":return;case"more-info":{let l=a.entity??t.entity;l&&q(n,l);return}case"toggle":{let l=a.entity??t.entity;if(!l)return;let r=l.split(".")[0];e.callService(Ei[r]??"homeassistant","toggle",{entity_id:l});return}case"navigate":{if(!a.navigation_path)return;history.pushState(null,"",a.navigation_path),Qt(n,"location-changed",{replace:!1});return}case"url":{a.url_path&&window.open(a.url_path,"_blank","noreferrer");return}case"assist":Qt(n,"show-dialog",{dialogTag:"ha-voice-command-dialog",dialogImport:()=>Promise.resolve(),dialogParams:{}});return;case"call-service":case"perform-action":{let l=a.perform_action??a.service;if(!l||!l.includes("."))return;let[r,u]=l.split(".",2);e.callService(r,u,a.data??a.service_data??{},a.target);return}}}var tt=class{constructor(e,t={}){this._run=e;this._opts=t;this._held=!1;this._lastTap=0;this.down=()=>{this._held=!1,this._opts.hasHold&&(window.clearTimeout(this._timer),this._timer=window.setTimeout(()=>{this._held=!0,this._run("hold")},this._opts.holdMs??500))};this.up=()=>{window.clearTimeout(this._timer)};this.click=e=>{if(e.stopPropagation(),this._held){this._held=!1;return}if(!this._opts.hasDoubleTap){this._run("tap");return}let t=Date.now();if(t-this._lastTap<300){window.clearTimeout(this._tapTimer),this._lastTap=0,this._run("double_tap");return}this._lastTap=t,this._tapTimer=window.setTimeout(()=>this._run("tap"),300)}}destroy(){window.clearTimeout(this._timer),window.clearTimeout(this._tapTimer)}};function te(n){return n.replace(/[_-]+/g," ").replace(/\b\w/g,e=>e.toUpperCase())}function V(n,e,t=1){return e.toLocaleString(n?.language??"en",{maximumFractionDigits:t})}function Tt(n,e){if(!e)return"";if(n?.formatEntityState)try{return n.formatEntityState(e)}catch{}let t=e.entity_id.split(".")[0];return n?.localize(`component.${t}.entity_component._.state.${e.state}`)||te(e.state)}function D(n,e){return e??n?.attributes.friendly_name??n?.entity_id??""}var Re="faceplate-button-card",De="faceplate-button-card-editor",et=class extends A{static async getConfigElement(){return document.createElement(De)}static getStubConfig(){return{show_name:!0,show_icon:!0,tap_action:{action:"toggle"}}}getCardSize(){return 1}getGridOptions(){return{columns:4,rows:1,min_columns:2,min_rows:1}}setConfig(e){super.setConfig(e),this._handler?.destroy(),this._handler=new tt(t=>this._run(t),{hasHold:!!e.hold_action||!!e.entity,hasDoubleTap:!!e.double_tap_action})}disconnectedCallback(){super.disconnectedCallback(),this._handler?.destroy()}_run(e){this.hass&&this._config&&ut(this,this.hass,this._config,e)}render(){let e=this._guard();if(e!==null)return e;let t=this._config,i=this._stateObj,s=i?.state==="on"||i?.state==="open",o=i?.state==="unavailable",a=D(i,t.name),l=t.icon??i?.attributes.icon??this._domainIcon(s),r=t.show_name!==!1&&!!a,u=!!(t.show_state&&i);return c`
      <ha-card
        class=${b({unavailable:o,"with-name":r,"with-state":u})}
      >
        ${t.show_icon===!1?p:c`<button
              class=${b({ctl:!0,fill:!0,on:s&&!t.accent,off:!!i&&!s,accent:!!t.accent})}
              title=${a}
              aria-label=${a}
              @click=${this._handler.click}
              @pointerdown=${this._handler.down}
              @pointerup=${this._handler.up}
              @pointerleave=${this._handler.up}
              @pointercancel=${this._handler.up}
              @contextmenu=${d=>d.preventDefault()}
            >
              <ha-icon icon=${l}></ha-icon>
            </button>`}
        ${r?c`<span class="label" title=${a}>${a}</span>`:p}
        ${u?c`<span class="label state"
              >${Tt(this.hass,i)}</span
            >`:p}
      </ha-card>
    `}_domainIcon(e){switch(this._config?.entity?.split(".")[0]){case"light":return e?"mdi:lightbulb":"mdi:lightbulb-outline";case"switch":return"mdi:toggle-switch-outline";case"script":return"mdi:play";case"scene":return"mdi:palette";case"fan":return"mdi:fan";case"cover":return"mdi:window-shutter";case"climate":return"mdi:thermostat";case"media_player":return"mdi:speaker";default:return this._config?.tap_action?.action==="navigate"?"mdi:arrow-right-circle-outline":"mdi:gesture-tap-button"}}};et.requiresEntity=!1,et.styles=[...$,g`
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
        --fp-labels: 38px;
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
    `],et=h([_(Re)],et);var kt=class extends E{constructor(){super(...arguments);this.defaults={show_name:!0,show_icon:!0,show_state:!1};this.labels={entity:"Entity (optional)",name:"Name",icon:"Icon",show_name:"Show name",show_icon:"Show icon",show_state:"Show state",accent:"Accent colour",...Ct};this.helpers={entity:"Leave empty for a button that only navigates or runs an action",accent:"Fill the button with the theme's accent colour at all times"}}schema(t,i){return[{name:"entity",selector:{entity:{}}},{name:"name",selector:{text:{}}},{name:"icon",selector:{icon:{}}},{type:"grid",name:"",schema:[{name:"show_name",selector:{boolean:{}}},{name:"show_icon",selector:{boolean:{}}},{name:"show_state",selector:{boolean:{}}},{name:"accent",selector:{boolean:{}}}]},Ne]}};kt=h([_(De)],kt);T({type:Re,name:"Faceplate Button",description:"A round tactile button that fills its tile \u2014 toggles, scripts, scenes and navigation"});k();z();var Le="faceplate-tile-card",Ie="faceplate-tile-card-editor",mt=class extends A{constructor(){super(...arguments);this._iconTap=t=>{if(t.stopPropagation(),!this.hass||!this._config)return;let i=this._config.icon_tap_action;if(i){ut(this,this.hass,{...this._config,tap_action:i},"tap");return}let s=this._config.entity.split(".")[0];if(["script","scene","button","input_button"].includes(s)){let o=s==="script"||s==="scene"?"turn_on":"press";this.hass.callService(s,o,{entity_id:this._config.entity});return}if(["light","switch","fan","input_boolean","media_player"].includes(s)){this.hass.callService("homeassistant","toggle",{entity_id:this._config.entity});return}q(this,this._config.entity)}}static async getConfigElement(){return document.createElement(Ie)}static getStubConfig(t){return{entity:Object.keys(t.states).find(s=>s.startsWith("light."))??Object.keys(t.states)[0]??""}}getCardSize(){return 1}getGridOptions(){return this._config?.vertical?{columns:3,rows:2,min_columns:2,min_rows:2}:{columns:6,rows:1,min_columns:3,min_rows:1}}setConfig(t){super.setConfig(t),this._rowHandler?.destroy(),this._rowHandler=new tt(i=>this._run(i),{hasHold:!0,hasDoubleTap:!!t.double_tap_action})}disconnectedCallback(){super.disconnectedCallback(),this._rowHandler?.destroy()}_run(t){if(!this.hass||!this._config)return;let i=t==="tap"&&!this._config.tap_action?{...this._config,tap_action:{action:"more-info"}}:this._config;ut(this,this.hass,i,t)}render(){let t=this._guard();if(t!==null)return t;let i=this._config,s=this._stateObj,o=["on","open","playing","home"].includes(s.state),a=s.state==="unavailable",l=D(s,i.name),r=i.icon??s.attributes.icon??"mdi:eye";return c`
      <ha-card
        class=${b({vertical:!!i.vertical,unavailable:a})}
        @click=${this._rowHandler.click}
        @pointerdown=${this._rowHandler.down}
        @pointerup=${this._rowHandler.up}
        @pointerleave=${this._rowHandler.up}
        @pointercancel=${this._rowHandler.up}
        @contextmenu=${u=>u.preventDefault()}
      >
        <button
          class=${b({ctl:!0,on:o&&!i.accent,off:!o,accent:!!i.accent})}
          title=${l}
          @click=${this._iconTap}
        >
          <ha-icon icon=${r}></ha-icon>
        </button>
        <div class="text">
          <span class="primary" title=${l}>${l}</span>
          ${this._show("show_state")?c`<span class="secondary"
                >${Tt(this.hass,s)}</span
              >`:p}
        </div>
      </ha-card>
    `}};mt.styles=[...$,g`
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
    `],mt=h([_(Le)],mt);var zt=class extends E{constructor(){super(...arguments);this.defaults={show_state:!0,vertical:!1};this.labels={entity:"Entity (required)",name:"Name",icon:"Icon",show_state:"Show state",vertical:"Vertical layout",accent:"Accent colour",icon_tap_action:"Icon tap action",...Ct};this.helpers={icon_tap_action:"Defaults to toggling, or running the script/scene. The rest of the row opens more-info"}}schema(){return[{name:"entity",required:!0,selector:{entity:{}}},{name:"name",selector:{text:{}}},{name:"icon",selector:{icon:{}}},{type:"grid",name:"",schema:[{name:"show_state",selector:{boolean:{}}},{name:"vertical",selector:{boolean:{}}},{name:"accent",selector:{boolean:{}}}]},{type:"expandable",title:"Actions",icon:"mdi:gesture-tap",schema:[{name:"icon_tap_action",selector:{ui_action:{}}},{name:"tap_action",selector:{ui_action:{}}},{name:"hold_action",selector:{ui_action:{}}},{name:"double_tap_action",selector:{ui_action:{}}}]}]}};zt=h([_(Ie)],zt);T({type:Le,name:"Faceplate Tile",description:"An entity row with a tactile icon button, its name and its state in LCD type"});k();z();k();z();var S=class extends x{constructor(){super(...arguments);this.value=0;this.min=0;this.max=100;this.step=1;this.disabled=!1;this.unit="";this.hideValue=!1;this._down=t=>{this.disabled||(t.preventDefault(),this._pointerId=t.pointerId,t.target.setPointerCapture(t.pointerId),this._dragValue=this._valueFromEvent(t))};this._move=t=>{this.disabled||this._pointerId!==t.pointerId||(this._dragValue=this._valueFromEvent(t))};this._up=t=>{if(this.disabled||this._pointerId!==t.pointerId)return;let i=this._valueFromEvent(t);this._pointerId=void 0,this._dragValue=void 0,this.value=i,this.dispatchEvent(new CustomEvent("slider-change",{detail:{value:i},bubbles:!0,composed:!0}))};this._cancel=()=>{this._pointerId=void 0,this._dragValue=void 0}}get _shown(){return this._dragValue??this.value}_valueFromEvent(t){let i=this.renderRoot.querySelector(".track").getBoundingClientRect(),s=Math.min(1,Math.max(0,(t.clientX-i.left)/i.width)),o=this.min+s*(this.max-this.min),a=Math.round(o/this.step)*this.step;return Math.min(this.max,Math.max(this.min,a))}render(){let t=this.max-this.min||1,s=`${(Math.min(1,Math.max(0,(this._shown-this.min)/t))*100).toFixed(1)}%`;return c`
      <div
        class=${b({track:!0,disabled:this.disabled,dragging:this._dragValue!==void 0})}
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
        ${this.gradient?c`<div
                class="gradient"
                style=${`--faceplate-slider-gradient:${this.gradient}`}
              ></div>
              <div class="marker" style=${`left:${s}`}></div>`:c`<div class="fill" style=${`width:${s}`}></div>`}
        <div class="content">
          <span>${this.label??""}</span>
          ${this.hideValue?p:c`<span class="value"
                >${Math.round(this._shown)}${this.unit}</span
              >`}
        </div>
      </div>
    `}};S.styles=g`
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
  `,h([y({type:Number})],S.prototype,"value",2),h([y({type:Number})],S.prototype,"min",2),h([y({type:Number})],S.prototype,"max",2),h([y({type:Number})],S.prototype,"step",2),h([y({type:Boolean})],S.prototype,"disabled",2),h([y({type:String})],S.prototype,"label",2),h([y({type:String})],S.prototype,"unit",2),h([y({type:String})],S.prototype,"fill",2),h([y({type:String})],S.prototype,"gradient",2),h([y({type:Boolean,attribute:"hide-value"})],S.prototype,"hideValue",2),h([v()],S.prototype,"_dragValue",2),S=h([_("faceplate-slider")],S);var je="faceplate-light-card",Ue="faceplate-light-card-editor",Si=2e3,Ci=6535,it=class extends A{constructor(){super(...arguments);this._toggle=()=>{this.hass.callService("light","toggle",{entity_id:this._config.entity})};this._setBrightness=t=>{this.hass.callService("light","turn_on",{entity_id:this._config.entity,brightness_pct:t.detail.value})};this._setColorTemp=t=>{this.hass.callService("light","turn_on",{entity_id:this._config.entity,color_temp_kelvin:Math.round(t.detail.value)})}}static async getConfigElement(){return document.createElement(Ue)}static getStubConfig(t){return{entity:Object.keys(t.states).find(s=>s.startsWith("light."))??"",show_brightness_control:!0}}getCardSize(){return 2}getGridOptions(){return{columns:6,rows:this._config?.show_color_temp_control?4:3,min_columns:3,min_rows:2}}get _on(){return this._stateObj?.state==="on"}get _brightness(){let t=this._stateObj?.attributes.brightness;return typeof t=="number"?Math.round(t/255*100):void 0}get _supportsBrightness(){return(this._stateObj?.attributes.supported_color_modes??[]).some(i=>i!=="onoff"&&i!=="unknown")}get _supportsColorTemp(){return(this._stateObj?.attributes.supported_color_modes??[]).includes("color_temp")}get _lightColor(){if(this._config?.use_light_color===!1||!this._on)return;let t=this._stateObj?.attributes.rgb_color;if(Array.isArray(t)&&t.length>=3)return`rgb(${t[0]}, ${t[1]}, ${t[2]})`;let i=this._stateObj?.attributes.color_temp_kelvin;if(typeof i=="number")return Mt(i)}render(){let t=this._guard();if(t!==null)return t;let i=this._config,s=this._stateObj,o=s.state==="unavailable",a=D(s,i.name),l=this._lightColor,r=this._brightness,u=i.icon??s.attributes.icon??(this._on?"mdi:lightbulb":"mdi:lightbulb-outline"),d=i.show_brightness_control!==!1&&this._supportsBrightness&&!o,m=i.show_color_temp_control===!0&&this._supportsColorTemp&&!o,f=s.attributes.min_color_temp_kelvin??Si,C=s.attributes.max_color_temp_kelvin??Ci;return c`
      <ha-card>
        <div class=${b({lcd:!0,off:!this._on})}>
          <div class="lcd-top">
            <span class="name" title=${a}>${a}</span>
            <span
              class="badge"
              style=${R(l?{color:l}:{})}
            >
              <ha-icon class="bulb" icon=${u}></ha-icon>
            </span>
          </div>
          <div class="lcd-center">
            ${o?c`<span class="off-label">Unavailable</span>`:this._on?r===void 0?c`<span class="readout">On</span>`:c`<span class="readout"
                      >${r}<span class="unit">%</span></span
                    >`:c`<span class="off-label">Off</span>`}
          </div>
        </div>

        ${d||m?c`<div class="sliders">
              ${d?c`<faceplate-slider
                    label="Brightness"
                    unit="%"
                    min="1"
                    max="100"
                    .value=${r??0}
                    .disabled=${!this._on}
                    .fill=${l??""}
                    @slider-change=${this._setBrightness}
                  ></faceplate-slider>`:p}
              ${m?c`<faceplate-slider
                    label="Warmth"
                    unit="K"
                    .min=${f}
                    .max=${C}
                    .step=${50}
                    .value=${s.attributes.color_temp_kelvin??f}
                    .disabled=${!this._on}
                    .gradient=${`linear-gradient(to right, ${Mt(f)}, ${Mt((f+C)/2)}, ${Mt(C)})`}
                    @slider-change=${this._setColorTemp}
                  ></faceplate-slider>`:p}
            </div>`:p}

        ${this._show("show_controls")?c`<div class="controls">
              <button
                class=${b({ctl:!0,on:this._on,off:!this._on})}
                title="Power"
                style=${R(l?{color:l}:{})}
                .disabled=${o}
                @click=${this._toggle}
              >
                <ha-icon icon="mdi:power"></ha-icon>
              </button>
              <button
                class="ctl"
                title="Details"
                @click=${()=>q(this,i.entity)}
              >
                <ha-icon icon="mdi:dots-horizontal"></ha-icon>
              </button>
            </div>`:p}
      </ha-card>
    `}};it.entityDomains=["light"],it.styles=[...$,g`
      .sliders {
        display: flex;
        flex-direction: column;
        gap: 6px;
        flex: none;
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
    `],it=h([_(je)],it);function Mt(n){let e=Math.min(6600,Math.max(1e3,n))/100,t=a=>Math.round(Math.min(255,Math.max(0,a))),i=e<=66?255:t(329.7*Math.pow(e-60,-.1332)),s=e<=66?t(99.47*Math.log(e)-161.12):t(288.12*Math.pow(e-60,-.0755)),o=e>=66?255:e<=19?0:t(138.52*Math.log(e-10)-305.04);return`rgb(${i}, ${s}, ${o})`}var Ot=class extends E{constructor(){super(...arguments);this.defaults={show_state:!0,show_brightness_control:!0,show_color_temp_control:!1,use_light_color:!0,show_controls:!0};this.labels={entity:"Light entity (required)",name:"Name",icon:"Icon",show_brightness_control:"Brightness slider",show_color_temp_control:"Warmth slider",use_light_color:"Tint with the light's colour",show_controls:"Show buttons"};this.helpers={show_color_temp_control:"Only appears on lights that support colour temperature",show_controls:"Off leaves just the readout and sliders"}}schema(){return[{name:"entity",required:!0,selector:{entity:{domain:"light"}}},{name:"name",selector:{text:{}}},{name:"icon",selector:{icon:{}}},{type:"grid",name:"",schema:[{name:"show_brightness_control",selector:{boolean:{}}},{name:"show_color_temp_control",selector:{boolean:{}}},{name:"use_light_color",selector:{boolean:{}}},{name:"show_controls",selector:{boolean:{}}}]}]}};Ot=h([_(Ue)],Ot);T({type:je,name:"Faceplate Light",description:"Light control with a recessed brightness slider and a tactile power button"});k();z();var Be="faceplate-clock-card",Fe="faceplate-clock-card-editor",W=class extends A{constructor(){super(...arguments);this._now=new Date}static async getConfigElement(){return document.createElement(Fe)}static getStubConfig(){return{show_date:!0,clock_size:"medium"}}getCardSize(){return 1}getGridOptions(){return{columns:6,rows:1,min_columns:3,min_rows:1}}connectedCallback(){super.connectedCallback(),this._schedule()}disconnectedCallback(){super.disconnectedCallback(),window.clearTimeout(this._timer)}_schedule(){window.clearTimeout(this._timer);let t=new Date;this._now=t;let i=this._config?.show_seconds?1e3:6e4,s=i-t.getTime()%i;this._timer=window.setTimeout(()=>this._schedule(),s+20)}willUpdate(t){t.has("_config")&&this._schedule()}get _hour12(){let t=this._config?.time_format??"auto";if(t==="12")return!0;if(t==="24")return!1;let i=this.hass?.locale?.time_format;if(i==="12")return!0;if(i==="24")return!1}get _locale(){return this.hass?.locale?.language??this.hass?.language??"en"}render(){if(!this._config)return p;let t=this._config,i=t.time_zone,s=new Intl.DateTimeFormat(this._locale,{hour:"2-digit",minute:"2-digit",...t.show_seconds?{second:"2-digit"}:{},...this._hour12===void 0?{}:{hour12:this._hour12},...i?{timeZone:i}:{}}).formatToParts(this._now),o=s.find(r=>r.type==="dayPeriod")?.value,a=s.filter(r=>r.type!=="dayPeriod"&&r.type!=="literal").map(r=>r.value).join(":"),l=this._show("show_date")?new Intl.DateTimeFormat(this._locale,{weekday:"short",day:"numeric",month:"short",...i?{timeZone:i}:{}}).format(this._now):void 0;return this.dataset.size=t.clock_size??"medium",c`
      <ha-card>
        <div class="lcd">
          ${t.name?c`<span class="label">${t.name}</span>`:p}
          <span class="time"
            >${a}${o?c`<span class="meridiem">${o}</span>`:p}</span
          >
          ${l?c`<span class="date">${l}</span>`:p}
        </div>
      </ha-card>
    `}};W.requiresEntity=!1,W.styles=[...$,g`
      .lcd {
        gap: 0;
      }
      .time {
        font-size: var(--faceplate-clock-size, 44px);
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
      .date {
        font-size: 13px;
        color: var(--secondary-text-color);
        margin-top: 2px;
        white-space: nowrap;
      }
      .label {
        font-size: 12px;
        font-weight: 500;
        color: var(--secondary-text-color);
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
        .date {
          font-size: 11px;
        }
      }
    `],h([v()],W.prototype,"_now",2),W=h([_(Be)],W);var Ht=class extends E{constructor(){super(...arguments);this.defaults={clock_size:"medium",time_format:"auto",show_seconds:!1,show_date:!0};this.labels={name:"Label (optional)",clock_size:"Size",time_format:"Time format",show_seconds:"Show seconds",show_date:"Show date",time_zone:"Time zone"};this.helpers={time_format:"Auto follows your Home Assistant profile setting",show_seconds:"Ticks every second instead of every minute",time_zone:"IANA name, e.g. Asia/Hong_Kong. Empty uses the panel's own zone"}}schema(){return[{name:"name",selector:{text:{}}},{type:"grid",name:"",schema:[{name:"clock_size",selector:{select:{mode:"dropdown",options:[{value:"small",label:"Small"},{value:"medium",label:"Medium"},{value:"large",label:"Large"}]}}},{name:"time_format",selector:{select:{mode:"dropdown",options:[{value:"auto",label:"Auto"},{value:"12",label:"12 hour"},{value:"24",label:"24 hour"}]}}},{name:"show_seconds",selector:{boolean:{}}},{name:"show_date",selector:{boolean:{}}}]},{name:"time_zone",selector:{text:{}}}]}};Ht=h([_(Fe)],Ht);T({type:Be,name:"Faceplate Clock",description:"Time and date in LCD figures"});k();z();var qe="faceplate-weather-card",Ve="faceplate-weather-card-editor",Ti={"clear-night":"mdi:weather-night",cloudy:"mdi:weather-cloudy",exceptional:"mdi:alert-circle-outline",fog:"mdi:weather-fog",hail:"mdi:weather-hail",lightning:"mdi:weather-lightning","lightning-rainy":"mdi:weather-lightning-rainy",partlycloudy:"mdi:weather-partly-cloudy",pouring:"mdi:weather-pouring",rainy:"mdi:weather-rainy",snowy:"mdi:weather-snowy","snowy-rainy":"mdi:weather-snowy-rainy",sunny:"mdi:weather-sunny",windy:"mdi:weather-windy","windy-variant":"mdi:weather-windy-variant"},G=class extends A{constructor(){super(...arguments);this._forecast=[]}static async getConfigElement(){return document.createElement(Ve)}static getStubConfig(t){return{entity:Object.keys(t.states).find(s=>s.startsWith("weather."))??"",show_forecast:!0}}getCardSize(){return 3}getGridOptions(){return{columns:12,rows:2,min_columns:4,min_rows:1}}disconnectedCallback(){super.disconnectedCallback(),this._unsubscribeForecast()}updated(){this._subscribeForecast()}async _unsubscribeForecast(){let t=this._unsubscribe;this._unsubscribe=void 0,this._subscribedTo=void 0;try{await t?.()}catch{}}async _subscribeForecast(){let t=this._config;if(!this.hass?.connection||!t?.entity)return;if(t.show_forecast===!1){await this._unsubscribeForecast();return}let i=`${t.entity}|${t.forecast_type??"daily"}`;if(this._subscribedTo===i)return;await this._unsubscribeForecast(),this._subscribedTo=i;let s=this._stateObj?.attributes.forecast;Array.isArray(s)&&(this._forecast=s);try{this._unsubscribe=await this.hass.connection.subscribeMessage(o=>{o.forecast&&(this._forecast=o.forecast)},{type:"weather/subscribe_forecast",forecast_type:t.forecast_type??"daily",entity_id:t.entity})}catch{this._subscribedTo=void 0}}_icon(t){return Ti[t??""]??"mdi:weather-cloudy"}_slotLabel(t){let i=new Date(t.datetime);if(Number.isNaN(i.getTime()))return"";let s=this.hass?.locale?.language??this.hass?.language??"en";return this._config?.forecast_type==="hourly"?new Intl.DateTimeFormat(s,{hour:"numeric"}).format(i):new Intl.DateTimeFormat(s,{weekday:"short"}).format(i)}render(){let t=this._guard();if(t!==null)return t;let i=this._config,s=this._stateObj,o=D(s,i.name),a=s.attributes.temperature_unit??"\xB0",l=s.attributes.temperature,r=s.state,u=(i.show_forecast===!1?[]:this._forecast).slice(0,i.forecast_slots??5);return c`
      <ha-card @click=${()=>q(this,i.entity)}>
        <div class="lcd ${i.show_current===!1?"no-current":""}">
          ${i.show_current===!1?p:c`
                <div class="lcd-top">
                  <span class="name" title=${o}>${o}</span>
                  <span class="aux">${this._secondary(s)}</span>
                </div>
                <div class="lcd-center">
                  <span class="readout">
                    ${typeof l=="number"?V(this.hass,l,0):"--"}<span class="unit">${a}</span>
                  </span>
                  <span class="badge">
                    <ha-icon
                      class="condition"
                      icon=${this._icon(r)}
                    ></ha-icon>
                    <span>${te(r)}</span>
                  </span>
                </div>
              `}
          ${u.length?c`<div class="forecast">
                ${u.map(d=>c`<div class="slot">
                    <span class="slot-label">${this._slotLabel(d)}</span>
                    <ha-icon icon=${this._icon(d.condition)}></ha-icon>
                    <span class="slot-temps">
                      ${d.temperature===void 0?"--":V(this.hass,d.temperature,0)}°${d.templow===void 0?p:c`<span class="slot-low"
                            >/${V(this.hass,d.templow,0)}°</span
                          >`}
                    </span>
                  </div>`)}
              </div>`:p}
        </div>
      </ha-card>
    `}_secondary(t){let i=this._config?.secondary_info??["humidity","apparent","wind","pressure"].filter(o=>this._hasReading(t,o)).slice(0,1),s=[];for(let o of i)o==="humidity"&&t.attributes.humidity!==void 0&&s.push(`Humidity ${Math.round(t.attributes.humidity)}%`),o==="wind"&&t.attributes.wind_speed!==void 0&&s.push(`Wind ${V(this.hass,t.attributes.wind_speed,0)} ${t.attributes.wind_speed_unit??""}`.trim()),o==="pressure"&&t.attributes.pressure!==void 0&&s.push(`${V(this.hass,t.attributes.pressure,0)} ${t.attributes.pressure_unit??""}`.trim()),o==="apparent"&&t.attributes.apparent_temperature!==void 0&&s.push(`Feels ${V(this.hass,t.attributes.apparent_temperature,0)}\xB0`);return s.join("   ")}_hasReading(t,i){let s={humidity:"humidity",wind:"wind_speed",pressure:"pressure",apparent:"apparent_temperature"}[i];return t.attributes[s]!==void 0}};G.entityDomains=["weather"],G.styles=[...$,g`
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
    `],h([v()],G.prototype,"_forecast",2),G=h([_(qe)],G);var Pt=class extends E{constructor(){super(...arguments);this.defaults={show_current:!0,show_forecast:!0,forecast_type:"daily",forecast_slots:5};this.labels={entity:"Weather entity (required)",name:"Name",show_current:"Show current conditions",show_forecast:"Show forecast",forecast_type:"Forecast type",forecast_slots:"Forecast slots",secondary_info:"Auxiliary readouts"};this.helpers={forecast_slots:"How many days or hours to show across the strip",secondary_info:"Shown on the top line beside the name"}}schema(){return[{name:"entity",required:!0,selector:{entity:{domain:"weather"}}},{name:"name",selector:{text:{}}},{type:"grid",name:"",schema:[{name:"show_current",selector:{boolean:{}}},{name:"show_forecast",selector:{boolean:{}}},{name:"forecast_type",selector:{select:{mode:"dropdown",options:[{value:"daily",label:"Daily"},{value:"hourly",label:"Hourly"},{value:"twice_daily",label:"Twice daily"}]}}},{name:"forecast_slots",selector:{number:{min:1,max:10,mode:"box"}}}]},{name:"secondary_info",selector:{select:{multiple:!0,mode:"list",options:[{value:"humidity",label:"Humidity"},{value:"wind",label:"Wind"},{value:"pressure",label:"Pressure"},{value:"apparent",label:"Feels like"}]}}}]}};Pt=h([_(Ve)],Pt);T({type:qe,name:"Faceplate Weather",description:"Current conditions and a forecast strip, in LCD type"});k();z();var We="faceplate-banner-card",Ge="faceplate-banner-card-editor",L=class extends A{constructor(){super(...arguments);this._rendered=""}static async getConfigElement(){return document.createElement(Ge)}static getStubConfig(){return{content:"{{ now().strftime('%H:%M') }}",severity:"plain",align:"center",text_size:"large"}}getCardSize(){return 1}getGridOptions(){return{columns:12,rows:1,min_columns:3,min_rows:1}}disconnectedCallback(){super.disconnectedCallback(),this._unsubscribeTemplate()}updated(){this._subscribeTemplate()}async _unsubscribeTemplate(){let t=this._unsubscribe;this._unsubscribe=void 0,this._subscribedTo=void 0;try{await t?.()}catch{}}async _subscribeTemplate(){let t=this._config?.content;if(!(!this.hass?.connection||!t)&&this._subscribedTo!==t){if(await this._unsubscribeTemplate(),this._subscribedTo=t,!t.includes("{{")&&!t.includes("{%")){this._rendered=t,this._error=void 0;return}try{this._unsubscribe=await this.hass.connection.subscribeMessage(i=>{if(i.error){this._error=i.error;return}this._error=void 0,this._rendered=i.result??""},{type:"render_template",template:t,report_errors:!0})}catch(i){this._error=i instanceof Error?i.message:String(i),this._subscribedTo=void 0}}}_asText(t){return t.replace(/<br\s*\/?>/gi," ").replace(/<[^>]*>/g,"").replace(/&nbsp;/gi," ").replace(/&amp;/gi,"&").replace(/&lt;/gi,"<").replace(/&gt;/gi,">").replace(/&#39;|&apos;/gi,"'").replace(/&quot;/gi,'"').replace(/\s+/g," ").trim()}render(){if(!this._config)return p;let t=this._config,i=t.severity??"plain";this.dataset.severity=i,this.dataset.size=t.text_size??"medium";let s=this._asText(this._rendered);return c`
      <ha-card
        class=${b({"text-only":!!t.text_only,[`align-${t.align??"center"}`]:!0})}
      >
        ${t.icon?c`<ha-icon icon=${t.icon}></ha-icon>`:p}
        ${this._error?c`<span class="error">Template error: ${this._error}</span>`:c`<span class="text" title=${s}>${s}</span>`}
      </ha-card>
    `}};L.requiresEntity=!1,L.styles=[...$,g`
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
    `],h([v()],L.prototype,"_rendered",2),h([v()],L.prototype,"_error",2),L=h([_(We)],L);var Nt=class extends E{constructor(){super(...arguments);this.defaults={severity:"plain",align:"center",text_size:"medium",text_only:!1};this.labels={content:"Content",icon:"Icon (optional)",severity:"Severity",align:"Alignment",text_size:"Text size",text_only:"No card background"};this.helpers={content:"Jinja template, re-rendered by Home Assistant whenever its inputs change. Markup is stripped \u2014 use the options below for styling",severity:"Colours the text; alert is the red 'needs attention' banner",text_only:"Renders straight onto the view, like a heading"}}schema(){return[{name:"content",required:!0,selector:{template:{}}},{name:"icon",selector:{icon:{}}},{type:"grid",name:"",schema:[{name:"severity",selector:{select:{mode:"dropdown",options:[{value:"plain",label:"Plain"},{value:"info",label:"Info"},{value:"ok",label:"OK"},{value:"warn",label:"Warning"},{value:"alert",label:"Alert"}]}}},{name:"align",selector:{select:{mode:"dropdown",options:[{value:"left",label:"Left"},{value:"center",label:"Centre"},{value:"right",label:"Right"}]}}},{name:"text_size",selector:{select:{mode:"dropdown",options:[{value:"small",label:"Small"},{value:"medium",label:"Medium"},{value:"large",label:"Large"}]}}},{name:"text_only",selector:{boolean:{}}}]}]}};Nt=h([_(Ge)],Nt);T({type:We,name:"Faceplate Banner",description:"A template-driven status line \u2014 headers, clocks and 'needs attention' warnings"});T({type:gt,name:"Faceplate Climate",description:"Air-conditioner remote with temperature, fan and swing controls, built for small wall panels"});var ki="0.1.0";console.info(`%c FACEPLATE-CARDS %c ${ki} `,"color:#fff;background:#2196f3;font-weight:700","color:#2196f3;background:#fff;font-weight:700");
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
