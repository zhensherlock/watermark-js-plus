import{V as n}from"./chunks/theme.99ae462a.js";import{W as r}from"./chunks/watermark.3230fd96.js";import"./chunks/global.189dc1cd.js";import{d as W,u as _,k as T,l as S,D as h,g as j,J as s,m as a,b as l,e as p,Q as c,a0 as R,o as P}from"./chunks/framework.6dab496c.js";import{d as O}from"./chunks/dayjs.min.0814b3fd.js";import"./chunks/commonjsHelpers.725317a4.js";const z=a("h1",{id:"watermark",tabindex:"-1"},[p("Watermark "),a("a",{class:"header-anchor",href:"#watermark","aria-label":'Permalink to "Watermark"'},"​")],-1),I=a("h2",{id:"text-watermark",tabindex:"-1"},[p("Text Watermark "),a("a",{class:"header-anchor",href:"#text-watermark","aria-label":'Permalink to "Text Watermark"'},"​")],-1),q={class:"text-watermark"},L=c(`<div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { Watermark } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;watermark-js-plus&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">// import watermark plugin</span></span>
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
<span class="line"><span style="color:#24292E;">watermark.</span><span style="color:#6F42C1;">destroy</span><span style="color:#24292E;">() </span><span style="color:#6A737D;">// remove watermark</span></span></code></pre></div>`,1),M=a("h2",{id:"multiline-text-watermark",tabindex:"-1"},[p("Multiline Text Watermark "),a("a",{class:"header-anchor",href:"#multiline-text-watermark","aria-label":'Permalink to "Multiline Text Watermark"'},"​")],-1),V={class:"multiline-text-watermark"},N=c(`<div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { Watermark } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;watermark-js-plus&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">// import watermark plugin</span></span>
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
<span class="line"><span style="color:#24292E;">watermark.</span><span style="color:#6F42C1;">destroy</span><span style="color:#24292E;">() </span><span style="color:#6A737D;">// remove watermark</span></span></code></pre></div>`,1),H=a("h2",{id:"image-watermark",tabindex:"-1"},[p("Image Watermark "),a("a",{class:"header-anchor",href:"#image-watermark","aria-label":'Permalink to "Image Watermark"'},"​")],-1),$={class:"image-watermark"},K=c(`<div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { Watermark } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;watermark-js-plus&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">// import watermark plugin</span></span>
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
<span class="line"><span style="color:#24292E;">watermark.</span><span style="color:#6F42C1;">destroy</span><span style="color:#24292E;">() </span><span style="color:#6A737D;">// remove watermark</span></span></code></pre></div>`,1),X=a("h2",{id:"rich-text-watermark",tabindex:"-1"},[p("Rich Text Watermark "),a("a",{class:"header-anchor",href:"#rich-text-watermark","aria-label":'Permalink to "Rich Text Watermark"'},"​")],-1),Y={class:"rich-text-watermark"},J=c(`<div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { Watermark } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;watermark-js-plus&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">// import watermark plugin</span></span>
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
<span class="line"><span style="color:#24292E;">watermark.</span><span style="color:#6F42C1;">destroy</span><span style="color:#24292E;">() </span><span style="color:#6A737D;">// remove watermark</span></span></code></pre></div>`,1),U=a("h2",{id:"child-element-watermark",tabindex:"-1"},[p("Child Element Watermark "),a("a",{class:"header-anchor",href:"#child-element-watermark","aria-label":'Permalink to "Child Element Watermark"'},"​")],-1),Q={class:"child-element-watermark"},G=c(`<div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { Watermark } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;watermark-js-plus&#39;</span><span style="color:#E1E4E8;"> </span><span style="color:#6A737D;">// import watermark plugin</span></span>
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
<span class="line"><span style="color:#24292E;">watermark.</span><span style="color:#6F42C1;">destroy</span><span style="color:#24292E;">() </span><span style="color:#6A737D;">// remove watermark</span></span></code></pre></div><div class="parent-element" style="width:400px;height:400px;border:1px solid #333;margin-top:10px;position:relative;"></div>`,2),cs=JSON.parse('{"title":"Watermark","description":"","frontmatter":{"layout":"doc"},"headers":[],"relativePath":"guide/watermark.md","filePath":"guide/watermark.md"}'),Z={name:"guide/watermark.md"},Es=W({...Z,setup(ss){const{isDark:i}=_();T("");const E=R();let e=null,y=null,m=null,d=null,k=null;S(()=>{e=new r({content:"hello my text watermark",width:200,height:200,rotate:22,layout:"grid",gridLayoutOptions:{rows:2,cols:2,gap:[20,20],matrix:[[1,0],[0,1]]},advancedStyle:{type:"linear",colorStops:[{offset:0,color:"red"},{offset:1,color:"blue"}]},onSuccess:()=>{E.appContext.config.globalProperties.$message({appendTo:"#app",message:"The text watermark added successfully!",type:"success"})}}),y=new r({contentType:"multi-line-text",content:"multi text watermark",fontSize:"30px",width:200,height:200,shadowStyle:{shadowBlur:10,shadowColor:"#000000FF",shadowOffsetX:0,shadowOffsetY:0},onSuccess:()=>{E.appContext.config.globalProperties.$message({appendTo:"#app",message:"The multi text watermark added successfully!",type:"success"})}}),m=new r({contentType:"image",image:"https://cdn.jsdelivr.net/gh/zhensherlock/oss@main/uPic/github-mkWBiK.png",imageWidth:200,width:300,height:300,filter:"grayscale(100%)",onSuccess:()=>{E.appContext.config.globalProperties.$message({appendTo:"#app",message:"The image watermark added successfully!",type:"success"})}}),d=new r({contentType:"rich-text",content:'<div style="background: #ccc;">The watermark is so <span style="color: #f00">nice</span>.</div>',width:300,height:300,filter:"blur(2px)",movable:!0,onSuccess:()=>{E.appContext.config.globalProperties.$message({appendTo:"#app",message:"The rich text watermark added successfully！",type:"success"})}}),k=new r({parent:".parent-element",width:400,height:400,backgroundRepeat:"no-repeat",zIndex:900})});const F=()=>{e.changeOptions({content:"hello my text watermark",fontColor:i.value?"#fff":"#000"},"append",!1),e.create()},g=()=>{e.changeOptions({content:"update my text watermark at "+O().format("HH:mm:ss"),fontColor:i.value?"#fff":"#000"},"append")},u=()=>{e.destroy()},w=()=>{i.value&&(y.options.fontColor="#fff"),y.create()},C=()=>{y.destroy()},f=()=>{m.create()},x=()=>{m.destroy()},A=()=>{d.create()},B=()=>{d.destroy()},v=()=>{k.create()},D=()=>{k.destroy()};return(as,ns)=>{const b=h("el-backtop"),o=h("el-space"),t=h("el-affix");return P(),j("div",null,[z,s(b),I,a("div",q,[L,s(t,{target:".text-watermark",position:"bottom",offset:0},{default:l(()=>[s(o,{class:"block-operation"},{default:l(()=>[s(n,{text:"Add Text Watermark",onClick:F}),s(n,{text:"Update Text Watermark",onClick:g}),s(n,{text:"Remove Text Watermark",onClick:u})]),_:1})]),_:1})]),M,a("div",V,[N,s(t,{target:".multiline-text-watermark",position:"bottom",offset:0},{default:l(()=>[s(o,{class:"block-operation"},{default:l(()=>[s(n,{text:"Add MultiLine Text Watermark",onClick:w}),s(n,{text:"Remove MultiLine Text Watermark",onClick:C})]),_:1})]),_:1})]),H,a("div",$,[K,s(t,{target:".image-watermark",position:"bottom",offset:0},{default:l(()=>[s(o,{class:"block-operation"},{default:l(()=>[s(n,{text:"Add Image Watermark",onClick:f}),s(n,{text:"Remove Image Watermark",onClick:x})]),_:1})]),_:1})]),X,a("div",Y,[J,s(t,{target:".rich-text-watermark",position:"bottom",offset:0},{default:l(()=>[s(o,{class:"block-operation"},{default:l(()=>[s(n,{text:"Add Rich Text Watermark",onClick:A}),s(n,{text:"Remove Rich Text Watermark",onClick:B})]),_:1})]),_:1})]),U,a("div",Q,[G,s(t,{target:".child-element-watermark",position:"bottom",offset:0,"z-index":"1000"},{default:l(()=>[s(o,{class:"block-operation"},{default:l(()=>[s(n,{text:"Add Child Element Watermark",onClick:v}),s(n,{text:"Remove Child Element Watermark",onClick:D})]),_:1})]),_:1})])])}}});export{cs as __pageData,Es as default};
