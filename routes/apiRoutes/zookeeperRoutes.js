//dependencies
const { filterByQuery, findById, createNewZookeeper, validateZookeeper } = require('../../lib/zookeepers');
const { zookeepers } = require('../../data/zookeepers');

//start an instance of router
const router = require('express').Router();

//api request/response
router.get('/zookeepers', (req, res) => {
  let results = zookeepers;
  if (req.query) {
    results = filterByQuery(req.query, results);
  }
  res.json(results);
});

//using req.params to isolate specific animals, if no match return 404 message
router.get('/zookeepers/:id', (req, res) => {
  const result = findById(req.params.id, zookeepers);
  if (result) {
    res.json(result);
  } else {
    res.sendStatus(404);
  }
});

// post request for users request the server to accept data
router.post('/zookeepers', (req, res) => {
  // // req.body is where our incoming content will be
  // console.log(req.body);

  // set id based on what the next index of the array will be
  req.body.id = zookeepers.length.toString()

  // if any data in req.body is incorrect, send 400 error back
  if (!validateZookeeper(req.body)) {
    res.status(400).send('The zookeeper is not properly formatted.');
  } else {

    // add a zookeeper to json file and zookeeper array in this function
    const zookeeper = createNewZookeeper(req.body, zookeepers);

    // res.json(req.body);
    res.json(zookeeper);
  }
});

module.exports = router;