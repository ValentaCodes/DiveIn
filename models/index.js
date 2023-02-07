const Boat = require('./Boat');
const Location = require('./Location');
const Renter = require('./Renter');

Location.hasMany(Boat, {
  foreignKey: 'location_id',
});

Boat.belongsTo(Location, {
  foreignKey: 'location_id',
});

Renter.hasOne(Boat, {
  foreignKey: 'boat_id',
});

module.exports = { Boat, Renter, Location };