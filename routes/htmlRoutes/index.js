//start an instance of router
const router = require('express').Router();
//path works with fs to create a more predictable file path, especially when working with heroku
const path = require('path');

// '/' is root route of server, this route is the hompage of the 
// server so we need to connect it to index.html
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/index.html'));
});

//animals.html route
//no /api/ because it helps to stay organized 
//this let's us know what kind of data is being sent
//api would be a JSON file, since this is just HTML, we can omit that.
// this is not a requirement for Express, but good practices.
router.get('/animals', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/animals.html'));
});


//zookeeper html file routed through server
router.get('/zookeepers', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/zookeepers.html'));
});

//any route requested in the URL that does not exist will be sent to 
//index.html homepage, this is the '*' a 'wildcard' if you will.
router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/index.html'));
});

//export router
module.exports = router;