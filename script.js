class Film {
    constructor(name, duration, reviews, image, description, lastUpdated) {
      this.name = name;
      this.duration = duration;
      this.reviews = reviews;
      this.image = image;
      this.description = description;
      this.lastUpdated = lastUpdated;
    }
  }
  
  const films = [
    new Film("Inception", 148, 2300000,
      "images/inception.png",
      "A thief who steals corporate secrets through dream-sharing technology.",
      "10 mins ago"),
  
    new Film("Interstellar", 169, 1900000,
      "images/interstellar.png",
      "Explorers travel through a black hole in space to save humanity.",
      "5 mins ago"),
  
    new Film("The Dark Knight", 152, 2800000,
      "images/dark_knight.png",
      "Batman faces his greatest psychological and physical tests against the Joker",
      "1 hour ago"),
  ];

  
  const filmsContainer = document.getElementById("filmsContainer");
  const searchInput = document.getElementById("searchInput");
  const searchBtn = document.getElementById("searchBtn");
  const clearBtn = document.getElementById("clearBtn");
  const sortToggle = document.getElementById("sortToggle");
  const countBtn = document.getElementById("countBtn");
  const totalReviewsEl = document.getElementById("totalReviews");
  

  function renderFilms(data) {
    filmsContainer.innerHTML = "";
    data.forEach(film => {
      filmsContainer.insertAdjacentHTML("beforeend", `
        <div class="film-card">
          <img src="${film.image}" alt="${film.name}">
          <div class="film-info">
            <h4>${film.name}</h4>
            <p>${film.description}</p>
            <p class="details">Last updated ${film.lastUpdated}</p>
            <p><b>Duration:</b> ${film.duration} min</p>
            <p><b>Reviews:</b> ${film.reviews.toLocaleString()}</p>
            <div class="buttons">
              <button class="edit-btn">Edit</button>
              <button class="remove-btn">Remove</button>
            </div>
          </div>
        </div>
      `);
    });
  }
  
  renderFilms(films);

  
  searchBtn.addEventListener("click", () => {
    const term = searchInput.value.toLowerCase();
    const filtered = films.filter(film => film.name.toLowerCase().includes(term));
    renderFilms(filtered);
  });

  
  clearBtn.addEventListener("click", () => {
    searchInput.value = "";
    renderFilms(films);
  });
  

  sortToggle.addEventListener("change", () => {
    let sorted;
    if (sortToggle.checked) {
      sorted = [...films].sort((a, b) => b.reviews - a.reviews);
    } else {
      sorted = [...films].sort((a, b) => a.reviews - b.reviews);
    }
    renderFilms(sorted);
  });
  
  
  countBtn.addEventListener("click", () => {
    let total = 0;
    films.forEach(film => total += film.reviews);
    totalReviewsEl.textContent = `Total reviews: ${total.toLocaleString()}`;
  });
  
