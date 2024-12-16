import { ListingsContainer } from '../components/listingsContainer.js';

export function HomePage() {
  const token = localStorage.getItem('accessToken');
  const app = document.querySelector('#app');
  app.innerHTML = '';

  const createListingButton = document.createElement('a');
  createListingButton.href = '/create-listing';
  createListingButton.textContent = 'Create New Listing';
  createListingButton.className = 'block w-48 mx-auto mb-6 bg-blue-500 text-white text-center font-bold py-2 px-4 rounded hover:bg-blue-600';

  if (token) {
    app.appendChild(createListingButton);
  }
  const container = ListingsContainer();
  app.appendChild(container);
}
