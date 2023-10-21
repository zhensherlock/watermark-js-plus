import{V as n}from"./chunks/theme.854b5853.js";import{u as b,W}from"./chunks/app.a2b5ef60.js";import"./chunks/global.61cd703a.js";import{d as _,u as T,k as S,l as j,D as i,g as m,J as s,m as a,b as l,F as R,G as P,e,Q as r,o as d,t as z,a0 as I}from"./chunks/framework.32226754.js";import{d as O}from"./chunks/dayjs.min.0814b3fd.js";import"./chunks/pinia.9f389e5d.js";import"./chunks/commonjsHelpers.725317a4.js";const q=a("h1",{id:"watermark",tabindex:"-1"},[e("Watermark "),a("a",{class:"header-anchor",href:"#watermark","aria-label":'Permalink to "Watermark"'},"​")],-1),L=a("h2",{id:"text-watermark",tabindex:"-1"},[e("Text Watermark "),a("a",{class:"header-anchor",href:"#text-watermark","aria-label":'Permalink to "Text Watermark"'},"​")],-1),M={class:"text-watermark"},V=r(`<div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { Watermark } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;watermark-js-plus&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">// import watermark plugin</span></span>
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
<span class="line"><span style="color:#E1E4E8;">watermark.</span><span style="color:#B392F0;">create</span><span style="color:#E1E4E8;">() </span><span style="color:#6A737D;">// add watermark</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">watermark.</span><span style="color:#B392F0;">destroy</span><span style="color:#E1E4E8;">() </span><span style="color:#6A737D;">// remove watermark</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { Watermark } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;watermark-js-plus&#39;</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">// import watermark plugin</span></span>
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
<span class="line"><span style="color:#24292E;">watermark.</span><span style="color:#6F42C1;">create</span><span style="color:#24292E;">() </span><span style="color:#6A737D;">// add watermark</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">watermark.</span><span style="color:#6F42C1;">destroy</span><span style="color:#24292E;">() </span><span style="color:#6A737D;">// remove watermark</span></span></code></pre></div>`,1),N=a("h2",{id:"multiline-text-watermark",tabindex:"-1"},[e("Multiline Text Watermark "),a("a",{class:"header-anchor",href:"#multiline-text-watermark","aria-label":'Permalink to "Multiline Text Watermark"'},"​")],-1),H={class:"multiline-text-watermark"},$=r(`<div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { Watermark } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;watermark-js-plus&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">// import watermark plugin</span></span>
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
<span class="line"><span style="color:#E1E4E8;">watermark.</span><span style="color:#B392F0;">create</span><span style="color:#E1E4E8;">() </span><span style="color:#6A737D;">// add watermark</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">watermark.</span><span style="color:#B392F0;">destroy</span><span style="color:#E1E4E8;">() </span><span style="color:#6A737D;">// remove watermark</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { Watermark } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;watermark-js-plus&#39;</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">// import watermark plugin</span></span>
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
<span class="line"><span style="color:#24292E;">watermark.</span><span style="color:#6F42C1;">create</span><span style="color:#24292E;">() </span><span style="color:#6A737D;">// add watermark</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">watermark.</span><span style="color:#6F42C1;">destroy</span><span style="color:#24292E;">() </span><span style="color:#6A737D;">// remove watermark</span></span></code></pre></div>`,1),K=a("h2",{id:"image-watermark",tabindex:"-1"},[e("Image Watermark "),a("a",{class:"header-anchor",href:"#image-watermark","aria-label":'Permalink to "Image Watermark"'},"​")],-1),X={class:"image-watermark"},Y=r(`<div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { Watermark } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;watermark-js-plus&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">// import watermark plugin</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">watermark</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Watermark</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  contentType: </span><span style="color:#9ECBFF;">&#39;image&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  image: </span><span style="color:#9ECBFF;">&#39;https://cdn.jsdelivr.net/gh/zhensherlock/oss@main/uPic/github-mkWBiK.png&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  width: </span><span style="color:#79B8FF;">300</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  height: </span><span style="color:#79B8FF;">300</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  imageWidth: </span><span style="color:#79B8FF;">100</span><span style="color:#E1E4E8;">, </span><span style="color:#6A737D;">// image width</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// imageHeight: 20, // image height</span></span>
<span class="line"><span style="color:#E1E4E8;">  filter: </span><span style="color:#9ECBFF;">&#39;grayscale(100%)&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#6A737D;">// graylevel</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">onSuccess</span><span style="color:#E1E4E8;">: () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// success callback</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">watermark.</span><span style="color:#B392F0;">create</span><span style="color:#E1E4E8;">() </span><span style="color:#6A737D;">// add watermark</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">watermark.</span><span style="color:#B392F0;">destroy</span><span style="color:#E1E4E8;">() </span><span style="color:#6A737D;">// remove watermark</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { Watermark } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;watermark-js-plus&#39;</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">// import watermark plugin</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">watermark</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Watermark</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  contentType: </span><span style="color:#032F62;">&#39;image&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  image: </span><span style="color:#032F62;">&#39;https://cdn.jsdelivr.net/gh/zhensherlock/oss@main/uPic/github-mkWBiK.png&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  width: </span><span style="color:#005CC5;">300</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  height: </span><span style="color:#005CC5;">300</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  imageWidth: </span><span style="color:#005CC5;">100</span><span style="color:#24292E;">, </span><span style="color:#6A737D;">// image width</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// imageHeight: 20, // image height</span></span>
<span class="line"><span style="color:#24292E;">  filter: </span><span style="color:#032F62;">&#39;grayscale(100%)&#39;</span><span style="color:#24292E;">, </span><span style="color:#6A737D;">// graylevel</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">onSuccess</span><span style="color:#24292E;">: () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// success callback</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">watermark.</span><span style="color:#6F42C1;">create</span><span style="color:#24292E;">() </span><span style="color:#6A737D;">// add watermark</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">watermark.</span><span style="color:#6F42C1;">destroy</span><span style="color:#24292E;">() </span><span style="color:#6A737D;">// remove watermark</span></span></code></pre></div>`,1),J=a("h2",{id:"rich-text-watermark",tabindex:"-1"},[e("Rich Text Watermark "),a("a",{class:"header-anchor",href:"#rich-text-watermark","aria-label":'Permalink to "Rich Text Watermark"'},"​")],-1),U={class:"rich-text-watermark"},G=r(`<div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { Watermark } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;watermark-js-plus&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">// import watermark plugin</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">watermark</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Watermark</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  contentType: </span><span style="color:#9ECBFF;">&#39;rich-text&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  content: </span><span style="color:#9ECBFF;">&#39;&lt;div style=&quot;background: #ccc;&quot;&gt;Rich text watermark is so &lt;span style=&quot;color: #f00&quot;&gt;nice&lt;/span&gt;&lt;/div&gt;&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  width: </span><span style="color:#79B8FF;">300</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  height: </span><span style="color:#79B8FF;">300</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  filter: </span><span style="color:#9ECBFF;">&#39;blur(2px)&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  movable: </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">onSuccess</span><span style="color:#E1E4E8;">: () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// success callback</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">watermark.</span><span style="color:#B392F0;">create</span><span style="color:#E1E4E8;">() </span><span style="color:#6A737D;">// add watermark</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">watermark.</span><span style="color:#B392F0;">destroy</span><span style="color:#E1E4E8;">() </span><span style="color:#6A737D;">// remove watermark</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { Watermark } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;watermark-js-plus&#39;</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">// import watermark plugin</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">watermark</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Watermark</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  contentType: </span><span style="color:#032F62;">&#39;rich-text&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  content: </span><span style="color:#032F62;">&#39;&lt;div style=&quot;background: #ccc;&quot;&gt;Rich text watermark is so &lt;span style=&quot;color: #f00&quot;&gt;nice&lt;/span&gt;&lt;/div&gt;&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  width: </span><span style="color:#005CC5;">300</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  height: </span><span style="color:#005CC5;">300</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  filter: </span><span style="color:#032F62;">&#39;blur(2px)&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  movable: </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">onSuccess</span><span style="color:#24292E;">: () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// success callback</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">watermark.</span><span style="color:#6F42C1;">create</span><span style="color:#24292E;">() </span><span style="color:#6A737D;">// add watermark</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">watermark.</span><span style="color:#6F42C1;">destroy</span><span style="color:#24292E;">() </span><span style="color:#6A737D;">// remove watermark</span></span></code></pre></div>`,1),Q=a("h2",{id:"child-element-watermark",tabindex:"-1"},[e("Child Element Watermark "),a("a",{class:"header-anchor",href:"#child-element-watermark","aria-label":'Permalink to "Child Element Watermark"'},"​")],-1),Z={class:"child-element-watermark"},ss=r(`<div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { Watermark } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;watermark-js-plus&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">// import watermark plugin</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">watermark</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Watermark</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  parent: </span><span style="color:#9ECBFF;">&#39;.parent-element&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  width: </span><span style="color:#79B8FF;">400</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  height: </span><span style="color:#79B8FF;">400</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  backgroundRepeat: </span><span style="color:#9ECBFF;">&#39;no-repeat&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  zIndex: </span><span style="color:#79B8FF;">900</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">watermark.</span><span style="color:#B392F0;">create</span><span style="color:#E1E4E8;">() </span><span style="color:#6A737D;">// add watermark</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">watermark.</span><span style="color:#B392F0;">destroy</span><span style="color:#E1E4E8;">() </span><span style="color:#6A737D;">// remove watermark</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { Watermark } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;watermark-js-plus&#39;</span><span style="color:#24292E;"> </span><span style="color:#6A737D;">// import watermark plugin</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">watermark</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Watermark</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  parent: </span><span style="color:#032F62;">&#39;.parent-element&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  width: </span><span style="color:#005CC5;">400</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  height: </span><span style="color:#005CC5;">400</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  backgroundRepeat: </span><span style="color:#032F62;">&#39;no-repeat&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  zIndex: </span><span style="color:#005CC5;">900</span></span>
<span class="line"><span style="color:#24292E;">})</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">watermark.</span><span style="color:#6F42C1;">create</span><span style="color:#24292E;">() </span><span style="color:#6A737D;">// add watermark</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">watermark.</span><span style="color:#6F42C1;">destroy</span><span style="color:#24292E;">() </span><span style="color:#6A737D;">// remove watermark</span></span></code></pre></div>`,1),as={class:"parent-element",style:{border:"1px solid #333",width:"400px",height:"400px","margin-top":"10px",position:"relative",overflow:"hidden"}},ns={class:"scroll-list",style:{overflow:"auto",width:"400px",height:"400px"}},ks=JSON.parse('{"title":"Watermark","description":"","frontmatter":{"layout":"doc"},"headers":[],"relativePath":"guide/watermark.md","filePath":"guide/watermark.md"}'),ls={name:"guide/watermark.md"},hs=_({...ls,setup(ps){const p=b(),{isDark:E}=T();S("");const c=I();let y=null;j(()=>{y=new W({parent:".parent-element",width:400,height:400,backgroundRepeat:"no-repeat",zIndex:900})});const k=()=>{p.createWatermark({content:"hello my text watermark",fontColor:E.value?"#fff":"#000",width:200,height:200,rotate:22,layout:"grid",gridLayoutOptions:{rows:2,cols:2,gap:[20,20],matrix:[[1,0],[0,1]]},advancedStyle:{type:"linear",colorStops:[{offset:0,color:"red"},{offset:1,color:"blue"}]},onSuccess:()=>{c.appContext.config.globalProperties.$message({appendTo:"#app",message:"The text watermark added successfully!",type:"success"})}})},h=()=>{p.changeWatermark({content:"update my text watermark at "+O().format("HH:mm:ss"),fontColor:E.value?"#fff":"#000"},"append")},F=()=>{p.removeWatermark()},g=()=>{p.createWatermark({contentType:"multi-line-text",content:"multi text watermark",fontColor:E.value?"#fff":"#000",fontSize:"30px",width:200,height:200,shadowStyle:{shadowBlur:10,shadowColor:"#000000FF",shadowOffsetX:0,shadowOffsetY:0},onSuccess:()=>{c.appContext.config.globalProperties.$message({appendTo:"#app",message:"The multi text watermark added successfully!",type:"success"})}})},u=()=>{p.removeWatermark()},w=()=>{p.createWatermark({contentType:"image",image:"https://cdn.jsdelivr.net/gh/zhensherlock/oss@main/uPic/github-mkWBiK.png",imageWidth:200,width:300,height:300,filter:"grayscale(100%)",onSuccess:()=>{c.appContext.config.globalProperties.$message({appendTo:"#app",message:"The image watermark added successfully!",type:"success"})}})},C=()=>{p.removeWatermark()},f=()=>{p.createWatermark({contentType:"rich-text",content:'<div style="background: #ccc;">The watermark is so <span style="color: #f00">nice</span>.</div>',width:300,height:300,filter:"blur(2px)",movable:!0,onSuccess:()=>{c.appContext.config.globalProperties.$message({appendTo:"#app",message:"The rich text watermark added successfully！",type:"success"})}})},x=()=>{p.removeWatermark()},v=()=>{y.create()},A=()=>{y.destroy()};return(es,os)=>{const B=i("el-backtop"),o=i("el-space"),t=i("el-affix");return d(),m("div",null,[q,s(B),L,a("div",M,[V,s(t,{target:".text-watermark",position:"bottom",offset:0},{default:l(()=>[s(o,{class:"block-operation"},{default:l(()=>[s(n,{text:"Add Text Watermark",onClick:k}),s(n,{text:"Update Text Watermark",onClick:h}),s(n,{text:"Remove Text Watermark",onClick:F})]),_:1})]),_:1})]),N,a("div",H,[$,s(t,{target:".multiline-text-watermark",position:"bottom",offset:0},{default:l(()=>[s(o,{class:"block-operation"},{default:l(()=>[s(n,{text:"Add MultiLine Text Watermark",onClick:g}),s(n,{text:"Remove MultiLine Text Watermark",onClick:u})]),_:1})]),_:1})]),K,a("div",X,[Y,s(t,{target:".image-watermark",position:"bottom",offset:0},{default:l(()=>[s(o,{class:"block-operation"},{default:l(()=>[s(n,{text:"Add Image Watermark",onClick:w}),s(n,{text:"Remove Image Watermark",onClick:C})]),_:1})]),_:1})]),J,a("div",U,[G,s(t,{target:".rich-text-watermark",position:"bottom",offset:0},{default:l(()=>[s(o,{class:"block-operation"},{default:l(()=>[s(n,{text:"Add Rich Text Watermark",onClick:f}),s(n,{text:"Remove Rich Text Watermark",onClick:x})]),_:1})]),_:1})]),Q,a("div",Z,[ss,a("div",as,[a("div",ns,[(d(!0),m(R,null,P(Array.from({length:100}),(ts,D)=>(d(),m("div",null,z(D+1),1))),256))])]),s(t,{target:".child-element-watermark",position:"bottom",offset:0,"z-index":"1000"},{default:l(()=>[s(o,{class:"block-operation"},{default:l(()=>[s(n,{text:"Add Child Element Watermark",onClick:v}),s(n,{text:"Remove Child Element Watermark",onClick:A})]),_:1})]),_:1})])])}}});export{ks as __pageData,hs as default};
