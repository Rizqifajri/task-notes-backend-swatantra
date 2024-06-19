const express = require('express');
require('dotenv').config();
const notesRoutes = require('./notesRoutes/notes.routes');

const app = express();
const port = process.env.APP_PORT || 3000; 

app.use(express.json());

app.get('/', (req, res) => {
  res.send("Welcome To Notes");
});

app.use('/notes', notesRoutes);

app.listen(port, () => {
  console.log(`SERVER RUNNING ON PORT ${port}`);
});
