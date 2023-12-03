const cleanGamesControllrs = (array) => {
    return array.map((game) => {
        return {
            id: game.id,
            name: game.name,
            released: game.released,
            description: game.description_raw,
            rating: game.rating,
            platforms: game.platforms.map(platform => platform.platform.name).join(', '),
            genres: game.genres.map(genres => genres.name),
            stores: game.stores,
            image: game.background_image || game.image,
            created: false
        };
    });
};

module.exports = cleanGamesControllrs;