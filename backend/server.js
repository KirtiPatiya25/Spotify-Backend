require('dotenv').config();
const app = require("./src/app");
const connectDB = require('./src/db/db');

async function startServer() {
    try {
        await connectDB();

        app.listen(5000, () => {
            console.log("Server is running on port 5000");
        });

    } catch (error) {
        console.log("Server failed to start:", error.message);
    }
}

startServer();