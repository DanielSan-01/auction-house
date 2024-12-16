import { fetchSingleListing, deleteListing } from '../api/listings.js';
import { BidsComponent } from '../components/bidsComponent.js';
import { BiddingComponent } from '../components/biddingComponent.js';
import { navigate } from '../main.js';

export async function SingleListing(id) {
  const app = document.querySelector('#app');
  app.innerHTML = '';

  try {
    const { data } = await fetchSingleListing(id);

    const container = document.createElement('div');
    container.className = 'listing-container max-w-4xl mx-auto my-8 p-4 bg-white shadow rounded';

    // Back Button
    const backButton = document.createElement('button');
    backButton.className = 'bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mb-4';
    backButton.textContent = '← Back';
    backButton.addEventListener('click', () => {
      history.back();
    });
    container.appendChild(backButton);

    // Listing Details
    const listingDetails = document.createElement('div');
    listingDetails.className = 'listing-details mb-8';

    const title = document.createElement('h1');
    title.className = 'text-3xl font-bold mb-4';
    title.textContent = data.title;

    const image = document.createElement('img');
    image.src = data.media?.[0]?.url || '/placeholder.png';
    image.alt = data.media?.[0]?.alt || 'Listing Image';
    image.className = 'w-full h-auto object-cover mb-4';

    const description = document.createElement('p');
    description.className = 'text-gray-700 mb-4';
    description.textContent = data.description;

    const seller = document.createElement('p');
    seller.className = 'text-sm text-gray-500 mb-2';
    seller.textContent = `Seller: ${data.seller?.name || 'Unknown'}`;

    const details = document.createElement('p');
    details.className = 'text-sm text-gray-500';
    details.textContent = `Created: ${new Date(data.created).toLocaleString()} | Updated: ${
      data.updated ? new Date(data.updated).toLocaleString() : 'Never'
    } | Ends: ${new Date(data.endsAt).toLocaleString()}`;

    listingDetails.append(title, image, description, seller, details);
    container.appendChild(listingDetails);


    const loggedInUser = localStorage.getItem('userName');
    if (data.seller?.name === loggedInUser) {
      const buttonContainer = document.createElement('div');
      buttonContainer.className = 'flex gap-4 mb-4';


      const editButton = document.createElement('button');
      editButton.className =
        'bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600';
      editButton.textContent = 'Edit Listing';
      editButton.addEventListener('click', () => {
        navigate(`/edit-listing/${id}`);
      });


      const deleteButton = document.createElement('button');
      deleteButton.className =
        'bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600';
      deleteButton.textContent = 'Delete Listing';
      deleteButton.addEventListener('click', async () => {
        if (confirm('Are you sure you want to delete this listing?')) {
          try {
            await deleteListing(id);
            alert('Listing deleted successfully.');
            navigate('/profile/listings'); 

          } catch (error) {
            console.error('Error deleting listing:', error.message);
            alert('Failed to delete the listing.');
          }
        }
      });

      buttonContainer.append(editButton, deleteButton);
      container.appendChild(buttonContainer);
    }


    const bidsSection = BidsComponent(data.bids);
    container.appendChild(bidsSection);


    if (localStorage.getItem('accessToken') && localStorage.getItem('apiKey')) {
      const biddingSection = BiddingComponent(id);
      container.appendChild(biddingSection);
    }

    app.appendChild(container);
  } catch (error) {
    app.innerHTML = `<p class="text-red-500">Error loading listing: ${error.message}</p>`;
  }
}
