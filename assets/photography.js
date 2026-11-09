const gallery = document.querySelector('.gallery');
const photos = Array.from(gallery.querySelectorAll('.photo-link'));
const viewer = document.querySelector('.viewer');
const viewerImage = document.querySelector('#viewer-image');
const previous = document.querySelector('#previous-photo');
const next = document.querySelector('#next-photo');
const count = document.querySelector('#photo-count');
const viewerCaption = document.querySelector('#viewer-caption');
let current = 0;

function showPhoto(index) {
  current = index;
  viewerImage.src = photos[index].href;
  viewerImage.alt = photos[index].querySelector('img').alt;
  viewerCaption.textContent = photos[index].closest('figure').querySelector('figcaption')?.textContent || '';
  viewerCaption.hidden = !viewerCaption.textContent;
  previous.disabled = index === 0;
  next.disabled = index === photos.length - 1;
  count.textContent = `${index + 1} / ${photos.length}`;
}

gallery.addEventListener('click', (event) => {
  const link = event.target.closest('.photo-link');
  if (!link || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey
      || typeof viewer.showModal !== 'function') return;
  event.preventDefault();
  showPhoto(photos.indexOf(link));
  viewer.showModal();
  document.body.classList.add('viewer-open');
});

previous.addEventListener('click', () => showPhoto(current - 1));
next.addEventListener('click', () => showPhoto(current + 1));
viewer.querySelector('.viewer-close').addEventListener('click', () => viewer.close());
viewer.addEventListener('close', () => {
  document.body.classList.remove('viewer-open');
  photos[current].focus({ preventScroll: true });
  viewerImage.removeAttribute('src');
});
viewer.addEventListener('click', (event) => {
  if (event.target !== viewer) return;
  const bounds = viewer.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right
      || event.clientY < bounds.top || event.clientY > bounds.bottom) viewer.close();
});
viewer.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft' && current > 0) {
    event.preventDefault();
    showPhoto(current - 1);
  } else if (event.key === 'ArrowRight' && current < photos.length - 1) {
    event.preventDefault();
    showPhoto(current + 1);
  }
});
