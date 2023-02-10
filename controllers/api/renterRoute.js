const router = require("express").Router();
const { Renter } = require("../../models");

// FIXME: figure out why we cant create from the postman/insomnia
// Every other file works so the solution is here in this file

// CREATE a new Renter
router.post("/", async (req, res) => {
  try {
    const renterData = await Renter.create(req.body);

    req.session.save(() => {
      req.session.renter_id = renterData.id;
      req.session.logged_in = true;
      res.status(200).json(renterData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const renterData = await Renter.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!renterData) {
      res.status(400).json({
        message: "The username or password do not match. Please try again.",
      });
      return;
    }

    const validPassword = renterData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({
        message: "The email or password do not match. Please try again.",
      });
      return;
    }

    req.session.save(() => {
      req.session.renter_id = renterData.id;
      req.session.logged_in = true;

      res.json({ renter: renterData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Logout
router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
