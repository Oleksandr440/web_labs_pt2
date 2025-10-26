const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000; 

app.use(cors()); 
app.use(express.json()); 

const defaultFilms = [
  {
    id: 1, 
    name: "Inception",
    duration: 148,
    reviews: 2300000,
    image: "images/inception.png",
    description: "A thief who steals corporate secrets through dream-sharing technology.",
    lastUpdated: "10 mins ago",
    isDefault: true 
  },
  {
    id: 2,
    name: "Interstellar",
    duration: 169,
    reviews: 1900000,
    image: "images/interstellar.png",
    description: "Explorers travel through a black hole in space to save humanity.",
    lastUpdated: "5 mins ago",
    isDefault: true
  },
  {
    id: 3,
    name: "The Dark Knight",
    duration: 152,
    reviews: 2800000,
    image: "images/dark_knight.png",
    description: "Batman faces his greatest psychological and physical tests against the Joker",
    lastUpdated: "1 hour ago",
    isDefault: true
  },
];

let allFilms = [...defaultFilms];
let nextId = 4; 



//Get
app.get('/api/films', (req, res) => {
  const { search, sort } = req.query;
  
  let filmsToReturn = [...allFilms];

  //Search
  if (search) {
    filmsToReturn = filmsToReturn.filter(film => 
      film.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  //Sort
  if (sort === 'desc') {
    filmsToReturn.sort((a, b) => b.reviews - a.reviews);
  } else if (sort === 'asc') {
    filmsToReturn.sort((a, b) => a.reviews - b.reviews);
  }

  res.json(filmsToReturn);
});


// Get solo
app.get('/api/films/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const film = allFilms.find(f => f.id === id);

  if (film) {
    res.json(film);
  } else {
    res.status(404).json({ message: 'Film not found' });
  }
});

//Post
app.post('/api/films', (req, res) => {
  const { name, duration, reviews, description, image } = req.body;

  if (!name || !duration || !reviews || !description || !image) {
    return res.status(400).json({ message: 'Please fill in all fields!' });
  }

  const newFilm = {
    id: nextId++,
    name: name,
    duration: Number(duration),
    reviews: Number(reviews),
    description: description,
    image: image,
    lastUpdated: 'just now',
    isDefault: false
  };

  allFilms.push(newFilm);
  res.status(201).json(newFilm); 
});

//Put
app.put('/api/films/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = allFilms.findIndex(f => f.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Film not found' });
  }

  if (allFilms[index].isDefault) {
    return res.status(403).json({ message: 'You cannot edit default films!' });
  }

  const { name, duration, reviews, description, image } = req.body;
  const updatedFilm = {
    ...allFilms[index], 
    name: name,
    duration: Number(duration),
    reviews: Number(reviews),
    description: description,
    image: image,
    lastUpdated: 'just now'
  };

  allFilms[index] = updatedFilm;
  res.json(updatedFilm);
});

//Delete
app.delete('/api/films/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = allFilms.findIndex(f => f.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Film not found' });
  }

  if (allFilms[index].isDefault) {
    return res.status(403).json({ message: 'You cannot delete default films!' });
  }

  allFilms = allFilms.filter(f => f.id !== id);
  res.status(204).send();
});

//Sum review
app.get('/api/films/reviews/total', (req, res) => {
  const total = allFilms.reduce((sum, film) => sum + film.reviews, 0);
  res.json({ total: total });
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});