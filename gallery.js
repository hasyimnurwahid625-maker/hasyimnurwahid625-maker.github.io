const gallery = document.querySelector('.studio');
if (gallery) {
  const filters = [...gallery.querySelectorAll('[data-filter]')];
  const works = [...gallery.querySelectorAll('[data-category]')];
  for (const button of filters) {
    button.addEventListener('click', () => {
      const category = button.dataset.filter;
      for (const filter of filters) filter.setAttribute('aria-pressed', String(filter === button));
      for (const work of works) work.hidden = category !== 'all' && work.dataset.category !== category;
    });
  }
}
const preview = document.querySelector('#media-preview');
if (preview && typeof preview.showModal === 'function') {
  const body = preview.querySelector('.media-body');
  const title = preview.querySelector('h2');
  preview.querySelector('button').addEventListener('click', () => preview.close());
  preview.addEventListener('close', () => body.replaceChildren());
  for (const button of document.querySelectorAll('[data-preview]')) {
    button.addEventListener('click', () => {
      const video = button.dataset.preview === 'video';
      const media = document.createElement(video ? 'video' : 'img');
      title.textContent = button.dataset.title;
      if (video) {
        media.controls = true;
        media.playsInline = true;
        media.poster = button.dataset.poster;
        media.setAttribute('aria-label', title.textContent);
      } else {
        media.alt = title.textContent;
      }
      media.src = button.dataset.src;
      body.replaceChildren(media);
      preview.showModal();
    });
  }
}
const track = document.querySelector('.journal-track');
for (const button of document.querySelectorAll('[data-scroll]')) {
  button.addEventListener('click', () => {
    const step = track.querySelector('.workshot').getBoundingClientRect().width + 14;
    track.scrollBy({left: Number(button.dataset.scroll) * step, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'});
  });
}
