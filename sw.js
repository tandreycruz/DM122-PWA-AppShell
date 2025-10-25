import { mockProfileAPI } from "./src/js/mock-api.js";

const cacheName = "app-shell-v1";
const assetsToCache = [
  "https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css",
  "https://fonts.gstatic.com/s/materialicons/v55/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2",
  "https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
  "https://fonts.googleapis.com/css?family=Roboto:400,700",
  "https://fonts.googleapis.com/icon?family=Material+Icons",
  "src/assets/images/pwa-logo.png",
  "src/assets/js/material.min.js",
  "src/js/app.js",
  "src/offline.html",
  "favicon.ico",
  "index.html",
  "/",
];

self.addEventListener("install", (event) => {
  console.log(`👁️ [sw.js] installing static assets...`);
  // self.skipWaiting();
  event.waitUntil(cacheStaticAssets());
});

self.addEventListener("activate", (event) => {
  console.log(`👁️ [sw.js] activated`);
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  console.log(`👁️ [sw.js] request: ${request.url}`);
  // console.log(`👁️ [sw.js] accept: ${request.headers.get("accept")}`);
  event.respondWith(proxy(request));
});

async function cacheStaticAssets() {
  const cache = await caches.open(cacheName);
  return cache.addAll(assetsToCache);
}

async function proxy(request) {
  console.log(`👁️ [sw.js] proxying...`);
  const url = new URL(request.url);
  if (url.pathname === "/id/237/200/300") {
    return replaceDogByCat();
  }
  if (url.pathname.startsWith("/api/profile")) {
    return mockProfileAPI();
  }
  return networkFirst(request);
}

async function networkFirst(request) {
  try {
    return await fetch(request);
  } catch (error) {
    const cache = await caches.open(cacheName);
    return cache.match("src/offline.html");
  }
}

async function replaceDogByCat() {
  console.log(`👁️ [sw.js] replacing dog for a cat`);
  return fetch(
    "https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg"
  );
}