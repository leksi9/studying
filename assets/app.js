
(function(){
  // copy-link buttons
  document.querySelectorAll('[data-copy]').forEach(function(b){
    b.addEventListener('click',function(){
      var url=new URL(b.getAttribute('data-copy'),location.href).href;
      var done=function(){var t=b.textContent;b.textContent='Ссылка скопирована';b.classList.add('ok');setTimeout(function(){b.textContent=t;b.classList.remove('ok')},1600)};
      if(navigator.clipboard){navigator.clipboard.writeText(url).then(done,function(){prompt('Ссылка:',url)})}else{prompt('Ссылка:',url)}
    });
  });
  // lightbox
  var items=[].slice.call(document.querySelectorAll('.cards button'));
  if(!items.length)return;
  var lb=document.getElementById('lb'),img=lb.querySelector('img'),cnt=lb.querySelector('.cnt'),i=0;
  function show(n){i=(n+items.length)%items.length;img.src=items[i].getAttribute('data-full');img.alt=items[i].getAttribute('data-cap');cnt.textContent=(i+1)+' / '+items.length+' · '+items[i].getAttribute('data-cap');
    var nx=new Image();nx.src=items[(i+1)%items.length].getAttribute('data-full');}
  function open(n){show(n);lb.classList.add('on');document.body.style.overflow='hidden'}
  function close(){lb.classList.remove('on');document.body.style.overflow='';if(document.fullscreenElement)document.exitFullscreen()}
  items.forEach(function(b,n){b.addEventListener('click',function(){open(n)})});
  lb.querySelector('.prev').onclick=function(e){e.stopPropagation();show(i-1)};
  lb.querySelector('.next').onclick=function(e){e.stopPropagation();show(i+1)};
  lb.querySelector('.x').onclick=close;
  lb.querySelector('.fs').onclick=function(e){e.stopPropagation();if(document.fullscreenElement)document.exitFullscreen();else if(lb.requestFullscreen)lb.requestFullscreen()};
  lb.addEventListener('click',function(e){if(e.target===lb)close()});
  document.addEventListener('keydown',function(e){if(!lb.classList.contains('on'))return;
    if(e.key==='ArrowRight'||e.key===' '){e.preventDefault();show(i+1)}else if(e.key==='ArrowLeft')show(i-1);else if(e.key==='Escape')close();else if(e.key==='f'||e.key==='а')lb.querySelector('.fs').click()});
  var x0=null;lb.addEventListener('touchstart',function(e){x0=e.touches[0].clientX},{passive:true});
  lb.addEventListener('touchend',function(e){if(x0===null)return;var dx=e.changedTouches[0].clientX-x0;if(Math.abs(dx)>40)show(i+(dx<0?1:-1));x0=null});
  var h=location.hash.match(/^#(\d+)$/);if(h)open(parseInt(h[1],10)-1);
})();
