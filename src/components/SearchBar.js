import { searchListings } from '../api/listings.js';

export function SearchBar(onSearchResults) {
  const container = document.createElement('div');
  container.className = 'search-bar flex justify-center mb-4';

  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'Search for listings...';
  input.className =
    'w-3/4 px-4 py-2 border border-gray-300 rounded-l focus:outline-none focus:ring focus:ring-blue-300';

  const button = document.createElement('button');
  button.textContent = 'Search';
  button.className = 'bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600';

  button.addEventListener('click', async () => {
    const query = input.value.trim();
    if (query) {
      const response = await searchListings(query);
      if (response.success) {
        onSearchResults(response.data);
      } else {
        alert(`Error: ${response.message}`);
      }
    }
  });

  container.appendChild(input);
  container.appendChild(button);

  return container;
}
