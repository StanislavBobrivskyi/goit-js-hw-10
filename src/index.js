import axios from 'axios';
import Notiflix from 'notiflix';
// Set the API key
axios.defaults.headers.common['x-api-key'] =
  'live_vzYp38p5aA1uUhQQsZkTYyJW0CYIO9XeaKkYdireKur9E2XHe7vag5Dsf9o1v50O';

// Elements
const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

// Fetch breeds
function fetchBreeds() {
  loader.style.display = 'block';
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

      loader.style.display = 'none';
      breedSelect.disabled = false;
      error.style.display = 'none';
    })
    .catch(error => {
      loader.style.display = 'none';
      Loading.dots('Loading...');
      handleError();
    });
}

// Fetch cat by breed
function fetchCatByBreed(breedId) {
  loader.style.display = 'block';
  catInfo.innerHTML = '';

  axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => {
      const cat = response.data[0];
      const breed = cat.breeds[0];

      const catImage = document.createElement('img');
      catImage.src = cat.url;
      catImage.alt = breed.name;

      const breedName = document.createElement('h2');
      breedName.textContent = breed.name;

      const description = document.createElement('p');
      description.textContent = breed.description;

      const temperament = document.createElement('p');
      temperament.textContent = breed.temperament;

      catInfo.appendChild(catImage);
      catInfo.appendChild(breedName);
      catInfo.appendChild(description);
      catInfo.appendChild(temperament);

      loader.style.display = 'none';
    })
    .catch(error => {
      loader.style.display = 'none';

      handleError();
    });
}

// Handle error
function handleError() {
  error.style.display = 'block';
  error.style.color = 'red';
  Notiflix.Notify.failure(
    'Oops! Something went wrong! Try reloading the page!'
  );
}

// Event listener for breed select change
breedSelect.addEventListener('change', () => {
  const selectedBreedId = breedSelect.value;
  fetchCatByBreed(selectedBreedId);
});

// Initial fetch of breeds
fetchBreeds();
