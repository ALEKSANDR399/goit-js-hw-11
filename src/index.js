import './css/styles.css';
import imgCards from './templates/cards.hbs';
import Notiflix from 'notiflix';
import NewsApiService from './InfoFromBack';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const formSearchRef = document.querySelector('.search-form');
const galleryBox = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const newsApiService = new NewsApiService();
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});
const allCardsEl = galleryBox.getElementsByTagName('a');

formSearchRef.addEventListener('submit', addSearchInfo);
loadMoreBtn.addEventListener('click', addMoreImg);

async function addSearchInfo(event) {
  event.preventDefault();
  galleryBox.innerHTML = '';

  newsApiService.informationSearch = event.currentTarget.elements.searchQuery.value;
  newsApiService.resetPage();

  const infoSearch = await newsApiService.getUser();
  const { data } = infoSearch;
  const { hits, totalHits } = data;

  if (newsApiService.info === '') {
    loadMoreBtn.classList.add('is-hidden');
    return;
  }

  if (hits.length === 0) {
    loadMoreBtn.classList.add('is-hidden');
    return Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.',
    );
  }
  loadMoreBtn.classList.remove('is-hidden');
  Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
  galleryBox.insertAdjacentHTML('beforeend', imgCards(hits));
  lightbox.refresh();
}

async function addMoreImg() {
  const infoSearch = await newsApiService.getUser();
  const { data } = infoSearch;
  const { hits } = data;

  galleryBox.insertAdjacentHTML('beforeend', imgCards(hits));
  lightbox.refresh();
  if (data.totalHits === allCardsEl.length) {
    loadMoreBtn.classList.add('is-hidden');
    Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
  }
}
