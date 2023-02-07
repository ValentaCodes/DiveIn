const router = require("express").Router();

// const apiRoutes = require("./api");
const homeRoute = require('./homeRoute');

// router.use('/', homeRoute);
// router.use("/api", apiRoutes);

router.get("/", async (req, res) => {
  res.render("home");
});
module.exports = router;
