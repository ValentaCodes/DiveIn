const { Location, Renter, Boat } = require("../models");
const { faker } = require("@faker-js/faker");
const sequelize = require("../config/connection");

// Seed database function that allows us to create a new renter and location
const seedDatabase = async () => {
  await sequelize.sync({ force: false });

  const boats = await Boat.bulkCreate(boatData, {
    individualHooks: true,
    returning: true,
  });

  await Location.bulkCreate(locationData, {
    individualHooks: true,
    returning: true,
  });

  for (const renter of renterData) {
    await Renter.create({
      ...renter,
      // this will assign a random boat to a renter
      boat_id: boats[Math.floor(Math.random() * boats.length)].id,
    });
  }
  process.exit(0);
};

// Creates boat with a random price, TODO: figure out how to use each boat Leo created
const boatData = [
  {
    name: "Malibu Response TXi Open Bow",
    capacity: 7,
    length: 20,
    hourlyRate: faker.finance.amount(50, 1000, 2),
    availability: true,
    image:
      "https://images.unsplash.com/photo-1458430085161-25ad9d8960b9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8ZmlzaGluZyUyMGJvYXR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
  },
];
// creates a random location
const locationData = [
  {
    address: faker.address.streetAddress(),
    state: faker.address.state(),
    zip: faker.address.zipCode("#####"),
    city: faker.address.cityName(),
  },
];

// Creates a random user
const renterData = [
  {
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    image: faker.image.avatar(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    password: "password12345",
  },
];

seedDatabase();
