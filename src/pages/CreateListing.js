import { createListing } from '../api/listings.js';
import { navigate } from '../main.js';

export async function CreateListingPage() {
  const app = document.querySelector('#app');
  app.innerHTML = '';

  const container = document.createElement('div');
  container.className = 'create-listing-page max-w-4xl mx-auto my-8 p-4 bg-zinc-400 shadow rounded';

  const title = document.createElement('h1');
  title.className = 'text-3xl font-bold mb-6 text-center';
  title.textContent = 'Create New Listing';
  container.appendChild(title);


  const form = document.createElement('form');
  form.className = 'space-y-4';


  const titleLabel = createLabel('Title', 'title');
  const titleInput = createInput('text', 'title', 'Enter listing title', true);
  titleInput.type = 'text';
  titleInput.id = 'title';
  titleInput.placeholder = 'Enter listing title';
  titleInput.required = true;
  titleInput.className = 'block w-full p-2 border rounded';
  titleInput.style.color = 'black';


  const descLabel = createLabel('Description', 'description');
  const descInput = createTextarea('description', 'Enter listing description', true);
  descInput.id = 'description';
  descInput.placeholder = 'Enter listing description';
  descInput.required = true;
  descInput.className = 'block w-full p-2 border rounded';
  descInput.style.color = 'black';


  const tagsLabel = createLabel('Tags (comma-separated)', 'tags');
  const tagsInput = createInput('text', 'tags', 'e.g., cars, electronics', false);
  tagsInput.type = 'text';
  tagsInput.id = 'tags';
  tagsInput.placeholder = 'e.g., cars, electronics';
  tagsInput.required = false;
  tagsInput.className = 'block w-full p-2 border rounded';
  tagsInput.style.color = 'black';


  const mediaLabel = createLabel('Media URLs (comma-separated)', 'media');
  const mediaInput = createInput('text', 'media', 'https://example.com/image1.jpg, https://example.com/image2.jpg', false);
  mediaInput.type = 'text';
  mediaInput.id = 'media';
  mediaInput.placeholder = 'https://example.com/image1.jpg, https://example.com/image2.jpg';
  mediaInput.required = false;
  mediaInput.className = 'block w-full p-2 border rounded';
  mediaInput.style.color = 'black';


  const endsAtLabel = createLabel('Auction End Date', 'endsAt');
  const endsAtInput = createInput('datetime-local', 'endsAt', '', true);
  endsAtInput.type = 'datetime-local';
  endsAtInput.id = 'endsAt';
  endsAtInput.placeholder = '';
  endsAtInput.required = true;
  endsAtInput.className = 'block w-full p-2 border rounded';
  endsAtInput.style.color = 'black';

  const now = new Date();
  const oneYearFromNow = new Date();
  oneYearFromNow.setFullYear(now.getFullYear() + 1);

  const formatDateTime = (date) => date.toISOString().slice(0, 16);

  endsAtInput.min = formatDateTime(now);
  endsAtInput.max = formatDateTime(oneYearFromNow);


  // Submit Button
  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.textContent = 'Create Listing';
  submitButton.className = 'block w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600';

  // Append Inputs to Form
  form.append(
    titleLabel, titleInput,
    descLabel, descInput,
    tagsLabel, tagsInput,
    mediaLabel, mediaInput,
    endsAtLabel, endsAtInput,
    submitButton
  );
  container.appendChild(form);
  app.appendChild(container);

  // Form Submit Event Listener
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const accessToken = localStorage.getItem('accessToken');
    const apiKey = localStorage.getItem('apiKey');

    if (!accessToken || !apiKey) {
      alert('You must be logged in to create a listing.');
      return;
    }

    // Prepare Listing Data
    const listing = {
      title: titleInput.value,
      description: descInput.value,
      tags: tagsInput.value ? tagsInput.value.split(',').map(tag => tag.trim()) : [],
      media: mediaInput.value
        ? mediaInput.value.split(',').map(url => ({ url: url.trim() }))
        : [],
      endsAt: endsAtInput.value,
    };

    const result = await createListing(listing, accessToken, apiKey);

    if (result.success) {
      alert('Listing created successfully!');
      navigate('/profile/listings');
    } else {
      alert(`Error: ${result.message}`);
    }
  });
}

// Helper Functions
function createLabel(text, forAttr) {
  const label = document.createElement('label');
  label.htmlFor = forAttr;
  label.textContent = text;
  label.className = 'block font-medium';
  return label;
}

function createInput(type, id, placeholder, required) {
  const input = document.createElement('input');
  input.type = type;
  input.id = id;
  input.placeholder = placeholder;
  input.required = required;
  input.className = 'block w-full p-2 border rounded';
  return input;
}

function createTextarea(id, placeholder, required) {
  const textarea = document.createElement('textarea');
  textarea.id = id;
  textarea.placeholder = placeholder;
  textarea.required = required;
  textarea.className = 'block w-full p-2 border rounded';
  return textarea;
}
