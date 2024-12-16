export function renderListings(pages, container) {
  let currentPage = 0;


  container.innerHTML = '';


  displayPage(pages[currentPage], container);


  const nav = document.createElement('div');
  nav.className = 'flex justify-between mt-4';

  const prevButton = document.createElement('button');
  prevButton.textContent = 'Previous';
  prevButton.disabled = currentPage === 0;

  const nextButton = document.createElement('button');
  nextButton.textContent = 'Next';
  nextButton.disabled = currentPage >= pages.length - 1;

  nav.appendChild(prevButton);
  nav.appendChild(nextButton);
  container.appendChild(nav);


  prevButton.addEventListener('click', () => {
    if (currentPage > 0) {
      currentPage--;
      displayPage(pages[currentPage], container);
      updateButtons();
    }
  });

  nextButton.addEventListener('click', () => {
    if (currentPage < pages.length - 1) {
      currentPage++;
      displayPage(pages[currentPage], container);
      updateButtons();
    }
  });

  function displayPage(pageData, container) {
    const listingsHTML = pageData
      .map((listing) => `<div class="listing-card">${listing.title}</div>`)
      .join('');
    container.innerHTML = listingsHTML;
  }

  function updateButtons() {
    prevButton.disabled = currentPage === 0;
    nextButton.disabled = currentPage >= pages.length - 1;
  }
}