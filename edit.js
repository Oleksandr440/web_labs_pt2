const form = document.getElementById("editForm");
const modal = document.getElementById("modal");
const modalMessage = document.getElementById("modalMessage");

const titleInput = document.getElementById("title");
const durationInput = document.getElementById("duration");
const reviewsInput = document.getElementById("reviews");
const descriptionInput = document.getElementById("description");
const imageInput = document.getElementById("image");

const API_URL = 'http://localhost:3000/api/films';

const filmIdToEdit = localStorage.getItem("editFilmId");

if (!filmIdToEdit) {
  alert("No film selected for editing!");
  window.location.href = "index.html";
}

async function loadFilmData(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      throw new Error('Film not found');
    }
    const film = await response.json();

    titleInput.value = film.name;
    durationInput.value = film.duration;
    reviewsInput.value = film.reviews;
    descriptionInput.value = film.description;
    imageInput.value = film.image;

  } catch (error) {
    console.error('Error loading film:', error);
    alert('Failed to load film data. Redirecting to home.');
    window.location.href = "index.html";
  }
}

loadFilmData(filmIdToEdit);


form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const updatedFilmData = {
    name: titleInput.value.trim(),
    duration: Number(durationInput.value.trim()),
    reviews: Number(reviewsInput.value.trim()),
    description: descriptionInput.value.trim(),
    image: imageInput.value.trim(),
  };

  try {
    const response = await fetch(`${API_URL}/${filmIdToEdit}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedFilmData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update film');
    }
    
    const updatedFilm = await response.json();

    localStorage.removeItem("editFilmId");

    showModal(`Film "${updatedFilm.name}" updated successfully!`);

    modal.querySelector("button").onclick = function() {
      closeModal();
      window.location.href = "index.html";
    };

  } catch (error) {
    console.error('Error updating film:', error);
    showModal(`Error: ${error.message}`);
  }
});

function showModal(message) {
  modalMessage.textContent = message;
  modal.style.display = "flex";
}

function closeModal() {
  modal.style.display = "none";
}