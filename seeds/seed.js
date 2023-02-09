const sequelize = require('../config/connection');
const { Renter, Boat } = require('../models');

const boatData = require('./boatData.json');
// const renterData = require('./renterData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  // const renter = await Renter.bulkCreate(renterData, {
  //   individualHooks: true,
  //   returning: true,
  // });

  for (const boat of boatData) {
    await Boat.create({
      ...boat,
      // renter_id: renter[Math.floor(Math.random() * renter.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
