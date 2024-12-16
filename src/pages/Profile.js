import { fetchProfile } from '../api/profiles.js';
import { navigate } from '../main.js';

export async function Profile() {
  const card = document.createElement('div');
  const app = document.querySelector('#app');
  app.innerHTML = '';

  try {
    const container = document.createElement("div")
    const { data } = await fetchProfile();
    container.className = 'profile-page max-w-4xl mx-auto my-8 p-4 bg-zinc-400 shadow rounded';


    if (data.banner && data.banner.url) {
      const banner = document.createElement('div');
      banner.style.backgroundImage = `url(${data.banner.url})`;
      banner.className = 'profile-banner h-32 bg-cover bg-center mb-8';
      container.appendChild(banner);
    }


    const profileInfo = document.createElement('div');
    profileInfo.className = 'profile-info text-center mb-8';

    const avatar = document.createElement('img');
    avatar.src = data.avatar?.url || '/placeholder-avatar.png';
    avatar.alt = 'Avatar';
    avatar.className = 'mx-auto mb-4 rounded-full w-24 h-24 object-cover';

    const name = document.createElement('h1');
    name.className = 'text-3xl font-bold';
    name.textContent = data.name || 'Anonymous';

    const bio = document.createElement('p');
    bio.className = 'text-gray-700';
    bio.textContent = data.bio || 'No bio provided.';

    const credits = document.createElement('p');
    credits.className = 'text-sm text-gray-500 mt-2';
    credits.textContent = `Credits: ${data.credits || 0}`;

    profileInfo.append(avatar, name, bio, credits);
    container.appendChild(profileInfo);


    const actionsContainer = document.createElement('div');
    actionsContainer.className = 'actions flex flex-col sm:flex-row flex-wrap justify-center gap-4';
    //actionsContainer.className = 'actions grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4';


    const actions = [
      { title: 'My Listings', description: 'View all your listings', link: '/profile/listings' },
      { title: 'My Wins', description: 'View all your auction wins', link: '/profile/wins' },
      { title: 'My Bids', description: 'View all your bids', link: '/profile/bids' },
      { title: 'Edit Profile', description: 'Update your profile information', link: '/profile/edit' },
    ];

    actions.forEach((action) => {
      card.className = 'action-card border rounded shadow p-4 text-center bg-gray-50 ';

      const cardTitle = document.createElement('h3');
      cardTitle.className = 'text-xl font-bold mb-2 text-gray-800';
      cardTitle.textContent = action.title;

      const cardDesc = document.createElement('p');
      cardDesc.className = 'text-sm text-gray-600 mb-4';
      cardDesc.textContent = action.description;

      const link = document.createElement('a');
      link.className = 'text-blue-500 hover:underline';
      link.href = action.link;
      link.textContent = 'Go';
      link.addEventListener('click', (e) => {
        e.preventDefault();
        navigate(action.link);
      });

      card.append(cardTitle, cardDesc, link);
      actionsContainer.appendChild(card);
    });

    container.appendChild(actionsContainer);
    app.appendChild(container);
  } catch (error) {
    app.innerHTML = `<p class="text-red-500">Error loading profile: ${error.message}</p>`;
  }
}
