const mongoose = require("mongoose")
const app = require("./app")

const {
    DB_USER, 
    DB_PASSWORD, 
    DB_HOST, 
    API_VERSION, 
    IP_SERVER
} = require("./constants")

const PORT = process.env.POST || 3977

mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/`
)
.then(() => {
    app.listen(PORT, ()=>{
        console.log("####API REST####")
        console.log(`http://${IP_SERVER}:${PORT}/api/${API_VERSION}`)
    });
})
.catch((error) => {
    console.log("Error de conexión:", error);
});

