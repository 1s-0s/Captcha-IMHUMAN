let express = require("express");
let bodyParser = require("body-parser");
// let timeout = require('connect-timeout')
let app = express();
const port=process.env.PORT || 3000;
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.render("index", { main: "./sounds/songbirds.mp3", background: "./sounds/rain.mp3" });
})
app.post("/", (req, res) => {
    console.log(req.body);
    // if (req.timedout) {
    //     console.log("dobara try karo!");
    // }

})

// function haltOnTimedout(req, res, next) {
//     if (!req.timedout) next()
// }
app.listen(port, () => {
    console.log("server started");
});