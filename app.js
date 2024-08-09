const express = require('express');
const userRoutes= require('./routes/userRoutes');
const app = express();
const  dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config();
app.use(express.json());



mongoose.connect(process.env.db_connection)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });


app.use(userRoutes);



app.listen(3000);