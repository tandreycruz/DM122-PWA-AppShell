const registerServiceWorker = () => {
  // prettier-ignore
  navigator.serviceWorker
    .register("./sw.js", { type: 'module' })
    .then(() => console.log(`👁️ [app.js] SW registered`))
    .catch(() => console.log(`👁️ [app.js] SW failed to register`));
};
registerServiceWorker();

const button = document.querySelector("button");
button.addEventListener("click", async () => {
  const url = `${document.location.origin}/api/profile/1`;
  const response = await fetch(url);
  const profileData = await response.json();
  console.log(profileData);
  const img = document.querySelector("img");
  img.src = profileData.profilePicture;
  img.alt = `Picture of ${profileData.name}`;
});