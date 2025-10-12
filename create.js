const form = document.getElementById('createForm');
const modal = document.getElementById('modal');
const modalMessage = document.getElementById('modalMessage');

const titleInput = document.getElementById("title");
const durationInput = document.getElementById("duration");
const reviewsInput = document.getElementById("reviews");
const descriptionInput = document.getElementById("description");
const imageInput = document.getElementById("image");

form.addEventListener('submit', function(e) {
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

  if (isNaN(reviews)) {
    showModal("Reviews must be a number!");
    return;
  }

  if (isNaN(duration)) {
    showModal("Duration must be a number!");
    return;
  }

  const storedFilms = JSON.parse(localStorage.getItem("films")) || [];

  const newFilm = {
    name: title,
    duration: Number(duration),
    reviews: Number(reviews),
    description: description,
    image: image,
    lastUpdated: "just now"
  };

  storedFilms.push(newFilm);
  localStorage.setItem("films", JSON.stringify(storedFilms));

  showModal(`Film "${title}" added successfully!`);
  form.reset();

  modal.querySelector('button').onclick = function() {
    closeModal();
    window.location.href = 'index.html';
};

});

function showModal(message) {
  modalMessage.textContent = message;
  modal.style.display = 'flex';
}

function closeModal() {
  modal.style.display = 'none';
}
