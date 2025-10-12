const form = document.getElementById("editForm");
const modal = document.getElementById("modal");
const modalMessage = document.getElementById("modalMessage");

const filmToEdit = JSON.parse(localStorage.getItem("editFilm"));

if (!filmToEdit) {
  alert("No film selected for editing!");
  window.location.href = "index.html";
}

document.getElementById("title").value = filmToEdit.name;
document.getElementById("duration").value = filmToEdit.duration;
document.getElementById("reviews").value = filmToEdit.reviews;
document.getElementById("description").value = filmToEdit.description;
document.getElementById("image").value = filmToEdit.image;


form.addEventListener("submit", (e) => {
  e.preventDefault();

  const updatedFilm = {
    ...filmToEdit,
    name: document.getElementById("title").value.trim(),
    duration: Number(document.getElementById("duration").value.trim()),
    reviews: Number(document.getElementById("reviews").value.trim()),
    description: document.getElementById("description").value.trim(),
    image: document.getElementById("image").value.trim(),
    lastUpdated: "just now"
  };

  const storedFilms = JSON.parse(localStorage.getItem("films")) || [];
  const index = storedFilms.findIndex(f => f.name === filmToEdit.name);
  if (index !== -1) {
    storedFilms[index] = updatedFilm;
    localStorage.setItem("films", JSON.stringify(storedFilms));
  }

  showModal(`Film "${updatedFilm.name}" updated successfully!`);

  modal.querySelector("button").onclick = function() {
    closeModal();
    window.location.href = "index.html";
  };
});

function showModal(message) {
  modalMessage.textContent = message;
  modal.style.display = "flex";
}

function closeModal() {
  modal.style.display = "none";
}
