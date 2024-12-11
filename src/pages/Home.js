import { ListingsContainer } from '../components/listingsContainer.js';

export function HomePage() {
  const app = document.querySelector('#app');
  app.innerHTML = '';

  const container = ListingsContainer();
  app.appendChild(container);
}
