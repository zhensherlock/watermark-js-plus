import{d as E,u as _,a4 as C,v as F,c as b,j as a,a as r,G as t,w as e,b2 as p,t as D,k as A,B as n,o as v}from"./chunks/framework.BGp09GhQ.js";import{c as w,W}from"./chunks/WatermarkOptionsForm.BA95QYxr.js";import{u as B}from"./chunks/app.DwTi7vwJ.js";import"./chunks/theme.D5K5i_ln.js";import"./chunks/index.o9v2vld9.js";import"./chunks/blind.BNtPW_bl.js";const O={class:"language-js vp-adaptive-theme"},x={class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0"},j={class:"line"},N={style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},T=JSON.parse('{"title":"自定义配置","description":"","frontmatter":{"layout":"doc"},"headers":[],"relativePath":"zh/guide/custom/configs.md","filePath":"zh/guide/custom/configs.md"}'),S={name:"zh/guide/custom/configs.md"},q=E({...S,setup(V){const l=B();_();const k={width:300,height:300,rotate:45};let i=C(w(k));F(()=>{});const d=()=>{l.createWatermark(i)},m=()=>{l.removeWatermark()},c=o=>{Object.keys(i).forEach(s=>{delete i[s]}),i=Object.assign(i,o),l.changeWatermark(o)};return(o,s)=>{const g=n("ClientOnly"),h=n("el-button"),u=n("el-space"),y=n("el-affix"),f=n("el-backtop");return v(),b("div",null,[s[7]||(s[7]=a("h1",{id:"自定义配置",tabindex:"-1"},[r("自定义配置 "),a("a",{class:"header-anchor",href:"#自定义配置","aria-label":'Permalink to "自定义配置"'},"​")],-1)),t(g,null,{default:e(()=>[t(W,{options:k,onChange:c})]),_:1}),a("div",O,[s[3]||(s[3]=a("button",{title:"Copy Code",class:"copy"},null,-1)),s[4]||(s[4]=a("span",{class:"lang"},"js",-1)),a("pre",x,[a("code",null,[s[1]||(s[1]=p(`<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { Watermark } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;watermark-js-plus&#39;</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> // import watermark plugin</span></span>
<span class="line"></span>
`,4)),a("span",j,[s[0]||(s[0]=p('<span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> watermark</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Watermark</span>',5)),a("span",N,"("+D(A(i))+")",1)]),s[2]||(s[2]=p(`
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">watermark.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">create</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// add watermark</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">watermark.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">destroy</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// remove watermark</span></span>`,8))])])]),t(y,{position:"bottom",offset:0},{default:e(()=>[t(u,{class:"block-operation"},{default:e(()=>[t(h,{round:"",type:"primary",onClick:d},{default:e(()=>s[5]||(s[5]=[r("添加水印")])),_:1}),t(h,{round:"",type:"danger",onClick:m},{default:e(()=>s[6]||(s[6]=[r("删除水印")])),_:1})]),_:1})]),_:1}),t(f)])}}});export{T as __pageData,q as default};
