
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getAllLocations = async (req, res) => {
  try {
    const locations = await prisma.location.findMany();
    res.json(locations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getLocationById = async (req, res) => {
  const { id } = req.params;
  try {
    const location = await prisma.location.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!location) {
      return res.status(404).json({ error: "Location not found" });
    }
    res.json(location);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createLocation = async (req, res) => {
  const { name, description, latitude, longitude } = req.body;
  try {
    const location = await prisma.location.create({
      data: {
        name,
        description,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
      },
    });
    res.status(201).json(location);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateLocation = async (req, res) => {
  const { id } = req.params;
  const { name, description, latitude, longitude } = req.body;
  try {
    const location = await prisma.location.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name,
        description,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
      },
    });
    res.json(location);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a location by ID
exports.deleteLocation = async (req, res) => {
  const { id } = req.params;
  try {
    const location = await prisma.location.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.json(location);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};