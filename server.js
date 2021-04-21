//require express
const express = require('express');

//tell heroku which port to use, add port to listen method below
const PORT = process.env.PORT || 3001;

//instantiate express
const app = express();
//after modularization this accesses the api routes and html routes that
//were originally in this file. This not only lends to cleaner code, but as the application
//grows, it will keep the routing organized no matter how far the application scales.
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

//data is only read by require('express'), it doesn't change it
//so we have to push new data to an array -from app.post() to createNewAnimal()
//then use fs to write to animals.json in the /data/ folder
const fs = require('fs');
//path works with fs to create a more predictable file path, especially when working with heroku
const path = require('path');

//access to the stylesheets and js files in 'public' folder
app.use(express.static('public'));

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());

// This is the way of telling the server that any time a client
// navigates to < host > /api, the app will use the router 
// set up in apiRoutes. If / is the endpoint, then the router will
// serve back the HTML routes.
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);


//listen method
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});

// git add - A
// git commit - m "Add Heroku"
// git push heroku feature / MVP: main