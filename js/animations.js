/* animations.js - animation initializer */
(function(){
  if(!document.querySelectorAll)return;
  var els=document.querySelectorAll('.animate-on-scroll,.fade-in-up,.fade-in');
  if(!els.length)return;
  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(e){if(e.isIntersecting)e.target.classList.add('animated')});
  },{threshold:0.1});
  els.forEach(function(el){io.observe(el);});
})();
