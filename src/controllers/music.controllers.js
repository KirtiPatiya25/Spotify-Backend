const musicModel = require("../models/music.model");
const jwt = require("jsonwebtoken");
async function createMusic(req, res){

    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({ message: "Unauthorized"})
    }

    try{
        const  decoded = jwt.verify(token, process.env.JWT_SECRET)

        if(decoded.role !== "artist"){
            return res.status(403).json({ message: "You don't have access to create music"});
        }

    }
    catch(err){
        return res.status(401).json({ message: "Unauthhorized"});
    }

    const {title} = req.body;
    const file = req.file; 
}

