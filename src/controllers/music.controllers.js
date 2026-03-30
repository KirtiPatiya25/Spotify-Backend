const musicModel = require("../models/music.model");
const albumModel = require("../models/album.model");
const { uploadFile } = require("../services/storage.service");

// 🎵 CREATE MUSIC
async function createMusic(req, res) {
    console.log("FILE:", req.file);
    console.log("BODY:", req.body);

    // ✅ user comes from middleware
    const user = req.user;

    if (user.role !== "artist") {
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
        const result = await uploadFile(file.buffer.toString("base64"));

        const music = await musicModel.create({
            uri: result.url,
            title,
            artist: user.id, // ✅ from middleware
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
    const user = req.user;

    if (user.role !== "artist") {
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
            artist: user.id, // ✅ from middleware
            musics: musicIds || [],
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

// 📀 GET ALL MUSIC
async function getAllMusic(req, res) {
    try {
        const musics = await musicModel
            .find()
            .populate("artist", "username email");

        return res.status(200).json({
            message: "Music fetched successfully",
            musics
        });

    } catch (err) {
        console.log("GET MUSIC ERROR:", err.message);
        return res.status(500).json({
            message: "Error fetching music"
        });
    }
}


// 💿 GET ALBUM BY ID
async function getAlbumById(req, res) {
    try {
        const { id } = req.params;

        const album = await albumModel
            .findById(id)
            .populate("artist", "username")
            .populate("musics");

        if (!album) {
            return res.status(404).json({
                message: "Album not found"
            });
        }

        return res.status(200).json({
            message: "Album fetched successfully",
            album
        });

    } catch (err) {
        console.log("GET ALBUM ERROR:", err.message);
        return res.status(500).json({
            message: "Error fetching album"
        });
    }
}

// 🎧 GET SINGLE MUSIC
async function getMusicById(req, res) {
    try {
        const { id } = req.params;

        const music = await musicModel.findById(id);

        if (!music) {
            return res.status(404).json({
                message: "Music not found"
            });
        }

        return res.status(200).json({
            message: "Music fetched successfully",
            music
        });

    } catch (err) {
        console.log("GET MUSIC ERROR:", err.message);
        return res.status(500).json({
            message: "Error fetching music"
        });
    }
}


module.exports = { 
    createMusic, 
    createAlbum,
    getAllMusic,
    getAlbumById,   // ✅ ADD
    getMusicById    // ✅ ADD
};




