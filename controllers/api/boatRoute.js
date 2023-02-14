const router = require('express').Router();
const { Boat } = require('../../models');
// const withAuth = require('../../utils/auth');

router.post('/', async (req, res) => {
  try {
    const newBoat = await Boat.create(
      req.body
      // renter_id: req.session.renter_id,
    );

    res.status(200).json(newBoat);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const boatData = await Boat.destroy({
      where: {
        id: req.params.id,
        // renter_id: req.session.renter_id,
      },
    });

    if (!boatData) {
      res
        .status(404)
        .json({ message: 'ARRRGGH! No boat be found with this id, matey!' });
      return;
    }

    res.status(200).json(boatData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/', async (req, res) => {
  try {
    const boatData = await Boat.findAll({});

    res.status(200).json(boatData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// new PUT route to update availability and renter id
router.put('/:id', async (req, res) => {
  try {
    const { availability, renter_id } = req.body;
    const boat = await Boat.findByPk(req.params.id);
    const boatData = await boat.update({
      availability: availability,
      renter_id: renter_id,
    });
    res.status(200).json(boatData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
