const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop()); 
  }
});

const upload = multer({ storage: storage });

exports.get = async (req, res) => {
  try {
    const travels = await prisma.travel.findMany({
      include: {
        startLocation: true,
        endLocation: true,
      },
    });

    const travelsWithUrls = travels.map(travel => ({
      ...travel,
      pictureUrl: travel.picture ? `${req.protocol}://${req.get('host')}/images/${travel.picture}` : null
    }));

    res.json(travelsWithUrls);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getById = async (req, res) => {
  const { id } = req.params;
  try {
    const travel = await prisma.travel.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        startLocation: true,
        endLocation: true,
      },
    });

    if (travel) {
      travel.pictureUrl = travel.picture ? `${req.protocol}://${req.get('host')}/images/${travel.picture}` : null;
    }

    res.json(travel);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.create = async (req, res) => {
  upload.single('picture')(req, res, async (err) => { 
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    const { start_location_id, end_location_id, travel_date, transportation_type, notes } = req.body;
    const picture = req.file ? req.file.filename : null; // Get filename if uploaded

    try {
      const travel = await prisma.travel.create({
        data: {
          start_location_id: parseInt(start_location_id),
          end_location_id: parseInt(end_location_id),
          travel_date: new Date(travel_date),
          transportation_type,
          notes,
          picture, 
        },
      });

      res.json(travel);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
};

exports.update = async (req, res) => {
  upload.single('picture')(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    const { id } = req.params;
    const { start_location_id, end_location_id, travel_date, transportation_type, notes } = req.body;
    const picture = req.file ? req.file.filename : null;

    try {
      const travel = await prisma.travel.update({
        where: {
          id: parseInt(id),
        },
        data: {
          start_location_id: parseInt(start_location_id),
          end_location_id: parseInt(end_location_id),
          travel_date: new Date(travel_date),
          transportation_type,
          notes,
          picture, 
        },
      });

      res.json(travel);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
};

exports.delete = async (req, res) => {
  const { id } = req.params;
  try {
    const travel = await prisma.travel.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.json(travel);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
