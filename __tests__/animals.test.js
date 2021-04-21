//require file systems
const fs = require("fs");

//require functions from /lib/animals.js
const {
  filterByQuery,
  findById,
  createNewAnimal,
  validateAnimal,
} = require("../lib/animals.js");

// require the animals object with all of our animal data
const { animals } = require("../data/animals");

//so that we don't actually add the created animal in testing to the /data/animals.json file
jest.mock('fs');

//test for user creating animal object
test("creates an animal object", () => {
  const animal = createNewAnimal(
    //id can be anything, just make sure it matches the toBe.() method parameter.
    { name: "Joe", id: "jhgdja3ng2" },
    animals
  );

  expect(animal.name).toBe("Joe");
  expect(animal.id).toBe("jhgdja3ng2");
});

//test query filter by passing created array of objects with 
// all key:value pairs actual user data would have, and 
// makes sure we can pass that through our filterByQuery() function
test("filters by query", () => {
  const startingAnimals = [
    {
      id: "3",
      name: "Erica",
      species: "gorilla",
      diet: "omnivore",
      personalityTraits: ["quirky", "rash"],
    },
    {
      id: "4",
      name: "Noel",
      species: "bear",
      diet: "carnivore",
      personalityTraits: ["impish", "sassy", "brave"],
    },
  ];

  const updatedAnimals = filterByQuery({ species: "gorilla" }, startingAnimals);

  expect(updatedAnimals.length).toEqual(1);
});

//testing findById() function in a similar manner to filterByQuery test
test("finds by id", () => {
  const startingAnimals = [
    {
      id: "3",
      name: "Erica",
      species: "gorilla",
      diet: "omnivore",
      personalityTraits: ["quirky", "rash"],
    },
    {
      id: "4",
      name: "Noel",
      species: "bear",
      diet: "carnivore",
      personalityTraits: ["impish", "sassy", "brave"],
    },
  ];

  const result = findById("3", startingAnimals);

  expect(result.name).toBe("Erica");
});

//making sure that if incorrect data is passed into our validate function it will 
//return false and not do anything with the data
test("validates personality traits", () => {
  const animal = {
    id: "3",
    name: "Erica",
    species: "gorilla",
    diet: "omnivore",
    personalityTraits: ["quirky", "rash"],
  };

  const invalidAnimal = {
    id: "3",
    name: "Erica",
    species: "gorilla",
    diet: "omnivore",
  };

  const result = validateAnimal(animal);
  const result2 = validateAnimal(invalidAnimal);

  expect(result).toBe(true);
  expect(result2).toBe(false);
});