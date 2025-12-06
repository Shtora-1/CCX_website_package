// Basic interactions: dark mode, top button, mobile menu, smooth scroll, reveal
document.addEventListener('DOMContentLoaded', ()=>{

  // DARK MODE (persist)
  const darkToggle = document.getElementById('darkToggle');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  if(localStorage.getItem('ccx-dark') === '1' || (!localStorage.getItem('ccx-dark') && prefersDark)){
    document.body.classList.add('dark');
  }

  darkToggle.addEventListener('click', ()=>{
    document.body.classList.toggle('dark');
    localStorage.setItem('ccx-dark', document.body.classList.contains('dark') ? '1' : '0');
  });

  // TOP BUTTON
  const topBtn = document.getElementById('topBtn');
  window.addEventListener('scroll', ()=>{
    if(window.scrollY > 360) topBtn.style.display = 'flex';
    else topBtn.style.display = 'none';
  });
  topBtn.addEventListener('click', ()=> window.scrollTo({top:0, behavior:'smooth'}));

  // SMOOTH SCROLL FOR LINKS
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href'));
      if(target) target.scrollIntoView({behavior:'smooth', block:'start'});
    });
  });

  // SIMPLE MOBILE MENU
  const menuBtn = document.getElementById('menuBtn');
  menuBtn.addEventListener('click', ()=>{
    const nav = document.querySelector('.nav');
    nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
    nav.style.flexDirection = 'column';
    nav.style.position = 'absolute';
    nav.style.right = '20px';
    nav.style.top = '70px';
    nav.style.background = 'rgba(255,255,255,0.95)';
    nav.style.padding = '12px';
    nav.style.borderRadius = '12px';
    nav.style.boxShadow = '0 10px 30px rgba(2,6,23,0.08)';
  });

  // REVEAL ON SCROLL (IntersectionObserver)
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('reveal');
        io.unobserve(entry.target);
      }
    });
  }, {threshold: 0.12});

  document.querySelectorAll('.section, .card, .hero').forEach(el=>{
    el.classList.add('will-reveal');
    io.observe(el);
  });

});
