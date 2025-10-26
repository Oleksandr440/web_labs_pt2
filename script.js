class Film {
  constructor(name, duration, reviews, image, description, lastUpdated, id, isDefault) {
    this.name = name;
    this.duration = duration;
    this.reviews = reviews;
    this.image = image;
    this.description = description;
    this.lastUpdated = lastUpdated;
    this.id = id; 
    this.isDefault = isDefault; 
  }
}

const filmsContainer = document.getElementById("filmsContainer");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const clearBtn = document.getElementById("clearBtn");
const sortToggle = document.getElementById("sortToggle");
const countBtn = document.getElementById("countBtn");
const totalReviewsEl = document.getElementById("totalReviews");

const API_URL = 'http://localhost:3000/api/films';

async function fetchFilms() {
  const searchTerm = searchInput.value.toLowerCase();
  const sortBy = sortToggle.checked ? 'desc' : 'asc';

  const url = new URL(API_URL);
  url.searchParams.append('sort', sortBy);
  if (searchTerm) {
    url.searchParams.append('search', searchTerm);
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const filmsData = await response.json();
    
    const films = filmsData.map(f => new Film(
      f.name, f.duration, f.reviews, f.image, f.description, 
      f.lastUpdated, f.id, f.isDefault
    ));
    
    renderFilms(films);
  } catch (error) {
    console.error('Error fetching films:', error);
    filmsContainer.innerHTML = '<p class="error">Failed to load films.</p>';
  }
}

function renderFilms(data) {
  filmsContainer.innerHTML = "";
  data.forEach((film) => { 
    filmsContainer.insertAdjacentHTML("beforeend", `
      <div class="film-card" data-id="${film.id}"> <img src="${film.image}" alt="${film.name}">
        <div class="film-info">
          <h4>${film.name}</h4>
          <p>${film.description}</p>
          <p class="details">Last updated ${film.lastUpdated}</p>
          <p><b>Duration:</b> ${film.duration} min</p>
          <p><b>Reviews:</b> ${film.reviews.toLocaleString()}</p>
          <div class="buttons">
            <button class="edit-btn" ${film.isDefault ? 'disabled' : ''}>Edit</button>
            <button class="remove-btn" ${film.isDefault ? 'disabled' : ''}>Remove</button>
          </div>
        </div>
      </div>
    `);
  });

  document.querySelectorAll(".remove-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const card = e.target.closest(".film-card");
      const id = card.dataset.id;
      if (!e.target.disabled) { 
        removeFilm(id);
      }
    });
  });

  document.querySelectorAll(".edit-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const card = e.target.closest(".film-card");
      const id = card.dataset.id;

      if (e.target.disabled) {
        alert("You cannot edit default films!");
        return;
      }
      
      localStorage.setItem("editFilmId", id);
      window.location.href = "edit.html";
    });
  });
}

async function removeFilm(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
       const errorData = await response.json();
       throw new Error(errorData.message || 'Failed to delete film');
    }

    fetchFilms(); 
  } catch (error) {
    console.error('Error deleting film:', error);
    alert(`Error: ${error.message}`);
  }
}

searchBtn.addEventListener("click", fetchFilms);

clearBtn.addEventListener("click", () => {
  searchInput.value = "";
  fetchFilms();
});

sortToggle.addEventListener("change", fetchFilms);

countBtn.addEventListener("click", async () => {
  try {
    const response = await fetch(`${API_URL}/reviews/total`);
    const data = await response.json();
    totalReviewsEl.textContent = `Total reviews: ${data.total.toLocaleString()}`;
  } catch (error) {
    console.error('Error counting reviews:', error);
    totalReviewsEl.textContent = 'Error counting reviews.';
  }
});

fetchFilms();