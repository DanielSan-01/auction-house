import { profileListings } from '../../api/profiles.js';
import { createListingsCard } from '../../components/listingsCard.js';

export async function MyListings() {
  const app = document.querySelector('#app');
  app.innerHTML = '';

  const container = document.createElement('div');
  container.className = 'listings-page max-w-4xl mx-auto my-8 p-4 bg-zinc-400 shadow rounded';


  const backButton = document.createElement('button');
  backButton.className = 'bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mb-4';
  backButton.textContent = '← Back';
  backButton.addEventListener('click', () => {
    history.back();
  });
  container.appendChild(backButton);

  const title = document.createElement('h1');
  title.className = 'text-3xl font-bold mb-6 text-center';
  title.textContent = 'My Listings';
  container.appendChild(title);


  const createListingButton = document.createElement('a');
  createListingButton.href = '/create-listing';
  createListingButton.textContent = 'Create New Listing';
  createListingButton.className =
    'block w-48 mx-auto mb-6 bg-blue-500 text-white text-center font-bold py-2 px-4 rounded hover:bg-blue-600';

  container.appendChild(createListingButton);

  const listingsContainer = document.createElement('div');
  listingsContainer.className = 'listings-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4';

  try {
    const response = await profileListings();
    const listings = response.data || []; 

    if (listings.length === 0) {
      const noListingsMessage = document.createElement('div');
      noListingsMessage.className = 'text-center text-gray-700';

      // Message
      const message = document.createElement('p');
      message.textContent = "You don't have any listings yet.";

      // Create Listing Link
      const createLink = document.createElement('a');
      createLink.href = '/create-listing';
      createLink.className = 'text-blue-500 hover:underline mt-2 inline-block';
      createLink.textContent = 'Create one here';

      noListingsMessage.appendChild(message);
      noListingsMessage.appendChild(createLink);

      container.appendChild(noListingsMessage);
    } else {
      listings.forEach((listing) => {
        const card = createListingsCard(listing);
        listingsContainer.appendChild(card);
      });

      container.appendChild(listingsContainer);
    }
  } catch (error) {
    console.error('Error loading listings:', error.message);
    const errorMessage = document.createElement('p');
    errorMessage.className = 'text-red-500 text-center';
    errorMessage.textContent = `Error loading listings: ${error.message}`;
    container.appendChild(errorMessage);
  }

  app.appendChild(container);
}
