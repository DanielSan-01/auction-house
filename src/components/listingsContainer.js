import { fetchAllListings } from '../api/listings.js';
import { createListingsCard } from './listingsCard.js';

export function ListingsContainer() {
  const container = document.createElement('div');
  container.className = 'listings-container grid grid-cols-1 md:grid-cols-3 gap-4 p-4';

  fetchAllListings().then(response => {
    if (response.success) {
      const listings = response.data;

      if (listings.length === 0) {
        const emptyMessage = document.createElement('p');
        emptyMessage.textContent = 'No listings available at the moment.';
        emptyMessage.className = 'text-center text-gray-500';
        container.appendChild(emptyMessage);
      } else {
        listings.forEach(listing => {
          const card = createListingsCard(listing);
          container.appendChild(card);
        });
      }
    } else {
      const errorMessage = document.createElement('p');
      errorMessage.textContent = 'Failed to load listings. Please try again later.';
      errorMessage.className = 'text-center text-red-500';
      container.appendChild(errorMessage);
    }
  });

  return container;
}

