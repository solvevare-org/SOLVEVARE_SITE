/* mpc-router.js - MPC route handler stub */
(function(){
  var slug=document.querySelector('meta[name="mpc-slug"]');
  if(slug&&slug.content)document.documentElement.setAttribute('data-mpc-slug',slug.content);
})();
