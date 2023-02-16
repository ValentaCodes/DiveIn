const Boat = require('./Boat');
const Location = require('./Location');
const Renter = require('./Renter');

Location.hasMany(Boat, {
  foreignKey: 'location_id',
  // NOTE: added Cascade so if we remove a location, associated boats will be removed from location
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