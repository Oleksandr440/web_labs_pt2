const form = document.getElementById('createForm');
const modal = document.getElementById('modal');
const modalMessage = document.getElementById('modalMessage');

const titleInput = document.getElementById("title");
const durationInput = document.getElementById("duration");
const reviewsInput = document.getElementById("reviews");
const descriptionInput = document.getElementById("description");
const imageInput = document.getElementById("image");

const API_URL = 'http://localhost:3000/api/films';

form.addEventListener('submit', async function(e) {
  e.preventDefault();

  const title = titleInput.value.trim();
  const duration = durationInput.value.trim();
  const reviews = reviewsInput.value.trim();
  const description = descriptionInput.value.trim();
  const image = imageInput.value;

  if (!title || !duration || !reviews || !description || !image) {
    showModal("Please fill in all fields!");
    return;
  }
  
  if (isNaN(duration)) {
    showModal("Duration must be a number!");
    return;
  }

  if (isNaN(reviews)) {
    showModal("Reviews must be a number!");
    return;
  }
 
  const newFilm = {
    name: title,
    duration: Number(duration), 
    reviews: Number(reviews),
    description: description,
    image: image
  };

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newFilm)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create film');
    }
    
    const createdFilm = await response.json();

    showModal(`Film "${createdFilm.name}" added successfully!`);
    form.reset();

    modal.querySelector('button').onclick = function() {
      closeModal();
      window.location.href = 'index.html';
    };

  } catch (error) {
    console.error('Error creating film:', error);
    showModal(`Error: ${error.message}`);
  }
});

function showModal(message) {
  modalMessage.textContent = message;
  modal.style.display = 'flex';
}

function closeModal() {
  modal.style.display = 'none';
}