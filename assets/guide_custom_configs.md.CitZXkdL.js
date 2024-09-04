import{d as E,u as C,p as _,K as F,C as b,V as t,G as a,e as l,b as e,ac as p,f as D,g as A,P as n,o as W}from"./chunks/framework.ByrA7e49.js";import{c as v,W as w}from"./chunks/WatermarkOptionsForm.1EbUEse3.js";import{u as O}from"./chunks/app.TjSiePMq.js";import"./chunks/commonjsHelpers.Cpj98o6Y.js";import"./chunks/index.D3FXna7l.js";import"./chunks/index.88-vqJ23.js";import"./chunks/upload.BXoMc33s.js";import"./chunks/theme.BPMb0YMx.js";import"./chunks/blind.BytLNuD1.js";const x={class:"language-js vp-adaptive-theme"},B={class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0"},j={class:"line"},N={style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},H=JSON.parse('{"title":"Custom Configs","description":"","frontmatter":{"layout":"doc"},"headers":[],"relativePath":"guide/custom/configs.md","filePath":"guide/custom/configs.md"}'),S={name:"guide/custom/configs.md"},I=E({...S,setup(V){const o=O();C();const k={width:300,height:300,rotate:45};let i=_(v(k));F(()=>{});const h=()=>{o.createWatermark(i)},m=()=>{o.removeWatermark()},c=r=>{Object.keys(i).forEach(s=>{delete i[s]}),i=Object.assign(i,r),o.changeWatermark(r)};return(r,s)=>{const g=n("el-backtop"),u=n("ClientOnly"),d=n("el-button"),f=n("el-space"),y=n("el-affix");return W(),b("div",null,[t(g),s[7]||(s[7]=a("h1",{id:"custom-configs",tabindex:"-1"},[l("Custom Configs "),a("a",{class:"header-anchor",href:"#custom-configs","aria-label":'Permalink to "Custom Configs"'},"​")],-1)),t(u,null,{default:e(()=>[t(w,{options:k,onChange:c})]),_:1}),a("div",x,[s[3]||(s[3]=a("button",{title:"Copy Code",class:"copy"},null,-1)),s[4]||(s[4]=a("span",{class:"lang"},"js",-1)),a("pre",B,[a("code",null,[s[1]||(s[1]=p(`<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { Watermark } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;watermark-js-plus&#39;</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> // import watermark plugin</span></span>
<span class="line"></span>
`,4)),a("span",j,[s[0]||(s[0]=p('<span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> watermark</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Watermark</span>',5)),a("span",N,"("+D(A(i))+")",1)]),s[2]||(s[2]=p(`
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">watermark.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">create</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// add watermark</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">watermark.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">destroy</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// remove watermark</span></span>`,8))])])]),t(y,{position:"bottom",offset:0},{default:e(()=>[t(f,{class:"block-operation"},{default:e(()=>[t(d,{round:"",type:"primary",onClick:h},{default:e(()=>s[5]||(s[5]=[l("Add Watermark")])),_:1}),t(d,{round:"",type:"danger",onClick:m},{default:e(()=>s[6]||(s[6]=[l("Remove Watermark")])),_:1})]),_:1})]),_:1})])}}});export{H as __pageData,I as default};
