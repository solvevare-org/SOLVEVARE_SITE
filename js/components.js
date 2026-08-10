async function loadComponent(id,url){var el=document.getElementById(id);if(!el)return;try{var r=await fetch(url);if(!r.ok)return;el.innerHTML=await r.text();}catch(e){}}
loadComponent("navbar","./components/navbar.html");
loadComponent("footer","./components/footer.html");
