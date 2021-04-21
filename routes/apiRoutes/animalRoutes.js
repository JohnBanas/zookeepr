
//dependencies
const { filterByQuery, findById, createNewAnimal, validateAnimal } = require('../../lib/animals');
const { animals } = require('../../data/animals');

//start an instance of router
const router = require('express').Router();

//routes were originally in server.js
//'/api' was removed from route because router function will append '/api' to 
//each URL, also the 'app.get(...) was changed to router.get(...)'

//api request/response
router.get('/animals', (req, res) => {
  let results = animals;
  if (req.query) {
    results = filterByQuery(req.query, results);
  }
  res.json(results);
});

//using req.params to isolate specific animals, if no match return 404 message
router.get('/animals/:id', (req, res) => {
  const result = findById(req.params.id, animals);
  if (result) {
    res.json(result);
  } else {
    res.sendStatus(404);
  }
});

// post request for users request the server to accept data
router.post('/animals', (req, res) => {
  // // req.body is where our incoming content will be
  // console.log(req.body);

  // set id based on what the next index of the array will be
  req.body.id = animals.length.toString()

  // if any data in req.body is incorrect, send 400 error back
  if (!validateAnimal(req.body)) {
    res.status(400).send('The animal is not properly formatted.');
  } else {

    // add animal to json file and animals array in this function
    const animal = createNewAnimal(req.body, animals);

    // res.json(req.body);
    res.json(animal);
  }
});

//export router
module.exports = router;