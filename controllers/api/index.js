const router = require("express").Router();
const renterRoutes = require("./renterRoute");
const locationRoutes = require("./locationRoute");
const boatRoutes = require("./boatRoute");
// Routes for our API
router.use("/location", locationRoutes);
router.use("/renter", renterRoutes);
router.use("/boat", boatRoutes);

module.exports = router;