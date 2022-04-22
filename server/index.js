const fileUpload = require("express-fileupload")
const express = require("express");
const flash = require('connect-flash')
const session = require('express-session')
const app = express();
const PORT = 2000;

app.use(express.json());
app.use(express.static('./public'))
app.use(express.urlencoded({extended:true}))
app.use(fileUpload())
app.use(flash())
app.use(session({
    secret: "123",
    saveUninitialized: false,
    resave: false
}))

// Import Controllers
const route = require("../controllers/route");
const api = require("../controllers/api");
const size = require("../controllers/size")

// Set View Engine
app.set("view engine", "ejs");
app.get("/home", route.pageHome);
app.get("/addNewCar", route.pageForm);
app.post("/addNewCar", route.formHandler);
app.get("/updateCar/:id", route.pageUpdate);
app.post("/updateCar/:id", route.updateCar);
app.get("/deleteCar/:id", route.deleteCar);


// Define Routes
app.get("/api/v1/cars", api.getCars);
app.get("/api/v1/cars/:id", api.getCarsUpdate);
app.post("/api/v1/cars",api.postCars);
app.get("/api/v1/size", size.getSize);
app.put("/api/v1/cars/:id", api.updateCar);
app.delete("/api/v1/cars/:id", api.deleteCar);

// bikin function di api sama di function route yg delete panggil axios yg api delete
app.listen(PORT, () => {
    console.log(`Server berhasil berjalan di port http://localhost:${PORT}`);
});