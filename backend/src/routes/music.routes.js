const express = require("express");
const musicController = require("../controllers/music.controller");
const multer = require("multer");
const authMiddleware = require("../middlewares/auth.middleware");
const { isArtist } = require("../middlewares/auth.middleware");

const router = express.Router();

// 📦 Multer setup (for audio upload)
const upload = multer({
    storage: multer.memoryStorage(),
});


// 🎵 UPLOAD MUSIC (Protected)
router.post(
  "/upload",
  authMiddleware,
  isArtist,
  upload.single("audio"),
  musicController.createMusic
);


// 💿 CREATE ALBUM (Protected)
router.post(
  "/album",
  authMiddleware,
  isArtist,
  musicController.createAlbum
);


// 📀 GET ALL MUSIC (Public)
router.get(
  "/",
  musicController.getAllMusic
);


// 💿 GET ALBUM BY ID (Public)
router.get(
  "/album/:id",
  musicController.getAlbumById
);


// 🎧 GET SINGLE MUSIC (Public)
router.get(
  "/:id",
  musicController.getMusicById
);


module.exports = router;