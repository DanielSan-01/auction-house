import { navigate } from '../main.js';

export function createListingsCard(listing) {
  const card = document.createElement('div');
  card.className = 'listing-card border rounded shadow-md p-4 bg-white';

  if (listing.media && listing.media.length > 0) {
    const image = document.createElement('img');
    image.src = listing.media[0].url;
    image.alt = listing.media[0].alt || 'Listing Image';
    image.className = 'w-full h-32 object-cover mb-4';
    card.appendChild(image);
  }

  const title = document.createElement('h3');
  title.textContent = listing.title.length > 20 ? `${listing.title.substring(0, 20)}...` : listing.title;
  title.className = 'font-bold text-lg mb-2';
  card.appendChild(title);

  const now = new Date();
  const endsAt = new Date(listing.endsAt);
  const timeRemaining = endsAt > now ? calculateTimeRemaining(now, endsAt) : 'Auction ended';

  const timeInfo = document.createElement('p');
  timeInfo.textContent = timeRemaining;
  timeInfo.className = endsAt > now ? 'text-green-500' : 'text-red-500';
  card.appendChild(timeInfo);

  const viewLink = document.createElement('a');
  viewLink.href = `/listings/${listing.id}`;
  viewLink.textContent = 'View Listing';
  viewLink.className = 'block mt-4 text-blue-500 hover:underline';
  viewLink.addEventListener('click', (event) => {
    event.preventDefault();
    navigate(`/listings/${listing.id}`);
  });
  card.appendChild(viewLink);


  return card;
}

function calculateTimeRemaining(now, endsAt) {
  const diff = endsAt - now;
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return `Time remaining: ${hours}h ${minutes}m ${seconds}s`;
}
