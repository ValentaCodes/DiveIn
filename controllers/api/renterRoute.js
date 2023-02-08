const router = require('express').Router();
const { Renter } = require('../../models');

// CREATE a new Renter
router.post('/', async (req, res) => {
  try {
    const dbRenterData = await Renter.create({
      Rentername: req.body.Rentername,
      email: req.body.email,
      password: req.body.password,
      password: req.body.phone,
    });

    req.session.save(() => {
      req.session.loggedIn = true;

      res.status(200).json(dbRenterData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const dbRenterData = await Renter.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!dbRenterData) {
      res.status(400).json({
        message: 'The email or password do not match. Please try again.',
      });
      return;
    }

    const validPassword = await dbRenterData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({
        message: 'The email or password do not match. Please try again.',
      });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;

      res
        .status(200)
        .json({ Renter: dbRenterData, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
//comment 2git st
