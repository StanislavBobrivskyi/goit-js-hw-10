import axios from 'axios';
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';

axios.defaults.headers.common['x-api-key'] =
  'live_vzYp38p5aA1uUhQQsZkTYyJW0CYIO9XeaKkYdireKur9E2XHe7vag5Dsf9o1v50O';

const breedSelect = document.querySelector('.breed-select');

const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

function fetchBreeds() {
  Notiflix.Loading.dots('Loading data, pleasse wait', {
    backgroundColor: 'rgba(0,0,0,0.8)',
  });

  breedSelect.disabled = true;
  error.style.display = 'none';

  axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => {
      const breeds = response.data;

      breeds.forEach(breed => {
        const option = document.createElement('option');
        option.value = breed.id;
        option.textContent = breed.name;
        breedSelect.appendChild(option);
      });

      new SlimSelect({
        select: '#single',
      });

      breedSelect.disabled = false;
      error.style.display = 'none';
      Notiflix.Loading.remove();
    })
    .catch(error => {
      handleError();
      Notiflix.Loading.remove();
    });
}

function fetchCatByBreed(breedId) {
  Notiflix.Loading.dots('Loading data, pleasse wait', {
    backgroundColor: 'rgba(0,0,0,0.8)',
  });

  catInfo.innerHTML = '';

  axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => {
      const cat = response.data[0];
      const breed = cat.breeds[0];

      const catImage = document.createElement('img');
      catImage.src = cat.url;
      catImage.alt = breed.name;
      catImage.classList.add('cat-image');

      const breedName = document.createElement('h2');
      breedName.textContent = breed.name;

      const description = document.createElement('p');
      description.textContent = breed.description;

      const temperament = document.createElement('p');
      temperament.textContent = breed.temperament;

      const modalContent = document.createElement('div');
      modalContent.appendChild(catImage);
      modalContent.appendChild(breedName);
      modalContent.appendChild(description);
      modalContent.appendChild(temperament);

      Swal.fire({
        title: 'Cat Information',
        html: modalContent.innerHTML,
        showCloseButton: true,
        showConfirmButton: false,
        animation: true,
        showClass: {
          popup: 'animate__animated animate__fadeInDown',
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp',
        },
      });
      Notiflix.Loading.remove();
    })
    .catch(error => {
      Notiflix.Loading.remove();

      handleError();
    });
}

function handleError() {
  error.style.display = 'block';
  error.style.color = 'red';
  Notiflix.Notify.failure(
    'Oops! Something went wrong! Try reloading the page!'
  );
}

breedSelect.addEventListener('change', () => {
  const selectedBreedId = breedSelect.value;
  fetchCatByBreed(selectedBreedId);
});

breedSelect.addEventListener('change', () => {
  const selectedBreedId = breedSelect.value;
  fetchCatByBreed(selectedBreedId);
});

fetchBreeds();
