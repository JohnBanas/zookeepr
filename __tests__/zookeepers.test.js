//require file systems
const fs = require("fs");

//require functions from /lib/zookeepers.js
const {
  filterByQuery,
  findById,
  createNewZookeeper,
  validateZookeeper,
} = require("../lib/zookeepers.js");

// require the animals object with all of our animal data
const { zookeepers } = require("../data/zookeepers");

//so that we don't actually add the created zookeepers in testing to the /data/zookeepers.json file
jest.mock('fs');

//test for user creating zookeeper object
//all test are similar to animal.test.js because they use the same logic
test("creates an zookeeper object", () => {
  const zookeeper = createNewZookeeper(
    //id can be anything, just make sure it matches the toBe.() method parameter.
    { id: "Joe", id: "jhgdja3ng2" },
    zookeepers
  );

  expect(animal.name).toBe("Joe");
  expect(animal.id).toBe("jhgdja3ng2");
});

test("filters by query", () => {
  const startingZookeepers = [
    {
      id: "2",
      name: "Raksha",
      age: 31,
      favoriteAnimal: "penguin",
    },
    {
      id: "3",
      name: "Isabella",
      age: 67,
      favoriteAnimal: "bear",
    },
  ];

  const updatedZookeepers = filterByQuery({ age: 31 }, startingZookeepers);

  expect(updatedZookeepers.length).toEqual(1);
});

test("finds by id", () => {
  const startingZookeepers = [
    {
      id: "2",
      name: "Raksha",
      age: 31,
      favoriteAnimal: "penguin",
    },
    {
      id: "3",
      name: "Isabella",
      age: 67,
      favoriteAnimal: "bear",
    },
  ];

  const result = findById("3", startingZookeepers);

  expect(result.name).toBe("Isabella");
});

test("validates age", () => {
  const zookeeper = {
    id: "2",
    name: "Raksha",
    age: 31,
    favoriteAnimal: "penguin",
  };

  const invalidZookeeper = {
    id: "3",
    name: "Isabella",
    age: "67",
    favoriteAnimal: "bear",
  };

  const result = validateZookeeper(zookeeper);
  const result2 = validateZookeeper(invalidZookeeper);

  expect(result).toBe(true);
  expect(result2).toBe(false);
});