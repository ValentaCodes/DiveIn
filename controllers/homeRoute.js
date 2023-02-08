const router = require("express").Router();
const { Boat, Location } = require("../models");

router.get("/", async (req, res) => {
  try {
    // TODO: Figure out why we cant access location in handlebars
    const boatData = await Boat.findAll({
      include: [
        {
          model: Location,
          attributes: ["city"],
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

module.exports = router;