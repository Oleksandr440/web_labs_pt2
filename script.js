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
  
  const defaultFilms = [
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

  const storedFilms = JSON.parse(localStorage.getItem("films")) || [];
  let allFilms = [...defaultFilms, ...storedFilms];


  const filmsContainer = document.getElementById("filmsContainer");
  const searchInput = document.getElementById("searchInput");
  const searchBtn = document.getElementById("searchBtn");
  const clearBtn = document.getElementById("clearBtn");
  const sortToggle = document.getElementById("sortToggle");
  const countBtn = document.getElementById("countBtn");
  const totalReviewsEl = document.getElementById("totalReviews");

  
  function renderFilms(data) {
    filmsContainer.innerHTML = "";
    data.forEach((film, index) => {
      filmsContainer.insertAdjacentHTML("beforeend", `
        <div class="film-card" data-index="${index}">
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

    document.querySelectorAll(".remove-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const card = e.target.closest(".film-card");
        const index = parseInt(card.dataset.index);
        removeFilm(index);
      });
    });

    document.querySelectorAll(".edit-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const card = e.target.closest(".film-card");
        const index = parseInt(card.dataset.index);
        const film = allFilms[index];

        const isDefaultFilm = defaultFilms.some(f => f.name === film.name);
        if (isDefaultFilm) {
          alert("You can edit only your added films!");
          return;
        }

        localStorage.setItem("editFilm", JSON.stringify(film));
        localStorage.setItem("editFilmIndex", index);

        window.location.href = "edit.html";
      });
    });
  }


  function removeFilm(index) {
    allFilms.splice(index, 1);
  
    const userFilms = allFilms.filter(f => 
      !defaultFilms.some(df => df.name === f.name)
    );
  
    localStorage.setItem("films", JSON.stringify(userFilms));
    renderFilms(allFilms);
  }

  
  searchBtn.addEventListener("click", () => {
    const term = searchInput.value.toLowerCase();
    const filtered = allFilms.filter(film => film.name.toLowerCase().includes(term));
    renderFilms(filtered);
  });

  
  clearBtn.addEventListener("click", () => {
    searchInput.value = "";
    renderFilms(allFilms);
  });
  

  sortToggle.addEventListener("change", () => {
    let sorted;
    if (sortToggle.checked) {
      sorted = [...allFilms].sort((a, b) => b.reviews - a.reviews);
    } else {
      sorted = [...allFilms].sort((a, b) => a.reviews - b.reviews);
    }
    renderFilms(sorted);
  });
  
  
  countBtn.addEventListener("click", () => {
    let total = 0;
    allFilms.forEach(film => total += film.reviews);
    totalReviewsEl.textContent = `Total reviews: ${total.toLocaleString()}`;
  });

  renderFilms(allFilms);

