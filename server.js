const express = require('express');
const bodyParser = require('body-parser');
const loginRoutes = require('./routes/loginRoutes');
const cacheRoutes = require('./routes/cacheRoutes');
const imageRoutes = require('./routes/imageRoutes');
const messageRoutes = require('./routes/messageRoutes');
const userRoutes = require('./routes/userRoutes');
const sequelize = require('./db');

// Constants
const PORT = process.env.API_PORT;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Welcome to my API!');
});
app.use('/', loginRoutes);
app.use('/caches', cacheRoutes);
app.use('/images', imageRoutes);
app.use('/messages', messageRoutes);
app.use('/users', userRoutes);

sequelize.sync().then(() => { // Sync the models with the database and listen to incoming requests
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  }).catch(error => {
    console.error('Unable to connect to the database:', error);
  });