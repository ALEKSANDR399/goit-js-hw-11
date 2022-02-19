import axios from 'axios';
export default class NewsApiService {
  constructor() {
    this.info = '';
    this.page = 1;
  }

  async getUser() {
    const BASE_URL = 'https://pixabay.com/api/';
    const MY_KEY = 'key=25767456-f92e672e1b91dd336dc5b7edd';
    const CONST_PARAM = `image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`;

    const response = await axios.get(`${BASE_URL}?${MY_KEY}&q=${this.info}&${CONST_PARAM}`);
    this.incrementPage();
    return response;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
  get informationSearch() {
    return this.info;
  }
  set informationSearch(newInfo) {
    this.info = newInfo;
  }
}
