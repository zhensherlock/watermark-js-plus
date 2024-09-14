import{p as S}from"./chunks/theme.C_uCbxvq.js";import"./chunks/index.E5uUK3Fu.js";import{B as j}from"./chunks/blind.Cws0_8IT.js";import{d as L,l as n,K as E,h as b,j as s,e as J,a5 as e,b as a,as as o,o as f,g as K,a as M,a4 as W,V as q,aj as A,_ as G}from"./chunks/framework.D04L8mUS.js";const ee=JSON.parse('{"title":"解析配置","description":"","frontmatter":{"layout":"doc"},"headers":[],"relativePath":"zh/guide/custom/decode.md","filePath":"zh/guide/custom/decode.md"}'),H={name:"zh/guide/custom/decode.md"},Q=L({...H,setup(R){const i=n(""),_=n("light"),r=n("overlay"),u=n(4),d=n("#000"),v=n(""),C=["source-over","source-in","source-out","source-atop","destination-over","destination-in","destination-out","destination-atop","lighter","copy","xor","multiply","screen","overlay","darken","lighten","color-dodge","color-burn","hard-light","soft-light","difference","exclusion","hue","saturation","color","luminosity"];E(()=>{});const V=p=>{i.value=p.url,c()},y=()=>{_.value==="light"?(r.value="overlay",u.value=4,d.value="#000"):(r.value="overlay",u.value=3,d.value="#fff"),c()},k=()=>{c()},x=()=>{c()},w=()=>{c()},c=()=>{j.decode({fillColor:d.value,compositeTimes:u.value,compositeOperation:r.value,url:i.value,onSuccess:p=>{v.value=p}})};return(p,l)=>{const T=o("el-icon"),B=o("el-upload"),g=o("el-image"),O=o("el-space"),h=o("el-radio-button"),U=o("el-radio-group"),m=o("el-descriptions-item"),N=o("el-option"),z=o("el-select"),D=o("el-input-number"),F=o("el-color-picker"),I=o("el-descriptions"),P=o("el-backtop");return f(),b("div",null,[l[7]||(l[7]=s("h1",{id:"解析配置",tabindex:"-1"},[J("解析配置 "),s("a",{class:"header-anchor",href:"#解析配置","aria-label":'Permalink to "解析配置"'},"​")],-1)),s("div",null,[l[4]||(l[4]=s("div",{class:"title"},"原图",-1)),e(O,null,{default:a(()=>[e(B,{style:{display:"inline-block"},"list-type":"picture-card",accept:"image/*","auto-upload":!1,"show-file-list":!1,"on-change":V},{default:a(()=>[e(T,null,{default:a(()=>[e(K(S))]),_:1})]),_:1}),i.value?(f(),M(g,{key:0,style:{width:"148px",height:"148px"},src:i.value,"preview-src-list":[i.value]},null,8,["src","preview-src-list"])):W("",!0)]),_:1}),l[5]||(l[5]=s("div",{class:"title"},"参数",-1)),e(I,{column:1,border:""},{default:a(()=>[e(m,{label:"Theme"},{default:a(()=>[e(U,{modelValue:_.value,"onUpdate:modelValue":l[0]||(l[0]=t=>_.value=t),onChange:y},{default:a(()=>[e(h,{label:"Light",value:"light"}),e(h,{label:"Dark",value:"dark"})]),_:1},8,["modelValue"])]),_:1}),e(m,{label:"CompositeOperation"},{default:a(()=>[e(z,{style:{width:"400px"},modelValue:r.value,"onUpdate:modelValue":l[1]||(l[1]=t=>r.value=t),filterable:"",placeholder:"please input composite operation",onChange:k},{default:a(()=>[(f(),b(q,null,A(C,t=>e(N,{key:t,label:t,value:t},null,8,["label","value"])),64))]),_:1},8,["modelValue"])]),_:1}),e(m,{label:"CompositeTimes"},{default:a(()=>[e(D,{modelValue:u.value,"onUpdate:modelValue":l[2]||(l[2]=t=>u.value=t),onChange:x},null,8,["modelValue"])]),_:1}),e(m,{label:"FillColor"},{default:a(()=>[e(F,{modelValue:d.value,"onUpdate:modelValue":l[3]||(l[3]=t=>d.value=t),onChange:w},null,8,["modelValue"])]),_:1})]),_:1}),l[6]||(l[6]=s("div",{class:"title"},"结果",-1)),e(g,{style:{width:"400px",height:"400px"},src:v.value,"preview-src-list":[v.value],fit:"cover"},null,8,["src","preview-src-list"])]),e(P)])}}}),le=G(Q,[["__scopeId","data-v-8f2e4874"]]);export{ee as __pageData,le as default};
