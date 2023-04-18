const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./db');
const restServer = require('./restServer');

// Constants
const PORT = process.env.API_PORT;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Welcome to my API!');
});
app.use('/api', restServer);

require('./routes/cacheRoutes');
require('./routes/favoriteRoutes');
require('./routes/imageRoutes');
require('./routes/logRouters');
require('./routes/loginRoutes');
require('./routes/messageRoutes');
require('./routes/userRoutes');


sequelize.sync().then(() => { // Sync the models with the database and listen to incoming requests
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  }).catch(error => {
    console.error('Unable to connect to the database:', error);
  });