import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import axios from "axios";

const searchForm = document.querySelector('.search-form');
const galleryList = document.querySelector('.gallery-list');
const searchInput = document.querySelector('.search-input');

let imageViewer;
let currentPage = 1;
let per_page = 15;
let searchQuery = '';
const loader = document.querySelector('#loader')
const loadMoreBtn = document.querySelector('#load-more');
loadMoreBtn.addEventListener('click', loadMore);
searchForm.addEventListener('submit', searchImages);

async function searchImages(event) {
  event.preventDefault();
  galleryList.innerHTML = '';
  loader.classList.add('loader');
  loadMoreBtn.classList.replace('load-more', 'hidden');
  searchQuery = searchInput.value;

  currentPage = 1;

  const searchValue = searchInput.value.trim();
     if (searchValue === '') {
            iziToast.error({
            title: '',
            message: 'Please enter a search query!',
            position: 'topRight'
        });
       loader.classList.remove('loader');
        return; 
  }
  
  try {
    const data = await fetchImages(searchQuery);
    if (data.hits.length === 0) {
      iziToast.error({
        title: '',
        message: 'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight'
      });
    }

    galleryList.innerHTML = createMarkup(data.hits);
      imageViewer = new SimpleLightbox('.gallery-link', {
      captionDelay: 250,
      captionsData: 'alt',
    });
    imageViewer.refresh();
    loadMoreBtn.classList.replace('hidden', 'load-more');

    if (data.hits.length < 15) {
      loadMoreBtn.classList.add('hidden');
    } else {
      loadMoreBtn.classList.remove('hidden');
    }
  } catch (error) {
      iziToast.error({
        title: '',
        message: error.message,
        position: 'topRight'
      });

  } finally {
        searchForm.reset();
        loader.classList.remove('loader');
    }
};

async function loadMore() {
  currentPage++;
  loadMoreBtn.classList.replace('load-more', 'hidden');
  loader.classList.add('loader');

  try {
    const data = await fetchImages(searchQuery);
    galleryList.insertAdjacentHTML('beforeend', createMarkup(data.hits));
    imageViewer.refresh();
    loadMoreBtn.classList.replace('hidden', 'load-more');

    const li = galleryList.firstElementChild;
    const liCoordinates = li.getBoundingClientRect();

    window.scrollBy({
      top: liCoordinates.height * 2,
      behavior: 'smooth',
    });
    
    if (currentPage * per_page > data.totalHits) {
      throw new Error('We\'re sorry, but you\'ve reached the end of search results.');
    }
  } catch (error) {
    loadMoreBtn.classList.replace('load-more', 'hidden');
      iziToast.info({
        title: '',
        message: error.message,
        position: 'topRight',
      });
  } finally {
    loader.classList.remove('loader');
  }
}
async function fetchImages(query) {
    const API_KEY = '42343385-eb6c059581ee4f8bb4ee68ac0';
  const BASE_URL = 'https://pixabay.com/api/';
  
    const response = await axios.get(BASE_URL, {
        params: {
          key: API_KEY,
          q: query,
          image_type: "photo",
          orientation: 'horizontal',
          safesearch: true,
          page: currentPage,
          per_page,
}
    });
    return response.data;
};

function createMarkup(arr) {
  return arr.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
  <li class="gallery-item">
  <a href="${largeImageURL}" class="gallery-link">
      <img src="${webformatURL}" 
           alt="${tags}" 
           class="gallery-image"
           loading="lazy" 
           width="250"
           height="250">
      <div class="info">
        <div class="image-item">Likes <span class="image-elem">${likes}</span></div>
        <div class="image-item">Views <span class="image-elem">${views}</span></div>
        <div class="image-item">Comments <span class="image-elem">${comments}</span></div>
        <div class="image-item">Downloads <span class="image-elem">${downloads}</span></div>
  </div>
</a>
</li>
`).join('');
};