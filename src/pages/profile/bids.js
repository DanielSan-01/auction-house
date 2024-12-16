import { profileBids } from '../../api/profiles.js';
import { createListingsCard } from '../../components/listingsCard.js';

export async function MyBids() {
  const app = document.querySelector('#app');
  app.innerHTML = '';

  const container = document.createElement('div');
  container.className = 'bids-page max-w-4xl mx-auto my-8 p-4 bg-zinc-400 shadow rounded';


  const backButton = document.createElement('button');
  backButton.className = 'bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mb-4';
  backButton.textContent = '← Back';
  backButton.addEventListener('click', () => {
    history.back();
  });
  container.appendChild(backButton);

  const title = document.createElement('h1');
  title.className = 'text-3xl font-bold mb-6 text-center';
  title.textContent = 'My Bids';
  container.appendChild(title);


  const listingsContainer = document.createElement('div');
  listingsContainer.className = 'listings-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4';

  try {
    const response = await profileBids();
    const bids = response.data || []; 

    if (bids.length === 0) {
      const noBidsMessage = document.createElement('div');
      noBidsMessage.className = 'text-center text-gray-700';

      // Message
      const message = document.createElement('p');
      message.textContent = "You haven't made any bids yet.";

      noBidsMessage.appendChild(message);
      container.appendChild(noBidsMessage);
    } else {
      bids.forEach((bid) => {

        const listing = bid.listing || {
          title: 'Unknown Listing',
          media: [{ url: '/placeholder.png', alt: 'No image available' }],
          endsAt: 'No end date',
        };

        const listingData = {
          id: listing.id || bid.id,
          title: listing.title || 'Listing Title Unknown',
          media: listing.media,
          endsAt: listing.endsAt,
        };

        const card = createListingsCard(listingData);
        listingsContainer.appendChild(card);
      });

      container.appendChild(listingsContainer);
    }
  } catch (error) {
    console.error('Error loading bids:', error.message);
    const errorMessage = document.createElement('p');
    errorMessage.className = 'text-red-500 text-center';
    errorMessage.textContent = `Error loading bids: ${error.message}`;
    container.appendChild(errorMessage);
  }

  app.appendChild(container);
}
