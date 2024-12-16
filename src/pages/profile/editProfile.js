import { updateProfile, fetchProfile } from '../../api/profiles.js';
import { navigate } from '../../main.js';

export async function EditProfile() {
  const app = document.querySelector('#app');
  app.innerHTML = '';

  const container = document.createElement('div');
  container.className = 'edit-profile max-w-4xl mx-auto my-8 p-4 bg-zinc-400 shadow rounded';


  const backButton = document.createElement('button');
  backButton.className = 'bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mb-4';
  backButton.textContent = '← Back';
  backButton.addEventListener('click', () => {
    history.back();
  });
  container.appendChild(backButton);
  
  const title = document.createElement('h1');
  title.className = 'text-3xl font-bold mb-6 text-center';
  title.textContent = 'Edit Profile';
  container.appendChild(title);


  let profileData = {};
  try {
    const response = await fetchProfile();
    profileData = response.data;
  } catch (error) {
    app.innerHTML = `<p class="text-red-500 text-center">Error fetching profile: ${error.message}</p>`;
    return;
  }


  const form = document.createElement('form');
  form.className = 'space-y-4';


  const bioLabel = createLabel('Bio', 'bio');
  const bioInput = createInput('text', 'bio', profileData.bio || 'No bio provided');


  const avatarLabel = createLabel('Avatar URL', 'avatar');
  const avatarInput = createInput('url', 'avatar', profileData.avatar?.url || '');


  const bannerLabel = createLabel('Banner URL', 'banner');
  const bannerInput = createInput('url', 'banner', profileData.banner?.url || '');


  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.textContent = 'Save Changes';
  submitButton.className =
    'w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded';

  form.append(
    bioLabel,
    bioInput,
    avatarLabel,
    avatarInput,
    bannerLabel,
    bannerInput,
    submitButton
  );
  container.appendChild(form);
  app.appendChild(container);


  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const updatedData = {
      bio: bioInput.value,
      avatar: { url: avatarInput.value },
      banner: { url: bannerInput.value },
    };

    try {
      const response = await updateProfile(updatedData);

      if (response.success) {
        alert('Profile updated successfully!');
        navigate('/profile');

      } else {
        alert(`Error: ${response.message}`);
      }
    } catch (error) {
      console.error('Error updating profile:', error.message);
      alert('An error occurred while updating your profile.');
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
  input.style.color = 'black';
  input.className =
  'bg-gray-100 border border-gray-300 text-sm rounded-sm block w-full p-2 lg:p-4'; 
  return input;
}
