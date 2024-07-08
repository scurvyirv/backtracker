const express = require('express');
const routes = require('./routes');
// import sequelize connection
const sequelize = require('./config/connection');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server
//this starts backend server by connecting to DB and introducing sequelize as middleware
sequelize.sync({force : false}).then( () => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });
});
//force false prevents database from resetting (data is persistent)