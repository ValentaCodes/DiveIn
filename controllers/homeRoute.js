const router = require("express").Router();
const { Boat, Location, Renter } = require("../models");

router.get("/", async (req, res) => {
  try {
    const boatData = await Boat.findAll({
      include: [
        {
          model: Location,
          // attributes: ["city"],
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

// TODO: figure out why we can use location and renter data in boats mustache
router.get("/boat/:id", async (req, res) => {
  try {
    const boatData = await Boat.findByPk(req.params.id, {
      include: [
        {
          model: Location,
        },
        {
          model: Renter,
          attributes: ["image", "first_name"],
        },
      ],
    });
    const boat = boatData.get({ plain: true });
    res.render("boat", { boat });
  } catch (error) {
    res.status(500).json(error);
  }
});
module.exports = router;
