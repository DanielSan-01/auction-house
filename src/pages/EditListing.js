import { fetchSingleListing } from '../api/listings.js';
import { updateListing } from '../api/listings.js';
import { navigate } from '../main.js';

export async function EditListing(id) {
  const app = document.querySelector('#app');
  app.innerHTML = '';

  const container = document.createElement('div');
  container.className = 'edit-listing max-w-4xl mx-auto my-8 p-4 bg-zinc-400 shadow rounded';

  const titleElement = document.createElement('h1');
  titleElement.className = 'text-3xl font-bold mb-6 text-center';
  titleElement.textContent = 'Edit Listing';
  container.appendChild(titleElement);

  let listingData = {};
  try {
    const response = await fetchSingleListing(id);
    listingData = response.data;
  } catch (error) {
    app.innerHTML = `<p class="text-red-500 text-center">Error fetching listing: ${error.message}</p>`;
    return;
  }


  const form = document.createElement('form');
  form.className = 'space-y-4';


  const titleLabel = createLabel('Title', 'title');
  const titleInput = createInput('text', 'title', listingData.title || '');


  const descLabel = createLabel('Description', 'description');
  const descInput = createTextarea('description', listingData.description || '');


  const tagsLabel = createLabel('Tags (comma-separated)', 'tags');
  const tagsInput = createInput('text', 'tags', listingData.tags?.join(', ') || '');


  const mediaLabel = createLabel('Media URLs (comma-separated)', 'media');
  const mediaInput = createInput(
    'text',
    'media',
    listingData.media?.map((m) => m.url).join(', ') || ''
  );


  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.textContent = 'Save Changes';
  submitButton.className =
    'w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded';

  form.append(
    titleLabel,
    titleInput,
    descLabel,
    descInput,
    tagsLabel,
    tagsInput,
    mediaLabel,
    mediaInput,
    submitButton
  );
  container.appendChild(form);
  app.appendChild(container);


  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const updatedData = {
      title: titleInput.value.trim(),
      description: descInput.value.trim(),
      tags: tagsInput.value
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag),
      media: mediaInput.value
        .split(',')
        .map((url) => ({ url: url.trim(), alt: 'Updated Image' }))
        .filter((media) => media.url),
    };

    try {
      const res = await updateListing(id, updatedData);
      if (res.success) {
        alert('Listing updated successfully!');
        navigate(`/listings/${id}`); 
        
      } else {
        alert(`Error: ${res.message}`);
      }
    } catch (error) {
      console.error('Error updating listing:', error.message);
      alert('An error occurred while updating the listing.');
    }
  });
}


function createLabel(text, forAttr) {
  const label = document.createElement('label');
  label.htmlFor = forAttr;
  label.textContent = text;
  label.className = 'block text-sm font-medium text-gray-700';
  return label;
}

function createInput(type, id, value) {
  const input = document.createElement('input');
  input.type = type;
  input.id = id;
  input.name = id;
  input.value = value;
  input.className =
    'bg-gray-100 border border-gray-300 text-sm rounded-sm block w-full p-2 lg:p-4 text-black';
  return input;
}

function createTextarea(id, value) {
  const textarea = document.createElement('textarea');
  textarea.id = id;
  textarea.name = id;
  textarea.value = value;
  textarea.rows = 4;
  textarea.className =
    'bg-gray-100 border border-gray-300 text-sm rounded-sm block w-full p-2 lg:p-4 text-black';
  return textarea;
}
