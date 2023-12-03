const cleanGameDB = (arr) => {
    return arr.map((game) => {
        const formattedGame = game.toJSON();
        formattedGame.genres = game.Genres.map((genre) => genre.name);
        delete formattedGame.Genres;
        return formattedGame;
    });
};

module.exports = cleanGameDB;