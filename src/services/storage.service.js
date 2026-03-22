const { ImageKit} = require("@imagekit/nodejs");

const ImageKitClient = new ImageKit({
    password: process.env.IMAGEKIT_PRIVATE_KEY,
});

