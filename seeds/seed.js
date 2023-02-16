const { Location, Renter, Boat } = require("../models");
const { faker } = require("@faker-js/faker");
const sequelize = require("../config/connection");
const boatImages = require("./boatData.json");
// Seed database function that allows us to create a new renter and location
const seedDatabase = async () => {
  await sequelize.sync({ force: false });
  const locations = await Location.bulkCreate(locationData, {
    individualHooks: true,
    returning: true,
  });

  for (const boat of boatData) {
    await Boat.create({
      ...boat,
      // This assigns a random location for a boat to be docked
      location_id: locations[Math.floor(Math.random() * locations.length)].id,
    });
  }

  for (const renter of renterData) {
    await Renter.create({
      ...renter,
    });
  }
  process.exit(0);
};

const boatData = [
  {
    name: boatImages[Math.floor(Math.random() * boatImages.length)].name,
    capacity: faker.datatype.number(20, 2),
    length: faker.datatype.number(50, 20),
    hourlyRate: faker.finance.amount(50, 200, 2),
    availability: true,
    image: boatImages[Math.floor(Math.random() * boatImages.length)].image,
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
let first_name = faker.name.firstName(); //outside the object so we can use them for user-names
let last_name = faker.name.lastName();
let image = faker.image.avatar();
const renterData = [
  {
    first_name: first_name,
    last_name: last_name,
    username: faker.internet.userName(first_name, last_name),
    image: image,
    email: faker.internet.email(),
    phone: faker.phone.number("###-###-####"),
    password: "password12345",
  },
];
seedDatabase();
