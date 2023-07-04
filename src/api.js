import axios from 'axios';
import Notiflix from 'notiflix';

axios.defaults.headers.common['x-api-key'] =
  'live_vzYp38p5aA1uUhQQsZkTYyJW0CYIO9XeaKkYdireKur9E2XHe7vag5Dsf9o1v50O';

export function fetchBreeds() {
  Notiflix.Loading.dots('Loading data, please wait', {
    backgroundColor: 'rgba(0,0,0,0.8)',
  });

  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => {
      const breeds = response.data;
      Notiflix.Loading.remove();
      return breeds;
    })
    .catch(error => {
      handleError();
      Notiflix.Loading.remove();
      throw error;
    });
}

export function fetchCatByBreed(breedId) {
  Notiflix.Loading.dots('Loading data, please wait', {
    backgroundColor: 'rgba(0,0,0,0.8)',
  });

  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => {
      const cat = response.data[0];
      const breed = cat.breeds[0];

      const catData = {
        catUrl: cat.url,
        breedName: breed.name,
        description: breed.description,
        temperament: breed.temperament,
      };

      Notiflix.Loading.remove();
      return catData;
    })
    .catch(error => {
      Notiflix.Loading.remove();
      handleError();
      throw error;
    });
}

function handleError() {
  const error = document.querySelector('.error');
  error.style.display = 'block';
  error.style.color = 'red';
  Notiflix.Notify.failure(
    'Oops! Something went wrong! Try reloading the page!'
  );
}
