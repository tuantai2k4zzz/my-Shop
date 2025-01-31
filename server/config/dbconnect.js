const mongoose = require("mongoose")

const dbConnect = async () => {
        await mongoose.connect(process.env.MONGO_URL)
            .then(() => console.log("Mongodb connected!"))
            .catch(err => console.log(err.message))
}

module.exports = dbConnect