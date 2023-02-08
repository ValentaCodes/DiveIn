const router = require("express").Router();
const { Location, Boat } = require("../../models");

// This is the '/api/location' endpoint

// Create a location boat using api
router.post("/", async (req, res) => {
  try {
    const locationData = await Location.create(req.body);
    res.status(200).json(locationData);
  } catch (error) {
    res.status(400).json(error);
  }
});

// Delete a location using api
router.delete("/:id", async (req, res) => {
  try {
    const locationData = await Location.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!locationData) {
      res.status(400).json({ message: "Unable to find location with this id" });
    }
    res.status(200).json(locationData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get all locations including boats at docked there
router.get("/", async (req, res) => {
  try {
    const locationData = await Location.findAll({
      include: {
        model: Boat,
        attributes: ["title", "availability"],
      },
    });
    res.status(200).json(locationData);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
