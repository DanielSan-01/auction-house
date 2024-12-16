import { ListingsContainer } from '../components/listingsContainer.js';
import { fetchListingsWithPagination } from '../api/listings.js';
import { createListingsCard } from '../components/listingsCard.js';
import { SearchBar } from '../components/SearchBar.js';


export function HomePage() {
  const token = localStorage.getItem('accessToken');
  const app = document.querySelector('#app');
  app.innerHTML = '';

  let currentPage = 1;
  const limit = 99;

  const listingsContainer = ListingsContainer();


  const header = document.createElement('div');
  header.className = 'mb-4 text-center';

  const createListingButton = document.createElement('a');
  createListingButton.href = '/create-listing';
  createListingButton.textContent = 'Create New Listing';
  createListingButton.className =
    'block w-48 mx-auto mb-6 bg-blue-500 text-white text-center font-bold py-2 px-4 rounded hover:bg-blue-600';

  if (token) {
    header.appendChild(createListingButton);
  }


  const pagination = document.createElement('div');
  pagination.className = 'flex justify-between mt-4';

  const prevButton = document.createElement('button');
  prevButton.textContent = 'Previous';
  prevButton.className = 'px-4 py-2 bg-gray-300 rounded hover:bg-gray-400';
  prevButton.disabled = true;

  const nextButton = document.createElement('button');
  nextButton.textContent = 'Next';
  nextButton.className = 'px-4 py-2 bg-gray-300 rounded hover:bg-gray-400';

  pagination.appendChild(prevButton);
  pagination.appendChild(nextButton);


  async function loadListings(page) {
    const response = await fetchListingsWithPagination(page, limit);
    if (response.success) {
      listingsContainer.innerHTML = '';
      response.data.forEach((listing) => {
        const card = createListingsCard(listing);
        listingsContainer.appendChild(card);
      });
      currentPage = page;


      prevButton.disabled = currentPage === 1;
      nextButton.disabled = response.data.length < limit;
    }
  }


  prevButton.addEventListener('click', () => {
    if (currentPage > 1) loadListings(currentPage - 1);
  });

  nextButton.addEventListener('click', () => {
    loadListings(currentPage + 1);
  });


  const searchBar = SearchBar((results) => {
    listingsContainer.innerHTML = '';
    results.forEach((listing) => {
      const card = createListingsCard(listing);
      listingsContainer.appendChild(card);
    });
    pagination.classList.add('hidden'); 

  });


  app.appendChild(header);
  app.appendChild(searchBar);
  app.appendChild(listingsContainer);
  app.appendChild(pagination);


  loadListings(currentPage);
}

