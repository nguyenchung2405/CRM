require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { rootRouter } = require("./routers/rootRouter");
const app = express();
const path = require("path");
const bodyParser = require("body-parser")

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// set up static file
const pathPublicDirectory = path.join(__dirname, "../crm/dist");

app.use("/api",rootRouter)

app.use(express.static(pathPublicDirectory));
app.get("*", (req, res) => {
    res.sendFile(path.join(pathPublicDirectory, "index.html"))
    // res.sendFile("index.html", { root: "dist" })
})

const port = process.env.PORT || 3003;
app.listen(port, ()=>{
    console.log("This is express proxy.")
})