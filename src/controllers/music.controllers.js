const musicModel = require("../models/music.model");
const albumModel = require("../models/album.model");
const { uploadFile } = require("../services/storage.service");
const jwt = require("jsonwebtoken");

// 🎵 CREATE MUSIC
async function createMusic(req, res) {
    console.log("FILE:", req.file);
    console.log("BODY:", req.body);

    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    let decoded;

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        console.log("JWT ERROR:", err.message);
        return res.status(401).json({ message: "Invalid token" });
    }

    if (decoded.role !== "artist") {
        return res.status(403).json({
            message: "You don't have access to create music",
        });
    }

    const { title } = req.body;
    const file = req.file;

    if (!file) {
        return res.status(400).json({
            message: "Audio file is required",
        });
    }

    try {
        // Upload file
        const result = await uploadFile(file.buffer.toString("base64"));

        const music = await musicModel.create({
            uri: result.url,
            title,
            artist: decoded.id,
        });

        return res.status(201).json({
            message: "Music created successfully",
            music: {
                id: music._id,
                uri: music.uri,
                title: music.title,
                artist: music.artist,
            },
        });

    } catch (err) {
        console.log("UPLOAD ERROR:", err.message);
        return res.status(500).json({
            message: "Error uploading music",
        });
    }
}

// 💿 CREATE ALBUM
async function createAlbum(req, res) {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    let decoded;

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        console.log("JWT ERROR:", err.message);
        return res.status(401).json({ message: "Invalid token" });
    }

    if (decoded.role !== "artist") {
        return res.status(403).json({
            message: "You dont have access to create album",
        });
    }

    const { title, musicIds } = req.body;

    if (!title) {
        return res.status(400).json({
            message: "Album title is required",
        });
    }

    try {
        const album = await albumModel.create({
            title,
            artist: decoded.id,
            musics: musicIds || [], // ✅ FIXED
        });

        return res.status(201).json({
            message: "Album created successfully",
            album: {
                id: album._id,
                title: album.title,
                artist: album.artist,
                musics: album.musics,
            },
        });

    } catch (err) {
        console.log("ALBUM ERROR:", err.message);
        return res.status(500).json({
            message: "Error creating album",
        });
    }
}

module.exports = { createMusic, createAlbum };