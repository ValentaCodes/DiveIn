const router = require('express').Router();
const { Renter } = require('../../models');

// FIXME: figure out why we cant create from the postman/insomnia
// Every other file works so the solution is here in this file

//{
// "first_name": "Jeremiah",
// "last_name": "Chesley",
// "image": "https://www.companionsystems.com/wp-content/uploads/2016/08/DSC6580_web.jpg",
// "email": "msgrmiah@gmail.com",
// "phone": "801-971-7063",
// "password": "braindamaged23@",
// "boat_id": "2"
// }

// CREATE a new Renter
router.post('/', async (req, res) => {
  try {
    const renterData = await Renter.create(req.body);

    req.session.save(() => {
      req.session.user_id = renterData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const renterData = await Renter.findOne({
      where: { email: req.body.email },
    });

    if (!renterData) {
      res.status(400).json({ message: 'Wrong email or password.' });
      return;
    }

    const validPassword = await renterData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Wrong email or password' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = renterData.id;
      req.session.logged_in = true;

      res.json({ user: renterData, message: 'Login successful' });
    });
  } catch (err) {
    res.status(400).json(err);
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

router.get('/', async (req, res) => {
  try {
    const renterData = await Renter.findAll({});

    res.status(200).json(renterData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
