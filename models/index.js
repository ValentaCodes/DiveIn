const Boat = require('./Boat');
const Location = require('./Location');
const Renter = require('./Renter');

// Creates relationships between tables
Location.hasMany(Boat, {
  foreignKey: 'location_id',
  onDelete: 'CASCADE'
});

Boat.belongsTo(Location, {
  foreignKey: 'location_id',
});

Renter.hasOne(Boat, {
  foreignKey: 'renter_id',
});

Boat.belongsTo(Renter, {
  foreignKey: 'renter_id'
});
module.exports = { Boat, Renter, Location };