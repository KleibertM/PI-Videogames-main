const server = require('./src/app.js');
const PORT = 3001;
const { conn } = require('./src/db.js');

// Syncing all the models at once.
conn.sync({ force: false })
.then(() => {
    server.listen(PORT, () => {
        console.log('Server raised in port: ' + PORT);
    })
}).catch((error)=> {
    console.log("Error while connecting to the database", error)
});
