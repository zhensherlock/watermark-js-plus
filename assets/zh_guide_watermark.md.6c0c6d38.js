import{V as n}from"./chunks/theme.e9495158.js";import{u as D,W as d}from"./chunks/app.b99d38bc.js";import"./chunks/global.61cd703a.js";import{d as v,u as x,k as _,l as W,D as i,g as S,J as s,m as a,b as l,e as o,Q as r,a0 as j,o as T}from"./chunks/framework.15cd7847.js";import{d as P}from"./chunks/dayjs.min.0814b3fd.js";import"./chunks/pinia.f71d0084.js";import"./chunks/commonjsHelpers.725317a4.js";const z=a("h1",{id:"明水印",tabindex:"-1"},[o("明水印 "),a("a",{class:"header-anchor",href:"#明水印","aria-label":'Permalink to "明水印"'},"​")],-1),O=a("h2",{id:"文本水印",tabindex:"-1"},[o("文本水印 "),a("a",{class:"header-anchor",href:"#文本水印","aria-label":'Permalink to "文本水印"'},"​")],-1),R={class:"text-watermark"},q=r(`<div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { Watermark } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;watermark-js-plus&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">// 引入水印插件</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">watermark</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Watermark</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  content: </span><span style="color:#9ECBFF;">&#39;hello my watermark&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  width: </span><span style="color:#79B8FF;">200</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  height: </span><span style="color:#79B8FF;">200</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  rotate: </span><span style="color:#79B8FF;">22</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  layout: </span><span style="color:#9ECBFF;">&#39;grid&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  gridLayoutOptions: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    rows: </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    cols: </span><span style="color:#79B8FF;">2</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    gap: [</span><span style="color:#79B8FF;">20</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">20</span><span style="color:#E1E4E8;">],</span></span>
<span class="line"><span style="color:#E1E4E8;">    matrix: [[</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">], [</span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">]]</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  advancedStyle: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    type: </span><span style="color:#9ECBFF;">&#39;linear&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    colorStops: [</span></span>
<span class="line"><span style="color:#E1E4E8;">      {</span></span>
<span class="line"><span style="color:#E1E4E8;">        offset: </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        color: </span><span style="color:#9ECBFF;">&#39;red&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">      },</span></span>
<span class="line"><span style="color:#E1E4E8;">      {</span></span>
<span class="line"><span style="color:#E1E4E8;">        offset: </span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        color: </span><span style="color:#9ECBFF;">&#39;blue&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    ]</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">onSuccess</span><span style="color:#E1E4E8;">: () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// success callback</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">watermark.</span><span style="color:#B392F0;">create</span><span style="color:#E1E4E8;">() </span><span style="color:#6A737D;">// 添加水印</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">watermark.</span><span style="color:#B392F0;">destroy</span><span style="color:#E1E4E8;">() </span><span style="color:#6A737D;">// 删除水印</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { Watermark } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;watermark-js-plus&#39;</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">// 引入水印插件</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">watermark</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Watermark</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  content: </span><span style="color:#032F62;">&#39;hello my watermark&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  width: </span><span style="color:#005CC5;">200</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  height: </span><span style="color:#005CC5;">200</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  rotate: </span><span style="color:#005CC5;">22</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  layout: </span><span style="color:#032F62;">&#39;grid&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  gridLayoutOptions: {</span></span>
<span class="line"><span style="color:#24292E;">    rows: </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    cols: </span><span style="color:#005CC5;">2</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    gap: [</span><span style="color:#005CC5;">20</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">20</span><span style="color:#24292E;">],</span></span>
<span class="line"><span style="color:#24292E;">    matrix: [[</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">], [</span><span style="color:#005CC5;">0</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">]]</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  advancedStyle: {</span></span>
<span class="line"><span style="color:#24292E;">    type: </span><span style="color:#032F62;">&#39;linear&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    colorStops: [</span></span>
<span class="line"><span style="color:#24292E;">      {</span></span>
<span class="line"><span style="color:#24292E;">        offset: </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        color: </span><span style="color:#032F62;">&#39;red&#39;</span></span>
<span class="line"><span style="color:#24292E;">      },</span></span>
<span class="line"><span style="color:#24292E;">      {</span></span>
<span class="line"><span style="color:#24292E;">        offset: </span><span style="color:#005CC5;">1</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        color: </span><span style="color:#032F62;">&#39;blue&#39;</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    ]</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">onSuccess</span><span style="color:#24292E;">: () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// success callback</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">watermark.</span><span style="color:#6F42C1;">create</span><span style="color:#24292E;">() </span><span style="color:#6A737D;">// 添加水印</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">watermark.</span><span style="color:#6F42C1;">destroy</span><span style="color:#24292E;">() </span><span style="color:#6A737D;">// 删除水印</span></span></code></pre></div>`,1),I=a("h2",{id:"多行文本水印",tabindex:"-1"},[o("多行文本水印 "),a("a",{class:"header-anchor",href:"#多行文本水印","aria-label":'Permalink to "多行文本水印"'},"​")],-1),V={class:"multiline-text-watermark"},L=r(`<div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { Watermark } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;watermark-js-plus&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">// 引入水印插件</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">watermark</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Watermark</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  contentType: </span><span style="color:#9ECBFF;">&#39;multi-line-text&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  content: </span><span style="color:#9ECBFF;">&#39;multi text watermark&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  fontSize: </span><span style="color:#9ECBFF;">&#39;30px&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  width: </span><span style="color:#79B8FF;">200</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  height: </span><span style="color:#79B8FF;">200</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  shadowStyle: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    shadowBlur: </span><span style="color:#79B8FF;">10</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    shadowColor: </span><span style="color:#9ECBFF;">&#39;#000000FF&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    shadowOffsetX: </span><span style="color:#79B8FF;">0</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    shadowOffsetY: </span><span style="color:#79B8FF;">0</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">onSuccess</span><span style="color:#E1E4E8;">: () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// success callback</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">watermark.</span><span style="color:#B392F0;">create</span><span style="color:#E1E4E8;">() </span><span style="color:#6A737D;">// 添加水印</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">watermark.</span><span style="color:#B392F0;">destroy</span><span style="color:#E1E4E8;">() </span><span style="color:#6A737D;">// 删除水印</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { Watermark } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;watermark-js-plus&#39;</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">// 引入水印插件</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">watermark</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Watermark</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  contentType: </span><span style="color:#032F62;">&#39;multi-line-text&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  content: </span><span style="color:#032F62;">&#39;multi text watermark&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  fontSize: </span><span style="color:#032F62;">&#39;30px&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  width: </span><span style="color:#005CC5;">200</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  height: </span><span style="color:#005CC5;">200</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  shadowStyle: {</span></span>
<span class="line"><span style="color:#24292E;">    shadowBlur: </span><span style="color:#005CC5;">10</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    shadowColor: </span><span style="color:#032F62;">&#39;#000000FF&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    shadowOffsetX: </span><span style="color:#005CC5;">0</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    shadowOffsetY: </span><span style="color:#005CC5;">0</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">onSuccess</span><span style="color:#24292E;">: () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// success callback</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">watermark.</span><span style="color:#6F42C1;">create</span><span style="color:#24292E;">() </span><span style="color:#6A737D;">// 添加水印</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">watermark.</span><span style="color:#6F42C1;">destroy</span><span style="color:#24292E;">() </span><span style="color:#6A737D;">// 删除水印</span></span></code></pre></div>`,1),N=a("h2",{id:"图片水印",tabindex:"-1"},[o("图片水印 "),a("a",{class:"header-anchor",href:"#图片水印","aria-label":'Permalink to "图片水印"'},"​")],-1),$={class:"image-watermark"},H=r(`<div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { Watermark } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;watermark-js-plus&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">// 引入水印插件</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">watermark</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Watermark</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  contentType: </span><span style="color:#9ECBFF;">&#39;image&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  image: </span><span style="color:#9ECBFF;">&#39;https://cdn.jsdelivr.net/gh/zhensherlock/oss@main/uPic/github-mkWBiK.png&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  width: </span><span style="color:#79B8FF;">300</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  height: </span><span style="color:#79B8FF;">300</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  imageWidth: </span><span style="color:#79B8FF;">100</span><span style="color:#E1E4E8;">, </span><span style="color:#6A737D;">// 图片宽度</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// imageHeight: 20, // 图片高度</span></span>
<span class="line"><span style="color:#E1E4E8;">  filter: </span><span style="color:#9ECBFF;">&#39;grayscale(100%)&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#6A737D;">// 灰阶</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">onSuccess</span><span style="color:#E1E4E8;">: () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// success callback</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">watermark.</span><span style="color:#B392F0;">create</span><span style="color:#E1E4E8;">() </span><span style="color:#6A737D;">// 添加水印</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">watermark.</span><span style="color:#B392F0;">destroy</span><span style="color:#E1E4E8;">() </span><span style="color:#6A737D;">// 删除水印</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { Watermark } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;watermark-js-plus&#39;</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">// 引入水印插件</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">watermark</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Watermark</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  contentType: </span><span style="color:#032F62;">&#39;image&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  image: </span><span style="color:#032F62;">&#39;https://cdn.jsdelivr.net/gh/zhensherlock/oss@main/uPic/github-mkWBiK.png&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  width: </span><span style="color:#005CC5;">300</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  height: </span><span style="color:#005CC5;">300</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  imageWidth: </span><span style="color:#005CC5;">100</span><span style="color:#24292E;">, </span><span style="color:#6A737D;">// 图片宽度</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// imageHeight: 20, // 图片高度</span></span>
<span class="line"><span style="color:#24292E;">  filter: </span><span style="color:#032F62;">&#39;grayscale(100%)&#39;</span><span style="color:#24292E;">, </span><span style="color:#6A737D;">// 灰阶</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">onSuccess</span><span style="color:#24292E;">: () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// success callback</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">watermark.</span><span style="color:#6F42C1;">create</span><span style="color:#24292E;">() </span><span style="color:#6A737D;">// 添加水印</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">watermark.</span><span style="color:#6F42C1;">destroy</span><span style="color:#24292E;">() </span><span style="color:#6A737D;">// 删除水印</span></span></code></pre></div>`,1),K=a("h2",{id:"富文本水印",tabindex:"-1"},[o("富文本水印 "),a("a",{class:"header-anchor",href:"#富文本水印","aria-label":'Permalink to "富文本水印"'},"​")],-1),M={class:"rich-text-watermark"},X=r(`<div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { Watermark } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;watermark-js-plus&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">// 引入水印插件</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">watermark</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Watermark</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  contentType: </span><span style="color:#9ECBFF;">&#39;rich-text&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  content: </span><span style="color:#9ECBFF;">&#39;&lt;div style=&quot;background: #ccc;&quot;&gt;富文本水印超级 &lt;span style=&quot;color: #f00&quot;&gt;棒&lt;/span&gt;&lt;/div&gt;&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  width: </span><span style="color:#79B8FF;">300</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  height: </span><span style="color:#79B8FF;">300</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  filter: </span><span style="color:#9ECBFF;">&#39;blur(2px)&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  movable: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">onSuccess</span><span style="color:#E1E4E8;">: () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// success callback</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">watermark.</span><span style="color:#B392F0;">create</span><span style="color:#E1E4E8;">() </span><span style="color:#6A737D;">// 添加水印</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">watermark.</span><span style="color:#B392F0;">destroy</span><span style="color:#E1E4E8;">() </span><span style="color:#6A737D;">// 删除水印</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { Watermark } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;watermark-js-plus&#39;</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">// 引入水印插件</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">watermark</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Watermark</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  contentType: </span><span style="color:#032F62;">&#39;rich-text&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  content: </span><span style="color:#032F62;">&#39;&lt;div style=&quot;background: #ccc;&quot;&gt;富文本水印超级 &lt;span style=&quot;color: #f00&quot;&gt;棒&lt;/span&gt;&lt;/div&gt;&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  width: </span><span style="color:#005CC5;">300</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  height: </span><span style="color:#005CC5;">300</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  filter: </span><span style="color:#032F62;">&#39;blur(2px)&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  movable: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">onSuccess</span><span style="color:#24292E;">: () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// success callback</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">watermark.</span><span style="color:#6F42C1;">create</span><span style="color:#24292E;">() </span><span style="color:#6A737D;">// 添加水印</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">watermark.</span><span style="color:#6F42C1;">destroy</span><span style="color:#24292E;">() </span><span style="color:#6A737D;">// 删除水印</span></span></code></pre></div>`,1),Y=a("h2",{id:"子元素水印",tabindex:"-1"},[o("子元素水印 "),a("a",{class:"header-anchor",href:"#子元素水印","aria-label":'Permalink to "子元素水印"'},"​")],-1),J={class:"child-element-watermark"},Q=r(`<div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { Watermark } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;watermark-js-plus&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">// 引入水印插件</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">watermark</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Watermark</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  parent: </span><span style="color:#9ECBFF;">&#39;.parent-element&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  width: </span><span style="color:#79B8FF;">400</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  height: </span><span style="color:#79B8FF;">400</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  backgroundRepeat: </span><span style="color:#9ECBFF;">&#39;no-repeat&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  zIndex: </span><span style="color:#79B8FF;">900</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">watermark.</span><span style="color:#B392F0;">create</span><span style="color:#E1E4E8;">() </span><span style="color:#6A737D;">// 添加水印</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">watermark.</span><span style="color:#B392F0;">destroy</span><span style="color:#E1E4E8;">() </span><span style="color:#6A737D;">// 删除水印</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { Watermark } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;watermark-js-plus&#39;</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">// 引入水印插件</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">watermark</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Watermark</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  parent: </span><span style="color:#032F62;">&#39;.parent-element&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  width: </span><span style="color:#005CC5;">400</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  height: </span><span style="color:#005CC5;">400</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  backgroundRepeat: </span><span style="color:#032F62;">&#39;no-repeat&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  zIndex: </span><span style="color:#005CC5;">900</span></span>
<span class="line"><span style="color:#24292E;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">watermark.</span><span style="color:#6F42C1;">create</span><span style="color:#24292E;">() </span><span style="color:#6A737D;">// 添加水印</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">watermark.</span><span style="color:#6F42C1;">destroy</span><span style="color:#24292E;">() </span><span style="color:#6A737D;">// 删除水印</span></span></code></pre></div><div class="parent-element" style="width:400px;height:400px;border:1px solid #333;margin-top:10px;position:relative;"></div>`,2),cs=JSON.parse('{"title":"明水印","description":"","frontmatter":{"layout":"doc"},"headers":[],"relativePath":"zh/guide/watermark.md","filePath":"zh/guide/watermark.md"}'),U={name:"zh/guide/watermark.md"},rs=v({...U,setup(G){const p=D(),{isDark:E}=x();_("");const e=j();let y=null;W(()=>{richTextWatermark=new d({contentType:"rich-text",content:'<div style="background: #ccc;">富文本水印 <span style="color: #f00">good</span></div>',width:300,height:300,filter:"blur(2px)",movable:!0,onSuccess:()=>{e.appContext.config.globalProperties.$message({appendTo:"#app",message:"富文本水印添加成功！",type:"success"})}}),y=new d({parent:".parent-element",width:400,height:400,backgroundRepeat:"no-repeat",zIndex:900})});const m=()=>{p.createWatermark({content:"hello my watermark",fontColor:E.value?"#fff":"#000",width:200,height:200,rotate:22,layout:"grid",gridLayoutOptions:{rows:2,cols:2,gap:[20,20],matrix:[[1,0],[0,1]]},advancedStyle:{type:"linear",colorStops:[{offset:0,color:"red"},{offset:1,color:"blue"}]},onSuccess:()=>{e.appContext.config.globalProperties.$message({appendTo:"#app",message:"文本水印添加成功！",type:"success"})}})},F=()=>{p.changeWatermark({content:"update my text watermark at "+P().format("HH:mm:ss"),fontColor:E.value?"#fff":"#000"},"append")},h=()=>{p.removeWatermark()},k=()=>{p.createWatermark({contentType:"multi-line-text",content:"multi text watermark",fontColor:E.value?"#fff":"#000",fontSize:"30px",width:200,height:200,shadowStyle:{shadowBlur:10,shadowColor:"#000000FF",shadowOffsetX:0,shadowOffsetY:0},onSuccess:()=>{e.appContext.config.globalProperties.$message({appendTo:"#app",message:"多行文本水印添加成功！",type:"success"})}})},g=()=>{p.removeWatermark()},u=()=>{p.createWatermark({contentType:"image",image:"https://cdn.jsdelivr.net/gh/zhensherlock/oss@main/uPic/github-mkWBiK.png",imageWidth:200,width:300,height:300,filter:"grayscale(100%)",onSuccess:()=>{e.appContext.config.globalProperties.$message({appendTo:"#app",message:"图片水印添加成功！",type:"success"})}})},C=()=>{p.removeWatermark()},w=()=>{p.createWatermark({contentType:"rich-text",content:'<div style="background: #ccc;">富文本水印 <span style="color: #f00">good</span></div>',width:300,height:300,filter:"blur(2px)",movable:!0,onSuccess:()=>{e.appContext.config.globalProperties.$message({appendTo:"#app",message:"富文本水印添加成功！",type:"success"})}})},f=()=>{p.removeWatermark()},B=()=>{y.create()},b=()=>{y.destroy()};return(Z,ss)=>{const A=i("el-backtop"),t=i("el-space"),c=i("el-affix");return T(),S("div",null,[z,s(A),O,a("div",R,[q,s(c,{target:".text-watermark",position:"bottom",offset:0},{default:l(()=>[s(t,{class:"block-operation"},{default:l(()=>[s(n,{text:"添加文本水印",onClick:m}),s(n,{text:"修改文本水印",onClick:F}),s(n,{text:"删除文本水印",onClick:h})]),_:1})]),_:1})]),I,a("div",V,[L,s(c,{target:".multiline-text-watermark",position:"bottom",offset:0},{default:l(()=>[s(t,{class:"block-operation"},{default:l(()=>[s(n,{text:"添加多行文本水印",onClick:k}),s(n,{text:"删除多行文本水印",onClick:g})]),_:1})]),_:1})]),N,a("div",$,[H,s(c,{target:".image-watermark",position:"bottom",offset:0},{default:l(()=>[s(t,{class:"block-operation"},{default:l(()=>[s(n,{text:"添加图片水印",onClick:u}),s(n,{text:"删除图片水印",onClick:C})]),_:1})]),_:1})]),K,a("div",M,[X,s(c,{target:".rich-text-watermark",position:"bottom",offset:0},{default:l(()=>[s(t,{class:"block-operation"},{default:l(()=>[s(n,{text:"添加富文本水印",onClick:w}),s(n,{text:"删除富文本水印",onClick:f})]),_:1})]),_:1})]),Y,a("div",J,[Q,s(c,{target:".child-element-watermark",position:"bottom",offset:0,"z-index":"1000"},{default:l(()=>[s(t,{class:"block-operation"},{default:l(()=>[s(n,{text:"添加子元素水印",onClick:B}),s(n,{text:"删除子元素水印",onClick:b})]),_:1})]),_:1})])])}}});export{cs as __pageData,rs as default};
