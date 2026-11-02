import express from "express";

const router = express.Router();

function isGoodStringParam(param){
  return  typeof param === "string" && param.trim().length > 0;
}

function isGoodNumericParam(param){
  return  typeof param === "number" && Number.isFinite(param);
}

const games = [
  {
    id: 1,
    title: "The Legend of Zelda: Breath of the Wild",
    publisher: "Nintendo",
    releaseYear: 2017,
    ageRating: "E10+",    
    price: 59.99,
    imageUrl: "https://placehold.co/300x400?text=Breath+of+the+Wild"
  },
  {
    id: 2,
    title: "God of War Ragnarök",
    publisher: "Sony Interactive Entertainment",
    releaseYear: 2022,
    ageRating: "M",
    price: 69.99,
    imageUrl: "https://placehold.co/300x400?text=God+of+War+Ragnarok"
  },
  {
    id: 3,
    title: "Halo Infinite",
    publisher: "Xbox Game Studios",
    releaseYear: 2021,
    ageRating: "T",
    price: 59.99,
    imageUrl: "https://placehold.co/300x400?text=Halo+Infinite"
  },
  {
    id: 4,
    title: "Minecraft",
    publisher: "Mojang Studios",
    releaseYear: 2011,
    ageRating: "E10+",
    price: 29.99,
    imageUrl: "https://placehold.co/300x400?text=Minecraft"
  },
  {
    id: 5,
    title: "Super Mario Odyssey",
    publisher: "Nintendo",
    releaseYear: 2017,
    ageRating: "E",
    price: 59.99,
    imageUrl: "https://placehold.co/300x400?text=Super+Mario+Odyssey"
  }
];

// GET request to retrieve all games
// Test: GET http://localhost:3000/api/games
router.get("/games", (req, res)=>{
  // DONE: return a JSON object with all games
  res.status(200).json(games);

});



// GET request to retrieve a single game by ID
// Test: GET http://localhost:3000/api/game/3
router.get("/game/:id", (req, res)=>{
  const id = Number(req.params.id);
  const game = games.find((game) => game.id === id);

  if(!game){
    return res.status(404).json({message: "Game not found!"});
  }

  // Return a JSON object with the single game
  res.status(200).json(game);
});


// POST request to create a new game
//Test: POST http://localhost:3000/api/game/
router.post("/game", (req, res)=>{
    const { title, price } = req.body;
    // validate Params
    if ( !isGoodStringParam(title) || !isGoodNumericParam(price) ){
        return res.status(400).json({
          message: "Game title and price are required fields"
        });
    }
    // TODO: Create a new game and add it to the collection 
    const newGame ={
      id: Math.max(...games.map( (game) => game.id )) + 1, 
      title: title.trim(),
      price: price
    }

    games.push(newGame);

    res.status(201).json(newGame);
});


// PUT request to update an entire game
router.put("/game/:id", (req, res) => {
    const id = Number(req.params.id);
    const game = games.find( (game) => game.id === id);

    if(!game){
      return res.status(404).json({ message: "Game not found!" });
    }
    const { title, price } = req.body;
    // validate Params
    if ( !isGoodStringParam(title) || !isGoodNumericParam(price) ){
        return res.status(400).json({
          message: "Game title and price are required fields"
        });
    }

    //TODO: replace all data elements coming from the PUT request
    game.title  = title.trim();
    game.price = price;
    
    res.status(200).json(game);

});


// PATCH request to partially update a game
router.patch("/game/:id", (req, res) => {
    const id = Number(req.params.id);
    const game = games.find((game) => game.id === id);

    if (!game) {
        return res.status(404).json({ message: "Game not found!" });
    }

    const { title, price } = req.body;

    // Check whether the title field was provided, if so updated it!
    if (title !== undefined) { 
        if (!isGoodStringParam(title)) {
            return res.status(400).json({
                message: "Invalid game title"
            });
        }

        // TODO: udpate the game's title
        game.title = title.trim();
    }

    // Check whether the price field was provided, if so updated it!
    if (price !== undefined) {
        if (!isGoodNumericParam(price)) {
            return res.status(400).json({
                message: "Invalid game price"
            });
        }

        // TODO: udpate the game's price
        game.price = price;
    }

    res.status(200).json(game);
});

// DELETE request to remove a game from the collection
router.delete("/game/:id", (req, res) => {
    const id = Number(req.params.id);
    const gameIx = games.findIndex( (game) => game.id === id);

    if(gameIx  === -1){
        return res.status(404).json({ message: "Game not found!" });
    }
    
    // TODO: delete the item from the collection
     games.splice(gameIx, 1);

    res.status(204).send();
});

export default router;
