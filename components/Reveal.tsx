"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    /** Re-scans the page for [data-reveal] elements (defined by REVEAL_SCRIPT). */
    __rocReveal?: () => void;
  }
}

/**
 * Scroll reveals – one IntersectionObserver for every `[data-reveal]` element,
 * runs once per element, no library. The hidden states exist only under
 * `html.js-reveal` (set by the head script, never with reduced motion), so the
 * content is simply visible if JavaScript fails; the head script also drops the
 * class after 4s if this script never ran.
 *
 * This runs as an inline script at the end of <body> rather than after
 * hydration, so elements already in view on load (or after an anchor jump)
 * are shown instantly – without animating and without a hidden frame.
 *
 * Clip-path variants (heading, image) are fully clipped while hidden and Chrome
 * then reports them as not intersecting, so their parent element is observed.
 */
export const REVEAL_SCRIPT = `(function(){var d=document.documentElement;if(!d.classList.contains("js-reveal"))return;var io=null,map=new Map();
function show(el,instant){if(el.hasAttribute("data-in"))return;if(instant)el.setAttribute("data-instant","");el.setAttribute("data-in","")}
function visible(r){return r.bottom>0&&r.top<innerHeight}
function proxy(el){var v=el.getAttribute("data-reveal");return(v==="heading"||v==="image")&&el.parentElement||el}
function revealTarget(hash){var id=hash&&hash.slice(1);var t=id&&document.getElementById(id);if(!t)return;if(t.hasAttribute("data-reveal"))show(t,true);t.querySelectorAll("[data-reveal]").forEach(function(e){show(e,true)})}
function scan(){var els=document.querySelectorAll("[data-reveal]:not([data-in])");if(!("IntersectionObserver" in window)){els.forEach(function(e){show(e,true)});return}
if(!io)io=new IntersectionObserver(function(entries){entries.forEach(function(en){if(!(en.isIntersecting&&(en.intersectionRatio>=0.2||en.intersectionRect.height>innerHeight*0.3)))return;var list=map.get(en.target)||[];var rest=list.filter(function(el){show(el,false);return false});map.set(en.target,rest);io.unobserve(en.target)})},{threshold:[0,0.2,0.5]});
revealTarget(location.hash);els.forEach(function(el){if(el.hasAttribute("data-in"))return;var r=el.getBoundingClientRect();if(r.bottom<=0||visible(r)){show(el,true);return}var px=proxy(el);var list=map.get(px);if(!list){list=[];map.set(px,list);io.observe(px)}list.push(el)})}
window.__rocReveal=scan;scan();
addEventListener("hashchange",function(){revealTarget(location.hash);requestAnimationFrame(scan)});
document.addEventListener("click",function(e){var a=e.target instanceof Element?e.target.closest("a[href*='#']"):null;if(!a)return;var u=new URL(a.href,location.href);if(u.pathname===location.pathname&&u.hash)revealTarget(u.hash)},true);
})()`;

/** Re-runs the scan after a client-side navigation to a page with reveals. */
export function RevealBoot() {
  useEffect(() => {
    window.__rocReveal?.();
  }, []);
  return null;
}
