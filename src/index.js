const express = require("express");
const app = express();

require('dotenv').config();
const port = process.env.PORT || 4000;
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoute = require('./routes/user.route');
const travelRecordRoute = require('./routes/travel.route');
const locationRoute = require('./routes/location.route');
const photoRoute = require('./routes/photo.route');

app.use('/images', express.static('images'));

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Travel App API");
});

app.use("/users", userRoute); 
app.use("/travel", travelRecordRoute); 
app.use("/locations", locationRoute); 
app.use("/photos", photoRoute); 

app.listen(port, () => {
  console.log(`App started at port: ${port}`);
});