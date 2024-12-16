import { profileWins } from '../../api/profiles.js';
import { createListingsCard } from '../../components/listingsCard.js';

export async function MyWins() {
  const app = document.querySelector('#app');
  app.innerHTML = '';

  const container = document.createElement('div');
  container.className = 'wins-page max-w-4xl mx-auto my-8 p-4 bg-zinc-400 shadow rounded';


  const backButton = document.createElement('button');
  backButton.className = 'bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mb-4';
  backButton.textContent = '← Back';
  backButton.addEventListener('click', () => {
    history.back();
  });
  container.appendChild(backButton);
  

  const title = document.createElement('h1');
  title.className = 'text-3xl font-bold mb-6 text-center';
  title.textContent = 'My Wins';
  container.appendChild(title);
s

  const listingsContainer = document.createElement('div');
  listingsContainer.className = 'listings-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4';

  try {
    const response = await profileWins();
    const wins = response.data || []; 


    if (wins.length === 0) {
      const noWinsMessage = document.createElement('div');
      noWinsMessage.className = 'text-center text-gray-700';


      const message = document.createElement('p');
      message.textContent = "You haven't won any listings yet.";

      noWinsMessage.appendChild(message);
      container.appendChild(noWinsMessage);
    } else {
      wins.forEach((win) => {
        const card = createListingsCard(win);
        listingsContainer.appendChild(card);
      });

      container.appendChild(listingsContainer);
    }
  } catch (error) {
    console.error('Error loading wins:', error.message);
    const errorMessage = document.createElement('p');
    errorMessage.className = 'text-red-500 text-center';
    errorMessage.textContent = `Error loading wins: ${error.message}`;
    container.appendChild(errorMessage);
  }

  app.appendChild(container);
}
