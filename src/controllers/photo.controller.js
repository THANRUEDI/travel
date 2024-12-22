// photo.controller.js

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const multer = require("multer");

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images/"); // Store files in the 'images' directory
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + "." + file.originalname.split(".").pop());
  },
});

const upload = multer({ storage: storage });

// Get all photos
exports.getAllPhotos = async (req, res) => {
  try {
    const photos = await prisma.photo.findMany();

    // Add image URL to each photo record
    const photosWithUrls = photos.map((photo) => ({
      ...photo,
      url: photo.filename ? `${req.protocol}://${req.get("host")}/images/${photo.filename}` : null,
    }));

    res.json(photosWithUrls);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific photo by ID
exports.getPhotoById = async (req, res) => {
  const { id } = req.params;
  try {
    const photo = await prisma.photo.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (photo) {
      photo.url = photo.filename ? `${req.protocol}://${req.get("host")}/images/${photo.filename}` : null;
    }

    res.json(photo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Upload a new photo
exports.uploadPhoto = (req, res) => {
  upload.single("photo")(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    const { title, description } = req.body;
    const filename = req.file ? req.file.filename : null;

    try {
      const photo = await prisma.photo.create({
        data: {
          title,
          description,
          filename, // Save the filename in the database
        },
      });

      res.status(201).json(photo);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
};

// Update an existing photo
exports.updatePhoto = (req, res) => {
  upload.single("photo")(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    const { id } = req.params;
    const { title, description } = req.body;
    const filename = req.file ? req.file.filename : null;

    try {
      const photo = await prisma.photo.update({
        where: {
          id: parseInt(id),
        },
        data: {
          title,
          description,
          filename, // Update the filename if a new file is uploaded
        },
      });

      res.json(photo);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
};

// Delete a photo
exports.deletePhoto = async (req, res) => {
  const { id } = req.params;
  try {
    const photo = await prisma.photo.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.json(photo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
