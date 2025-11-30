const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const gamesData = [
    {
      id: 1,
      title: "The Witcher 3: Wild Hunt",
      description: "Action role-playing game where you play as Geralt of Rivia...",
      image: "witcher3.png",
      price: 30,
      rating: 10,
      releaseDate: "2015-05" 
    },
    {
      id: 2,
      title: "God of War (2018)",
      description: "This is an action-adventure game where a now-older Kratos...",
      image: "gow.png",
      price: 45,
      rating: 9.8,
      releaseDate: "2018-04"
    },
    {
      id: 3,
      title: "The Last of Us Part II",
      description: "A third-person action-adventure survival horror game where Ellie...",
      image: "tlou2.png",
      price: 60,
      rating: 9.5,
      releaseDate: "2020-06"
    },
    {
      id: 4,
      title: "Bloodborne",
      description: "An action RPG set in the Gothic, ruined city of Yharnam...",
      image: "bloodborne.png",
      price: 35,
      rating: 9.0,
      releaseDate: "2015-03"
    }
];


app.get('/api/games', (req, res) => {
    setTimeout(() => {
        let results = [...gamesData];
        const { price, rating, date } = req.query;

        if (price === 'cheap') results = results.filter(g => g.price < 35);
        if (price === 'expensive') results = results.filter(g => g.price >= 35);

        if (rating === 'high') results = results.filter(g => g.rating >= 9.5);
        if (rating === 'good') results = results.filter(g => g.rating >= 9.0 && g.rating < 9.5);

        if (date) {
            results = results.filter(g => {
                const gameDate = new Date(g.releaseDate);
                if (date === 'new') return gameDate >= new Date('2018-01-01');
                if (date === 'classic') return gameDate < new Date('2018-01-01');
                if (date === 'early_2015') {
                    return gameDate >= new Date('2015-01-01') && gameDate < new Date('2015-04-01');
                }
                return true;
            });
        }

        res.json(results);
    }, 1000);
});

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});