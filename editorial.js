(() => {
 const reduced = matchMedia('(prefers-reduced-motion: reduce)');
 const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if(entry.isIntersecting){if(!reduced.matches)entry.target.classList.add('reveal-in');observer.unobserve(entry.target);}
 }), {threshold:.12});
 document.querySelectorAll('.project,.studio-head,.steps article,.bio,.automation .split').forEach(el=>observer.observe(el));
 const video=document.querySelector('.showcase-film video');
 if(video){const visibility=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting&&!reduced.matches)video.play().catch(()=>{});else video.pause();}));visibility.observe(video);if(reduced.matches)video.pause();}
})();
