import { createBid } from '../api/listings.js';

export function BiddingComponent(listingId) {
  const biddingContainer = document.createElement('div');
  biddingContainer.className = 'bidding-container border-t pt-4 mt-4';

  const title = document.createElement('h3');
  title.className = 'text-lg font-bold mb-2';
  title.textContent = 'Place a Bid';

  const form = document.createElement('form');
  form.className = 'bid-form flex items-center gap-4';

  const input = document.createElement('input');
  input.type = 'number';
  input.min = '1';
  input.placeholder = 'Enter your bid amount';
  input.required = true;
  input.className = 'border rounded p-2 flex-grow text-black';

  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.textContent = 'Place Bid';
  submitButton.className = 'bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600';

  const errorMessage = document.createElement('p');
  errorMessage.className = 'text-red-500 mt-2 hidden';

  const successMessage = document.createElement('p');
  successMessage.className = 'text-green-500 mt-2 hidden';

  form.append(input, submitButton);
  biddingContainer.append(title, form, errorMessage, successMessage);

 
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    errorMessage.classList.add('hidden');
    successMessage.classList.add('hidden');

    const bidAmount = parseFloat(input.value);

    if (isNaN(bidAmount) || bidAmount <= 0) {
      errorMessage.textContent = 'Please enter a valid bid amount.';
      errorMessage.classList.remove('hidden');
      return;
    }

    try {
      const response = await createBid(listingId, bidAmount);
      if (response.success) {
        successMessage.textContent = 'Bid placed successfully!';
        successMessage.classList.remove('hidden');
        input.value = '';
        setTimeout(() => {
          location.reload();
        }, 1000);
      } else {
        errorMessage.textContent = response.message || 'Failed to place the bid. Please try again.';
        errorMessage.classList.remove('hidden');
      }
    } catch (error) {
      errorMessage.textContent = 'Error placing bid. Please try again later.';
      errorMessage.classList.remove('hidden');
    }
  });

  return biddingContainer;
}
