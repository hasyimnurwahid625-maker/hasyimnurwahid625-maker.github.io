const dialog = document.querySelector('#intro');
if (dialog && typeof dialog.showModal === 'function') {
  const trigger = document.querySelector('.motion-trigger');
  const closeButton = dialog.querySelector('.motion-close');
  const frame = dialog.querySelector('.intro-frame');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const beats = [
    [0, 'intro-hero', 'Project direction', 'Hasyim Nur Wahid', '/assets/hasyim.webp'],
    [2000, 'intro-note', 'Event production', 'Dari brief ke lapangan.'],
    [5000, 'intro-project red', 'Jakarta Anniversary Edition', '64 pasangan · 3 kategori', document.querySelector('.red .project-art img')?.getAttribute('src')],
    [8000, 'intro-project green', 'Motion Vibes Padel Krukut', 'Grand opening · Turnamen 64 pasangan', '/assets/journal/img_0719.mp4'],
    [11000, 'intro-project sand', 'From Home to Court', 'Vol. 1 · Event perdana'],
    [13000, 'intro-closing', 'I lead events from brief to live.', 'Selected Projects · NOFU Project']
  ];
  let timers = [];
  function showBeat([_, className, name, copy, image]) {
    const scene = document.createElement('div');
    scene.className = 'intro-scene ' + className;
    if (image) {
      const isVideo = image.endsWith('.mp4');
      const picture = document.createElement(isVideo ? 'video' : 'img');
      if (isVideo) {
        picture.muted = true;
        picture.playsInline = true;
        picture.autoplay = true;
        picture.poster = '/assets/journal/img_0719.webp';
        picture.setAttribute('aria-hidden', 'true');
      } else {
        picture.alt = '';
      }
      picture.src = image;
      scene.append(picture);
    }
    if (className === 'intro-note') {
      const note = document.createElement('strong');
      note.textContent = 'RUN OF SHOW';
      scene.append(note);
    }
    const heading = document.createElement('h3');
    const caption = document.createElement('p');
    heading.textContent = name;
    caption.textContent = copy;
    scene.append(heading, caption);
    if (className === 'intro-closing') {
      const mark = document.createElement('img');
      mark.className = 'intro-credit';
      mark.src = '/assets/nofu.webp';
      mark.alt = 'Nofu.Project';
      mark.width = 52;
      mark.height = 52;
      scene.append(mark);
    }
    frame.replaceChildren(scene);
  }
  function play() {
    if (dialog.open) return;
    dialog.showModal();
    if (reduce.matches) {
      showBeat(beats.at(-1));
      closeButton.firstChild.textContent = 'Tutup ';
      return;
    }
    closeButton.firstChild.textContent = 'Lewati ';
    showBeat(beats[0]);
    timers = beats.slice(1).map(beat => setTimeout(() => showBeat(beat), beat[0]));
    timers.push(setTimeout(() => dialog.close(), 15000));
  }
  trigger.hidden = false;
  trigger.addEventListener('click', play);
  closeButton.addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => {
    timers.forEach(clearTimeout);
    timers = [];
    frame.replaceChildren();
  });
  if (!reduce.matches) document.body.classList.add('enhanced');
  const hero = document.querySelector('.hero');
  const figure = hero.querySelector('.hero-figure');
  hero.addEventListener('pointermove', event => {
    if (event.pointerType !== 'mouse' || reduce.matches) return;
    const box = hero.getBoundingClientRect();
    figure.style.setProperty('--px', ((event.clientX - box.left) / box.width - .5) * 14 + 'px');
    figure.style.setProperty('--py', ((event.clientY - box.top) / box.height - .5) * 9 + 'px');
  }, {passive:true});
  hero.addEventListener('pointerleave', () => {
    figure.style.removeProperty('--px');
    figure.style.removeProperty('--py');
  });
}
