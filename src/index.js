import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';
import { fetchBreeds, fetchCatByBreed } from './api';

const breedSelect = document.querySelector('.breed-select');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

function renderBreeds(breeds) {
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
}

function renderCat(catData) {
  const catImage = document.createElement('img');
  catImage.src = catData.catUrl;
  catImage.alt = catData.breedName;
  catImage.classList.add('cat-image');

  const breedName = document.createElement('h2');
  breedName.textContent = catData.breedName;

  const description = document.createElement('p');
  description.textContent = catData.description;

  const temperament = document.createElement('p');
  temperament.textContent = catData.temperament;

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
}

function handleBreedSelectChange() {
  const selectedBreedId = breedSelect.value;
  fetchCatByBreed(selectedBreedId)
    .then(catData => {
      renderCat(catData);
    })
    .catch(error => {
      console.error(error);
    });
}

breedSelect.addEventListener('change', handleBreedSelectChange);

async function initializeApp() {
  try {
    await fetchBreeds().then(breeds => {
      renderBreeds(breeds);
    });
  } catch (error) {
    console.error(error);
  }
}

initializeApp();
