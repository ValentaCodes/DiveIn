const router = require("express").Router();
const { Boat, Location, Renter } = require("../models");
const withAuth = require("../utils/auth");

// This is the '/' route "main page"
// finds all boats
router.get("/", async (req, res) => {
  try {
    const boatData = await Boat.findAll({
      include: [
        {
          model: Location,
        },
      ],
    });
    const boats = boatData.map((boat) => boat.get({ plain: true }));
    res.render("home", {
      boats,
      logged_in: req.session.logged_in,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

// trigger the boat card page with details
router.get("/boat/:id", async (req, res) => {
  try {
    const boatData = await Boat.findByPk(req.params.id, {
      include: [
        {
          model: Renter,
          attributes: ["first_name"],
        },
        { model: Location },
      ],
    });
    const boat = boatData.get({ plain: true });
    res.render("boat", {
      ...boat,
      logged_in: req.session.logged_in
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

// gets the user dashboard if logged in
router.get("/dashboard", withAuth, async (req, res) => {
  try {
    const renterData = await Renter.findByPk(req.session.renter_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Boat }],
    });
    const renter = renterData.get({ plain: true });

    res.render("dashboard", {
      ...renter,
      logged_in: true,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

// gets login page
router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }
  res.render("login");
});
module.exports = router;
