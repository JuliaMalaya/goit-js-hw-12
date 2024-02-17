import{i as c,S as w,a as b}from"./assets/vendor-5401a4b0.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&o(l)}).observe(document,{childList:!0,subtree:!0});function t(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(e){if(e.ep)return;e.ep=!0;const s=t(e);fetch(e.href,s)}})();const g=document.querySelector(".search-form"),d=document.querySelector(".gallery-list"),p=document.querySelector(".search-input");let u,m=1,f=15,h="";const n=document.querySelector("#loader"),i=document.querySelector("#load-more");i.addEventListener("click",q);g.addEventListener("submit",S);async function S(r){if(r.preventDefault(),d.innerHTML="",n.classList.add("loader"),i.classList.replace("load-more","hidden"),h=p.value,m=1,p.value.trim()===""){c.error({title:"",message:"Please enter a search query!",position:"topRight"}),n.classList.remove("loader");return}try{const t=await y(h);t.hits.length===0&&c.error({title:"",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),d.innerHTML=L(t.hits),u=new w(".gallery-link",{captionDelay:250,captionsData:"alt"}),u.refresh(),i.classList.replace("hidden","load-more"),t.hits.length<15?i.classList.add("hidden"):i.classList.remove("hidden")}catch(t){c.error({title:"",message:t.message,position:"topRight"})}finally{g.reset(),n.classList.remove("loader")}}async function q(){m++,i.classList.replace("load-more","hidden"),n.classList.add("loader");try{const r=await y(h);d.insertAdjacentHTML("beforeend",L(r.hits)),u.refresh(),i.classList.replace("hidden","load-more");const t=d.firstElementChild.getBoundingClientRect();if(window.scrollBy({top:t.height*2,behavior:"smooth"}),m*f>r.totalHits)throw new Error("We're sorry, but you've reached the end of search results.")}catch(r){i.classList.replace("load-more","hidden"),c.info({title:"",message:r.message,position:"topRight"})}finally{n.classList.remove("loader")}}async function y(r){const a="42343385-eb6c059581ee4f8bb4ee68ac0",t="https://pixabay.com/api/";return(await b.get(t,{params:{key:a,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,page:m,per_page:f}})).data}function L(r){return r.map(({webformatURL:a,largeImageURL:t,tags:o,likes:e,views:s,comments:l,downloads:v})=>`
  <li class="gallery-item">
  <a href="${t}" class="gallery-link">
      <img src="${a}" 
           alt="${o}" 
           class="gallery-image"
           loading="lazy" 
           width="250"
           height="250">
      <div class="info">
        <div class="image-item">Likes <span class="image-elem">${e}</span></div>
        <div class="image-item">Views <span class="image-elem">${s}</span></div>
        <div class="image-item">Comments <span class="image-elem">${l}</span></div>
        <div class="image-item">Downloads <span class="image-elem">${v}</span></div>
  </div>
</a>
</li>
`).join("")}
//# sourceMappingURL=commonHelpers.js.map
